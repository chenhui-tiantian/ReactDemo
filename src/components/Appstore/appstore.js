'use strict';

var React = require('react');
import VMTemplate from './vmtemplate/VMTemplate';
const CategoryManage = require('./categories/CategoryManage');
var DataCenterManage = require('../Datacenter/datacenter/DataCenterManage');

var AppStore = React.createClass({
  componentDidMount() {
  },
  render: function () {
    return (
      <div className='datacenterOverView'>
        <div className='datacentermanage'>
          <DataCenterManage renderAdd={false}/>
        </div>
        <div className='datacentercontainer'>
          <CategoryManage />
          <VMTemplate />
        </div>
      </div>
    );
  }
});

module.exports = AppStore;
