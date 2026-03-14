import { StatesEnum } from "./states.enum";

class MonoSymbolAutomata {
    private state: StatesEnum = StatesEnum.START;
    private symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }

    recognize(word: string) {
        let subWordSize = 0;

        for (const char of word) {
            this.applyTransitions(char);

            if (this.state === StatesEnum.FINISH) {
                return subWordSize;
            }

            subWordSize++;
        }
    }

    private applyTransitions(char: string) {
        if (this.state === StatesEnum.SYMBOL || char !== this.symbol) {
            this.state = StatesEnum.FINISH;
            return;
        }

        this.state = StatesEnum.SYMBOL;
    }

}