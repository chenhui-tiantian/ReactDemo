/**
 * Created by jiangrx on 12/22/15.
 */
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DispatcherAppStore = require('../../../dispatcher/appstore/AppStoreDispatcher');
var ConstantsVMTemplate = require('../../../constants/appstore/vmtemplate/VMTemplateConstants');
let ResourceVMTemplate = require('../../../resources/appstore/vmtemplate/VMTemplateResource');

const ActionTypes = ConstantsVMTemplate.ActionTypes;
const FETCHED_TEMPLATES_SUCCESS = 'FETCHED_TEMPLATES_SUCCESS';
const FETCHED_TEMPLATES_FAIL = 'FETCHED_TEMPLATES_FAIL';
const EDIT_TEMPLATES_SUCCESS = 'EDIT_TEMPLATES_SUCCESS';
const EDIT_TEMPLATES_FAIL = 'EDIT_TEMPLATES_FAIL';
const FETCHED_CONVERSIONS_SUCCESS = 'FETCHED_CONVERSIONS_SUCCESS';
const FETCHED_CONVERSIONS_FAIL = 'FETCHED_CONVERSIONS_FAIL';
const TEMPLATE_CONVERT_SUCCESS = 'TEMPLATE_CONVERT_SUCCESS';
const TEMPLATE_CONVERT_FAIL = 'TEMPLATE_CONVERT_FAIL';
const VM_TLIB_SUCCESS = 'VM_TLIB_SUCCESS';
const VM_TLIB_FAIL = 'VM_TLIB_FAIL';
const DEL_VMTLIB_SUCCESS = 'DEL_VMTLIB_SUCCESS';
const DEL_VMTLIB_FAIL = 'DEL_VMTLIB_FAIL';

