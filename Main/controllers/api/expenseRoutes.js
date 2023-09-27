const router = require('express').Router();
const { Expense } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
      const expense = await Expense.create({
        expense_name: req.body.name,
        category_name: req.body.category,
        expense_amount: req.body.amount,
        budget_id: req.session.user_id
      });
    res.status(200).json(expense);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
        budget_id: req.session.user_id,
      },
    });

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with this id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;