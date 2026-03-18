import { Automata } from "./automata";
import { StatesEnum } from "./states.enum";
import { Token } from "./token.interface";

export default class MonoSymbolAutomata extends Automata {
    private symbol: string;

    constructor(symbol: string, tokenName: string) {
        super(tokenName);
        this.symbol = symbol;
    }

    protected applyTransitions(char: string): void {
        if (this.state === StatesEnum.SYMBOL || char !== this.symbol) {
            this.state = StatesEnum.FINISH;
            return;
        }

        this.state = StatesEnum.SYMBOL;
    }

}