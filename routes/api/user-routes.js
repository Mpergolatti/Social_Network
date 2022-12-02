const router = require('express').Router();

// Import functionality and hook it up with routes
const {

  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend

} = require('../../controller/user-controller');

// Routes for ALL and POST at /api/user
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Routes for GET ONE, PUT, DELETE at /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

  module.exports = router;