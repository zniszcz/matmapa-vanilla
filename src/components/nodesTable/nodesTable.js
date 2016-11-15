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

      this.thead.innerHTML = `
        <tr>
          <th>ID</th>
          <th>Nazwa</th>
          <th>Parent nodes</th>
          <th>Notatki</th>
        </tr>
      `;

      const nodesTableInput = new NodesTableInput();
      this.tfoot.innerHTML = `
        <tr>
          <td colspan='4'></td>
        </tr>
      `;
      this.tfoot.querySelector('td').appendChild(nodesTableInput.getRootEl());

      nodesTableInput.render();
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

  class NodesTableInput extends app.Abstract.View {
    constructor(model) {
      super(model, new NodesTableInputController(model));
      this.setRootEl(document.createElement('form'));
      this.getRootEl().addEventListener('submit', event => this.getController().onSumbit(event));
    }
    render() {
      const container = document.createElement('div');
      container.classList.add('input-group');
      this.getRootEl().appendChild(container);

      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', 'inputName');
      input.classList.add('form-control');
      this.getRootEl().appendChild(input);

      const button = document.createElement('button');
      button.textContent = '+';
      button.classList.add('btn', 'btn-primary', 'input-group-addon');
      this.getRootEl().appendChild(button);
    }
  }

  class NodesTableInputController extends app.Abstract.Controller {
    constructor(model) {
      super(model);
    }
    onSumbit(event) {
      event.preventDefault();
      
    }
  }
})();
