/**
 * Created by chenh on 2016/1/8.
 */

import Resource from '../Resouce';

class PlatformBackupResource extends Resource {
  constructor() {
    super();
  }

  getPlatformBackups() {
    return this.get('/config/platform')
      .set('Accept', 'application/vnd.esage.platformBackup+json;version=3.0')
      .then(this.resolveList, this.reject);

  }

  createBackup(server) {
    var payLoad = JSON.stringify(server);
    console.log('serve resource');
    console.log(payLoad);
    return this.post('/config/platform',payLoad)
      .set('Accept', 'application/vnd.esage.platform+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.platform+json; charset=UTF-8;version=3.0')
      .end();
  }

  recoverBackup(backup) {
    var payLoad = JSON.stringify(backup);
    console.log('resource');
    console.log(payLoad);
    return this.put('/config/platform',payLoad)
      .set('Accept', 'application/vnd.esage.platform+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.platform+json; charset=UTF-8;version=3.0')
      .then(this.resolve, this.reject);
  }

  deletedBackupByID(id) {
    return this.del('/config/platform?idFile='+id)
      .set('Accept', 'application/vnd.esage.acceptedrequests+json;version=3.0');
  }
}

export default new PlatformBackupResource();
