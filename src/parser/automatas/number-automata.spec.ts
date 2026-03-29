import { describe, it, expect } from "vitest";
import NumberAutomata from "./number-automata";

describe("NumberAutomata", () => {
  it("recognizes a simple integer", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("123");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "123",
      size: 3,
    });
  });

  it("recognizes two numbers consecutively", () => {
    const automata = new NumberAutomata();

    const token1 = automata.recognize("123 456");
    const token2 = automata.recognize("456");

    expect(token1).toEqual({
      name: "NUMBER",
      substring: "123",
      size: 3,
    });

    expect(token2).toEqual({
      name: "NUMBER",
      substring: "456",
      size: 3,
    });
  });

  it("recognizes a float", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("1.5");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "1.5",
      size: 3,
    });
  });

  it("stops when invalid char appears", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("123a");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "123",
      size: 3,
    });
  });

  it("rejects invalid initial char", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("a123");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "",
      size: 0,
    });
  });

  it("recognizes multiple digits", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("123456");

    expect(token.substring).toBe("123456");
    expect(token.size).toBe(6);
  });

  it("float stops if no digit after dot", () => {
    const automata = new NumberAutomata();

    const token = automata.recognize("1.");

    expect(token.substring).toBe("1.");
  });
});
