/**
 * Created by lenovo on 2015/11/23.
 */
import Resource from '../Resouce';

class AccountResource extends Resource {
  constructor() {
    super();
  }

  getOrganizeByName(name) {
    return this.get('/admin/enterprises')
      .set('Content-Type', 'application/vnd.esage.enterprises+json; version=3.0')
      .query('maxSize=5&currentPage=1&limit=60&startwith=0&totalSize=0&has=' + name + '&asc=true&cacheStamp=192')
      .then(this.resolve, this.reject);
  }

  deleteOrganizeByID(id) {
    return this.del('/admin/enterprises/' + id + '?cacheStamp=90')
      .set('Content-Type', 'text/plain; charset=UTF-8');
  }

  addOrganize(name){
      var data = '{"links":[], "isReservationRestricted": false,"theme": "", "name": "' + name + '","ramSoftLimitInMb": 0,"ramHardLimitInMb": 0,"cpuCountSoftLimit":0,"cpuCountHardLimit":0,"diskSoftLimitInMb":0,"diskHardLimitInMb":0,"storageSoftInMb":0,"storageHardInMb":0,"vlansSoft":0,"vlansHard":0,"publicIpsSoft":0,"publicIpsHard":0,"repositorySoftInMb":0,"repositoryHardInMb":0}';
      return this.post('/admin/enterprises/', data)
        .set('Content-Type', 'application/vnd.esage.enterprisetheme+json; version=3.0')
        .then(this.resolve, this.reject);
    }



  }

export default new AccountResource();
