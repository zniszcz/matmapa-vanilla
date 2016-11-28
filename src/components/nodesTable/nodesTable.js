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
      this.container = document.createElement('div');
      this.button = document.createElement('button');
    }
    render() {
      this.getRootEl().addEventListener('click', () => {
        window.location.hash = `#/node/${this.id}`;
      });
      this.getRootEl().classList.add('nodesTableRow');

      this.container.setAttribute('data-id', this.id);
      this.container.classList.add('nodesTableRow__container');
      this.button.classList.add('nodesTableRow__delete', 'btn', 'btn-default', 'btn-sm');
      this.button.innerHTML = `
            <span class=''>usuń</span>
      `;

      this.button.addEventListener('click', function (event) {
        event.stopPropagation();
        console.log('dupa-aaaaaa');
      });
      this.container.innerHTML = `
          <span class='nodesTableRow__name'>${this.name}</span>
          <span class='nodesTableRow__notes'>${this.notes}</span>
      `;

      this.container.appendChild(this.button);
      this.getRootEl().appendChild(this.container);

      /* $('.nodesTableRow__delete').click( event => {
        event.stopPropagation();
        console.log('dupa');
      }); */
    }
  }
})();
