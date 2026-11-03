---
id: invencoes
number: "11"
title: Invenções e Malwares
icon: fa-microchip
kicker: Protótipo
description: Projetos, Tarefas Estendidas, Defeitos e Malwares.
visibility: all
---

> [!aviso] Protótipo para teste em mesa. Os números são um ponto de partida e devem ser ajustados com o uso.

Uma **Invenção** é um dispositivo criado pelo personagem: arma, traje, drone, ferramenta, veículo modificado, composto químico. Um **Malware** é um programa ofensivo ou defensivo. Os dois usam a mesma estrutura: **Projeto → Tarefa Estendida → Item pronto**.

<!-- gm -->
> [!regra] **Para Mestres:** anote em cada sessão de teste a Complexidade, o tempo gasto e quantos Defeitos surgiram. Esses registros vão calibrar a tabela de 11.2 no próximo patch.
<!-- /gm -->

## 11.1 Quem pode criar {#quem-pode-criar}

- **Invenção:** ter uma Especialização de Fabricação plausível para o item (ex.: Trajes Avançados para um traje; Engenharia Robótica para um drone; Químico Autodidata para um composto).
- **Malware:** ter Hacking (ofensivos) ou Criptografia e Cibersegurança (defensivos).
- **Fabricante:** mantém projetos simultâneos iguais aos seus Pontos de Ação; os demais personagens, um projeto por vez. As habilidades de Inspiração funcionam como descrito no cap. 3.4.

## 11.2 Projeto {#projeto}

O jogador descreve o que o item faz. O Mestre classifica a **Complexidade**, comparando o efeito com itens da Loja da raridade equivalente, e define as perícias de cada etapa.

| Complexidade | Raridade equivalente | Dificuldade dos testes | Progresso necessário | Tempo por teste | Materiais (Invenção) |
| --- | --- | --- | --- | --- | --- |
| 1 — Simples | Comum | Fácil | 2 | 1 dia | $500 |
| 2 — Avançada | Incomum | Padrão | 3 | 2 dias | $2.000 |
| 3 — Sofisticada | Rara | Difícil | 4 | 1 semana | $8.000 |
| 4 — Experimental | Especial | Formidável | 5 | 2 semanas | $25.000 |
| 5 — Revolucionária | Única | Hercúleo | 6 | 1 mês | Só com aval da staff |

Malwares não pagam materiais, mas exigem **amostra do sistema-alvo** para Complexidade 3 ou mais (ver 11.5). Especializações que dão "metade do tempo" reduzem o tempo por teste; as que dão "um grau mais fácil" reduzem a dificuldade.

## 11.3 Tarefa Estendida {#tarefa-estendida}

Toda criação passa por três etapas, e cada etapa precisa de **pelo menos um** teste da perícia correspondente:

| Etapa | Invenção | Malware |
| --- | --- | --- |
| Projeto | Engenharia, Ciência ou Conhecimento | Computadores |
| Construção | Artesanato, Eletrônicos ou Mecanismos | Computadores |
| Integração e teste | Eletrônicos, Mecanismos ou a perícia de uso do item | Operações de Sistemas |

Cada teste soma **Progresso**:

| Resultado | Progresso |
| --- | --- |
| Crítico | +2 |
| Sucesso | +1 |
| Falha | 0 (o tempo é perdido) |
| Falha Crítica | −1 e o item ganha um **Defeito** (11.4) |

Quando o Progresso atinge o necessário e as três etapas tiveram ao menos um teste, o item fica pronto.

**No Downtime:** fabricar é Atividade Principal. Cada Downtime permite um número de testes: Curto 1, Médio 3, Longo 6, desde que o tempo por teste caiba no período. **Descoberta Revolucionária** do Fabricante conta um teste como Crítico.

## 11.4 Defeitos {#defeitos}

Cada Defeito é rolado em 1d6 e fica no item até ser corrigido.

| 1d6 | Defeito | Efeito |
| --- | --- | --- |
| 1 | Consumo alto | Carga −1 (mínimo 1) |
| 2 | Superaquecimento | Ao usar, Falha Crítica causa 1d3 de dano ao usuário, ignorando armadura |
| 3 | Falha intermitente | Antes de cada uso, teste Fácil de Eletrônicos ou Mecanismos; se falhar, a ativação gasta a ação sem efeito |
| 4 | Frágil | PV do item pela metade |
| 5 | Assinatura | O item emite rastro; Percepção, Rastreamento ou Operações de Sistemas para detectá-lo ficam um grau mais fáceis |
| 6 | Instável | Falha Crítica no uso destrói o item e causa 1d6 de dano em área de 2 m |

**Corrigir um Defeito:** Atividade Secundária de Downtime e um teste da perícia de Construção na dificuldade da Complexidade.

## 11.5 Item pronto {#item-pronto}

**Invenção:** recebe uma ficha no formato dos Equipamentos da Loja: PA, PV, Carga (usos por missão ou recarga), dano ou efeito, alcance e Características. É usada com a perícia adequada (Estilo de Combate para armas, Condução para veículos e assim por diante). Depois de cada missão em que foi usada, precisa de **Manutenção**: Atividade Secundária com teste Fácil de Construção; sem ela, a Carga começa a próxima missão pela metade.

**Malware:** recebe um **Tipo** e uma **Potência**, que é o valor de Computadores do criador no fim do projeto.

| Tipo | Efeito |
| --- | --- |
| Intrusão | Abre acesso a um sistema; o próximo teste de Computadores nele fica até dois graus mais fácil |
| Extração | Copia dados ou arquivos protegidos |
| Sabotagem | Desliga câmeras, travas, energia ou um Sistema de veículo ou drone por 1d3 Rodadas (combate) ou 1d3 horas (fora de combate) |
| Controle | Assume um dispositivo (drone, torreta, câmera) pelo tempo da cena; o dispositivo age na Iniciativa do hacker |
| Rastreio | Revela a localização de um aparelho ou usuário conectado |
| Defesa | Fica instalado num sistema aliado; invasões contra ele são opostas pela Potência do Malware |

**Implantar** exige acesso físico ou de rede ao alvo e uma Ação Não-Combativa (em combate, 1 PA). O hacker rola **Potência oposta à Segurança** do sistema: Baixa 40%, Média 60%, Alta 80%, Militar 100%, ou o Operações de Sistemas de um operador ativo. Uma **amostra do sistema-alvo** (obtida por Extração, Pesquisa ou acesso físico) deixa a implantação um grau mais fácil.

**Queima:** depois de usado contra uma organização, o Malware é catalogado. Cada novo uso contra a mesma organização fica um grau mais difícil, até que o criador o reescreva (um teste de Construção no Downtime).

**Rastro:** uma Falha Crítica na implantação revela a localização do hacker ao alvo.

## 11.6 Exemplos {#exemplos}

| Item | Tipo | Complexidade | Resumo |
| --- | --- | --- | --- |
| Luvas de Aderência | Invenção | 1 | Atletismo para escalar superfícies lisas fica um grau mais fácil |
| Drone de Vigilância | Invenção | 2 | Voa a até 200 m do operador; transmite imagem; PA 2, PV 4 |
| Lançador de Rede Elétrica | Invenção | 3 | Ataque à distância com Emaranhar; Carga 3; quem fica preso sofre 1d4 de dano elétrico por Rodada |
| Apagão | Malware | 2 | Sabotagem de energia e câmeras de um edifício |
| Fantasma | Malware | 3 | Controle de uma torreta ou drone durante a cena |
