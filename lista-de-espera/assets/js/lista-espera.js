/* =========================================================
   Paula Peclat · EdTech — lista-espera.js
   Tutorial da lista de espera 2027 (/lista-de-espera/).
   Envia para um Formulário Google ligado a uma planilha.
   Sem innerHTML (compatível com Trusted Types).
   ========================================================= */
"use strict";
(() => {
  const root = document.getElementById("wl-tour"); if (!root) return;

  /* Formulário Google "Lista de espera 2027" → planilha "Lista de espera 2027 (respostas)" */
  const FORM = "https://docs.google.com/forms/d/e/1FAIpQLSds5SkgWUybbARr5VIMO_FLflmbSwW2V_nHt6uMt0Lqy4LZSg/formResponse";
  const ENTRY = { interesses:"entry.1420383185", perfil:"entry.1140994524", nome:"entry.2145847013", contato:"entry.1077968378",
                  pais:"entry.2120712312", idades:"entry.299919280", instituicao:"entry.1167720853", obs:"entry.678919319", origem:"entry.1057893716" };
  const WA = "";                                    // seu WhatsApp com DDI e DDD, só dígitos (ex.: 5521999999999). Vazio esconde o botão.
  const WA_OK = WA.length >= 10;
  const IG = "https://ig.me/m/paulapeclat.oficial";

  const NAMES = { apede:"APedê (piloto)", curso:"Curso de Inovação e Criação", grupo:"Dupla ou trio", ferias:"Colônia de férias", escolas:"Para escolas", empresas:"Para empresas" };
  const q  = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clip = (s, n) => String(s ?? "").replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
  const mem = { get(k){ try { return localStorage.getItem(k); } catch { return null; } }, set(k,v){ try { localStorage.setItem(k,v); } catch {} } };
  const t0 = performance.now();

  const form = q("#wl-form"), err = q("#wl-err"), say = q("#wl-say"), count = q("#wl-count");
  const steps = ["#passo-1","#passo-2","#passo-3","#passo-4"].map(s => q(s));
  const ends = { pronto: q("#pronto"), enviar: q("#enviar") };
  const bar = qa(".tour-bar li", root), nav = q("#wl-nav"), back = q("#wl-back"), next = q("#wl-next");
  let cur = 0;

  const chosen = () => qa("input[name=p]:checked", form).map(i => i.value);
  const nudge = msg => { say.textContent = msg; };

  function show(i, opts = {}) {
    const st = typeof i === "string" ? ends[i] : steps[i];
    [...steps, ends.pronto, ends.enviar].forEach(s => { s.hidden = s !== st; s.dataset.dir = opts.dir || "fwd"; });
    nudge(st.dataset.say || "");
    if (typeof i === "string") {
      bar.forEach(li => { li.className = "done"; li.querySelector("button").removeAttribute("aria-current"); });
      count.textContent = i === "pronto" ? "Tudo pronto" : "Tudo pronto · falta enviar";
      nav.hidden = true;
    } else {
      cur = i; nav.hidden = false;
      bar.forEach((li, k) => {
        li.className = k < i ? "done" : (k === i ? "on" : "");
        const b = li.querySelector("button"); if (k === i) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
      });
      count.textContent = `Passo ${i + 1} de 4 · cerca de ${i < 2 ? "1 minuto" : "30 segundos"}`;
      back.hidden = i === 0;
      next.textContent = st.dataset.next || "Próximo →";
      if (i === 3) syncPicked();
    }
    if (opts.push !== false) { try { history.replaceState(null, "", "#" + st.id); } catch {} }
    if (opts.focus) {
      const h = q(".t-title", st); if (h) { h.tabIndex = -1; h.focus({ preventScroll:true }); }
      root.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start" });
    }
  }

  function goNext() {
    if (cur === 2 && !chosen().length) { nudge("Marque pelo menos um modo, aqui ou no passo anterior, para entrar na fila."); return; }
    if (cur < 3) { show(cur + 1, { focus:true }); return; }
    submit();
  }
  form.addEventListener("submit", e => { e.preventDefault(); goNext(); });
  back.addEventListener("click", () => { if (cur > 0) show(cur - 1, { dir:"back", focus:true }); });
  bar.forEach((li, k) => li.querySelector("button").addEventListener("click", () => {
    if (k === 3 && !chosen().length) { show(2, { focus:true }); nudge("Primeiro marque pelo menos um modo."); return; }
    show(k, { dir: k < cur ? "back" : "fwd", focus:true });
  }));

  /* perfil e resumo */
  function syncPerfil() {
    const p = q("input[name=perfil]:checked", form).value;
    q("#f-idade").hidden = p !== "Família";
    q("#f-org").hidden = p === "Família";
  }
  function syncPicked() {
    const box = q("#wl-picked"); box.replaceChildren();
    const lab = document.createElement("span"); lab.textContent = "Você vai entrar em:"; box.append(lab);
    chosen().forEach(k => { const s = document.createElement("span"); s.className = "pill" + (k === "apede" ? " pill-apede" : ""); s.textContent = NAMES[k]; box.append(s); });
    const b = document.createElement("button"); b.type = "button"; b.className = "linkbtn"; b.textContent = "trocar";
    b.addEventListener("click", () => show(1, { dir:"back", focus:true })); box.append(b);
  }
  form.addEventListener("change", e => {
    if (e.target.name === "perfil") syncPerfil();
    if (e.target.id === "p-apede") nudge(e.target.checked ? "Ótimo! Você está na fila do piloto. Siga para o próximo passo." : steps[1].dataset.say);
  });
  syncPerfil();

  /* envio */
  const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
  const PHONE = /^[+()\d\s-]{8,24}$/;
  function collect() {
    const v = id => q(id).value;
    const perfil = q("input[name=perfil]:checked", form).value;
    const params = new URLSearchParams(location.search);
    return {
      form: "fila2027",
      interesses: chosen().map(k => NAMES[k]).join(", "),
      apede: chosen().includes("apede") ? "sim" : "não",
      perfil: clip(perfil, 20), nome: clip(v("#nome"), 80), contato: clip(v("#contato"), 120),
      pais: clip(v("#pais"), 20), idades: perfil === "Família" ? clip(v("#idades"), 40) : "",
      instituicao: perfil !== "Família" ? clip(v("#org"), 120) : "", obs: clip(v("#obs"), 400),
      origem: clip(params.get("utm_source") || (document.referrer ? new URL(document.referrer).hostname : "direto"), 60),
      site: v("#wl-site")
    };
  }
  function message(d) {
    const L = ["#FILA2027 · quero entrar na lista de espera", "Interesse: " + d.interesses,
      "Perfil: " + d.perfil, "Nome: " + d.nome, "Contato: " + d.contato, "País: " + d.pais];
    if (d.idades) L.push("Idades: " + d.idades);
    if (d.instituicao) L.push("Instituição: " + d.instituicao);
    if (d.obs) L.push("Obs.: " + d.obs);
    L.push("Autorizo o contato sobre vagas e turmas (LGPD).");
    return L.join("\n");
  }
  async function submit() {
    const d = collect(); let m = "", f = null;
    if (!chosen().length) { show(2, { dir:"back", focus:true }); nudge("Marque pelo menos um modo para entrar na fila."); return; }
    if (!d.nome) { m = "Escreva seu nome."; f = "#nome"; }
    else if (!EMAIL.test(d.contato) && !PHONE.test(d.contato)) { m = "Confira o WhatsApp ou e-mail. Ex.: (21) 99999-9999 ou nome@email.com"; f = "#contato"; }
    else if (!q("#lgpd").checked) { m = "Marque a autorização de contato para guardar seu lugar."; f = "#lgpd"; }
    if (m) { err.textContent = m; err.hidden = false; nudge(m); q(f).focus(); return; }
    err.hidden = true;
    if (d.site || performance.now() - t0 < 4000) { show("pronto", { focus:true }); return; }       // robô: finge sucesso
    const last = +(mem.get("fila-ts") || 0);
    if (Date.now() - last < 60000 && mem.get("fila-key") === d.contato) { show("pronto", { focus:true }); return; }

    next.disabled = true; next.textContent = "Guardando…";
    try {
      const body = new URLSearchParams();
      Object.keys(ENTRY).forEach(k => body.append(ENTRY[k], d[k] || ""));
      await fetch(FORM, { method:"POST", mode:"no-cors", body, credentials:"omit", referrerPolicy:"no-referrer" });
      mem.set("fila-ts", String(Date.now())); mem.set("fila-key", d.contato);
      q("#pronto-lista").replaceChildren(...chosen().map(k => { const s = document.createElement("span"); s.className = "pill" + (k === "apede" ? " pill-apede" : ""); s.textContent = NAMES[k]; return s; }));
      show("pronto", { focus:true });
      return;
    } catch { /* sem rede ou bloqueado: cai para o envio manual */ }
    finally { next.disabled = false; next.textContent = steps[3].dataset.next; }
    manual(message(d));
  }

  function manual(text) {
    q("#wl-msg").textContent = text;
    const wa = q("#wl-wa");
    if (WA_OK) { wa.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); wa.hidden = false; } else wa.hidden = true;
    q("#wl-copied").hidden = true;
    show("enviar", { focus:true });
  }
  q("#wl-ig").href = IG;
  q("#wl-again").addEventListener("click", () => show(3, { dir:"back", focus:true }));
  q("#wl-copy").addEventListener("click", async () => {
    const c = q("#wl-copied"), b = document.createElement("span"); b.className = "copied";
    try { await navigator.clipboard.writeText(q("#wl-msg").textContent); b.textContent = "Copiada."; c.replaceChildren(b, " Cole na conversa com @paulapeclat.oficial e envie."); }
    catch { const r = document.createRange(); r.selectNodeContents(q("#wl-msg")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Texto selecionado."; c.replaceChildren(b, " Use Ctrl+C ou “Copiar” do celular."); }
    c.hidden = false; nudge("Copiada! Agora abra o Instagram e cole na conversa.");
  });

  /* início: #apede (ou outro modo) marca e abre o passo certo; #passo-N abre o passo */
  root.classList.add("is-tour");
  const h = location.hash.slice(1);
  let start = 0;
  if (NAMES[h]) { const c = q("#p-" + h); if (c) c.checked = true; start = h === "apede" ? 1 : 2; }
  else { const mm = h.match(/^passo-([1-4])$/); if (mm) start = +mm[1] - 1; if (start === 3 && !chosen().length) start = 2; }
  show(start, { push:false });
  addEventListener("hashchange", () => {
    const mm = location.hash.match(/^#passo-([1-4])$/); if (!mm) return;
    let k = +mm[1] - 1; if (k === 3 && !chosen().length) k = 2;
    if (k !== cur || nav.hidden) show(k, { push:false, focus:true });
  });
})();
