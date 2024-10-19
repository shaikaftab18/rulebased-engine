
const createRuleForm = document.getElementById('create-rule-form');
createRuleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ruleString = document.getElementById('rule-string').value;
  fetch('/api/create-rule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruleString }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});


const combineRulesForm = document.getElementById('combine-rules-form');
combineRulesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ruleStrings = document.getElementById('rule-strings').value.split('\n');
  fetch('/api/combine-rules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruleStrings }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});


const evaluateRuleForm = document.getElementById('evaluate-rule-form');
evaluateRuleForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ast = document.getElementById('ast').value;
  const data = document.getElementById('data').value;
  fetch('/api/evaluate-rule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ast, data }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});