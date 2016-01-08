/**
 * Created by lenovo on 2015/12/23.
 */
/**
 * Created by chenh on 2015/11/30.
 */
var React = require('react');
const ListItem = require('material-ui/lib/lists/list-item');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const Dialog = require('material-ui/lib/dialog');
let UploadISO = require('./UploadISO');
let UploadTemplate = require('./UploadTemplate');

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var CategoryAction = require('../../../actions/appstore/categories/CategoryAction');

var CategoryRow = React.createClass({

  getInitialState() {
    return {
      isoDlg: false,
      templateDlg: false
    };
  },
  getDefaultProps(){
    return {
      diskFormatTypes: []
    };
  },
  //selectItem(item){
  //  CategoryAction.selectCategory(this.props.category.id);
  //},
  //_onIsoSubmit(){
  //  this.setState({
  //    isoDlg: false
  //  });
  //  this.refs.upload.upload();
  //},


  onItemOperation(event, menuItem) {
    if (menuItem.key === 'del') {
      CategoryAction.deleteCategory(this.props.category.id);
    } else if (menuItem.key === 'iso') {
      this.setState({
        isoDlg: true
      });
    } else if (menuItem.key === 'template') {
      this.setState({
        templateDlg: true
      });
    }
  },

  //_handleRequestClose(){
  //  this.setState({
  //    isoDlg: false,
  //    templateDlg: false
  //  });
  //},
  render: function () {
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400}/>
      </IconButton>
    );

    let items = [];
    let title = '';
    let upload = null;
    if (this.props.category.name.toUpperCase() === 'ISO') {
      items.push(<MenuItem key='iso'>上传ISO文件</MenuItem>);
      title = '上传本地ISO文件';
      upload = (<UploadISO ref='upload'/>);
    }
    else {
      items.push(<MenuItem key='template'>上传模板文件</MenuItem>);
      title = '上传本地模板';
      upload = (<UploadTemplate ref='upload'/>);
    }
    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement} onItemTouchTap={this.onItemOperation}>
        <MenuItem key='del'>删除</MenuItem>
        {items}
      </IconMenu>
    );
    return <div>
      <div>

      </div>
      <div>
        < ListItem primaryText={this.props.category.name}
                   rightIconButton={rightIconMenu}
                   onTouchTap={this.selectItem}/>
      </div>
    </div>;
  }
});

module.exports = CategoryRow;
