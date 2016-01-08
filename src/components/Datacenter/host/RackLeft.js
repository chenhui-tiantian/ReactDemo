/**
 * Created by Administrator on 2015/12/8 0008.
 */
//数据中心下资源池列表的界面
var React = require('react');
var ControlButtons = require('../../common/ControlButtons');
var SearchBar = require('../../common/SearchBar');
var RackStore = require('../../../store/datacenter/RackStore');
var RackAction = require('../../../actions/datacenter/RackAction');
var RackList = require('./RackList');
var AddRackGeneralInfo = require('./AddRackGeneralInfo');
var AddRackBalancing = require('./AddRackBalancing');
var AddRackNetwork =  require('./AddRackNetwork');
var StepPage = require('../../common/StepPage');

var RackLeft = React.createClass({
  getDefaultProps(){
    return {
      dcID: 0
    };
  },
  _onSearch(searchTxt){
    RackAction.searchRackByName({name: searchTxt, dcID: this.props.dcID });
  },
  getInitialState(){
    return {
      volumeEditPageOpen: false
    };
  },

  onVolumeEditPageRequestClose(){
    this.setState({volumeEditPageOpen: false});
  },

  onVolumeEditPageFinish(data){
    var newdata=JSON.stringify({
      "name": data[0].data.name,
      "shortDescription": data[0].data.shortDescription,
      "haEnabled": data[0].data.haEnabled,
      "drsEnabled": data[1].data.drsEnabled,
      "drsnum": data[1].data.drsnum,
      "dpmEnabled": data[1].data.dpmEnabled,
      "dpmnum": data[1].data.dpmnum,
      "starttime": data[1].data.starttime,
      "overtime": data[1].data.overtime,
      "vlanIdMin": data[2].data.vlanIdMin,
      "vlanIdMax": data[2].data.vlanIdMax,
      "vlansIdAvoided": data[2].data.vlansIdAvoided,
      "vlanPerVdcReserved": data[2].data.vlanPerVdcReserved,
      "nrsq": data[2].data.nrsq
    });

    this.setState({volumeEditPageOpen: false});
    console.log('1111111111111addrack>>>>',newdata);
    RackAction.addRack(this.props.dcID ,newdata);

  },
  page(){
    return <StepPage
      title="添加资源池"
      open={this.state.volumeEditPageOpen}
      autoScrollBodyContent={true}
      onRequestClose={this.onVolumeEditPageRequestClose}
      finishHandler={this.onVolumeEditPageFinish}
      pages={[
      {canSkip: false, component: <AddRackGeneralInfo />},
      {canSkip: false, component: <AddRackBalancing />},
      {canSkip: false, component: <AddRackNetwork />}]}/>;
  },
  _onAdd(){
   this.setState({volumeEditPageOpen: true});
  },
  render: function () {
    return (

      <div className="machine">
        <div>{this.page()}</div>
        <div className="host-head">
          <h4>资源池</h4>
          <div><ControlButtons buttons={{
              addButton: true,
              editButton: false,
              deleteButton: false }} addButtonHandler={this._onAdd} /></div>
          <div className="search"><SearchBar searchHandler={this._onSearch}/></div>
          <div className="host-container">
            <div className="host-list">
              <RackList dcID={this.props.dcID} racks={this.props.racks} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = RackLeft;
