/**
 * Created by chenh on 2015/12/23.
 */

'use strict';

var React = require('react');
require('../vappstore.css');
const List = require('material-ui/lib/lists/list');
import ListRow from '../../common/ListRow';
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');

var CategoryStore = require('../../../store/appstore/category/CategoryStore');
var CategoryAction = require('../../../actions/appstore/categories/CategoryAction');

//var SearchBar = require('../../common/SearchBar');
var ControlButtons = require('../../common/ControlButtons');
import UploadISO from './UploadISO';
import UploadTemplate from './UploadTemplate';
import AddCategory from './AddCategory';

function getCategories() {
  return {
    diskFormatTypes: CategoryStore.getDiskFormatTypes() || null,
    categories: CategoryStore.getCategories() || null
  };
}

var CategoryManage;
CategoryManage = React.createClass({
  getInitialState() {
    return {
      diskFormatTypes: null,
      categories: null,
      addCategoryShow: false,
      uploadISOShow: false,
      uploadTemplateShow: false,
      category: null
    };
  },
  componentWillMount(){
    CategoryStore.addCategoriesListener(this._onChange);
  },

  componentDidMount(){
    this.setState({
      diskFormatTypes: CategoryStore.getDiskFormatTypes(),
      categories: CategoryStore.getCategories()
    });
    CategoryAction.fetchCategories();
    CategoryAction.fetchDiskFormatTypes();
  },

  componentWillUnmount(){
    CategoryStore.removeCategoriesListener(this._onChange);
  },

  _onChange(){
    this.setState({
      diskFormatTypes: CategoryStore.getDiskFormatTypes(),
      categories: CategoryStore.getCategories()
    });
  },

  _onAdd(){
    this.setState({addCategoryShow: true});
  },
  onUploadISOHide(){
    this.setState({uploadISOShow: false});
  },
  onUploadTemplateHide(){
    this.setState({uploadTemplateShow: false});
  },
  _onDialogSubmit(){
    this.setState({addCategoryShow: false});
  },
  selectItem(event, item){
    CategoryAction.selectCategory(item);
  },
  onItemOperation(event, menuItem) {
    if (menuItem.key === 'del') {
      CategoryAction.deleteCategory(this.state.categories[menuItem.props.index].id);
    } else if (menuItem.key === 'iso') {
      this.setState({
        uploadISOShow: true
      });
    } else if (menuItem.key === 'template') {
      this.setState({
        uploadTemplateShow: true,
        category: this.state.categories[menuItem.props.index]
      });
    }
  },
  renderRightIconMenu(category, index){
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );
    let items;
    if (category.name.toUpperCase() === 'ISO') {
      items = <MenuItem key='iso' index={index}>上传ISO文件</MenuItem>;
    }
    else {
      items = (<MenuItem key='template' index={index}>上传模板文件</MenuItem>);
    }
    return (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
        <MenuItem key='del' index={index}>删除</MenuItem>
        {items}
      </IconMenu>
    );
  },
  renderLists(){
    var rows = [];
    if (this.state.categories != null) {
      for (let i = 0; i < this.state.categories.length; i++) {
        rows.push(< ListRow key={this.state.categories[i].name}
                            item={this.state.categories[i]}
                            primaryText={this.state.categories[i].name}
                            rightIconButton={this.renderRightIconMenu(this.state.categories[i], i)}
                            onTouchEvent={this.selectItem}/>);
      }
    }
    return (<List key={'category'}>{rows}</List>);
  },
  render(){
    return (
      <div >
        <div className='template-gategory'>
          <div className='template-gategory-header'>
            <h4>模板分类</h4>
            <div>
              <ControlButtons buttons={{
              addButton: true,
              editButton: false,
              deleteButton: false
            }} addButtonHandler={this._onAdd}/>
            </div>
          </div>
          <div className='template-gategory-list'>
            {this.renderLists()}
          </div>
        </div>
        <div><UploadISO open={this.state.uploadISOShow}
                        onRequestClose={this.onUploadISOHide}/></div>
        <div><UploadTemplate open={this.state.uploadTemplateShow}
                             onRequestClose={this.onUploadTemplateHide}
                             diskFormatTypes={this.state.diskFormatTypes}
                             category={this.state.category}/></div>
        <div><AddCategory open={this.state.addCategoryShow}
                          onRequestClose={this._onDialogSubmit}/></div>
      </div>
    );
  }
});

module.exports = CategoryManage;
