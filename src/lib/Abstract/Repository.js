(function () {
  'use strict';

  app.Abstract.Repository = class Repository extends app.Abstract.Observable {
    constructor(name) {
      super();

      const localStorage = window.localStorage;
      let repository;

      this.getLocalStorage = () => {
        return repository || JSON.parse(localStorage.getItem(name)) || [];
      };

      this.setLocalStorage = nodes => {
        localStorage.setItem(name, JSON.stringify(repository = nodes));
        this.fireEvent('change');
      };
    }

    find(query) {
      const repository = this.getLocalStorage();
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
      const repository = this.getLocalStorage();
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

      this.setLocalStorage(repository);
      this.fireEvent('change');
    }

    insert(item) {
      const repository = this.getLocalStorage();
      repository.push(item);
      this.setLocalStorage(repository);
      this.fireEvent('change');
    }

    remove(query) {
      let k;

      const repository = this.getLocalStorage().filter(item => {
        for (k in query) {
          if (query[k] !== item[k]) {
            return true;
          }
        }
        return false;
      });

      this.setLocalStorage(repository);
      this.fireEvent('change');
    }
  };
})();
