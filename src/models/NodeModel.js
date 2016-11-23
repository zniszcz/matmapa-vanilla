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

    setParent(parent) {
      this.set('parent', parent);
      this.fireEvent('changed');
    }
    setId(id) {
      this.set('id', id);
      this.fireEvent('changed');
    }
    setParents(parents) {
      this.set('parent', parents);
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

    update(nodeModel) {
      if (this.getName() !== nodeModel.getName()) {
        this.setName(nodeModel.getName());
      }
      if (this.getParent() !== nodeModel.getParent()) {
        this.setParent(nodeModel.getParent());
      }
      if (this.getNotes() !== nodeModel.getNotes()) {
        this.setNotes(nodeModel.getNotes());
      }
    }
  };

})();
