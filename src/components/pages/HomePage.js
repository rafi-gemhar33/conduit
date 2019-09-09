import React from 'react';
import { ShowTags } from '../filters/ShowTags';
import { ShowArticles } from '../article/ShowArticles';
import { ShowTab } from '../filters/ShowTab';
import { Pagination } from '../filters/Pagination';
import auth from '../../utils/auth';

export class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			isLoading: false,
			tag: '',
			articlesCount: 0,
			page: 1,
			initailTab: 'globalFeed',
		};
		this.isYourFeed = false;
		this.urlItem = {};
	}

	componentDidMount() {
		this.fetchArticles();
	}

	fetchArticles = (filter = {}) => {
		const { tag, author, favorited, offset } = Object.assign(
			this.urlItem,
			filter
		);

		if (!this.isYourFeed) {
			const URL = `https://conduit.productionready.io/api/articles?limit=10&offset=${offset ||
				'0'}&tag=${tag || ''}&author=${author || ''}&favorited=${favorited ||
				''}`;

			fetch(URL)
				.then(res => res.json())
				.then(data => {
					const { articles, articlesCount } = data;
					this.setState({ articles, articlesCount, isLoading: false });
				})
				.catch(error => console.error(error));
		} else {
			const URL = `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${offset ||
				'0'}`;
			const token = `Token ${auth.getToken()}`;

			fetch(URL, {
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrer: 'no-referrer', // no-referrer, *client
			})
				.then(response => response.json())
				.then(data => {
					const { articles, articlesCount } = data;
					this.setState({ articles, articlesCount, isLoading: false });
				})
				.catch(error => console.error(error));
		}
	};

	filterByItem = item => {
		this.isYourFeed = false;
		this.urlItem = item;
		this.fetchArticles(item);
	};

	filterByPage = offset => {};

	setPage = page => {
		this.setState({ page });
	};

	setTag = tag => {
		this.setState({ tag, initailTab: 'tagFeed', isYourFeed: false });
	};

	handleTab = tab => {
		this.setState({ initailTab: tab });
		switch (tab) {
			case 'yourFeed':
				this.isYourFeed = true;
				this.urlItem = {};
				this.fetchArticles();
				break;
			case 'globalFeed':
				this.filterByItem({});
				break;
			case 'tagFeed':
				this.filterByItem({ tag: this.state.tag });
				break;

			default:
				break;
		}
	};

	render() {
		const {
			articles,
			isLoading,
			page,
			tag,
			articlesCount,
			initailTab,
		} = this.state;

		return (
			<>
				<section className="hero is-normal is-success is-bold">
					<div className="hero-body">
						<div className="container hero-container">
							<h1 className="header-title title is-1">conduit </h1>
							<h2 className="subtitle is-4">
								{' '}
								A place to share your knowledge.
							</h2>
						</div>
					</div>
				</section>

				<div className="base column is-8 is-offset-2">
					<section className="main-container">
						<div className="column is-three-quarters">
							<ShowTab
								tag={tag}
								initailTab={initailTab}
								changeTab={this.handleTab}
							/>
							<ShowArticles articles={articles} isLoading={isLoading} />
						</div>
						<div>
							<ShowTags filterByTag={this.filterByItem} setTag={this.setTag} />
						</div>
					</section>
					<footer className="column is-three-quarters">
						{isLoading ? (
							<p>Loading...</p>
						) : (
							<Pagination
								count={articlesCount}
								filterByPage={this.fetchArticles}
								setPage={this.setPage}
								page={page}
							/>
						)}
					</footer>
				</div>
			</>
		);
	}
}
