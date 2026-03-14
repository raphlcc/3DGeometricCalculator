class NumberAutomata {
    private state: string = 'START';

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
        if (DIGITS.includes(char) || char === '.') {
            return;
        }
    
        this.state = 'FINISH';
    }

}