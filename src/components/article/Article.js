import React from "react";

import AddComment from "../comment/AddComment";
import ArticleHeader from "./ArticleHeader";

export default class Article extends React.Component {
	constructor() {
		super();
		this.state = {
			article: {}
		};
	}
	componentDidMount() {
		const slug = this.props.location.state && this.props.location.state.slug;
		const url = `https://conduit.productionready.io/api/articles/${slug}`;
		fetch(url)
			.then(response => response.json())
			.then(articleData => {
				if (!articleData.errors) {
					this.setState({ article: articleData.article });
				} else {
					console.log("somethingwentwrong");
				}
			})
			.catch(error => console.error(error));
	}
	render() {
		const { body, tagList } = this.state.article;
		const articleSlug =
			this.props.location.state && this.props.location.state.slug;

		return (
			<React.Fragment>
				<ArticleHeader article={this.state.article} />

				<section className="base column is-8 is-offset-2">
					<div className="content is-medium">
						<p className="article-main">{body}</p>
					</div>

					<div className="tags">
						{tagList ? (
							tagList.map((tag, i) => {
								return (
									<span key={i} className="tag">
										{tag}
									</span>
								);
							})
						) : (
							<></>
						)}
					</div>
					<hr />
				</section>

				<section className="base column is-6 is-offset-3">
					<AddComment slug={articleSlug} />
				</section>
			</React.Fragment>
		);
	}
}
