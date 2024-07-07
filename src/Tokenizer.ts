export enum Token {
  NAME = "NAME",
  NUMBER = "NUMBER",
  STRING = "STRING",

  GOTO_ABS = "GOTO_ABS",
  WHILE_ABS = "WHILE_ABS",
  AS = "AS",
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

  DECREMENT = "DECREMENT",
  MINUS = "MINUS",
  MINUS_CARRY = "MINUS_CARRY",
  MINUS_EQUAL = "MINUS_EQUAL",
  COMMA = "COMMA",
  SEMI = "SEMI",
  COLON = "COLON",
  NOT = "NOT",
  NOT_EQUAL = "NOT_EQUAL",
  RANGE = "RANGE",
  DOT = "DOT",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACKET = "LBRACKET",
  RBRACKET = "RBRACKET",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",
  AT = "AT",
  MUL = "MUL",
  MUL_EQUAL = "MUL_EQUAL",
  DIV = "DIV",
  DIV_EQUAL = "DIV_EQUAL",
  AND = "AND",
  LOGIC_AND = "LOGIC_AND",
  AND_EQUAL = "AND_EQUAL",
  BANK_OF = "BANK_OF",
  ANNOTATION = "ANNOTATION",
  MODULO = "MODULO",
  EXP = "EXP",
  EXP_EQUAL = "EXP_EQUAL",
  PLUS = "PLUS",
  PLUS_CARRY = "PLUS_CARRY",
  PLUS_EQUAL = "PLUS_EQUAL",
  INCREMENT = "INCREMENT",
  LOW_OF = "LOW_OF",
  LESS = "LESS",
  ALSHIFT = "ALSHIFT",
  LLSHIFT = "LLSHIFT",
  LROT = "LROT",
  LROT_CARRY = "LROT_CARRY",
  ALSHIFT_EQUAL = "ALSHIFT_EQUAL",
  LLSHIFT_EQUAL = "LLSHIFT_EQUAL",
  LROT_EQUAL = "LROT_EQUAL",
  LROT_CARRY_EQUAL = "LROT_CARRY_EQUAL",
  LESS_EQUAL = "LESS_EQUAL",
  EQUAL = "EQUAL",
  EQUAL_EQUAL = "EQUAL_EQUAL",
  HIGH_OF = "HIGH_OF",
  GREATER = "GREATER",
  GREATER_EQUAL = "GREATER_EQUAL",
  ARSHIFT = "ARSHIFT",
  LRSHIFT = "LRSHIFT",
  RROT = "RROT",
  RROT_CARRY = "RROT_CARRY",
  ARSHIFT_EQUAL = "ARSHIFT_EQUAL",
  LRSHIFT_EQUAL = "LRSHIFT_EQUAL",
  RROT_EQUAL = "RROT_EQUAL",
  RROT_CARRY_EQUAL = "RROT_CARRY_EQUAL",
  OR = "OR",
  OR_EQUAL = "OR_EQUAL",
  LOGIC_OR = "LOGIC_OR",
  BITWISE_NEGATE = "BITWISE_NEGATE",
  BIT_INDEX = "BIT_INDEX",
}

const keywords = [
  "^goto",
  "^while",
  "as",
  "bool",
  "break",
  "by",
  "config",
  "const",
  "continue",
  "do",
  "else",
  "embed",
  "enum",
  "false",
  "far",
  "for",
  "func",
  "goto",
  "i16",
  "i24",
  "i32",
  "i64",
  "i8",
  "if",
  "import",
  "in",
  "inline",
  "let",
  "namespace",
  "struct",
  "true",
  "typealias",
  "u16",
  "u24",
  "u32",
  "u64",
  "u8",
  "union",
  "var",
  "while",
] as const;
export type Keyword = (typeof keywords)[number];

const KeywordTokens = {
  "^goto": Token.GOTO_ABS,
  "^while": Token.WHILE_ABS,
  as: Token.AS,
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
};

const isKeyword = (s: string): s is Keyword => keywords.includes(s as Keyword);

const punctuation = [
  "--",
  "-",
  "-#",
  "-=",
  ",",
  ";",
  ":",
  "!",
  "!=",
  "..",
  ".",
  "(",
  ")",
  "[",
  "]",
  "{",
  "}",
  "@",
  "*",
  "*=",
  "/",
  "/=",
  "&",
  "&&",
  "&=",
  "#:",
  "#",
  "%",
  "^",
  "^=",
  "+",
  "+#",
  "++",
  "+=",
  "<:",
  "<",
  "<<",
  "<<<",
  "<<<<",
  "<<<<#",
  "<<<<#=",
  "<<<<=",
  "<<<=",
  "<<=",
  "<=",
  "=",
  "==",
  ">:",
  ">",
  ">=",
  ">>",
  ">>=",
  ">>>",
  ">>>=",
  ">>>>",
  ">>>>#",
  ">>>>#=",
  ">>>>=",
  "|",
  "|=",
  "||",
  "~",
  "$",
];
const punctuationBeginningChars = new Set(punctuation.map((p) => p[0]));

const PunctuationTokens = {
  "--": Token.DECREMENT,
  "-": Token.MINUS,
  "-#": Token.MINUS_CARRY,
  "-=": Token.MINUS_EQUAL,
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
  "*=": Token.MUL_EQUAL,
  "/": Token.DIV,
  "/=": Token.DIV_EQUAL,
  "&": Token.AND,
  "&&": Token.LOGIC_AND,
  "&=": Token.AND_EQUAL,
  "#:": Token.BANK_OF,
  "#": Token.ANNOTATION,
  "%": Token.MODULO,
  "^": Token.EXP,
  "^=": Token.EXP_EQUAL,
  "+": Token.PLUS,
  "+#": Token.PLUS_CARRY,
  "++": Token.INCREMENT,
  "+=": Token.PLUS_EQUAL,
  "<:": Token.LOW_OF,
  "<": Token.LESS,
  "<<": Token.ALSHIFT,
  "<<<": Token.LLSHIFT,
  "<<<<": Token.LROT,
  "<<<<#": Token.LROT_CARRY,
  "<<<<#=": Token.LROT_CARRY_EQUAL,
  "<<<<=": Token.LROT_EQUAL,
  "<<<=": Token.LLSHIFT_EQUAL,
  "<<=": Token.ALSHIFT_EQUAL,
  "<=": Token.LESS_EQUAL,
  "=": Token.EQUAL,
  "==": Token.EQUAL_EQUAL,
  ">:": Token.HIGH_OF,
  ">": Token.GREATER,
  ">=": Token.GREATER_EQUAL,
  ">>": Token.ARSHIFT,
  ">>=": Token.ARSHIFT_EQUAL,
  ">>>": Token.LRSHIFT,
  ">>>=": Token.LRSHIFT_EQUAL,
  ">>>>": Token.RROT,
  ">>>>#": Token.RROT_CARRY,
  ">>>>#=": Token.RROT_CARRY_EQUAL,
  ">>>>=": Token.RROT_EQUAL,
  "|": Token.OR,
  "|=": Token.OR_EQUAL,
  "||": Token.LOGIC_OR,
  "~": Token.BITWISE_NEGATE,
  $: Token.BIT_INDEX,
};

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

    if (ch === "=") return this.emit(Token.EXP_EQUAL, "^=");

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
