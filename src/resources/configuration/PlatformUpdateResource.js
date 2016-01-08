/**
 * Created by chenh on 2016/1/8.
 */
import Resource from '../Resouce';

class PlatformUpdateResource extends Resource {
  constructor() {
    super();
  }

  getPlatformUpdate() {
    return this.get('/config/platform')
      .set('Accept', 'application/vnd.esage.platformUpgrade+json;version=3.0')
      .then(this.resolve, this.reject);
  }

  deletePlatformUpdateByID(fileID) {
    return this.del('/config/platform?idFile=' + fileID)
      .set('Accept', 'application/vnd.esage.acceptedrequests+json;version=3.0')
      .end();
  }

}

export default new PlatformUpdateResource();
