#!/usr/bin/env python3
"""
Gera index.html, sitemap.xml e robots.txt a partir de data/projetos.json.

Paula só adiciona projetos em data/projetos.json (e o print em assets/projetos/)
e comita. O workflow gera o site e publica no GitHub Pages.

O HTML sai pronto do script, com todo o texto no código da página, porque é
assim que o Google lê melhor (nada depende de JavaScript pra aparecer).

Uso local: python scripts/gerar_site.py
"""
import json
from datetime import date
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DADOS = ROOT / "data" / "projetos.json"
URL = "https://paulapeclat.github.io/"
SITE = "https://paulapeclat.com.br"

EMPRESA = "Educação Tecnológica Paula Peclat"
TITULO = "Projetos das crianças | Educação Tecnológica Paula Peclat"
DESCRICAO = (
    "Jogos, apps e projetos de inteligência artificial criados por crianças nas aulas online "
    "de criação de tecnologias digitais da Educação Tecnológica Paula Peclat, com alunos do Brasil e de Portugal."
)

# mesma paleta da logo (ver paulapeclat/paulapeclat scripts/paleta.py)
CORES = ["#8D48E5", "#F6B50D", "#12A9DB", "#E14489", "#80C733"]

TRILHA = [
    ("Code.org", "blocos"),
    ("Thunkable", "blocos e apps"),
    ("MakeCode Arcade", "blocos e JavaScript"),
    ("microStudio", "código simples"),
    ("GDevelop", "eventos"),
    ("Roblox Studio", "Luau"),
    ("Python", "texto puro"),
]

ANO = [
    ("Colônia de férias", "Oficinas de Blender e n8n nas férias."),
    ("Beta Experience", "Todas as turmas testam os jogos umas das outras e dão retorno de jogador."),
    ("Hackathon", "Um desafio que atravessa as férias e termina com a entrega dos projetos."),
    ("Premiação dos Criadores", "O momento de reconhecer o que cada criança criou."),
    ("Encontros Brasil e Portugal", "Crianças dos dois países mostram o que criaram umas para as outras."),
]

COMO = [
    ("Criar vem antes de decorar código", "O objetivo é a criança produzir tecnologia de verdade. A sintaxe chega quando faz sentido pro projeto dela."),
    ("Cada criança tem a sua trilha", "Dá pra começar pelo Roblox ou pelo Python. A trilha muda pra manter a criança engajada."),
    ("Inteligência artificial com senso crítico", "As turmas usam IA pra criar gamificações e aprendem a questionar o que ela entrega."),
    ("Aula pra todo jeito de aprender", "As aulas acolhem crianças típicas e neurodivergentes, como autistas, com TDAH e com altas habilidades."),
]

LINKS = [
    ("Site", SITE),
    ("Instagram", "https://instagram.com/paulapeclat.oficial"),
    ("LinkedIn da empresa", "https://www.linkedin.com/company/educacao-tecnologica-paula-peclat"),
    ("GitHub", "https://github.com/paulapeclat"),
    ("YouTube", "https://www.youtube.com/@ppeclat"),
]


def e(texto) -> str:
    return escape(str(texto), quote=True)


def json_ld(projetos: list) -> str:
    pessoa = {
        "@type": "Person",
        "@id": URL + "#paula",
        "name": "Paula Peclat",
        "jobTitle": "Pedagoga e game developer",
        "url": SITE,
        "worksFor": {"@id": URL + "#empresa"},
        "sameAs": [
            "https://github.com/paulapeclat",
            "https://www.linkedin.com/in/paulapeclat/",
            "https://instagram.com/paulapeclat.oficial",
            "https://www.youtube.com/@ppeclat",
            "https://lattes.cnpq.br/7801922150368918",
            "https://orcid.org/0009-0008-6535-7090",
        ],
    }
    empresa = {
        "@type": "EducationalOrganization",
        "@id": URL + "#empresa",
        "name": EMPRESA,
        "alternateName": "Paula Peclat Educação Tecnológica",
        "description": "Aulas online de criação de tecnologias digitais para crianças: jogos, apps e inteligência artificial.",
        "url": SITE,
        "logo": URL + "assets/logo.png",
        "founder": {"@id": URL + "#paula"},
        "areaServed": [{"@type": "Country", "name": "Brasil"}, {"@type": "Country", "name": "Portugal"}],
        "sameAs": [
            "https://www.linkedin.com/company/educacao-tecnologica-paula-peclat",
            "https://instagram.com/paulapeclat.oficial",
        ],
    }
    pagina = {
        "@type": "CollectionPage",
        "@id": URL,
        "url": URL,
        "name": TITULO,
        "description": DESCRICAO,
        "inLanguage": "pt-BR",
        "about": {"@id": URL + "#empresa"},
        "author": {"@id": URL + "#paula"},
    }
    grafo = [empresa, pessoa, pagina]
    if projetos:
        pagina["mainEntity"] = {
            "@type": "ItemList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": i + 1,
                    "item": {
                        "@type": "CreativeWork",
                        "name": p["titulo"],
                        "description": p.get("descricao", ""),
                        "about": p.get("ferramenta", ""),
                        **({"url": p["link"]} if p.get("link") else {}),
                    },
                }
                for i, p in enumerate(projetos)
            ],
        }
    return json.dumps({"@context": "https://schema.org", "@graph": grafo}, ensure_ascii=False, indent=2)


