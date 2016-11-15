(function () {
  'use strict';

  app.NodesTable = class NodesTable extends app.Abstract.View {
    constructor(model) { // temporary its called model
      super(model);
      this.setRootEl(document.createElement('table'));
      this.thead = document.createElement('thead');
      this.tbody = document.createElement('tbody');
      this.tfoot = document.createElement('tfoot');

      model.addEventListener('change', () => this.loadItems());
    }
    render() {
      this.getRootEl().classList.add('table');
      this.getRootEl().appendChild(this.thead);
      this.getRootEl().appendChild(this.tbody);
      this.getRootEl().appendChild(this.tfoot);
    }
    loadItems() {
      this.getModel().getRepository().forEach(model => {
        const row = new NodesTableRow(model);
        this.tbody.appendChild(row.getRootEl());
        row.render();
      });
    }
  };

  class NodesTableRow extends app.Abstract.View {
    constructor(model) {
      super(model);
      this.setRootEl(document.createElement('tr'));
    }
    render() {
      this.createIdField();
      this.createNameField();
      this.createParentsField();
      this.createNotesField();
    }
    createIdField() {
      const td = document.createElement('td');
      td.textContent = this.getModel().getId();
      this.getRootEl().appendChild(td);
    }
    createNameField() {
      const td = document.createElement('td');
      td.textContent = this.getModel().getName();
      this.getRootEl().appendChild(td);
    }
    createParentsField() {
      const td = document.createElement('td');
      td.textContent = this.getModel().getParent();
      this.getRootEl().appendChild(td);
    }
    createNotesField() {
      const td = document.createElement('td');
      td.textContent = this.getModel().getNotes();
      this.getRootEl().appendChild(td);
    }
  }
})();
