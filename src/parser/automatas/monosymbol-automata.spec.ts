import { describe, it, expect } from "vitest";
import MonoSymbolAutomata from "./monosymbol-automata";

describe("MonoSymbolAutomata", () => {
  it("recognizes single symbol", () => {
    const automata = new MonoSymbolAutomata("+", "PLUS");

    const token = automata.recognize("+");

    expect(token).toEqual({
      name: "PLUS",
      substring: "+",
      size: 1,
    });
  });

  it("does not consume second same symbol", () => {
    const automata = new MonoSymbolAutomata("+", "PLUS");

    const token = automata.recognize("++");

    expect(token.substring).toBe("+");
    expect(token.size).toBe(1);
  });

  it("rejects different symbol", () => {
    const automata = new MonoSymbolAutomata("+", "PLUS");

    const token = automata.recognize("-");

    expect(token.substring).toBe("");
    expect(token.size).toBe(0);
  });
});
