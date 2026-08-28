import { Automaton } from "./automaton";
import { StatesEnum } from "./states.enum";

/**
 * Deterministic finite automaton responsible for recognizing a single-symbol
 * subword within a larger input word.
 *
 * This automaton accepts exactly one occurrence of a predefined symbol.
 * After recognizing the symbol, any subsequent character causes the automaton
 * to transition to the FINISH state, ensuring only a single-character token
 * is matched.
 *
 * Examples:
 * - "+" in "+123"
 * - "=" in "=="
 * - ";" in ";abc"
 *
 * The automaton accepts:
 * - exactly one configured symbol
 *
 * The automaton stops when:
 * - a different character is read
 * - the symbol has already been consumed
 */
export default class MonoSymbolAutomata extends Automaton {
  private symbol: string;

  constructor(symbol: string, tokenName: string) {
    super(tokenName);
    this.symbol = symbol;
  }

  /**
   * Applies the automaton transition function based on the current character,
   * updating the internal state to recognize a single predefined symbol.
   *
   * Transition rules:
   * - START → SYMBOL when reading the configured symbol
   * - SYMBOL → FINISH on any subsequent character
   * - START → FINISH when reading a different character
   *
   * @param char Current character being consumed by the automaton
   * @return void
   */
  protected applyTransitions(char: string): void {
    if (
      this.state !== StatesEnum.GARBAGE 
      && this.state !== StatesEnum.FINISH 
      && char === this.symbol
    ) {
      this.state = StatesEnum.FINISH;
      return;
    }

    this.state = StatesEnum.GARBAGE;
  }
}
