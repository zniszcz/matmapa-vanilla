(function () {
  'use strict';

  app.NodeModel = class NodeModel extends app.Abstract.Model {
    constructor(id = undefined, parent = [], name = '', notes = '') {
      super();

      this.set('id', id);
      this.set('parent', parent);
      this.set('name', name);
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

    addParent(parentId) {
      const parent = this.get('parent');
      for (let i = 0; i < parent.length; i++) {
        if (parent[i] === parentId) {
          return;
        }
      }
      parent.push(parentId);
      this.fireEvent('changed');
    }
    removeParent(parentId) {
      const index = this.get('parent').indexOf(parentId);
      this.get('parent').splice(index, 1);
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
