export enum Token {
  NAME = "NAME",
  NUMBER = "NUMBER",
  STRING = "STRING",

  GOTO_ABS = "GOTO_ABS",
  WHILE_ABS = "WHILE_ABS",
  AS = "AS",
  BANK = "BANK",
  BOOL = "BOOL",
  BREAK = "BREAK",
  BY = "BY",
  CONFIG = "CONFIG",
  CONST = "CONST",
  CONTINUE = "CONTINUE",
  DO = "DO",
  ELSE = "ELSE",
  EMBED = "EMBED",
  ENUM = "ENUM",
  EXTERN = "EXTERN",
  FALSE = "FALSE",
  FAR = "FAR",
  FOR = "FOR",
  FUNC = "FUNC",
  GOTO = "GOTO",
  I16 = "I16",
  I24 = "I24",
  I32 = "I32",
  I64 = "I64",
  I8 = "I8",
  IF = "IF",
  IMPORT = "IMPORT",
  IN = "IN",
  INLINE = "INLINE",
  LET = "LET",
  NAMESPACE = "NAMESPACE",
  STRUCT = "STRUCT",
  TRUE = "TRUE",
  TYPEALIAS = "TYPEALIAS",
  U16 = "U16",
  U24 = "U24",
  U32 = "U32",
  U64 = "U64",
  U8 = "U8",
  UNION = "UNION",
  VAR = "VAR",
  WHILE = "WHILE",
  WRITEONLY = "WRITEONLY",

  ALSHIFT = "ALSHIFT",
  ALSHIFT_ASSIGN = "ALSHIFT_ASSIGN",
  AND = "AND",
  AND_ASSIGN = "AND_ASSIGN",
  ANNOTATION = "ANNOTATION",
  ARSHIFT = "ARSHIFT",
  ARSHIFT_ASSIGN = "ARSHIFT_ASSIGN",
  ASSIGN = "EQUAL",
  AT = "AT",
  BANK_OF = "BANK_OF",
  BIT_INDEX = "BIT_INDEX",
  BITWISE_NEGATE = "BITWISE_NEGATE",
  COLON = "COLON",
  COMMA = "COMMA",
  DECREMENT = "DECREMENT",
  DIV = "DIV",
  DIV_ASSIGN = "DIV_ASSIGN",
  DOT = "DOT",
  EQUAL_EQUAL = "EQUAL_EQUAL",
  EXP = "EXP",
  EXP_ASSIGN = "EXP_ASSIGN",
  GREATER = "GREATER",
  GREATER_EQUAL = "GREATER_EQUAL",
  HIGH_OF = "HIGH_OF",
  INCREMENT = "INCREMENT",
  LBRACE = "LBRACE",
  LBRACKET = "LBRACKET",
  LESS = "LESS",
  LESS_EQUAL = "LESS_EQUAL",
  LLSHIFT = "LLSHIFT",
  LLSHIFT_ASSIGN = "LLSHIFT_ASSIGN",
  LOGIC_AND = "LOGIC_AND",
  LOGIC_OR = "LOGIC_OR",
  LOW_OF = "LOW_OF",
  LPAREN = "LPAREN",
  LROT = "LROT",
  LROT_ASSIGN = "LROT_ASSIGN",
  LROT_CARRY = "LROT_CARRY",
  LROT_CARRY_ASSIGN = "LROT_CARRY_ASSIGN",
  LRSHIFT = "LRSHIFT",
  LRSHIFT_ASSIGN = "LRSHIFT_ASSIGN",
  MINUS = "MINUS",
  MINUS_ASSIGN = "MINUS_ASSIGN",
  MINUS_CARRY = "MINUS_CARRY",
  MODULO = "MODULO",
  MUL = "MUL",
  MUL_ASSIGN = "MUL_ASSIGN",
  NOT = "NOT",
  NOT_EQUAL = "NOT_EQUAL",
  OR = "OR",
  OR_ASSIGN = "OR_EQUAL",
  PLUS = "PLUS",
  PLUS_ASSIGN = "PLUS_ASSIGN",
  PLUS_CARRY = "PLUS_CARRY",
  RANGE = "RANGE",
  RBRACE = "RBRACE",
  RBRACKET = "RBRACKET",
  RPAREN = "RPAREN",
  RROT = "RROT",
  RROT_ASSIGN = "RROT_ASSIGN",
  RROT_CARRY = "RROT_CARRY",
  RROT_CARRY_ASSIGN = "RROT_CARRY_ASSIGN",
  SEMI = "SEMI",
}

