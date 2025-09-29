// Simple hash-based router for the vanilla JS app

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    // Listen to hash changes
    window.addEventListener('hashchange', () => this.handleRouteChange());
    window.addEventListener('load', () => this.handleRouteChange());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1); // Remove the '#'
    const [routePath, ...params] = hash.split('/');
    
    this.currentRoute = {
      path: routePath,
      params: params
    };

    // Default to home if no hash
    const route = routePath || 'home';
    
    if (this.routes[route]) {
      this.routes[route](params);
    } else if (routePath.startsWith('category') && this.routes['category']) {
      this.routes['category'](params);
    } else {
      this.routes['home']();
    }
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}

// Create global router instance
window.router = new Router();