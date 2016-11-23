(function () {
  'use strict';

  class MainController extends app.Abstract.Controller {
    constructor() {
      super();
    }
    showNodesList(model) {
      const view = new app.NodeListView(model);
      view.render();

      this.getView().wrapper.clear();
      this.getView().wrapper.addComponent(view);
    }
  }

  app.MainView = class MainView extends app.Abstract.View {
    constructor(model) {
      const controller = new MainController();
      super(model, controller);

      controller.setView(this);

      this.setRootEl(document.body);
      this.topMenu = new app.TopMenu();
      this.wrapper = new app.Wrapper();
      // this.sidebar = new app.Sidebar();
    }
    getWrapper() {
      return this.wrapper;
    }
    render() {
      this.getRootEl().appendChild(this.topMenu.getRootEl());
      this.getRootEl().appendChild(this.wrapper.getRootEl());
      this.topMenu.render();
      this.wrapper.render();

      if (app.utils.checkEventSupport()) {
        this.getRootEl().classList.add('touch');
      }
    }
  };
})();
