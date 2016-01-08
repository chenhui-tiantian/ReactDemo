/**
 * Created by chenh on 2015/12/2.
 * 虚拟组织数据操作
 */
import Resource from '../Resouce';

class EnterpriseResource extends Resource {
  constructor() {
    super();
  }

  /*get all virtual enterprise*/
  getEnterprises() {
    return this.get('/admin/enterprises/')
      .set('Content-Type', 'application/vnd.esage.enterprises+json; version=3.0')
      .then(this.resolve, this.reject);
  }

  /*get virtual enterprise by the whole url*/
  getEnterpriseByUrl(url, type) {
    return this.get(url)
      .set('Content-Type', type)
      .then(this.resolve, this.reject);
  }

}
export default new EnterpriseResource();