export const TypeTokens = [
  Token.BOOL,
  Token.U16,
  Token.U24,
  Token.U32,
  Token.U64,
  Token.U8,
  Token.I16,
  Token.I24,
  Token.I32,
  Token.I64,
  Token.I8,
] as const;

export const AssignmentTokens = [
  Token.ASSIGN,
  Token.OR_ASSIGN,
  Token.EXP_ASSIGN,
  Token.AND_ASSIGN,
  Token.DIV_ASSIGN,
  Token.MUL_ASSIGN,
  Token.PLUS_ASSIGN,
  Token.LROT_ASSIGN,
  Token.RROT_ASSIGN,
  Token.MINUS_ASSIGN,
  Token.ALSHIFT_ASSIGN,
  Token.ARSHIFT_ASSIGN,
  Token.LLSHIFT_ASSIGN,
  Token.LRSHIFT_ASSIGN,
  Token.LROT_CARRY_ASSIGN,
  Token.RROT_CARRY_ASSIGN,
] as const;

export const ComparisonTokens = [
  Token.GREATER,
  Token.GREATER_EQUAL,
  Token.LESS,
  Token.LESS_EQUAL,
] as const;

export const ArithmeticTermTokens = [Token.PLUS, Token.MINUS] as const;

export const BitwiseTokens = [
  Token.AND,
  Token.OR,
  Token.EXP,
  Token.BIT_INDEX,
] as const;

export const ArithmeticFactorTokens = [Token.MUL, Token.DIV] as const;

export const BitShiftTokens = [
  Token.ALSHIFT,
  Token.ARSHIFT,
  Token.LLSHIFT,
  Token.LRSHIFT,
  Token.RROT,
  Token.RROT_CARRY,
  Token.LROT,
  Token.LROT_CARRY,
] as const;

export const UnaryPrefixTokens = [
  Token.MINUS,
  Token.PLUS,
  Token.NOT,
  Token.BITWISE_NEGATE,
  Token.AND,
  Token.MUL,
  Token.INCREMENT,
  Token.DECREMENT,
  Token.BANK_OF,
  Token.HIGH_OF,
  Token.LOW_OF,
] as const;

export const UnaryPostfixTokens = [Token.INCREMENT, Token.DECREMENT] as const;

const KeywordTokens = {
  "^goto": Token.GOTO_ABS,
  "^while": Token.WHILE_ABS,
  as: Token.AS,
  bank: Token.BANK,
  bool: Token.BOOL,
  break: Token.BREAK,
  by: Token.BY,
  config: Token.CONFIG,
  const: Token.CONST,
  continue: Token.CONTINUE,
  do: Token.DO,
  else: Token.ELSE,
  embed: Token.EMBED,
  enum: Token.ENUM,
  extern: Token.EXTERN,
  false: Token.FALSE,
  far: Token.FAR,
  for: Token.FOR,
  func: Token.FUNC,
  goto: Token.GOTO,
  i16: Token.I16,
  i24: Token.I24,
  i32: Token.I32,
  i64: Token.I64,
  i8: Token.I8,
  if: Token.IF,
  import: Token.IMPORT,
  in: Token.IN,
  inline: Token.INLINE,
  let: Token.LET,
  namespace: Token.NAMESPACE,
  struct: Token.STRUCT,
  true: Token.TRUE,
  typealias: Token.TYPEALIAS,
  u16: Token.U16,
  u24: Token.U24,
  u32: Token.U32,
  u64: Token.U64,
  u8: Token.U8,
  union: Token.UNION,
  var: Token.VAR,
  while: Token.WHILE,
  writeonly: Token.WRITEONLY,
};
type Keyword = keyof typeof KeywordTokens;
const isKeyword = (s: string): s is Keyword => !!KeywordTokens[s as Keyword];

