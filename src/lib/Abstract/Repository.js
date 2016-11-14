(function () {
  'use strict';

  app.Abstract.Repository = class Repository extends app.Abstract.Observable {
    constructor(repository = []) {
      super();

      this.repository = repository;
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
    }

    insert(item) {
      const repository = this.getRepository();
      repository.push(item);
      this.setRepository(repository);
    }

    remove(deletedItem) {
      const repository = this.getRepository();
      repository.filter(item => deletedItem !== item);
      this.setRepository(repository);
    }
  };
})();
