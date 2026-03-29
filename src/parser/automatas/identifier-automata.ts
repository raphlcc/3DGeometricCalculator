import { StatesEnum } from "./states.enum";
import { DIGITS, ALPHABET } from "./constants";
import { Automata } from "./automata";

/**
 * Deterministic finite automaton responsible for recognizing identifier
 * subwords within a larger input word.
 *
 * The language recognized by this automaton consists of identifiers that
 * start with an alphabetic character followed by zero or more alphanumeric
 * characters. The automaton consumes characters sequentially and stops when
 * a character that does not belong to the identifier language is found,
 * transitioning to the FINISH state.
 *
 * Examples of recognized subwords:
 * - "abc" in "abc123"
 * - "var1" in "var1="
 * - "x9" in "x9+10"
 *
 * Accepted format:
 * - identifiers starting with a letter followed by letters or digits
 */
export default class IdentifierAutomata extends Automata {
  constructor() {
    super("IDENTIFIER");
  }

  /**
   * Applies the automaton transition function based on the current character,
   * updating the internal state according to the identifier language rules.
   *
   * Transition rules:
   * - START → IDENTIFIER when reading an alphabetic character
   * - IDENTIFIER → remain in IDENTIFIER when reading alphanumeric characters
   * - Any other input → FINISH
   *
   * @param char Current character being consumed by the automaton
   * @return void
   */
  protected applyTransitions(char: string): void {
    if (this.state === StatesEnum.START && ALPHABET.includes(char)) {
      this.state = StatesEnum.IDENTIFIER;
    }

    if (
      this.state === StatesEnum.IDENTIFIER &&
      (DIGITS.includes(char) || ALPHABET.includes(char))
    ) {
      return;
    }

    this.state = StatesEnum.FINISH;
  }
}
