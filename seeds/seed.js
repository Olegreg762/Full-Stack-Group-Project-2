const sequelize = require('../config/connection');
const { User, Expense, Budget } = require('../models');

const userData = require('./userData.json');
const expenseData = require('./expenseData.json');
const budgetData = require('./budgetData.json');


const seedDatabase = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function () {
      return sequelize.sync({ force: true });
    })
    .then(function () {
      return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(function () {
      console.log('Database synchronised.');
    }, function (err) {
      console.log(err);
    });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log(users);

  for (const budget of budgetData) {
    await Budget.create({
      ...budget,

    });
  }
  for (const expense of expenseData) {
    await Expense.create({
      ...expense,

    });
  }

  process.exit(0);
}


seedDatabase();

console.table(expenseData);
console.table(budgetData);