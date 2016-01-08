/**
 * Created by jiangrx on 15-12-15.
 */
'use strict';
const React = require('react');
const StoreNetwork = require('../../../../store/datacenter/NetworkStore');
const ActionNetwork = require('../../../../actions/datacenter/NetworkAction');
const DropDownMenu = require('material-ui/lib/drop-down-menu');

class VMInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networks: [],
      ips: []
    };
    this._networksCounter = 0;
  }

  componentWillMount() {
    StoreNetwork.addNetworkPrivateListener(this.onPrivateNetworkFetched.bind(this));
    StoreNetwork.addNetworkExternalListener(this.onExternalNetworkFetched.bind(this));
    StoreNetwork.addNetworkPrivateListener(this.onPublicNetworkFetched.bind(this));
    StoreNetwork.addNetworkExternalIPsListener(this.onExternalIPsFetched.bind(this));
    StoreNetwork.addNetworkPrivateIPSListener(this.onPrivateIPsFetched.bind(this));
    StoreNetwork.addNetworkPublicIPsListener(this.onPublicIPsFetched.bind(this));
    ActionNetwork.getExternalNetworks({dcID: this.props.dcID});
    ActionNetwork.getPrivateNetworks({dcID: this.props.dcID});
    ActionNetwork.getPublicNetworks({dcID: this.props.dcID});
  }

  componentWillUnmount() {
    StoreNetwork.removeNetworkPrivateListener(this.onPrivateNetworkFetched);
    StoreNetwork.removeNetworkExternalListener(this.onExternalNetworkFetched);
    StoreNetwork.removeNetworkPrivateListener(this.onPublicNetworkFetched);
    StoreNetwork.removeNetworkExternalIPsListener(this.onExternalIPsFetched);
    StoreNetwork.removeNetworkPrivateIPSListener(this.onPrivateIPsFetched);
    StoreNetwork.removeNetworkPublicIPsListener(this.onPublicIPsFetched);
  }

  onPrivateNetworkFetched() {
    this._networksCounter++;
    if (this._networksCounter === 3) {
      var privateNetwork = StoreNetwork.getPrivateNetworks();
      var publicNetwork = StoreNetwork.getPublicNetworks();
      var externalNetwork = StoreNetwork.getExternalNetworks();
      this.setState({networks: externalNetwork.concat(publicNetwork, privateNetwork)});
    }
  }

  onExternalNetworkFetched() {
    this._networksCounter++;
    if (this._networksCounter === 3) {
      var privateNetwork = StoreNetwork.getPrivateNetworks();
      var publicNetwork = StoreNetwork.getPublicNetworks();
      var externalNetwork = StoreNetwork.getExternalNetworks();
      this.setState({networks: externalNetwork.concat(publicNetwork, privateNetwork)});
    }
  }

  onPublicNetworkFetched() {
    this._networksCounter++;
    if (this._networksCounter === 3) {
      var privateNetwork = StoreNetwork.getPrivateNetworks();
      var publicNetwork = StoreNetwork.getPublicNetworks();
      var externalNetwork = StoreNetwork.getExternalNetworks();
      this.setState({networks: externalNetwork.concat(publicNetwork, privateNetwork)});
      this._networksCounter = 0;
    }
  }

  onPrivateNetworkFetched() {
    this._networksCounter++;
    if (this._networksCounter === 3) {
      var privateNetwork = StoreNetwork.getPrivateNetworks();
      var publicNetwork = StoreNetwork.getPublicNetworks();
      var externalNetwork = StoreNetwork.getExternalNetworks();
      this.setState({networks: externalNetwork.concat(publicNetwork, privateNetwork)});
      this._networksCounter = 0;
    }
  }

  onExternalNetworkFetched() {
    this._networksCounter++;
    if (this._networksCounter === 3) {
      var privateNetwork = StoreNetwork.getPrivateNetworks();
      var publicNetwork = StoreNetwork.getPublicNetworks();
      var externalNetwork = StoreNetwork.getExternalNetworks();
      this.setState({networks: externalNetwork.concat(publicNetwork, privateNetwork)});
      this._networksCounter = 0;
    }
  }

  onPublicIPsFetched() {
    this.setState({ips: StoreNetwork.getPublicIPs()});
  }

  onExternalIPsFetched() {
    this.setState({ips: StoreNetwork.getExternalIPs()});
  }

  onPrivateIPsFetched() {
    this.setState({ips: StoreNetwork.getPrivateIPs()});
  }

  _getData() {
    let vmData = this.props.vm;
    if (this._label.value.length > 0) {
      vmData.label = this._label.value;
    }
    if (this._cpu.value.length > 0) {
      vmData.cpu = parseInt(this._cpu.value);
    }
    if (this._ram.value.length > 0) {
      vmData.ram = parseInt(this._ram.value);
    }
    if (this._bandwidth.value.length > 0) {
      vmData.bandwidth = parseInt(this._bandwidth.value);
    }
    if (this._desc.value.length > 0) {
      vmData.description = this._desc.value;
    }
    for (let i = 0; i < vmData.nics.collection.length; i++) {
      vmData.nics.collection[0].ip = this.state.ips[this.refs['_ip' + i].state.selectedIndex].ip;
      vmData.nics.collection[0].links = [{
        rel: 'vlan',
        type: 'application/vnd.esage.vlan+json',
        title: this.state.networks[this.refs['_vlan' + i].state.selectedIndex].name,
        href: this.state.networks[this.refs['_vlan' + i].state.selectedIndex].links[4].href.substring(0, this.state.networks[this.refs['_vlan' + i].state.selectedIndex].links[4].href.length - 4)
      }]
      ;
    }
    return {data: vmData, allSet: true};
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

  onVLANSelect(event, index) {
    if (this.state.networks[index].type === 'EXTERNAL') {
      ActionNetwork.getExternalIPs({url: this.state.networks[index].links[7].href});
    } else if (this.state.networks[index].type === 'INTERNAL') {
      ActionNetwork.getPrivateIPs({url: this.state.networks[index].links[2].href});
    } else if (this.state.networks[index].type === 'PUBLIC') {//TODO: create 'public lan' to test
      ActionNetwork.getPublicIPs({url: this.state.networks[index].links[7].href});
    }
  }

  renderNetworks() {
    let nics = this.props.vm.nics.collection;
    console.log(this.state.networks);
    console.log(this.state.ips);
    let ret = [];
    for (let i = 0; i < nics.length; i++) {
      ret.push(<div className='row col-12'>
        <div className='row col-12'>
          <h4>MAC - {nics[i].mac}</h4>
        </div>
        <div className='row '>
          <div className='col-6'>
            <h4>VLAN</h4>
            <DropDownMenu ref={'_vlan' + i}
                          menuItems={this.state.networks}
                          displayMember='name'
                          valueMember='id'
                          onChange={this.onVLANSelect.bind(this)}/>
          </div>
          <div className='col-6'>
            <h4>IP</h4>
            <DropDownMenu ref={'_ip' + i}
                          menuItems={this.state.ips}
                          displayMember='ip'
                          valueMember='id'/>
          </div>
        </div>
      </div>);
    }
    return ret;
  }

  renderInfo() {
    return <div className='row col-12'>
      <div className='row'>
        <div className='col-2'>
          <label>UUID</label>
        </div>
        <div className='col-10'>
          <span>{this.props.vm.uuid}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>Label</label>
        </div>
        <div className='col-10'>
          <input type='text' ref={(ref) => this._label = ref} defaultValue={this.props.vm.label}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>CPU</label>
        </div>
        <div className='col-10'>
          <input type='number' ref={(ref) => this._cpu = ref} defaultValue={this.props.vm.cpu}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>RAM</label>
        </div>
        <div className='col-10'>
          <input type='number' min='0' ref={(ref) => this._ram = ref} defaultValue={this.props.vm.ram}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>Bandwidth</label>
        </div>
        <div className='col-10'>
          <input type='number' min='0' ref={(ref) => this._bandwidth = ref}
                 defaultValue={this.props.vm.hasOwnProperty('bandwidth') ? this.props.vm.bandwith : ''}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>Disk</label>
        </div>
        <div className='col-10'>
          <span>{this.unit(Number.parseInt(this.props.vm.hdInBytes), 0)}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label>Desc</label>
        </div>
        <div className='col-10'>
          <textarea ref={(ref) => this._desc = ref} defaultValue={this.props.vm.description}/>
        </div>
      </div>
      <div className='row col-12'>
        {this.renderNetworks()}
      </div>
    </div>;
  }

  render() {
    return this.renderInfo();
  }
}
VMInfo.defaultProps = {
  dcID: 1,
  rackID: 0,
  hostID: 0,
  vm: {},
  vAppID: 0
};
module.exports = VMInfo;
