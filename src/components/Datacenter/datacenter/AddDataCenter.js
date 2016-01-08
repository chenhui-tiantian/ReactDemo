/**
 * Created by lenovo on 2015/12/1.
 */
var React = require('react');

let DataCenterAction = require('../../../actions/datacenter/DataCenterAction');
let RaisedButton = require('material-ui/lib/raised-button');
let Dialog = require('material-ui/lib/dialog');
require('./AddDataCenter.css');

var AddDataCenter = React.createClass({
  getInitialState() {
    return {
      ip: '',
      virtualfactory: '',
      vsm: '',
      am: '',
      nodecollector: '',
      ssm: '',
      bpmasync: '',
      DHCPcom: '',
      DHCPIPcom: ''
    };
  },
  addDataCenter(event){
    event.preventDefault();
    var name = this.refs.name.value;
    var location = this.refs.location.value;
    var datacenter = {
      name: name,
      location: location,
      remoteServices: {
        collection: [{
          type: 'VIRTUAL_FACTORY',
          uri: this.state.virtualfactory
        },
          {
            type: 'VIRTUAL_SYSTEM_MONITOR',
            uri: this.state.vsm
          },
          {
            type: 'APPLIANCE_MANAGER',
            uri: this.state.am
          },
          {
            type: 'NODE_COLLECTOR',
            uri: this.state.nodecollector
          },
          {
            type: 'STORAGE_SYSTEM_MONITOR',
            uri: this.state.ssm
          },
          {
            type: 'BPM_SERVICE',
            uri: this.state.bpmasync
          },
          {
            type: 'DHCP_SERVICE',
            uri: this.state.DHCPcom
          },
          {
            type: 'DHCPv6',
            uri: this.state.DHCPIPcom
          }
        ]
      }
    };
    DataCenterAction.addDataCenter(datacenter);
    this.props.onSubmit();
  },
  onChange(e){
    var ip = e.target.value;
    var virtualfactory = 'http://' + ip + ':8009/virtualfactory';
    var vsm = 'http://' + ip + ':8009/vsm';
    var am = 'http://' + ip + ':8009/am';
    var nodecollector = 'http://' + ip + ':8009/nodecollector';
    var ssm = 'http://' + ip + ':8009/ssm';
    var bpmasync = 'http://' + ip + ':8009/bpm-async';
    var DHCPcom = 'omapi://' + ip + '/:7911';
    var DHCPIPcom = 'omapi://' + ip + '/:7911';
    this.setState({
      ip: ip,
      virtualfactory: virtualfactory,
      vsm: vsm,
      am: am,
      nodecollector: nodecollector,
      ssm: ssm,
      bpmasync: bpmasync,
      DHCPcom: DHCPcom,
      DHCPIPcom: DHCPIPcom
    });

  },
  render(){

    return (<Dialog
      title="添加数据中心"
      open={this.props.open}
      actions={[<RaisedButton secondary={true} label='取消' onTouchTap={this.props.onRequestClose} />,
      <RaisedButton label='提交' primary={true} ref='submit' type='submit' form='addDataCenter'/>
    ]}
      actionFocus="submit"
      autoDetectWindowHeight={true}
      autoScrollBodyContent={true}>
      <form className='addDataCenter' id='addDataCenter' onSubmit={this.addDataCenter}>

        <div className='entry'>
          <div className='entryLabel'>名称：</div>
          <input className='entryInput' ref='name' type='text' required />
        </div>

        <div className='entry'>
          <div className='entryLabel'>位置：</div>
          <input className='entryInput' ref='location' required />
        </div>

        <div className='entry'>
          <div className='entryLabel'>IP地址</div>
          <input className='entryInput' ref='ip' onChange={this.onChange} required/>
        </div>

        <div className='entry'>
          <div className='entryLabel'>虚拟化管理组件：</div>
          <div className='entryInput'>
            <input ref='virtualfactory' value={this.state.virtualfactory}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <div className='entryLabel'>监控组件：</div>
          <div className='entryInput'>
            <input ref='vsm' value={this.state.vsm}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <div className='entryLabel'>应用商店组件：</div>
          <div className='entryInput'>
            <input ref='am' value={this.state.am}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <label className='entryLabel'>IT资产组件：</label>
          <div className='entryInput'>
            <input ref='nodecollector' value={this.state.nodecollector}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <div className='entryLabel'>存储管理组件：</div>
          <div className='entryInput'>
            <input ref='ssm' value={this.state.ssm}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <div className='entryLabel'>业务流程组件：</div>
          <div className='entryInput'>
            <input ref='bpm-async' value={this.state.bpmasync}/>
            <RaisedButton label="检查" secondary={true}/>
          </div>
        </div>

        <div className='entry'>
          <div className='entryLabel'>DHCP组件：</div>
          <input className='entryInput' ref='DHCPcom' value={this.state.DHCPcom}/>
        </div>

        <div className='entry'>
          <div className='entryLabel'>DHCP&IPv组件：</div>
          <input className='entryInput' ref='DHCPIPcom' value={this.state.DHCPIPcom}/>
        </div>
      </form>
    </Dialog>);
  }
});
module.exports = AddDataCenter;
