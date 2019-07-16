import React from "react";
import { Link } from "react-router-dom";

import auth from "./auth";

export class ShowTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTab: this.props.initailTab
		};
	}

	handleTab = event => {
		event.preventDefault();
		this.setState({ currentTab: event.target.name });
		this.props.changeTab(event.target.name);
	};

	render() {
		const { tag, profile } = this.props;
		const currentTab = this.props.initailTab;

		return (
			<div className="tabs is-medium">
				<ul>
					{profile ? (
						<>
							<li className={currentTab === "myFeed" ? "is-active" : ""}>
								<Link to="#" onClick={this.handleTab} name="myFeed">
									My Articles
								</Link>
							</li>
							<li className={currentTab === "favorites" ? "is-active" : ""}>
								<Link to="#" onClick={this.handleTab} name="favorites">
									Favorites
								</Link>
							</li>
						</>
					) : (
						<>
							{auth.isLogged() ? (
								<li className={currentTab === "yourFeed" ? "is-active" : ""}>
									<Link to="#" onClick={this.handleTab} name="yourFeed">
										Your Feed
									</Link>
								</li>
							) : (
								<></>
							)}
							<li className={currentTab === "globalFeed" ? "is-active" : ""}>
								<Link to="#" onClick={this.handleTab} name="globalFeed">
									Global Feed
								</Link>
							</li>

							{tag ? (
								<li className={currentTab === "tagFeed" ? "is-active" : ""}>
									<Link to="#" onClick={this.handleTab} name="tagFeed">
										# {tag}
									</Link>
								</li>
							) : (
								<></>
							)}
						</>
					)}
				</ul>
			</div>
		);
	}
}
