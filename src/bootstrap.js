(function () {
  'use strict';
  window.app = {};

  document.addEventListener('DOMContentLoaded', function () {
    const view = new app.MainView();

    view.render();

    app.router = new app.Router();

    app.router
      .addRoute('node', function () {
        const nodeView = new app.NodeListView();
        view.getWrapper().clear().addComponent(nodeView);
        nodeView.render();
      })
      .otherwise('/node');
  });
})();
