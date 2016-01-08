/**
 * Created by jiangrx on 15-12-15.
 */
import Resource from '../Resouce';
class HostResource extends Resource {
  constructor() {
    super();
  }

  payloadCheck(payload) {
    if (!payload.hasOwnProperty('start')) {
      payload.start = 0;
    } else {
      if (payload.start === 'undefined') {
        payload.start = 0;
      }
    }
    if (!payload.hasOwnProperty('limit')) {
      payload.limit = 10;
    } else {
      if (payload.limit === 'undefined') {
        payload.limit = 10;
      }
    }
    if (!payload.hasOwnProperty('name')) {
      payload.name = '';
    } else {
      if (payload.name === 'undefined') {
        payload.name = '';
      }
    }
  }

  listVMs(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' +
        payload.dcID + '/racks/' + payload.rackID +
        '/machines/' + payload.hostID + '/virtualmachines')
      .set('Accept', 'application/vnd.esage.virtualmachines+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  loadVMInfo(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID +
        '/racks/' + payload.rackID +
        '/machines/' + payload.hostID + '/virtualmachines/' + payload.vmID)
      .set('Accept', 'application/vnd.esage.virtualmachineflat+json;version=3.0')
      .query({sync: true}).end()
      .then(this.resolve, this.reject);
  }
  importVM(payload) {
    this.payloadCheck(payload);
    return this.post('/cloud/virtualdatacenters/' + payload.vdcID +
        '/virtualappliances/' + payload.vAppID +
        '/virtualmachines', JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.virtualmachineflat+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.virtualmachineflat+json;version=3.0').end()
      .then(this.reject, this.resolve);
  }
}
export default new HostResource();
