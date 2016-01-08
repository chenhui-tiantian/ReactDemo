var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var resource = require('../resources');

var _privileges = {};

var PrivilegeStore = assign({}, EventEmitter.prototype, {
  fetchPrivileges(role) {
    return resource.privilegeResource.fetch(role).then( result => {
      for (let i = 0; i < result.collection.length; i++) {
        const privilege = result.collection[i];
        _privileges[privilege.name] = privilege;
        console.log('privilege>>',privilege);
      }
      this.emit('change');
      return _privileges;
    });
  },
  p(name) {
    return _privileges.hasOwnProperty(name);
  }
});


export default PrivilegeStore;
