
module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  sum_budget: (budgets) => {
    let sum = 0;
    budgets.forEach(budget =>{
      sum += budget.total_budget;
    });
    return sum;
  },
  sum_expense: (expense) => {
    const expense_total = expense.reduce((total, expense) => total + expense.expense_amount, 0);

    return expense_total;
    
  },

};

