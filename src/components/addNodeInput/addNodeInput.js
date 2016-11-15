(function () {
  'use strict';

  class AddNodeInputController extends app.Abstract.Controller {
    constructor(model) {
      super(model);
    }
    onSumbit(event) {
      event.preventDefault();

      if (this.getView().getInput().value) { // TODO: implement validation
        this.getModel().insertNode(new app.NodeModel(null, this.getView().getInput().value));
        this.getView().getInput().value = '';
      }
    }
  }

  app.AddNodeInput = class AddNodeInput extends app.Abstract.View {
    constructor(model) {
      const controller = new AddNodeInputController(model);

      super(model, controller);

      controller.setView(this);

      this.setRootEl(document.createElement('form'));
      this.getRootEl().addEventListener('submit', event => this.getController().onSumbit(event));
    }
    render() {
      this.addContainer();
      this.getRootEl().classList.add('addNodeInput');
      this.addInput();
      this.addButton();
    }
    getInput() {
      return this.getRootEl().querySelector('input');
    }
    addContainer() {
      const container = document.createElement('div');
      container.classList.add('input-group');
      this.getRootEl().appendChild(container);
    }
    addInput() {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('name', 'inputName');
      input.classList.add('form-control');
      this.getRootEl().querySelector('.input-group').appendChild(input);
    }
    addButton() {
      const container = document.createElement('div');
      container.classList.add('input-group-btn');
      container.innerHTML = `
        <div class='btn-group'>
          <input type='submit' class='btn btn-primary btn-block' value='+' />
        </div>
      `;

      this.getRootEl().querySelector('.input-group').appendChild(container);
    }
  };
})();
