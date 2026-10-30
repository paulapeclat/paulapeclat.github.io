#!/usr/bin/env python3
"""
Importa para este repositório os jogos que estavam no Parke Games, para que
continuem no ar depois que a plataforma sair.

Roda uma vez pelo workflow "Importar jogos do Parke" (Actions → Run workflow).
Para cada projeto de data/projetos.json com "origem.plataforma" == "parke":

- capa:   baixa, confere que é imagem de verdade, recorta em 16:10 e salva
          em WebP SEM metadados (tira EXIF, que pode ter localização)
          → assets/projetos/<slug>.webp
- pygame: copia index.html e game.apk → jogos/<slug>/
- html5:  copia index.html e tudo que ele referencia (o S3 não lista arquivos,
          então segue os links dentro de HTML, CSS, JS e JSON) → jogos/<slug>/
- embed:  (MakeCode) não copia nada; lê o endereço do simulador oficial do
          MakeCode dentro do index.html e passa a apontar direto para ele.

Segurança
- Só baixa de https://s3.paulapeclat.com.br/parke/ (sem seguir redirecionamento
  para outro lugar).
- Só aceita caminhos relativos simples: nada de "..", barra no começo ou
  caracteres estranhos (evita gravar fora da pasta do jogo).
- Só aceita extensões de arquivo de jogo da lista abaixo.
- Limite de tamanho por arquivo, por jogo e no total.
- O resultado vai para data/importacao.json, com o que faltou em cada jogo.
"""
from __future__ import annotations

import io
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path, PurePosixPath

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DADOS = ROOT / "data" / "projetos.json"
RELATORIO = ROOT / "data" / "importacao.json"
BASE = "https://s3.paulapeclat.com.br/parke/"
HOST = "s3.paulapeclat.com.br"

MAX_ARQUIVO = 40 * 1024 * 1024      # 40 MB (o GitHub recusa acima de 100 MB)
MAX_JOGO = 90 * 1024 * 1024         # 90 MB por jogo
MAX_TOTAL = 600 * 1024 * 1024       # 600 MB no total
MAX_CAPA = 8 * 1024 * 1024
MAX_ARQUIVOS_JOGO = 3000

EXTENSOES = {
    "html", "htm", "js", "mjs", "css", "json", "txt", "xml", "map", "wasm", "apk", "data", "bin", "pck",
    "png", "jpg", "jpeg", "gif", "webp", "svg", "ico", "bmp",
    "mp3", "ogg", "wav", "m4a", "aac", "flac", "webm", "mp4",
    "woff", "woff2", "ttf", "otf", "fnt",
    "glb", "gltf", "atlas", "tmx", "tsx", "csv", "ms", "lua", "py",
}
TEXTO = {"html", "htm", "js", "mjs", "css", "json", "txt", "xml", "atlas", "tmx", "tsx", "fnt", "ms"}
CAMINHO_OK = re.compile(r"^[A-Za-z0-9._\- ()/@+%]+$")

# referências dentro de arquivos de texto: src="x", href='x', url(x), "x.png" ...
REF = re.compile(r"""(?:src|href)\s*=\s*["']([^"'#?]+)|url\(\s*["']?([^"')#?]+)|["'`]([^"'`\s#?<>]{1,200}\.(?:%s))["'`]"""
                 % "|".join(sorted(EXTENSOES)), re.I)


class SemRedirecionar(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):  # nunca segue para outro endereço
        return None


ABRIR = urllib.request.build_opener(SemRedirecionar)
total_baixado = 0


def baixar(url: str, limite: int) -> bytes | None:
    global total_baixado
    u = urllib.parse.urlsplit(url)
    if u.scheme != "https" or u.hostname != HOST or not url.startswith(BASE):
        raise ValueError(f"endereço fora do permitido: {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "importar-parke/1.0"})
    try:
        with ABRIR.open(req, timeout=60) as r:
            dados = r.read(limite + 1)
    except urllib.error.HTTPError as e:
        if e.code in (403, 404):
            return None
        raise
    if len(dados) > limite:
        raise ValueError(f"arquivo grande demais: {url}")
    total_baixado += len(dados)
    if total_baixado > MAX_TOTAL:
        raise ValueError("limite total de download atingido")
    return dados


def caminho_seguro(rel: str) -> str | None:
    rel = urllib.parse.unquote(rel).replace("\\", "/").strip()
    while rel.startswith("./"):
        rel = rel[2:]
    if not rel or rel.startswith("/") or "://" in rel or rel.startswith("data:"):
        return None
    p = PurePosixPath(rel)
    if ".." in p.parts or not CAMINHO_OK.match(rel):
        return None
    if p.suffix.lower().lstrip(".") not in EXTENSOES:
        return None
    return p.as_posix()


def salvar_capa(origem: dict, destino: Path) -> bool:
    dados = baixar(BASE + "uploads/" + origem["capa"], MAX_CAPA)
    if not dados:
        return False
    img = Image.open(io.BytesIO(dados))
    if img.format not in {"PNG", "JPEG", "WEBP", "GIF"}:
        raise ValueError(f"capa não é imagem válida: {origem['capa']}")
    img = img.convert("RGB")
    # recorte 16:10 centralizado e no máximo 960 px de largura
    w, h = img.size
    alvo = 16 / 10
    if w / h > alvo:
        nw = int(h * alvo); img = img.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / alvo); img = img.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    if img.width > 960:
        img = img.resize((960, 600), Image.LANCZOS)
    destino.parent.mkdir(parents=True, exist_ok=True)
    img.save(destino, "WEBP", quality=82, method=6)  # salva sem EXIF/metadados
    return True


