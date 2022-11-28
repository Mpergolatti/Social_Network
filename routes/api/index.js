const router = require('express').Router();
const userRoutes = require('./user-routes');

// Add prefix of '/user' to routes created in 'user-routes.js'
router.use('/user', userRoutes);

module.exports = router;