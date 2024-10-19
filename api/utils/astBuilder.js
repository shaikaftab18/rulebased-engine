class Node {
  constructor(type, value, left = null, right = null) {
    this.type = type;
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const operators = {
  AND: true,
  OR: true,
};

const comparators = {
  '>': true,
  '<': true,
  '=': true,
};

const buildAst = (ruleString) => {
  // Remove surrounding quotes if present
  if ((ruleString.startsWith('"') && ruleString.endsWith('"')) || 
      (ruleString.startsWith("'") && ruleString.endsWith("'"))) {
    ruleString = ruleString.slice(1, -1);
  }

  const tokens = tokenize(ruleString);
  if (!tokens.length) {
    throw new Error('Invalid rule string');
  }

  const ast = parseTokens(tokens);
  return ast;
};

const tokenize = (ruleString) => {
  const tokens = [];
  const regex = /\(|\)|AND|OR|>|<|=|[0-9]+(?:\.[0-9]+)?|[\w]+|"[^"]*"|'[^']*'/g;
  let match;

  while ((match = regex.exec(ruleString))) {
    tokens.push(match[0].trim());
  }

  console.log('Tokens:', tokens); // Debugging log
  return tokens;
};

const parseTokens = (tokens) => {
  const output = [];
  const operatorsStack = [];

  for (const token of tokens) {
    if (token === '(') {
      operatorsStack.push(token);
    } else if (token === ')') {
      while (operatorsStack.length && operatorsStack[operatorsStack.length - 1] !== '(') {
        output.push(operatorsStack.pop());
      }
      operatorsStack.pop(); // Remove '('
    } else if (token in operators || token in comparators) {
      while (operatorsStack.length && 
             (operatorsStack[operatorsStack.length - 1] in operators || 
              operatorsStack[operatorsStack.length - 1] in comparators)) {
        output.push(operatorsStack.pop());
      }
      operatorsStack.push(token);
    } else {
      output.push(token);
    }
  }

  while (operatorsStack.length) {
    output.push(operatorsStack.pop());
  }

  const astStack = [];
  for (const token of output) {
    if (token in operators || token in comparators) {
      const right = astStack.pop();
      const left = astStack.pop();
      if (!left || !right) {
        throw new Error('Invalid rule string: missing operands');
      }
      astStack.push(new Node('operator', token, left, right));
    } else {
      astStack.push(new Node('operand', token));
    }
  }

  if (astStack.length !== 1) {
    throw new Error('Invalid rule string: unbalanced expression');
  }

  console.log('AST:', JSON.stringify(astStack[0], null, 2)); // Debugging log
  return astStack[0];
};

const combineAsts = (asts) => {
  let combinedAst = new Node('operator', 'AND', asts[0], asts[1]);
  for (let i = 2; i < asts.length; i++) {
    combinedAst = new Node('operator', 'AND', combinedAst, asts[i]);
  }
  return combinedAst;
};

const evaluateAst = (ast, data) => {
  switch (ast.type) {
    case 'operator':
      if (ast.value === 'AND') {
        return evaluateAst(ast.left, data) && evaluateAst(ast.right, data);
      } else if (ast.value === 'OR') {
        return evaluateAst(ast.left, data) || evaluateAst(ast.right, data);
      }

      const leftValue = evaluateAst(ast.left, data);
      const rightValue = evaluateAst(ast.right, data);
      console.log(`Evaluating: ${leftValue} ${ast.value} ${rightValue}`); // Debugging log

      switch (ast.value) {
        case '=':
          return leftValue === rightValue;
        case '>':
          return leftValue > rightValue;
        case '<':
          return leftValue < rightValue;
        default:
          throw new Error(`Unknown operator: ${ast.value}`);
      }

    case 'operand':
      // Handle string literals and numeric values
      if (ast.value.startsWith("'") && ast.value.endsWith("'")) {
        return ast.value.replace(/^['"]|['"]$/g, ''); // Return string literal without quotes
      } else if (!isNaN(ast.value)) {
        return parseFloat(ast.value); // Return numeric value
      } else {
        return data[ast.value]; // Return variable value from data
      }

    default:
      return false;
  }
};

module.exports = {
  buildAst,
  combineAsts,
  evaluateAst,
};
