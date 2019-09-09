import React from "react";
import { Link } from "react-router-dom";

import customFetch from "../../utils/customFetch";
import auth from "../../utils/auth";
// import Article from "./Article";

export class ShowArticles extends React.Component {
	render() {
		const { articles } = this.props;
		return (
			<>
				{articles.map((article, i) => {
					return (
						<article className="media" key={i}>
							<figure className="media-left">
								<p className="image is-64x64">
									<img
										className=" is-responsive is-rounded"
										src={article.author.image}
										alt=""
									/>
								</p>
							</figure>
							<div className="media-content">
								<div className="content">
									<div>
										<span>
											<Link
												to={{
													pathname: "/profile",
													state: {
														username: article.author.username
													}
												}}
												className="green-text"
											>
												{article.author.username}
											</Link>
										</span>
										<p className="thin-text">
											<em>{Date(article.updatedAt).slice(0, 15)}</em>
										</p>
									</div>
								</div>
								<Link
									to={{
										pathname: "/article",
										state: { slug: article.slug }
									}}
									className="article-link"
								>
									<div className="article-teaser">
										<h4 className="article-title">{article.title}</h4>
										<p>
											{article.description.length > 70
												? `${article.description.slice(0, 70)}...`
												: article.description}
										</p>
									</div>
									<small className="thin-text">Read More...</small>
								</Link>
							</div>
							<div className="media-right">
								<ArticleLike article={article} />
							</div>
						</article>
					);
				})}
			</>
		);
	}
}

class ArticleLike extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			likes: -1,
			fav: -1,
		};
	}

	clickLike(slug) {
		console.log("bulb");
		
		const modeFlag = this.state.fav===-1 ? this.props.article.favorited : this.state.fav
		const url = `https://conduit.productionready.io/api/articles/${slug}/favorite`;
		const mode = modeFlag ? "DELETE" : "POST";
		const token = `Token ${auth.getToken()}`;

		customFetch(url, null, token, mode)
			.then(data => {
				if (!data.errors) {
					const { favoritesCount, favorited } = data.article;
					this.setState({ likes: favoritesCount, fav: favorited });
				} else {
					this.setState({ message: "email or password is invalid" });
				}
			})
			.catch(error => console.error(error));
	}

	render() {
		const { slug, favorited } = this.props.article;
		console.log(this.state.likes)
		return (
			<button
				onClick={() => this.clickLike(slug, favorited)}
				className="button is-success is-outlined"
			>
				<span className="icon is-small">
					<i className="fas fa-heart" />
				</span>
				<span>{this.state.likes===-1?this.props.article.favoritesCount : this.state.likes}</span>
			</button>
		);
	}
}
