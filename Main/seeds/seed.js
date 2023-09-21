const sequelize = require('../config/connection');
const { User, Expense, Category } = require('../models');

const userData = require('./userData.json');
const expenseData = require('./expenseData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of categoryData) {
    await Category.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    for (const project of expenseData) {
      await Expense.create({
        ...project,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });


    }

    process.exit(0);
  }
};

seedDatabase();
