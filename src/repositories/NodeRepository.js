(function () {

  'use strict';

  class NodeRepository extends app.APIRepository {
    constructor() {
      super();
    }
    getNode(id) {
      const query = new app.NodeQueryModel({id});
      let result = this.find(query)[0];

      if (!result) {
        result = new app.NodeModel(id);
        this.insert(result);
        // if (!id) {
        this.loadItem(id);
        // }
      }

      return result;
    }
    getChildrenOf(parentId) {
      const query = new app.NodeQueryModel({parent: parentId});
      const result = this.find(query);

      this.loadChilds(parentId, result);

      return result;
    }
    addNode(model) {
      this.insertItem(model);
    }
    updateNode(model) {
      this.updateItem(model);
    }
    removeNode(id) {
      const query = new app.NodeQueryModel({id});
      this.removeItem(query);
    }
  }

  app.setService('NodeRepository', new NodeRepository());

})();
