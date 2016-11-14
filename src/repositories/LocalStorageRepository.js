(function () {
  'use strict';

  app.LocalStorageRepository = class LocalStorageRepository extends app.Abstract.Repository {
    constructor(name, repository = []) {
      super(repository);
      this.name = name;
      this.localStorage = window.localStorage;

      this.loadLocalStorage();
      this.addEventListener('change', () => this.loadLocalStorage());
    }
    setRepository(nodes) {
      this.repository = nodes;
      this.localStorage.setItem(this.name, this.compress(nodes));
      this.fireEvent('change');
    }
    loadLocalStorage() {
      const saved = this.localStorage.getItem(this.name);
      const repository = this.decompress(saved) || this.repository;
      this.repository = repository;
    }
    compress(repository) {
      const store = [];
      repository.forEach(item => {
        const newItem = {
          id: item.properties.id,
          name: item.properties.name,
        };
        if (item.properties.parent) {
          newItem.parent = item.properties.parent;
        }
        if (item.properties.notes) {
          newItem.notes = item.properties.notes;
        }
        store.push(newItem);
      });
      const res = JSON.stringify(store);
      return res;
    }
    decompress(repository) {
      if (!repository) {
        return false;
      }
      const store = JSON.parse(repository);
      const res = [];
      store.forEach(item => {
        const newItem = new app.NodeModel(item.id, item.name);

        if (item.parent) {
          newItem.setParents(item.parent);
        }

        if (item.notes) {
          newItem.setNotes(item.notes);
        }

        res.push(newItem);
      });
      return res;
    }
  };
})();
