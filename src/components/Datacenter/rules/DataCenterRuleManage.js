/**
 * Created by chenh on 2015/12/4.
 */
var DataCenterRuleList = require('./DataCenterRuleList');
var React = require('react');


//var _datacenterrules = [{name:'ch',id:2}];
var DataCenterRuleManage = React.createClass({
    render: function () {
        return  <div>
                    <DataCenterRuleList datacenterrules = {this.props.datacenterrules}/>
                </div>;
    }
});
module.exports = DataCenterRuleManage;
