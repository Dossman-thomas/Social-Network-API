const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

  // GET all users
  async getUsers(req,res) {

    try {

      const users = await User.find();

      res.json(users);
      
    } catch (err) {
      
      console.log(err);
      return res.status(500).json(err);
      
    }

  }


  // GET single user by _id and populated thought and friend data



  // POST a new user



  // PUT to update a user by _id



  // DELETE to remove user by _id



  // [BONUS] remove a user's associated thoughts when deleted


  // POST to add a new friend to a user's friend list



  // DELETE to remove a friend from a user's friend list



}