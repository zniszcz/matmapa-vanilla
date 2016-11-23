(function () {
  'use strict';

  app.Collection = class Collection extends app.Abstract.Model {
    constructor(collection) {
      super();
      this.set('collection', collection);
    }
    setCollection(collection) {
      this.set('collection', collection);
    }
    getCollection() {
      return this.get('collection');
    }
    add(item) {
      this.getCollection().push(item);
      this.fireEvent('change');
    }
    remove(item) {
      const oldCollection = this.getCollection();
      const collection = oldCollection.filter(collectionItem => collectionItem !== item);
      this.set('collection', collection);
      this.fireEvent('change');
    }
    has(item) {
      let result = false;
      this.getCollection().forEach(collectionItem => {
        if (item === collectionItem) {
          result = true;
        }
      });
      return result;
    }
    clean() {
      this.setCollection([]);
      this.fireEvent('change');
    }
  };
})();
