import { describe, it, expect } from "vitest";
import MonoSymbolAutomaton from "./monosymbol-automaton";

describe("MonoSymbolAutomaton", () => {
  it("recognizes single symbol", () => {
    const automaton = new MonoSymbolAutomaton("+", "PLUS");

    const token = automaton.recognize("+");

    expect(token).toEqual({
      name: "PLUS",
      substring: "+",
      size: 1,
    });
  });

  it("does not consume second same symbol", () => {
    const automaton = new MonoSymbolAutomaton("+", "PLUS");

    const token = automaton.recognize("++");

    expect(token.substring).toBe("+");
    expect(token.size).toBe(1);
  });

  it("rejects different symbol", () => {
    const automaton = new MonoSymbolAutomaton("+", "PLUS");

    const token = automaton.recognize("-");

    expect(token.substring).toBe("");
    expect(token.size).toBe(0);
  });
});
