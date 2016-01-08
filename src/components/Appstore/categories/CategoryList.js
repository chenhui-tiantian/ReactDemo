/**
 * Created by chenhui on 2015/11/24.
 */
var React = require('react');
const List = require('material-ui/lib/lists/list');
var CategoryRow = require('./CategoryRow');


var CategoryList = React.createClass({

  render: function () {

    var rows = [];
    if (this.props.categories != null) {
      this.props.categories.forEach(
        function (category) {
          if(category.name.toUpperCase() === 'ISO'){
            rows.unshift(<CategoryRow category={category} key={category.id}/>);
          }else{
            rows.push(<CategoryRow category={category} key={category.id}/>);
          }
        });
    }
    return (<List>{rows}</List>);

  }
});
module.exports = CategoryList;
