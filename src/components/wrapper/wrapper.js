(function () {
  'use strict';

  app.Wrapper = class Wrapper extends app.Abstract.View {
    constructor() {
      // const model = new app.NodeRepository('nodes');
      super();
      this.setRootEl(document.createElement('main'));

      // this.table = new app.NodesTable(model);
    }
    clear() {
      this.getRootEl().innerHTML = '';
      return this; // allow chaining
    }
    addComponent(view) {
      this.getRootEl().appendChild(view.getRootEl());
    }
    render() {
      this.getRootEl().classList.add('wrapper');
      // this.getRootEl().appendChild(this.table.getRootEl());
      // this.table.render();
    }
  };
})();
