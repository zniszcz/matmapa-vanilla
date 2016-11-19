(function () {
  'use strict';

  app.Router = class Router extends app.Abstract.Observable {
    constructor() {
      super();
      this.routes = {};
      window.addEventListener('DOMContentLoaded', () => this.reload());
      window.addEventListener('hashchange', () => this.reload());
    }
    reload() {
      const params = this.parseHash();
      if (params) {
        this.setRouteParams(params.params);
        this.execRoute(params.route);
      } else {
        this.backToDefaultRoute();
      }
    }
    addRoute(hash, action) {
      this.routes[hash] = action;
      return this;
    }
    setDefaultRoute(href) {
      this.defaultRoute = href;
    }
    otherwise(href) {
      this.setDefaultRoute(href);
      return this;
    }
    setRouteParams(params = this.parseHash()) {
      this.routeParams = params;
    }
    getRouteParams() {
      return this.routeParams;
    }
    existRoute(href) {
      return (href in this.routes);
    }

    backToDefaultRoute() {
      window.location.hash = `#${this.defaultRoute}`;
    }
    execRoute(href) {
      this.routes[href]();
    }
    parseHash() {

      const parsedHash = window.location.hash.split('/');
      const result = {};
      const isCorrectHash = (parsedHash[0] === '#');

      result.route = parsedHash[1] || '';
      result.params = parsedHash.slice(2);

      if (!this.existRoute(result.route) || !isCorrectHash) {
        return null;
      }

      return result;
    }
  };
})();
