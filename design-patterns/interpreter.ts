interface Expression {
  interpret(context: Record<string, any>): boolean;
}

class PropertyEqualsExpression implements Expression {
  constructor(private prop: string, private expected: any) {}
  interpret(context: Record<string, any>): boolean {
    return context[this.prop] === this.expected;
  }
}

class AndExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Record<string, any>): boolean {
    return this.left.interpret(context) && this.right.interpret(context);
  }
}

class OrExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}
  interpret(context: Record<string, any>): boolean {
    return this.left.interpret(context) || this.right.interpret(context);
  }
}

// --- Usage: filtering a product list

export type Product = {
  name: string;
  color: string;
  size: string;
  price: number;
};

const products: Product[] = [
  { name: 'T‑shirt', color: 'red', size: 'M', price: 25 },
  { name: 'Hoodie', color: 'blue', size: 'L', price: 50 },
  { name: 'Cap', color: 'red', size: 'S', price: 15 },
  { name: 'Shoes', color: 'red', size: 'L', price: 80 },
];

// Build rule: color == 'red' AND (size == 'M' OR size == 'L')
const isRed = new PropertyEqualsExpression('color', 'red');
const sizeM = new PropertyEqualsExpression('size', 'M');
const sizeL = new PropertyEqualsExpression('size', 'L');
const sizeMOrL = new OrExpression(sizeM, sizeL);
const rule = new AndExpression(isRed, sizeMOrL);

// Apply interpreter to filter
const result = products.filter(p => rule.interpret(p));

console.log(result);
// /*
// [
//   { name: "T‑shirt", color: "red", size: "M", price: 25 },
//   { name: "Shoes",   color: "red", size: "L", price: 80 }
// ]
// */

// The Interpreter Pattern Concept

// interface IAbstractExpression {
//   interpret(): number;
// }

// class Numeral implements IAbstractExpression {
//   value: number;

//   constructor(value: string) {
//     this.value = parseInt(value);
//   }

//   interpret(): number {
//     return this.value;
//   }
// }

// class Add implements IAbstractExpression {
//   left: IAbstractExpression;
//   right: IAbstractExpression;

//   constructor(left: IAbstractExpression, right: IAbstractExpression) {
//     this.left = left;
//     this.right = right;
//   }

//   interpret() {
//     return this.left.interpret() + this.right.interpret();
//   }
// }

// class Subtract implements IAbstractExpression {
//   left: IAbstractExpression;
//   right: IAbstractExpression;

//   constructor(left: IAbstractExpression, right: IAbstractExpression) {
//     this.left = left;
//     this.right = right;
//   }

//   interpret() {
//     return this.left.interpret() - this.right.interpret();
//   }
// }

// // The Client
// const SENTENCE = '5 + 4 - 3 + 7 - 2';
// console.log(SENTENCE);

// // Split the sentence into individual expressions that will be added to
// // an Abstract Syntax Tree(AST) as Terminal and Non - Terminal expressions
// const TOKENS = SENTENCE.split(' ');
// console.log(JSON.stringify(TOKENS));

// const AST: IAbstractExpression[] = []; // An array of AbstractExpressions
// AST.push(new Add(new Numeral(TOKENS[0]), new Numeral(TOKENS[2]))); // 5 + 4
// AST.push(new Subtract(AST[0], new Numeral(TOKENS[4]))); // ^ - 3
// AST.push(new Add(AST[1], new Numeral(TOKENS[6]))); // ^ + 7
// AST.push(new Subtract(AST[2], new Numeral(TOKENS[8]))); // ^ - 2

// const AST_ROOT = AST.pop();

// console.log((AST_ROOT as IAbstractExpression).interpret());

// console.dir(AST_ROOT, { depth: null });
