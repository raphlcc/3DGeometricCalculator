import { StatesEnum } from "./states.enum";
import { DIGITS } from "./constants";

class NumberAutomata {
    private state: StatesEnum = StatesEnum.START;

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
        if (DIGITS.includes(char) || char === '.') {
            return;
        }

        this.state = StatesEnum.FINISH;
    }

}