const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS = '0123456789';

class IdentifierAutomata {
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
        if (this.state === 'START' && ALPHABET.includes(char)) {
            this.state = 'IDENTIFIER';
        }

        if (this.state === 'IDENTIFIER' && (DIGITS.includes(char) || ALPHABET.includes(char))) {
            return;
        }

        this.state = 'FINISH';
    }

}