const astBuilder = require('../utils/astBuilder');
const db = require('../../data/db');

exports.createRule = (ruleString) => {
  try {
    const ast = astBuilder.buildAst(ruleString);
    return {
      status: "success",
      message: "Rule created successfully.",
      ast: ast
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error building AST');
  }
};

exports.saveRule = async (ruleString, ast) => {
  try {
    const rule = await db.createRule(ruleString, ast);
    return rule;
  } catch (error) {
    console.error(error);
    throw new Error('Error saving rule');
  }
};

exports.combineRules = (ruleStrings) => {
  try {
    const asts = ruleStrings.map((rule) => astBuilder.buildAst(rule));
    const combinedAst = astBuilder.combineAsts(asts);

    return {
      status: "success",
      combinedAst: combinedAst,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error combining ASTs');
  }
};

exports.evaluateRule = (ast, data) => {
  try {
    const result = astBuilder.evaluateAst(ast, data);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Error evaluating AST');
  }
};
