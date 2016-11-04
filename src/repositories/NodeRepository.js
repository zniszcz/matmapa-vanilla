(function () {
  'use strict';

  app.NodeRepository = class NodeRepository extends app.LocalStorageRepository {
    constructor(name, url = 'http://api-v1.matmapa.pl/') {
      super(name);
      this.url = url;
      this.loadNodes();
      this.addEventListener('insert', item => this.insertToAPI(item));
      this.addEventListener('delete', items => this.removeToAPI(items));
    }
    loadNodes() {
      this.setRepository([]);
      $.getJSON({
        url: `${this.url}nodes`,
        success: data => {
          data.forEach(item => {
            const node = new app.NodeModel(item.id, item.parent, item.name, item.notes);
            this.insert(node);
          });
        },
      });
    }
    insertNode(item) {
      $.post({
        url: `${this.url}node/add`,
        data: {
          name: item.getName(),
          parent: item.getParent(),
          note: item.getNotes(),
        },
        success: data => {
          if (!data.error) {
            item.setId(data.id);
            this.insert(item);
          }
        },
      });
    }
    removeNode(item) {
      $.post({
        url: `${this.url}node/delete`,
        data: {
          id: item.getId(),
        },
        success: data => {
          console.log(data);
          if (!data.error) {
            this.remove(item);
          }
        },
      });
    }
    update() {
    }

  };
})();
