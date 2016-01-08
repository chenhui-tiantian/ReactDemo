/**
 * Created by caijm on 2015/12/3 0003.
 */
'use strict';
var React = require('react');
var SearchBar = require('../../common/SearchBar');
var ControlButtons = require('../../common/ControlButtons');
const HostsList = require('./HostsList');
let AddHost = require('./AddHost');
let DiscoverHost = require('./DiscoverHost');
let HostInfo = require('./HostInfo');
let HostStorage = require('./HostStorage');
let HostNetwork = require('./HostNetwork');
let ActionRack = require('../../../actions/datacenter/HostAction');
let StoreRack = require('../../../store/datacenter/HostStore');
let HostContent = React.createClass({
  getInitialState(){
    return {
      hosts: [],
      addHostPageOpen: false
    };
  },
  getDefaultProps(){
    return {
      dcID: 0,
      rackID: 0
    };
  },

  componentWillMount() {
    StoreRack.addFetchHostsSuccessListener(this.onHostsChange);
    StoreRack.addTriggerHostsChange(this.triggerHostsChange);
  },

  componentWillUnmount() {
    StoreRack.removeFetchHostsSuccessListener(this.onHostsChange);
    StoreRack.removeTriggerHostsChange(this.triggerHostsChange);
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      hosts: [],
      addHostPageOpen: false
    });
    if ((nextProps.rackID !== 0 ) && (nextProps.dcID !== 0)) {
      ActionRack.fetchHosts({dcID: nextProps.dcID, rackID: nextProps.rackID});
    }
  },

  triggerHostsChange() {
    ActionRack.fetchHosts({dcID: this.props.dcID, rackID: this.props.rackID});
  },

  onHostsChange() {
    this.setState({hosts: StoreRack.getHosts()});
  },

  onAddHost() {
    this.setState({addHostPageOpen: true});
  },

  onAddHostClose() {
    this.setState({addHostPageOpen: false});
  },

  onAddHostFinish(data) {
    let ret = data[1].data;
    ret.datastores = data[3].data;
    ret.networkInterfaces = data[2].data;
    ActionRack.addHost({dcID: this.props.dcID, rackID: this.props.rackID, data: JSON.stringify(ret)});
    this.setState({addHostPageOpen: false});
  },

  render() {
    return (
      <div>
        <div className="host-head">
          <h4>Hosts</h4>
          <div><ControlButtons buttons={{addButton: true}} addButtonHandler={this.onAddHost}/></div>
          <div className="search"><SearchBar searchHandler={this._onSearch}/></div>
        </div>
        <div className="host-container">
          <HostsList dcID={this.props.dcID} rackID={this.props.rackID} hosts={this.state.hosts}/>
        </div>
        <div>
          <AddHost
            dcID={this.props.dcID}
            rackID={this.props.rackID}
            title="Add Host"
            open={this.state.addHostPageOpen}
            autoScrollBodyContent={true}
            onRequestClose={this.onAddHostClose}
            finishHandler={this.onAddHostFinish}
            pages={[
            {canSkip: false, component: <DiscoverHost dcID={this.props.dcID} rackID={this.props.rackID}/>},
            {canSkip: false, component: <HostInfo dcID={this.props.dcID} rackID={this.props.rackID}/>},
            {canSkip: false, component: <HostNetwork dcID={this.props.dcID} rackID={this.props.rackID}/>},
            {canSkip: false, component: <HostStorage dcID={this.props.dcID} rackID={this.props.rackID}/>}]}/>
        </div>
      </div>
    );
  }
});
HostContent.defaultProps =

  module.exports = HostContent;
