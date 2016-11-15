(function () {
  'use strict';

  app.MainView = class MainView extends app.Abstract.View {
    constructor(model, controller) {
      super(model, controller);

      this.setRootEl(document.body);
      this.topMenu = new app.TopMenu();
      this.wrapper = new app.Wrapper();
      // this.sidebar = new app.Sidebar();
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
