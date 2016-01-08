/**
 * Created by jiangrx on 15-12-14.
 */

const React = require('react');
const SearchBar = require('../../../common/SearchBar');
const VMList = require('./VMList');
const FlatButton = require('material-ui/lib/flat-button');
const ActionVM = require('../../../../actions/datacenter/VMAction');
const StoreVM = require('../../../../store/datacenter/VMStore');
const ActionMachine = require('../../../../actions/datacenter/MachineAction');

class VM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vms: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.dcID > 0 ) &&
      (nextProps.rackID > 0) &&
      (nextProps.hostID > 0) && nextProps.show) {
      ActionVM.listVMS({dcID: nextProps.dcID, rackID: nextProps.rackID, hostID: nextProps.hostID});
    }
  }

  componentDidMount() {
    StoreVM.addListVMsSuccessListener(this.onFetchedVMs.bind(this));
  }
  componentWillUnmount(){
    StoreVM.removeListVMsSuccessListener(this.onFetchedVMs);
  }

  onFetchedVMs() {
    this.setState({vms: StoreVM.getVMs()});
  }

  onClose() {
    ActionMachine.toggleHostPage();
  }

  render() {
    return <div className='row col-12'>
      <div className='row'>
        <div className='col-2'><FlatButton label="Back" onTouchTap={this.onClose.bind(this)}/></div>
        <div className='col-10'></div>
        <h3>Machine - {this.props.host.name}</h3></div>
      <div className='row '>
        <div className='col-10'><SearchBar /></div>
        <div className='col-2'></div>
      </div>
      <div className='row col-12'>
        <VMList dcID={this.props.dcID}
                rackID={this.props.rackID}
                hostID={this.props.hostID}
                host={this.props.host}
                vms={this.state.vms}/>
      </div>
    </div>;
  }
}
VM.defaultProps = {
  dcID: 1,
  rackID: 1,
  hostID: 26,
  host: {},
  show: false
};
module.exports = VM;
