import { StatesEnum } from "./states.enum";
import { DIGITS, ALPHABET } from "./constants";
import { Automaton } from "./automaton";

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
export default class IdentifierAutomaton extends Automaton {
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
    if (this.state === StatesEnum.GARBAGE) {
      return;
    }

    if (this.state === StatesEnum.START) {
      this.state = (ALPHABET.includes(char))? StatesEnum.FINISH : StatesEnum.GARBAGE;
      return;
    }

    if (ALPHABET.includes(char) || DIGITS.includes(char)) {
      this.state = StatesEnum.FINISH;
      return;
    }

    this.state = StatesEnum.GARBAGE;
  }
}
