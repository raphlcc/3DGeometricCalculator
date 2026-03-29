/**
 * Represents a lexical token produced by the lexer.
 */
export interface Token {
  /** Token type identifier */
  name: string;

  /** Matched substring from input */
  substring: string;

  /** Length of consumed characters */
  size: number;
}
