/**
 * Created by Administrator on 2015/12/4 0004.
 */
import Resource from '../Resouce';
class RackResource extends Resource {
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
  //获取资源池
  getRack(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/racks')
      .set('Accept', 'application/vnd.esage.racks+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.racks+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true})
      .then(this.resolve, this.reject);
  }

  getRackByName(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/racks')
      .set('Accept', 'application/vnd.esage.racks+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.racks+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true})
      .then(this.resolve, this.reject);
  }

  addRack(dcID, data) {
    return this.post('/admin/datacenters/' + dcID + '/racks', data)
      .set('Accept', 'application/vnd.esage.rack+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.rack+json; version=3.0')
      .then(this.resolve, this.reject);
  }

  deleteRackByID(dcID, rackID) {
    console.log('delete rackid resource>>>>', rackID, 'dc', dcID);
    return this.del('/admin/datacenters/' + dcID + '/racks/' + rackID + '?cacheStamp=90')
      .set('Accept', 'application/vnd.esage.rack+json;version=3.0')
      .then(this.reject, this.resolve);
  }
}
export default new RackResource();
