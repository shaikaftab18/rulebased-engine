# rulebased-engine
# rulebased-engine

A rule-based engine for creating, combining, and evaluating rules using an Abstract Syntax Tree (AST) representation.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Description

This project provides a rule-based engine that allows users to create, combine, and evaluate rules using an AST representation. The engine supports error handling for invalid rule strings or data formats, validations for attributes to be part of a catalog, and modification of existing rules.

## Features

- Create individual rules and verify their AST representation.
- Combine multiple rules and ensure the resulting AST reflects the combined logic.
- Evaluate rules against sample JSON data.
- Modify existing rules by changing operators, operand values, or adding/removing sub-expressions within the AST.
- Error handling for invalid rule strings or data formats (e.g., missing operators, invalid comparisons).
- Validations for attributes to be part of a catalog.

## Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB Atlas (or any MongoDB instance)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/rulebased-engine.git
   cd rulebased-engine
2. Install dependencies:
    npm install
Set up MongoDB:

Create a MongoDB Atlas account (if you don't have one).
Create a new cluster and get the connection string.
Update the connection string in your environment variables.
Start the server:npm start
Usage
Creating a Rule
To create a rule, send a POST request to /api/create-rule with the rule string in the request body.

Example:
curl -X POST http://localhost:3000/api/create-rule -H "Content-Type: application/json" -d '{"ruleString": "age > 30 AND department = \'Sales\'"}'

Combining Rules
To combine multiple rules, send a POST request to /api/combine-rules with an array of rule strings in the request body.

Example:curl -X POST http://localhost:3000/api/combine-rules -H "Content-Type: application/json" -d '{"ruleStrings": ["age > 30 AND department = \'Sales\'", "age < 25 AND department = \'Marketing\'"]}'


Evaluating a Rule
To evaluate a rule, send a POST request to /api/evaluate-rule with the AST and data in the request body.

Example:curl -X POST http://localhost:3000/api/evaluate-rule -H "Content-Type: application/json" -d '{"ast": {...}, "data": {"age": 35, "department": "Sales", "salary": 60000, "experience": 10}}'

Modifying a Rule
To modify an existing rule, send a PUT request to /api/modify-rule/:id with the new rule string in the request body.

Example:curl -X PUT http://localhost:3000/api/modify-rule/1 -H "Content-Type: application/json" -d '{"newRuleString": "age > 35 AND department = \'Sales\'"}'


Testing
To run  tests, create a file named test.js and add the following test cases:
const ruleService = require('./api/services/ruleService');

// Test Case 1: Create Individual Rules
const testCreateIndividualRules = () => {
  const rule1 = "age > 30 AND department = 'Sales'";
  const rule2 = "age < 25 AND department = 'Marketing'";
  const rule3 = "salary > 50000 OR experience > 5";

  const response1 = ruleService.createRule(rule1);
  const response2 = ruleService.createRule(rule2);
  const response3 = ruleService.createRule(rule3);

  console.log('Test Case 1: Create Individual Rules');
  console.log(response1);
  console.log(response2);
  console.log(response3);
};

// Test Case 2: Combine Rules
const testCombineRules = () => {
  const rule1 = "age > 30 AND department = 'Sales'";
  const rule2 = "age < 25 AND department = 'Marketing'";
  const rule3 = "salary > 50000 OR experience > 5";

  const combinedResponse = ruleService.combineRules([rule1, rule2, rule3]);

  console.log('Test Case 2: Combine Rules');
  console.log(combinedResponse);
};

// Test Case 3: Evaluate Rule
const testEvaluateRule = () => {
  const rule = "age > 30 AND department = 'Sales'";
  const response = ruleService.createRule(rule);

  const data = {
    age: 35,
    department: 'Sales',
    salary: 60000,
    experience: 10
  };

  const evaluationResult = ruleService.evaluateRule(response.ast, data);

  console.log('Test Case 3: Evaluate Rule');
  console.log(evaluationResult);
};


// Run Test Cases
testCreateIndividualRules();
testCombineRules();
testEvaluateRule();

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