def externo(url: str) -> bool:
    return url.startswith("http://") or url.startswith("https://")


def link(url: str, texto: str, classe: str) -> str:
    # links para fora abrem em outra aba, sem passar referência nem acesso à página
    extra = ' target="_blank" rel="noopener noreferrer"' if externo(url) else ""
    return f'<a class="{classe}" href="{e(url)}"{extra}>{texto}</a>'


def galeria(projetos: list) -> str:
    if not projetos:
        return '''<p class="vazio">A galeria abre com os jogos do próximo Beta Experience, quando as turmas testam os projetos umas das outras. <a href="https://instagram.com/paulapeclat.oficial">Acompanhe pelo Instagram</a> enquanto isso.</p>'''
    itens = []
    for i, p in enumerate(projetos):
        cor = CORES[i % len(CORES)]
        quem = e(p.get("autor", ""))
        if p.get("idade"):
            quem += f", {e(p['idade'])} anos"
        img = f'<img src="{e(p["imagem"])}" alt="Tela do jogo {e(p["titulo"])}" loading="lazy" decoding="async" width="640" height="400" referrerpolicy="no-referrer">' if p.get("imagem") else ""
        desc = f'\n        <p>{e(p["descricao"])}</p>' if p.get("descricao") else ""
        acoes = []
        if p.get("link"):
            acoes.append(link(p["link"], f'Jogar <span class="sr-only">{e(p["titulo"])}</span>', "jogar"))
        if p.get("multijogador"):
            acoes.append(link(p["multijogador"], "Jogar com amigos", "jogar amigos"))
        botoes = f'\n        <p class="botoes">{" ".join(acoes)}</p>' if acoes else ""
        itens.append(f'''      <li class="projeto" style="--cor:{cor}">
        {img}
        <h3>{e(p["titulo"])}</h3>
        <p class="meta">{e(p.get("ferramenta", ""))}{" · por " + quem if quem else ""}{" · " + e(p["evento"]) if p.get("evento") else ""}</p>{desc}{botoes}
      </li>''')
    return '<ul class="grade">\n' + "\n".join(itens) + "\n    </ul>"


def csp(projetos: list) -> str:
    # capas que ainda não foram importadas vêm de fora; só esse endereço é liberado
    fora = sorted({"https://" + p["imagem"].split("/")[2] for p in projetos if externo(p.get("imagem", ""))})
    img = " ".join(["'self'", "data:"] + fora)
    return ("default-src 'self'; script-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; "
            f"img-src {img}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src https://fonts.gstatic.com; connect-src 'none'; frame-src 'none'; upgrade-insecure-requests")


def pagina(projetos: list) -> str:
    trilha = "\n".join(
        f'      <li style="--cor:{CORES[i % len(CORES)]}; --passo:{i}"><span class="ferramenta">{e(n)}</span><span class="tipo">{e(t)}</span></li>'
        for i, (n, t) in enumerate(TRILHA)
    )
    ano = "\n".join(f"      <li><h3>{e(n)}</h3><p>{e(t)}</p></li>" for n, t in ANO)
    como = "\n".join(f"      <li><h3>{e(n)}</h3><p>{e(t)}</p></li>" for n, t in COMO)
    links = "\n".join(f'      <li><a href="{e(u)}" rel="me">{e(n)}</a></li>' for n, u in LINKS)

    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="{csp(projetos)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>{e(TITULO)}</title>
