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

// Test Case 4: Modify Rule


// Run Test Cases
testCreateIndividualRules();
testCombineRules();
testEvaluateRule();