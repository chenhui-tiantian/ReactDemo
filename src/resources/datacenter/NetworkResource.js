/**
 * Created by jiangrx on 2015/11/26.
 */
import Resource from '../Resouce';

class NetworkResource extends Resource {
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

  getAllVDCs(payload) {
    this.payloadCheck(payload);
    return this.get('/cloud/virtualdatacenters')
      .set('Content-Type', 'application/vnd.esage.virtualdatacenters+json;version=3.0')
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true})
      .query({datacenter: payload.dcID}).end()
      .then(this.resolve, this.reject);
  }

  getPrivateNetworks(payload) {
    this.payloadCheck(payload);
    if(payload.hasOwnProperty('url')){
      return this.get(payload.url)
        .set('Content-Type', 'application/vnd.esage.vlans+json;version=3.0')
        .query({limit: payload.limit})
        .query({startwith: payload.start})
        .query({asc: true})
        .query({has: payload.name}).end()
        .then(this.resolve, this.reject);
    }else {
      return this.get('/cloud/virtualdatacenters/' + payload.vdcID + '/privatenetworks')
        .set('Content-Type', 'application/vnd.esage.vlans+json;version=3.0')
        .query({limit: payload.limit})
        .query({startwith: payload.start})
        .query({asc: true})
        .query({has: payload.name}).end()
        .then(this.resolve, this.reject);
    }
  }

  getPrivateIPs(payload) {
    this.payloadCheck(payload);
    if (payload.hasOwnProperty('url')) {
      return this.get(payload.url)
        .set('Content-Type', 'application/vnd.esage.privateips+json;version=3.0')
        .query({has: payload.name})
        .query({limit: payload.limit})
        .query({startwith: payload.start})
        .query({asc: true}).end()
        .then(this.resolve, this.reject);
    } else {
      return this.get('/cloud/virtualdatacenters/' + payload.vdcID + '/privatenetworks/' + payload.netID + '/ips')
        .set('Content-Type', 'application/vnd.esage.privateips+json;version=3.0')
        .query({has: payload.name})
        .query({limit: payload.limit})
        .query({startwith: payload.start})
        .query({asc: true}).end()
        .then(this.resolve, this.reject);
    }
  }

  fetchExternalNetworks(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/network')
      .set('Accept', 'application/vnd.esage.vlans+json')
      .query({type: 'EXTERNAL_UNMANAGED'})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

  fetchExternalIPs(payload) {
    this.payloadCheck(payload);
    return this.get(payload.url)
      .set('Accept', 'application/vnd.esage.externalips+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

  fetchPublicNetworks(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/network')
      .set('Accept', 'application/vnd.esage.vlans+json')
      .query({type: 'PUBLIC'})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

  fetchPublicIPs(payload) {
    this.payloadCheck(payload);
    return this.get(payload.url)
      .set('Accept', 'application/vnd.esage.publicips+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

}

export default new NetworkResource();
