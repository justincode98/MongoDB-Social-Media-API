const { User } = require('../models');

const UserController = {
  // get all users
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // create User
  //{body} = req.body?
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!; cannot update' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }, 

  
  addFriend({ params }, res) {
    User.findOneAndUpdate({_id: params.id}, {$push: { friend: params.friendId}}, {new: true})
    .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // delete friend 
  deleteFriend({ params }, res) {
    User.findOneAndUpdate({ _id: params.id }, {$pull: { friend: params.friendId}}, {new: true})
    .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = UserController;
