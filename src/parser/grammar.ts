export type Terminal = {
  name: string;
  kind: "terminal";
};
export type NonTerminal = {
  name: string;
  kind: "non-terminal";
  produtions?: Production[];
};
export type Symbol = Terminal | NonTerminal;

export type Production = {
  left: NonTerminal;
  right: Symbol[];
};

export const EPSILON: Terminal = {
  name: "epsilon",
  kind: "terminal",
};

export const END_MARKER: Terminal = {
  name: "end-marker",
  kind: "terminal",
};

export default class Grammar {
  symbols: Symbol[] = [];
  productions: Production[] = [];
  startSymbol: Symbol;

  constructor() {
    this.startSymbol = {
      name: "S",
      kind: "non-terminal",
    };
  }
}
