# Gemini Force · Guia (protótipo 0.1.0)

Guia de regras (SRD v0.12) do Gemini Force Universe dentro do Foundry VTT 14, no visual do Escudo do Mestre.

## Instalar

No Foundry (tela de Setup → Add-on Modules → Install Module), cole no campo **Manifest URL**:

```
https://raw.githubusercontent.com/arielcmanussakis-alt/gfu-guia/main/module.json
```

Depois, ative o módulo no mundo e abra pelo botão **Guia do SRD** (ícone de livro) nos controles de cena, ou com **Shift+G**. Novas versões aparecem no botão de atualizar módulos do Setup.

## Publicar uma versão nova

1. Edite `srd/` e rode `node build/build.mjs`.
2. Suba `version` em `module.json` e troque o número no link de `download`.
3. Gere `dist/gemini-guia-vX.Y.Z.zip` com o conteúdo do módulo na raiz (sem `dist/` e `.git/`).
4. Faça o commit no `main`. O Foundry passa a mostrar a atualização no Setup.

## Na mesa

- **12 capítulos** do SRD, com sumário por seção e navegação entre capítulos.
- **Busca** (Ctrl+K com a janela em foco): procura em títulos, texto, linhas de tabela e itens como "**Foco Inato:**". Ignora acentos. Setas e Enter abrem o resultado e destacam a linha.
- **Mestre × jogador:** jogadores carregam `data/srd-player.json`, sem o Apêndice e sem blocos marcados como de Mestre. Mestres carregam `data/srd-gm.json`, com esses blocos destacados.
- **Links @SRD em qualquer texto do Foundry** (descrição de item, Journal, chat):
  `@SRD[combate.efeitos-especiais]{Efeitos Especiais}` vira um link que abre o guia na seção.
  O botão **@SRD** no canto de cada seção copia esse texto pronto.
- **Comando de chat:** `/srd concentração` abre o guia com a busca preenchida; `/srd combate.ferimentos` abre direto na seção.
- **API:** `game.modules.get("gemini-guia").api.open("progressao.patamares-de-ameaca")`.

O guia não acessa a internet, não grava nada no mundo e não altera fichas. A última leitura de cada usuário fica no navegador.

## Editar o SRD

O texto oficial fica em `srd/`, um arquivo por capítulo. Depois de editar, gere os dados:

```
node build/build.mjs
```

O build não tem dependências (só Node 18+). Ele avisa sobre seções sem id, links internos quebrados e qualquer conteúdo de Mestre que vazaria para o arquivo dos jogadores. Nesse último caso, o build falha.

### Formato de cada capítulo

```
---
id: combate
number: "8"
title: Combate e ferimentos
icon: fa-burst
kicker: Resposta imediata
description: Ações, Efeitos Especiais, ferimentos e Pontos de Sorte.
visibility: all          (ou gm: capítulo inteiro só para Mestres)
---

Texto de abertura opcional.

## 8.1 Estrutura {#estrutura}
```

- Cada `## ` é uma seção. O `{#id}` é o endereço usado em `@SRD[capitulo.id]`; **não mude um id existente**, ou os links nas fichas quebram.
- `### ` cria um tópico dentro da seção.
- Aceita **negrito**, *itálico*, listas (com sub-itens indentados), listas de tarefas `- [ ]`, tabelas com `|`, e `[texto](#capitulo.secao)` para links internos.
- Caixas de destaque: `> [!regra] texto`, `> [!aviso] texto`, `> [!nota] texto`.
- Conteúdo só para Mestres:

  ```
  <!-- gm -->
  Texto que jogadores não recebem.
  <!-- /gm -->
  ```

- HTML escrito no Markdown é exibido como texto, nunca executado.

O build também gera `data/effects.json` com os 26 Efeitos Especiais do cap. 8.5, no formato que o Escudo do Mestre pode passar a ler (fase 2).

## Limites deste protótipo

- O conteúdo de Mestre não é secreto: um jogador que digite a URL de `srd-gm.json` consegue baixá-lo. O mesmo vale hoje para o Escudo.
- `styles/gf-theme.css` é uma cópia do CSS do Escudo v0.4.0. Na fase 2, ele vira um arquivo compartilhado pelos dois módulos.
- A publicação ainda é manual; uma GitHub Action pode automatizar o build e a release (fase 3).
