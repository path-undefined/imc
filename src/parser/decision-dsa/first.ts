import { TokenDefinition } from "../../lexer/token-definitions";
import { AstNodeRuleDefinition } from "../rule-definitions";
import { buildGrammarRules, buildTerminalSymbolSet } from "./utilities";

export function buildFirst(
  tokenDefinitions: TokenDefinition[],
  ruleDefinitions: AstNodeRuleDefinition[],
): (symbols: string[]) => string[] {
  const terminalSymbols = buildTerminalSymbolSet(tokenDefinitions);
  const grammarRules = buildGrammarRules(ruleDefinitions);

  const firstTerminalSymbolsOf: Record<string, string[]> = {};

  for (const ruleDef of grammarRules) {
    let resultSymbolSet: Set<string> = new Set([ruleDef.type]);
    let derivedSymbolSet: Set<string> = new Set([ruleDef.type]);

    let hasNewResult = true;
    while (hasNewResult) {
      hasNewResult = false;
  
      const newSymbolSet: Set<string> = new Set();
      for (const symbol of resultSymbolSet) {
        if (terminalSymbols.has(symbol)) {
          newSymbolSet.add(symbol);
        } else {
          const ruleDef = grammarRules.find((r) => r.type === symbol);
          for (const seq of ruleDef.rule) {
            if (seq[0] !== symbol && !resultSymbolSet.has(seq[0]) && !derivedSymbolSet.has(seq[0])) {
              newSymbolSet.add(seq[0]);
              hasNewResult = true;
            }
          }
          derivedSymbolSet.add(ruleDef.type);
        }
      }
  
      resultSymbolSet = newSymbolSet;
    }
  
    firstTerminalSymbolsOf[ruleDef.type] = [...resultSymbolSet.values()];
  }
  
  return (symbols) => {
    if (symbols.length === 0) {
      return [];
    }

    const firstSymbol = symbols[0];
    
    return terminalSymbols.has(firstSymbol)
      ? [firstSymbol]
      : firstTerminalSymbolsOf[firstSymbol];
  };
}
