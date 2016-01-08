'use strict';

var React = require('react');
require('./datacenter.css');
const RadioButton = require('material-ui/lib/radio-button');
const RadioButtonGroup = require('material-ui/lib/radio-button-group');

var RuleAction = require('../../actions/datacenter/RuleAction');
var RuleStore = require('../../store/datacenter/RulesStore');

var GlobalRullManage = require('./rules/GlobalRullManage');
const Dialog = require('material-ui/lib/dialog');
var AddGlobalRule = require('./rules/AddGlobalRule');
var ControlButtons = require('../common/ControlButtons');
function getAllRules() {
  return {
    globalrules: RuleStore.getGlobalRules() || null
  };
}

var Rule = React.createClass({
  getInitialState: function () {
    return getAllRules();
  },

  componentDidMount(){
    RuleStore.addChangedListener(this._onChange);
    RuleStore.searchGlobalRules();
  },

  componentWillUnmount(){
    RuleStore.removeChangedListener(this._onChange);
  },

  _onChange()
  {
    this.setState(getAllRules());
  },
//<div  className='datacenterrules'>
//  <DataCenterRuleManage datacenterrules = {this.state.datacenterrules}/>
//</div>
  _onfitPolicyclick(positionElement, fitPolicyValue)
  {
    console.log(positionElement);
    RuleAction.modifyEnterpriseExclusions(positionElement);
  },

  _onDialogSubmit(){
    var dlg = this.refs.dlg;
    var addrule = this.refs.addGlobalRule;
    addrule._onDialogSubmit();
    dlg.dismiss();
  },

  show(){
    this.refs.dlg.show();
  },

  render () {

    var standardActions = [
      {text: '取消'},
      {text: '确定', onTouchTap: this._onDialogSubmit, ref: 'submit'}
    ];
    return (
      <div className='globalrules'>
        <Dialog
          style={{height: '200px'}}
          title="主机共享策略"
          actions={standardActions}
          actionFocus="submit"
          ref="dlg">
          <AddGlobalRule ref="addGlobalRule"/>
        </Dialog>

        <div className='fitPolicyRules'>
          负载均衡策略
          <RadioButtonGroup name="fitPloicy"
                            valueSelected={this.state.globalrules.fitPolicyRules.fitPolicy}>
            <RadioButton
              onClick={this._onfitPolicyclick.bind(this, 'PERFORMANCE')}
              value="PERFORMANCE"
              label="PERFORMANCE"
              style={{marginBottom: 16}}/>

            <RadioButton
              onClick={this._onfitPolicyclick.bind(this, 'PROGRESSIVE')}
              value="PROGRESSIVE"
              label="PROGRESSIVE"
              style={{marginBottom: 16}}/>
          </RadioButtonGroup>
        </div>

        <div className='controlButtons'>
          <ControlButtons buttons={{addButton: true, editButton: false, deleteButton: false}}
                          addButtonHandler={this.show}/>
        </div>

        <div className='rulelist'>
          <GlobalRullManage globalrules={this.state.globalrules.enterpriseExclusionRules}/>
        </div>

      </div>);
  }
});


module.exports = Rule;
