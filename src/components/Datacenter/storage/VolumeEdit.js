/**
 * Created by jiangrx on 15-12-8.
 */
const React = require('react');

class VolumeEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  _getData() {
    let data = this.props.defaultValue;
    data.name = this._name.value;
    data.sizeInMB = this._capacity.value;
    return {data: data, allSet: true};
  }

  render() {
    return (
      <div className='row col-12'>
        <div className='row col-12'>
          <label>Name *</label>
          <input type='text' ref={(ref) => this._name = ref} defaultValue={this.props.defaultValue.name}/>
        </div>
        <div className='row col-12'>
          <label>Capacity(MB) *</label>
          <input type='number' min='0' ref={(ref) => this._capacity = ref} defaultValue={this.props.defaultValue.sizeInMB}/>
        </div>
      </div>
    );
  }
}
VolumeEdit.defaultProps = {
  defaultValue: {}
};
module.exports = VolumeEdit;
