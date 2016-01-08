import Resource from './Resouce';
class Privilege extends Resource {
  constructor() {
    super();
  }

  fetch(store) {
    return this.get('/admin/roles/' + store + '/action/privileges')
      .set('Accept', 'application/vnd.esage.privileges+json;version=3.0')
      .end()
      .then(this.resolve, this.reject);
  }
};
export default new Privilege();
