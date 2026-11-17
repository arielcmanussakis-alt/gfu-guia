---
id: combate
number: "8"
title: Combate e ferimentos
icon: fa-burst
kicker: Resposta imediata
description: Ações, Efeitos Especiais, ferimentos, cura, Fadiga, Pontos de Sorte, veículos, Perigos e quedas.
visibility: all
---

Combate no GFU é visceral e pode matar. Nenhuma situação deve ser tratada como trivial.

## 8.1 Estrutura {#estrutura}

- **Rodada:** 5 segundos. **Iniciativa:** 1d10 + Bônus de Iniciativa no início do combate; empatados agem ao mesmo tempo. A ordem se mantém até algo forçar nova rolagem.
- **Turno:** no seu turno, o personagem gasta 1 Ponto de Ação numa Ação Proativa. Fora do turno, pode gastar PA em Ações Reativas, uma por ameaça.
- PA não usados se perdem no fim da Rodada.

## 8.2 Ações {#acoes}

| Ação | Tipo | Custo | Regras |
| --- | --- | --- | --- |
| Atacar | Proativa | 1 PA | Arma, Desarmado ou poder ofensivo. Movimento Rápido antes ou depois; depois do ataque, exige rolagem de desengaje, salvo se o oponente não puder agir |
| Mover | Proativa | 1 PA | Até a Taxa de Movimento, ou movimento de poder (Voo, Teleporte); entrar em veículo ou montaria. Desengaje: ver 8.3 |
| Manobrar | Proativa | 1 PA | Contra vários oponentes: Evasão oposta a Desarmado ou Estilo. Quem perder, ou não gastar PA para contestar, não ataca o personagem nesta Rodada. Se manobrar ao menos um, faz Movimento Rápido |
| Usar Poder | Proativa | 1 PA | Ativa um poder. Pode ativar e segurar até o próximo turno, liberando-o como Ação Livre; enquanto segura, pode usar Counter |
| Preparar Item | Proativa | 1 PA | Sacar, pegar, recarregar, abrir porta, ligar aparelho. Com Movimento Rápido, teste de Atletismo; falha derruba um item a 1d4+1 m |
| Preparar para Impacto | Proativa | 1 PA | TAM efetivo +50% contra Knockback ou Ataque com Salto, ×2 contra Empurrar. Sem movimento |
| Atrasar Ação | Proativa | 1 PA | Reserva o PA para Evasão, Aparar ou Interrupção até o próximo turno |
| Recuperar Base | Proativa | 1 PA | Levantar-se. Engajado: Musculatura ou Atletismo oposto ao adversário. Desengajado: automático, com Movimento Rápido |
| Libertar-se | Proativa | 1 PA | Sair de Agarrão, Emaranhar ou Segurar; Musculatura ou Desarmado oposto. Movimento Rápido se conseguir |
| Ação Não-Combativa | Proativa | 1 PA | Teste de perícia fora do combate (Percepção, Mecanismos...); tarefas complexas tomam vários turnos |
| Hesitar | Proativa | 1 PA | Padrão quando nada é escolhido |
| Aparar | Reativa | 1 PA | Bloqueia com arma, escudo ou o corpo (Estilo ou Desarmado) |
| Evasão | Reativa | 1 PA | Esquiva; o personagem fica caído, salvo se usar Acrobacias (quando houver espaço) ou tiver habilidade que evite |
| Counter | Reativa | 1 PA | Usa um poder para anular outro poder; testes opostos da perícia do poder (ou Força de Vontade). O Mestre decide se os poderes se anulam |
| Interrupção | Reativa | PA reservado | Usa a Ação Atrasada quando a condição declarada acontece |
| Ativar Amplificação | Livre | PP | Junto de outra Ação; várias se houver PP |
| Movimento Rápido | Livre | — | Até 1/3 do movimento de caminhada, se não usou Mover neste turno nem no anterior |
| Analisar a Situação | Livre | — | Percepção, se não estiver engajado |
| Falar | Livre | — | Frases curtas |
| Largar Item | Livre | — | — |
| Proteger Local | Livre | — | Escudo ou arma protege um local; ataques nele contam como aparados até mudar o local ou atacar |
| Usar Ponto de Sorte | Livre | Sorte | Ver 8.9 |

