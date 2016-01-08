/**
 * Created by chenh on 2015/12/29.
 */
/**
 * Created by jiangrx on 12/25/15.
 */
import Resource from '../Resouce';
let StoreStatusDialog = require('../../store/common/StatusDialogStore');

class RolesResource extends Resource {
  constructor() {
    super();
  }

  fetchScopes() {
    return this.get('/admin/scopes')
      .set('Accept', 'application/vnd.esage.scopes+json;version=3.0')
      .then(this.resolve, this.reject);

  }


}
export default new RolesResource();
