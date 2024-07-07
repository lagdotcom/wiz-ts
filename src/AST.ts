import {
  ArithmeticFactorTokens,
  ArithmeticTermTokens,
  AssignmentTokens,
  BitShiftTokens,
  BitwiseTokens,
  ComparisonTokens,
  Token,
  TokenData,
  UnaryPostfixTokens,
  UnaryPrefixTokens,
} from "./Tokenizer";

export interface AssignmentExpression {
  type: "assignment";
  left: Expression;
  op: Token;
  right: Expression;
}

export interface BinaryExpression {
  type: "binary";
  left: Expression;
  op: Token;
  right: Expression;
}

export interface BoolExpression {
  type: "bool";
  value: boolean;
}

export interface CallExpression {
  type: "call";
  expr: Expression;
  args: Expression[];
}

export interface CoercionExpression {
  type: "coercion";
  expr: Expression;
  wtype: WizType;
}

export interface EmbedExpression {
  type: "embed";
  value: string;
}

export interface GroupExpression {
  type: "group";
  expr: Expression;
}

export interface NameExpression {
  type: "name";
  value: string;
}

export interface NumberExpression {
  type: "number";
  value: number;
}

export interface PostExpression {
  type: "post";
  op: Token;
  expr: Expression;
}

export interface UnaryExpression {
  type: "unary";
  op: Token;
  expr: Expression;
}

export type Expression =
  | AssignmentExpression
  | BinaryExpression
  | BoolExpression
  | CallExpression
  | CoercionExpression
  | EmbedExpression
  | GroupExpression
  | NameExpression
  | NumberExpression
  | PostExpression
  | UnaryExpression;

export interface ArrayType {
  type: "array";
  wtype: WizType;
  size?: Expression;
}

const numericTypes = [
  "bool",
  "i8",
  "i16",
  "i24",
  "i32",
  "i64",
  "u8",
  "u16",
  "u24",
  "u32",
  "u64",
] as const;
type NumericTypeString = (typeof numericTypes)[number];
export interface NumericType {
  type: NumericTypeString;
}

export interface PointerType {
  type: "pointer";
  wtype: WizType;
}

export type WizType = ArrayType | NumericType | PointerType;

export interface ConstStatement {
  type: "const";
  name: string;
  expression: Expression;
}

export interface DoStatement {
  type: "do";
  contents: Statement[];
  expression: Expression;
}

export interface ExpressionStatement {
  type: "expression";
  expression: Expression;
}

interface FuncArg {
  name: string;
  wtype: WizType;
  storage?: string;
}

type FuncReturn = Omit<FuncArg, "name">;

export interface FuncStatement {
  type: "func";
  annotations: string[];
  name: string;
  args: FuncArg[];
  returns?: FuncReturn;
  contents: Statement[];
}

interface IfBranch {
  expression: Expression;
  contents: Statement[];
}

export interface IfStatement {
  type: "if";
  positive: IfBranch;
  elseIfs: IfBranch[];
  negative: Statement[];
}

export interface ImportStatement {
  type: "import";
  value: string;
}

export interface InStatement {
  type: "in";
  area: string;
  address?: number;
  contents: Statement[];
}

export interface LetStatement {
  type: "let";
  name: string;
  expression: Expression;
}

export interface NamespaceStatement {
  type: "namespace";
  value: string;
  contents: Statement[];
}

export interface VarStatement {
  type: "var";
  name: string;
  wtype: WizType;
  storage?: string;
}

export interface WhileStatement {
  type: "while";
  absolute: boolean;
  expression: Expression;
  contents: Statement[];
}

export type Statement =
  | ConstStatement
  | DoStatement
  | ExpressionStatement
  | FuncStatement
  | IfStatement
  | ImportStatement
  | InStatement
  | LetStatement
  | NamespaceStatement
  | VarStatement
  | WhileStatement;

export default class SyntaxEvaluator {
  i: number;

  constructor(
    public filename: string,
    public src: TokenData[],
  ) {
    this.i = 0;
  }

  get eof() {
    return this.i >= this.src.length;
  }

  next() {
    return this.src[this.i++];
  }

  rewind() {
    this.i--;
  }

  matched() {
    return this.src[this.i - 1];
  }

  peek() {
    return this.src[this.i];
  }

  die(message: string) {
    const t = this.matched();
    return new Error(
      `[line ${t.line}, col ${t.col}] ${message}, got ${t.type} "${t.value}"`,
    );
  }

  expect(type: Token) {
    const t = this.next();
    if (t.type !== type) throw this.die(`expected ${type}`);

    return t;
  }

