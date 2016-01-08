/**
 * Created by gtkrab on 15-11-23.
 */
'use strict';

let React = require('react');

let ControlButtons = require('../../common//ControlButtons');
let SearchBar = require('../../common/SearchBar');
const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListRow = require('../../common/ListRow');
const DataTables = require('../../common/DataTables');

const vdcAction = require('../../../actions/VDC/vdcAction');
const vdcStore = require('../../../store/VDC/vdcStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

let Private = React.createClass({
  getInitialState() {
    return {
      networks: [],
      vdcID: 8
    };
  },
  vdcID: 8,
  addHandler() {
    console.log('add');
  },

  editHandler() {
    console.log('edit');
  },

  delHandler() {
    console.log('del');
  },
  onSubnetSelect(event, item){
    console.log(item);
  },
  onNetworkFetched(){
    let networks = vdcStore.getNetworkPrivate();
    this.setState({networks: networks});
  },
  componentWillMount(){
    vdcStore.addNetworkPrivateListener(this.onNetworkFetched);
    vdcStore.addUpdateVDCIDListener(this.onVDCIDChanged);
    this.fetchNetworks();
  },
  componentDidMount() {
  },
  onVDCIDChanged(){
    this.vdcID = vdcStore.getVDCID();
    this.setState({vdcID: this.vdcID}, this.fetchNetworks);
  },
  fetchNetworks(){
    vdcAction.getNetworkPrivate(this.state.vdcID);
  },
  componentWillUnmount(){
    vdcStore.removeUpdateVDCIDListener(this.onVDCIDChanged);
    vdcStore.removeNetworkPrivateListener(this.onNetworkFetched);
  },

  render() {
    let touchEvent = this.onSubnetSelect;
    return (
      <div className='row'>
        <div className='col-3'>
          <ControlButtons
            addButtonHandler={this.addHandler}
            editButtonHandler={this.editHandler}
            delButtonHandler={this.delHandler}
          />
          <SearchBar />
          <div className='row'>
            <ListDivider />
          </div>
          <div className='row'>
            <div className='col-12'>
              <List >
                <ListRow key={0} item={{text: 'All', key: 0}} onTouchEvent={touchEvent}/>
                {this.state.networks.map(function (item) {
                  return (<ListRow key={parseInt(item.key, 10)} item={item} onTouchEvent={touchEvent}/>);
                })}
              </List>
            </div>
          </div>
        </div>
        <div className='col-9'>
          <DataTables />
        </div>
      </div>
    );
  }
});

module.exports = Private;
