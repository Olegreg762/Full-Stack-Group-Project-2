const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model {}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    expense_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expense_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    budget_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Budget',
        key: 'id',
      }
    }
   },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Expense',
  }
);

module.exports = Expense;
