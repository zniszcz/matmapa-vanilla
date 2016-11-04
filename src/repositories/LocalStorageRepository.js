(function () {
  'use strict';

  app.LocalStorageRepository = class LocalStorageRepository extends app.Abstract.Repository {
    constructor(name, repository = []) {
      super(repository);
      this.name = name;
      this.localStorage = window.localStorage;

      this.load();
      this.addEventListener('change', () => this.load());
    }
    setRepository(nodes) {
      this.repository = nodes;
      this.localStorage.setItem(this.name, JSON.stringify(nodes));
      this.fireEvent('change');
    }
    load() {
      this.setRepository(this.localStorage.getItem(this.name));
      return this.getRepository();
    }
  };
})();
