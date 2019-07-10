import React from "react";
import Loader from "./components/Loader";
export class ShowArticles extends React.Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://conduit.productionready.io/api/articles?limit=10&offset=0")
      .then(res => res.json())
      .then(data => {
        let newArr = this.state.articles.concat(data.articles);
        this.setState({ articles: newArr, isLoading: false });
      });
  }
  render() {
    const { isLoading, articles } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <>
        {articles.map((article, i) => {
          return (
            <article className="media" key={i}>
              <figure className="media-left">
                <p className="image is-64x64">
                  <img className="is-rounded" src={article.author.image} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <div>
                    <span>
                      <a href="#" className="green-text">
                        {article.author.username}
                      </a>
                    </span>

                    <a className="article-link">
                      <p>
                        <em>{Date(article.updatedAt).slice(0, 15)}</em>
                      </p>
                      <h4 className="article-title">{article.title}</h4>
                      {article.description}
                      <p>Read More...</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="media-right">
                <button className="button is-success is-outlined">
                  <span className="icon is-small">
                    <i className="fas fa-heart" />
                  </span>
                  <span>{article.favoritesCount}</span>
                </button>
              </div>
            </article>
          );
        })}
      </>
    );
  }
}
