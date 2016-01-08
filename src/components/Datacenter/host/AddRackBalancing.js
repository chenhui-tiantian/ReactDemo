/**
 * Created by Administrator on 2015/12/9 0009.
 */
'use strict';
var React = require('react');
var RackAction = require('../../../actions/datacenter/RackAction');
var mui = require('material-ui');
const Toggle = require('material-ui/lib/toggle');
const TextField = mui.TextField;
const TimePicker = require('material-ui/lib/time-picker');
var AddRack = React.createClass({
  _getData() {
    let data = {};
    data.drsEnabled = this.refs.drsEnabled;
    data.dpmEnabled = this.refs.dpmEnabled;
    data.dpmnum = this.refs.dpmnum;
    data.drsnum = this.refs.drsnum;
    data.overtime = this.refs.overtime.value;
    data.starttime = this.refs.starttime.value;
    return {data: data, allSet: true};
  },

  //addDataCenter(){
  //  var name = this.refs.rackname.getValue();
  //  var shortDescription = this.refs.rackdescription.getValue();
  //
  //  var rack = {
  //    name: name,
  //    location: shortDescription
  //
  //  };
  //
  //
  //},

  render(){
    return (
      <div>
        <h3 >负载均衡</h3>
        <div className='inputdiv'>
          <lable className='textlabel'>开启均匀分布策略：</lable>
          <Toggle
            style={{width: '30%', paddingTop: '10px '}}
            name="drsEnabled"
            value="drsEnabled"
            label=" " />
        </div>
        <div className='inputdiv'>
          <lable className='textlabel'>当服务器CPU或内存大于：</lable>
          <input type='number' defaultValue="80" />
        </div>

        <div className='inputdiv'>
          <lable className='textlabel'>开启节电策略：</lable>
          <Toggle
            style={{width: '30%', paddingTop: '10px '}}
            name="dpmEnabled"
            value="dpmEnabled"
            label=" "/>
        </div>
        <div className='inputdiv'>
          <lable className='textlabel'>保持服务器CPU或内存低于：</lable>
          <input type='number' defaultValue="5" />
        </div>

        <div className='inputdiv'>运行策略在以下时间：</div>
        <div className='inputdiv'>
          <label className='textlabel'>开始时间：</label>
          <input id="rack.starttime"
                     type="time"  defaultValue="00:00" ref="starttime"
                     min="0"
                     max="24" />
        </div>

          <div className='inputdiv'>
            <label className='textlabel'>结束时间：</label>
            <input id="rack.overtime" defaultValue="06:00"
                       type="time" ref="overtime"
                       min="0"
                       max="24" />

          </div>



      </div>
    );
  }
});
module.exports = AddRack;

