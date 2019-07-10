class Auth {
  constructor() {
    this.authenticated = false;
  }

  isLogged(cb) {
    return localStorage.currentUser ? true : false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
