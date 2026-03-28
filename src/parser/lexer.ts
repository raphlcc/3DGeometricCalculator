import { Token } from "./automatas/token.interface";
import { Automata } from "./automatas/automata";
import IdentifierAutomata from "./automatas/identifier-automata";
import MonoSymbolAutomata from "./automatas/monosymbol-automata";
import NumberAutomata from "./automatas/number-automata";

export default class Lexer {

    private automatas: Automata[] = [
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
    ];

    lexemize(word: string) {
        const tokens: Token[] = [];

        let wordToProcess = word;

        while (wordToProcess !== '') {
            const token = this.firstRecognizedToken(wordToProcess);
            
            if (token.name === "UNRECOGNIZED") {
                throw new Error(`Unrecognized token at: ${wordToProcess}`);
            }

            wordToProcess = wordToProcess.slice(token.size, word.length);

            if (token.name === "SPACE") {
                continue;
            }
            tokens.push(token);
        }

        return tokens;
    }
    
    firstRecognizedToken(word: string) {
        for (const automata of this.automatas) {
            const token = automata.recognize(word);

            if (token.size > 0) {
                return token;
            }                
        }

        return { name: "UNRECOGNIZED", substring: "", size: 0 };
    }   

}