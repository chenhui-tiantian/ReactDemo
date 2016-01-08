class Link {
  constructor(links) {
    this._links = {};
    links.forEach(link => {
      this._links[link.rel] = link;
      this._links[link.rel].id = link.href.split('/').pop();
    });
  }
  get(key) {
    return this._links[key];
  }
}

export default Link;
