import { MathObject } from "../math/math-object";
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

export type Production = {
  left: NonTerminal;
  right: Symbol[];
  reduce: (items: (MathObject | Token | undefined)[]) => void;
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

const EqIneq: NonTerminal = {
  kind: "non-terminal",
  name: "eq-ineq",
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
  name: "func-name",
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

const BinaryExpression: NonTerminal = {
  kind: "non-terminal",
  name: "bin-expr",
};

const BinaryOperator: NonTerminal = {
  kind: "non-terminal",
  name: "bin-op",
};

const UnaryExpression: NonTerminal = {
  kind: "non-terminal",
  name: "unary-expr",
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
  name: "id",
};

const NUMBER: Terminal = {
  kind: "terminal",
  name: "number",
};

const PLUS: Terminal = {
  kind: "terminal",
  name: "plus",
};

const MINUS: Terminal = {
  kind: "terminal",
  name: "minus",
};

const TIMES: Terminal = {
  kind: "terminal",
  name: "times",
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
  name: "lequal",
};

const GREATER_EQUAL: Terminal = {
  kind: "terminal",
  name: "gequal",
};

const L_PAREN: Terminal = {
  kind: "terminal",
  name: "l-paren",
};

const R_PAREN: Terminal = {
  kind: "terminal",
  name: "r-paren",
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
      EqIneq,
      CompareOperator,
      FuncDecl,
      Name,
      VarList,
      Var,
      Expression,
      BinaryExpression,
      BinaryOperator,
      UnaryExpression,
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
      // <math_obj> ::= <function> | <eq_ineq>
      { left: MathObj, right: [Function], reduce: () => {} },
      { left: MathObj, right: [EqIneq], reduce: () => {} },
      // <eq_ineq> ::= <expr> <comp_op> <expr>
      {
        left: EqIneq,
        right: [Expression, CompareOperator, Expression],
        reduce: () => {},
      },
      // <comp_op> ::= != | == | < | > | <= | >=
      { left: CompareOperator, right: [DIFFERENT], reduce: () => {} },
      { left: CompareOperator, right: [EQUAL], reduce: () => {} },
      { left: CompareOperator, right: [LESS_THAN], reduce: () => {} },
      { left: CompareOperator, right: [GREATER_THAN], reduce: () => {} },
      { left: CompareOperator, right: [LESS_EQUAL], reduce: () => {} },
      { left: CompareOperator, right: [GREATER_EQUAL], reduce: () => {} },
      // <function> ::= <func_decl> = <expr>
      {
        left: Function,
        right: [FuncDecl, EQUAL, Expression],
        reduce: () => {},
      },
      // <func_decl> ::= <name> ( <var_list> )
      {
        left: FuncDecl,
        right: [Name, L_PAREN, VarList, R_PAREN],
        reduce: () => {},
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
      /**
        <expr> ::= <binary_expr>
				 | <unary_expr>
				 | <tuple_expr>
				 | <call_func_expr>
				 | (<expr>)
				 | <var>
				 | NUMBER
       */
      { left: Expression, right: [BinaryExpression], reduce: () => {} },
      { left: Expression, right: [UnaryExpression], reduce: () => {} },
      { left: Expression, right: [TupleExpression], reduce: () => {} },
      { left: Expression, right: [CallFunctionExpression], reduce: () => {} },
      {
        left: Expression,
        right: [L_PAREN, Expression, R_PAREN],
        reduce: () => {},
      },
      { left: Expression, right: [Var], reduce: () => {} },
      { left: Expression, right: [NUMBER], reduce: () => {} },
      // <binary_expr> ::= <expr> <bin_op> <expr>
      {
        left: BinaryExpression,
        right: [Expression, BinaryOperator, Expression],
        reduce: () => {},
      },
      // <bin_op> ::= + | - | * | / | ^
      { left: BinaryOperator, right: [PLUS], reduce: () => {} },
      { left: BinaryOperator, right: [MINUS], reduce: () => {} },
      { left: BinaryOperator, right: [TIMES], reduce: () => {} },
      { left: BinaryOperator, right: [SLASH], reduce: () => {} },
      { left: BinaryOperator, right: [POWER], reduce: () => {} },
      // <unary_expr> ::= - <expr>
      { left: UnaryExpression, right: [MINUS, Expression], reduce: () => {} },
      // <tuple_expr> ::= (<expr_list>)
      {
        left: TupleExpression,
        right: [L_PAREN, ExpressionList, R_PAREN],
        reduce: () => {},
      },
      // <expr_list> ::= <expr> | <expr> , <expr_list>
      { left: ExpressionList, right: [Expression], reduce: () => {} },
      {
        left: ExpressionList,
        right: [Expression, COMMA, ExpressionList],
        reduce: () => {},
      },
      // <call_func_expr> ::= <name> (<expr_list)
      {
        left: CallFunctionExpression,
        right: [Name, L_PAREN, ExpressionList, R_PAREN],
        reduce: () => {},
      },
    ];
  }
}
