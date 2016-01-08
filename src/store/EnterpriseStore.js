var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var resource = require('../resources');
var AppDispatcher = require('../dispatcher/ReactUcenterWebpackAppDispatcher');

var _enterprises = [];
var _currentEnterprise = null;

var EnterpriseStore = assign({}, EventEmitter.prototype, {
  getCurrentEnterprise() {
    return _currentEnterprise;
  },

  getEnterprises() {
    return _enterprises;
  },

  setCurrentEnterprise(id) {
    // 如果查不到设置的企业，重新获取企业
    if (!this.getCurrentEnterprise()) {
      this.fetchEnterprises();
    }
    _currentEnterprise = id;
  },

  searchEnterpriseByName(name){
  resource.enterprises.searchByName(name).then( result => {
    if (result.collection) {
    _enterprises = result.collection;
    this.emit('change');
  }
});
},
  fetchEnterprises() {
    resource.enterprises.fetchAll().then( result => {
      if (result.collection) {
        _enterprises = result.collection;
        this.emit('change');
      }
    });
  }

});

AppDispatcher.register(function(action){
  switch(action.type){
    case 'search':
      EnterpriseStore.searchEnterpriseByName(action.searchName);
      break;
    default:
      break;
  }
});

module.exports = EnterpriseStore;
