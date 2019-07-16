import React from "react";

export class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: this.props.page || 1
		};
	}

	changePage(currentPage) {
		const offset = (currentPage - 1) * 10;
		this.props.filterByPage({ offset });
		this.props.setPage(currentPage);
		this.setState({ currentPage });
	}

	render() {
		const maxCount = Math.ceil(this.props.count / 10);
		const pages = "0"
			.repeat(maxCount)
			.split("")
			.reduce((a, c, i) => {
				a.push(i + 1);
				return a;
			}, []);
		const { currentPage } = this.state;
		return (
			<nav className="pagination" role="navigation" aria-label="pagination">
				{/* <button
            href="#"
            className="pagination-previous"
            title="This is the first page"
            disabled
          >
            Previous
          </button>
          <button className="pagination-next">Next page</button> */}

				<ul className="pagination-list">
					{pages.map(e => {
						return (
							<li key={e}>
								<button
									onClick={() => this.changePage(e)}
									className={`page-number pagination-link ${
										e === currentPage ? "is-current" : ""
									}`}
									aria-label={`Goto page ${e}`}
									aria-current="page"
								>
									{e}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
}
