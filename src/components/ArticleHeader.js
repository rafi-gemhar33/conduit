import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import customFetch from "../customFetch";
import auth from "./auth";

class ArticleHeader extends React.Component {
	state = {
		redirect: false
	};

	deleteArticle = () => {
		if (window.confirm("Are you sure to delete")) {
			const { slug } = this.props.article;
			const token = `Token ${auth.getToken()}`;
			const url = `https://conduit.productionready.io/api/articles/${slug}`;
			customFetch(url, null, token, "DELETE").then(data => {
				if (!data.errors) {
					this.props.history.push("/");
				} else {
					this.setState({ message: "Something went wrong" });
				}
			});
		}
	};

	editArticle = () => {
		this.setState({ redirect: true });
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return (
				<Redirect
					to={{
						pathname: "/newArticle",
						state: { article: this.props.article }
					}}
				/>
			);
		}
	};

	render() {
		const { author, createdAt, title } = this.props.article;
		const image = author && author.image;
		const authorName = author && author.username;
		const dateInformat = createdAt && Date(createdAt).slice(0, 15);
		const userData = JSON.parse(localStorage.getItem("userData"));
		const currentUser =
			(userData && userData.user && userData.user.username) || "";
		return (
			<section className="hero is-dark">
				{this.renderRedirect()}
				<div className="base column is-8 is-offset-2">
					<div className="hero-body">
						<div className="container">
							<h1 className="title is-1">{title}</h1>
						</div>
					</div>
					<div className="card-content">
						<div className="media">
							<div className="media-left">
								<figure className="image is-48x48">
									<img
										className=" is-responsive is-rounded"
										src={image}
										alt="profile avatar"
									/>
								</figure>
							</div>
							<div className="media-content is-small">
								<p className="title is-5">{authorName}</p>
								<p className="subtitle is-6 thin-text">
									<em>{dateInformat}</em>
								</p>
							</div>
							{currentUser === authorName ? (
								<div className="media-right article-btn-box">
									<button
										className="button is-warning is-small is-outlined article-btn"
										onClick={this.editArticle}
									>
										<span className="icon is-small">
											<i className="fas fa-cog" />
										</span>
										<span>Edit Article</span>
									</button>

									<button
										className="button is-danger is-small is-outlined article-btn"
										onClick={this.deleteArticle}
									>
										<span className="icon is-small">
											<i className="fas fa-trash-alt" />
										</span>
										<span>Delete Article</span>
									</button>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default withRouter(ArticleHeader);
