'use strict';
var React = require('react');
const List = require('material-ui/lib/lists/list');
//const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
var EnterpriseStore = require('../../store/EnterpriseStore');
var EnterpriseResourceStore = require('../../store/EnterpriseResourceStore');
//var OrganizeList = React.createClass({
//  render: function () {
//    var rows = [];
//    this.props.organizes.forEach(
//      function (organize) {
//        rows.push( <OrganizeRow organize = {organize} key= {organize.id} />);
//      });
//    return (<List>{rows}</List>);
//  }
//});
let NetworkTree = React.createClass({
  getInitialState() {
    var currentEnterprise = EnterpriseStore.getCurrentEnterprise() || null;
    return {

      enterprises: EnterpriseStore.getEnterprises() || [],
      currentEnterprise: currentEnterprise,
      enterpriseResource: EnterpriseResourceStore.getEnterpriseResource(currentEnterprise) || {}
    };
  },
  componentDidMount() {
    EnterpriseStore.on('change', () => {
      this.setState({
        enterprises: EnterpriseStore.getEnterprises()
      });
    });

    EnterpriseResourceStore.on('change', (resource)=> {
      this.setState({
        enterpriseResource: resource
      });
    });
  },

  render () {
    console.log('>> enterpriseResource12', this.state.enterpriseResource.name);
    var enterlist = [{text: '虚拟组织'}].concat(this.state.enterprises.map(enterprise => {
      return (<list>{enterprise.name}</list>);
    }));
    return <div>

      <List subheader="私有网络">


        <ListItem  ListItem={ListItem}/>,
      <ListItem   />
      </List>
    </div>;
  }


  });


module.exports = NetworkTree;
