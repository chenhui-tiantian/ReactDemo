'use strict';

var React = require('react');
let LiquidGauge = require('../common/liquidGaugeFill');
const GridList = require('material-ui/lib/grid-list/grid-list');
const GridTile = require('material-ui/lib/grid-list/grid-tile');

let tileData = [
  {'key': 1, 'title': '虚拟 CPU', 'percent': 45, value: 145, 'show': '共有 100'},
  {'key': 6, 'title': '本地存储(GB)', 'percent': 67, value: 1145, 'show': '共有 100'},
  {'key': 5, 'title': '内存(GB)', 'percent': 50, value: 1435, 'show': '共有 100'},
  {'key': 4, 'title': '外部存储(GB)', 'percent': 2, value: 2145, 'show': '共有 100'},
  {'key': 3, 'title': 'VLAN(个)', 'percent': 156, value: 1445, 'show': '共有 100'},
  {'key': 2, 'title': '外部IP', 'percent': 89, value: 1458, 'show': '共有 100'}];


let Overview = React.createClass({
  getInitialState() {
    return {
      name: '',
      data: null
    };
  },
  componentDidMount() {
    tileData.map(function (tile) {
      LiquidGauge.gauge({elementId: 'VDCGraph' + tile.key, percentValue: tile.percent, displayValue: tile.value});
    });
    console.log('Mounted');
  },
  _onchange(){

  },
  render() {
    return (
      <div className='row'>
        <div className='col-12'>
          <GridList
            cols={3}
            rows={2}
            cellHeight={200}
            style={{width: '100%', height: '100%', overflowY: 'auto'}}
          >
            {
              tileData.map(function (tile) {
                return (<GridTile key={tile.key}
                                  title={tile.title}
                                  subtitle={tile.show}
                                  style={{margin: '0 50px 50px 50px'}}>
                  <svg id={'VDCGraph' + tile.key} style={{width: '80%', height: '80%'}}></svg>
                </GridTile>);
              })
            }
          </GridList>
        </div>
      </div>
    );
  }
});
module.exports = Overview;
