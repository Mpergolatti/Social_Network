const { Thought, User } = require ('../models');

const thoughtController = {


  // Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'user',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get Single Thought by ID
  getThoughtById({ params }, res ) {
    Thought.findOne({ _id: params.id })
    .populate ({
      path: 'user',
      select: '-__v'
    })
      .select('-__v')
      .sort({ _id: -1 })
        .then(dbThoughtData => {
          if(!dbThoughtData) {
            res.status(404).json({ message: 'No Thought found with this ID.'})
            return;
          }
          res.json(dbThoughtData)
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  },

  // Create Thought
  createThought({ params, body }, res ) {
    Thought.create(body)
      .then(({ _id}) => {
        return User.findOneAndUpdate(
            { username: body.username },
            { $push: { thoughts: _id } },
            { new: true }
          );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this username'})
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
}

module.exports = thoughtController;