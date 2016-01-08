/**
 * Created by chenh on 2016/1/5.
 */
import Resource from '../Resouce';

class ConfigurationResource extends Resource {
  constructor() {
    super();
  }

  getConfigs() {
    return this.get('/config/properties')
      .set('Content-Type', 'application/vnd.esage.systemproperties+json;version=3.0')
      .then(this.resolve, this.reject);
  }

  updateConfigs(config) {

    var data = {
      collection:config
    }
    var configJson = JSON.stringify(data);
    return this.put('/config/properties',configJson)
      .set('Accept','application/vnd.esage.systemproperties+json;version=3.0')
      .set('Content-Type', 'application/vnd.esage.systemproperties+json;version=3.0')
      .then(this.resolve, this.reject);
  }

}

export default new ConfigurationResource();
