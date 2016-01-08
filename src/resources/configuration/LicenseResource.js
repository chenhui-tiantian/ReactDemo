/**
 * Created by chenh on 2016/1/5.
 */
import Resource from '../Resouce';

class LicenseResource extends Resource {
  constructor() {
    super();
  }

  getLicenses() {
    return this.get('/config/licenses')
      .set('Accept', 'application/vnd.esage.licenses+json;version=3.0')
      .then(this.resolve, this.reject);
  }

  deleteLicensesByID(id) {
    console.log('id' + id);
    return this.del('/config/licenses/' + id)
      .set('Accept', 'application/vnd.esage.licenses+json;version=3.0')
      .end();
  }


  addLicense(code) {
    var payload = {
      links: [],
      code: code
    };
    var jsPayload = JSON.stringify(payload);
    return this.post('/config/licenses', jsPayload)
      .set('Accept', 'application/vnd.esage.license+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.license+json; charset=UTF-8;version=3.0')
      .end();
  }

  getCustomerCode(){
    return this.get('/config/licenses')
      .set('Accept', 'application/vnd.esage.licenses+json;version=3.0')
      .then(this.resolve, this.reject);
  }
}

export default new LicenseResource();
