import { Token } from "./automatas/token.interface";
import { Automata } from "./automatas/automata";
import IdentifierAutomata from "./automatas/identifier-automata";
import MonoSymbolAutomata from "./automatas/monosymbol-automata";
import NumberAutomata from "./automatas/number-automata";

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
  private automatas: Automata[] = [
    new IdentifierAutomata(),
    new NumberAutomata(),
    new MonoSymbolAutomata("+", "PLUS"),
    new MonoSymbolAutomata("-", "MINUS"),
    new MonoSymbolAutomata("*", "TIMES"),
    new MonoSymbolAutomata("(", "L_PAREN"),
    new MonoSymbolAutomata(")", "R_PAREN"),
    new MonoSymbolAutomata("=", "EQUAL"),
    new MonoSymbolAutomata(",", "COMMA"),
    new MonoSymbolAutomata(" ", "SPACE"),
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
   * returning the first valid token found. If no automata recognize a valid
   * token, an UNRECOGNIZED token is returned.
   *
   * @param word The input string to analyze.
   * @returns The first recognized token, or an UNRECOGNIZED token if none match.
   */
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
