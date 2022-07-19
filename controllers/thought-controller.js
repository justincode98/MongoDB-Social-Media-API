const { Thought, User } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({}) //{} means object
       // .populate("") //no need can sort
        .select('-__v')
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thoughts found!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));

    },    

    getThought({params}, res) {
        Thought.findOne({_id: params.thoughtId})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            console.log(dbThoughtData);
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought by that id found!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));

    },
    addThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
           return User.findOneAndUpdate({_id: body.userId}, {$push: { thought: _id}}, {new: true})
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No user found with id ' + body.userId });
                return;
            }
            console.log("UPDATED");
            
            res.json(dbThoughtData);
        })
          .catch(err => {
            console.log(err);
            res.json(err);
        });

    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$set: {thoughtText: body.thoughtText}}, {new: true})
        .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
    },
    removeThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    clearThought(req, res) {//clear thoughts for debugging
        Thought.deleteMany({})
        .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    addReaction({params,body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: { reactions: body}}, {new: true})
        .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));

    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$pull: { reactions: {reactionId : req.params.reactionId}}}, {new: true})
        .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }//TODO
    //reactions needs object of reactionId?
    //originally followed the other functions, but that gives the same result as now
  
};

module.exports = thoughtController;
