# CAPES-Lattes — Área 27

[![Latest Release](https://img.shields.io/github/v/release/nepeconunb/capes-lattes-area27?label=vers%C3%A3o&color=blue)](https://github.com/nepeconunb/capes-lattes-area27/releases/latest)

**[⬇️ Baixar a versão mais recente](https://github.com/nepeconunb/capes-lattes-area27/releases/latest)**

Extensão para Google Chrome voltada à análise da produção científica em currículos da Plataforma Lattes, com foco na **Área 27 da CAPES — Administração Pública e de Empresas, Ciências Contábeis e Turismo**.

## Funcionalidades

- leitura automática dos artigos completos publicados em periódicos no Currículo Lattes;
- classificação atual da Área 27 em **MB / B / R / F / NC**;
- aplicação da classificação atual somente para publicações de **2022 em diante**;
- exibição do **Qualis Referência 2021–2024** para todo o período;
- pontuação e gráficos por ano;
- filtro por período;
- listagem dos artigos e respectivas classificações;
- reconhecimento por ISSN e título normalizado;
- painel de gráficos diretamente no Currículo Lattes.

## Versão atual

**v3.9.1**

A versão 3.9.1 inclui, entre outros ajustes:

- classificação atual MB/B/R/F/NC aplicada somente a publicações de 2022 em diante;
- gráfico de pontuação atual restrito ao período a partir de 2022;
- manutenção do Qualis Referência 2021–2024 para todo o histórico de publicações;
- melhorias no reconhecimento de periódicos por ISSN e título;
- correções de exibição, duplicidade e vinculação das classificações aos artigos.

## Instalação

1. Acesse a [última versão disponível](https://github.com/nepeconunb/capes-lattes-area27/releases/latest).
2. Em **Assets**, baixe o arquivo `CAPES-Lattes-v3.9.1.zip`.
3. Descompacte o arquivo ZIP.
4. No Google Chrome, acesse `chrome://extensions`.
5. Ative o **Modo do desenvolvedor**.
6. Clique em **Carregar sem compactação**.
7. Selecione a pasta descompactada da extensão.
8. Abra um Currículo Lattes.

## Fonte das classificações

O Qualis de referência utilizado é o **Quadriênio 2021–2024**, com base em dados públicos disponibilizados pela CAPES por meio da Plataforma Sucupira.

O **Qualis Referência 2021–2024** é utilizado como referência histórica para as publicações apresentadas no Currículo Lattes, inclusive para artigos publicados antes ou depois do quadriênio.

A classificação atual **MB/B/R/F/NC** é tratada separadamente e aplicada somente às publicações de **2022 em diante**, conforme a regra implementada para a Área 27.

## Interpretação das informações

A extensão apresenta dois tipos distintos de informação:

- **Classificação atual**: MB, B, R, F ou NC, utilizada para publicações a partir de 2022;
- **Qualis Referência 2021–2024**: classificação do periódico no Quadriênio 2021–2024, apresentada como referência para o conjunto das publicações.

Essas informações são exibidas separadamente para evitar confusão entre o sistema atual de avaliação e o Qualis utilizado como referência histórica.

## Pontuação

Para a classificação atual, a extensão utiliza a seguinte escala:

- **MB = 8 pontos**
- **B = 4 pontos**
- **R = 2 pontos**
- **F = 1 ponto**
- **NC = 0 ponto**

A pontuação da classificação atual é calculada somente para publicações de **2022 em diante**.

A pontuação vinculada ao Qualis Referência 2021–2024 é apresentada separadamente, quando aplicável.

## Reconhecimento dos periódicos

A extensão procura identificar os periódicos por diferentes elementos disponíveis no Currículo Lattes, especialmente:

- ISSN;
- título do periódico;
- normalização do nome do periódico;
- correspondências previamente validadas.

O uso do ISSN é priorizado sempre que essa informação estiver disponível.

## Limitações

A identificação automática depende da qualidade e da completude das informações disponíveis no Currículo Lattes e nas bases públicas utilizadas como referência.

Podem ocorrer situações em que:

- o ISSN não esteja disponível no Currículo Lattes;
- o título do periódico esteja registrado de forma diferente;
- um periódico tenha mais de um ISSN;
- a publicação não possua classificação disponível na base utilizada;
- haja divergência entre diferentes fontes públicas.

Nessas situações, recomenda-se conferir diretamente a informação nas fontes oficiais.

## Aviso importante

Esta é uma ferramenta acadêmica independente.

**Não é um produto oficial da CAPES, do CNPq ou da Plataforma Lattes.**

As classificações exibidas pela extensão devem ser conferidas nas fontes oficiais quando forem utilizadas para fins institucionais, avaliativos, administrativos ou decisórios.

## Privacidade

A extensão opera sobre o conteúdo visível do Currículo Lattes aberto no navegador e não foi projetada para coletar, vender ou compartilhar dados pessoais dos usuários.

Veja a política de privacidade em [PRIVACY.md](PRIVACY.md).

## Relato de problemas

Caso encontre um periódico não reconhecido ou uma classificação divergente, utilize a aba **Issues** deste repositório.

Ao relatar o problema, informe, sempre que possível:

- nome do periódico;
- ISSN;
- ano da publicação;
- classificação esperada;
- classificação exibida pela extensão;
- captura de tela do Currículo Lattes.

## Contribuições

Contribuições, sugestões e correções são bem-vindas.

Veja as orientações em [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Este projeto é distribuído sob a **MIT License**.

## Desenvolvimento

Projeto vinculado ao **NEPECON — Universidade de Brasília (UnB)**.

Repositório:

https://github.com/nepeconunb/capes-lattes-area27
