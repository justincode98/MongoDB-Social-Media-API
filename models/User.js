const {Schema, model, Types} = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    thought: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friend: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of fruebds on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friend.length;
});

const User = model('User', UserSchema);

module.exports = User;
