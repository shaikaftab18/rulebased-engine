const express = require('express');
const path = require('path');
const app = express();
const ruleController = require('./api/controllers/ruleController');

app.use(express.json());


app.use(express.static(path.join(__dirname, 'client')));

app.post('/api/create-rule', ruleController.createRule);
app.post('/api/combine-rules', ruleController.combineRules);
app.post('/api/evaluate-rule', ruleController.evaluateRule);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});