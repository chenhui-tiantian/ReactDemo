/**
 * Created by chenh on 2016/1/5.
 */
'use strict';

var React = require('react');
var Tabs = require('react-simpletabs');
var SysConfiguration = require('./SysConfiguration');
var License = require('./License');
var Backup = require('./Backup');

var Configuration = React.createClass({


  render: function () {
    return (
      <div className='configurationcontainer'>
        <Tabs>
          <Tabs.Panel title='系统配置'>
            <SysConfiguration />
          </Tabs.Panel>

          <Tabs.Panel title='备份'>
            <Backup/>
          </Tabs.Panel>

          <Tabs.Panel title='许可证'>
            <License />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
});

module.exports = Configuration;
