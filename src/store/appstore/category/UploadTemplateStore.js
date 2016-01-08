/**
 * Created by jiangrx on 12/29/15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DispatcherAppStore = require('../../../dispatcher/appstore/AppStoreDispatcher');
var ConstantsUploadTemplates = require('../../../constants/appstore/category/UploadTemplateConstant');
let StoreCategory = require('./CategoryStore');

const ActionTypes = ConstantsUploadTemplates.ActionTypes;
const PARSED_DISKTYPES = 'PARSED_DISKTYPES';

let _diskTypes = [];
let _parsedDiskTypes = [];

var StoreUploadTemplate = assign({}, EventEmitter.prototype, {
  parseDiskTypes(){
    _parsedDiskTypes = [];
    for (let i = 0; i < _diskTypes.length; i++) {
      _parsedDiskTypes.push({text: _diskTypes[i].description, payload: i});
    }
    this.emit(PARSED_DISKTYPES);
  },
  getParsedDiskTypes(){
    return _parsedDiskTypes;
  },
  addParsedDiskTypesListener(callback){
    this.on(PARSED_DISKTYPES, callback);
  },
  removeParsedDiskTypesListener(callback){
    this.removeListener(PARSED_DISKTYPES, callback);
  }
});


StoreUploadTemplate.dispatchToken = DispatcherAppStore.register(function (action) {
  switch (action.type) {
    case ActionTypes.PARSE_DISKTYPES:
      _diskTypes = StoreCategory.getDiskFormatTypes();
      StoreUploadTemplate.parseDiskTypes();
      break;
    default:
      break;
  }
});

module.exports = StoreUploadTemplate;
