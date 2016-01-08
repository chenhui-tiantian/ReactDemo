/**
 * Created by gtkrab on 15-11-24.
 */
import Resource from '../Resouce';

class VDCResource extends Resource {
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

  //getAllVDCs() {
  //  return this.get('/cloud/virtualdatacenters')
  //    .set('Content-Type', 'application/vnd.esage.virtualdatacenters+json;version=3.0')
  //    .query({limit: 10})
  //    .query({startwith: 0})
  //    .query({asc: true}).end()
  //    .then(this.resolve, this.reject);
  //}
  getVDCs(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID + '/action/virtualdatacenters')
      .set('Accept', 'application/vnd.esage.virtualdatacenters+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch VDCs', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  getPrivateNetworks(vdcID) {
    return this.get('/cloud/virtualdatacenters/' + vdcID + '/privatenetworks')
      .set('Content-Type', 'application/vnd.esage.vlans+json; version=3.0 ')
      .query({limit: 10})
      .query({startwith: 0})
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

  getVApps(payload) {
    this.payloadCheck(payload);
    return this.get('/cloud/virtualdatacenters/' + payload.vdcID + '/virtualappliances')
      .set('Accept', 'application/vnd.esage.virtualappliances+json')
      .query({asc: true}).end()
      .then(this.resolve, this.reject);
  }

}

export default new VDCResource();
