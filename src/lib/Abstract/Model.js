(function () {
  'use strict';

  app.Abstract.Model = class Model extends app.Abstract.Observable {
    constructor() {
      super();
      this.properties = {};
    }

    get(key) {
      return this.properties[key];
    }

    set(key, value) {
      if (this.properties[key] === value) {
        return;
      }
      this.properties[key] = value;
      this.fireEvent('change');
    }

    remove(key) {
      delete this.properties[key];
      this.fireEvent('change');
    }

    clean() {
      this.properties = {};
      this.fireEvent('change');
    }
  };

})();
