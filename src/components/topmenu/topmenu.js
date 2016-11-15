(function () {
  'use strict';
  app.TopMenu = class TopMenu extends app.Abstract.View {
    constructor() {
      super();
      this.setRootEl(document.createElement('nav'));
      this.topMenuList = new TopMenuList();
      this.container = document.createElement('div');
    }
    render() {
      this.getRootEl().classList.add('navbar', 'navbar-inverse', 'navbar-fixed-top');
      this.getRootEl().setAttribute('role', 'navigation');
      this.getRootEl().appendChild(this.container);

      this.topMenuList.render();
      this.renderContainer();
    }
    renderContainer() {
      this.container.classList.add('container-fluid');
      this.container.innerHTML = `
        <div class='navbar-header'>
          <a href='#/' class='navbar-brand'>Mapa Matematyki</a>
        </div>
        ${this.topMenuList.getRootEl().outerHTML}
      `;
      console.dir(this.topMenuList.getRootEl().outerHTML);
    }
  };

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
      return this.elements.map(item => new TopMenuListElement(item.name, item.link));
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
