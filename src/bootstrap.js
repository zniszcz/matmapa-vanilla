(function () {
  'use strict';
  window.app = {};

  document.addEventListener('DOMContentLoaded', function () {
    const view = new app.MainView();
    view.render();
  });
})();