## 8.3 Engajamento e desengaje {#engajamento-e-desengaje}

- **Um oponente:** para se afastar com Mover, o personagem vence uma rolagem oposta de **Atletismo**. A rolagem do oponente é obrigatória e não gasta PA dele, mas só acontece se ele ainda tiver PA na Rodada; sem PA, o desengaje é automático. Falhar desperdiça a Ação.
- **Vários oponentes:** use Manobrar.
- O Efeito Especial **Recuar** permite um Movimento Rápido sem rolagem de desengaje.

## 8.4 Ataque e defesa {#ataque-e-defesa}

1. O atacante gasta 1 PA e rola Estilo de Combate ou Desarmado.
2. O defensor, se quiser e puder, gasta 1 PA e rola Estilo ou Desarmado (Aparar) ou Evasão.
3. Compare os níveis de sucesso (Rolagem Diferencial).
4. Quem vencer ganha Efeitos Especiais conforme a tabela.
5. Se o ataque teve Sucesso ou Crítico, role dano (e Modificador de Dano, se couber) e local de acerto.
6. Se o defensor teve Sucesso ou Crítico: com Aparar, reduza o dano pelo Tamanho das armas; com Evasão, o ataque não causa dano e o defensor fica caído.
7. Subtraia os Pontos de Armadura e aplique o restante ao local.

| Defensor ↓ / Atacante → | Crítico | Sucesso | Falha | Falha Crítica |
| --- | --- | --- | --- | --- |
| Crítico | Margem decide | Defensor 1 EE | Defensor 2 EE | Defensor 3 EE |
| Sucesso | Atacante 1 EE | Margem decide | Defensor 1 EE | Defensor 2 EE |
| Falha | Atacante 2 EE | Atacante 1 EE | Nenhum | Nenhum |
| Falha Crítica | Atacante 3 EE | Atacante 2 EE | Nenhum | Nenhum |

**Margem decide:** quando os dois tiram o mesmo nível de sucesso, quem tiver a maior margem (perícia ajustada − dado) ganha **1 Efeito Especial**. Empate exato de margem: ninguém ganha.

Efeitos Especiais são escolhidos antes de rolar dano e local, e valem mesmo que nenhum dano passe. Testes de Tolerância por ferimento são feitos depois de aplicado o Efeito.

- **Não poder ou não querer defender** equivale a uma Falha.
- **Aparar um ataque que errou:** o defensor pode gastar PA para Aparar mesmo assim e tentar ganhar Efeitos.
- **Tamanho e Aparar:** arma de Tamanho igual ou maior desvia todo o dano; um Tamanho menor desvia metade; dois ou mais menores não desviam nada. Tamanhos: Pequeno, Médio, Grande, Imenso, Enorme.
- **Ambos falham:** o combate segue para o próximo na Iniciativa.

## 8.5 Efeitos Especiais {#efeitos-especiais}

Lista do Mythras Destined, com o Atirador (Marksman, do Mythras Firearms). "Of." = ofensivo, "Def." = defensivo.

