/**
 * Created by chenh on 2015/12/4.
 */
var GlobalRullList = require('./GlobalRullList');
var React = require('react');


//var _globalrules = [{name:'ch',id:2}];
var GlobalRullManage = React.createClass({

  render: function () {
    return <div>
      <GlobalRullList globalrules={this.props.globalrules}/>
    </div>;
  }
});
module.exports = GlobalRullManage;
