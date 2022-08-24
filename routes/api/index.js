// imports the express library
const router = require('express').Router();
// imports the user routes
const userRoutes = require('./user-routes');
// imports  the thought routes
const thoughtRoutes = require('./thought-routes');

// will allow the app to access the routes
router.use('/users', userRoutes);
router.user('/thoughts', thoughtRoutes);

// exports the routes from the api subdirectory
module.exports = router;