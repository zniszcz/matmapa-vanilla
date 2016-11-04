(function () {
  'use strict';

  app.Abstract.Repository = class Repository extends app.Abstract.Observable {
    constructor(name, repository = []) {
      super();

      this.name = name;
      this.repository = repository;

      this.setRepository([]);
    }

    getRepository() {
      return this.repository;
    }
    setRepository(nodes) {
      this.repository = nodes;
      this.fireEvent('change');
    }

    find(query) {
      const repository = this.getRepository();
      let k;
      const res = (repository.filter(item => {
        for (k in query) {
          if (query[k] !== item[k]) {
            return false;
          }
        }
        return true;
      }));

      return res;
    }

    update(update) {
      const id = update.id;
      const repository = this.getRepository();
      let i = repository.length;
      let k;

      while (i--) {
        if (repository[i].id === id) {
          for (k in update) {
            repository[i][k] = update[k];
          }
          break;
        }
      }

      this.setRepository(repository);
      this.fireEvent('change');
    }

    insert(item) {
      const repository = this.getRepository();
      repository.push(item);
      this.setRepository(repository);
      this.fireEvent('change');
    }

    remove(deletedItem) {
      const repository = this.getRepository();
      repository.filter(item => deletedItem !== item);
      this.setRepository(repository);
      this.fireEvent('change');
    }
  };
})();
