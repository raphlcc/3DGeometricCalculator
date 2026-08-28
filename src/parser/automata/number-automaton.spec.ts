import { describe, it, expect } from "vitest";
import NumberAutomaton from "./number-automaton";

describe("NumberAutomaton", () => {
  it("recognizes a simple integer", () => {
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("123");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "123",
      size: 3,
    });
  });

  it("recognizes two numbers consecutively", () => {
    const automaton = new NumberAutomaton();

    const token1 = automaton.recognize("123 456");
    const token2 = automaton.recognize("456");

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
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("1.5");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "1.5",
      size: 3,
    });
  });

  it("stops when invalid char appears", () => {
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("123a");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "123",
      size: 3,
    });
  });

  it("rejects invalid initial char", () => {
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("a123");

    expect(token).toEqual({
      name: "NUMBER",
      substring: "",
      size: 0,
    });
  });

  it("recognizes multiple digits", () => {
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("123456");

    expect(token.substring).toBe("123456");
    expect(token.size).toBe(6);
  });

  it("float stops if no digit after dot", () => {
    const automaton = new NumberAutomaton();

    const token = automaton.recognize("1.");

    expect(token.substring).toBe("1");
  });
});
