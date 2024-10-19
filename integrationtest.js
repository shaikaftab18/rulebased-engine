// Example of invoking ruleService methods in tests
const ruleService = require('./api/services/ruleService');

// Test Case 1: Create Individual Rules
const testCreateIndividualRules = () => {
  const rules = [
    "age > 30 AND department = 'Sales'",
    "age < 25 AND department = 'Marketing'",
    "salary > 50000 OR experience > 5"
  ];

  rules.forEach(rule => {
    const response = ruleService.createRule(rule);
    console.log('Creating Rule:', rule);
    console.log('Response:', response);
  });
};

// Test Case 2: Combine Rules
const testCombineRules = () => {
  const rule1 = "age > 30 AND department = 'Sales'";
  const rule2 = "age < 25 AND department = 'Marketing'";
  
  const combinedResponse = ruleService.combineRules([rule1, rule2]);
  console.log('Combined Rules Response:', combinedResponse);
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
  console.log('Evaluation Result:', evaluationResult);
};

// Test Case 4: Modify Rule
const testModifyRule = async () => {
  const rule = "age > 30 AND department = 'Sales'";
  const response = await ruleService.createRule(rule);

  const modifiedRule = "age > 35 AND department = 'Sales'";
  const modifiedResponse = await ruleService.modifyRule(response.ast.id, modifiedRule); // Assuming ruleId is available
  console.log('Modified Rule Response:', modifiedResponse);
};

// Run Test Cases
testCreateIndividualRules();
testCombineRules();
testEvaluateRule();
testModifyRule();
