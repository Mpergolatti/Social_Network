const { Schema, model } = require('mongoose');
const moment = require('moment');

const ThoughtSchema = new Schema (
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    }
  },

  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYY [at] hh:mm a')
    }
  },

  {
    username: {
      type: String,
      required: true
    }
  },

  {
    reaction: {}
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
)

module.exports = ThoughtSchema;