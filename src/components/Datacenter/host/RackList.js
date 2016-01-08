/**
 * Created by caijm on 2015/12/4 0004.
 */
//数据中心下主机列表的界面
var React = require('react');
const List = require('material-ui/lib/lists/list');
var Rackicon = require('./RackIcon');
var RackList = React.createClass({
  getDefaultProps(){
    return {
      racks: []
    };
  },
  render: function () {
    var racklist = [];
    console.log(this.props.racks);
    this.props.racks.forEach((rack)=>{
        console.log('rack>>>>>>', rack);
        racklist.push(<Rackicon dcID={this.props.dcID}rack={rack} key={rack.id}/>);
      });
    console.log('rackList>>', racklist);
    return (<List>{racklist.map(item=> {
      return item;
    })}</List>);
  }
});
module.exports = RackList;