const PunctuationTokens = {
  "--": Token.DECREMENT,
  "-": Token.MINUS,
  "-#": Token.MINUS_CARRY,
  "-=": Token.MINUS_ASSIGN,
  ",": Token.COMMA,
  ";": Token.SEMI,
  ":": Token.COLON,
  "!": Token.NOT,
  "!=": Token.NOT_EQUAL,
  "..": Token.RANGE,
  ".": Token.DOT,
  "(": Token.LPAREN,
  ")": Token.RPAREN,
  "[": Token.LBRACKET,
  "]": Token.RBRACKET,
  "{": Token.LBRACE,
  "}": Token.RBRACE,
  "@": Token.AT,
  "*": Token.MUL,
  "*=": Token.MUL_ASSIGN,
  "/": Token.DIV,
  "/=": Token.DIV_ASSIGN,
  "&": Token.AND,
  "&&": Token.LOGIC_AND,
  "&=": Token.AND_ASSIGN,
  "#:": Token.BANK_OF,
  "#": Token.ANNOTATION,
  "%": Token.MODULO,
  "^": Token.EXP,
  "^=": Token.EXP_ASSIGN,
  "+": Token.PLUS,
  "+#": Token.PLUS_CARRY,
  "++": Token.INCREMENT,
  "+=": Token.PLUS_ASSIGN,
  "<:": Token.LOW_OF,
  "<": Token.LESS,
  "<<": Token.ALSHIFT,
  "<<<": Token.LLSHIFT,
  "<<<<": Token.LROT,
  "<<<<#": Token.LROT_CARRY,
  "<<<<#=": Token.LROT_CARRY_ASSIGN,
  "<<<<=": Token.LROT_ASSIGN,
  "<<<=": Token.LLSHIFT_ASSIGN,
  "<<=": Token.ALSHIFT_ASSIGN,
  "<=": Token.LESS_EQUAL,
  "=": Token.ASSIGN,
  "==": Token.EQUAL_EQUAL,
  ">:": Token.HIGH_OF,
  ">": Token.GREATER,
  ">=": Token.GREATER_EQUAL,
  ">>": Token.ARSHIFT,
  ">>=": Token.ARSHIFT_ASSIGN,
  ">>>": Token.LRSHIFT,
  ">>>=": Token.LRSHIFT_ASSIGN,
  ">>>>": Token.RROT,
  ">>>>#": Token.RROT_CARRY,
  ">>>>#=": Token.RROT_CARRY_ASSIGN,
  ">>>>=": Token.RROT_ASSIGN,
  "|": Token.OR,
  "|=": Token.OR_ASSIGN,
  "||": Token.LOGIC_OR,
  "~": Token.BITWISE_NEGATE,
  $: Token.BIT_INDEX,
};
const punctuation = Object.keys(PunctuationTokens);
const punctuationBeginningChars = new Set(punctuation.map((p) => p[0]));

export interface TokenData {
  type: Token;
  value: string;
  valueAsNumber: number;
  line: number;
  col: number;
}

const lf = "\n";

const charSet = (s: string) => new Set(s.split(""));

const binaryChars = charSet("01");
const decimalChars = charSet("0123456789");
const hexadecimalChars = charSet("0123456789abcdefABCDEF");
const nameChars = charSet(
  "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_1234567890",
);

const escapeSequences = new Map([
  ['"', '"'],
  ["\\", "\\"],
  ["b", "\b"],
  ["f", "\f"],
  ["n", "\n"],
  ["r", "\r"],
  ["t", "\t"],
  ["v", "\v"],
]);

export default class Tokenizer {
  index: number;
  line: number;
  colCurrent: number;
  col: number;

