const router = require('express').Router();
const userRoutes = require('./userRoutes');
const budgetRoutes = require('./budgetRoutes');
const expenseRoutes = require('./expenseRoutes');

router.use('/users', userRoutes);
router.use('/budget', budgetRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