let _templates = [];
let _totalSize = 0;
let _conversions = [];
let _conversionTypes = [];
var _vmTlibs = [];
var VMTemplateStore = assign({}, EventEmitter.prototype, {

  fetchTemplates(payload){
    ResourceVMTemplate.fetchTemplates(payload).then((result)=> {
      console.log(result);
      if (result.collection) {
        _templates = result.collection;
        _totalSize = result.totalSize;
        this.emit(FETCHED_TEMPLATES_SUCCESS);
      } else {
        this.emit(FETCHED_TEMPLATES_FAIL);
      }
    }, (reason)=> {
      console.log(reason);
      this.emit(FETCHED_TEMPLATES_FAIL);
    });
  },
  fetchConversions(payload){
    console.log('get conversions');
    ResourceVMTemplate.fetchConversions(payload).then((result)=> {
      console.log('resolved');
      console.log(result);
      if (result.collection) {
        _conversions = result.collection;
        _conversionTypes = [];
        for (let i = 0; i < _conversions.length; i++) {
          _conversionTypes.push(_conversions[i].targetFormat);
        }
        this.emit(FETCHED_CONVERSIONS_SUCCESS);
      } else {
        this.emit(FETCHED_CONVERSIONS_FAIL);
      }
    }, (reason)=> {
      console.log('rejected');
      console.log(reason);
      this.emit(FETCHED_CONVERSIONS_FAIL);
    });
  },
  convertTemplate(payload){
    ResourceVMTemplate.convertTemplate(payload).then(()=> {
      this.emit(TEMPLATE_CONVERT_SUCCESS);
    }, ()=> {
      this.emit(TEMPLATE_CONVERT_FAIL);
    });
  },
  reconvertTemplate(payload){
    ResourceVMTemplate.reconvertTemplate(payload).then(()=> {
      this.emit(TEMPLATE_CONVERT_SUCCESS);
    }, ()=> {
      this.emit(TEMPLATE_CONVERT_FAIL);
    });
  },
  editTemplate(payload){
    console.log('store edit template', payload);
    ResourceVMTemplate.editTemplate(payload).then(()=> {
      this.emit(EDIT_TEMPLATES_SUCCESS);
      //this.getTemplates();
    }, ()=> {
      this.emit(EDIT_TEMPLATES_FAIL);
    });
  },
  deleteVMTlib(payload) {

    ResourceVMTemplate.deleteVMTlib(payload).then(()=> {
      this.emit(DEL_VMTLIB_SUCCESS);
    }, ()=> {
      this.emit(DEL_VMTLIB_FAIL);
    });
  },
  fetchVMTlib(payload){
    console.log('store vm t lib', payload);
    ResourceVMTemplate.getVMTlib(payload).then((resource)=> {
      _vmTlibs = resource.collection;
      this.emit(VM_TLIB_SUCCESS);
    }, ()=> {
      this.emit(VM_TLIB_FAIL);
    });
  },
  getTemplates(){
    let getMasterID = function (href) {
      let index = href.lastIndexOf('/');
      return parseInt(href.substr(index + 1));
    };
    let hasChild = [];
    let instances = [];
    let sortedIndex = [];
    for (let i = 0; i < _templates.length; i++) {
      if (_templates[i].links[7].rel === 'master') {
        let masterID = getMasterID(_templates[i].links[7].href);
        let k = hasChild.indexOf(masterID);
        if (k === -1) {
          hasChild.push(masterID);
          instances.push([i]);
        } else {
          instances[k].push(i);
        }
      }
    }
    for (let i = 0; i < _templates.length; i++) {
      let k = hasChild.indexOf(_templates[i].id);
      if (k !== -1) {
        let m = sortedIndex.push(i) - 1;
        for (let n = 0; n < instances[k].length; n++) {
          _templates[instances[k][n]].masterIndex = m;
          sortedIndex.push(instances[k][n]);
        }
      } else if (_templates[i].links[7].rel !== 'master') {
        sortedIndex.push(i);
      }
    }
    let sortedTemplates = [];
    for (let i = 0; i < sortedIndex.length; i++) {
      sortedTemplates.push(_templates[sortedIndex[i]]);
    }
    return sortedTemplates;
  },
  getConversions(){
    return _conversions;
  },
  getConversionTypes(){
    return _conversionTypes;
  },
  getTotalSize(){
    return _totalSize;
  },
  getvmTlib(){
    return _vmTlibs;
  },

  addTemplateConvertSuccessListener(callback){
    this.on(TEMPLATE_CONVERT_SUCCESS, callback);
  },
  removeTemplateConvertSuccessListener(callback){
    this.removeListener(TEMPLATE_CONVERT_SUCCESS, callback);
  },
  addTemplateConvertFailListener(callback){
    this.on(TEMPLATE_CONVERT_FAIL, callback);
  },
  removeTemplateConvertFailListener(callback){
    this.removeListener(TEMPLATE_CONVERT_FAIL, callback);
  },
  addFetchedConversionsSuccessListener(callback){
    this.on(FETCHED_CONVERSIONS_SUCCESS, callback);
  },
  removeFetchedConversionsSuccessListener(callback){
    this.removeListener(FETCHED_CONVERSIONS_SUCCESS, callback);
  },
  addFetchedConversionsFailListener(callback){
    this.on(FETCHED_CONVERSIONS_FAIL, callback);
  },
  removeFetchedConversionsFailListener(callback){
    this.removeListener(FETCHED_CONVERSIONS_FAIL, callback);
  },
  addFetchedTemplatesSuccessListener(callback){
    this.on(FETCHED_TEMPLATES_SUCCESS, callback);
  },
  removeFetchedTemplatesSuccessListener(callback){
    this.removeListener(FETCHED_TEMPLATES_SUCCESS, callback);
  },
  addFetchedTemplatesFailListener(callback){
    this.on(FETCHED_TEMPLATES_FAIL, callback);
  },
  removeFetchedTemplatesFailListener(callback){
    this.removeListener(FETCHED_TEMPLATES_FAIL, callback);
  },
  editTemplateSuccessListener(callback){
    this.on(EDIT_TEMPLATES_SUCCESS, callback);
  },
  removeEditTemplateSuccessListener(callback){
    this.removeListener(EDIT_TEMPLATES_SUCCESS, callback);
  },
  editTemplateFailListener(callback){
    this.on(EDIT_TEMPLATES_FAIL, callback);
  },
  removeEditTemplateFailListener(callback){
    this.removeListener(EDIT_TEMPLATES_FAIL, callback);
  },
  vmtlibListenerSuccessListener(callback){
    this.on(VM_TLIB_SUCCESS, callback);
  },
  removeVmtlibListenerSuccessListener(callback){
    this.removeListener(VM_TLIB_SUCCESS, callback);
  },
  //vmtlibListenerFailListener(callback){
  //  this.on(VM_TLIB_FAIL, callback);
  //},
  //vmtlibListenerFailListener(callback){
  //  this.removeListener(VM_TLIB_FAIL, callback);
  //}
});

VMTemplateStore.dispatchToken = DispatcherAppStore.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_TEMPLATES:
      VMTemplateStore.fetchTemplates(action.payload);
      break;
    case ActionTypes.DOWNLOAD_TEMPLATE:
      ResourceVMTemplate.downloadTemplate(action.payload);
      break;
    case ActionTypes.EDIT_TEMPLATE:
      VMTemplateStore.editTemplate(action.payload);
      break;
    case ActionTypes.FETCH_TEMPLATE_CONVERSIONS:
      VMTemplateStore.fetchConversions(action.payload);
      break;
    case ActionTypes.CONVERT_TEMPLATE:
      VMTemplateStore.convertTemplate(action.payload);
      break;
    case ActionTypes.RECONVERT_TEMPLATE:
      VMTemplateStore.reconvertTemplate(action.payload);
      break;
    case ActionTypes.GETVM_TEMPLATE:
      VMTemplateStore.fetchVMTlib(action.payload);
      console.log('action vm get payload',action.payload);
      break;
    case ActionTypes.DEL_VM_TEMPLATE:
      VMTemplateStore.deleteVMTlib(action.payload);
      console.log('action vm get payload',action.payload);
      break;

    default:
      break;
  }
});

module.exports = VMTemplateStore;
