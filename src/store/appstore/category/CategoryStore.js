/**
 * Created by chenh on 2015/12/23.
 */

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var DispatcherAppStore = require('../../../dispatcher/appstore/AppStoreDispatcher');
var CategoryConstants = require('../../../constants/appstore/category/CategoryConstants');
let CategoryResource = require('../../../resources/appstore/category/CategoryResource');

var StatusDialogStore = require('../../common/StatusDialogStore');

const ActionTypes = CategoryConstants.ActionTypes;
const CATEGORY_CHANGE = 'categoriesChange';
const SET_CATEGORY = 'SET_CATEGORY';

let _categories = [];
let _diskFormatTypes = [];
let _selectCategory;

var CategoryStore = assign({}, EventEmitter.prototype, {
  getCategories(){
    return _categories;
  },

  getSelectCategory(){
    return _selectCategory;
  },

  getDiskFormatTypes(){
    return _diskFormatTypes;
  },

  fetchDiskFormatTypes(){
    console.log('fetching diskformat');
    CategoryResource.fetchDiskFormatTypes().then((result)=> {
      if (result.collection) {
        _diskFormatTypes = result.collection;
        this.emit(CATEGORY_CHANGE);
      }
    });
  },

  setCategory(category){
    _selectCategory = category;
    this.emit(SET_CATEGORY);
  },
  fetchCategories(){
    CategoryResource.fetchCategories().then((result)=> {
      if (result.collection) {
        _categories = result.collection.filter(function (item) {
          return item.name.toUpperCase() === 'ISO';
        });
        let others = result.collection.filter(function (item) {
          return item.name.toUpperCase() !== 'ISO';
        });
        Array.prototype.push.apply(_categories, others);
        this.emit(CATEGORY_CHANGE);
      }
    });
  },

  deleteCategory(id){
    CategoryResource.deleteCategory(id).then(() => {
      StatusDialogStore.pushMessage({title: '删除类别', body: '删除成功！', isFail: false});
      this.fetchCategories();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '删除类别', body: e.message, isFail: true});
    });
  },

  addCategory(category){
    CategoryResource.addCategory(category).then(() => {
      StatusDialogStore.pushMessage({title: '添加类别', body: '添加成功！', isFail: false});
      this.fetchCategories();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '添加类别', body: e.message, isFail: true});
    });
  },

  uploadISO(payload){
    CategoryResource.requestUpload({
      fileSize: payload.file[0].size,
      dcID: payload.dcID
    }).then(() => {
      console.log('uploading iso');
      CategoryResource.uploadISO(payload)
        .on('progress', (e)=> {
          if (e.lengthComputable) {
            console.log(e);
            console.log(e.loaded);
          }
        }).end();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '上传ISO文件校验失败', body: e.text, isFail: true});
    });
  },

  uploadTemplate(payload){
    CategoryResource.requestUpload({
      fileSize: payload.file[0].size,
      dcID: payload.dcID
    }).then(() => {
      CategoryResource.uploadTemplate(payload)
        .on('progress', (e)=> {
          if (e.lengthComputable) {
            console.log(e);
            console.log(e.loaded);
          }
        }).end();
    }, (e)=> {
      StatusDialogStore.pushMessage({title: '上传Template文件校验失败', body: e.text, isFail: true});
    });
  },

  addCategoriesListener(callback){
    this.on(CATEGORY_CHANGE, callback);
  },
  removeCategoriesListener(callback){
    this.removeListener(CATEGORY_CHANGE, callback);
  },
  addCategorySetListener(callback){
    this.on(SET_CATEGORY, callback);
  },
  removeCategorySetListener(callback){
    this.removeListener(SET_CATEGORY, callback);
  }
});


CategoryStore.dispatchToken = DispatcherAppStore.register(function (action) {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORIES:
      CategoryStore.fetchCategories();
      break;

    case ActionTypes.DELETE_CATEGORY:
      CategoryStore.deleteCategory(action.id);
      break;

    case ActionTypes.ADD_CATEGORY:
      CategoryStore.addCategory(action.category);
      break;
    case ActionTypes.SELECT_CATEGORY:
      CategoryStore.setCategory(action.payload);
      break;
    case ActionTypes.UPLOAD_ISO:
      CategoryStore.uploadISO(action.payload);
      break;
    case ActionTypes.UPLOAD_TEMPLATE:
      CategoryStore.uploadTemplate(action.payload);
      break;
    case ActionTypes.FETCH_DISKFORMATTYPES:
      CategoryStore.fetchDiskFormatTypes();
      break;
    default:
      break;
  }
});

module.exports = CategoryStore;
