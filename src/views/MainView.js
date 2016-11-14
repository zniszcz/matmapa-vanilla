(function () {
  'use strict';

  app.MainView = class MainView extends app.Abstract.View {
    constructor(model, controller) {
      super(model, controller);

      this.setRootEl(document.body);
      this.topMenu = new app.TopMenu();
      // this.sidebar = new app.Sidebar();
    }
    render() {
      this.getRootEl().appendChild(this.topMenu.getRootEl());
      this.topMenu.render();

      if (app.utils.checkEventSupport()) {
        this.getRootEl().classList.add('touch');
      }
    }
  };
})();
