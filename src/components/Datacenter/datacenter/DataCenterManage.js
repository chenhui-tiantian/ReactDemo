/**
 * Created by chenh on 2015/11/19.
 * datacenter management
 * include add search delete modify
 * a
 */
'use strict';

var React = require('react');
require('../datacenter.css');

var DataCenterStore = require('../../../store/datacenter/DataCenterStore');
var DataCenterAction = require('../../../actions/datacenter/DataCenterAction');
var DataCenterList = require('./DataCenterList');
var SearchBar = require('../../common/SearchBar');
var ControlButtons = require('../../common/ControlButtons');
const Dialog = require('material-ui/lib/dialog');
var AddDataCenter = require('./AddDataCenter');

let DataCenterManage = React.createClass({
  getInitialState() {
    return {
      dataCenters: DataCenterStore.getDataCenters() || null,
      addDataCenterShow: false
    };
  },
  getDefaultProps(){
    return {
      renderAdd: true
    };
  },
  componentDidMount(){
    DataCenterStore.addDataCenterListListener(this._onChange);
    DataCenterAction.searchDataCenterByName('');
  },

  componentWillUnmount(){
    DataCenterStore.removeDataCenterListListener(this._onChange);
  },

  _onSearch(searchTxt)
  {
    DataCenterAction.searchDataCenterByName(searchTxt);
  },

  _onChange(){
    this.setState({dataCenters: DataCenterStore.getDataCenters()});
  },

  onAdd(){
    this.setState({addDataCenterShow: true});
  },
  cancelDataCenterShow(){
    this.setState({addDataCenterShow: false});
  },
  //onAddSubmit(){
  //  var dlg = this.refs.dlg;
  //  var addrule = this.refs.adddatacenter;
  //  addrule._getData();
  //  dlg.dismiss();
  //},
  renderControls(){
    let ret = null;
    if (this.props.renderAdd) {
      ret = <div className="modify">
        <ControlButtons buttons={{
              addButton: true,
              editButton: false,
              deleteButton: false
            }} addButtonHandler={this.onAdd}/>
      </div>;
    }
    return ret;
  },
  render(){
    return (
      <div className="datacenter">
        <AddDataCenter ref='adddatacenter' open={this.state.addDataCenterShow}
                       onRequestClose={this.cancelDataCenterShow} onSubmit={this.cancelDataCenterShow}/>

        <div className="datacenter-left-head">
          <h1>数据中心</h1>
          {this.renderControls()}
        </div>

        <div className="search">
          <SearchBar searchHandler={this._onSearch}/>
        </div>

        <div className="list">
          <DataCenterList datacenters={this.state.dataCenters}/>
        </div>

      </div>
    );
  }
});

module.exports = DataCenterManage;
