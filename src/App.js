import React from "react";
import { withRouter } from "react-router-dom";

import "./App.css";
import { BaseLayout } from "./components/layout/BaseLayout";

export const UserContext = React.createContext({});

class App extends React.Component {
	state = {
		loggedUser: null
	};

	componentDidMount() {
		const token = localStorage.getItem("currentUser");
		const url = `https://conduit.productionready.io/api/user`;
		const tokenFormatted = `Token ${token}`;

		fetch(url, {
			mode: "cors",
			method: "GET",
			cache: "no-cache",
			headers: {
				Authorization: tokenFormatted
			},
			redirect: "follow"
		})
			.then(res => {
				if (res.status !== 200) {
					console.log("fetch fail");
				} else {
					return res.json();
				}
			})
			.then(user => {
				if (!user.errors) {
					this.setState({ loggedUser: user });
				} else {
					console.log("somethingwentwrong");
				}
			})
			.catch(error => console.error(error));
	}

	render() {
		const { loggedUser } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<UserContext.Provider value={loggedUser}>
						<BaseLayout />
					</UserContext.Provider>
				</header>
			</div>
		);
	}
}

export default withRouter(App);
