---
id: fundamentos
number: "1"
title: Fundamentos
icon: fa-book-open
kicker: Base do sistema
description: Fontes, glossário, testes d100, graus de dificuldade e Tarefas Estendidas.
visibility: all
---

## 1.1 Escopo e hierarquia de fontes {#escopo-e-hierarquia-de-fontes}

O GFU é um jogo **PvE** de mundo persistente, ambientado em Gemini City, sobre a base do Mythras Destined. Em caso de conflito entre fontes, vale esta ordem:

1. Este SRD e os patches que o editarem depois.
2. O texto de cada poder, Especialização, Trait ou item da Loja, para aquilo que ele descreve.
3. Mythras Destined, para tudo que este SRD não cobrir.
4. Suplementos de Mythras 2E, apenas quando a staff indicar.

O Livro Auxiliar v4 e os Patch Notes v0.1–v0.11 ficam como histórico.

## 1.2 Glossário {#glossario}

| Termo | Significado |
| --- | --- |
| Características | Os sete valores base: FOR, CON, TAM, DES, INT, POD, CAR. |
| Atributos | Valores derivados: Pontos de Ação, Modificador de Dano, Modificador de Experiência, Taxa de Cura, Pontos de Vida, Bônus de Iniciativa, Pontos de Sorte, Pontos de Poder, Movimento. |
| Perícias | Valores percentuais. Básicas (todos têm), Profissionais (precisam ser adquiridas), Estilos de Combate, Perícias de Origem (Misticismo, perícias de Caminho e Conexão Base). |
| XP | Pontos de Experiência. Única moeda de progressão. Substitui os termos "Rolagem de Experiência" e "EXP". |
| Patamar | Nível do personagem (1–20), definido pelo XP gasto. Agrupado em Níveis de Ameaça: Ventania, Incêndio, Tempestade, Terremoto. |
| Poder Principal | Poder completo, amplificável. Substitui o termo "Poder Central". |
| Poder Secundário | Poder simplificado, geralmente com custo fixo de PP por uso. |
| Amplificação | Aprimoramento de um poder, ativado com Pontos de Poder. Tiers I, II e III. |
| Aprimoramento de Origem | Benefício permanente ligado à Origem, recebido em marcos de Patamar. Não confundir com Amplificação. |
| Especialização | Treinamento de alto nível em Combate, Profissão ou Fabricação. |
| Trait | Habilidade que não é poder, Especialização nem item. |
| Instrutor | NPC que ensina perícias, Estilos, Especializações e Tier III. Substitui "Professor" e "Tutor". "Professor" passa a ser só o nome de uma Tag de Instrutor. |
| Supervisor | NPC de apoio logístico da equipe. |
| Downtime | Intervalo narrativo entre missões, usado para treinar, trabalhar e fabricar. |
| Season | Temporada de jogo, com cerca de 16 semanas. |
| Rodada / Ciclo / Turno | Rodada = 5 segundos. Ciclo = a sequência em que todos agem na Rodada. Turno = o momento em que um personagem age. Efeitos medidos em "Ciclos" duram o número correspondente de Rodadas. |

Notação de frações: ⅕ POD↓ arredonda para baixo; ⅕ POD↑ arredonda para cima.

## 1.3 Testes {#testes}

Role 1d100 contra o valor da perícia, já ajustado pela dificuldade.

| Resultado | Condição |
| --- | --- |
| Sucesso Crítico | Igual ou menor que 1/10 da perícia ajustada (arredondado para cima) |
| Sucesso | Igual ou menor que a perícia ajustada |
| Falha | Maior que a perícia ajustada |
| Falha Crítica | 99–00; apenas 00 se a perícia passar de 100% |

Qualquer que seja o valor ajustado, **01–05 é sempre Sucesso** e **96–00 é sempre Falha** (a rolagem do Foundry já aplica isso).

**Sucesso automático:** tarefas simples para quem tem a perícia, ou sem pressa nem pressão, não pedem rolagem. Se o jogador quiser buscar um Crítico, rola num grau favorável (em geral Muito Fácil); a falha ainda cumpre a tarefa, com uma complicação.

## 1.4 Graus de dificuldade {#graus-de-dificuldade}

O GFU usa os **graus multiplicativos** do Destined, com os valores da rolagem do Foundry. O crítico é calculado sobre o valor ajustado.

