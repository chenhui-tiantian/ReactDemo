var AppDispatcher = require('../dispatcher/ReactUcenterWebpackAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var resource = require('../resources');
var _user;

var UserStore = assign({}, EventEmitter.prototype, {
  getCurrentUser: function () {
    return _user;
  },
  addFailedListener(callback) {
    this.on('failed', callback);
  },
  addAuthoredListener(callback) {
    this.on('authorized', callback);
  },
  login: function (data) {
    var self = this;
    var userName = data.userInfo.userName;
    var password = data.userInfo.password;
    resource.user.login(userName, password).then(function (user) {
      console.log('>> login', user);
      _user = user;
      self.emit('authorized', user);
    }, function(err) {
      self.emit('failed', err);
    });
  }
});

AppDispatcher.register(function (action) {
  switch(action.type) {
    case 'USER_LOGIN':
      UserStore.login(action);
    break;
    default:
      break;
  }
});

module.exports = UserStore;
