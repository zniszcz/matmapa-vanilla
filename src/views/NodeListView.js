(function () {
  'use strict';

  class NodeController extends app.Abstract.Controller {
    constructor(model) {
      super(model);
      const currentModelId = this.getModel().getId();
      this.childrenModels = app.getService('NodeRepository').getChildrenOf(currentModelId);
    }
    getChildrenModels() {
      return this.childrenModels;
    }
  }

  app.NodeListView = class NodeListView extends app.Abstract.View {
    constructor() {
      super();

      const routeParams = app.router.getRouteParams();

      if (routeParams[0] && isNaN(routeParams[0])) {
        app.router.backToDefaultRoute();
      }

      const model = (routeParams[0])
                      ? app.getService('NodeRepository').getNode(parseInt(routeParams[0]))
                      : new app.NodeModel();

      const controller = new NodeController(model);

      this.setController(controller);
      this.setModel(model);

      this.getController().setView(this);
      this.setRootEl(document.createElement('div'));

      this.nodesTable = new app.NodesTable(this.getController().getChildrenModels());

    }
    render() {
      this.getRootEl().appendChild(this.nodesTable.getRootEl());
      this.nodesTable.render();
    }
  };
})();
