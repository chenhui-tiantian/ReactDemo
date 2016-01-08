/**
 * Created by chenh on 2015/12/10.
 * used chart
 * 输入标题（含单位），总数量描述，总数量，使用数量描述，使用数量，阈值（整数）
 *超出阈值threshold则显示为红色报警，阈值默认为80
 */
'use strict';

var React = require('react');
var RadialProgress = require('./RadialProgress');
require('./RadialProgress.css');


let UsedChart = React.createClass({
  generateChart(title, totalTxt, totalValue, useTxt, useValue, threshold){


    this.refs.title.innerHTML = title;
    this.refs.totalTxt.innerHTML = totalTxt + ': ' + totalValue;
    this.refs.useTxt.innerHTML = useTxt + ': ' + useValue;


    var drawChart = d3.select(this.refs.drawChart);
    let _threshold = 80;
    if(threshold != null){
      _threshold = threshold;
    }
    //删除内圈
    d3.select(this.refs.drawChart).select(".arcs").selectAll(".arc2").remove();

    if(Math.round((useValue/totalValue)*100) >= _threshold){
      drawChart.attr('class', 'overData');
    }
    else{
      drawChart.attr('class', 'origin');
    }

    if(totalValue <= 0){
      var rp1 = RadialProgress.radialProgress(this.refs.drawChart)
        .diameter(160)
        .minValue(0)
        .maxValue(0)
        .value(0)
        .render();
    }
    else{
      var rp1 = RadialProgress.radialProgress(this.refs.drawChart)
        .diameter(160)
        .minValue(0)
        .maxValue(totalValue)
        .value(useValue)
        .render();
    }

  },
  componentWillReceiveProps(nextProps){

    if (nextProps.dataCenterUsage != null) {
      this.generateChart(nextProps.dataCenterUsage.title || '',
        nextProps.dataCenterUsage.totalTxt || '',
        nextProps.dataCenterUsage.totalValue || 0,
        nextProps.dataCenterUsage.useTxt || '',
        nextProps.dataCenterUsage.useValue || 0,
        nextProps.dataCenterUsage.threshold
      );

    }
  },
  render() {
    return (
      <div className="userchart">
        <div className= "title"  ref= 'title'> </div>
        <div ref= 'drawChart' id= "drawChart"></div>
        <div className= "comtentdiv">
            <div className= "useTxt" ref= 'useTxt'></div>
            <div className= "totalTxt" ref= 'totalTxt'></div>
        </div>

      </div>
    );
  }
});
module.exports = UsedChart;
