/**
 * Listas de espera dos livros de Paula Peclat.
 * Um único script recebe as inscrições das duas páginas e grava cada uma na sua aba:
 *   paulapeclat.github.io/livros/         -> aba "Livros"
 *   paulapeclat.github.io/primeiro-obby/  -> aba "Primeiro obby"
 */

const ABAS = {
  livros: { nome: "Livros", cabecalho: ["Data", "Nome", "E-mail", "Perfil", "Livros", "Aceite", "Origem"] },
  "primeiro-obby": { nome: "Primeiro obby", cabecalho: ["Data", "Nome", "E-mail", "Idade da criança", "Área", "Aceite", "Origem", "Página"] },
};
const LIVROS_VALIDOS = ["Meu filho só quer jogar", "Obby de Papel", "Manual de Sobrevivência"];
const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const produto = p.produto === "primeiro-obby" ? "primeiro-obby" : "livros";
    const nome = limpar(p.nome, 80);
    const email = limpar(p.email, 120).toLowerCase();
    if (!nome || !EMAIL_OK.test(email)) return resposta({ ok: false });

    const aba = pegarAba(produto);
    const linhas = aba.getDataRange().getValues();
    const existente = linhas.findIndex((l, i) => i > 0 && String(l[2]).toLowerCase() === email);

    if (produto === "livros") {
      if (p.aceite !== "sim") return resposta({ ok: false });
      const livros = limpar(p.livros, 300).split("|").map(s => s.trim()).filter(s => LIVROS_VALIDOS.indexOf(s) !== -1);
      if (!livros.length) return resposta({ ok: false });
      if (existente > 0) {
        const atuais = String(linhas[existente][4]).split("|").map(s => s.trim()).filter(Boolean);
        livros.forEach(l => { if (atuais.indexOf(l) === -1) atuais.push(l); });
        aba.getRange(existente + 1, 5).setValue(atuais.join(" | "));
        return resposta({ ok: true, atualizado: true });
      }
      aba.appendRow([new Date(), nome, email, limpar(p.perfil, 40), livros.join(" | "), "sim", limpar(p.origem, 40) || "direto"]);
    } else {
      if (existente > 0) return resposta({ ok: true, atualizado: true });
      aba.appendRow([new Date(), nome, email, limpar(p.idade, 30), limpar(p.area, 40), "sim",
        limpar(p.origem, 200) || "direto", limpar(p.pagina, 200)]);
    }
    return resposta({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function pegarAba(produto) {
  const cfg = ABAS[produto];
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(cfg.nome);
  if (!aba) {
    aba = planilha.insertSheet(cfg.nome);
    aba.appendRow(cfg.cabecalho);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, cfg.cabecalho.length).setFontWeight("bold");
  }
  return aba;
}

// Neutraliza textos que começariam uma fórmula na planilha (=, +, -, @).
function limpar(valor, max) {
  let s = String(valor || "").replace(/\s+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Rode uma vez pelo editor: cria as duas abas e pede a autorização.
function preparar() {
  pegarAba("livros");
  pegarAba("primeiro-obby");
}
