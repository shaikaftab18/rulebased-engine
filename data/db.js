const mongoose = require('mongoose');


const uri = 'mongodb+srv://shaikaftab171:J8vny04HJTmWbiv0@cluster0.hzmri.mongodb.net/ruleEngine?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

const ruleSchema = new mongoose.Schema({
  ruleString: { type: String, required: true },
  ast: { type: String, required: true },
});

const Rule = mongoose.model('Rule', ruleSchema);

exports.createRule = async (ruleString, ast) => {
  const rule = new Rule({ ruleString, ast });
  await rule.save();
  return rule;
};

exports.getRules = async () => {
  const rules = await Rule.find();
  return rules;
};
