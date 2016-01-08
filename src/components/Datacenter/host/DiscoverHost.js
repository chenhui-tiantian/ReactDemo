/**
 * Created by jiangrx on 15-12-11.
 */
const React = require('react');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

class DiscoverHost extends React.Component {
  constructor(props) {
    super(props);
    this.menuItems = [{payload: 'KVM', text: 'KVM'},
      {payload: 'Xen', text: 'Xen'}];
  }

  _getData() {
    let data = {
      user: this._user.value,
      password: this._password.value,
      hypervisor: this.menuItems[this._hypervisor.state.selectedIndex].payload,
      ip: this._ip.value
    };
    if (this._port.value.length > 0) {
      data.port = this._port.value;
    }
    return {data: data, allSet: true};
  }

  render() {
    return <div className='row col-12'>
      <div className='row'>
        <div className='col-3'>
          <label>Hypervisor *</label>
        </div>
        <div className='col-8'>
          <DropDownMenu menuItems={this.menuItems} ref={(ref) => this._hypervisor = ref}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <label>IP *</label>
        </div>
        <div className='col-8'>
          <input type='text' ref={(ref) => this._ip = ref}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <label>User *</label>
        </div>
        <div className='col-8'>
          <input type='text' ref={(ref) => this._user = ref}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <label>Password *</label>
        </div>
        <div className='col-8'>
          <input type='password' ref={(ref) => this._password = ref}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-3'>
          <label>Port </label>
        </div>
        <div className='col-8'>
          <input type='number' ref={(ref) => this._port = ref}/>
        </div>
      </div>
    </div>;
  }
}
DiscoverHost.defaultProps = {
  dcID: 1,
  rackID: 0
};
module.exports = DiscoverHost;
