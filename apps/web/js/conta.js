/* ═══════════════════════════════════════════════════════════════════
   KmZero — conta: entrar, criar conta, recuperar e redefinir senha

   Autenticação por e-mail e senha (docs/02 §7).

   ┌─ ONDE O FIREBASE AUTH ENTRA ─────────────────────────────────────┐
   │ Todo contato com o serviço de autenticação passa pelo objeto     │
   │ `autenticacao`, lá embaixo. Ligar o Firebase é trocar o corpo    │
   │ dos seis métodos dele por chamadas do SDK — nada acima dessa     │
   │ fronteira muda:                                                  │
   │                                                                  │
   │   entrar            → signInWithEmailAndPassword                 │
   │   criarConta        → createUserWithEmailAndPassword             │
   │                       + updateProfile + sendEmailVerification    │
   │   enviarConfirmacao → sendEmailVerification                      │
   │   recuperarSenha    → sendPasswordResetEmail                     │
   │   verificarCodigo   → verifyPasswordResetCode                    │
   │   redefinirSenha    → confirmPasswordReset                       │
   │                                                                  │
   │ Os erros já são devolvidos no formato do Firebase                │
   │ ({ code: "auth/..." }), e a tradução para português está em      │
   │ MENSAGENS — então o mapa continua servindo sem uma linha nova.   │
   └──────────────────────────────────────────────────────────────────┘

   ⚠️ MODO DEMONSTRAÇÃO — enquanto o Firebase não estiver configurado,
   os métodos de `autenticacao` encenam as respostas: nenhuma conta é
   criada, nenhum e-mail é enviado, nenhuma sessão é aberta.

   Sobre JavaScript: os formulários são POST de verdade, prontos para um
   Worker próprio. Com o Firebase Auth quem faz o login é o SDK no
   navegador, e aí esta tela passa a exigir JavaScript — cada página
   tem um <noscript> que avisa em vez de deixar um formulário mudo.
   As páginas públicas (busca, listagem) seguem funcionando sem JS.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var TAMANHO_MINIMO_SENHA = 8;
  var ESPERA_REENVIO = 60;                    /* segundos */
  var CHAVE_EMAIL = "kmzero:conta:email";
  var CHAVE_NOME = "kmzero:conta:nome";

  /* ═══ FERRAMENTAS ══════════════════════════════════════════════ */

  function parametro(nome) {
    var busca = window.location.search.replace(/^\?/, "").split("&");
    for (var i = 0; i < busca.length; i++) {
      var par = busca[i].split("=");
      if (decodeURIComponent(par[0]) === nome) {
        return decodeURIComponent((par[1] || "").replace(/\+/g, " "));
      }
    }
    return "";
  }

  function guardar(chave, valor) {
    try { window.sessionStorage.setItem(chave, valor); } catch (e) { /* navegação privativa */ }
  }
  function lido(chave) {
    try { return window.sessionStorage.getItem(chave) || ""; } catch (e) { return ""; }
  }

  function trocarIcone(elemento, id) {
    var uso = elemento.querySelector("use");
    if (uso) uso.setAttribute("href", id);
  }

  /* Só caminho relativo desta mesma origem. Destino aberto em tela de
     login é convite a phishing. */
  function destinoSeguro(valor) {
    return /^[a-z0-9._-]+\.html([?#].*)?$/i.test(valor) ? valor : "";
  }

  /* ═══ CAMPO ════════════════════════════════════════════════════
     Erro e ajuda ocupam o MESMO lugar: a mensagem entra no lugar do
     texto de apoio em vez de empurrar o botão para baixo. §7.2 —
     layout que salta faz o dedo errar o alvo, e o alvo aqui é o botão
     que a pessoa acabou de tentar acertar.

     Exceção: ajuda marcada com data-persistente fica. É o caso do
     "Esqueci minha senha" — justo quando a senha dá erro é que ele
     mais precisa estar na tela.                                     */
  function Campo(nome) {
    var caixa = document.getElementById("caixa-" + nome);
    if (!caixa) return null;

    var entrada = document.getElementById("campo-" + nome);
    var erro = document.getElementById("erro-" + nome);
    var erroTexto = document.getElementById("erro-" + nome + "-texto");
    var ajuda = document.getElementById("ajuda-" + nome);
    var descricaoOriginal = entrada.getAttribute("aria-describedby") || "";

    var campo = {
      entrada: entrada,
      valor: function () { return entrada.value.trim(); },
      valorBruto: function () { return entrada.value; },

      mostrarErro: function (mensagem) {
        erroTexto.textContent = mensagem;
        erro.hidden = false;
        if (ajuda && !ajuda.hasAttribute("data-persistente")) ajuda.hidden = true;
        caixa.setAttribute("data-erro", "");
        entrada.setAttribute("aria-invalid", "true");
        entrada.setAttribute("aria-describedby", erro.id);
      },

      limpar: function () {
        erro.hidden = true;
        if (ajuda) ajuda.hidden = false;
        caixa.removeAttribute("data-erro");
        entrada.removeAttribute("aria-invalid");
        if (descricaoOriginal) entrada.setAttribute("aria-describedby", descricaoOriginal);
      },

      focar: function () { entrada.focus(); }
    };

    /* Some com o erro assim que a pessoa começa a corrigir: manter a
       mensagem vermelha enquanto ela digita é acusar sem ouvir. */
    entrada.addEventListener("input", function () {
      if (!erro.hidden) campo.limpar();
    });

    return campo;
  }

  /* Conferência mínima e explicada do e-mail. O julgamento final é do
     serviço — quem decide se um endereço existe é o e-mail que chega
     nele. Aqui só pegamos o que dá para pegar antes de gastar a volta. */
  function problemaDoEmail(valor) {
    if (!valor) return "Digite seu e-mail.";
    if (valor.indexOf(" ") > -1) return "O endereço não pode ter espaço. Apague o espaço e tente de novo.";
    if (valor.split("@").length > 2) return "Tem mais de um @ no endereço. Deixe só um.";
    if (valor.indexOf("@") < 1) return "Falta o @ no endereço. Ele separa o seu nome do provedor, como em maria@gmail.com.";
    var dominio = valor.split("@")[1] || "";
    if (dominio.indexOf(".") < 1 || /\.$/.test(dominio)) {
      return "Esse endereço parece incompleto — confira o que vem depois do @, como gmail.com.";
    }
    return "";
  }

  /* ═══ SENHA ════════════════════════════════════════════════════ */

  /* Senha longa vence senha complicada. Nenhuma regra de composição
     aqui — exigir símbolo e maiúscula só empurra todo mundo para
     "Senha@123", que é pior do que quatro palavras seguidas. */
  var OBVIAS = [
    "12345678", "123456789", "1234567890", "87654321", "11111111",
    "00000000", "password", "senha1234", "abcd1234", "qwertyui",
    "qwerty123", "iloveyou", "kmzero123", "corrida123"
  ];

  function ehObvia(valor) {
    var v = valor.toLowerCase();
    if (!v) return false;
    if (OBVIAS.indexOf(v) > -1) return true;
    if (/^(.)\1+$/.test(v)) return true;                  /* um caractere repetido */
    if (v.indexOf("senha") === 0) return true;
    if (/^0?123456789?0?$/.test(v)) return true;
    return false;
  }

  function regrasDaSenha(valor) {
    return {
      tamanho: valor.length >= TAMANHO_MINIMO_SENHA,
      obvia: valor.length > 0 && !ehObvia(valor)
    };
  }

  /* A lista de requisitos se marca sozinha enquanto a pessoa digita.
     Cumprido muda cor, ícone E peso — cor nunca é o único portador. */
  function ligarRequisitos(campoSenha, lista) {
    if (!campoSenha || !lista) return function () { return true; };

    var itens = lista.querySelectorAll("li[data-regra]");

    function pintar() {
      var regras = regrasDaSenha(campoSenha.valorBruto());
      var tudoOk = true;
      for (var i = 0; i < itens.length; i++) {
        var ok = regras[itens[i].getAttribute("data-regra")];
        if (ok) {
          itens[i].setAttribute("data-ok", "");
          trocarIcone(itens[i], "#i-check");
        } else {
          itens[i].removeAttribute("data-ok");
          trocarIcone(itens[i], "#i-ponto");
          tudoOk = false;
        }
      }
      return tudoOk;
    }

    campoSenha.entrada.addEventListener("input", pintar);
    pintar();
    return pintar;
  }

  function problemaDaSenhaNova(valor) {
    if (!valor) return "Escolha uma senha.";
    var regras = regrasDaSenha(valor);
    if (!regras.tamanho) {
      return "A senha precisa de pelo menos " + TAMANHO_MINIMO_SENHA + " caracteres. A sua tem " + valor.length + ".";
    }
    if (!regras.obvia) {
      return "Essa senha é fácil demais de adivinhar. Troque por outra — pode ser uma frase curta que só você lembra.";
    }
    return "";
  }

  /* Mostrar a senha: conferir o que se digitou é o que evita o terceiro
     erro e o bloqueio. O rótulo diz o que o botão FAZ, não o estado. */
  function ligarMostrarSenha(idBotao, idEntrada, idRotulo) {
    var botao = document.getElementById(idBotao);
    var entrada = document.getElementById(idEntrada);
    var rotulo = document.getElementById(idRotulo);
    if (!botao || !entrada || !rotulo) return;

    botao.addEventListener("click", function () {
      var mostrando = entrada.type === "text";
      entrada.type = mostrando ? "password" : "text";
      botao.setAttribute("aria-pressed", String(!mostrando));
      rotulo.textContent = mostrando ? "Mostrar a senha" : "Ocultar a senha";
      trocarIcone(botao, mostrando ? "#i-olho" : "#i-olho-corte");
      entrada.focus();
    });
  }

  /* Caps Lock ligado é a causa mais comum de senha "errada" que está
     certa. Avisar custa uma linha e evita o bloqueio por tentativas. */
  function ligarCapsLock(idEntrada, idAviso) {
    var entrada = document.getElementById(idEntrada);
    var aviso = document.getElementById(idAviso);
    if (!entrada || !aviso) return;

    function conferir(evento) {
      if (!evento.getModifierState) return;
      aviso.hidden = !evento.getModifierState("CapsLock");
    }
    entrada.addEventListener("keydown", conferir);
    entrada.addEventListener("keyup", conferir);
    entrada.addEventListener("blur", function () { aviso.hidden = true; });
  }

  /* ═══ MENSAGENS DE ERRO ════════════════════════════════════════
     Cada uma responde às três perguntas de §7.3: o que aconteceu, por
     quê e o que fazer agora. Nada de código de erro sem tradução.

     Sobre credencial: e-mail que não existe e senha errada devolvem a
     MESMA mensagem, de propósito. Tela que responde "esse e-mail não
     está cadastrado" entrega de graça uma lista de quem tem conta aqui
     para quem estiver testando endereços.                            */
  var MENSAGENS = {
    "auth/invalid-credential": {
      titulo: "E-mail ou senha não conferem",
      texto: "Confira os dois com calma — o botão do olho mostra a senha que você digitou. Se não lembrar, use o \"Esqueci minha senha\" logo acima do botão."
    },
    "auth/too-many-requests": {
      titulo: "Muitas tentativas seguidas",
      texto: "Paramos por aqui por um tempo, para proteger a conta. Espere alguns minutos e tente de novo — ou troque a senha agora pelo \"Esqueci minha senha\"."
    },
    "auth/user-disabled": {
      titulo: "Essa conta está desativada",
      texto: "Escreva para contato@kmzero.com.br do mesmo e-mail da conta, que a gente resolve."
    },
    "auth/email-already-in-use": {
      titulo: "Esse e-mail já tem conta",
      texto: "Entre com ele em vez de criar outra. Se não lembrar a senha, dá para trocar em um minuto pelo \"Esqueci minha senha\"."
    },
    "auth/weak-password": {
      titulo: "Essa senha é fraca demais",
      texto: "Ela precisa de pelo menos 8 caracteres e não pode ser uma sequência óbvia."
    },
    "auth/expired-action-code": {
      titulo: "Esse link já tinha vencido",
      texto: "O link de senha vale 1 hora. Peça outro — chega em instantes."
    },
    "auth/invalid-action-code": {
      titulo: "Esse link não serve mais",
      texto: "Ou já foi usado, ou veio cortado pelo programa de e-mail. Peça outro e use o mais recente."
    },
    "auth/network-request-failed": {
      titulo: "A conexão caiu no meio",
      texto: "Confira a internet e tente de novo. Nada do que você digitou se perdeu."
    },
    "desconhecido": {
      titulo: "Não deu para completar agora",
      texto: "Algo falhou do nosso lado, não do seu. Tente de novo em alguns instantes."
    }
  };

  function mensagemDoErro(codigo) {
    return MENSAGENS[codigo] || MENSAGENS.desconhecido;
  }

  function Banner(id) {
    var banner = document.getElementById(id);
    if (!banner) return null;
    var titulo = document.getElementById(id + "-titulo");
    var texto = document.getElementById(id + "-texto");

    return {
      mostrar: function (mensagem) {
        titulo.textContent = mensagem.titulo;
        texto.textContent = mensagem.texto;
        banner.hidden = false;
        banner.setAttribute("tabindex", "-1");
        banner.focus();
      },
      esconder: function () { banner.hidden = true; }
    };
  }

  /* Botão que espera resposta: desligado e dizendo o que está fazendo.
     Botão que só apaga sem explicar é a falha cara de §6.1. */
  function Ocupado(botao, textoOcupado) {
    var original = botao.textContent;
    return {
      ligar: function () {
        botao.disabled = true;
        botao.textContent = textoOcupado;
      },
      desligar: function () {
        botao.disabled = false;
        botao.textContent = original;
      }
    };
  }

  /* ═══ ESPERA ENTRE REENVIOS ════════════════════════════════════ */

  function ligarReenvio(forma, aoReenviar) {
    if (!forma) return null;

    var botao = forma.querySelector("button[type=submit]");
    var aviso = document.getElementById("aviso-reenvio");
    var avisoTexto = document.getElementById("aviso-reenvio-texto");
    var restante = 0;
    var relogio = null;

    function pintar() {
      if (restante > 0) {
        botao.disabled = true;
        aviso.hidden = false;
        avisoTexto.textContent = restante === 1
          ? "Você pode pedir outro daqui a 1 segundo."
          : "Você pode pedir outro daqui a " + restante + " segundos.";
      } else {
        botao.disabled = false;
        aviso.hidden = true;
      }
    }

    function contar() {
      restante = ESPERA_REENVIO;
      pintar();
      if (relogio) window.clearInterval(relogio);
      relogio = window.setInterval(function () {
        restante -= 1;
        pintar();
        if (restante <= 0) window.clearInterval(relogio);
      }, 1000);
    }

    forma.addEventListener("submit", function (evento) {
      evento.preventDefault();
      contar();
      aoReenviar(function (mensagem) {
        avisoTexto.textContent = mensagem;
        aviso.hidden = false;
      });
    });

    return { contar: contar };
  }

  /* ═══════════════════════════════════════════════════════════════
     AUTENTICAÇÃO — a fronteira com o Firebase Auth

     ⚠️ TUDO daqui até o fim do objeto é DEMONSTRAÇÃO. Ligar o Firebase
     é trocar o corpo destes métodos pelas chamadas do SDK, mantendo as
     assinaturas e o formato de erro ({ code: "auth/..." }).
     ═══════════════════════════════════════════════════════════════ */

  var CONTA_DE_DEMONSTRACAO = "maria@exemplo.com.br";

  function demora(valor) {
    return new Promise(function (resolve) {
      window.setTimeout(function () { resolve(valor); }, 700);
    });
  }
  function recusa(codigo) {
    return new Promise(function (_, reject) {
      window.setTimeout(function () { reject({ code: codigo }); }, 700);
    });
  }

  var autenticacao = {
    /* signInWithEmailAndPassword */
    entrar: function (email, senha) {
      if (senha === "errada") return recusa("auth/invalid-credential");
      if (senha === "bloqueada") return recusa("auth/too-many-requests");
      return demora({ email: email });
    },

    /* createUserWithEmailAndPassword + updateProfile + sendEmailVerification */
    criarConta: function (nome, email) {
      if (email.toLowerCase() === CONTA_DE_DEMONSTRACAO) return recusa("auth/email-already-in-use");
      return demora({ email: email, nome: nome });
    },

    /* sendEmailVerification */
    enviarConfirmacao: function () {
      return demora(true);
    },

    /* sendPasswordResetEmail — sempre resolve, mesmo sem conta: a
       resposta não pode revelar se o e-mail está cadastrado. */
    recuperarSenha: function () {
      return demora(true);
    },

    /* verifyPasswordResetCode → devolve o e-mail dono do código */
    verificarCodigo: function (codigo) {
      if (!codigo) return recusa("auth/invalid-action-code");
      if (codigo.indexOf("expirado") > -1) return recusa("auth/expired-action-code");
      if (codigo.indexOf("usado") > -1) return recusa("auth/invalid-action-code");
      return demora(CONTA_DE_DEMONSTRACAO);
    },

    /* confirmPasswordReset */
    redefinirSenha: function () {
      return demora(true);
    }
  };

  /* ═══ TELA: ENTRAR ═════════════════════════════════════════════ */

  var formaEntrar = document.getElementById("forma-entrar");
  if (formaEntrar) {
    var email = Campo("email");
    var senha = Campo("senha");
    var erroEntrar = Banner("erro-formulario");
    var botaoEntrar = document.getElementById("botao-entrar");
    var ocupadoEntrar = Ocupado(botaoEntrar, "Entrando…");

    ligarMostrarSenha("mostrar-senha", "campo-senha", "rotulo-mostrar-senha");
    ligarCapsLock("campo-senha", "aviso-capslock");

    /* Quem chegou de outro lugar precisa saber por quê. Em produção o
       servidor escolhe o banner; aqui o motivo vem da query string. */
    var aviso = document.getElementById("aviso-" + parametro("aviso"));
    if (aviso) aviso.hidden = false;

    if (parametro("perfil") === "organizador") {
      var nota = document.getElementById("nota-organizador");
      if (nota) nota.hidden = false;
    }

    var voltarPara = destinoSeguro(parametro("voltar_para"));
    var campoVoltar = document.getElementById("campo-voltar");
    if (campoVoltar) campoVoltar.value = voltarPara;

    formaEntrar.addEventListener("submit", function (evento) {
      evento.preventDefault();
      erroEntrar.esconder();

      var problema = problemaDoEmail(email.valor());
      if (problema) {
        email.mostrarErro(problema);
        email.focar();
        return;
      }
      email.limpar();

      if (!senha.valorBruto()) {
        senha.mostrarErro("Digite sua senha.");
        senha.focar();
        return;
      }
      senha.limpar();

      ocupadoEntrar.ligar();
      autenticacao.entrar(email.valor(), senha.valorBruto())
        .then(function () {
          guardar(CHAVE_EMAIL, email.valor());
          window.location.href = voltarPara || "index.html";
        })
        .catch(function (erro) {
          ocupadoEntrar.desligar();
          erroEntrar.mostrar(mensagemDoErro(erro && erro.code));
        });
    });
  }

  /* ═══ TELA: CRIAR CONTA ════════════════════════════════════════ */

  var formaCriar = document.getElementById("forma-criar");
  if (formaCriar) {
    var nomeCampo = Campo("nome");
    var emailCriar = Campo("email");
    var senhaCriar = Campo("senha");
    var senha2 = Campo("senha2");
    var erroCriar = Banner("erro-formulario");
    var botaoCriar = document.getElementById("botao-criar");
    var ocupadoCriar = Ocupado(botaoCriar, "Criando…");

    ligarMostrarSenha("mostrar-senha", "campo-senha", "rotulo-mostrar-senha");
    var conferirRequisitos = ligarRequisitos(senhaCriar, document.getElementById("requisitos-senha"));

    if (parametro("perfil") === "organizador") {
      var notaCriar = document.getElementById("nota-organizador");
      if (notaCriar) notaCriar.hidden = false;
      var campoPerfil = document.getElementById("campo-perfil");
      if (campoPerfil) campoPerfil.value = "organizador";
    }

    formaCriar.addEventListener("submit", function (evento) {
      evento.preventDefault();
      erroCriar.esconder();

      if (nomeCampo.valor().length < 2) {
        nomeCampo.mostrarErro("Digite seu nome — é ele que vai no resultado das provas.");
        nomeCampo.focar();
        return;
      }
      nomeCampo.limpar();

      var problemaEmail = problemaDoEmail(emailCriar.valor());
      if (problemaEmail) {
        emailCriar.mostrarErro(problemaEmail);
        emailCriar.focar();
        return;
      }
      emailCriar.limpar();

      var problemaSenha = problemaDaSenhaNova(senhaCriar.valorBruto());
      if (problemaSenha) {
        senhaCriar.mostrarErro(problemaSenha);
        senhaCriar.focar();
        conferirRequisitos();
        return;
      }
      senhaCriar.limpar();

      if (senha2.valorBruto() !== senhaCriar.valorBruto()) {
        senha2.mostrarErro("As duas senhas estão diferentes. Use o botão do olho para conferir a de cima.");
        senha2.focar();
        return;
      }
      senha2.limpar();

      ocupadoCriar.ligar();
      autenticacao.criarConta(nomeCampo.valor(), emailCriar.valor(), senhaCriar.valorBruto())
        .then(function () {
          guardar(CHAVE_EMAIL, emailCriar.valor());
          guardar(CHAVE_NOME, nomeCampo.valor());
          ocupadoCriar.desligar();
          mostrarConfirmacao(emailCriar.valor());
        })
        .catch(function (erro) {
          ocupadoCriar.desligar();
          erroCriar.mostrar(mensagemDoErro(erro && erro.code));
        });
    });

    /* Conta criada, e-mail ainda não provado. O produto avisa por
       e-mail quando a confirmação de presença abre — endereço errado
       aqui é a pessoa perdendo a etapa depois. */
    var reenvioConfirmacao = ligarReenvio(
      document.getElementById("forma-reenviar"),
      function (avisar) {
        autenticacao.enviarConfirmacao().then(function () {
          avisar("Mandamos outro e-mail. Você pode pedir mais um daqui a " + ESPERA_REENVIO + " segundos.");
        });
      }
    );

    function mostrarConfirmacao(endereco) {
      document.getElementById("estado-formulario").hidden = true;
      var confirmar = document.getElementById("estado-confirmar");
      confirmar.hidden = false;
      document.getElementById("email-destino").textContent = endereco;

      var titulo = confirmar.querySelector("h1");
      titulo.setAttribute("tabindex", "-1");
      titulo.focus();

      if (reenvioConfirmacao) reenvioConfirmacao.contar();
    }
  }

  /* ═══ TELA: ESQUECI MINHA SENHA ════════════════════════════════ */

  var formaRecuperar = document.getElementById("forma-recuperar");
  if (formaRecuperar) {
    var emailRecuperar = Campo("email");
    var erroRecuperar = Banner("erro-formulario");
    var botaoRecuperar = document.getElementById("botao-recuperar");
    var ocupadoRecuperar = Ocupado(botaoRecuperar, "Enviando…");

    formaRecuperar.addEventListener("submit", function (evento) {
      evento.preventDefault();
      erroRecuperar.esconder();

      var problema = problemaDoEmail(emailRecuperar.valor());
      if (problema) {
        emailRecuperar.mostrarErro(problema);
        emailRecuperar.focar();
        return;
      }
      emailRecuperar.limpar();

      ocupadoRecuperar.ligar();
      autenticacao.recuperarSenha(emailRecuperar.valor())
        .then(function () {
          ocupadoRecuperar.desligar();
          mostrarEnviado(emailRecuperar.valor());
        })
        .catch(function (erro) {
          ocupadoRecuperar.desligar();
          erroRecuperar.mostrar(mensagemDoErro(erro && erro.code));
        });
    });

    var reenvioSenha = ligarReenvio(
      document.getElementById("forma-reenviar"),
      function (avisar) {
        autenticacao.recuperarSenha(emailRecuperar.valor()).then(function () {
          avisar("Mandamos outro link. Você pode pedir mais um daqui a " + ESPERA_REENVIO + " segundos.");
        });
      }
    );

    function mostrarEnviado(endereco) {
      document.getElementById("estado-formulario").hidden = true;
      var enviado = document.getElementById("estado-enviado");
      enviado.hidden = false;
      document.getElementById("email-destino").textContent = endereco;
      document.getElementById("campo-email-reenvio").value = endereco;

      var titulo = enviado.querySelector("h1");
      titulo.setAttribute("tabindex", "-1");
      titulo.focus();

      if (reenvioSenha) reenvioSenha.contar();
    }
  }

  /* ═══ TELA: CRIAR SENHA NOVA ═══════════════════════════════════
     Alvo do link do e-mail. Confere o código ANTES de mostrar o
     formulário: deixar a pessoa escolher e digitar uma senha nova para
     só então dizer "esse link venceu" é trabalho jogado fora.        */

  var verificando = document.getElementById("estado-verificando");
  if (verificando) {
    var codigo = parametro("oobCode");
    var estadoForma = document.getElementById("estado-formulario");
    var estadoSucesso = document.getElementById("estado-sucesso");
    var estadoInvalido = document.getElementById("estado-invalido");

    function trocarEstado(novo) {
      verificando.hidden = true;
      estadoForma.hidden = true;
      estadoSucesso.hidden = true;
      estadoInvalido.hidden = true;
      novo.hidden = false;

      var titulo = novo.querySelector("h1");
      if (titulo) {
        titulo.setAttribute("tabindex", "-1");
        titulo.focus();
      }
    }

    autenticacao.verificarCodigo(codigo)
      .then(function (dono) {
        document.getElementById("email-conta").textContent = dono;
        document.getElementById("campo-codigo").value = codigo;
        trocarEstado(estadoForma);
      })
      .catch(function (erro) {
        var mensagem = mensagemDoErro(erro && erro.code);
        document.getElementById("invalido-titulo").textContent = mensagem.titulo;
        document.getElementById("invalido-texto").textContent = mensagem.texto;
        trocarEstado(estadoInvalido);
      });

    var senhaNova = Campo("senha");
    var senhaNova2 = Campo("senha2");
    var erroRedefinir = Banner("erro-formulario");
    var botaoRedefinir = document.getElementById("botao-redefinir");
    var ocupadoRedefinir = Ocupado(botaoRedefinir, "Salvando…");

    ligarMostrarSenha("mostrar-senha", "campo-senha", "rotulo-mostrar-senha");
    var conferirRequisitosNovos = ligarRequisitos(senhaNova, document.getElementById("requisitos-senha"));

    document.getElementById("forma-redefinir").addEventListener("submit", function (evento) {
      evento.preventDefault();
      erroRedefinir.esconder();

      var problema = problemaDaSenhaNova(senhaNova.valorBruto());
      if (problema) {
        senhaNova.mostrarErro(problema);
        senhaNova.focar();
        conferirRequisitosNovos();
        return;
      }
      senhaNova.limpar();

      if (senhaNova2.valorBruto() !== senhaNova.valorBruto()) {
        senhaNova2.mostrarErro("As duas senhas estão diferentes. Use o botão do olho para conferir a de cima.");
        senhaNova2.focar();
        return;
      }
      senhaNova2.limpar();

      ocupadoRedefinir.ligar();
      autenticacao.redefinirSenha(codigo, senhaNova.valorBruto())
        .then(function () {
          ocupadoRedefinir.desligar();
          trocarEstado(estadoSucesso);
        })
        .catch(function (erro) {
          ocupadoRedefinir.desligar();
          var mensagem = mensagemDoErro(erro && erro.code);
          /* Código que venceu enquanto a pessoa digitava não é erro de
             formulário: não há senha que salve, só pedir outro link. */
          if (erro && (erro.code === "auth/expired-action-code" || erro.code === "auth/invalid-action-code")) {
            document.getElementById("invalido-titulo").textContent = mensagem.titulo;
            document.getElementById("invalido-texto").textContent = mensagem.texto;
            trocarEstado(estadoInvalido);
            return;
          }
          erroRedefinir.mostrar(mensagem);
        });
    });
  }
})();
