import { StatesEnum } from "./states.enum";
import { DIGITS, ALPHABET } from "./constants";

class IdentifierAutomata {
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
        if (this.state === StatesEnum.START && ALPHABET.includes(char)) {
            this.state = StatesEnum.IDENTIFIER;
        }

        if (this.state === StatesEnum.IDENTIFIER && (DIGITS.includes(char) || ALPHABET.includes(char))) {
            return;
        }

        this.state = StatesEnum.FINISH;
    }

}