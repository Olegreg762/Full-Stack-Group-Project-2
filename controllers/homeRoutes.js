const router = require('express').Router();
const { Budget, User, Expense } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all expenses and JOIN with user data
    const budgetData = await Budget.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const budget = budgetData.map((budget) => budget.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      Budget, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/budget/:id', async (req, res) => {
  try {
    const budgetData = await Budget.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const budget = budgetData.get({ plain: true });

    res.render('budget', {
      ...budget,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Budget,
          include: [Expense],  
        }
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)
    res.render('profile', {
      ...user,
      data: JSON.stringify(user.Budgets),
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
