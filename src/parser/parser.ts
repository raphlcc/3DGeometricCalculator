import { Token } from "./automata/token.interface";
import { MathObject } from "../math/math-object";
import Grammar, { END_MARKER, EPSILON, NonTerminal, Terminal } from "./grammar";
import { Symbol, Production } from "./grammar";

type Item = {
  production: Production;
  dotPosition: number;
};

type State = {
  id: number;
  items: Item[];
  goto: Map<Symbol, number>;
};

type Shift = {
  kind: "shift";
  state: number;
};

type Reduce = {
  kind: "reduce";
  production: Production;
};

type Accept = {
  kind: "accept";
};

type Action = Shift | Reduce | Accept;

type StackNode = {
  state: number;
  value?: Token | MathObject;
};

class Parser {
  private stack: StackNode[];

  private grammar: Grammar;
  private firstProduction: Production;

  private actions: Map<string, Action> = new Map<string, Action>();
  private goto: Map<string, number> = new Map<string, number>();

  constructor(grammar: Grammar) {
    this.grammar = grammar;
    this.firstProduction = {
      left: {
        name: "S'",
        kind: "non-terminal",
      },
      right: [grammar.startSymbol],
      reduce: () => {},
    };
    this.firstProduction.left.produtions = [this.firstProduction];

    const firstState = { state: 0 };
    this.stack = [firstState];

    const automaton = this.buildCanonicalSetsAutomaton();
    this.buildActionsTable(automaton);
    this.buildGotoTable(automaton);
  }

  public parse(tokens: Token[]): void {
    let currAction: Action | undefined;

    const endToken: Token = {
      name: "end-marker",
      substring: "",
      size: 0,
    };
    tokens.push(endToken);

    do {
      const token = tokens[0];
      const top = this.stack.pop();

      currAction = this.actions.get(`${top?.state}#${token?.name}`);

      if (!currAction) {
        throw new Error(
          `There is no action to key ${top?.state}#${token?.name}.`,
        );
      }

      if (currAction?.kind === "shift") {
        tokens.shift();

        const nextState = {
          state: currAction.state,
          value: token,
        };

        this.stack.push(nextState);
        continue;
      }

      if (currAction?.kind === "reduce") {
        const removedStates = this.stack.splice(
          -currAction.production.right.length,
        );
        const mathObjects = removedStates.map((stackNode) => stackNode.value);
        const astNode = currAction.production.reduce(mathObjects);
        const newStateId = this.goto.get(
          `${top?.state}#${currAction.production.left.name}`,
        );

        const stackNode: StackNode = {
          state: newStateId!,
          value: astNode,
        };
        this.stack.push(stackNode);

        continue;
      }

      if (currAction?.kind === "accept") {
        break;
      }

      throw new Error("TODO: organize errors");
    } while (true);
  }

  private buildGotoTable(automaton: State[]): void {
    for (const state of automaton) {
      state.goto.forEach((goal, key) => {
        this.goto.set(`${state.id}#${key.name}`, goal);
      });
    }
  }

  private buildActionsTable(automaton: State[]): void {
    for (const state of automaton) {
      for (const item of state.items) {
        if (
          item.production === this.firstProduction &&
          item.dotPosition === 1
        ) {
          const action: Accept = { kind: "accept" };
          this.actions.set(`${state.id}#${END_MARKER.name}`, action);
          continue;
        }

        const afterDot = item.production.right[item.dotPosition];

        if (!afterDot) {
          const follow = this.follow(item.production.left);

          const action: Action = {
            kind: "reduce",
            production: item.production,
          };

          follow.forEach((terminal) => {
            this.actions.set(`${state.id}#${terminal.name}`, action);
          });

          continue;
        }

        if (afterDot.kind === "non-terminal") {
          continue;
        }

        const neighbour = state.goto.get(afterDot);

        if (!neighbour) {
          continue;
        }

        const action: Shift = {
          kind: "shift",
          state: neighbour,
        };

        this.actions.set(`${state.id}#${afterDot.name}`, action);
      }
    }
  }

