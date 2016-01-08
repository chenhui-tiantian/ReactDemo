/**
 * Created by jiangrx on 15-12-7.
 */
const React = require('react');

const ActionStorage = require('../../../actions/datacenter/StorageAction');
const StoreStorage = require('../../../store/datacenter/StorageStore');

class PoolEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      defaultValues: {
        name: '',
        usablePercent: 100,
        maxVolumes: 0
      }
    };
  }

  componentWillMount() {
    StoreStorage.addSyncPoolSuccessListener(this.onPoolSynced.bind(this));
    if (!this.props.isEdit) {
      ActionStorage.syncPool(this.props.defaultValues);
    }

  }

  componentDidMount() {
    //TODO: remove hardcoded to NFS
    if (this.props.isEdit) {
      console.log(this.props.defaultValues);
      this._name.value = this.props.defaultValues[0].name;
      this._limit.value = this.props.defaultValues[0].maxVolumes;
      this._quota.value = this.props.defaultValues[0].usablePercent;
    }
  }

  componentWillUnmount() {
    StoreStorage.removeSyncPoolSuccessListener(this.onPoolSynced);
  }

  onPoolSynced() {
    console.log(StoreStorage.getSyncedPool()[0]);
    this.setState({defaultValues: StoreStorage.getSyncedPool()[0]});
  }

  _getData() {
    let data = null;
    if (this.props.isEdit) {
      data = this.props.defaultValues[0];
      data.name = this._name.value;
      data.usablePercent = parseInt(this._limit.value, 10);
      data.maxVolumes = parseInt(this._quota.value, 10);
      return {data: data, allSet: true};
    } else {
      data = this.state.defaultValues;
      data.name = this._name.value;
      data.usablePercent = this._quota.value;
      data.maxVolumes = this._limit.value;
      data.links = [{
        'title': 'Default Tier 1',
        'rel': 'tier',
        type: 'application/vnd.esage.tier+json',
        href: 'http://192.168.0.59:80/api/admin/datacenters/1/storage/tiers/1'
      }];
      return {data: {collection: [data]}, allSet: true};
    }


  }

  render() {
    return (
      <div className='row col-12'>
        <div className='row'>
          <label>Name *</label>
          <input type="text" ref={(ref)=>this._name = ref} disabled={this.props.isEdit}
                 defaultValue={this.state.defaultValues.name}/>
        </div>
        <div className='row'>
          <label>Quota(%) *</label>
          <input type='number' min='0' ref={(ref)=>this._quota = ref}
                 defaultValue={this.state.defaultValues.usablePercent}/>
        </div>
        <div className='row'>
          <label>Max # of Volumes *</label>
          <input type='number' ref={(ref)=>this._limit = ref}
                 defaultValue={this.state.defaultValues.maxVolumes}/>
        </div>
      </div>
    );
  }
}
PoolEdit.defaultProps = {
  isEdit: false,
  defaultValues: []
};
module.exports = PoolEdit;
