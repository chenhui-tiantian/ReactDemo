/**
 * Created by lenovo on 2015/11/17.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
//var resource = require('../resources');
var BackupResource = require('../resources/BackupResource');
var AppDispatcher = require('../dispatcher/ReactUcenterWebpackAppDispatcher');


//var _backups = [{ a:'dfd',  b:'sa'},{ a:'dsdfd',  b:'saaaa'}];
var _backups = [];
var BackupStore = assign({}, EventEmitter.prototype, {
  searchAllBackups: function () {
    BackupResource.getBackups().then(result => {
      for(var i = 0; i < result.collection.length; i++ ){
      _backups.push(result.collection[i]);
    }
    this.emit('getBackups');
  });

},
getallBackup()
{
  return _backups;
},
addGetListener(callback)
{
  this.on('getBackups', callback);
},
removeGetListener(callback)
{
  this.removeListener('getBackups', callback);
}
});


AppDispatcher.register(function(action){
  switch(action.type){
    case 'getBackups':
      BackupStore.searchAllBackups();
      break;
    default:
      break;
  }
});

    //alert('backstore');
  //  resource.BackupResource.getBackups().then( result => {
  //      _backups.push(result);
  //});


//    BackupResource.getBackups().then( result => {
//      //_backups = result.collection;
//      // console.log(result);
//      console.log('ssssssssssssssssssssssssssssss_return');
//    console.log(result);
//    alert(result.collection);
//
//    for(var i = 0; i < result.collection.length; i++)
//    {
//      _backups.push(result.collection[i]);
//    }
//    //  for(let c in result.collection){
//    //  _backups.push(c);
//    //}
//});
//console.log('ssssssssssssssssssssssssssssss_backups');
//console.log(_backups);
//    return _backups;
//  }


module.exports = BackupStore;
