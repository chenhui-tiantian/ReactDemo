/**
 * Created by jiangrx on 2015/12/03.
 */
import Resource from '../Resouce';

class StorageResource extends Resource {
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

  getStorageSupportedTypes(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/storage/devices/action/supported')
      .set('Content-Type', 'application/vnd.esage.storagedevicesmetadata+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  getStorageDevices(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/storage/devices/')
      .set('Accept', 'application/vnd.esage.storagedevices+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.storagedevices+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  addStorageDevice(payload) {
    return this.post('/admin/datacenters/' + payload.dcID +
        '/storage/devices/', payload.data)
      .set('Accept', 'application/vnd.esage.storagedevice+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.storagedevice+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  updateStorageDevice(payload) {
    return this.put('/admin/datacenters/' + payload.dcID +
        '/storage/devices/' + payload.storageDeviceID, payload.data)
      .set('Accept', 'application/vnd.esage.storagedevice+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.storagedevice+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  deleteStorageDevice(payload) {//TODO: parsing of success/fail of delete is only a hack
    this.payLoadCheck(payload);
    return this.del('/admin/datacenters/' + payload.dcID +
      '/storage/devices/' + payload.storageDeviceID).end()
      .then(this.reject, this.resolve);
  }

  getStoragePools(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/storage/devices/' + payload.storageDeviceID + '/pools/')
      .set('Content-Type', 'application/vnd.esage.storagepools+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  addStoragePool(payload) {
    this.payLoadCheck(payload);
    return this.post('/admin/datacenters/' +
        payload.dcID + '/storage/devices/' +
        payload.storageDeviceID + '/pools', payload.data)
      .set('Accept', 'application/vnd.esage.storagepools+json; version=3.0')
      .set('Content-Type', 'application/vnd.esage.storagepools+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  syncStoragePool(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID + '/storage/devices/' + payload.storageDeviceID + '/pools')
      .query({sync: true})
      .set('Content-Type', 'application/vnd.esage.storagepools+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  editStoragePool(payload) {
    this.payLoadCheck(payload);
    return this.put('/admin/datacenters/' +
        payload.dcID + '/storage/devices/' +
        payload.storageDeviceID + '/pools/' +
        payload.poolID, payload.data)
      .set('Accept', 'application/vnd.esage.storagepool+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.storagepool+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  deleteStoragePool(payload) {//TODO: parsing of success/fail of delete is only a hack
    this.payLoadCheck(payload);
    return this.del('/admin/datacenters/' + payload.dcID +
      '/storage/devices/' + payload.storageDeviceID +
      '/pools/' + payload.poolID).end()
      .then(this.reject, this.resolve);
  }

  getStorageVolumes(payload) {
    this.payLoadCheck(payload);
    return this.get('/admin/datacenters/' + payload.dcID +
        '/storage/devices/' + payload.storageDeviceID +
        '/pools/' + payload.poolID + '/action/volumes')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true})
      .set('Accept', 'application/vnd.esage.volumes+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  editStorageVolume(payload) {
    this.payLoadCheck(payload);
    return this.put(payload.url, payload.data)
      .set('Accept', 'application/vnd.esage.acceptedrequest+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.volume+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  delStorageVolume(payload) {
    this.payLoadCheck(payload);
    return this.del(payload.deleteURL)
      .set('Accept', 'application/vnd.esage.volume+json;version=3.0').end()
      .then(this.reject, this.resolve);
  }

}

export default new StorageResource();
