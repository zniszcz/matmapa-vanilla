(function () {
  'use strict';

  app.NodesTable = class NodesTable extends app.Abstract.View {
    constructor(model) { // temporary its called model
      super(model);
      this.setRootEl(document.createElement('table'));

      this.tbody = document.createElement('tbody');
      this.tfoot = document.createElement('tfoot');

      model.addEventListener('change', () => this.loadItems());
    }
    render() {
      this.getRootEl().classList.add('table');
      this.getRootEl().appendChild(this.tbody);
      this.getRootEl().appendChild(this.tfoot);

      const nodesTableInput = new app.AddNodeInput(this.getModel());
      this.tfoot.innerHTML = `
        <tr>
          <td colspan='4'></td>
        </tr>
      `;
      this.tfoot.querySelector('td').appendChild(nodesTableInput.getRootEl());

      nodesTableInput.render();
    }
    loadItems() {
      this.tbody.innerHTML = '';
      this.getModel().getCollection().forEach(model => {
        const row = new NodesTableRow(model);
        this.tbody.appendChild(row.getRootEl());
        row.render();
      });
    }
  };

  class NodesTableRow extends app.Abstract.View {
    constructor(model) {
      super(model);
      this.setRootEl(document.createElement('div'));
      this.id = model.getId();
      this.name = model.getName();
      this.notes = model.getNotes();
    }
    render() {
      this.getRootEl().addEventListener('click', () => {
        window.location.hash = `#/node/${this.id}`;
      });
      this.getRootEl().classList.add('nodesTableRow');

      const container = document.createElement('div');
      container.setAttribute('data-id', this.id);
      container.classList.add('nodesTableRow__container');
      const button = document.createElement('button');
      button.classList.add('nodesTableRow__delete', 'btn', 'btn-default', 'btn-sm');
      button.innerHTML = `
            <span class=''>usuń</span>
      `;
      button.addEventListener('click', event => this.removeButton(event));
      container.appendChild(button);
      container.innerHTML += `
          <span class='nodesTableRow__name'>${this.name}</span>
          <span class='nodesTableRow__notes'>${this.notes}</span>
      `;

      this.getRootEl().appendChild(container);
    }
    removeButton(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
})();
