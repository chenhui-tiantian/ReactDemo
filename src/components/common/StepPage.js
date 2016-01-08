/**
 * Created by jiangrx on 15-12-4.
 */
const React = require('react');
const Dialog = require('material-ui/lib/dialog');
const FlatButton = require('material-ui/lib/flat-button');
const StepPageAction = require('../../actions/common/StepPageAction');
const StepPageStore = require('../../store/common/StepPageStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class StepPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      saveDisable: false,
      navButtons: null
    };
  }

  componentWillMount() {
    StepPageStore.addChangeDataListener(this.onPushedData.bind(this));
    StepPageStore.addInitDataListener(this.onInitData.bind(this));
    StepPageAction.initData(this.props.pages.length);

  }

  componentWillUnmount() {
    StepPageStore.removeChangeDataListener(this.onPushedData);
    StepPageStore.removeInitDataListener(this.onInitData);
  }

  pushData() {
    StepPageAction.updateData({
      index: this.state.currentPage,
      data: this.refs.page._getData().data,
      allSet: this.refs.page._getData().allSet
    });
  }
  onInitData(){
    if (this.props.pages.length > 1) {
      this.setState({
        saveDisable: !this.canSkip(0),
        navButtons: [<FlatButton
          label="下一页"
          onTouchTap={this.pushData.bind(this)}/>]
      });
    }
  }
  onPrevious() {
    let saveDisable = !this.canSkip(-1);
    if (this.state.currentPage === 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        saveDisable: saveDisable,
        navButtons: [
          <FlatButton
            label="下一页"
            onTouchTap={this.pushData.bind(this)}/>]
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage - 1,
        saveDisable: saveDisable,
        navButtons: [
          <FlatButton
            label="上一页"
            onTouchTap={this.onPrevious.bind(this)}/>,
          <FlatButton
            label="下一页"
            onTouchTap={this.pushData.bind(this)}/>]
      })
      ;
    }
  }

  canSkip(page) {
    let data = StepPageStore.getData();
    if(page===1) {
      for (let i = (this.state.currentPage); i > 0; i--) {
        if (!data[i].allSet) {
          return false;
        }
      }

      let k = this.state.currentPage+2;
      if(this.state.currentPage==(this.props.pages.length-2)){
        return true;
      }
      while (k < this.props.pages.length) {
        if (!this.props.pages[k].canSkip) {
          return false;
        }
        k++;
      }
      return true;
    }else if(page===-1){
      let k = this.state.currentPage;
      while (k < this.props.pages.length) {
        if (!this.props.pages[k].canSkip) {
          return false;
        }
        k++;
      }
      for (let i = (this.state.currentPage-2); i > 0; i--) {
        if (!data[i].allSet) {
          return false;
        }
      }
      return true;
    }else{
      let k = this.state.currentPage+1;
      while (k < this.props.pages.length) {
        if (!this.props.pages[k].canSkip) {
          return false;
        }
        k++;
      }
      return true;
    }
  }

  onPushedData() {
    console.log('data pushed');
    let saveDisable = !this.canSkip(1);
    if (this.state.currentPage === (this.props.pages.length - 2)) {// Last page
      this.setState({
        currentPage: this.state.currentPage + 1,
        saveDisable: saveDisable,
        navButtons: [
          <FlatButton
            label="上一页"
            onTouchTap={this.onPrevious.bind(this)}/>]
      });
    } else if ((this.state.currentPage === 0) && (this.props.pages.length > 1)) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        saveDisable: saveDisable,
        navButtons: [
          <FlatButton
            label="上一页"
            onTouchTap={this.onPrevious.bind(this)}/>,
          <FlatButton
            label="下一页"
            onTouchTap={this.pushData.bind(this)}/>]
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage + 1,
        saveDisable: saveDisable
      });
    }
  }

  onFinish() {
    let data = StepPageStore.getData();
    data[this.state.currentPage] = this.refs.page._getData();
    this.props.finishHandler(data);
  }

  render() {
    if (this.state.currentPage > this.props.pages.length - 1) {
      var page = React.cloneElement(this.props.pages[this.props.pages.length - 1].component, {ref: 'page'});
    } else {
      var page = React.cloneElement(this.props.pages[this.state.currentPage].component, {ref: 'page'});
    }
    let {pages, finishHandler, onRequestClose, ...other} = this.props;
    return (
      <Dialog  {...other}
    modal = {true}
    actions={[<FlatButton
      label="取消"
      secondary={true}
      onTouchTap={this.props.onRequestClose}/>,
    <FlatButton
      label="确定"
      primary={true}
      disabled={this.state.saveDisable}
      onTouchTap={this.onFinish.bind(this)}/>]}
  onRequestClose={this.props.onRequestClose}>
{page}
{this.state.navButtons}
</Dialog>
    );
  }

}
StepPage.propTypes = {
  pages: React.PropTypes.arrayOf(React.PropTypes.shape({
    canSkip: React.PropTypes.bool,
    component: React.PropTypes.func
  })).isRequired,
  finishHandler: React.PropTypes.func,
  onRequestClose: React.PropTypes.func
};
StepPage.defaugltProps = {finishHandler: null, cancelHandler: null};

module.exports = StepPage;
