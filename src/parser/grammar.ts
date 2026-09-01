import {
  MathObject,
  Function as FunctionType,
  Constraint as ConstraintType,
} from "../math/math-object";
import { Expression as ExpressionType, Vec } from "../math/expression";
import { Token } from "./automata/token.interface";

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

export type ReduceArgs = (
  | MathObject
  | MathObject[]
  | Token
  | string
  | undefined
)[];

export type Production = {
  left: NonTerminal;
  right: Symbol[];
  reduce: (items: ReduceArgs) => any;
};

export const EPSILON: Terminal = {
  name: "epsilon",
  kind: "terminal",
};

export const END_MARKER: Terminal = {
  name: "end-marker",
  kind: "terminal",
};

const MathObj: NonTerminal = {
  kind: "non-terminal",
  name: "math-obj",
};

const Function: NonTerminal = {
  kind: "non-terminal",
  name: "function",
};

const Constraint: NonTerminal = {
  kind: "non-terminal",
  name: "constraint",
};

const CompareOperator: NonTerminal = {
  kind: "non-terminal",
  name: "compare-op",
};

const FuncDecl: NonTerminal = {
  kind: "non-terminal",
  name: "func-decl",
};

const Name: NonTerminal = {
  kind: "non-terminal",
  name: "name",
};

const VarList: NonTerminal = {
  kind: "non-terminal",
  name: "var-list",
};

const Var: NonTerminal = {
  kind: "non-terminal",
  name: "var",
};

const Expression: NonTerminal = {
  kind: "non-terminal",
  name: "expr",
};

const Term: NonTerminal = {
  kind: "non-terminal",
  name: "term",
};

const Factor: NonTerminal = {
  kind: "non-terminal",
  name: "factor",
};

const Expo: NonTerminal = {
  kind: "non-terminal",
  name: "expo",
};

const Base: NonTerminal = {
  kind: "non-terminal",
  name: "base",
};

const TupleExpression: NonTerminal = {
  kind: "non-terminal",
  name: "tuple-expr",
};

const ExpressionList: NonTerminal = {
  kind: "non-terminal",
  name: "expr-list",
};

const CallFunctionExpression: NonTerminal = {
  kind: "non-terminal",
  name: "call-func-expr",
};

const ID: Terminal = {
  kind: "terminal",
  name: "IDENTIFIER",
};

const NUMBER: Terminal = {
  kind: "terminal",
  name: "NUMBER",
};

const PLUS: Terminal = {
  kind: "terminal",
  name: "PLUS",
};

const MINUS: Terminal = {
  kind: "terminal",
  name: "minus",
};

const TIMES: Terminal = {
  kind: "terminal",
  name: "TIMES",
};

const SLASH: Terminal = {
  kind: "terminal",
  name: "slash",
};

const POWER: Terminal = {
  kind: "terminal",
  name: "power",
};

const DIFFERENT: Terminal = {
  kind: "terminal",
  name: "different",
};

const EQUAL: Terminal = {
  kind: "terminal",
  name: "equal",
};

const LESS_THAN: Terminal = {
  kind: "terminal",
  name: "less-than",
};

const GREATER_THAN: Terminal = {
  kind: "terminal",
  name: "greater-than",
};

const LESS_EQUAL: Terminal = {
  kind: "terminal",
  name: "LESSER_EQUAL",
};

const GREATER_EQUAL: Terminal = {
  kind: "terminal",
  name: "gequal",
};

const L_PAREN: Terminal = {
  kind: "terminal",
  name: "L_PAREN",
};

const R_PAREN: Terminal = {
  kind: "terminal",
  name: "R_PAREN",
};

const UNDERLINE: Terminal = {
  kind: "terminal",
  name: "underline",
};

const COMMA: Terminal = {
  kind: "terminal",
  name: "comma",
};

export default class Grammar {
  symbols: Symbol[] = [];
  productions: Production[] = [];
  startSymbol: Symbol;

