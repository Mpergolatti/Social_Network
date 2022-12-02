const { Thought, User } = require ('../models');

const thoughtController = {


  // Get all Thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get Single Thought by ID
  getThoughtById({ params }, res ) {
    Thought.findOne({ _id: params.id })
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
          res.status(404).json({ message: 'No thought found with this ID'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // Update a thought by ID
  updateThought ({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id },
        { $push: { replies: body } },
        { new: true, runValidators: true}
      )
      .then(updatedThought => {
        if (!updatedThought) {
          res.status(404).json({ message: 'No thought found with this ID'})
          return;
        }
        res.json(updatedThought);
      })
      .catch(err => res.json(err));
  },

  // Delete a Thought by ID
  deleteThought({ params, body }, res) {
    Thought.findOneAndDelete(
      { _id: params.id }  
    )
    .then(deletedThought => {
      if (!deletedThought) {
        res.status(404).json({ message: 'No thought found with this ID'})
        return;
      }
      res.json(deletedThought);
    })
    .catch(err => res.json(err));
  },

  // Add Reaction
  addReaction ({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }  
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this ID'})
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  // Delete Reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this ID'})
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  }
}

module.exports = thoughtController;