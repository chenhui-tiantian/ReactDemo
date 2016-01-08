//var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import config from '../config';
import Util from '../utils';
var prefix = require('superagent-prefix')(config.host);
var originHost = require('superagent-prefix')(config.uploadHost);

var timeStamp = (function () {
  var _stamp = 0;
  return function () {
    _stamp++;
    return _stamp;
  };
})();

class Resouce {
  constructor() {

    this.config = config;
    this.host = config.host;
    this.enterprise = {
      title: 'Esage',
      rel: 'enterprise',
      type: 'application/vnd.esage.enterprise+json',
      href: config.host + '/admin/enterprises/' + config.EnterpriseID,
      enterpriseID: config.EnterpriseID
    };
  }

  resolve(resp) {
    var result = JSON.parse(resp.text);
    result.links = new Util.Link(result.links);
    return result;
  }

  resolveList(resp){
    var list = JSON.parse(resp.text);
    return list;
  }
  reject(err) {
    console.log('reject...............');
    console.log(err);
    throw new Error(err);
  }

  get(url) {
    return request
      .get(url)
      .query({cacheStamp: timeStamp()})
      .withCredentials()
      .use(prefix);

  }

  download(url) {
    return request
      .get(url)
      .query({cacheStamp: timeStamp()})
      .withCredentials();
  }

  upload(url) {
    return request.post(url)
      .query({cacheStamp: timeStamp()})
      .withCredentials()
      .use(originHost);
  }

  post(url, data) {
    return request
      .post(url, data)
      .query({cacheStamp: timeStamp()})
      .withCredentials()
      .use(prefix);
  }

  put(url, data) {
    return request
      .put(url, data)
      .query({cacheStamp: timeStamp()})
      .withCredentials()
      .use(prefix);
  }

  del(url) {
    return request
      .del(url)
      .query({cacheStamp: timeStamp()})
      .withCredentials()
      .use(prefix);
  }
}

export default Resouce;
