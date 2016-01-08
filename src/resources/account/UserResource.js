/**
 * Created by jiangrx on 12/24/15.
 */
import Resource from '../Resouce';
let StoreStatusDialog = require('../../store/common/StatusDialogStore');

class UserResource extends Resource {
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

  fetchAllUsers(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID +
        '/users')
      .set('Accept', 'application/vnd.esage.users+json;version=3.0')
      .query({connected: false})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch users', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  fetchLoggedInUsers(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID +
        '/users')
      .set('Accept', 'application/vnd.esage.users+json;version=3.0')
      .query({connected: true})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch users', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  addUser(payload) {
    this.payloadCheck(payload);
    return this.post('/admin/enterprises/' + payload.enterpriseID +
        '/users', JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.user+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.user+json;version=3.0').end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot create user', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      });
  }

  editUser(payload) {
    this.payloadCheck(payload);
    return this.put('/admin/enterprises/' + payload.enterpriseID +
        '/users/' + payload.userID, JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.user+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.user+json;version=3.0').end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot update user info', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  deleteUser(payload) {
    this.payloadCheck(payload);
    return this.del('/admin/enterprises/' + payload.enterpriseID +
        '/users/' + payload.userID)
      .set('Accept', 'application/vnd.esage.user+json;version=3.0').end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Delete User Failed', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      });
  }
}

export default new UserResource();
