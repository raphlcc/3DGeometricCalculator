import { StatesEnum } from "./states.enum";
import { Token } from "./token.interface";

/**
 * Abstract base class for deterministic finite automata used to recognize
 * the first subword of a given input that belongs to a specific language.
 *
 * Each automaton processes the input sequentially, applying transitions
 * character by character until a transition leads to the FINISH state.
 * The recognized token corresponds to the longest prefix accepted before
 * reaching the FINISH state.
 *
 * Subclasses must implement the transition function by defining how the
 * automaton state evolves for each consumed character.
 */
export abstract class Automaton {
  protected state: StatesEnum = StatesEnum.START;
  private tokenName: string;

  constructor(tokenName: string) {
    this.tokenName = tokenName;
  }

  /**
   * Recognizes the first subword of the input that belongs to the automaton
   * language and returns the corresponding token information.
   *
   * The method processes the input sequentially, applying transitions until
   * the automaton reaches the FINISH state. The recognized substring is the
   * longest valid prefix consumed before finishing.
   *
   * @param word Input string to be analyzed by the automaton
   * @return Token containing the token name, recognized substring, and its size
   */
  recognize(word: string): Token {
    let size = 0;

    for (const char of word) {
      this.applyTransitions(char);
      if (this.state === StatesEnum.FINISH) {
        break;
      }

      size++;
    }

    this.state = StatesEnum.START;

    const substring = word.slice(0, size);
    return { name: this.tokenName, substring, size };
  }
  /**
   * Applies the transition function of the automaton for the given character,
   * updating the internal state accordingly.
   *
   * This method must be implemented by subclasses to define the transition
   * rules of the specific language being recognized.
   *
   * @param char Current character being consumed by the automaton
   * @return void
   */
  protected abstract applyTransitions(char: string): void;
}
