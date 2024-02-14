const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {

// GET all thoughts
async getThoughts(req, res) {

  try {

    const thoughts = await Thought.find();

    res.json(thoughts);
    
  } catch (err) {
    
    console.log(err);
    return res.status(500).json(err);

  }

},

// GET single thought by _id
async getSingleThought(req, res) {

  try {
    
    const thought = await Thought.findOne({_id: req.params.thoughtId})
      .select('-__v');

    if (!thought) {
      return res.status(404).json({
        message: 'no thought found with that ID'
      })
    }

    res.json(thought);
    

  } catch (err) {
    
    console.log(err);
    return res.status(500).json(err);

  }

},

// POST to create a new thought (push the created thought's _id to the associated user's thoughts array field)
async createThought(req, res) {
  try {
    // Create a new thought
    const thought = await Thought.create(req.body);

    // Update the associated user's thoughts array field
    const updatedUser = await User.findOneAndUpdate(
      { _id: thought.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    // If the associated user is not found, handle the case appropriately
    if (!updatedUser) {
      return res.status(404).json({ message: 'Associated user not found' });
    }

    // Return the created thought
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},

// PUT to update a thought by _id



// DELETE to remove thought by _id



// POST to create a reaction stored in a single thought's 'reactions' array field



// DELETE to pull and remove a reaction by the reaction's reactionId value



}