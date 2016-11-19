(function () {
  'use strict';

  app.Router = class Router extends app.Abstract.Observable{
    constructor() {
      super();
      this.routes = {};
      this.setDefaultRoute(() => console.log('DuUDUuUUpa'));
      window.addEventListener('hashchange', () => this.reload());
    }
    reload() {
      const params = this.parseHash();
      this.setRouteParams(params);
      this.execRoute(params.route);
    }
    addRoute(hash, action) {
      this.routes[hash] = action;
      return this;
    }
    setDefaultRoute(href) {
      this.defaultRoute = href;
    }
    otherwise(adres){
      /*  -- Nie ta odpowiedzialność - dobry kod, złe miejsce
      const doesntExist = false; // TODO
      const isntSet = (!window.location.hash ||
                       window.location.hash.length < 2 ||
                       window.location.hash === '#/');

      if(doesntExist || isntSet) {
        window.location.hash = this.defaultRoute;
      } else {
      */
        this.setDefaultRoute(adres);
      //}
    }
    /* setCurrentView(View) {
      // tutaj powinna być metoda czyszcząca wrapper i przypisująca nowy widok na wrapper
      this.currentView = new View();
    } */
    setRouteParams(params = this.checkRouteParam()) {
      this.routeParams = params;
    }

    /* getCurrentView() {
      return this.currentView;
    } */
    getRouteParams() {
      return this.routeParams;
    }

    existRoute(href) {
      return (href in this.routes);
    }

    backToDefaultRoute() {
      window.location.hash = '#'+this.defaultRoute;
    }

    execRoute(href) {
      console.log("I executed " + href);
      if (this.existRoute(href)) {
        this.routes[href]();
      } else {
        this.backToDefaultRoute();
      }
    }

    render() {
      this.getCurrentView().render();
    }
    parseHash() {

      const parsedHash = window.location.hash.split('/');
      const params = {
        route: parsedHash[1],
        params: {
          id: '1',
        },
        action: null,
      };
      return params;
    }
  }
})();
