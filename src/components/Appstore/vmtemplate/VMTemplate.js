/**
 * Created by jiangrx on 12/22/15.
 */

import React from 'react';
//const StoreAppStore = require('src/store/appstore/AppStoreStore.js');
const StoreVMTemplate = require('../../../store/appstore/vmtemplate/VMTemplateStore');
let StoreDatacenter = require('../../../store/datacenter/DataCenterStore');
const ActionVMTemplate = require('../../../actions/appstore/vmtemplate/VMTemplateAction');
let StoreCategory = require('../../../store/appstore/category/CategoryStore');
const Pager = require('../../common/CustomPage');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow');
const ListDivider = require('material-ui/lib/lists/list-divider');
const Avatar = require('material-ui/lib/avatar');
const IconButton = require('material-ui/lib/icon-button');
const IconMenu = require('material-ui/lib/menus/icon-menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const Colors = require('material-ui/lib/styles/colors');
const Dialog = require('material-ui/lib/dialog');
var TemplateEdit = require('./templateEdit');
const Card = require('material-ui/lib/card/card');
const CardText = require('material-ui/lib/card/card-text');
const PopOver = require('material-ui/lib/popover/popover');
const TemplateConversion = require('./TemplateConversion');
var ControlButtons = require('../../common/ControlButtons');
var LoadTemplate = require('./LoadTemplate');
var StepPage = require('../../common/StepPage');

class VMTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enterpriseID: 1,
      dcID: 0,
      category: {name: ''},
      templates: [],
      totalSize: 0,
      popOverOpen: false,
      anchorEl: null,
      selectIndex: 0,
      Editdiorloag: false,
      template: null
    };
  }

  componentWillMount() {
    console.log('will mount');
    StoreVMTemplate.addFetchedTemplatesSuccessListener(this.onFetchedTemplates.bind(this));
    StoreCategory.addCategorySetListener(this.onCategoryChange.bind(this));
    StoreDatacenter.addDataCenterListListener(this.onDCChange.bind(this));
  }

  componentDidMount() {
    console.log('mounted');
    ActionVMTemplate.fetchTemplates({
      enterpriseID: this.state.enterpriseID,
      dcID: this.state.dcID,
      category: this.state.category
    });
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('will update');
    if (nextState.dcID !== 0) {
      if (nextState.category !== this.state.category) {
        ActionVMTemplate.fetchTemplates({
          enterpriseID: nextState.enterpriseID,
          dcID: nextState.dcID,
          category: nextState.category
        });
      } else if (nextState.dcID !== this.state.dcID) {
        ActionVMTemplate.fetchTemplates({
          enterpriseID: nextState.enterpriseID,
          dcID: nextState.dcID,
          category: nextState.category
        });
      }
    }
  }

  componentWillUnmount() {
    StoreVMTemplate.removeFetchedTemplatesSuccessListener(this.onFetchedTemplates.bind(this));
    StoreCategory.removeCategorySetListener(this.onCategoryChange.bind(this));
    StoreDatacenter.removeDataCenterListListener(this.onDCChange.bind(this));
  }

  onDCChange() {
    this.setState({
      dcID: StoreDatacenter.getSelectedDataCenterID(),
      category: {name: ''},
      templates: [],
      totalSize: 0,
      popOverOpen: false,
      anchorEl: null,
      selectIndex: 0,
      Editdiorloag: false,
      template: null
    });
  }

  onCategoryChange() {
    this.setState({category: StoreCategory.getSelectCategory()});
  }

  onFetchedTemplates() {
    this.setState({templates: StoreVMTemplate.getTemplates(), totalSize: StoreVMTemplate.getTotalSize()});
  }

  onFetchTemplatesFailed() {
    console.log('fetch fail');
  }

  onItemOperation(event, menuItem) {
    if (menuItem.key === 'del') {
      console.log('del');
    }
    else if (menuItem.key === 'edit') {
      console.log('edit');
      this.refs.tedit.show();

    }
    //else if (menuItem.key === 'download') {
    //  console.log('downolad');
    //  //ActionVMTemplate.downloadTemplate({url: this.state.templates[menuItem.props.index].links[9].href});
    //}
  }

  onHover(item, e) {
    console.log('hover', item.masterIndex);
  }

  unit(data, index) {
    let units = [' Byes', ' KB', ' MB', ' GB', ' TB', ' TB', ' TB', ' TB'];
    let size = '';
    if (data <= 1024) {
      size = data + units[index];
    } else if (data <= (1024 * 1024)) {
      size = (data / 1024).toFixed(2) + units[index + 1];
    } else if (data <= (1024 * 1024 * 1024)) {
      size = (data / 1024 / 1024).toFixed(2) + units[index + 2];
    } else {
      size = (data / (1024 * 1024 * 1024)).toFixed(2) + units[index + 3];
    }
    return size;
  }

  showPopOver(i, e) {
    console.log('show', i);
    this.setState({popOverOpen: true, anchorEl: e.currentTarget, selectIndex: i});
  }

  closePopOver() {
    console.log('hide');
    this.setState({popOverOpen: false});
  }

  editDialog(event, data) {
    this.setState({Editdiorloag: true, template: data, popOverOpen: false});
    console.log('defaultValues: data', data);

    //StoreVMTemplate.editTemplate({

    //  ActionVMTemplate.editTemplate({
    //    enterpriseID : this.state.enterpriseID,
    //    dcID : this.state.dcID,
    //    virtualmachinetemplatesID : data.id,
    //    data:data
    //});
  }

  _onDialogCancel() {
    this.setState({Editdiorloag: false});
  }

  _onEditSubmit(data) {
    ActionVMTemplate.editTemplate({
      enterpriseID: this.state.enterpriseID,
      dcID: this.state.dcID,
      virtualmachinetemplatesID: data.id,
      data: data
    });
    //console.log('submit data', this.refs.editTemplate._getData());
    this.setState({Editdiorloag: false});
    //var newdata = this.refs.editTemplate;
    ////newdata._getDate();
    //console.log('0000', newdata);
    //
    //
    ////StoreVMTemplate.editTemplate(data);

  }


  renderPopOver() {

    console.log('popover');
    return <PopOver open={this.state.popOverOpen}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.closePopOver.bind(this)}
                    animated={true}
                    canAutoPosition={false}>
      <List onItemTouchTap={this.onItemOperation.bind(this)} width={300}>
        <ListRow key='del' item={this.state.templates[this.state.selectIndex]}>Delete</ListRow>
        <ListRow key='edit' onTouchEvent={this.editDialog.bind(this)}
                 item={this.state.templates[this.state.selectIndex]}>Edit</ListRow>
        <a href={this.state.templates.length > 0 ? this.state.templates[this.state.selectIndex].links[9].href : ''}>Download</a>
      </List>
    </PopOver>;
  }

  _renderCards() {
    let ret = [];
    let status = '';
    let hdRequired = '';
    let ram = '';
    let cpu = '';
    for (let i = 0; i < this.state.templates.length; i++) {
      status = 'Status: ' + this.state.templates[i].state + ' ';
      hdRequired = 'Size after creation: ' +
        (this.state.templates[i].hdRequired === 0 ? 'Not Defined' : (this.unit(this.state.templates[i].hdRequired, 0))) + ' ';
      ram = 'RAM : ' + this.unit(this.state.templates[i].ramRequired, 2) + ' ';
      cpu = 'CPU : ' + this.state.templates[i].cpuRequired + ' ';
      let primaryText = (<h1>{this.state.templates[i].name}</h1>);
      let secondaryText = status + ram + cpu + hdRequired;
      let leftIcon = null;
      if (this.state.templates[i].hasOwnProperty('masterIndex')) {
        leftIcon = (<Avatar color={Colors.deepOrange300}
                            backgroundColor={Colors.purple500}>A</Avatar>);
      }
      ret.push(
        <Card key={this.state.templates[i].id}
              initiallyExpanded={false}>
          <CardText actAsExpander={true}>
            <List >
              <ListRow item={this.state.templates[i]}
                       primaryText={primaryText}
                       rightIconButton={
                       <IconButton onClick={this.showPopOver.bind(this, i)} tooltip="more" tooltipPosition="bottom-left">
                       <MoreVertIcon color={Colors.grey400}/>
                       </IconButton>
                     }
                       secondaryText={secondaryText}
                       leftIcon={leftIcon}
                       onMouseOver={this.onHover.bind(this, this.state.templates[i])}/>
            </List>
          </CardText>
          <CardText expandable={true}>
            <TemplateConversion enterpriseID={this.state.enterpriseID} dcID={this.state.dcID}
                                templateID={this.state.templates[i].id}/>
          </CardText>
        </Card>);
      ret.push(<ListDivider key={this.state.templates[i].id + 'divider'}/>);
    }

    return <div key={'templates'}>{ret}</div>;
  }

  _onAdd() {
    this.setState({LoadTemplate: true});
  }

  onloadTemplateClose() {
    this.setState({LoadTemplate: false});
  }

  loadTemplateFinish(data) {

    this.setState({LoadTemplate: false});

    var loadTemplat = this.refs.loadtemplate;
    loadTemplat.onloadTemplateFinish();
    console.log('loadTemplat', data);
  }

  //page(){
  //  return <StepPage
  //    title="从易思捷应用中心下载模板"
  //    open={this.state.LoadTemplate}
  //    autoScrollBodyContent={true}
  //    onRequestClose={this.onloadTemplateClose.bind(this)}
  //    finishHandler={this.loadTemplateFinish.bind(this)}
  //    pages={[
  //    {canSkip: false, component: <LoadTemplate ref="loadtemplate" />}]}/>;
  //}

  render() {
    var loadtemplateActions = [
      {text: '取消', onTouchTap: this.onloadTemplateClose.bind(this)},
      {text: '提交', onTouchTap: this.loadTemplateFinish.bind(this), ref: 'loadtemplatesubmit'}
    ];
    return <div>
      <Dialog
        title="从易思捷应用中心下载模板"
        open={this.state.LoadTemplate}
        actions={loadtemplateActions}
        actionFocus="submit"
        autoDetectWindowHeight={false}
        autoScrollBodyContent={false}
        ref="loadtemplateDialog">
        <div style={{height: '300px'}}>
          <LoadTemplate ref="loadtemplate" key={this.state} enterpriseID={this.state.enterpriseID}/>
        </div>
      </Dialog>
      <div>
        <TemplateEdit ref="editTemplate"
                      defaultValues={this.state.template}
                      open={this.state.Editdiorloag}
                      onRequestClose={this._onDialogCancel.bind(this)}
                      onSubmit={this._onEditSubmit.bind(this)}/>
      </div>
      <div className='template-virtual'>
        <div className='template-virtual-header'>
          <h4>虚拟模板</h4>
          <div><ControlButtons buttons={{
              addButton: true,
              editButton: false,
              deleteButton: false }} addButtonHandler={this._onAdd.bind(this)}/></div>
        </div>
        <div className='template-virtual-content'>
          {this._renderCards()}
          <Pager />
          {this.renderPopOver()}
        </div>
      </div>

    </div>;
  }
}
;
module.exports = VMTemplate;
