import { StatesEnum } from "./states.enum";
import { DIGITS } from "./constants";
import { Automata } from "./automata";

export default class NumberAutomata extends Automata {

    constructor() {
        super('NUMBER');
    }

    protected applyTransitions(char: string): void {
        if (DIGITS.includes(char) || char === '.') {
            return;
        }
        this.state = StatesEnum.FINISH;
    }

}