const { Schema, model } = require('mongoose');

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
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill a valid email address']
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  }
);

const User = model('User', UserSchema);

module.exports = User;