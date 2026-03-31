import { describe, it, expect } from "vitest";
import Lexer from "./lexer";
import { Automaton } from "./automata/automaton";
import { Token } from "./automata/token.interface";
import { vi } from "vitest";

class MockAutomaton extends Automaton {
  constructor(private token: Token) {
    super(token.name);
  }

  recognize(): Token {
    return this.token;
  }

  protected applyTransitions(): void {}
}

function sequence(...tokens: Token[]) {
  let i = 0;
  return () => tokens[i++] ?? { name: "UNRECOGNIZED", substring: "", size: 0 };
}

describe("Lexer", () => {
  describe("firstRecognizedToken", () => {
    it("returns first recognized token", () => {
      const lexer = new Lexer();

      lexer["automata"] = [
        new MockAutomaton({ name: "EMPTY", substring: "", size: 0 }),
        new MockAutomaton({ name: "IDENTIFIER", substring: "f", size: 1 }),
        new MockAutomaton({ name: "NUMBER", substring: "123", size: 3 }),
      ];

      const token = lexer.firstRecognizedToken("f");

      expect(token).toStrictEqual({
        name: "IDENTIFIER",
        substring: "f",
        size: 1,
      });
    });

    it("returns UNRECOGNIZED when none match", () => {
      const lexer = new Lexer();

      lexer["automata"] = [
        new MockAutomaton({ name: "EMPTY", substring: "", size: 0 }),
        new MockAutomaton({ name: "EMPTY", substring: "", size: 0 }),
      ];

      const token = lexer.firstRecognizedToken("???");

      expect(token).toStrictEqual({
        name: "UNRECOGNIZED",
        substring: "",
        size: 0,
      });
    });

    it("stops at first match", () => {
      const lexer = new Lexer();

      lexer["automata"] = [
        new MockAutomaton({ name: "IDENTIFIER", substring: "f", size: 1 }),
        new MockAutomaton({ name: "NUMBER", substring: "123", size: 3 }),
      ];

      const token = lexer.firstRecognizedToken("f");

      expect(token.name).toBe("IDENTIFIER");
    });
  });

  describe("lexemize", () => {
    it("collects tokens and ignores SPACE", () => {
      const lexer = new Lexer();

      lexer.firstRecognizedToken = vi.fn(
        sequence(
          { name: "IDENTIFIER", substring: "f", size: 1 },
          { name: "SPACE", substring: " ", size: 1 },
          { name: "NUMBER", substring: "123", size: 3 },
        ),
      );

      const tokens = lexer.lexemize("f 123");

      expect(tokens).toStrictEqual([
        { name: "IDENTIFIER", substring: "f", size: 1 },
        { name: "NUMBER", substring: "123", size: 3 },
      ]);
    });

    it("throws when token is UNRECOGNIZED", () => {
      const lexer = new Lexer();

      lexer.firstRecognizedToken = vi.fn(
        sequence(
          { name: "IDENTIFIER", substring: "f", size: 1 },
          { name: "UNRECOGNIZED", substring: "", size: 0 },
        ),
      );

      expect(() => lexer.lexemize("f$")).toThrow("Unrecognized token at: $");
    });

    it("keeps consuming until end", () => {
      const lexer = new Lexer();

      lexer.firstRecognizedToken = vi.fn(
        sequence(
          { name: "NUMBER", substring: "1", size: 1 },
          { name: "SPACE", substring: " ", size: 1 },
          { name: "NUMBER", substring: "2", size: 1 },
          { name: "SPACE", substring: " ", size: 1 },
          { name: "NUMBER", substring: "3", size: 1 },
        ),
      );

      const tokens = lexer.lexemize("1 2 3");

      expect(tokens).toHaveLength(3);
    });
  });
});
