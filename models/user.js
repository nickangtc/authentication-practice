'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 12],
        isAlphanumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  }, {
    instanceMethods: {
      validatePassword: function (email, pw) {
        db.user.findOne({
          where: { email: email }
        }).then(function (data) {
          bcrypt.compare(pw, data.password, function (err, res) {
            return res;
          });
        });
      },
      encodePassword: function (pw) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(pw, salt, function(err, hash) {
            return hash;
          });
        });
      }
    }
  });
  return user;
};
