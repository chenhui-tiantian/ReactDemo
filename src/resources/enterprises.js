import Resource from './Resouce';
//import Util from '../utils';

class Enterprises extends Resource {
  constructor() {
    super();
  }

  searchByName(name){
    return this.get('/admin/enterprises')
      .set('Accept', 'application/vnd.esage.enterprises+json;version=3.0')
      .query('maxSize=5&currentPage=1&limit=60&startwith=0&totalSize=0&has=' + name + '&asc=true&cacheStamp=354')
      .end()
      .then(this.resolve, this.reject);
  }

  fetchAll() {
    return this.get('/admin/enterprises')
    .set('Accept', 'application/vnd.esage.enterprises+json;version=3.0')
      .end()
      .then(this.resolve, this.reject);
  }
}
export default new Enterprises();
