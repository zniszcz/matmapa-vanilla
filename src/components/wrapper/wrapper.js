(function () {
  'use strict';

  app.Wrapper = class Wrapper extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('main'));

      // xD

      const model = new app.NodeRepository('nodes');
      this.table = new app.NodesTable(model);
    }
    render() {
      this.getRootEl().classList.add('wrapper');
      this.getRootEl().appendChild(this.table.getRootEl());
      this.table.render();
    }
  };
})();
