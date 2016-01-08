/**
 * Created by Administrator on 2015/12/28 0028.
 */
'use strict';

var React = require('react');
//var mui = require('material-ui');
const StoreVMTemplate = require('../../../store/appstore/vmtemplate/VMTemplateStore');
function getvmTlib() {
  return {
    vmTlib: StoreVMTemplate.fetchVMTlib({enterpriseID: this.props.enterpriseID}) || null

  };
}
var LoadTemplate = React.createClass({
  getInitialState: function () {
    return getvmTlib();
  },

  componentDidMount(){
    StoreVMTemplate.vmtlibListenerSuccessListener(this._onChange);
  },

  componentWillUnmount(){
    StoreVMTemplate.removeVmtlibListenerSuccessListener(this._onChange);
  },

  _onChange()
  {
    this.setState(getvmTlib());
  },

  onloadTemplateFinish(){

  },


  render(){

    return (
      <div >
        <div className='inputdiv'>
          <lable style={{width: '100px'}} className='textlabel'>URI：</lable>
          <input className='inputlargin' ref='uri'></input>
        </div>


      </div>
    );
  }
});
module.exports = LoadTemplate;
