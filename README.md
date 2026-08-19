# KmZero

### De onde você partiu.

**Você se inscreve na prova aqui. E aqui fica, para sempre, o registro de tudo que você correu.**

Toda plataforma de corrida te inscreve. Nenhuma te devolve o que você construiu:
os tempos, as edições consecutivas, a distância somada de anos, a etapa que você
completou quando achou que não ia dar. O KmZero existe para essa segunda parte —
e a inscrição é só a porta de entrada.

---

## O que o KmZero faz

### Para quem corre

**Encontre a prova certa, não a primeira que apareceu.**
Filtre por cidade, data, distância, terreno, preço, situação da inscrição, dia da
semana, horário da largada — e por **categoria PCD**: cadeirante, atleta-guia,
surdoatleta, deficiência intelectual. Todas as buscas viram link compartilhável.

**Preço na vitrine, não no checkout.**
Inclusive quando é grátis. Descobrir a taxa no fim é prática que este produto não
adota.

**Você não perde a janela.**
A confirmação de presença abre e fecha em poucos dias, e quem esquece fica fora da
etapa. Avisamos quando abre e de novo antes de fechar. Confirmar leva um toque —
sem CAPTCHA, sem formulário, sem rolar a tela para achar o botão.

**Seu histórico não se apaga.**
Tempo, colocação e categoria de cada prova que você correu. Ano após ano, no mesmo
lugar. Comparações contra a sua categoria e contra você mesmo no ano passado, no
mesmo percurso.

### Para quem organiza

**Em que dia marcar?** É a pergunta mais cara de um organizador, e hoje ela é
respondida no chute. O **Mapa de Datas** mostra quantas provas já estão marcadas
em cada fim de semana da sua região — em contagens agregadas, que nunca revelam de
quem é cada evento.

Mais: publicação do evento com lotes, cupons e PIX; **pontuação de circuito apurada
sozinha**, com as regras de pontos, bônus e descarte descritas uma vez e a
classificação recalculada a cada etapa; e a comparação de uma edição contra a
anterior — quantos vieram, quantos voltaram, de onde vieram.

**Evento gratuito não paga taxa nenhuma.** Não passa por gateway, não tem custo.

---

## O que torna este produto diferente

**Feito para o público que realmente corre no Brasil.**
As categorias oficiais vão até 80+ e incluem oito categorias PCD. Então a base
tipográfica é 18px, não 16. Os alvos de toque são de 48px, o dobro do mínimo da
WCAG. O zoom por pinça nunca é bloqueado. Contraste medido — não estimado — em
cada par de cores. Isso não é acessibilidade de fachada: é o público literal.

**Rápido no celular, na rua, com sol, depois de correr 10 km.**
As páginas públicas funcionam **sem JavaScript**. O que precisa estar disponível no
dia da prova — número, categoria, horário, local — fica em cache e abre offline.

**Arquitetura de custo fixo zero.**
O produto roda indefinidamente sem receita, e por isso não precisa monetizar antes
de ter valor. Nenhum componente cobra por usuário na escala prevista — a
autenticação é gratuita até 50 mil pessoas ativas por mês —, e nenhum banco dorme
por inatividade para acordar no pior momento do ano.

---

## Em que pé está

Este repositório está no começo. Sendo honesto sobre o que existe:

| | |
|---|---|
| Documentação de produto, arquitetura e design | ✅ Completa |
| Vitrine pública — busca, filtros e cards | 🟡 No ar, com dados de demonstração |
| Conta: entrar, criar e recuperar senha | 🟡 Telas desenhadas e navegáveis; a autenticação ainda não está ligada |
| Validação com corredores e organizadores | ⬜ Próximo passo |
| Banco, contas, inscrição e pagamento | ⬜ Planejado |

**As provas exibidas hoje são exemplos.** Nenhuma delas existe, e a página diz isso
em letras grandes. Elas servem para mostrar a busca e os seis estados de inscrição
funcionando de verdade.

---

## Rodar

Não precisa de build. HTML e CSS puros.

```sh
npx serve apps/web
# ou
python -m http.server -d apps/web 4321
```

Depois abra `http://localhost:4321`.

---

## Como este repositório está organizado

```
KmZero/
├── apps/web/          # vitrine pública — a página que está no ar
└── docs/              # a documentação que decide o produto
```

| Documento | Responde |
|---|---|
| [Análise de mercado](docs/01-analise-mercado.md) | Quanto vale este mercado, quem já está nele e como o KmZero se paga |
| [Arquitetura e stack](docs/02-arquitetura-e-stack.md) | Como funciona por dentro, a que custo, e qual número obriga a migrar para o pago |
| [Design system](docs/03-design-system.md) | Como o produto se parece e por quê — com todos os contrastes calculados |
| [Roadmap e execução](docs/04-roadmap-e-execucao.md) | O que fazer, em que ordem, e como saber se deu certo |
| [Backlog](docs/05-backlog-de-execucao.md) | As 95 tarefas ordenadas por dependência |

Quem for mexer no código começa por [`apps/web/README.md`](apps/web/README.md).

---

## Avisos

**O KmZero é um projeto particular.** Ele não representa nada nem ninguém além do
responsável por este repositório.

Não é serviço oficial e não tem qualquer vínculo, patrocínio, endosso ou
representação de:

- órgão público de qualquer esfera — municipal, estadual ou federal — incluindo
  prefeituras e secretarias de esporte;
- entidade não governamental, associação, clube, assessoria esportiva ou empresa;
- federação ou confederação esportiva, estadual ou nacional.

Menções a campeonatos, provas, cidades ou entidades na documentação e nas telas de
demonstração são **referências a informação pública**, feitas para análise e
exemplo. Não implicam autorização, parceria ou aprovação de ninguém.

Os eventos exibidos hoje na vitrine são **fictícios**: nomes, datas, preços e
condições foram inventados para demonstrar a interface.

A política de privacidade e os termos de uso serão publicados **antes** de qualquer
cadastro.

## Licença

Proprietária — todos os direitos reservados. Ver [`LICENSE`](LICENSE).

Este repositório **não é código aberto**. Ele pode estar visível publicamente, mas
visibilidade não é licença: usar, copiar, modificar ou distribuir o conteúdo exige
autorização prévia e por escrito.

---

**KmZero — de onde você partiu.**