| Efeito | Uso | Regra |
| --- | --- | --- |
| Levantar-se (Arise) | Def. | Se estiver caído, levanta automaticamente, mesmo engajado |
| Empurrar (Bash) | Of. | Só contundente ou Desarmado. Empurra 1 m a cada 2 pontos de dano (escudo ou Força Aprimorada) ou a cada 3 (outros), contando o dano antes de armadura. Alvo até 2× o TAM. Contra obstáculo: Atletismo ou Acrobacias Difícil para não cair |
| Escolher Local | Of. | **Corpo a corpo:** escolhe o local, se estiver ao alcance. **À distância** (armas e poderes): só no Crítico |
| Atirador (Marksman) | Of. | Só à distância. Move o local de acerto um passo para um local adjacente; pode ser escolhido de novo para mover mais um passo. A cabeça só é alcançável a partir do Peito |
| Forçar Rendição | Of. | Contra alvo em desvantagem (desarmado, caído, com Ferimento Sério). Sem dano; Força de Vontade oposta ao ataque; se falhar, se rende ou foge. Em geral só contra capangas e NPCs secundários |
| Danificar Item | Of./Def. | O dano vai para um item que o alvo segura ou, com arma Sunder, para a armadura dele |
| Desarmar | Of./Def. | Estilo de Combate oposto; o item voa um número de metros igual ao Modificador de Dano (ou cai aos pés). Arma maior deixa o teste do alvo um grau mais difícil; menor, um grau mais fácil. Desarmado com mão livre pode tomar a arma. Alvo até 2× o TAM |
| Distrair | Of./Def. | Dissimulação, Influência ou Intimidação como Ação Livre, oposta por Intuição; ou um efeito não ofensivo de poder. Se o alvo falhar, seu próximo teste numa Ação fica um grau mais difícil |
| Abrigar-se (Duck Back) | Of./Def. | Volta para uma cobertura adjacente sem gastar movimento |
| Emaranhar | Of./Def. | Arma com Emaranhar, ou poder capaz de prender. Braço preso não usa o que segura; perna impede movimento; cabeça, peito ou abdômen deixam todos os testes um grau mais difíceis. No próximo turno, 1 PA tenta Derrubar automaticamente. O alvo se solta com Musculatura oposta (1 PA) |
| Rajada (Flurry) | Of. | Gasta 1 PA para um ataque Desarmado imediato com outra parte do corpo, no mesmo turno |
| Segurar (Grip) | Of. | Com mão livre (ou membro equivalente), prende o alvo ao alcance. O alvo se solta com 1 PA e Musculatura ou Desarmado oposto |
| Impacto | Of. | Rola o dano base duas vezes e fica com o maior (não o Modificador de Dano) |
| Supressão (Pin Down) | Of. | Só à distância. Força de Vontade oposta ao ataque; se falhar, o alvo se abriga e não ataca no próximo turno. Funciona mesmo sem dano |
| Pressionar | Of./Def. | O oponente não pode Atacar no próximo turno (outras ações são permitidas) |
| Recarga Rápida | Of. | Reduz a recarga em 1 turno por vez escolhido; a 0, recarrega como Ação Livre |
| Abate Silencioso | Of. | Só contra alvo surpreso, no primeiro ataque. Impede gritos ou alarme na Rodada; se causar Ferimento Sério ou incapacitar, o alvo falha automaticamente na Tolerância |
| Firmar-se (Stand Fast) | Def. | Evita Knockback e Empurrar |
| Atordoar Local | Of. | Só contundente ou Desarmado, se passar a armadura. Tolerância oposta; se falhar, o local fica inutilizado por turnos iguais ao dano. Peito ou abdômen: só pode se defender. Cabeça: sem ações pela duração |
| Derrubar | Of./Def. | Musculatura, Evasão ou Acrobacias (escolha do alvo) oposta; se falhar, cai. Mais de duas pernas: Atletismo, um grau mais fácil |
| Recuar | Of./Def. | Movimento Rápido para longe, sem rolagem de desengaje |

**Efeitos de Crítico e Falha Crítica**

