import Resource from './Resouce';

class User extends Resource {
  constructor() {
    super();
  }

  login(username, password) {
    return this.get('/login')
        .auth(username, password)
        .end()
        .then(this.resolve, this.reject);
  }
};
export default new User();
