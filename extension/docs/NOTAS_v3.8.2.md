# CAPES-Lattes 3.8.2

Correção crítica da v3.8.1.

A v3.8.1 chamava `yearOfArticleCitation()` ao analisar os artigos, mas a função
foi removida acidentalmente durante a varredura do pacote. Isso provocava
`ReferenceError` no Chrome e fazia aparecer o botão vermelho **Erros** na tela
de extensões.

A função foi restaurada e continua ignorando o texto externo
`Qualis/CAPES (2021–2024)` ao determinar o ano real da publicação.
