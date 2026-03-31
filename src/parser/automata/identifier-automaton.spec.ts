import { describe, it, expect } from "vitest";
import IdentifierAutomaton from "./identifier-automaton";

describe("IdentifierAutomaton", () => {
  it("recognizes simple identifier", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("abc");

    expect(token).toEqual({
      name: "IDENTIFIER",
      substring: "abc",
      size: 3,
    });
  });

  it("recognizes identifier with digits", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("abc123");

    expect(token.substring).toBe("abc123");
    expect(token.size).toBe(6);
  });

  it("stops at invalid character", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("abc+123");

    expect(token.substring).toBe("abc");
    expect(token.size).toBe(3);
  });

  it("rejects starting with digit", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("1abc");

    expect(token.substring).toBe("");
    expect(token.size).toBe(0);
  });

  it("recognizes single letter", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("a");

    expect(token.substring).toBe("a");
    expect(token.size).toBe(1);
  });

  it("stops before whitespace", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("abc def");

    expect(token.substring).toBe("abc");
  });

  it("does not consume next token", () => {
    const automaton = new IdentifierAutomaton();

    const token = automaton.recognize("abc123+");

    expect(token.substring).toBe("abc123");
  });
});