  constructor() {
    this.startSymbol = MathObj;

    this.symbols = [
      MathObj,
      Function,
      Constraint,
      CompareOperator,
      FuncDecl,
      Name,
      VarList,
      Var,
      Expression,
      Term,
      Factor,
      Expo,
      Base,
      TupleExpression,
      ExpressionList,
      CallFunctionExpression,
      ID,
      NUMBER,
      PLUS,
      MINUS,
      TIMES,
      SLASH,
      POWER,
      DIFFERENT,
      EQUAL,
      LESS_THAN,
      LESS_EQUAL,
      GREATER_THAN,
      GREATER_EQUAL,
      L_PAREN,
      R_PAREN,
      COMMA,
      UNDERLINE,
    ];

    this.productions = [
      // <math_obj> ::= <function> | <constraint>
      {
        left: MathObj,
        right: [Function],
        reduce: (items) => items[0],
      },
      {
        left: MathObj,
        right: [Constraint],
        reduce: (items) => items[0],
      },
      // <constraint> ::= <expr> = <expr>
      {
        left: Constraint,
        right: [Expression, EQUAL, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <constraint> ::= <expr> != <expr>
      {
        left: Constraint,
        right: [Expression, DIFFERENT, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <constraint> ::= <expr> < <expr>
      {
        left: Constraint,
        right: [Expression, LESS_THAN, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <constraint> ::= <expr> <= <expr>
      {
        left: Constraint,
        right: [Expression, LESS_EQUAL, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <constraint> ::= <expr> > <expr>
      {
        left: Constraint,
        right: [Expression, GREATER_THAN, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <constraint> ::= <expr> >= <expr>
      {
        left: Constraint,
        right: [Expression, GREATER_EQUAL, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <function> ::= <func_decl> = <expr>
      {
        left: Function,
        right: [FuncDecl, EQUAL, Expression],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <func_decl> ::= <name> ( <var_list> )
      {
        left: FuncDecl,
        right: [Name, L_PAREN, VarList, R_PAREN],
        reduce: (items) => {
          console.log(items);
          return items.join(' ');
        }
      },
      // <name> ::= ID | ID_ID | ID_NUMBER
      { left: Name, right: [ID], reduce: () => {} },
      { left: Name, right: [ID, UNDERLINE, ID], reduce: () => {} },
      { left: Name, right: [ID, UNDERLINE, NUMBER], reduce: () => {} },
      // <var_list> ::= <var> | <var> , <var_list>
      { left: VarList, right: [Var], reduce: () => {} },
      { left: VarList, right: [Var, COMMA, VarList], reduce: () => {} },
      // <var> ::= <Name>
      { left: Var, right: [Name], reduce: () => {} },
      // <expr> ::= <term> + <expr> | <term> - <expr> | <term>
      { left: Expression, right: [Term, PLUS, Expression], reduce: () => {} },
      { left: Expression, right: [Term, MINUS, Expression], reduce: () => {} },
      { left: Expression, right: [Term], reduce: () => {} },
      // <term> ::= <factor> * <term> | <factor> / <term> | <factor>
      { left: Term, right: [Factor, TIMES, Term], reduce: () => {} },
      { left: Term, right: [Factor, SLASH, Term], reduce: () => {} },
      { left: Term, right: [Factor], reduce: () => {} },
      // <factor> ::= <exp> | -<exp>
      { left: Factor, right: [Expo], reduce: () => {} },
      { left: Factor, right: [MINUS, Expo], reduce: () => {} },
      // <exp> ::= <base> ^ <exp> | <base> ^ -<exp> | <base> | (<expr>)
      { left: Expo, right: [Base, POWER, Expo], reduce: () => {} },
      { left: Expo, right: [Base, POWER, MINUS, Expo], reduce: () => {} },
      { left: Expo, right: [Base], reduce: () => {} },
      { left: Expo, right: [L_PAREN, Expression, R_PAREN], reduce: () => {} },
      // <base> ::= <var> | NUMBER | <call_func_expr> | <tuple_expr>
      { left: Base, right: [Var], reduce: () => {} },
      { left: Base, right: [NUMBER], reduce: () => {} },
      { left: Base, right: [CallFunctionExpression], reduce: () => {} },
      { left: Base, right: [TupleExpression], reduce: () => {} },
      // <tuple_expr> ::= (<expr_list>)
      {
        left: TupleExpression,
        right: [L_PAREN, ExpressionList, R_PAREN],
        reduce: () => {},
      },
      // <expr_list> ::= <expr> | <expr> , <expr_list>
      {
        left: ExpressionList,
        right: [Expression],
        reduce: (items) => [items[0]],
      },
      {
        left: ExpressionList,
        right: [Expression, COMMA, ExpressionList],
        reduce: (items) => [items[0], ...(items[2] as ExpressionType[])],
      },
      // <call_func_expr> ::= <name> (<expr_list)
      {
        left: CallFunctionExpression,
        right: [Name, L_PAREN, ExpressionList, R_PAREN],
        reduce: () => {},
      },
    ];

    for (let production of this.productions) {
      production.reduce = (items) => {
        if (typeof items[0] === 'object') {
          //console.log(Object.entries(items[0]))
        }

        const itemsStr = items.map(item => typeof item === 'string'? item : ` ${item.substring || item.name || item}`);

        console.log('items: ', itemsStr);
        return itemsStr.join(' ');
      }
    }

    for (const symbol of this.symbols) {
      if (symbol.kind === "terminal") {
        continue;
      }

      symbol.produtions = this.productions.filter(
        (production) => production.left === symbol,
      );
    }
  }
}