  match(...types: Token[]) {
    const t = this.peek();
    if (!types.includes(t.type)) return undefined;

    return this.next();
  }

  expectName() {
    return this.expect(Token.NAME).value;
  }

  expectNumber() {
    return this.expect(Token.NUMBER).valueAsNumber;
  }

  expectString() {
    return this.expect(Token.STRING).value;
  }

  *evaluate() {
    while (!this.eof) {
      yield this.statement();
    }
  }

  statement(): Statement {
    const t = this.next();

    if (t.type === Token.IMPORT) return this.import();
    if (t.type === Token.IN) return this.in();
    if (t.type === Token.NAMESPACE) return this.namespace();
    if (t.type === Token.LET) return this.let();
    if (t.type === Token.VAR) return this.var();
    if (t.type === Token.CONST) return this.const();
    if (t.type === Token.FUNC) return this.func();
    if (t.type === Token.DO) return this.do();
    if (t.type === Token.IF) return this.if();
    if (t.type === Token.WHILE || t.type === Token.WHILE_ABS)
      return this.while(t.type === Token.WHILE_ABS);
    if (t.type === Token.ANNOTATION) return this.annotation();

    this.rewind();
    const expression = this.expression();
    this.expect(Token.SEMI);
    return { type: "expression", expression };
  }

  scope() {
    this.expect(Token.LBRACE);

    const statements: Statement[] = [];
    while (!this.match(Token.RBRACE)) statements.push(this.statement());

    return statements;
  }

  expression(): Expression {
    return this.assignment();
  }

  assignment(): Expression {
    let expr = this.equality();

    while (this.match(...AssignmentTokens)) {
      const op = this.matched();
      const right = this.assignment();
      expr = { type: "assignment", left: expr, op: op.type, right };
      // console.log(expr);
    }

    return expr;
  }

  equality(): Expression {
    let expr = this.comparison();

    while (this.match(Token.EQUAL_EQUAL, Token.NOT_EQUAL)) {
      const op = this.matched();
      const right = this.comparison();
      expr = { type: "binary", left: expr, op: op.type, right };
      // console.log(expr);
    }

    return expr;
  }

  comparison(): Expression {
    let expr = this.term();

    while (this.match(...ComparisonTokens)) {
      const op = this.matched();
      const right = this.term();
      expr = { type: "binary", left: expr, op: op.type, right };
      // console.log(expr);
    }

    return expr;
  }

  term(): Expression {
    let expr = this.factor();

    while (this.match(...ArithmeticTermTokens, ...BitwiseTokens)) {
      const op = this.matched();
      const right = this.factor();
      expr = { type: "binary", left: expr, op: op.type, right };
      // console.log(expr);
    }

    return expr;
  }

  factor(): Expression {
    let expr = this.coercion();

    while (this.match(...ArithmeticFactorTokens, ...BitShiftTokens)) {
      const op = this.matched();
      const right = this.coercion();
      expr = { type: "binary", left: expr, op: op.type, right };
      // console.log(expr);
    }

    return expr;
  }

  coercion(): Expression {
    let expr = this.unary();

    while (this.match(Token.AS)) {
      const wtype = this.type();
      expr = { type: "coercion", expr, wtype };
      // console.log(expr);
    }

    return expr;
  }

  unary(): Expression {
    if (this.match(...UnaryPrefixTokens)) {
      const op = this.matched();
      const expr = this.unary();
      return { type: "unary", op: op.type, expr };
    }

    return this.call();
  }

  call(): Expression {
    let expr = this.index();

    while (this.match(Token.LPAREN)) {
      const args: Expression[] = [];
      while (!this.match(Token.RPAREN)) {
        const arg = this.expression();
        args.push(arg);

        this.match(Token.COMMA);
      }

      expr = { type: "call", expr, args };
      // console.log(expr);
    }

    return expr;
  }

  index(): Expression {
    let expr = this.post();

    while (this.match(Token.LBRACKET)) {
      const right = this.expression();
      this.expect(Token.RBRACKET);
      expr = { type: "binary", left: expr, op: Token.LBRACKET, right };
      // console.log(expr);
    }

    return expr;
  }

  post(): Expression {
    let expr = this.member();

    if (this.match(...UnaryPostfixTokens)) {
      const op = this.matched();
      expr = { type: "post", expr, op: op.type };
    }

    return expr;
  }

