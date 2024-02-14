const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

// GET all thoughts



// GET single thought by _id



// POST to create a new thought (push the created thought's _id to the associated user's thoughts array field)



// PUT to update a thought by _id



// DELETE to remove thought by _id



// POST to create a reaction stored in a single thought's 'reactions' array field



// DELETE to pull and remove a reaction by the reaction's reactionId value



}