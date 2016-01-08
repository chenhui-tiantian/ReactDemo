/**
 * Created by jiangrx on 15-12-11.
 */
const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');

class HostDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  renderDetails() {
    if (this.props.host.hasOwnProperty('osname')) {
      return (<div className='row col-12'>
        <div className='row'>
          <div className='col-2'>
            <label>OS</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.osname}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>CPU Info</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.cpuinfo}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>Mother Board</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.blackinfo}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>Name</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.name}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label># Virtual CPUs</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.virtualCpuCores}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>Memory</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.virtualRamInMb / 1024} (GB)</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>Hypervisor</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.type}</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-2'>
            <label>OS</label>
          </div>
          <div className='col-10'>
            <span >{this.props.host.osname}</span>
          </div>
        </div>
      </div>);
    } else {
      return <div></div>;
    }
  }

  render() {
    return <Dialog
      actions={[<FlatButton
          label="Close"
          secondary={true}
          onTouchTap={this.props.onRequestClose}/>]}
      onRequestClose={this.props.onRequestClose}
      open={this.props.open}>
      {this.renderDetails()}
    </Dialog>;
  }
}
HostDetails.defaultProps = {
  dcID: 1,
  rackID: 0,
  hostID: 0,
  open: false,
  host: {}
};
module.exports = HostDetails;
