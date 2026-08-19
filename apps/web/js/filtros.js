/* ═══════════════════════════════════════════════════════════════════
   KmZero — busca e filtros da vitrine

   Progressive enhancement: o <form> é um GET de verdade. Sem
   JavaScript ele recarrega a página com os filtros na URL e o servidor
   devolve a lista já filtrada (§8 item 17 — a vitrine funciona sem JS).
   Com JavaScript, filtra na hora, sem recarregar, e mantém a URL em dia
   para que a busca continue compartilhável.

   Enquanto não existe API (tarefa H3), o filtro roda sobre os cartões
   de demonstração que já estão no HTML. A leitura dos critérios e a
   montagem dos chips não mudam quando os dados vierem do servidor.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var form = document.getElementById("filtros");
  var lista = document.getElementById("eventos");
  if (!form || !lista) return;

  var eventos = Array.prototype.slice.call(lista.querySelectorAll(".evento"));
  var contagem = document.getElementById("contagem-numero");
  var rotuloContagem = document.getElementById("contagem");
  var semResultados = document.getElementById("sem-resultados");
  var ativos = document.getElementById("ativos");
  var ativosLista = document.getElementById("ativos-lista");
  var limpar = document.getElementById("limpar-filtros");
  var limparVazio = document.getElementById("limpar-vazio");
  var ordem = document.getElementById("f-ordem");
  var avancadosContagem = document.getElementById("contagem-avancados");
  var maisFiltros = document.querySelector(".mais-filtros");

  /* Grupos que aceitam vários valores ao mesmo tempo. Dentro do grupo a
     relação é OU; entre grupos é E. */
  var GRUPOS = ["dist", "tipo", "terreno", "preco", "situacao", "dia", "periodo", "pcd", "recurso"];
  var AVANCADOS = ["preco", "situacao", "dia", "periodo", "pcd", "recurso"];

  /* Rótulos para os chips de filtro ativo. O texto que a pessoa marcou é
     o texto que ela vê de volta — nunca o valor cru. */
  var ROTULOS = {
    q: "Busca",
    uf: "Estado",
    quando: "Quando",
    dist: "Distância",
    tipo: "Tipo",
    terreno: "Terreno",
    preco: "Preço",
    situacao: "Situação",
    dia: "Dia",
    periodo: "Horário",
    pcd: "Acessibilidade",
    recurso: "A prova tem"
  };

  var HOJE = new Date();
  HOJE.setHours(0, 0, 0, 0);

  var inicializando = true;

  function textoDaOpcao(nome, valor) {
    var entrada = form.querySelector('[name="' + nome + '"][value="' + valor + '"]');
    if (entrada) {
      var span = entrada.parentNode.querySelector("span");
      if (span) return span.textContent.trim();
      if (entrada.tagName === "OPTION") return entrada.textContent.trim();
    }
    var select = form.querySelector('select[name="' + nome + '"]');
    if (select) {
      var opcao = select.querySelector('option[value="' + valor + '"]');
      if (opcao) return opcao.textContent.trim();
    }
    return valor;
  }

  function lerCriterios() {
    var c = { q: "", uf: "", quando: "" };
    c.q = (form.elements.q ? form.elements.q.value : "").trim().toLowerCase();
    c.uf = form.elements.uf ? form.elements.uf.value : "";
    c.quando = form.elements.quando ? form.elements.quando.value : "";
    GRUPOS.forEach(function (g) {
      c[g] = Array.prototype.slice
        .call(form.querySelectorAll('input[name="' + g + '"]:checked'))
        .map(function (i) { return i.value; });
    });
    return c;
  }

  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function temAlgum(atributo, escolhidos) {
    if (!escolhidos.length) return true;
    var valores = (atributo || "").split(/\s+/);
    return escolhidos.some(function (e) { return valores.indexOf(e) !== -1; });
  }

  function faixaDePreco(preco) {
    if (preco === 0) return "gratuito";
    if (preco <= 60) return "ate60";
    if (preco <= 120) return "60a120";
    return "acima120";
  }

  function passaNoQuando(dataEvento, quando) {
    if (!quando) return true;
    if (quando === "passadas") return dataEvento < HOJE;
    var limite = new Date(HOJE.getTime());
    limite.setDate(limite.getDate() + parseInt(quando, 10));
    return dataEvento >= HOJE && dataEvento <= limite;
  }

  function combina(el, c) {
    var d = el.dataset;

    if (c.q) {
      var alvo = normalizar(d.nome + " " + d.cidade + " " + d.uf);
      if (alvo.indexOf(normalizar(c.q)) === -1) return false;
    }
    if (c.uf && d.uf !== c.uf) return false;
    if (!passaNoQuando(new Date(d.data + "T00:00:00"), c.quando)) return false;

    if (!temAlgum(d.dist, c.dist)) return false;
    if (!temAlgum(d.tipo, c.tipo)) return false;
    if (!temAlgum(d.terreno, c.terreno)) return false;
    if (!temAlgum(d.situacao, c.situacao)) return false;
    if (!temAlgum(d.dia, c.dia)) return false;
    if (!temAlgum(d.periodo, c.periodo)) return false;
    if (!temAlgum(d.pcd, c.pcd)) return false;
    if (!temAlgum(d.recurso, c.recurso)) return false;
    if (!temAlgum(faixaDePreco(Number(d.preco)), c.preco)) return false;

    return true;
  }

  function ordenar() {
    var criterio = ordem ? ordem.value : "data";
    var ordenados = eventos.slice().sort(function (a, b) {
      if (criterio === "preco") return Number(a.dataset.preco) - Number(b.dataset.preco);
      if (criterio === "nome") return a.dataset.nome.localeCompare(b.dataset.nome, "pt-BR");
      if (criterio === "fechando") return a.dataset.fecha.localeCompare(b.dataset.fecha);
      return a.dataset.data.localeCompare(b.dataset.data);
    });
    ordenados.forEach(function (el) { lista.appendChild(el); });
  }

  function montarChips(c) {
    ativosLista.innerHTML = "";
    var total = 0;

    function chip(nome, valor, rotulo) {
      total++;
      var texto = ROTULOS[nome] + ": " + rotulo;
      var li = document.createElement("li");
      var botao = document.createElement("button");
      botao.type = "button";
      botao.className = "md-chip-removivel";
      botao.dataset.nome = nome;
      botao.dataset.valor = valor;

      /* textContent, nunca innerHTML: o rótulo pode vir do que a pessoa
         digitou (ou de um parâmetro de URL). */
      var span = document.createElement("span");
      span.textContent = texto;
      botao.appendChild(span);

      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "icone");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#i-x");
      svg.appendChild(use);
      botao.appendChild(svg);

      botao.setAttribute("aria-label", "Remover filtro " + texto);
      li.appendChild(botao);
      ativosLista.appendChild(li);
    }

    if (c.q) chip("q", c.q, '"' + c.q + '"');
    if (c.uf) chip("uf", c.uf, textoDaOpcao("uf", c.uf));
    if (c.quando) chip("quando", c.quando, textoDaOpcao("quando", c.quando));
    GRUPOS.forEach(function (g) {
      c[g].forEach(function (v) { chip(g, v, textoDaOpcao(g, v)); });
    });

    ativos.hidden = total === 0;

    /* Quantos filtros estão escondidos dentro de "Mais filtros" — para
       ninguém esquecer um filtro ligado atrás de um painel fechado. */
    var escondidos = AVANCADOS.reduce(function (soma, g) { return soma + c[g].length; }, 0);
    if (avancadosContagem) {
      avancadosContagem.hidden = escondidos === 0;
      avancadosContagem.textContent = escondidos;
      avancadosContagem.setAttribute(
        "aria-label", escondidos + (escondidos === 1 ? " filtro ativo" : " filtros ativos")
      );
    }
    /* Só na carga: se o link já vinha com filtro avançado, o painel abre
       para a pessoa ver o que está ligado. Depois disso, abrir e fechar
       é decisão dela — reabrir a cada digitação seria briga. */
    if (inicializando && maisFiltros && escondidos > 0) maisFiltros.open = true;
  }

  function sincronizarURL(c) {
    if (!window.history || !window.history.replaceState) return;
    var p = new URLSearchParams();
    if (c.q) p.set("q", c.q);
    if (c.uf) p.set("uf", c.uf);
    if (c.quando) p.set("quando", c.quando);
    GRUPOS.forEach(function (g) { c[g].forEach(function (v) { p.append(g, v); }); });
    if (ordem && ordem.value !== "data") p.set("ordem", ordem.value);
    var busca = p.toString();
    history.replaceState(null, "", busca ? "?" + busca : location.pathname);
  }

  function aplicar() {
    var c = lerCriterios();
    var visiveis = 0;

    eventos.forEach(function (el) {
      var mostra = combina(el, c);
      el.hidden = !mostra;
      if (mostra) visiveis++;
    });

    ordenar();
    montarChips(c);
    sincronizarURL(c);

    if (contagem) contagem.textContent = visiveis;
    if (rotuloContagem) {
      rotuloContagem.lastChild.textContent = visiveis === 1 ? " prova" : " provas";
    }
    if (semResultados) semResultados.hidden = visiveis > 0;
    lista.hidden = visiveis === 0;
  }

  /* ─── Estado inicial vindo da URL ────────────────────────────────
     Faz o link compartilhado abrir com os mesmos filtros marcados.  */
  function lerURL() {
    var p = new URLSearchParams(location.search);
    if (!p.toString()) return;
    if (form.elements.q) form.elements.q.value = p.get("q") || "";
    if (form.elements.uf) form.elements.uf.value = p.get("uf") || "";
    if (form.elements.quando) form.elements.quando.value = p.get("quando") || "";
    if (ordem && p.get("ordem")) ordem.value = p.get("ordem");
    GRUPOS.forEach(function (g) {
      var valores = p.getAll(g);
      form.querySelectorAll('input[name="' + g + '"]').forEach(function (i) {
        i.checked = valores.indexOf(i.value) !== -1;
      });
    });
  }

  function limparTudo() {
    form.reset();
    if (ordem) ordem.value = "data";
    aplicar();
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ─── Ligações ──────────────────────────────────────────────────── */
  form.addEventListener("submit", function (e) {
    e.preventDefault();   /* só é interceptado porque há JS */
    aplicar();
  });
  form.addEventListener("input", aplicar);
  form.addEventListener("change", aplicar);

  /* O select de ordenação está fora do <form> (ligado por form="filtros"),
     e evento de elemento associado não borbulha até o form. Escuta
     própria, então. */
  if (ordem) ordem.addEventListener("change", aplicar);

  ativosLista.addEventListener("click", function (e) {
    var botao = e.target.closest(".md-chip-removivel");
    if (!botao) return;
    var nome = botao.dataset.nome;
    var valor = botao.dataset.valor;
    if (nome === "q") form.elements.q.value = "";
    else if (nome === "uf" || nome === "quando") form.elements[nome].value = "";
    else {
      var alvo = form.querySelector('input[name="' + nome + '"][value="' + valor + '"]');
      if (alvo) alvo.checked = false;
    }
    aplicar();
  });

  if (limpar) limpar.addEventListener("click", limparTudo);
  if (limparVazio) limparVazio.addEventListener("click", limparTudo);

  /* Atalhos: cada um liga um filtro e leva à lista. */
  document.querySelectorAll("[data-atalho]").forEach(function (link) {
    link.addEventListener("click", function () {
      var par = link.dataset.atalho.split("=");
      var nome = par[0];
      var valor = par[1];
      var entrada = form.querySelector('[name="' + nome + '"][value="' + valor + '"]');
      if (entrada) {
        if (entrada.type === "checkbox") entrada.checked = true;
        else entrada.selected = true;
      } else if (form.elements[nome]) {
        form.elements[nome].value = valor;
      }
      aplicar();
    });
  });

  /* Favoritar sem login: o estado vale para esta visita e a conta é
     pedida no momento do clique, não antes (§6-B). O pedido de conta
     entra com a tarefa G2. */
  document.querySelectorAll(".favorito").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var ativo = botao.getAttribute("aria-pressed") === "true";
      botao.setAttribute("aria-pressed", String(!ativo));
    });
  });

  lerURL();
  aplicar();
  inicializando = false;
})();
