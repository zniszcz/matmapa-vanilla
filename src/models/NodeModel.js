(function () {
  'use strict';

  app.NodeModel = class NodeModel extends app.Abstract.Model {
    constructor(id, name, parent, notes) {
      super();

      this.set('id', id);
      this.set('name', name);
      this.set('parent', parent);
      this.set('notes', notes);

      return this;
    }

    getId() {
      return this.get('id');
    }
    getParent() {
      return this.get('parent');
    }
    getName() {
      return this.get('name');
    }
    getNotes() {
      return this.get('notes');
    }

    setId(id) {
      this.set('id', id);
      this.fireEvent('changed');
    }
    setParent(parent) {
      this.set('parent', parent);
      this.fireEvent('changed');
    }
    setName(name) {
      this.set('name', name);
      this.fireEvent('changed');
    }
    setNotes(notes) {
      this.set('notes', notes);
      this.fireEvent('changed');
    }
  };

})();
