// import necessary components from the mongoose library. Schema is used to define the structure of the document, and model is used to create a model based on a schema
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction'); // import the reactionSchema from the 'Reaction.js' file


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
      default: Date.now, // default set to the current timestamp
      get: timestamp => new Date(timestamp).toLocaleString(), // getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // an array of the reactionSchema imported from the 'Reaction.js' file
  }, 
  {
    toJSON: { // specifies how the document should be transformed when converted to JSON. In this case, it enables both getters and virtuals
      getters: true,
      virtuals: true,
    },
    id: false, // disables the inclusion of the default _id field in the document
  },
);

// define a virtual property called reactionCount. It calculates the length of the reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// create a Mongoose model named Thought based on the defined schema (thoughtSchema). The first parameter is the singular name of the collection that will be created in MongoDB, and the second parameter is the schema
const Thought = model('thought', thoughtSchema); 

// export the Thought model so that it can be used in other parts of the application.
module.exports = Thought;