| Efeito | Quando | Regra |
| --- | --- | --- |
| Contornar Defesa | Atacante com Crítico | Escolha: ignorar a armadura do local (ou PA de fonte externa, como Campo de Força); ignorar a cobertura (ou tiro de efeito: rola o dano duas vezes e fica com o menor); ou acertar como se a Evasão ou Aparar do alvo tivesse falhado |
| Reforçar Defesa | Defensor com Crítico | Escolha: Aparar desvia todo o dano, seja qual for o Tamanho; Preparar Contra-Ataque (escolhe um Efeito; pelo resto do combate, anula esse Efeito quando usado contra você e aplica outro não crítico ao oponente); ou Escapar (sai de Emaranhar, Agarrão ou Segurar sem gastar PA) |
| Forçar Falha | Oponente com Falha Crítica | Combinado com outro Efeito que pede rolagem oposta, o oponente falha automaticamente nela |
| Maximizar Dano | Atacante com Crítico | Um dos dados de dano da arma conta como valor máximo |
| Selecionar Alvo | Atacante com Falha Crítica | O defensor redireciona o ataque para outro alvo ao alcance |

## 8.6 Situações especiais {#situacoes-especiais}

- **Pegar Leve:** declarado antes do ataque; se acertar, causa metade do dano antes da armadura.
- **Ataque de Varredura:** armas ou criaturas enormes atingem vários alvos próximos com uma rolagem; cada defensor resolve sua defesa e os Efeitos são simultâneos.
- **Agarrão:** Desarmado oposto ao Estilo do alvo. Membro agarrado fica inútil; cabeça, peito ou abdômen deixam todos os testes do alvo um grau mais difíceis. Nos turnos seguintes, Desarmado causa dano igual ao Modificador de Dano no local preso (o alvo pode opor Desarmado ou Musculatura com 1 PA). Dura até o alvo ser incapacitado, Libertar-se ou usar Recuar.
- **Mirar:** uma Rodada inteira mirando reduz em um grau a dificuldade de distância ou um modificador situacional. Rodadas extras não somam.
- **Atirando na Multidão:** alvo na borda de uma multidão ou em corpo a corpo, um grau mais difícil; através do grupo, dois graus. Se falhar só por causa dessa penalidade, acerta um transeunte aleatório (que pode se defender). Efeitos valem só contra o alvo pretendido.
- **Ataque com Salto:** Atletismo oposto a Musculatura ou Evasão do alvo; um grau mais fácil para quadrúpedes ou para quem tem o dobro do TAM do alvo. Se vencer, o alvo cai com o atacante por cima, sem dano, e só se levanta quando o atacante sair ou com um Efeito como Levantar-se. Só contra alvos de até 2× o TAM. *Preparar para Impacto* ajuda a resistir.
- **Cobertura:** protege os locais que encobre. Um ataque que acerta um local coberto precisa vencer os PA e PV da cobertura antes de atingir o personagem. Escolher Local contorna cobertura parcial. Agachar atrás de cobertura pequena ou de escudo dobra os locais protegidos. Contra cobertura total, o ataque através dela fica um grau mais difícil e não permite Escolher Local.
- **Knockback:** se o dano antes da armadura (e de Resistência) passar do TAM do alvo, ele é arremessado 1 m para trás a cada 5 pontos acima do TAM. Se bater em algo ou alguém, ele (e quem foi atingido) faz Acrobacias Fácil ou Atletismo Padrão para não cair; à beira de um Perigo ou precipício, o Mestre pode permitir Atletismo como Ação Livre para se segurar. Só afeta alvos de até 2× o TAM do atacante. *Preparar para Impacto* e *Firmar-se* reduzem ou evitam.
- **Distância (opcional, a critério do Mestre):** combina distância e TAM do alvo.

| Distância | TAM até 10 | 11–20 | 21–40 | 41–80 | 81–150 | 151+ |
| --- | --- | --- | --- | --- | --- | --- |
| 1–20 m | 1 grau mais difícil | — | 1 mais fácil | 1 mais fácil | 2 mais fáceis | 2 mais fáceis |
| 21–40 m | 1 mais difícil | 1 mais difícil | — | 1 mais fácil | 1 mais fácil | 2 mais fáceis |
| 41–60 m | 2 mais difíceis | 1 mais difícil | 1 mais difícil | — | 1 mais fácil | 1 mais fácil |
| 61–80 m | 2 mais difíceis | 2 mais difíceis | 1 mais difícil | 1 mais difícil | — | 1 mais fácil |
| 81–100 m | 3 mais difíceis | 2 mais difíceis | 2 mais difíceis | 1 mais difícil | 1 mais difícil | — |
| 101–120 m | 3 mais difíceis | 3 mais difíceis | 2 mais difíceis | 2 mais difíceis | 1 mais difícil | 1 mais difícil |

