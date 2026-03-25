import { describe, it, expect } from "vitest";
import IdentifierAutomata from "./identifier-automata";

describe("IdentifierAutomata", () => {

    it("recognizes simple identifier", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("abc");

        expect(token).toEqual({
            name: "IDENTIFIER",
            substring: "abc",
            size: 3
        });
    });

    it("recognizes identifier with digits", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("abc123");

        expect(token.substring).toBe("abc123");
        expect(token.size).toBe(6);
    });

    it("stops at invalid character", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("abc+123");

        expect(token.substring).toBe("abc");
        expect(token.size).toBe(3);
    });

    it("rejects starting with digit", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("1abc");

        expect(token.substring).toBe("");
        expect(token.size).toBe(0);
    });

    it("recognizes single letter", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("a");

        expect(token.substring).toBe("a");
        expect(token.size).toBe(1);
    });

    it("stops before whitespace", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("abc def");

        expect(token.substring).toBe("abc");
    });

    it("does not consume next token", () => {
        const automata = new IdentifierAutomata();

        const token = automata.recognize("abc123+");

        expect(token.substring).toBe("abc123");
    });

});