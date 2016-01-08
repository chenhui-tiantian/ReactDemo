var React = require('react');
var rd3 = require('react-d3');
var BarChart = rd3.BarChart;

var Chart = React.createClass({
  getInitialState() {
    return this.makeChart(this.props);
  },
  makeChart(props) {
    return {
      data: [{
        "name": props.name,
        "values": [{x: '已使用', y: props.used || 0}, {x: '保留', y: props.reserved || 0}, {x: '限制', y: props.limited || 0}]
      }]
    };
  },
  componentWillReceiveProps(nextprops) {
    var data = this.makeChart(nextprops);
    this.setState(data);
  },
  render() {
    return <div className='dashboard-chart'>
      {this.state.data ? <BarChart
        data={this.state.data}
        width={180}
        height={100}
        fill={'#3182bd'}
        yAxisLabel=''
        xAxisLabel={this.props.name}
      /> : null}
    </div>;
  }
});

module.exports = Chart;
