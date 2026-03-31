import { StatesEnum } from "./states.enum";
import { DIGITS } from "./constants";
import { Automaton } from "./automaton";

/**
 * Deterministic finite automaton responsible for recognizing the first
 * subword that belongs to the numeric language inside a larger input word.
 *
 * The language recognized by this automaton consists of integer and
 * floating-point numbers (using '.' as decimal separator). The automaton
 * consumes characters sequentially and stops when an invalid transition
 * is found, moving to the FINISH state.
 *
 * Examples of recognized subwords:
 * - "123" in "123abc"
 * - "45.67" in "45.67xyz"
 * - "9" in "9a8"
 *
 * Accepted formats:
 * - integers (e.g., 10)
 * - floating-point numbers (e.g., 10.5)
 */
export default class NumberAutomaton extends Automaton {
  constructor() {
    super("NUMBER");
  }

  /**
   * Applies the automaton transition function based on the current character,
   * updating the internal state according to the numeric language rules.
   *
   * Transition rules:
   * - START → INTEGER when reading a digit
   * - INTEGER → FLOAT when reading '.'
   * - INTEGER/FLOAT → remain in the same state when reading digits
   * - Any other input → FINISH
   *
   * @param char Current character being consumed by the automaton
   * @return void
   */
  protected applyTransitions(char: string): void {
    if (this.state === StatesEnum.START && DIGITS.includes(char)) {
      this.state = StatesEnum.INTEGER;
      return;
    }

    if (this.state === StatesEnum.INTEGER && char === ".") {
      this.state = StatesEnum.FLOAT;
      return;
    }

    if (
      (this.state === StatesEnum.FLOAT || this.state === StatesEnum.INTEGER) &&
      DIGITS.includes(char)
    ) {
      return;
    }

    this.state = StatesEnum.FINISH;
  }
}
