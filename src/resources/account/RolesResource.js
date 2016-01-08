/**
 * Created by jiangrx on 12/25/15.
 */
import Resource from '../Resouce';
let StoreStatusDialog = require('../../store/common/StatusDialogStore');

class RolesResource extends Resource {
  constructor() {
    super();
  }

  addRole(links, name, ldap) {
    var payload = {};
    payload['links'] = links;
    payload['name'] = name;
    if (ldap.trim() !== '') {
      payload['ldap'] = ldap;
      return this.addLdapRole(payload);
    } else {
      return this.addOrdinaryRole(payload);
    }
  }

  addOrdinaryRole(payload) {
    var jsPayload = JSON.stringify(payload);
    console.log(jsPayload);

    return this.post('/admin/roles', jsPayload)
      .set('Accept', 'application/vnd.esage.role+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.role+json;version=3.0')
      .then(this.resolve, this.reject);
  }

  addLdapRole(payload) {
    var jsPayload = JSON.stringify(payload);
    console.log(jsPayload);

    return this.post('/admin/roles', jsPayload)
      .set('Accept', 'application/vnd.esage.roleWithLdap+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.roleWithLdap+json;version=3.0')
      .then(this.resolve, this.reject);
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

  fetchRoles(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/roles')
      .set('Accept', 'application/vnd.esage.roles+json;version=3.0')
      .query({identerprise: payload.enterpriseID})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (err.status === null) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch Roles', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  getEnterpriseRoles(enterpriseID) {

    var currentEnterpriseID = enterpriseID || this.enterprise.enterpriseID;

    console.log(currentEnterpriseID);
    return this.get('/admin/roles')
      .set('Accept', 'application/vnd.esage.roles+json;version=3.0')
      .query({identerprise: currentEnterpriseID})
      .then(this.resolve, this.reject);
  }

  deleteRoleByID(roleID) {
    return this.del('/admin/roles/' + roleID)
      .set('Accept', 'application/vnd.esage.role+json;version=3.0')
      .end();
  }

  gerPrivilege(payload) {
    return this.get('/admin/roles/' + 1 + '/action/privileges')
      .set('Accept', 'application/vnd.esage.privileges+json;version=3.0')
      .end()
      .then(this.resolve, this.reject);
  }

  getCurrentRolePriviliege(payload) {
    return this.get('/admin/roles/' + 40 + '/action/privileges')
      .set('Accept', 'application/vnd.esage.privileges+json;version=3.0')
      .end()
      .then(this.resolve, this.reject);
  }

  savePrivilege(payload) {
    return this.put('/admin/roles/' + payload.roleID, JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.role+json; version=3.0')
      .set('Content-Type', 'application/vnd.esage.role+json; version=3.0').end()
      .then(this.resolve, this.reject);
  }


}
export default new RolesResource();
