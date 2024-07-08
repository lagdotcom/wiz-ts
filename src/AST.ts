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

export interface ArrayExpression {
  type: "array";
  values: Expression[];
}

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
  | ArrayExpression
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

export interface FuncType {
  type: "func";
  args: FuncArg[];
  returns?: FuncReturn;
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

export type WizType = ArrayType | FuncType | NumericType | PointerType;

interface StatementBase {
  start: number;
  end: number;
}

export interface BankStatement extends StatementBase {
  type: "bank";
  name: string;
  address: number;
  wtype: Token;
  size: number;
}

export interface DeclarationStatement extends StatementBase {
  type: "declaration";
  extern: boolean;
  flavour: "const" | "var" | "writeonly";
  name: string;
  wtype?: WizType;
  address?: number;
  storage?: string;
  expression?: Expression;
}

export interface DoStatement extends StatementBase {
  type: "do";
  contents: Statement[];
  expression: Expression;
}

export interface ExpressionStatement extends StatementBase {
  type: "expression";
  expression: Expression;
}

export interface ForStatement extends StatementBase {
  type: "for";
  inline: boolean;
  loopVariable: string;
  loopStart: number;
  loopEnd: number;
  contents: Statement[];
}

interface FuncArg {
  name: string;
  wtype: WizType;
  storage?: string;
}

type FuncReturn = Omit<FuncArg, "name">;

export interface FuncStatement extends StatementBase {
  type: "func";
  annotations: string[];
  inline: boolean;
  name: string;
  args: FuncArg[];
  returns?: FuncReturn;
  contents: Statement[];
}

export interface GotoStatement extends StatementBase {
  type: "goto";
  absolute: boolean;
  destination: Expression;
  expression?: Expression;
}

interface IfBranch {
  expression: Expression;
  contents: Statement[];
  start: number;
  end: number;
}

export interface IfStatement extends StatementBase {
  type: "if";
  setup?: Statement[];
  positive: IfBranch;
  elseIfs: IfBranch[];
  negative: Statement[];
}

export interface ImportStatement extends StatementBase {
  type: "import";
  value: string;
}

export interface InStatement extends StatementBase {
  type: "in";
  area: string;
  address?: number;
  contents: Statement[];
}

export interface LabelStatement extends StatementBase {
  type: "label";
  name: string;
}

export interface LetStatement extends StatementBase {
  type: "let";
  name: string;
  expression: Expression;
}

export interface NamespaceStatement extends StatementBase {
  type: "namespace";
  name: string;
  contents: Statement[];
}

export interface WhileStatement extends StatementBase {
  type: "while";
  absolute: boolean;
  expression: Expression;
  contents: Statement[];
}

export type Statement =
  | BankStatement
  | DeclarationStatement
  | DoStatement
  | ExpressionStatement
  | ForStatement
  | FuncStatement
  | GotoStatement
  | IfStatement
  | ImportStatement
  | InStatement
  | LabelStatement
  | LetStatement
  | NamespaceStatement
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
      `${this.filename} [line ${t.line}, col ${t.col}] ${message}, got ${t.type} "${t.value}"`,
    );
  }

  expect(...types: Token[]) {
    const t = this.next();
    if (!types.includes(t.type)) throw this.die(`expected ${types.join("/")}`);

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

    switch (t.type) {
      case Token.IMPORT:
        return this.import();
      case Token.IN:
        return this.in();
      case Token.NAMESPACE:
        return this.namespace();
      case Token.LET:
        return this.let();
      case Token.EXTERN:
        return this.extern();
      case Token.VAR:
        return this.var();
      case Token.CONST:
        return this.const();
      case Token.WRITEONLY:
        return this.writeonly();
      case Token.BANK:
        return this.bank();
      case Token.INLINE:
        return this.inline();
      case Token.FUNC:
        return this.func();
      case Token.DO:
        return this.do();
      case Token.IF:
        return this.if();

      case Token.ANNOTATION:
        return this.annotation();

      case Token.WHILE:
      case Token.WHILE_ABS:
        return this.while(t.type === Token.WHILE_ABS);

      case Token.GOTO:
      case Token.GOTO_ABS:
        return this.goto(t.type === Token.GOTO_ABS);
    }

    if (t.type === Token.NAME && this.match(Token.COLON)) {
      const start = this.i - 2;
      const end = this.i;
      return { type: "label", name: t.value, start, end };
    }

    this.rewind();
    const start = this.i;
    const expression = this.expression();
    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "expression", expression, start, end };
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

    switch (t.type) {
      case Token.NUMBER:
        return { type: "number", value: t.valueAsNumber };
      case Token.NAME:
        return { type: "name", value: t.value };
      case Token.TRUE:
        return { type: "bool", value: true };
      case Token.FALSE:
        return { type: "bool", value: false };
      case Token.EMBED:
        return { type: "embed", value: this.expectString() };

      case Token.LPAREN: {
        const expr = this.expression();
        this.expect(Token.RPAREN);
        return { type: "group", expr };
      }

      case Token.LBRACKET: {
        const values: Expression[] = [];
        while (!this.match(Token.RBRACKET)) {
          if (values.length) this.expect(Token.COMMA);
          values.push(this.expression());
        }

        return { type: "array", values };
      }
    }

    throw this.die(`invalid primary`);
  }

  import(): Statement {
    const start = this.i - 1;
    const value = this.expectString();
    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "import", value, start, end };
  }

  in(): Statement {
    const start = this.i - 1;
    const area = this.expectName();

    let address: number | undefined;
    if (this.match(Token.AT)) address = this.expectNumber();

    const contents = this.scope();
    const end = this.i;

    return { type: "in", area, address, contents, start, end };
  }

  namespace(): Statement {
    const start = this.i - 1;
    const name = this.expectName();
    const contents = this.scope();
    const end = this.i;

    return { type: "namespace", name, contents, start, end };
  }

  let(): Statement {
    const start = this.i - 1;
    const name = this.expectName();
    this.expect(Token.ASSIGN);
    const expression = this.expression();
    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "let", name, expression, start, end };
  }

  declaration(
    extern: boolean,
    flavour: "const" | "var" | "writeonly",
  ): Statement {
    const start = this.i - (extern ? 2 : 1);
    const name = this.expectName();

    let address: number | undefined;
    if (this.match(Token.AT)) address = this.expectNumber();

    let wtype: WizType | undefined;
    if (this.match(Token.COLON)) wtype = this.type();

    let storage: string | undefined;
    if (this.match(Token.IN)) storage = this.expectName();

    let expression: Expression | undefined;
    if (this.match(Token.ASSIGN)) expression = this.expression();

    this.expect(Token.SEMI);
    const end = this.i;

    return {
      type: "declaration",
      extern,
      flavour,
      name,
      address,
      wtype,
      storage,
      expression,
      start,
      end,
    };
  }

  var(extern = false): Statement {
    return this.declaration(extern, "var");
  }

  const(extern = false): Statement {
    return this.declaration(extern, "const");
  }

  writeonly(extern = false): Statement {
    return this.declaration(extern, "writeonly");
  }

  extern(): Statement {
    const t = this.expect(Token.VAR, Token.CONST, Token.WRITEONLY);

    if (t.type === Token.VAR) return this.var(true);
    if (t.type === Token.CONST) return this.const(true);
    if (t.type === Token.WRITEONLY) return this.writeonly(true);

    throw new Error("please");
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

    if (this.match(Token.FUNC)) {
      this.expect(Token.LPAREN);
      const args = this.arguments();

      let returns: FuncReturn | undefined;
      if (this.match(Token.COLON)) {
        const wtype = this.type();

        let storage: string | undefined;
        if (this.match(Token.IN)) storage = this.expectName();

        returns = { wtype, storage };
      }

      return { type: "func", args, returns };
    }

    const t = this.next();
    if (numericTypes.includes(t.value as NumericTypeString))
      return { type: t.value as NumericTypeString };

    throw this.die(`expected type`);
  }

  func({
    annotations = [],
    inline = false,
    start = this.i - 1,
  }: {
    annotations?: string[];
    inline?: boolean;
    start?: number;
  } = {}): Statement {
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

    const contents = this.scope();
    const end = this.i;

    return {
      type: "func",
      annotations,
      inline,
      name,
      args,
      returns,
      contents,
      start,
      end,
    };
  }

  arguments(): FuncArg[] {
    const value: FuncArg[] = [];

    while (!this.match(Token.RPAREN)) {
      if (value.length) this.expect(Token.COMMA);

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
    const start = this.i - 1;
    const contents = this.scope();
    this.expect(Token.WHILE);

    const expression = this.expression();
    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "do", contents, expression, start, end };
  }

  if(): Statement {
    const start = this.i - 1;

    // this is kinda fragile
    let setup: Statement[] | undefined;
    if (this.match(Token.LBRACE)) {
      this.rewind();
      setup = this.scope();
      this.expect(Token.LOGIC_AND);
    }

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

    const end = this.i;
    return { type: "if", setup, positive, elseIfs, negative, start, end };
  }

  ifBranch(): IfBranch {
    const start = this.i;
    const expression = this.expression();
    const contents = this.scope();
    const end = this.i;

    return { expression, contents, start, end };
  }

  while(absolute: boolean): Statement {
    const start = this.i - 1;
    const expression = this.expression();
    const contents = this.scope();
    const end = this.i;

    return { type: "while", absolute, expression, contents, start, end };
  }

  goto(absolute: boolean): Statement {
    const start = this.i - 1;
    const destination = this.expression();

    let expression: Expression | undefined;
    if (this.match(Token.IF)) expression = this.expression();

    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "goto", absolute, destination, expression, start, end };
  }

  annotation(): Statement {
    const start = this.i - 1;
    this.expect(Token.LBRACKET);

    const annotations: string[] = [];
    while (!this.match(Token.RBRACKET)) annotations.push(this.expectName());

    this.expect(Token.FUNC);
    return this.func({ annotations, start });
  }

  bank(): Statement {
    const start = this.i - 1;
    const name = this.expectName();
    this.expect(Token.AT);
    const address = this.expectNumber();
    this.expect(Token.COLON);
    this.expect(Token.LBRACKET);
    const type = this.expect(Token.CONSTDATA, Token.VARDATA);
    this.expect(Token.SEMI);
    const size = this.expectNumber();
    this.expect(Token.RBRACKET);
    this.expect(Token.SEMI);
    const end = this.i;

    return { type: "bank", name, address, wtype: type.type, size, start, end };
  }

  inline(): Statement {
    const start = this.i - 1;

    if (this.match(Token.FOR)) return this.for({ inline: true, start });
    if (this.match(Token.FUNC)) return this.func({ inline: true, start });

    throw this.die(`expected for/func`);
  }

  for({
    inline = false,
    start = this.i - 1,
  }: {
    inline?: boolean;
    start?: number;
  }): Statement {
    this.expect(Token.LET);
    const loopVariable = this.expectName();
    this.expect(Token.IN);
    const loopStart = this.expectNumber();
    this.expect(Token.RANGE);
    const loopEnd = this.expectNumber();
    const contents = this.scope();

    const end = this.i;
    return {
      type: "for",
      inline,
      start,
      end,
      loopVariable,
      loopStart,
      loopEnd,
      contents,
    };
  }
}
