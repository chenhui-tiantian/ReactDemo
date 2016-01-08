/**
 * Created by gtkrab on 12/22/15.
 */
import Resource from '../../Resouce';
let StoreStatusDialog = require('../../../store/common/StatusDialogStore');

class VMTemplateResource extends Resource {
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

  fetchTemplates(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID +
        '/datacenterrepositories/' + payload.dcID + '/virtualmachinetemplates')
      .set('Accept', 'application/vnd.esage.virtualmachinetemplates+json;version=3.0')
      .query({categoryName: payload.category.name})
      .query({failed: true})
      .query({inProgress: true})
      .query({deletedMasters: true})
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (!err.status) {
            StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch templates', isFail: true});
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  downloadTemplate(payload) {
    console.log('downloading');
    return this.download(payload.url).end((err, resp) => {
      if (err) {
        if (!err.status) {
          StoreStatusDialog.pushMessage({title: 'Network timeout', body: 'Cannot fetch templates', isFail: true});
          return Promise.reject('Network timeout');
        } else {
          StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
          return Promise.reject(err.statusText);
        }
      }
    });
  }

  editTemplate(payload){
  console.log('edit template', payload);
  return this.put('/admin/enterprises/' + payload.enterpriseID +
  '/datacenterrepositories/' + payload.dcID +
  '/virtualmachinetemplates/' + payload.virtualmachinetemplatesID, JSON.stringify(payload.data))
  .set('Content-Type', 'application/vnd.esage.virtualmachinetemplate+json; version=3.0')
  .set('Accept', 'application/vnd.esage.virtualmachinetemplate+json;version=3.0').end((err, resp) => {
      if (err) {
        if (!err.status) {
          StoreStatusDialog.pushMessage({
            title: 'Network timeout',
            body: '编辑资源池失败',
            isFail: true
          });
          return Promise.reject('Network timeout');
        } else {
          StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
          return Promise.reject(err.statusText);
        }
      }
    })
  .then(this.resolve);
}
  getVMTlib(payload){
    console.log('edit template', payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID +
      '/appslib/templateDefinitionLists')
      .set('Content-Type', 'application/vnd.esage.templatedefinitionlists+json; version=3.0')
      .set('Accept', 'application/vnd.esage.templatedefinitionlists+json;version=3.0')
      .then(this.resolve, this.reject);

  }
  deleteVMTlib(payload) {

    return this.del('/admin/enterprises/' + payload.enterpriseID + '/appslib/templateDefinitionLists/' + payload.TempDListID)
      .set('Accept', 'application/vnd.esage.templatedefinitionlist+json;version=3.0')
      .then(this.reject, this.resolve);
  }
  fetchConversions(payload) {
    this.payloadCheck(payload);
    return this.get('/admin/enterprises/' + payload.enterpriseID +
        '/datacenterrepositories/' + payload.dcID +
        '/virtualmachinetemplates/' + payload.templateID + '/conversions')
      .set('Accept', 'application/vnd.esage.conversions+json;version=3.0')
      .query({has: payload.name})
      .query({limit: payload.limit})
      .query({startwith: payload.start})
      .query({asc: true}).end((err, resp) => {
        if (err) {
          if (!err.status) {
            StoreStatusDialog.pushMessage({
              title: 'Network timeout',
              body: 'Cannot fetch templates conversions',
              isFail: true
            });
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        }
      })
      .then(this.resolve);
  }

  convertTemplate(payload) {
    this.payloadCheck(payload);
    return this.post('/admin/enterprises/' + payload.enterpriseID +
        '/datacenterrepositories/' + payload.dcID +
        '/virtualmachinetemplates/' + payload.templateID + '/conversions', JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.conversion+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.virtualmachinestate+json;version=3.0').end((err, resp) => {
        if (err) {
          if (!err.status) {
            StoreStatusDialog.pushMessage({
              title: 'Network timeout',
              body: 'Cannot convert template',
              isFail: true
            });
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        } else {
          return Promise.resolve();
        }
      });
  }

  reconvertTemplate(payload) {
    this.payloadCheck(payload);
    return this.put('/admin/enterprises/' + payload.enterpriseID +
        '/datacenterrepositories/' + payload.dcID +
        '/virtualmachinetemplates/' + payload.templateID +
        '/conversions/' + payload.targetFormat, JSON.stringify(payload.data))
      .set('Accept', 'application/vnd.esage.acceptedrequest+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.conversion+json;version=3.0').end((err, resp) => {
        if (err) {
          if (!err.status) {
            StoreStatusDialog.pushMessage({
              title: 'Network timeout',
              body: 'Cannot convert template',
              isFail: true
            });
            return Promise.reject('Network timeout');
          } else {
            StoreStatusDialog.pushMessage({title: err.statusText, body: resp.error.message, isFail: true});
            return Promise.reject(err.statusText);
          }
        } else {
          return Promise.resolve();
        }
      });
  }

}

export default new VMTemplateResource();
