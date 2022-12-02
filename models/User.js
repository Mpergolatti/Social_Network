const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

const ReactionSchema = new Schema (
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    }
  },

  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    }
  },

  {
    username: {
      type: String,
      required: true
    }
  },

  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')

    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

// Gets Comments and Replies 
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;