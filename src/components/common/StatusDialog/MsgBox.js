/**
 * Created by gtkrab on 15-11-27.
 */
let React = require('react');

let MsgBox = React.createClass({
  getDefaultProps(){
    return {
      title: '',
      body: '',
      isFail: false,
      state: 0,
      index: 0,
      onClick: null,
      onMouseOut: null,
      onMouseOver: null
    };
  },
  onClick(){
    this.props.onClick(this.props.index);
  },
  onMouseOut(){
    this.props.onMouseOut(this.props.index);
  },
  onMouseOver(){
    this.props.onMouseOver(this.props.index);
  },
  render(){
    let bottom = this.props.index * 80 + 5;
    //let click = this.onClick;
    //let mouseover = this.onMouseOver;
    let boxType = this.props.isFail ? ' failBox' : ' successBox';
    let msgState = (this.props.state === 1) ? ' showMsg' : ' hideMsg';
    return (
      <div className={'msgBox ' + boxType + msgState} style={{bottom: bottom + 'px'}}
           onClick={this.onClick}
           onMouseOver={this.onMouseOver}
           onMouseOut={this.onMouseOut}>
        <h5 >{this.props.title}</h5>
        <p >{this.props.body}</p>
      </div>
    );
  }
});

module.exports = MsgBox;
