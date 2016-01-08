/**
 * Created by gtkrab on 15-11-27.
 */
let React = require('react');
let MsgBox = require('./StatusDialog/MsgBox');
let statusDialogStore = require('../../store/common/StatusDialogStore');
require('./StatusDialog/StatusDialog.css');

function List() {
  List.makeNode = function () {
    return {data: null, next: null};
  };

  this.start = null;
  this.end = null;


  this.add = function (data) {
    if (this.start === null) {
      this.start = List.makeNode();
      this.end = this.start;
    } else {
      this.end.next = List.makeNode();
      this.end = this.end.next;
    }
    this.end.data = data;
  };

  this.delete = function (data) {
    var current = this.start;
    var previous = this.start;
    while (current !== null) {
      if (data === current.data) {
        if (current === this.start) {
          this.start = current.next;
          return;
        }
        if (current === this.end) {
          this.end = previous;
        }
        previous.next = current.next;
        return;
      }
      previous = current;
      current = current.next;
    }
  };

  this.insertAsFirst = function (d) {
    var temp = List.makeNode();
    temp.next = this.start;
    this.start = temp;
    temp.data = d;
  };

  this.insertAfter = function (t, d) {
    var current = this.start;
    while (current !== null) {
      if (current.data === t) {
        var temp = List.makeNode();
        temp.data = d;
        temp.next = current.next;
        if (current === this.end) {
          this.end = temp;
        }
        current.next = temp;
        return;
      }
      current = current.next;
    }
  };

  this.item = function (i) {
    var current = this.start;
    while (current !== null) {
      i--;
      if (i === 0) {
        return current;
      }
      current = current.next;
    }
    return null;
  };

  this.each = function (f) {
    var current = this.start;
    while (current !== null) {
      f(current);
      current = current.next;
    }
  };
}
let _list = new List();
let _intervalID;
let StatusDialog = React.createClass({
  getInitialState(){
    return {
      dialogs: [{timer: 0, data: {title: '', body: '', isFail: true, state: 0}}],
      show: 'hideDialog',
      uploadManagerPresent: false
    };
  },
  getDefaultProps(){
    return {
      showMsg: 'showDialog',
      hideMsg: 'hideDialog'
    };
  },
  componentWillMount(){
    statusDialogStore.addMsgListener(this.addDialog);
  },
  componentDidMount(){
    _intervalID = setInterval(this.checkList, 100);
  },
  componentWillUnmount(){
    statusDialogStore.removeMsgListener(this.addDialog);
    clearInterval(_intervalID);
  },
  updateDialogs(){
    let data = [];
    _list.each(function (item) {
      return data.push(item.data.data);
    });
    if (data.length > 0) {
      this.setState({'dialogs': data, 'show': this.props.showMsg});
    } else {
      this.setState({'dialogs': data, 'show': this.props.hideMsg});
    }
  },
  checkList(){
    _list.each(function (item) {
      item.data.timer -= 100;
      if ((item.data.timer <= 0) && (item.data.timer > -800)) {
        item.data.data.state = 0;
      }
      if ((item.data.timer <= -900) && (item.data.timer > -2000)) {
        if(item.data.data.isDownloadManager){
          this.setState({uploadManagerPresent: false});
        }
        _list.delete(item.data);
      }
    });
    this.updateDialogs();
  },
  addDialog(){
    let data = statusDialogStore.getMessage();
    _list.add(data);
    this.updateDialogs();
  },
  removeDialog(index){
    _list.item(index + 1).data.timer = 0;
    this.updateDialogs();
  },
  aboutRemoveDialog(index){
    _list.item(index + 1).data.timer = 0;
    _list.item(index + 1).data.data.state = 0;
    this.updateDialogs();
  },
  keepDialog(index){
    _list.item(index + 1).data.timer = -2000;
  },
  render(){
    let removeDialog = this.removeDialog;
    let keepDialog = this.keepDialog;
    let aboutRemove = this.aboutRemoveDialog;
    return (
      <div className='statusDialog'>
        <div className={this.state.show }>
          {this.state.dialogs.map(function (dialog, index) {
            return (
              <MsgBox key={index}
                      index={index}
                      title={dialog.title}
                      body={dialog.body}
                      isFail={dialog.isFail}
                      state={dialog.state}
                      onClick={removeDialog}
                      onMouseOut={aboutRemove}
                      onMouseOver={keepDialog}/>);
          })}
        </div>
      </div>
    );
  }
});

module.exports = StatusDialog;
