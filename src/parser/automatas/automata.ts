import { StatesEnum } from "./states.enum";
import { Token } from "./token.interface";

export abstract class Automata {
    protected state: StatesEnum = StatesEnum.START;
    private tokenName: string;

    constructor(tokenName: string) {
        this.tokenName = tokenName;
    }

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

    protected abstract applyTransitions(char: string): void;

}