def copiar_jogo(id_: str, pasta: Path, iniciais: list[str]) -> dict:
    prefixo = BASE + f"games/{id_}/"
    fila, vistos, faltando, tamanho = list(iniciais), set(), [], 0
    while fila:
        rel = fila.pop(0)
        if rel in vistos:
            continue
        vistos.add(rel)
        if len(vistos) > MAX_ARQUIVOS_JOGO:
            raise ValueError("arquivos demais neste jogo")
        dados = baixar(prefixo + urllib.parse.quote(rel), MAX_ARQUIVO)
        if dados is None:
            faltando.append(rel)
            continue
        tamanho += len(dados)
        if tamanho > MAX_JOGO:
            raise ValueError("jogo grande demais")
        alvo = (pasta / rel).resolve()
        if pasta.resolve() not in alvo.parents:
            raise ValueError(f"caminho fora da pasta do jogo: {rel}")
        alvo.parent.mkdir(parents=True, exist_ok=True)
        alvo.write_bytes(dados)
        ext = PurePosixPath(rel).suffix.lower().lstrip(".")
        if ext in TEXTO:
            texto = dados.decode("utf-8", "replace")
            base = PurePosixPath(rel).parent
            for m in REF.finditer(texto):
                ref = next(g for g in m.groups() if g)
                for cand in {(base / ref).as_posix(), ref}:
                    seguro = caminho_seguro(cand)
                    if seguro and seguro not in vistos:
                        fila.append(seguro)
    # referências por heurística podem não existir; só conta como falta o que é essencial
    return {"arquivos": len(vistos) - len(faltando), "bytes": tamanho,
            "faltando": [f for f in faltando if f in iniciais]}


def endereco_makecode(id_: str) -> str | None:
    dados = baixar(BASE + f"games/{id_}/index.html", 2 * 1024 * 1024)
    if not dados:
        return None
    for url in re.findall(r"""src\s*=\s*["'](https://[^"']+)["']""", dados.decode("utf-8", "replace")):
        u = urllib.parse.urlsplit(url)
        if u.hostname == "arcade.makecode.com":
            return url.replace("&amp;", "&")
    return None


def main() -> int:
    dados = json.loads(DADOS.read_text(encoding="utf-8"))
    relatorio, erros = [], 0
    for p in dados.get("projetos", []):
        o = p.get("origem") or {}
        if o.get("plataforma") != "parke" or o.get("importado"):
            continue
        slug = o["slug"]
        if not re.fullmatch(r"[a-z0-9-]+", slug):
            raise ValueError(f"slug inválido: {slug}")
        item = {"titulo": p["titulo"], "slug": slug, "tipo": o["tipo"]}
        try:
            capa = ROOT / "assets" / "projetos" / f"{slug}.webp"
            if salvar_capa(o, capa):
                p["imagem"] = f"assets/projetos/{slug}.webp"
                item["capa"] = "ok"
            else:
                item["capa"] = "não encontrada"

            if o["tipo"] == "embed":
                url = endereco_makecode(o["id"])
                if url:
                    p["link"] = url
                    item["jogo"] = "MakeCode oficial"
                else:
                    item["jogo"] = "endereço do MakeCode não encontrado"
            else:
                pasta = ROOT / "jogos" / slug
                iniciais = ["index.html", "game.apk"] if o["tipo"] == "pygame" else ["index.html"]
                r = copiar_jogo(o["id"], pasta, iniciais)
                item.update(r)
                if not r["faltando"]:
                    p["link"] = f"jogos/{slug}/"
                    item["jogo"] = "copiado"
                else:
                    item["jogo"] = "incompleto, link antigo mantido"
            if item.get("capa") == "ok" and item.get("jogo") in ("copiado", "MakeCode oficial"):
                o["importado"] = True
        except Exception as e:  # um jogo com problema não derruba os outros
            erros += 1
            item["erro"] = str(e)
        relatorio.append(item)
        print(json.dumps(item, ensure_ascii=False))

    DADOS.write_text(json.dumps(dados, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    RELATORIO.write_text(json.dumps({"jogos": relatorio, "baixado_bytes": total_baixado}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"pronto: {len(relatorio)} jogo(s), {erros} com erro, {total_baixado / 1e6:.1f} MB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
