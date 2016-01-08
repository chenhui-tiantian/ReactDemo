/**
 * Created by Administrator on 2015/12/4 0004.
 */
'use strict';

var React = require('react');
//var StepPage = require('../../common/StepPage');
//var RackAction = require('../../../actions/datacenter/RackAction');
//var mui = require('material-ui');
//const TextField = mui.TextField;
const Toggle = require('material-ui/lib/toggle');
var AddRack = React.createClass({
  _getData() {
    let data = {};
    data.name = this.refs.rackname.value;
    data.shortDescription = this.refs.rackdescription.value;
    data.haEnabled = this.refs.haEnabled.value;
    console.log('Toggle>>', this.refs.haEnabled);
    console.log('data>>>', data);
    return {data: data, allSet: true};
  },

  render(){
    return (
      <div >
        <h3>常规信息</h3>
        <div className='inputdiv'>
          <lable className='textlabel'>名称：</lable>
          <input className='inputlargin' ref='rackname'></input>
        </div>

        <div className='inputdiv'>
          <lable className='textlabel'>描述：</lable>
          <input className='inputlargin' ref='rackdescription'></input>
        </div>

        <div className='inputdiv'>
          <lable className='textlabel'>是否开启高可用：</lable>
          <Toggle
            labelPosition="left"
            style={{width: '30%', paddingTop: '10px '}}
            name="haEnabled"
            value="haEnabled"
            ref="haEnabled"
            label=""/>
        </div>
      </div>
    );
  }
});
module.exports = AddRack;

