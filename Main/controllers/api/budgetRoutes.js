const router = require('express').Router();
const { Budget} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const budget = await Budget.create({
      name: req.body.name,
      total_budget: req.body.amount,
      user_id: req.session.user_id,
    })
    console.log(budget);
    res.status(200).json(budget)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const budgetData = await Budget.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!budgetData) {
      res.status(404).json({ message: 'No expense found with this id!' });
      return;
    }

    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
