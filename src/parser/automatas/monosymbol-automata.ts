class MonoSymbolAutomata {
    private state: string = 'START';
    private symbol: string;

    constructor(symbol: string) {
        this.symbol = symbol;
    }

    recognize(word: string) {
        let subWordSize = 0;

        for (const char of word) {
            this.applyTransitions(char);

            if (this.state === 'FINISH') {
                return subWordSize;
            }

            subWordSize++;
        }
    }

    private applyTransitions(char: string) {
        if (this.state === 'SYMBOL' || char !== this.symbol) {
            this.state = 'FINISH';
            return;
        }

        this.state = 'SYMBOL';
    }

}