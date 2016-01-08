var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var resource = require('../resources');

var _enterpriseResource = {};


var EnterpriseResourceStore = assign({}, EventEmitter.prototype, {
  fetchEnterpriseResource(enterpriseId) {
    if (_enterpriseResource[enterpriseId]) {
      return this.emit('change', _enterpriseResource[enterpriseId]);
    }

    resource.enterpriseResource.getByEnterprise(enterpriseId).then( result => {
      _enterpriseResource[enterpriseId] = result;
      return this.emit('change', result);
    });
  },

  getEnterpriseResource(enterpriseId) {
    if (!enterpriseId) {
      return _enterpriseResource;
    }
    return _enterpriseResource[enterpriseId];
  }
});


module.exports = EnterpriseResourceStore;
