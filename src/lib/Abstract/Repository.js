(function () {
  'use strict';

  app.Abstract.Repository = class Repository extends app.Abstract.Observable {
    constructor(name) {
      super();

      const localStorage = window.localStorage;
      let repository;

      this.getRepository = () => {
        return repository || JSON.parse(localStorage.getItem(name)) || [];
      };

      this.setRepository = nodes => {
        localStorage.setItem(name, JSON.stringify(repository = nodes));
        this.fireEvent('change');
      };
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
      this.fireEvent('insert', item);
    }

    remove(query) {
      const itemsToRemove = [];
      let k;

      const repository = this.getRepository().filter(item => {
        for (k in query) {
          if (query[k] !== item[k]) {
            return true;
          }
        }
        itemsToRemove.push(item);
        return false;
      });

      this.setRepository(repository);
      this.fireEvent('change');
      this.fireEvent('delete', itemsToRemove);
    }
  };
})();
