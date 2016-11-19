(function () {
  'use strict';
  window.app = {};

  document.addEventListener('DOMContentLoaded', function () {
    app.router = new app.Router();

    app.router
      .addRoute('', function () {
        const view = new app.NodeView();
        view.render();
      })
      .addRoute('dupa', () => console.log('dupa'))
      .addRoute('node', () => console.log('dupa'))
      .otherwise('');
  });
})();
