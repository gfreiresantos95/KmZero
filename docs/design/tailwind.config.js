/**
 * KmZero — configuração Tailwind
 *
 * REGRA: este arquivo NÃO define cores. Ele apenas expõe os tokens de
 * `tokens.css` como utilitários. Uma fonte de verdade só.
 *
 * Consequência prática: alternar modo claro/escuro não exige a variante
 * `dark:` em lugar nenhum — as custom properties já mudam sozinhas.
 * Se você escrever `dark:bg-...` num componente, provavelmente errou.
 *
 * Documentação e contrastes medidos: ../03-design-system.md
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}',
  ],

  // Modo escuro por atributo — combina com [data-tema] em tokens.css.
  darkMode: ['selector', '[data-tema="escuro"]'],

  theme: {
    // `extend` NÃO é usado nas escalas de cor/espaço/tipo: substituímos
    // as escalas padrão do Tailwind de propósito. Um hex do Tailwind
    // (`bg-blue-500`) num componente é um bug de design system, e
    // remover a escala padrão faz esse bug virar erro de build.

    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      fundo:       'var(--cor-fundo)',
      superficie:  'var(--cor-superficie)',
      superficie2: 'var(--cor-superficie-2)',

      texto: {
        DEFAULT:   'var(--cor-texto)',
        suave:     'var(--cor-texto-suave)',
        fraco:     'var(--cor-texto-fraco)',
        invertido: 'var(--cor-texto-invertido)',
      },

      // Maré — teal profundo
      primaria: {
        50:  'var(--cor-primaria-50)',
        100: 'var(--cor-primaria-100)',
        500: 'var(--cor-primaria-500)',
        600: 'var(--cor-primaria-600)',
        700: 'var(--cor-primaria-700)',
        900: 'var(--cor-primaria-900)',
      },

      // Largada — laranja queimado. SÓ ação crítica e urgência.
      acento: {
        100: 'var(--cor-acento-100)',
        500: 'var(--cor-acento-500)', // ≥24px ou decoração. Nunca corpo de texto.
        600: 'var(--cor-acento-600)',
        700: 'var(--cor-acento-700)',
      },

      sucesso: {
        100: 'var(--cor-sucesso-100)',
        700: 'var(--cor-sucesso-700)',
      },
      alerta: {
        100: 'var(--cor-alerta-100)',
        700: 'var(--cor-alerta-700)',
      },
      perigo: {
        100: 'var(--cor-perigo-100)',
        700: 'var(--cor-perigo-700)',
      },

      borda: {
        DEFAULT: 'var(--cor-borda)',       // decorativa
        forte:   'var(--cor-borda-forte)', // WCAG 1.4.11 — campos e componentes
      },

      foco: 'var(--cor-foco)',

      // Séries de gráfico — categórica. QUATRO slots, ordem fixa.
      // `dado-1` é sempre "você". Não existe `dado-5`: uma 5ª cor
      // derruba a separação para daltônicos (validado). Mais séries
      // => small multiples ou agregação em "Outros".
      dado: {
        1: 'var(--dado-1)',
        2: 'var(--dado-2)',
        3: 'var(--dado-3)',
        4: 'var(--dado-4)',
      },

      // Rampa sequencial — magnitude. Mapa de Datas, heatmaps.
      densidade: {
        0: 'var(--densidade-0)', // zero: neutro, nunca a matiz
        1: 'var(--densidade-1)',
        2: 'var(--densidade-2)',
        3: 'var(--densidade-3)',
        4: 'var(--densidade-4)',
        5: 'var(--densidade-5)',
      },
    },

    fontFamily: {
      ui:  'var(--fonte-ui)',
      num: 'var(--fonte-num)',
    },

    // Escala modular 1.2 sobre base de 18px. Cada entrada traz a
    // altura de linha e o peso corretos por padrão.
    fontSize: {
      '3xs':  ['var(--txt-3xs)',  { lineHeight: 'var(--lh-subtitulo)', fontWeight: 'var(--peso-medio)' }],
      '2xs':  ['var(--txt-2xs)',  { lineHeight: 'var(--lh-subtitulo)', fontWeight: 'var(--peso-medio)' }],
      xs:     ['var(--txt-xs)',   { lineHeight: 'var(--lh-corpo)' }],
      base:   ['var(--txt-base)', { lineHeight: 'var(--lh-corpo)' }],
      lg:     ['var(--txt-lg)',   { lineHeight: 'var(--lh-subtitulo)', fontWeight: 'var(--peso-medio)' }],
      xl:     ['var(--txt-xl)',   { lineHeight: 'var(--lh-titulo)',    fontWeight: 'var(--peso-semi)' }],
      '2xl':  ['var(--txt-2xl)',  { lineHeight: 'var(--lh-titulo)',    fontWeight: 'var(--peso-forte)' }],
      '3xl':  ['var(--txt-3xl)',  { lineHeight: 'var(--lh-apertado)',  fontWeight: 'var(--peso-forte)' }],
      '4xl':  ['var(--txt-4xl)',  { lineHeight: '1',                   fontWeight: 'var(--peso-extra)' }],
    },

    // Peso 300 não existe de propósito: some com sol na tela.
    fontWeight: {
      normal: 'var(--peso-normal)',
      medio:  'var(--peso-medio)',
      semi:   'var(--peso-semi)',
      forte:  'var(--peso-forte)',
      extra:  'var(--peso-extra)',
    },

    spacing: {
      0:  '0',
      1:  'var(--esp-1)',
      2:  'var(--esp-2)',
      3:  'var(--esp-3)',
      4:  'var(--esp-4)',
      5:  'var(--esp-5)',
      6:  'var(--esp-6)',
      8:  'var(--esp-8)',
      12: 'var(--esp-12)',
      16: 'var(--esp-16)',

      // Alvos de toque — 48px mínimo, o dobro do exigido pela WCAG 2.2.
      alvo:     'var(--alvo-min)',      // 48px
      botao:    'var(--alvo-botao)',    // 56px
      critico:  'var(--alvo-critico)',  // 96px — ConfirmacaoCard
    },

    borderRadius: {
      none: '0',
      sm:   'var(--raio-sm)',
      md:   'var(--raio-md)',
      lg:   'var(--raio-lg)',
      xl:   'var(--raio-xl)',
      full: 'var(--raio-full)',
    },

    boxShadow: {
      none: 'none',
      1:    'var(--sombra-1)',
      2:    'var(--sombra-2)',
      3:    'var(--sombra-3)',
    },

    // Em `em`, não `px`: respeita o zoom do usuário.
    screens: {
      sm: '30em',
      md: '48em',
      lg: '64em',
      xl: '80em',
    },

    transitionDuration: {
      rapido: 'var(--motion-rapido)',
      padrao: 'var(--motion-padrao)',
      lento:  'var(--motion-lento)',
    },

    transitionTimingFunction: {
      padrao: 'var(--motion-curva)',
    },

    extend: {
      maxWidth: {
        leitura:  'var(--medida-leitura)',   // 66ch
        conteudo: 'var(--largura-conteudo)', // 68rem
      },
      minHeight: {
        alvo:    'var(--alvo-min)',
        botao:   'var(--alvo-botao)',
        critico: 'var(--alvo-critico)',
      },
      minWidth: {
        alvo: 'var(--alvo-min)',
      },
      outlineWidth: {
        foco: 'var(--foco-largura)',
      },
      outlineOffset: {
        foco: 'var(--foco-offset)',
      },
    },
  },

  plugins: [
    /**
     * Utilitários que o design system exige e o Tailwind não traz.
     */
    function ({ addUtilities, addComponents }) {
      addUtilities({
        // Números tabulares — obrigatório em tempo, posição e pontuação.
        '.num': {
          fontFamily: 'var(--fonte-num)',
          fontVariantNumeric: 'tabular-nums',
          fontFeatureSettings: '"tnum" 1',
        },
        // Conteúdo largo rola dentro do próprio contêiner.
        '.rolagem-x': {
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        },
        // Visível só para leitor de tela.
        '.so-leitor': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        },
      });

      addComponents({
        // Anel de foco padrão. Se um componente precisa suprimir o
        // outline nativo, ele DEVE aplicar esta classe no lugar.
        '.foco-anel': {
          '&:focus-visible': {
            outline: 'var(--foco-largura) solid var(--cor-foco)',
            outlineOffset: 'var(--foco-offset)',
            borderRadius: 'var(--raio-sm)',
          },
        },
      });
    },
  ],
};
