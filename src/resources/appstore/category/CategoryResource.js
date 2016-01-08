/**
 * Created by chenh on 2015/12/23.
 */

import Resource from '../../Resouce';
import config from '../../../config.js';

class CategoryResource extends Resource {
  constructor() {
    super();
  }

  fetchCategories() {
    return this.get('/config/categories')
      .set('Accept', 'application/vnd.esage.categories+json;version=3.0')
      .query({idEnterprise: this.enterprise.enterpriseID})
      .then(this.resolve, this.reject);

  }

  deleteCategory(id) {
    return this.del('/config/categories/' + id)
      .set('Accept', 'application/vnd.esage.category+json;version=3.0')
      .end();
  }

  addCategory(category) {
    if (!category.isGlobal) {
      var links = [];
      links.push(this.enterprise);
      category.links = links;
    }

    var data = JSON.stringify(category);
    return this.post('/config/categories', data)
      .set('Content-Type', 'application/vnd.esage.category+json; charset=UTF-8;version=3.0')
      .set('Accept', 'application/vnd.esage.category+json;version=3.0')
      .then(this.resolve, this.reject);
  }

  fetchDiskFormatTypes() {
    return this.get('/config/diskformattypes')
      .set('Accept', 'application/vnd.esage.diskformattypes+json;version=3.0').end()
      .then(this.resolve, this.reject);
  }

  requestUpload(payload) {
    return this.get('/admin/enterprises/' + config.EnterpriseID + '/action/requestupload')
      .query({fileSize: payload.fileSize})
      .query({datacenterId: payload.dcID})
      .set('Accept', 'application/vnd.esage.enterprises+json;version=3.0')
      .end();
  }

  uploadTemplate(payload) {
    return this.upload('/am/erepos/' + payload.dcID + '/templates')
      .field('diskInfo', JSON.stringify(payload.metaData))
      .attach('diskFile', payload.file[0], payload.file[0].name);
  }

  uploadISO(payload) {
    return this.upload('/am/erepos/' + payload.dcID + '/iso')
      .field('diskInfo', JSON.stringify(payload.metaData))
      .attach('diskFile', payload.file[0], payload.file[0].name);
  }
}

export default new CategoryResource();