  constructor(
    public filename: string,
    public src: string,
  ) {
    this.index = 0;
    this.line = 1;
    this.colCurrent = 1;
    this.col = 1;
  }

  get eof() {
    return this.index >= this.src.length;
  }

  emit(type: Token, value: string, valueAsNumber = NaN): TokenData {
    return { type, line: this.line, col: this.col, value, valueAsNumber };
  }

  next() {
    this.colCurrent++;
    return this.src[this.index++];
  }

  rewind() {
    this.colCurrent--;
    this.index--;
  }

  *evaluate() {
    while (!this.eof) {
      this.col = this.colCurrent;
      const ch = this.next();

      switch (ch) {
        case lf:
          this.line++;
          this.colCurrent = 1;
          continue;

        case " ":
        case "\t":
        case "\r":
          continue;

        case "^":
          yield this.caret();
          continue;

        case "0":
          yield this.zero();
          continue;

        case '"':
          yield this.string();
          continue;

        // TODO '-' handling for negative numbers / unary minus
      }

      if (decimalChars.has(ch)) yield this.numberInBase(decimalChars, 10, ch);
      else if (nameChars.has(ch)) yield this.name(ch);
      else if (ch === "/") {
        const result = this.slash();
        if (result) yield result;
      } else if (punctuationBeginningChars.has(ch)) yield this.punctuation(ch);
      else throw new Error(`Invalid character: ${ch}`);
    }
  }

  slash() {
    const ch = this.next();

    if (ch === "/") {
      // eslint-disable-next-line no-empty
      while (this.next() !== lf && !this.eof) {}
      this.rewind();
      return;
    }

    this.rewind();
    return this.punctuation("/");
  }

  caret(): TokenData {
    const ch = this.next();
    // this is kinda dangerous
    if (ch === "g" || ch === "w") return this.name("^" + ch);

    if (ch === "=") return this.emit(Token.EXP_ASSIGN, "^=");

    this.rewind();
    return this.emit(Token.EXP, "^");
  }

  zero(): TokenData {
    const ch = this.next();
    if (ch === "b") return this.numberInBase(binaryChars, 2);
    if (ch === "x") return this.numberInBase(hexadecimalChars, 16);

    this.rewind();
    return this.numberInBase(decimalChars, 10, "0");
  }

  numberInBase(chars: Set<string>, base: number, accumulator = ""): TokenData {
    let reading = true;

    while (reading) {
      const ch = this.next();
      if (chars.has(ch)) accumulator += ch;
      else {
        reading = false;
        this.rewind();
      }
    }

    const value = parseInt(accumulator, base);
    if (isNaN(value))
      throw new Error(`invalid number in base ${base}: ${accumulator}`);

    return this.emit(Token.NUMBER, accumulator, value);
  }

  name(accumulator: string): TokenData {
    let reading = true;

    while (reading) {
      const ch = this.next();
      if (nameChars.has(ch)) accumulator += ch;
      else {
        reading = false;
        this.rewind();
      }
    }

    return isKeyword(accumulator)
      ? this.emit(KeywordTokens[accumulator], accumulator)
      : this.emit(Token.NAME, accumulator);
  }

  string(): TokenData {
    let accumulator = "";
    let reading = true;
    let quote = false;

    while (reading) {
      const ch = this.next();

      if (quote) {
        quote = false;

        const escaped = escapeSequences.get(ch);
        if (escaped) accumulator += escaped;
        else accumulator += "\\" + ch;
      } else if (ch === "\\") {
        quote = true;
        continue;
      } else if (ch === '"') {
        reading = false;
      } else accumulator += ch;
    }

    return this.emit(Token.STRING, accumulator);
  }

  punctuation(accumulator: string): TokenData {
    let reading = true;

    while (reading) {
      const ch = this.next();
      const p = accumulator + ch;
      if (punctuation.includes(p)) accumulator += ch;
      else {
        reading = false;
        this.rewind();
      }
    }

    return this.emit(
      PunctuationTokens[accumulator as keyof typeof PunctuationTokens],
      accumulator,
    );
  }
}
