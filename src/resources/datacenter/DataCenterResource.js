/**
 * Created by chenh on 2015/11/30.
 * datacenterresource manage
 */
import Resource from '../Resouce';

class DataCenterResource extends Resource {
  constructor() {
    super();
  }

  /*获取全部数据中心资源使用情况*/
  getTotalCloudUsage() {
    return this.get('/statistics/cloudusage/actions/total')
      .set('Content-Type', 'application/vnd.esage.cloudusage+json; version=3.0')
      .then(this.resolve, this.reject);
  }

  /*通过数据中心id获取全部数据中心资源使用情况*/
  getDataCenterUsageByID(id) {
    return this.get('/statistics/cloudusage/' + id)
      .set('Content-Type', 'application/vnd.esage.cloudusage+json; version=3.0')
      .then(this.resolve, this.reject);
  }

//.set('Content-Type', 'text/plain; charset=UTF-8')
//.set('Accept','application/vnd.esage.datacenter+json;version=3.0')
  /*通过数据中心id删除数据中心*/
  deleteDataCenterByID(id) {
    console.log('id =========' + id);
    return this.del('/admin/datacenters/' + id)
          .end();
  }

  /*通过数据中心名称查询类似的数据中心*/
  getDataCenterByName(name) {
    return this.get('/admin/datacenters')
      .set('Accept', 'application/vnd.esage.datacenters+json; version=3.0')
      .query('&has=' + name)
      .then(this.resolve, this.reject);
  }

  /*添加数据中心*/
  insertDataCenter(datacenter) {
    console.log(datacenter);
    var data = JSON.stringify(datacenter);

    return this.post('/admin/datacenters', data)
      .set('Content-Type', 'application/vnd.esage.datacenter+json;version=3.0')
      .set('Accept', 'application/vnd.esage.datacenter+json;version=3.0')
      .then(this.resolve, this.reject);
  }
}

export default new DataCenterResource();


