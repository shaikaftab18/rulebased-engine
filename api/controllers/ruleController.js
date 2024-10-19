const ruleService = require('../services/ruleService');

exports.createRule = async (req, res) => {
  try {
    const ruleString = req.body.ruleString;
    if (!ruleString) {
      return res.status(400).json({ message: 'Rule string is required' });
    }
    const response = ruleService.createRule(ruleString);
    await ruleService.saveRule(ruleString, JSON.stringify(response.ast));
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating rule' });
  }
};

exports.combineRules = async (req, res) => {
  try {
    const ruleStrings = req.body.ruleStrings;
    if (!ruleStrings) {
      return res.status(400).json({ message: 'Rule strings are required' });
    }
    const response = ruleService.combineRules(ruleStrings);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error combining rules' });
  }
};

exports.evaluateRule = (req, res) => {
  try {
    const ast = req.body.ast;
    const data = req.body.data;
    if (!ast || !data) {
      return res.status(400).json({ message: 'AST and data are required' });
    }
    const result = ruleService.evaluateRule(ast, data);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error evaluating rule' });
  }
};
