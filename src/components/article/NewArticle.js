import React from "react";
import { Redirect } from "react-router-dom";

import customFetch from "../../utils/customFetch";
import auth from "../../utils/auth";

export default class NewArticle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			description: "",
			body: "",
			tagList: "",
			message: "",
			slug: "",
			shouldRedirect: false,
			isUpdating: false
		};
	}

	componentDidMount() {
		if (
			this.props.location &&
			this.props.location.state &&
			this.props.location.state.article
		) {
			const {
				title,
				description,
				body,
				slug,
				tagList
			} = this.props.location.state.article;
			const tagsString = tagList.join(", ");

			this.setState({
				title,
				description,
				body,
				tagList: tagsString,
				slug,
				isUpdating: true
			});
		}
	}

	handleInput = ev => {
		this.setState({ message: "" });
		this.setState({ [ev.target.name]: ev.target.value });
	};

	publish = () => {
		const tagList = this.state.tagList.split(",").map(tag => tag.trim());
		const { title, description, body, slug } = this.state;
		if (title.length > 1 && description.length > 1 && body.length > 1) {
			const articleData = {
				article: {
					title,
					description,
					body,
					tagList
				}
			};
			const token = `Token ${auth.getToken()}`;
			const method = this.state.isUpdating ? "PUT" : "POST";
			const createArticleAPI = `https://conduit.productionready.io/api/articles${
				this.state.isUpdating ? `/${slug}` : ""
			}`;

			customFetch(createArticleAPI, articleData, token, method)
				.then(articleData => {
					if (!articleData.errors) {
						let newSlug = articleData.article && articleData.article.slug;
						this.setState({ slug: newSlug, shouldRedirect: true });
					} else {
						this.setState({ message: "Something went wrong" });
					}
				})
				.catch(error => console.error(error));
		} else {
			this.setState({ message: "title ,description or body cannot be empty" });
		}
	};

	render() {
		const {
			title,
			description,
			body,
			tagList,
			slug,
			shouldRedirect
		} = this.state;
		if (shouldRedirect) {
			return (
				<Redirect
					to={{
						pathname: "/article",
						state: { slug: slug }
					}}
				/>
			);
		} else {
			return (
				<div className="column is-8 is-offset-2">
					<div className="column is-8 is-offset-2">
						<div className="sign-header">
							<h1 className="subtitle is-1 ">Add New Article</h1>
						</div>
						<div className="field">
							<div className="control">
								<input
									className="input is-medium"
									type="text"
									placeholder="Article Title"
									name="title"
									onChange={this.handleInput}
									value={title}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									className="input "
									type="text"
									placeholder="What's the article about?"
									name="description"
									onChange={this.handleInput}
									value={description}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<textarea
									className="textarea "
									placeholder="Write your article (in markdown)"
									name="body"
									rows="5"
									onChange={this.handleInput}
									value={body}
								/>
							</div>
						</div>

						<div className="field">
							<div className="control">
								<input
									className="input "
									type="text"
									placeholder="Enter Tags"
									name="tagList"
									onChange={this.handleInput}
									value={tagList}
								/>
							</div>
							<p className="help is-danger">{this.state.message}</p>
						</div>

						<div className="field is-grouped">
							<div className="control">
								<button
									className="button is-success is-medium"
									onClick={this.publish}
								>
									Publish
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
