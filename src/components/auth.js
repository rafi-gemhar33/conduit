class Auth {
	constructor() {
		this.authenticated = false;
	}

	isLogged(cb) {
		const userData = JSON.parse(localStorage.getItem("userData"));
		const token = userData && userData.user && userData.user.token;

		return token ? true : false;
	}

	getToken() {
		const userData = JSON.parse(localStorage.getItem("userData"));
		const token = userData && userData.user && userData.user.token;
		return token;
	}
}

export default new Auth();
