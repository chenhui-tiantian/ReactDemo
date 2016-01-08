/**
 * Created by jiangrx on 15-12-11.
 */
/**
 * Created by jiangrx on 15-12-10.
 */
const React = require('react');
const List = require('material-ui/lib/lists/list');
const ListRow = require('../../common/ListRow');
let ActionHost = require('../../../actions/datacenter/HostAction');
let StoreHost = require('../../../store/datacenter/HostStore');
let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

class HostNetwork extends React.Component {
  constructor(props) {
    super(props);
  }


  _getData() {
    let data = this.props.host;
    //TODO: SR-IOV, service type.
    return {data: data, allSet: true};
  }


  render() {
    let ret = [];
    let networks = this.props.host.collection;
    for (let i = 0; i < networks.length; i++) {
      let primaryText = 'Interface: ' + networks[i].name;
      let secondaryText = 'SR-IOV: ' + networks[i].enableSriov ? 'Disabled' : 'Enabled';
      ret.push(<ListRow key={i} item={networks[i]}
                        primaryText={primaryText}
                        secondaryText={secondaryText}/>);
    }
    return <List>{ret}</List>;
  }
}
HostNetwork.defaultProps = {
  dcID: 1,
  rackID: 0,
  host: {}
};

module.exports = HostNetwork;
