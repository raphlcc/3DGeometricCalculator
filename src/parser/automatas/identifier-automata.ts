import { StatesEnum } from "./states.enum";
import { DIGITS, ALPHABET } from "./constants";
import { Automata } from "./automata";

export default class IdentifierAutomata extends Automata {

    constructor() {
        super('IDENTIFIER');
    }

    protected applyTransitions(char: string): void {
        if (this.state === StatesEnum.START && ALPHABET.includes(char)) {
            this.state = StatesEnum.IDENTIFIER;
        }

        if (this.state === StatesEnum.IDENTIFIER && (DIGITS.includes(char) || ALPHABET.includes(char))) {
            return;
        }

        this.state = StatesEnum.FINISH;
    }

}