| Grau | Efeito na perícia |
| --- | --- |
| Automático | Sem rolagem |
| Muito Fácil | Dobra |
| Fácil | +50% do valor |
| Padrão | Sem alteração |
| Difícil | −1/3 do valor |
| Formidável | Metade |
| Hercúleo | 1/10 do valor |
| Impossível | Não pode ser tentado |

Modificadores de mesmo sentido não se somam: usa-se o pior (ou o melhor). Com modificadores mistos, conte quantos passos o negativo está do Padrão e aplique-os a partir do positivo. Expressões como "+1 Nível de Dificuldade" significam um grau mais difícil; "−1 Nível" significa um grau mais fácil.

> [!nota] Hercúleo é 1/10 da perícia, como na rolagem do Foundry (o Destined usa 1/5).

**Bônus fixos em %** continuam existindo em casos específicos (Disposição Social, Posto em Círculos, bônus de Paixão, +10% de alguns efeitos). Eles somam ao valor da perícia e não mudam o grau.

## 1.5 Testes Opostos e Diferenciais {#testes-opostos-e-diferenciais}

- **Rolagem Oposta:** vence quem tiver o maior nível de sucesso. Empate em sucesso: vence a **maior margem** (valor da perícia ajustada − dado). Empate em falha: ninguém vence.
- **Rolagem Diferencial:** cada lado rola contra a própria perícia; a diferença de níveis de sucesso gera vantagens (em combate, Efeitos Especiais, cap. 8). Empate em sucesso: quem tiver a maior margem recebe 1 Efeito Especial.
- **Perícia acima de 100%:** numa Oposta ou Diferencial, o excedente acima de 100 do maior valor é subtraído de todos os participantes. Exemplo: 102% contra 51% vira 100% contra 49%.

## 1.6 Outras regras gerais {#outras-regras-gerais}

- **Tentar de novo:** uma segunda tentativa é permitida, um grau mais difícil, quando a falha não tem consequência imediata.
- **Auxílio de perícia:** uma perícia relacionada soma 1/5 do seu valor (20%) à perícia ativa. A faixa de Crítico e de Falha Crítica continua a da perícia ativa sem o bônus. Só uma perícia auxilia cada teste, e o Mestre decide se ela se aplica.
  - **Ajudar outro personagem:** quem ajuda precisa ter a perícia e conseguir se comunicar com o ajudado (inclusive por rádio ou telepatia); soma 1/5 do valor dele ao próximo teste do aliado. Em combate, ajudar custa 1 PA.
  - **Poder como auxílio:** se um poder ajuda claramente na tarefa e o texto dele não diz outra coisa, o teste fica um grau mais fácil.
- **Limitar (capping):** quando uma perícia depende de outra mais fraca, o teste usa o valor menor. Ex.: Influência limitada pela Língua do idioma falado.
- **Concentração:** enquanto um poder com Concentração estiver ativo, todos os testes de perícia do personagem ficam um grau mais difíceis. Só um poder de Concentração por vez; usar outro poder que exija Ação Proativa ou Concentração encerra o primeiro. Ao sofrer dano ou efeito de Perigo, inclusive os que pedem teste de resistência, o personagem faz um teste de Força de Vontade sem oposição ou perde a Concentração.

## 1.7 Tarefas Estendidas {#tarefas-estendidas}

Tarefas longas (consertar um veículo, investigar uma cena, pesquisar um arquivo) são divididas em etapas. O Mestre define a perícia, o tempo de cada etapa e, se houver prazo, quantas etapas cabem nele. Cada teste soma progresso:

| Resultado | Progresso |
| --- | --- |
| Crítico | +50% |
| Sucesso | +25% |
| Falha | 0 |
| Falha Crítica | −25% |

- Com **100%**, a tarefa termina. Se o prazo acabar antes, o Mestre pode conceder um resultado parcial proporcional ao progresso.
- **Várias perícias:** quando mais de uma serve, qualquer uma soma progresso; quando a tarefa exige várias, cada uma precisa de pelo menos um teste.
- **Auxílio** e **Rolagens Opostas** (ex.: desarmar a bomba de outro personagem) seguem as regras gerais.
- A fabricação de **Invenções e Malwares** usa uma variante própria, com Progresso em pontos e Defeitos (cap. 11).
