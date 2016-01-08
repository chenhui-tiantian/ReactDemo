/**
 * Created by jiangrx on 15-12-8.
 */
const React = require('react');
require('./displayInfo.css');

class DisplayInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='info'>
        <div className='infoTitle'>
          <h2>{this.props.title}</h2>
        </div>
        <div className='infoDataArea'>
        {this.props.data.map(function (info) {
          return (<div className='infoData'>
            <div className='infoDataLabel'>
              <label>{info.label}:</label>
            </div>
            <div className='infoDataText'>
              <div>{info.text}</div>
            </div>
          </div >);
        })}</div>
      </div>
    );
  }
}
DisplayInfo.defaultProps = {
  title: '',
  data: []
};
module.exports = DisplayInfo;