"—" = sem modificador. A cada 20 m além disso, a progressão continua.

## 8.7 Ferimentos {#ferimentos}

| Ferimento | Quando acontece | Efeito |
| --- | --- | --- |
| Leve | PV do local acima de 0 | Dói e sangra, sem penalidade |
| Sério | PV do local em 0 ou menos | O local não pode atacar por 1d3 turnos (ainda pode defender). Teste de **Tolerância oposto à rolagem de ataque**: falha deixa o membro inútil, ou causa inconsciência se for cabeça, peito ou abdômen, até um Primeiros Socorros bem-sucedido. Tarefas com aquele local ficam um grau mais difíceis até o ferimento voltar a Leve |
| Grave | PV do local negativos em valor igual ou maior que o PV inicial | Incapacitado na hora. Teste de **Tolerância oposto à rolagem de ataque**: falha decepa ou destrói o membro, ou mata se for peito ou abdômen. **Grave na cabeça mata sem teste**, salvo uso de Ponto de Sorte. Sem tratamento iniciado em 2× Taxa de Cura minutos, o personagem morre de perda de sangue e choque |

Os testes de Tolerância por ferimento são sempre **opostos à rolagem de ataque** (ou à Potência do Perigo, 8.11), sem dificuldade crescente a cada novo ferimento (v0.4). Modificadores de Origem: Pontos Fracos do Meta deixam esses testes um grau mais difíceis; o Gemini tem −2 PV na cabeça.

### Tratamento

Cada perícia só pode ser aplicada **uma vez por ferimento**.

| Situação | Primeiros Socorros | Medicina |
| --- | --- | --- |
| Ferimento Leve | Cura 1d3 PV | Cura 1d6 PV |
| Ferimento Sério | Recupera o membro inutilizado ou a consciência; tira a penalidade do local por 1d3 minutos | Cura 1d3 PV, além do efeito de Primeiros Socorros |
| Ferimento Grave | Estabiliza: evita a morte por perda de sangue e choque | Teste Fácil estabiliza; um sucesso inicia a recuperação (abaixo) |
| Asfixia, sangramento, objeto cravado | Volta a respirar, estanca, retira o objeto sem novo dano | Idem |
| Crítico | Cura o máximo (3), ou aplica o resultado a um Ferimento Sério | Leve volta ao máximo; Sério cura 1d6+1 |
| Falha Crítica | Causa 1 PV de dano ao local | Causa 1d3 PV de dano ao local |

> [!nota] O Livro v4 traduziu a cura de Medicina como "1d3 em Ferimento Grave". No Destined, o 1d3 é para Ferimento **Sério**; o texto foi corrigido.

### Recuperação natural

- **Leve:** o local recupera a Taxa de Cura a cada 12 horas de repouso.
- **Sério:** a Taxa de Cura a cada 24 horas de repouso; quando os PV do local voltam a ser positivos, passa a curar como Leve.
- **Grave:** não se cura sozinho. Exige um teste de Medicina bem-sucedido e tratamento profissional constante (hospital ou médico equipado); recupera a Taxa de Cura por semana.
- Cada local cura separadamente. Atividade além da leve durante o repouso reduz a Taxa de Cura daquele período em 1d3. Acompanhamento de alguém com Medicina dobra a Taxa de Cura. Poderes de cura e regeneração aceleram o processo e estabilizam quem está morrendo.
- Agentes contam com o Setor Médico, que corta pela metade o tempo de recuperação de Sérios e Graves (cap. 9.5).

