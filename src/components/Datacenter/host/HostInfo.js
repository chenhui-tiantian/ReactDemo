/**
 * Created by jiangrx on 15-12-11.
 */
const React = require('react');
const FlatButton = require('material-ui/lib/flat-button');
let ActionHost = require('../../../actions/datacenter/HostAction');
let StoreHost = require('../../../store/datacenter/HostStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class HostInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateCheck: ''
    };
  }

  componentWillMount() {
    this.setState({stateCheck: this.props.host.state});
    StoreHost.addStateCheckChange(this.onStateCheckComplete.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({stateCheck: nextProps.host.state});
  }

  componentWillUnmount() {
    StoreHost.removeStateCheckChange(this.onStateCheckComplete);
  }


  stateCheck() {
    ActionHost.stateCheckHost({url: this.props.host.links[5].href});
  }

  onStateCheckComplete() {
    console.log('state: ' + StoreHost.getCheckState());
    this.setState({stateCheck: StoreHost.getCheckState()});
  }

  _getData() {
    let data = this.props.host;
    if (this._user.value.length > 0) {
      data.user = this._user.value;
    }
    if (this._password.value.length > 0) {
      data.password = this._password.value;
    }
    if (this._port.value.length > 0) {
      data.port = this._port.value;
    }
    data.name = this._name.value;
    data.description = this._description.value;
    data.ipService = this._ipService.value;
    return {data: data, allSet: true};
  }

  render() {
    return (<div className='row col-12'>
      <div className='row'>
        <label>Name *</label>
        <input type='text' ref={(ref) => this._name = ref } defaultValue={this.props.host.name}/>
      </div>
      <div className='row'>
        <label>Description </label>
        <textarea ref={(ref) => this._description = ref } defaultValue={this.props.host.description}/>
      </div>
      <div className='row'>
        <label>Remote IP *</label>
        <input type='text' ref={(ref) => this._ipService = ref } defaultValue={this.props.host.ipService}/>
      </div>
      <div className='row'>
        <label>User </label>
        <input type='text' ref={(ref) => this._user = ref } defaultValue={this.props.host.user}/>
      </div>
      <div className='row'>
        <label>Password</label>
        <input type='password' ref={(ref) => this._password = ref } defaultValue={this.props.host.password}/>
      </div>
      <div className='row'>
        <label>Port</label>
        <input type='number' min='0' ref={(ref) => this._port = ref }/>
      </div>
      <div className='row'>
        <label>State</label>
        <div className='row col-12'>
          <label>{this.state.stateCheck}</label>
          <FlatButton label="Check" onTouchTap={this.stateCheck.bind(this)}/>
        </div>
      </div>
    </div>);
  }
}
HostInfo.defaultProps = {
  dcID: 1,
  rackID: 0,
  host: {}
};

module.exports = HostInfo;
