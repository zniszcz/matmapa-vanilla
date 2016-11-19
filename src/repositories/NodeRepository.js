(function () {
  'use strict';

  app.NodeRepository = class NodeRepository extends app.LocalStorageRepository {
    constructor(name, url = 'http://api-v1.matmapa.pl/') {
      super(name);
      this.url = url;
      this.load();
    }
    load() {
      this.loadLocalStorage();

      // TODO: send this request only if last-modification on server is earlier than this in localStorage
      $.getJSON({
        url: `${this.url}nodes`,
        success: data => {
          const newRepository = [];

          data.forEach(item => {
            const node = new app.NodeModel(item.id, item.name, item.parent, item.notes);
            newRepository.push(node);
          });

          this.setRepository(newRepository);
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
          } else {
            console.debug(data);
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
          if (!data.error) {
            this.remove(item);
          }
        },
      });
    }
    updateNode(item) {
      $.post({
        url: `${this.url}node/edit`,
        data: {
          id: item.getId(),
          name: item.getName(),
          parent: item.getParent(),
          note: item.getNotes(),
        },
        success: data => {
          if (!data.error) {
            this.update(item);
          }
        },
      });
    }

  };
})();
