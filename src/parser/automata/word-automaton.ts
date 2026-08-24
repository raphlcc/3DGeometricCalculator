import { Automaton } from "./automaton";
import { StatesEnum } from "./states.enum";

export default class WordAutomaton extends Automaton {
  private word: string;
  private position: number;

  constructor(word: string, tokenName: string) {
    super(tokenName);
    this.word = word;
    this.position = 0;
  }

  protected applyTransitions(char: string): void {
    if (this.state === StatesEnum.START) {
        this.position = 0;
    }

    if (this.state === StatesEnum.GARBAGE) {
        return;
    }

    if (this.state !== StatesEnum.FINISH && char === this.word[this.position]) {
      this.position++;

      this.state = this.position >= this.word.length? StatesEnum.FINISH : StatesEnum.INTERMEDIATE;
      return;
    }

    this.state = StatesEnum.GARBAGE;
  }
}
