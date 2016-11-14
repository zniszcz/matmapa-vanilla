(function () {
  'use strict';
  app.TopMenu = class TopMenu extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('nav'));
      this.container = new TopMenuContainer();
    }
    render() {
      this.getRootEl().classList.add('navbar', 'navbar-inverse', 'navbar-fixed-top');
      this.getRootEl().setAttribute('role', 'navigation');
      this.getRootEl().appendChild(this.container.getRootEl());

      this.container.render();
    }
  };

  class TopMenuContainer extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('div'));
      this.brand = new TopMenuBrand();
      this.list = new TopMenuList();
    }
    render() {
      this.getRootEl().classList.add('container-fluid');
      this.getRootEl().appendChild(this.brand.getRootEl());
      this.getRootEl().appendChild(this.list.getRootEl());

      this.brand.render();
      this.list.render();
    }
  }

  class TopMenuBrand extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('div'));
    }
    render() {
      const link = document.createElement('a');
      link.setAttribute('href', '#');
      link.classList.add('navbar-brand');
      link.textContent = 'Mapa Matematyki';

      this.getRootEl().classList.add('navbar-header');
      this.getRootEl().appendChild(link);
    }
  }

  class TopMenuList extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('ul'));
      // TODO: menu model
      this.elements = [
        {
          name: 'Dashboard',
          link: '#',
        },
      ];
      this.elementsViews = this.createElements();
    }
    render() {
      this.getRootEl().classList.add('nav', 'navbar-nav');
      this.elementsViews.forEach(item => {
        this.getRootEl().appendChild(item.getRootEl());
        item.render();
      });

    }
    createElements() {
      const res = this.elements.map(item => new TopMenuListElement(item.name, item.link));
      return res;
    }
  }

  class TopMenuListElement extends app.Abstract.View {
    constructor(name = '', link = '#') {
      super();
      this.name = name;
      this.link = link;
      this.setRootEl(document.createElement('li'));
    }
    render() {
      const link = document.createElement('a');
      link.setAttribute('href', this.link);
      link.textContent = this.name;

      this.getRootEl().appendChild(link);
    }
  }
})();
