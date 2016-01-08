import Resource from './Resouce';

class BackupResource extends Resource {
  constructor() {
    super();
  }
  getBackups(){
    return this.get('/admin/enterprises/1/action/virtualdatacenters')
      .set('Accept', 'application/vnd.esage.virtualdatacenters+json;version=3.0')
      .end()
      .then(this.resolve, this.reject);

  }
}

export default new BackupResource();
