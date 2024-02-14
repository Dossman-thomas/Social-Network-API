//  import necessary components from the mongoose library. Schema is used to define the structure of the document, model is used to create a model based on a schema, and Types provides access to Mongoose's ObjectId data type.
const { Schema, model, Types } = require('mongoose');

// User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    // thoughts and friends are arrays of ObjectId values that reference the Thought and User models, respectively
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // enables virtuals to be included when the document is converted to JSON
    },
    id: false, // disables the inclusion of the default _id field in the document
  },
);

// define a virtual property called friendCount. A virtual property is not stored in the MongoDB collection but can be calculated or derived when querying the document. In this case, it calculates the length of the friends array.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// create a Mongoose model named User based on the defined schema (userSchema). The first parameter is the singular name of the collection that will be created in MongoDB, and the second parameter is the schema
const User = model('user', userSchema);

// exports the User model so that it can be used in other parts of the application
module.exports = User; 