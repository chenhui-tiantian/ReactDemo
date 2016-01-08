/**
 * Created by lenovo on 2015/11/26.
 */
import Resource from '../Resouce';
class HostResource extends Resource {
  constructor() {
    super();
  }

  payLoadCheck(payload) {
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

  discoverHost(payload) {
    return this.get('/admin/datacenters/' + payload.dcID + '/action/discover')
      .set('Accept', 'application/vnd.esage.machines+json;version=3.0')
      .query({user: payload.user})
      .query({password: payload.password})
      .query({hypervisor: payload.hyervisor})
      .query({ip: payload.ip})
      .then(this.resolve, this.reject);
  }

  addHost(payload) {
    return this.post('/admin/datacenters/' + payload.dcID +
        '/racks/' + payload.rackID + '/machines', payload.data)
      .set('Accept', 'application/vnd.esage.machine+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.machine+json;version=3.0').end()
      .then(this.reject, this.resolve);
  }

  searchHosts(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/racks/' + payload.rackID + '/machines')
      .set('Accept', 'application/vnd.esage.machines+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true})
      .then(this.resolve, this.reject);
  }

  editHost(payload) {
    this.payLoadCheck(payload);
    return this.put('/admin/datacenters/' + payload.dcID +
        '/racks/' + payload.rackID +
        '/machines/' + payload.hostID, payload.data)
      .set('Content-Type', 'application/vnd.esage.machine+json;version=3.0')
      .set('Accept', 'application/vnd.esage.machine+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  deleteHost(payload) {
    this.payLoadCheck(payload);
    return this.del('/admin/datacenters/' + payload.dcID + '/racks/' + payload.rackID + '/machines/' + payload.hostID)
      .set('Content-Type', 'application/vnd.esage.machine+json;version=3.0')
      .set('Accept', 'application/vnd.esage.machine+json;version=3.0').end()
      .then(this.reject, this.resolve);
  }

  stateCheckHost(payload) {
    this.payLoadCheck(payload);
    return this.get(payload.url)
      .set('Accept', 'application/vnd.esage.machinestate+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }
}
export default new HostResource();
