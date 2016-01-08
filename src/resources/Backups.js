/**
 * Created by lenovo on 2015/11/17.
 */
import Resource from './Resouce';

class BackupResource extends Resource {
  constructor() {
    super();
  }

  getBackups() {
    return this.get('config/platform')
      .set('Accept', 'application/vnd.esage.platformBackup+json;version=3.0')
      .end();
  }
}
export default new BackupResource();
