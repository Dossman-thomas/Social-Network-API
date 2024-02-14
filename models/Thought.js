const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  }, 
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  },
);

// Virtual to calculate the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema); 

module.exports = Thought;

