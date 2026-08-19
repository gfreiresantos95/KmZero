/* ═══════════════════════════════════════════════════════════════════
   KmZero — alternância de tema (claro / escuro)

   Progressive enhancement: o botão nasce com `hidden` no HTML e só
   aparece aqui. Sem JavaScript não existe controle morto na tela, e a
   página continua respeitando a preferência do sistema pelo @media de
   tokens.css (§8 item 17 — as páginas públicas funcionam sem JS).
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var CHAVE = "kmzero:tema";
  var botao = document.getElementById("alternar-tema");
  var rotulo = document.getElementById("rotulo-tema");
  if (!botao || !rotulo) return;

  var raiz = document.documentElement;
  var sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)");

  function estaEscuro() {
    var explicito = raiz.dataset.tema;
    if (explicito === "escuro") return true;
    if (explicito === "claro") return false;
    return sistemaEscuro.matches;
  }

  /* O rótulo diz para onde o botão leva, não onde se está — é o que a
     pessoa precisa saber antes de clicar. Texto + estado, nunca só
     ícone (§4.6 regra 1). */
  function sincronizar() {
    var escuro = estaEscuro();
    botao.setAttribute("aria-pressed", String(escuro));
    rotulo.textContent = escuro ? "Ativar modo claro" : "Ativar modo escuro";
  }

  botao.addEventListener("click", function () {
    var proximo = estaEscuro() ? "claro" : "escuro";
    raiz.dataset.tema = proximo;
    try {
      localStorage.setItem(CHAVE, proximo);
    } catch (e) {
      /* Navegação privativa ou armazenamento bloqueado: o tema vale
         para esta visita e nada quebra. */
    }
    sincronizar();
  });

  /* Enquanto a escolha for implícita, seguir o sistema se ele mudar. */
  var aoMudarSistema = function () {
    if (!raiz.dataset.tema) sincronizar();
  };
  if (sistemaEscuro.addEventListener) {
    sistemaEscuro.addEventListener("change", aoMudarSistema);
  } else if (sistemaEscuro.addListener) {
    sistemaEscuro.addListener(aoMudarSistema);
  }

  sincronizar();
  botao.hidden = false;
})();
