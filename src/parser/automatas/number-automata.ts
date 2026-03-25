import { StatesEnum } from "./states.enum";
import { DIGITS } from "./constants";
import { Automata } from "./automata";

export default class NumberAutomata extends Automata {

    constructor() {
        super('NUMBER');
    }

    protected applyTransitions(char: string): void {
        if (this.state === StatesEnum.START && DIGITS.includes(char)) {
            this.state = StatesEnum.INTEGER;
            return;
        }

        if (this.state === StatesEnum.INTEGER && char === '.') {
            this.state = StatesEnum.FLOAT;
            return;
        }

        if ((this.state === StatesEnum.FLOAT || this.state === StatesEnum.INTEGER) && DIGITS.includes(char)) {
            return;
        }

        this.state = StatesEnum.FINISH;
    }

}