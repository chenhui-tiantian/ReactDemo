/**
 * Created by chenh on 2015/12/7.
 */
var React = require('react');

var RuleAction = require('../../../actions/datacenter/RuleAction');
var RuleStore = require('../../../store/datacenter/RulesStore');

const DropDownMenu = require('material-ui/lib/drop-down-menu');

require('./AddGlobalRule.css');

var AddGlobalRule = React.createClass({

  getInitialState: function () {
    return {
      enterprises: RuleStore.getAllEnterprise() || null
    };
  },

  componentDidMount(){
    RuleStore.addChangedListener(this._onChange);
    RuleStore.searchAllEnterprises();
  },

  componentWillUnmount(){
    RuleStore.removeChangedListener(this._onChange);
  },

  _onChange()
  {
    this.setState({enterprises: RuleStore.getAllEnterprise()});
  },
  _onDialogSubmit(){
    var enterpriser1 = {};
    enterpriser1.title = 'enterprise1';
    enterpriser1.rel = 'enterprise';
    enterpriser1.type = selectenterpriser1.type;
    enterpriser1.href = selectenterpriser1.href;


    var enterpriser2 = {};
    enterpriser2.title = 'enterprise2';
    enterpriser2.rel = 'enterprise';
    enterpriser2.type = selectenterpriser2.type;
    enterpriser2.href = selectenterpriser2.href;

    RuleAction.addEnterpriseExclusions(enterpriser1, enterpriser2);
  },

  render(){
    return (
      <form className='addGlobalRule'>
        <div className='entry'>
          <lable className='entryLabel'>虚拟组织1：</lable>
          <div className='entryInput'>
            <DropDownMenu ref='enterprise1'
                          menuItems={this.state.enterprises} displayMember='name'/>
          </div>
        </div>

        <div className='entry'>
          <lable className='entryLabel'>虚拟组织2：</lable>
          <div className='entryInput'>
            <DropDownMenu ref='enterprise2'
                          menuItems={this.state.enterprises} displayMember='name'/>
          </div>
        </div>
      </form>
    );
  }
});
module.exports = AddGlobalRule;
