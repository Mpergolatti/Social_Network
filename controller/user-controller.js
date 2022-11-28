const { User } = require('../models');

const userController = {
  // Get All users
  getAllUser(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get One User By ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        
        // If NO user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });

  },

  // Create User
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // Update User By ID
  updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
        
      // If NO user is found, send 404
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

  },

  // Delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        
      // If NO user is found, send 404
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });

  }

}

module.exports = userController;