## 8.8 Concentração e Fadiga {#concentracao-e-fadiga}

Concentração segue o cap. 1.6.

**Fadiga** mede o desgaste físico ou mental. O grau de dificuldade da tabela vale como base para toda Ação; as penalidades numéricas não se somam (vale a da linha atual).

| Nível | Grau das perícias | Movimento | Iniciativa | PA | Recuperação |
| --- | --- | --- | --- | --- | --- |
| Descansado | — | — | — | — | — |
| Ofegante | Difícil | — | — | — | 15 minutos |
| Cansado | Difícil | −1 m | — | — | 3 horas |
| Fatigado | Formidável | −2 m | −2 | — | 6 horas |
| Exausto | Formidável | Metade | −4 | −1 | 12 horas |
| Debilitado | Hercúleo | Metade | −6 | −2 | 18 horas |
| Incapacitado | Hercúleo | Imóvel | −8 | −3 | 24 horas |
| Semiconsciente | Sem chance | Sem ações | — | — | 36 horas |
| Inconsciente | Sem ações | — | — | — | 48 horas |
| Morrendo | Morre em 2× Taxa de Cura minutos sem tratamento | | | | |

- **Recuperar:** o tempo de repouso de cada nível é a Recuperação dividida pela Taxa de Cura; recupera-se do nível mais alto para o mais baixo.
- **Esforço:** atividade leve exige Tolerância (ou Atletismo, ou Musculatura) Muito Fácil a cada CON horas; moderada, Fácil a cada CON minutos; extenuante, Padrão a cada CON segundos. Cada falha soma um nível.
- **Sono:** sem dormir, o personagem aguenta 2× CON horas; depois, Tolerância a cada CON/2 horas, cada teste um grau mais difícil que o anterior.
- **Asfixia:** prende a respiração por segundos iguais à Tolerância (metade, se pego de surpresa). Depois, Tolerância a cada Rodada: Crítico, nada; Sucesso, 1 nível; Falha, 1d2; Falha Crítica, 1d3. Fadiga de asfixia volta em geral a 1 nível por minuto de descanso.
- **Estresse mental:** Força de Vontade no lugar de Tolerância; a Fadiga mental soma com a física.

## 8.9 Pontos de Sorte {#pontos-de-sorte}

Cada uso custa 1 Ponto, e só um ponto pode ser gasto por Ação (os dois lados de um conflito podem gastar).

- **Torcer o Destino:** rerrolar qualquer dado que afete o personagem, inclusive forçar o oponente a rerrolar um ataque ou dano contra ele. O novo resultado vale, mesmo que pior.
- **Esforço Desesperado:** sem PA, ganha 1 PA defensivo extra na Rodada.
- **Mitigar Dano:** um personagem que ficaria incapacitado ou morto por Ferimento Grave reduz o efeito a Ferimento Sério, ficando com 1 PV a menos que o necessário para ser incapacitado. Ferimentos Sérios não podem ser reduzidos a Leves.
- **Reserva de Poder:** com PP zerado, recupera 1d4+1 PP.

Recuperação de Sorte no GFU: cap. 2.3. No Crossover de Conflito, ninguém usa Sorte (cap. 9).

## 8.10 Veículos {#veiculos}

Veículos têm **Tamanho**, **Casco** (Pontos de Armadura), **Estrutura** (Pontos de Vida), **Velocidade** (abstrata), **Sistemas** (motor, controles, sensores, compartimentos), **Características** (Tração 4×4, Anfíbio...) e às vezes **Escudos**.