<meta name="description" content="{e(DESCRICAO)}">
<link rel="canonical" href="{URL}">
<meta name="author" content="Paula Peclat">
<meta name="theme-color" content="#000104">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="{e(EMPRESA)}">
<meta property="og:title" content="{e(TITULO)}">
<meta property="og:description" content="{e(DESCRICAO)}">
<meta property="og:url" content="{URL}">
<meta property="og:image" content="{URL}assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
<link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96.png">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;800&display=swap" rel="stylesheet">
<script type="application/ld+json">
{json_ld(projetos)}
</script>
<style>
  :root {{
    --preto: #000104; --branco: #F2EFEA; --suave: #B9B4AD; --linha: rgba(242,239,234,.12);
    --roxo: #8D48E5; --amarelo: #F6B50D; --azul: #12A9DB; --rosa: #E14489; --verde: #80C733;
  }}
  * {{ box-sizing: border-box; margin: 0 }}
  html {{ background: var(--preto); color: var(--branco) }}
  body {{ font: 400 1.0625rem/1.65 Nunito, system-ui, sans-serif; -webkit-font-smoothing: antialiased }}
  a {{ color: inherit; text-decoration-color: var(--amarelo); text-decoration-thickness: 2px; text-underline-offset: 3px }}
  a:hover {{ color: var(--amarelo) }}
  :focus-visible {{ outline: 3px solid var(--amarelo); outline-offset: 3px; border-radius: 6px }}
  h1, h2, h3 {{ font-family: Fredoka, Nunito, sans-serif; font-weight: 600; line-height: 1.12 }}
  .miolo {{ width: min(1080px, 100% - 2rem); margin-inline: auto }}

  header {{ display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: 1.25rem }}
  header img {{ width: 64px; height: 64px; border-radius: 14px }}
  header nav a {{ font-weight: 800; text-decoration: none; margin-left: 1.25rem }}

  .abertura {{ display: grid; grid-template-columns: 1.15fr .85fr; gap: 3rem; align-items: end; padding-block: 3.5rem 4.5rem }}
  .abertura h1 {{ font-size: clamp(2.6rem, 6.2vw, 4.6rem); font-weight: 700; letter-spacing: -.01em }}
  .abertura p {{ font-size: 1.2rem; color: var(--suave); max-width: 34em; margin-top: 1.25rem }}
  .acoes {{ display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem }}
  .botao {{ font: 600 1.05rem Fredoka, sans-serif; padding: .8rem 1.4rem; border-radius: 999px; text-decoration: none; background: var(--amarelo); color: var(--preto) }}
  .botao:hover {{ background: var(--branco); color: var(--preto) }}
  .botao.contorno {{ background: transparent; color: var(--branco); box-shadow: inset 0 0 0 2px var(--linha) }}
  .botao.contorno:hover {{ box-shadow: inset 0 0 0 2px var(--branco); color: var(--branco) }}

  /* a escada de blocos: o único momento animado da página */
  .trilha {{ list-style: none; padding: 0; display: grid; gap: .45rem }}
  .trilha li {{ display: flex; align-items: baseline; justify-content: space-between; gap: 1rem;
    background: var(--cor); color: var(--preto); border-radius: 14px; padding: .55rem 1rem;
    width: calc(64% + var(--passo) * 6%); margin-left: auto;
    animation: sobe .5s calc(var(--passo) * 90ms) cubic-bezier(.2,.9,.3,1.3) both }}
  .trilha .ferramenta {{ font: 600 1.05rem Fredoka, sans-serif }}
  .trilha .tipo {{ font-size: .85rem; font-weight: 600; opacity: .8 }}
  .legenda {{ font-size: .9rem; color: var(--suave); text-align: right; margin-top: .75rem }}
  @keyframes sobe {{ from {{ transform: translateY(18px); opacity: 0 }} }}
  @media (prefers-reduced-motion: reduce) {{ .trilha li {{ animation: none }} }}

  section {{ padding-block: 4rem; border-top: 1px solid var(--linha) }}
  section > h2 {{ font-size: clamp(1.8rem, 3.6vw, 2.5rem); max-width: 22ch }}
  section > .intro {{ color: var(--suave); max-width: 40em; margin-top: .75rem }}

  .grade {{ list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2rem; margin-top: 2.5rem }}
  .projeto img {{ display: block; background: #15151c; width: 100%; height: auto; aspect-ratio: 16/10; object-fit: cover; border-radius: 16px; border-bottom: 6px solid var(--cor) }}
  .projeto h3 {{ font-size: 1.35rem; margin-top: .9rem }}
  .projeto .meta {{ color: var(--suave); font-size: .9rem }}
  .projeto .meta {{ margin-top: .2rem }}
  .projeto .botoes {{ display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem }}
  .projeto .jogar {{ display: inline-block; font: 600 1rem Fredoka, sans-serif; padding: .5rem 1.1rem; border-radius: 999px; text-decoration: none; background: var(--cor); color: var(--preto) }}
  .projeto .jogar:hover {{ background: var(--branco); color: var(--preto) }}
  .projeto .jogar.amigos {{ background: transparent; color: var(--branco); box-shadow: inset 0 0 0 2px var(--linha) }}
  .sr-only {{ position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap }}
  .vazio {{ margin-top: 2rem; max-width: 40em; padding-left: 1.25rem; border-left: 4px solid var(--rosa); font-size: 1.1rem }}

  .lista {{ list-style: none; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 3rem; margin-top: 2.5rem }}
  .lista h3 {{ font-size: 1.3rem }}
  .lista p {{ color: var(--suave); margin-top: .35rem; max-width: 34em }}

  .quem {{ display: grid; grid-template-columns: auto 1fr; gap: 2.5rem; align-items: start }}
  .quem img {{ width: 180px; height: 180px; border-radius: 28px }}
  .quem p {{ max-width: 38em; margin-top: .75rem }}
  .redes {{ list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: .5rem 1.5rem; margin-top: 1.25rem; font-weight: 800 }}

  footer {{ padding-block: 2.5rem; color: var(--suave); font-size: .9rem; border-top: 1px solid var(--linha) }}

  @media (max-width: 760px) {{
    .abertura, .quem, .lista {{ grid-template-columns: 1fr }}
    .abertura {{ padding-block: 2rem 3rem; gap: 2.5rem }}
    .trilha li {{ width: calc(70% + var(--passo) * 5%) }}
    header nav {{ display: none }}
    .quem img {{ width: 120px; height: 120px }}
  }}
</style>
</head>
<body>
<header class="miolo">
  <a href="{SITE}" aria-label="{e(EMPRESA)}"><img src="assets/logo.png" alt="Logo da {e(EMPRESA)}" width="64" height="64"></a>
  <nav aria-label="Seções">
    <a href="#projetos">Projetos</a>
    <a href="#ano">O ano das turmas</a>
    <a href="#paula">Quem conduz</a>
  </nav>
</header>

<main>
  <div class="miolo abertura">
    <div>
      <h1>Crianças que criam jogos, apps e inteligência artificial</h1>
      <p>Aulas online de criação de tecnologias digitais para crianças, com Paula Peclat. Alunos de todo o Brasil e de Portugal aprendem programando, brincando e sendo protagonistas do que criam.</p>
      <div class="acoes">
        <a class="botao" href="{SITE}">Conhecer as aulas</a>
        <a class="botao contorno" href="#projetos">Ver os projetos</a>
      </div>
    </div>
    <div>
      <ol class="trilha" aria-label="Ferramentas da trilha, do concreto ao abstrato">
{trilha}
      </ol>
      <p class="legenda">A trilha vai do concreto ao abstrato, e cada criança percorre a sua.</p>
    </div>
  </div>

  <section id="projetos" class="miolo">
    <h2>Projetos das turmas</h2>
    <p class="intro">Jogos criados pelas crianças nas aulas, prontos para jogar no navegador. Cada um aparece só com o primeiro nome ou o apelido de quem criou.</p>
    {galeria(projetos)}
  </section>

  <section id="ano" class="miolo">
    <h2>O ano das turmas</h2>
    <p class="intro">Além das aulas individuais, o calendário tem momentos em que as crianças mostram, testam e celebram o que criaram.</p>
    <ul class="lista">
{ano}
    </ul>
  </section>

  <section id="como" class="miolo">
    <h2>Como as aulas funcionam</h2>
    <ul class="lista">
{como}
    </ul>
  </section>

  <section id="paula" class="miolo quem">
    <img src="assets/logo.png" alt="" width="180" height="180">
    <div>
      <h2>Quem conduz</h2>
      <p>Paula Peclat é pedagoga e game developer, mestranda em Educação no PPGEduc/UFRRJ e está em sala de aula desde 2007. Na {e(EMPRESA)}, ensina crianças a criar tecnologia com as ferramentas de que elas já gostam.</p>
      <ul class="redes">
{links}
      </ul>
    </div>
  </section>
</main>

<footer class="miolo">
  <p>{e(EMPRESA)}. Aulas online para crianças no Brasil e em Portugal. Página atualizada em {date.today().strftime("%d/%m/%Y")}.</p>
</footer>
</body>
</html>
'''


def main():
    dados = json.loads(DADOS.read_text(encoding="utf-8"))
    projetos = dados.get("projetos", [])
    (ROOT / "index.html").write_text(pagina(projetos), encoding="utf-8")
    (ROOT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"  <url><loc>{URL}</loc><lastmod>{date.today().isoformat()}</lastmod></url>\n"
        f"  <url><loc>{URL}livros/</loc><lastmod>{date.today().isoformat()}</lastmod></url>\n"
        f"  <url><loc>{URL}lista-de-espera/</loc><lastmod>{date.today().isoformat()}</lastmod></url>\n"
        f"  <url><loc>{URL}primeiro-obby/</loc><lastmod>{date.today().isoformat()}</lastmod></url>\n</urlset>\n",
        encoding="utf-8",
    )
    (ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {URL}sitemap.xml\n", encoding="utf-8")
    print(f"site gerado com {len(projetos)} projeto(s)")


if __name__ == "__main__":
    main()