  private buildCanonicalSetsAutomaton(): State[] {
    const canonicalSetsAutomaton: State[] = [
      {
        id: 0,
        items: this.closure([
          { production: this.firstProduction, dotPosition: 0 },
        ]),
        goto: new Map(),
      },
    ];

    const itemStack = [...canonicalSetsAutomaton];

    while (itemStack.length > 0) {
      const state = itemStack.pop()!;
      for (const symbol of this.grammar.symbols) {
        const gotoResult = this.gotoFunc(state.items, symbol);

        if (this.alreadyInSet(canonicalSetsAutomaton, gotoResult)) continue;

        const newState: State = {
          id: canonicalSetsAutomaton.length,
          items: gotoResult,
          goto: new Map(),
        };

        state.goto.set(symbol, canonicalSetsAutomaton.length);

        canonicalSetsAutomaton.push(newState);
        itemStack.push(newState);
      }
    }

    return canonicalSetsAutomaton;
  }

  private alreadyInSet(canonicalSet: State[], newSet: Item[]): boolean {
    for (const existingState of canonicalSet) {
      if (existingState.items.length !== newSet.length) {
        continue;
      }

      const areDifferentSets = existingState.items.some((item) => {
        const isIn = newSet.some(
          (item2) =>
            item.production === item2.production &&
            item.dotPosition === item2.dotPosition,
        );
        return !isIn;
      });

      if (!areDifferentSets) {
        return true;
      }
    }
    return false;
  }

  private gotoFunc(items: Item[], symbol: Symbol): Item[] {
    const gotoSet = new Set<Item>();

    for (const item of items) {
      const symbolAfterDot = item.production.right[item.dotPosition];

      if (symbolAfterDot && symbolAfterDot === symbol) {
        const newItem: Item = {
          production: item.production,
          dotPosition: item.dotPosition + 1,
        };
        gotoSet.add(newItem);
      }
    }

    return this.closure([...gotoSet]);
  }

  private closure(items: Item[]): Item[] {
    const closureSet = items;
    const itemsStack = [...items];

    while (itemsStack.length > 0) {
      const item = itemsStack.pop()!;
      const symbolAfterDot = item.production.right[item.dotPosition];

      if (
        !symbolAfterDot ||
        symbolAfterDot.kind === "terminal" ||
        !symbolAfterDot.produtions
      ) {
        continue;
      }

      for (const production of symbolAfterDot.produtions) {
        const newItem: Item = {
          production,
          dotPosition: 0,
        };

        const notInSet = !closureSet.find(
          (item) =>
            item.production === newItem.production &&
            item.dotPosition === newItem.dotPosition,
        );

        if (notInSet) {
          closureSet.push(newItem);
          itemsStack.push(newItem);
        }
      }
    }
    return closureSet;
  }

  follow(nonTerminal: NonTerminal): Set<Terminal> {
    if (nonTerminal === this.grammar.startSymbol) {
      return new Set<Terminal>([END_MARKER]);
    }

    let follow = new Set<Terminal>();

    for (const production of this.grammar.productions) {
      for (let index = 0; index <= production.right.length; index++) {
        const symbol = production.right[index];

        if (symbol !== nonTerminal) {
          continue;
        }

        const postWord = production.right.slice(index + 1);
        const postFirst = this.first(postWord);

        if (postFirst.size === 0 || postFirst.has(EPSILON)) {
          follow = new Set([...follow, ...this.follow(production.left)]);
          continue;
        }

        follow = new Set([...follow, ...postFirst]);
      }
    }

    return follow;
  }

  first(symbols: Symbol[]): Set<Terminal> {
    if (symbols.length === 0) {
      return new Set();
    }

    if (symbols.length === 1) {
      return this.firstToSingle(symbols[0]);
    }

    let first = new Set<Terminal>();

    let symbolIndex = 0;
    let currFirst;

    do {
      currFirst = this.firstToSingle(symbols[symbolIndex]);
      first = new Set<Terminal>([...first, ...currFirst]);
      symbolIndex++;
    } while (currFirst.has(EPSILON));

    return first;
  }

  firstToSingle(symbol: Symbol): Set<Terminal> {
    if (symbol.kind === "terminal") {
      return new Set<Terminal>([symbol]);
    }

    const nonTerminal = symbol as NonTerminal;
    if (!nonTerminal.produtions) {
      return new Set();
    }

    let first = new Set<Terminal>();

    for (const production of nonTerminal.produtions) {
      let symbolIndex = 0;
      let currFirst;

      do {
        const currSymbol = production.right[symbolIndex];
        if (currSymbol.kind === "terminal") {
          first.add(production.right[symbolIndex] as Terminal);
          break;
        }
        currFirst = this.firstToSingle(currSymbol);
        first = new Set<Terminal>([...first, ...currFirst]);
        symbolIndex++;
      } while (currFirst.has(EPSILON));
    }

    return first;
  }
}

export default Parser;