  member(): Expression {
    let expr = this.primary();

    while (this.match(Token.DOT)) {
      const right = this.primary();
      expr = { type: "binary", left: expr, op: Token.DOT, right };
      // console.log(expr);
    }

    return expr;
  }

  primary(): Expression {
    const t = this.next();

    if (t.type === Token.NUMBER)
      return { type: "number", value: t.valueAsNumber };
    if (t.type === Token.NAME) return { type: "name", value: t.value };

    if (t.type === Token.LPAREN) {
      const expr = this.expression();
      this.expect(Token.RPAREN);
      return { type: "group", expr };
    }

    if (t.type === Token.TRUE) return { type: "bool", value: true };
    else if (t.type === Token.FALSE) return { type: "bool", value: false };
    else if (t.type === Token.EMBED)
      return { type: "embed", value: this.expectString() };

    throw this.die(`invalid primary`);
  }

  import(): Statement {
    const value = this.expectString();
    this.expect(Token.SEMI);

    return { type: "import", value };
  }

  in(): Statement {
    const area = this.expectName();

    let address: number | undefined;
    if (this.match(Token.AT)) address = this.expectNumber();

    return { type: "in", area, address, contents: this.scope() };
  }

  namespace(): Statement {
    const value = this.expectName();
    return { type: "namespace", value, contents: this.scope() };
  }

  let(): Statement {
    const name = this.expectName();
    this.expect(Token.ASSIGN);
    const expression = this.expression();
    this.expect(Token.SEMI);

    return { type: "let", name, expression };
  }

  var(): Statement {
    const name = this.expectName();
    this.expect(Token.COLON);
    const wtype = this.type();

    let storage: string | undefined;
    if (this.match(Token.IN)) storage = this.expectName();

    this.expect(Token.SEMI);
    return { type: "var", name, wtype, storage };
  }

  type(): WizType {
    if (this.match(Token.MUL)) {
      const wtype = this.type();
      return { type: "pointer", wtype };
    }

    if (this.match(Token.LBRACKET)) {
      const wtype = this.type();

      let size: Expression | undefined;
      if (this.match(Token.SEMI)) size = this.expression();

      this.expect(Token.RBRACKET);

      return { type: "array", wtype, size };
    }

    const t = this.next();
    if (numericTypes.includes(t.value as NumericTypeString))
      return { type: t.value as NumericTypeString };

    throw this.die(`expected type`);
  }

  const(): Statement {
    const name = this.expectName();
    this.expect(Token.ASSIGN);
    const expression = this.expression();
    this.expect(Token.SEMI);

    return { type: "const", name, expression };
  }

  func(annotations: string[] = []): Statement {
    const name = this.expectName();
    this.expect(Token.LPAREN);
    const args = this.arguments();
    let returns: FuncReturn | undefined;

    if (this.match(Token.COLON)) {
      const wtype = this.type();

      let storage: string | undefined;
      if (this.match(Token.IN)) storage = this.expectName();

      returns = { wtype, storage };
    }

    return {
      type: "func",
      annotations,
      name,
      args,
      returns,
      contents: this.scope(),
    };
  }

  arguments(): FuncArg[] {
    const value: FuncArg[] = [];

    while (!this.match(Token.RPAREN)) {
      const name = this.expectName();
      this.expect(Token.COLON);
      const wtype = this.type();

      let storage: string | undefined;
      if (this.match(Token.IN)) storage = this.expectName();

      value.push({ name, wtype, storage });
    }

    return value;
  }

  do(): Statement {
    const contents = this.scope();
    this.expect(Token.WHILE);

    const expression = this.expression();
    this.expect(Token.SEMI);

    return { type: "do", contents, expression };
  }

  if(): Statement {
    const positive = this.ifBranch();

    const elseIfs: IfBranch[] = [];
    let negative: Statement[] = [];
    while (this.match(Token.ELSE)) {
      if (this.match(Token.IF)) {
        elseIfs.push(this.ifBranch());
        continue;
      }

      negative = this.scope();
      break;
    }

    return { type: "if", positive, elseIfs, negative };
  }

  ifBranch(): IfBranch {
    const expression = this.expression();
    const contents = this.scope();

    return { expression, contents };
  }

  while(absolute: boolean): Statement {
    const expression = this.expression();
    const contents = this.scope();

    return { type: "while", absolute, expression, contents };
  }

  annotation(): Statement {
    this.expect(Token.LBRACKET);

    const annotations: string[] = [];
    while (!this.match(Token.RBRACKET)) annotations.push(this.expectName());

    this.expect(Token.FUNC);
    return this.func(annotations);
  }
}
