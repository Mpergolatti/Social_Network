const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require('./Reaction');

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
  // Use reactionSchema to validate
  {
    reaction: [ReactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = ThoughtSchema;