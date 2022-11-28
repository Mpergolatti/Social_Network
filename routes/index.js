const router = require('express').Router();

// An import from all the API routes
const apiRoutes = require('./api');

// Prefix of /api to all of the api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1> 404 ERROR! </h1>');
});

module.exports = router;