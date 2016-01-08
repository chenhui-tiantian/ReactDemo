/**
 * Created by chenh on 2015/12/2.
 */
import Resource from '../Resouce';

class RuleResource extends Resource {
  constructor() {
    super();
  }

  /*get the global's rules*/
  getGlobalRules() {
    console.log('global resource');
    return this.get('/admin/rules/')
      .set('Accept', 'application/vnd.esage.rules+json;version=3.0')
      .query('global=true')
      .then(this.resolve, this.reject);
  }

  /*get the datacenter's policy rules*/
  getRulesByid(dataCenterID) {
    return this.get('/admin/rules/')
      .set('Content-Type', 'application/vnd.esage.rules+json; version=3.0')
      .query('idDatacenter=' + dataCenterID)
      .then(this.resolve, this.reject);
  }

  /*delete global rule by ruleID*/
  deleteEnterpriseExclusions(id) {
    return this.del('/admin/rules/enterpriseExclusions/' + id)
      .end();
  }

  /*change global balance level by fitPolicy*/
  modifyEnterpriseExclusions(fitPolicy) {
    var data = '{"fitPolicy":"' + fitPolicy + '"}';
    return this.post('/admin/rules/fitsPolicy', data)
      .set('Content-Type', 'application/vnd.esage.fitpolicyrule+json; version=3.0');
  }

  //delete datacenter's balance level by ruleid
  deleteMachineLoadLevel(id) {
    return this.del('/admin/rules/machineLoadLevel/' + id)
      .set('Content-Type', 'text/plain; charset=UTF-8');
  }

  //delete datacenter's Policy level by ruleid
  deletePolicyRule(id) {
    return this.del('/admin/rules/fitsPolicy/' + id)
      .set('Content-Type', 'text/plain; charset=UTF-8');
  }

  // insert global rule
  insertEnterpriseExclusions(enterpriser1, enterpriser2) {

    var data = '{"links":[' + JSON.stringify(enterpriser1) + ',' + JSON.stringify(enterpriser2) + ']}';
    console.log(data);
    return this.post('/admin/rules/enterpriseExclusions', data)
      .set('Accept', 'application/vnd.esage.enterpriseexclusionrule+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.enterpriseexclusionrule+json; charset=UTF-8;version=3.0');
  }

  //insert datacenter's Policy level
  insertPolicyRule(data) {
    return this.post('/admin/rules/fitsPolicy', data)
      .set('Content-Type', 'application/vnd.esage.fitpolicyrule+json; version=3.0');
  }

  //insert datacenter's MachineLoadLevel
  insertMachineLoadLevel(data) {
    return this.post('/admin/rules/machineLoadLevel', data)
      .set('Content-Type', 'application/vnd.esage.machineloadrule+json; version=3.0');
  }

}
export default new RuleResource();
