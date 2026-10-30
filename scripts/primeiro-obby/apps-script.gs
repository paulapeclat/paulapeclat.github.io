/**
 * Lista de espera "Crie o primeiro obby com seu filho(a)"
 * Cole este código em uma planilha Google: Extensões → Apps Script.
 * Depois: Implantar → Nova implantação → App da Web
 *   Executar como: Eu · Quem pode acessar: Qualquer pessoa
 * Copie a URL gerada para ENDPOINT em primeiro-obby/index.html.
 */
const ABA = "primeiro-obby";
// Link do PDF do Capítulo 5. Ele já vai junto na página do GitHub Pages.
// Deixe vazio ("") para desligar o envio do e-mail; a inscrição continua sendo salva.
const CAPITULO_URL = "https://paulapeclat.github.io/primeiro-obby/capitulo-5-de-presente.pdf";
// Pedidos de SAIR: apague a linha da pessoa na aba "primeiro-obby" em até 15 dias.

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.produto !== "primeiro-obby") return resposta("ignorado");

  const email = String(p.email || "").trim().toLowerCase().slice(0, 120);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return resposta("email-invalido");

  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const planilha = SpreadsheetApp.getActiveSpreadsheet();
    const aba = planilha.getSheetByName(ABA) || criarAba(planilha);

    // não duplica o mesmo e-mail
    const emails = aba.getRange(2, 3, Math.max(aba.getLastRow() - 1, 1), 1).getValues().flat();
    if (emails.indexOf(email) !== -1) return resposta("ja-inscrito");

    aba.appendRow([
      new Date(),
      limpar(p.nome, 80),
      email,
      limpar(p.idade, 40),
      limpar(p.area, 60),
      limpar(p.origem, 200),
      limpar(p.pagina, 200),
    ]);
    enviarPresente(email, limpar(p.nome, 80));
    return resposta("ok");
  } finally {
    lock.releaseLock();
  }
}

function enviarPresente(email, nome) {
  if (!CAPITULO_URL) return;
  const primeiroNome = String(nome || "").replace(/^'/, "").split(" ")[0] || "";
  MailApp.sendEmail({
    to: email,
    name: "Paula Peclat",
    subject: "Capítulo 5: o primeiro script do seu filho",
    htmlBody:
      "<p>Oi" + (primeiroNome ? ", " + primeiroNome : "") + "!</p>" +
      "<p>Você está na lista de espera de <b>Crie o primeiro obby com seu filho(a)</b>. " +
      "Como prometido, aqui está o Capítulo 5, em que a criança escreve o primeiro código da vida dela:</p>" +
      '<p><a href="' + CAPITULO_URL + '">Baixar o Capítulo 5</a></p>' +
      "<p>Uma dica antes de começar: deixe o teclado com ela, mesmo quando der erro.</p>" +
      "<p>Paula Peclat<br>pedagoga e game developer</p>" +
      "<p style=\"font-size:12px;color:#666\">Você recebeu este e-mail porque entrou na lista de espera do livro. " +
      "Para sair, responda com a palavra SAIR ou escreva para profpaula@paulapeclat.com.br, e seus dados serão apagados. " +
      "<a href=\"https://paulapeclat.github.io/primeiro-obby/privacidade.html\">Política de Privacidade</a></p>",
  });
}

function criarAba(planilha) {
  const aba = planilha.insertSheet(ABA);
  aba.appendRow(["Data", "Nome", "E-mail", "Idade da criança", "Trabalha com tecnologia", "Origem", "Página"]);
  aba.setFrozenRows(1);
  return aba;
}

// evita que alguém injete fórmula na planilha (=, +, -, @)
function limpar(valor, max) {
  const s = String(valor || "").trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function resposta(status) {
  return ContentService.createTextOutput(JSON.stringify({ status: status }))
    .setMimeType(ContentService.MimeType.JSON);
}