- **Operação:** Condução (terrestres), Pilotar (aéreos), Canoagem (aquáticos). Manobras arriscadas pedem teste; falha pode causar Perda de Controle.
- **Dano:** subtraia o Casco; o resto vai para a Estrutura. Dano que passa do Casco tem chance (em %, igual ao dano que passou) de atingir um Sistema. Estrutura a 0 = Perda Total.
- **Perseguição:** rodadas de duração variável. Ações-chave são Rolagens Diferenciais da perícia de operação, que geram Pontos de Movimento e Efeitos adaptados (Forçar Erro, Ganhar Posição, Danificar Sistema). Colisões causam dano ao veículo e aos ocupantes conforme velocidade e tamanho.

As escalas usadas na mesa são as do módulo **Gemini · Veículos**:

- **Tamanho:** Pequeno, Médio, Grande, Imenso, Enorme, Colossal.
- **Velocidade:** Parado, Lento, Moderado, Rápido, Muito rápido, Veloz, Extremo.
- **Manuseio:** o grau de dificuldade base dos testes de controle do veículo.
- **Impactos por Sistema** antes de falhar: Pequeno 1, Médio 2, Grande 3, Imenso 4, Enorme 5 (Colossal: definido pelo Mestre). Um Sistema danificado perde eficiência na proporção dos impactos.
- **Escudos:** absorvem o dano antes do Casco e se desgastam com o que absorvem.

**Forçar velocidade:** um teste da perícia de operação no grau de Manuseio sobe 1 passo por 1d6 minutos (1d12 com Crítico); um teste Hercúleo sobe 2 passos por 1d3 minutos. Manter além disso causa 1d3 impactos no motor.

**Frear:** reduzir 1 passo por rodada não tem risco. Reduzir 2 passos de uma vez pede teste (falha: 1 impacto no motor). Reduzir 3 ou mais pede teste Hercúleo (sucesso: 1 impacto; falha: 1d2+1). Falha Crítica ao frear: 1d2+1 impactos e Perda de Controle.

**Manobra Evasiva:** Reação, 1 PA, com a perícia de operação; Falha Crítica causa Perda de Controle.

**Abalroar:** perícia de operação oposta à do outro piloto (ou à Evasão de uma pessoa). O dano é 1d6 por nível de Tamanho (Pequeno 1 a Enorme 5) +1d6 por passo de velocidade acima do alvo; quem abalroa sofre o mesmo dano (metade com aríete). O Casco reduz normalmente. Todos os veículos envolvidos testam a perícia de operação ou rolam Perda de Controle: Difícil em batida traseira ou lateral, Hercúleo em batida frontal.

**Perda de Controle (1d100):**

| 1d100 | Resultado |
| --- | --- |
| 01–25 | **Desvio:** −1 passo de velocidade por 5 segundos |
| 26–40 | **Derrapagem:** −2 passos por 10 segundos |
| 41–50 | **Rodopio ou pane:** para virado ao contrário por 15 segundos; aeronaves perdem o motor por 10 segundos |
| 51–60 | **Capotamento leve:** 3d10 na Estrutura; ocupantes fazem Tolerância ou sofrem 1d10 em 1d3 locais |
| 61–70 | **Capotamento grave:** 3d10+10 na Estrutura; ocupantes sofrem 1d10 em 1d3 locais (2d10 se falharem em Tolerância) |
| 71–80 | **Perda Total:** Estrutura a 0; ocupantes como no capotamento grave |
| 81–90 | **Incêndio:** como Perda Total; explode em 1d20+10 segundos; quem estiver a até 5 m sofre 1d6 de queimadura em 1d6 locais |
| 91–98 | **Explosão imediata:** como acima, sem tempo para sair |
| 99–00 | **Acidente catastrófico:** como Perda Total; ocupantes fazem Tolerância ou ficam com PV negativos iguais ao inicial em 1d6 locais |

> [!aviso] O Destined usa 9 passos de velocidade e outra regra de escudos (bloqueiam o dano até o seu valor). O GFU segue o Livro v4 e o módulo de veículos; a diferença está registrada no Apêndice.

## 8.11 Perigos {#perigos}

Perigos são ameaças do ambiente: fogo, ácido, veneno, doença, radiação, objetos caindo, armadilhas. O Mestre define a **Intensidade**:

