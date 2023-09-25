const router = require('express').Router();
const { Budget} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
      const user = req.session.user_id;
      const budget = await Budget.findAll({
        where: {user_id: user},
      });
      const results = [];
      for(i = 0; budget.length > i; i++){
      const { total_budget, name} = budget[i];
      const result = { total_budget, name};
      results.push(result);
    }
    res.status(200).json(results)
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
