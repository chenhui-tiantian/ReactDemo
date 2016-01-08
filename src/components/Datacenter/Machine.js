'use strict';

var React = require('react');
var RackLeft = require('./host/RackLeft');
var HostContent = require('./host/HostContent');
var StoreRack = require('../../store/datacenter/RackStore');
var ActionRack = require('../../actions/datacenter/RackAction');
let StoreHost = require('../../store/datacenter/HostStore');
let StoreMachine = require('../../store/datacenter/MachineStore');
var StoreDataCenter = require('../../store/datacenter/DataCenterStore');
let VM = require('./host/vm/VM');


var Machine = React.createClass({
  getInitialState() {
    return {
      dcID: 0,
      rackID: 0,
      racks: [],
      hostID: 0,
      host: {},
      showVMs: false
    };
  },
  getDefaultProps(){
    return {
      dcID: 0
    };
  },
  componentWillMount(){
    StoreRack.addChangedListener(this._onChange);
    StoreRack.addRackIDChangedListener(this._onRackIDChange);
    StoreHost.addTriggerHostChange(this.onHostChanged);
    StoreMachine.addHostPageToggleListener(this.onTogglePage);
    StoreDataCenter.addDataCenterListListener(this.onDCChange);
    this.setState({dcID: StoreDataCenter.getSelectedDataCenterID()});
  },
  componentDidMount(){
    if (this.state.dcID !== 0) {
      ActionRack.getRack({dcID: this.state.dcID});
    }
  },
  componentWillUpdate(nextProps, nextState){
    if (nextState.dcID !== this.state.dcID) {
      ActionRack.getRack({dcID: nextState.dcID});
    }
  },
  componentWilUnmount(){
    StoreRack.removeChangedListener(this._onChange);
    StoreRack.removeRackIDChangedListener(this._onRackIDChange);
    StoreHost.removeTriggerHostChange(this.onHostChanged);
    StoreMachine.removeHostPageToggleListener(this.onTogglePage);
    StoreDataCenter.removeDataCenterListListener(this.onDCChange);
  },
  onDCChange(){
    this.setState({
      dcID: StoreDataCenter.getSelectedDataCenterID(),
      rackID: 0,
      racks: [],
      hostID: 0,
      host: {},
      showVMs: false
    });
  },
  _onRackIDChange(){
    console.log('rackID changed');
    this.setState({rackID: StoreRack.getRackID()});
  },
  _onChange(){
    console.log(StoreRack.getRacks());
    this.setState({racks: StoreRack.getRacks()});
  },
  onHostChanged(){
    console.log('host changed');
    let host = StoreHost.getHost();
    this.setState({host: host, hostID: host.id, showVMs: true});
  },
  onTogglePage(){
    this.setState({showVMs: !this.state.showVMs});
  },
  renderVMs(){
    let display = this.state.showVMs ? 'block' : 'none';
    return <div className="machine" style={{display}}>
      <div className='row col-12'>
        <VM dcID={this.state.dcID} rackID={this.state.rackID} hostID={this.state.hostID}
            host={this.state.host} show={this.state.showVMs}/>
      </div>
    </div>;
  },
  renderHosts(){
    let display = this.state.showVMs ? 'none' : 'block';
    return <div className="machine" style={{display}}>
      <div className="machine-list"><RackLeft dcID={this.state.dcID} racks={this.state.racks}/></div>
      <div className="machine-content"><HostContent dcID={this.state.dcID} rackID={this.state.rackID}/></div>
    </div>;
  },
  render (){
    return <div>
      {this.renderHosts()}
      {this.renderVMs()}
    </div>;
  }
});
module.exports = Machine;
