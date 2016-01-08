/**
 * Created by Administrator on 2015/12/9 0009.
 */
'use strict';

var React = require('react');
//var StepPage = require('../../common/StepPage');
//var RackAction = require('../../../actions/datacenter/RackAction');
//var mui = require('material-ui');
//const TextField = mui.TextField;
var AddRack = React.createClass({
  _getData() {
    let data = {};
    data.vlanIdMin = this.refs.vlanIdMin.value;
    data.vlanIdMax = this.refs.vlanIdMax.value;
    data.vlansIdAvoided = this.refs.vlansIdAvoided.value;
    data.vlanPerVdcReserved = this.refs.vlanPerVdcReserved.value;
    data.nrsq = this.refs.nrsq.value;
    return {data: data, allSet: true};
  },

  render(){
    return (
      <div>
        <h3>网络</h3>
        <div className='inputdiv'>
          <label className='textlabel'>最少VLAN ID：</label>
          <input type='number' min='0' ref='vlanIdMin'/>
        </div>

        <div className='inputdiv'>
          <label className='textlabel'>最大VLAN ID：</label>
          <input type='number' min='0' ref='vlanIdMax'/>
        </div>

        <div className='inputdiv'>
          <label className='textlabel'>排除VLAN ID：</label>
          <input type='number' min='0' ref='vlansIdAvoided'/>
        </div>

        <div className='inputdiv'>
          <label className='textlabel'>虚拟数据中心保留的VLAN：</label>
          <input type='number' min='1' ref='vlanPerVdcReserved'/>
        </div>

        <div className='inputdiv'>
          <label className='textlabel'>VLAN 池大小：</label>
          <input type='number' min='10' ref='nrsq'/>
        </div>

      </div>

    );
  }
});
module.exports = AddRack;

