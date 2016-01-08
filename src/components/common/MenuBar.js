/**
 * Created by gtkrab on 15-11-24.
 */
'use strict';
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const SearchBar = require('./SearchBar');
const ControlButtons = require('./ControlButtons');
const ListRow = require('./ListRow');
let React = require('react');

const vdcAction = require('../../actions/VDC/vdcAction');
const vdcStore = require('../../store/VDC/vdcStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const statusDialogAction = require('../../actions/common/StatusDialogAction');

let MenuBar = React.createClass({
  getInitialState(){
    return {
      menuItems: [],
      vdcID: 0,
      enterpriseID: 1
    };
  },
  componentWillMount(){
    vdcAction.getVDCs({enterpriseID: this.state.enterpriseID});
    vdcStore.addChangedListener(this.onVDCFetch);
  },
  componentDidMount() {
  },
  componentWillUnmount(){
    vdcStore.removeChangedListener(this.onVDCFetch);
  },
  onVDCFetch(){
    let vdcs = vdcStore.getVDCs();
    this.setState({menuItems: vdcs});
  },
  onVDCSelect(event, item){
    console.log('onVDCSelect: ' + item.id);
    vdcAction.updateNetworkVDCID(item.id);
    statusDialogAction.newMSG({title: 'title: ' + item.id, body: 'body: ' + item.id}); //statusDialog example
  },
  render(){
    let touchEvent = this.onVDCSelect;
    return (
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            <div className='col-10'>
              <SearchBar />
            </div>
            <div className='col-2'>
              <ControlButtons />
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <ListDivider/>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <List >
                <ListRow key={0} item={{text: 'All', key: 0}} primaryText={{text: 'All'}} onTouchEvent={touchEvent}/>
                {this.state.menuItems.map(function (item) {
                  return (<ListRow
                    key={item.id}
                    item={item}
                    primaryText={{text: item.name}}
                    onTouchEvent={touchEvent}/>);
                })}
              </List>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MenuBar;
