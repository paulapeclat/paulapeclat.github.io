"""Gera primeiro-obby/codigo/index.html: os códigos do livro "Crie o primeiro obby com seu filho(a)".

Roda no workflow de publicação. A data de cada arquivo e o histórico vêm do git,
então basta atualizar um arquivo na pasta e fazer push: a página se atualiza sozinha.
Uso: python scripts/gerar_codigos_obby.py
"""
import html
import subprocess
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PASTA = RAIZ / "primeiro-obby" / "codigo"
REPO = "https://github.com/paulapeclat/paulapeclat.github.io"

TITULOS = {
    1: "Setup: conta, segurança e as regras do estúdio",
    2: "Tour do Studio",
    3: "A fase no papel",
    4: "Construir, testar, ajustar",
    5: "Primeiro script: o bloco que derruba",
    6: "Checkpoints e plataformas que se mexem",
    7: "A regra maluca",
    8: "Testar com gente de verdade e publicar",
    9: "O próximo jogo",
    99: "Apêndices",
}
MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]


def git(*args):
    try:
        return subprocess.run(["git", "-C", str(RAIZ), *args], capture_output=True, text=True, check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return ""


def data_br(iso):
    if not iso:
        return "agora"
    a, m, d = iso.split("-")
    return f"{int(d)} {MESES[int(m) - 1]} {a}"


def atualizado(caminho):
    return git("log", "-1", "--format=%cs", "--", str(caminho.relative_to(RAIZ)))


def rotulo(arquivo):
    nome = arquivo.name
    if nome.startswith("roblox-"):
        base = nome[len("roblox-"):].rsplit(".luau", 1)[0]
        edicao = ""
        if base.endswith(".iniciantes"):
            base, edicao = base[: -len(".iniciantes")], "Edição para quem nunca programou"
        elif base.endswith(".dev"):
            base, edicao = base[: -len(".dev")], "Edição para quem programa"
        return "Roblox Studio · Luau", base.replace("-", " "), edicao
    if nome == "makecode-arcade.ts":
        return "MakeCode Arcade", "Aba JavaScript", ""
    if nome == "scratch.txt":
        return "Scratch", "Script em texto (formato scratchblocks)", ""
    return "", nome, ""


def cartao(arquivo, cap_id):
    plataforma, titulo, edicao = rotulo(arquivo)
    codigo = arquivo.read_text(encoding="utf-8")
    rel = arquivo.relative_to(RAIZ).as_posix()
    data = atualizado(arquivo)
    img = ""
    if arquivo.name in ("makecode-arcade.ts", "scratch.txt"):
        png = arquivo.with_name(arquivo.name.split(".")[0] + ".png")
        if png.exists():
            img = (f'<img src="{html.escape(png.parent.name)}/{html.escape(png.name)}" loading="lazy" '
                   f'alt="Blocos montados no {html.escape(plataforma)} para este capítulo">')
    id_pre = f"c-{cap_id}-{arquivo.stem.replace('.', '-')}"
    return f"""
    <article class="arquivo">
      <header>
        <span class="plat">{html.escape(plataforma)}</span>
        <h3>{html.escape(titulo)}</h3>
        {f'<span class="ed">{html.escape(edicao)}</span>' if edicao else ''}
        <span class="data">atualizado em <time datetime="{html.escape(data)}">{html.escape(data_br(data))}</time></span>
      </header>
      {img}
      <details{' open' if plataforma.startswith('Roblox') else ''}>
        <summary>Ver o código</summary>
        <pre id="{html.escape(id_pre)}"><code>{html.escape(codigo)}</code></pre>
      </details>
      <div class="acoes">
        <button type="button" data-copiar="{html.escape(id_pre)}">Copiar código</button>
        <a href="{REPO}/blob/main/{html.escape(rel)}">Ver no GitHub</a>
      </div>
    </article>"""


def main():
    secoes, indice = [], []
    pastas = sorted(p for p in PASTA.iterdir() if p.is_dir())
    for pasta in pastas:
        cap = 99 if pasta.name == "apendices" else int(pasta.name.split("-")[1])
        cap_id = "apendices" if cap == 99 else f"cap-{cap}"
        arquivos = sorted(
            [a for a in pasta.iterdir() if a.suffix in (".luau", ".ts", ".txt")],
            key=lambda a: (0 if a.name.startswith("roblox-") else 1 if a.name.endswith(".ts") else 2, a.name))
        if not arquivos:
            continue
        nome = TITULOS.get(cap, pasta.name)
        rotulo_cap = "Apêndices" if cap == 99 else f"Capítulo {cap}"
        indice.append(f'<li><a href="#{cap_id}"><b>{rotulo_cap}</b> {html.escape(nome)}</a></li>')
        secoes.append(f'<section id="{cap_id}" class="cap"><h2><span>{rotulo_cap}</span>{html.escape(nome)}</h2>'
                      f'<div class="grade">{"".join(cartao(a, cap_id) for a in arquivos)}</div></section>')

    log = git("log", "-20", "--format=%cs%x09%s", "--", "primeiro-obby/codigo")
    historico = "".join(
        f"<li><time>{html.escape(data_br(l.split(chr(9))[0]))}</time> {html.escape(l.split(chr(9), 1)[1])}</li>"
        for l in log.splitlines() if "\t" in l) or "<li>As atualizações aparecem aqui assim que forem publicadas.</li>"
    ultima = data_br(git("log", "-1", "--format=%cs", "--", "primeiro-obby/codigo"))

    pagina = f"""<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Códigos do livro · Crie o primeiro obby com seu filho(a)</title>
<meta name="description" content="Os códigos do livro Crie o primeiro obby com seu filho(a), sempre atualizados: Roblox Studio (Luau), Scratch e MakeCode Arcade, capítulo por capítulo.">
<link rel="canonical" href="https://paulapeclat.github.io/primeiro-obby/codigo/">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@400;600;700;800&family=JetBrains+Mono:wght@400&display=swap">
<style>
  :root{{--ink:#1d1240;--ink-2:#4a3d7a;--ceu:#8fd3ff;--ceu-2:#e9f6ff;--card:#fff;--line:#d9d2ee;--roxo:#5b2fd0;--amarelo:#ffd23f;--code:#1b1533;--code-txt:#ece8ff}}
  *{{box-sizing:border-box}}
  body{{margin:0;background:linear-gradient(180deg,var(--ceu) 0,var(--ceu-2) 420px,#f6fbff 100%);color:var(--ink);font:400 16px/1.6 Nunito,system-ui,sans-serif}}
  a{{color:var(--roxo)}}
  .wrap{{max-width:1040px;margin:0 auto;padding:0 16px}}
  header.topo{{padding:22px 0 8px}}
  .marca{{font:800 18px/1 "Baloo 2",sans-serif;color:var(--ink);text-decoration:none}}
  h1{{font:800 clamp(30px,5vw,46px)/1.05 "Baloo 2",sans-serif;margin:22px 0 10px}}
  .lead{{color:var(--ink-2);max-width:62ch;margin:0 0 6px}}
  .selo{{display:inline-block;background:var(--ink);color:#fff;font-weight:700;font-size:14px;padding:7px 12px;border-radius:999px}}
  nav.indice ul{{list-style:none;padding:0;margin:18px 0 0;display:flex;flex-wrap:wrap;gap:8px}}
  nav.indice a{{display:block;background:#fff;border:1.5px solid var(--line);border-radius:12px;padding:8px 12px;text-decoration:none;color:var(--ink);font-size:14px}}
  nav.indice b{{color:var(--roxo);margin-right:4px}}
  .cap{{margin:40px 0 0;scroll-margin-top:16px}}
  .cap h2{{font:800 26px/1.15 "Baloo 2",sans-serif;margin:0 0 14px}}
  .cap h2 span{{display:block;font:800 14px/1.2 Nunito,sans-serif;color:var(--roxo);letter-spacing:.06em;text-transform:uppercase;margin-bottom:4px}}
  .grade{{display:grid;gap:14px}}
  .arquivo{{background:var(--card);border-radius:16px;padding:16px 18px;box-shadow:0 10px 26px rgba(29,18,64,.08);min-width:0}}
  .arquivo header{{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 12px}}
  .arquivo h3{{margin:0;font:800 19px/1.2 "Baloo 2",sans-serif}}
  .plat{{flex-basis:100%;font-weight:800;font-size:13px;color:var(--ink-2)}}
  .ed{{font-size:13px;font-weight:700;background:#efe9ff;color:var(--roxo);border-radius:999px;padding:2px 10px}}
  .data{{font-size:13px;color:var(--ink-2);margin-left:auto}}
  .arquivo img{{display:block;max-width:100%;height:auto;max-height:520px;margin:12px 0 4px;object-fit:contain;object-position:left}}
  details{{margin-top:10px}}
  summary{{cursor:pointer;font-weight:800}}
  pre{{margin:10px 0 0;background:var(--code);color:var(--code-txt);border-radius:12px;padding:14px 16px;overflow-x:auto;font:400 13px/1.6 "JetBrains Mono",ui-monospace,monospace;tab-size:4}}
  .acoes{{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}}
  .acoes button{{border:0;border-radius:12px;min-height:42px;padding:8px 16px;background:var(--amarelo);color:var(--ink);font:800 16px/1 "Baloo 2",sans-serif;cursor:pointer;box-shadow:0 3px 0 #c99a10}}
  .acoes a{{font-weight:700;font-size:14px}}
  :focus-visible{{outline:3px solid var(--amarelo);outline-offset:2px}}
  .historico{{background:#fff;border-radius:16px;padding:16px 18px;margin:40px 0 0}}
  .historico h2{{font:800 22px/1.2 "Baloo 2",sans-serif;margin:0 0 8px}}
  .historico ul{{margin:0;padding-left:18px}}
  .historico time{{font-weight:800;margin-right:6px}}
  footer{{background:var(--ink);color:#d9cff7;margin-top:48px;padding:20px 0;font-size:14px}}
  footer a{{color:#fff}}
  @media (max-width:600px){{.data{{margin-left:0;flex-basis:100%}}}}
</style>
</head>
<body>
<div class="wrap">
  <header class="topo"><a class="marca" href="../">Crie o primeiro obby com seu filho(a)</a></header>
  <span class="selo">Atualizado em {html.escape(ultima)}</span>
  <h1>Os códigos do livro, sempre atualizados</h1>
  <p class="lead">O Roblox Studio, o Scratch e o MakeCode Arcade mudam de vez em quando. Quando alguma coisa do livro deixar de funcionar, a versão corrigida aparece aqui primeiro, com a data da atualização.</p>
  <p class="lead">Copiem o código, mas leiam juntos antes de colar: entender cada linha é o que faz a criança virar autora do jogo.</p>
  <nav class="indice" aria-label="Capítulos"><ul>{''.join(indice)}</ul></nav>
  {''.join(secoes)}
  <section class="historico" aria-labelledby="t-hist"><h2 id="t-hist">O que mudou</h2><ul>{historico}</ul></section>
</div>
<footer><div class="wrap">Achou um código que não funciona mais? Conte para a autora pelo <a href="https://www.instagram.com/paulapeclat.oficial/">Instagram @paulapeclat.oficial</a>. · <a href="{REPO}/tree/main/primeiro-obby/codigo">Ver a pasta no GitHub</a></div></footer>
<script>
document.querySelectorAll("[data-copiar]").forEach(function (b) {{
  b.addEventListener("click", function () {{
    var pre = document.getElementById(b.getAttribute("data-copiar"));
    var texto = pre ? pre.textContent : "";
    var feito = function (msg) {{ b.textContent = msg; setTimeout(function () {{ b.textContent = "Copiar código"; }}, 1800); }};
    if (navigator.clipboard) navigator.clipboard.writeText(texto).then(function () {{ feito("Copiado!"); }}, function () {{ feito("Selecione e copie"); }});
    else feito("Selecione e copie");
  }});
}});
</script>
</body>
</html>
"""
    (PASTA / "index.html").write_text(pagina, encoding="utf-8")
    print("primeiro-obby/codigo/index.html:", len(secoes), "seções")


if __name__ == "__main__":
    main()
