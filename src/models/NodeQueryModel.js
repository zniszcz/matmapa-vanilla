(function () {
  'use strict';

  app.NodeQueryModel = class NodeQueryModel extends app.Abstract.Model {
    constructor(item = {}) {
      super();

      if (item.id) {
        this.set('id', item.id);
      }
      if (item.name) {
        this.set('name', item.name);
      }
      if (item.parent) {
        this.set('parent', item.parent);
      }
      if (item.notes) {
        this.set('notes', item.notes);
      }
    }
  };
})();
