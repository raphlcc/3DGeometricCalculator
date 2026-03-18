import { Token } from "./automatas/token.interface";
import { Automata } from "./automatas/automata";
import IdentifierAutomata from "./automatas/identifier-automata";
import MonoSymbolAutomata from "./automatas/monosymbol-automata";
import NumberAutomata from "./automatas/number-automata";

export default class Lexer {

    automatas: Automata[] = [];

    constructor() {
        this.automatas.push(
            new IdentifierAutomata(),
            new NumberAutomata(),
            new MonoSymbolAutomata('+', 'PLUS'),
            new MonoSymbolAutomata('-', 'MINUS'),
            new MonoSymbolAutomata('*', 'TIMES'),
            new MonoSymbolAutomata('(', 'L_PAREN'),
            new MonoSymbolAutomata(')', 'R_PAREN'),
            new MonoSymbolAutomata('=', 'EQUAL'),
            new MonoSymbolAutomata(',', 'COMMA'),
            new MonoSymbolAutomata(' ', 'SPACE'),
        );
    }

    lexemize(word: string) {
        const tokens: Token[] = [];

        let wordToProcess = word;

        while (wordToProcess !== '') {
            let generatedSomeToken = false;

            for (const automata of this.automatas) {
                const token = automata.recognize(wordToProcess);

                if (token.size === 0) {
                    continue;
                }
                generatedSomeToken = true;

                if (token.name === "SPACE") {
                    continue;
                }

                tokens.push(token);
                wordToProcess = wordToProcess.slice(token.size, word.length);
            }

            if (!generatedSomeToken) {
                throw new SyntaxError(
                `Unrecognized token "${wordToProcess.slice(0, 10)}"`
                );
            }
        }
        
    }

}