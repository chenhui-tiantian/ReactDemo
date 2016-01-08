import Resource from './Resouce';

class EnterpriseResource extends Resource {
  constructor() {
    super();
  }

  getByEnterprise(enterpriseId) {
    return this.get('/statistics/enterpriseresources/' + enterpriseId)
    .set('Accept', 'application/vnd.esage.enterpriseresources+json;version=3.0')
    .end()
    .then(this.resolve, this.reject);
  }
}

export default new EnterpriseResource();
