# CAPES-Lattes 3.8.3

Correções:
1. "Ocultar selos NC" não esconde mais o selo Qualis 2021–2024.
   Se a classificação atual for NC e o Qualis for A2, o A2 continua visível.
2. ISSN pode ser lido da anotação Qualis/CAPES do mesmo artigo quando o `cvuri`
   do Lattes não trouxer ISSN.
3. Environmental Science and Pollution Research:
   ISSN 0944-1344 -> A2.
4. Se o ISSN não for localizado, a extensão usa somente correspondência exata
   de título/alias já incorporada; não usa similaridade difusa.
5. Rótulos internos antigos de owner/detail foram substituídos pela versão atual.