| Intensidade | Dano imediato | Dano contínuo | Condições | Potência | Exemplos |
| --- | --- | --- | --- | --- | --- |
| 1 | 1d6 | 1d2 | 1 | 40–50% | Objeto até TAM 10, ácido fraco, chama pequena |
| 2 | 2d6 | 1d4 | 2 | 51–60% | Objeto TAM 11–20, ácido comum, maçarico |
| 3 | 3d6 | 1d6 | 3 | 61–70% | Objeto TAM 21–30, ácido forte, fogueira, radiação forte |
| 4 | 4d6 | 2d6 | 4 | 71–80% | Objeto TAM 31–40, solvente industrial, prédio em chamas |
| 5 | 5d6 | 3d6 | 5 | 81–90% | Objeto TAM 41–50, banho químico, lava, núcleo de reator |
| +1 | +1d6 | +1d6 | +1 | +10% | Cada +10 TAM; ameaças extremas |

- **Potência** funciona como a perícia do Perigo: é oposta por Musculatura, Tolerância, Evasão ou Força de Vontade. Vencer evita o Perigo ou reduz o efeito; Falha Crítica sofre o dano máximo ou falha automaticamente no próximo teste. A Potência também substitui a rolagem de ataque nos testes de Tolerância por ferimento.
- **Dano imediato** acontece uma vez; **contínuo** se repete a cada Rodada (ou intervalo definido) até o personagem sair ou neutralizar o Perigo. Alguns Perigos têm os dois.
- **Armadura** protege contra Perigos parecidos com armas (corte, fogo, impacto). Gás, radiação e doenças pedem proteção específica.
- **Locais:** Perigos parecidos com um golpe atingem um local aleatório; explosões, imersão e chamas podem atingir vários locais ou o corpo todo, a critério do Mestre.
- **Início retardado:** venenos e doenças podem levar de Rodadas a dias para agir, e repetem o efeito no mesmo intervalo, com novo teste.
- **Objetos grandes** arremessados usam a perícia de quem arremessa no lugar da Potência. Quem fica preso embaixo gasta 1 PA e vence a Potência com Atletismo (escapar) ou Musculatura (erguer).
- **Condições** (escolhidas pelo Mestre, até o número da Intensidade, em geral uma por teste falho): Agonia, Alucinações, Cegueira, Confusão, Contágio, Drenagem (de PP), Exaustão (Fadiga), Febre, Inconsciência, Instabilidade, Mania, Morte, Náusea, Paralisia, Surdez.

## 8.12 Quedas {#quedas}

| Altura | Dano | Locais atingidos |
| --- | --- | --- |
| Até 1 m | 1d6 | 1 |
| 2–5 m | 2d6 | 2 |
| 6–10 m | 3d6 | 3 |
| 11–15 m | 4d6 | 4 |
| 16–20 m | 5d6 | 5 |
| Cada +5 m | +1d6 | — |

- O dano é rolado **separadamente para cada local** atingido. Armadura vestida não protege; Campo de Força e Armadura Inerente protegem.
- **Acrobacias:** sucesso reduz a altura efetiva em 2 m (4 m com Crítico) e o personagem não fica caído, salvo Ferimento Sério; Falha Crítica sofre o dano máximo.
- **Voo:** um teste de Atletismo reduz a altura pelo Movimento de voo; se chegar a 0, a queda para.
- **Superfície macia** (neve, palha) reduz a altura pela metade; cair na água com um teste de Atletismo conta como superfície macia. Superfícies perigosas somam o próprio dano.
- **Tamanho:** TAM 1 ou menos −10 m; 2–3 −8 m; 4–5 −5 m; 6–7 −3 m; 8–9 −1 m; acima de TAM 20, +1d6 a cada 10 pontos.
- **Objetos caindo** são Perigos pelo TAM (8.11) e somam o dano de queda da altura.
