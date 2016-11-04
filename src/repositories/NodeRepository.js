(function () {
  'use strict';

  app.NodeRepository = class NodeRepository extends app.Abstract.Repository {
    constructor(name, url = 'http://api-v1.matmapa.pl/') {
      super(name);
      this.url = url;

      $.getJSON({
        url: `${url}nodes`,
        success: data => {
          this.setRepository(data);
        },
      });
      this.addEventListener('insert', item => this.insertToAPI(item));
      this.addEventListener('delete', items => this.removeToAPI(items));
    }
    insertToAPI(item) {
      $.post({
        url: `${this.url}node/add`,
        data: {
          name: item.getName(),
          parent: item.getParent(),
          noted: item.getNotes(),
        },
        success: data => {
          console.log('success!', data); // TODO: app.ConnectionObserver.fireEvent('add', item);
        },
      });
    }
    removeToAPI(items) {
      for (const item in items) {
        $.post({
          url: `${this.url}node/delete`,
          data: {
            id: item.getId(),
          },
          success: data => {
            console.log('success!', data);
          },
        });
      }
    }
    update() {
     // TODO: provide update
    }

  };
})();
