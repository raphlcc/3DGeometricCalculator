import { Token } from "./automata/token.interface";
import { Automaton } from "./automata/automaton";
import IdentifierAutomaton from "./automata/identifier-automaton";
import MonoSymbolAutomaton from "./automata/monosymbol-automaton";
import NumberAutomaton from "./automata/number-automaton";
import WordAutomaton from "./automata/word-automaton";

/**
 * Lexer class responsible for tokenizing input strings based on a set of
 * automata.
 *
 * The Lexer uses a collection of automata to recognize different types of
 * tokens in the input string. It processes the input string sequentially,
 * extracting tokens until the entire string is consumed.
 * If an unrecognized token is encountered, an error is thrown.
 *
 * The Lexer also ignores whitespace tokens during the tokenization process.
 *
 * Example usage:
 *
 * const lexer = new Lexer();
 * const tokens = lexer.lexemize("f(x) + 3");
 * console.log(tokens);
 * // Output: [
 * //   { name: "IDENTIFIER", substring: "f", size: 1 },
 * //   { name: "L_PAREN", substring: "(", size: 1 },
 * //   { name: "IDENTIFIER", substring: "x", size: 1 },
 * //   { name: "R_PAREN", substring: ")", size: 1 },
 * //   { name: "SPACE", substring: " ", size: 1 },
 * //   { name: "PLUS", substring: "+", size: 1 },
 * //   { name: "SPACE", substring: " ", size: 1 },
 * //   { name: "NUMBER", substring: "3", size: 1 }
 * // ]
 *
 * @throws Error if an unrecognized token is found in the input string.
 */
export default class Lexer {
  private automata: Automaton[] = [
    new IdentifierAutomaton(),
    new NumberAutomaton(),
    new MonoSymbolAutomaton("+", "PLUS"),
    new MonoSymbolAutomaton("-", "MINUS"),
    new MonoSymbolAutomaton("*", "TIMES"),
    new MonoSymbolAutomaton("(", "L_PAREN"),
    new MonoSymbolAutomaton(")", "R_PAREN"),
    new MonoSymbolAutomaton("=", "EQUAL"),
    new MonoSymbolAutomaton(",", "COMMA"),
    new MonoSymbolAutomaton(" ", "SPACE"),
    new WordAutomaton(">=", "GREATER_EQUAL"),
    new WordAutomaton("<=", "LESSER_EQUAL"),
    new WordAutomaton("!=", "DIFFERENT"),
   ];

  /***
   * Splits the input string into tokens, ignoring spaces.
   *
   * @param word The input string to lexemize.
   * @returns An array of tokens recognized in the input string.
   * @throws Error if an unrecognized token is found in the input string.
   */
  lexemize(word: string) {
    const tokens: Token[] = [];

    let wordToProcess = word;

    while (wordToProcess !== "") {
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

  /**
   * returns the first recognized token from the input string using the
   * available automata.
   *
   * Try to recognize a subword of the input string using the available automata,
   * returning the first valid token found. If no automaton recognize a valid
   * token, an UNRECOGNIZED token is returned.
   *
   * @param word The input string to analyze.
   * @returns The first recognized token, or an UNRECOGNIZED token if none match.
   */
  firstRecognizedToken(word: string) {
    for (const automaton of this.automata) {
      const token = automaton.recognize(word);

      if (token.size > 0) {
        return token;
      }
    }

    return { name: "UNRECOGNIZED", substring: "", size: 0 };
  }
}
