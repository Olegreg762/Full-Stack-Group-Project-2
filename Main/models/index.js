const User = require('./User');
const Expense = require('./Expense');
const Category = require('./Category');


User.hasMany( Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Category.belongsTo (User, {
  foreignKey: 'user_id'
});


User.hasMany(Expense, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Expense.belongsTo(Category, {
  foreignKey: 'user_id'
});

Category.hasMany(Expense, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});



module.exports = { User, Expense, Category };
