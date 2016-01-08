/**
 * Created by lenovo on 2015/12/10.
 */
'use strict';

var React = require('react');
var RadialProgress = require('../../common/RadialProgress');
require('../../common/RadialProgress.css');

let UsedChart = React.createClass({
  generateChart(title, totalTxt, totalValue, useTxt, useValue){

    this.refs.title.innerHTML = title;
    this.refs.totalTxt.innerHTML = totalTxt  + ': ' + totalValue;
    this.refs.useTxt.innerHTML = useTxt + ': '  + useValue;

    var div1 = d3.select(this.refs.div1);
    div1.attr('class','div3');

    var rp1 = RadialProgress.radialProgress(this.refs.div1)
      .diameter(150)
      .minValue(0)
      .maxValue(totalValue)
      .value(useValue)
      .render();
  },
  componentWillReceiveProps(nextProps ){

  if(nextProps.dataCenterUsage.serversTotal != null){
    this.generateChart(nextProps.dataCenterUsage.title,
      nextProps.dataCenterUsage.totalTxt,
      nextProps.dataCenterUsage.serversTotal,
      nextProps.dataCenterUsage.useTxt,
      nextProps.dataCenterUsage.serversRunning);

  }
},
  render() {
    return (
      <div>
        <div ref='div1' id='div1'>
          <div className="comtentdiv">
            <div className="title" ref='title'></div>
            <div className="useTxt" ref='useTxt'></div>
            <div className="totalTxt" ref='totalTxt'></div>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = UsedChart;
