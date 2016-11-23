(function () {
  'use strict';

  app.APIRepository = class APIRepository extends app.Abstract.Repository {
    constructor(name, url = 'http://api-v1.matmapa.pl/') {
      super(name);
      this.url = url;
    }
    loadItem(id = '') {
      // TODO: send this request only if last-modification on server is earlier than this in localStorage

      if (!isNaN(id)) {
        $.getJSON({
          url: `${this.url}node/details/${id}`,
          success: data => {
            if (data.error) {
              throw new Error(data.error.message);
            } else {
              const node = new app.NodeModel(data.id, data.name, data.parent, data.notes);
              this.update(node);
            }
          },
        });
      }
    }

    loadChilds(id = '', collection) {

      if (!isNaN(id)) {
        $.getJSON({
          url: `${this.url}nodes/${id}`,
          success: data => {
            data.forEach(item => {
              const node = new app.NodeModel(item.id, item.name, item.parent, item.notes);

              if (collection.has(node)) {
                collection.forEach(collectionItem => {
                  if (collectionItem.getId() === node.getId()) {
                    collectionItem.update(node);
                  }
                });
              } else {
                collection.add(node);
              }
            });

          },
        });
      }
    }

    insertItem(item) {
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
    removeItem(item) {
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
    updateItem(item) {
      $.post({
        url: `${this.url}node/edit`,
        data: {
          id: item.getId(),
          name: item.getName(),
          parents: item.getParent(),
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
