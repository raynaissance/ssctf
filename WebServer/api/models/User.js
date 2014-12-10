/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

var UserType = {
    player: 5,
    admin: 1,
    gameServer: 2
}

module.exports = {
  UserType: UserType,
  attributes: {
    name: {
        type: "string",
        required: true
    },
    email: {
      type: "email",
      required: true,
      unique: true
    },
    type: {
      type: "integer",
      required: true,
      "defaultsTo": UserType.player
    },
    passwordHash: {
        type: "string",
        required: true
    },
    freezeShootCount: {
      type: "integer",
      "defaultsTo": 0
    },
    freezeOpponentCount: {
      type: "integer",
      "defaultsTo": 0
    },
    superSpeedCount: {
      type: "integer",
      "defaultsTo": 0
    },
    unfreezeTeammateCount: {
      type: "integer",
      "defaultsTo": 0
    },
	frozenByOpponentCount: {
      type: "integer",
      "defaultsTo": 0
    }
  },
    beforeCreate: function (values, next) {
        bcrypt.hash(values.passwordHash, 10, function passwordEncrypted(err, passwordHash1) {
            if (err) return next(err);
            values.passwordHash = passwordHash1;
            // values.online= true;
            next();
        });
    }
};

