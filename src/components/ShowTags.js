import React from "react";

export class ShowTags extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tags: []
    }
  }
    componentDidMount() {
      fetch("https://conduit.productionready.io/api/tags")
        .then(res => res.json())
        .then(data => {
          let newArr = data.tags;
          this.setState({ tags: newArr });
        })
        .catch(error => console.error(error));
    }

    handleClick(tag) {
      this.props.filterByTag({tag});
      this.props.setTag(tag);
    }

    render() {
      return (
        <div className="tags box tag-container">
          <div className="tag-title">
            <p>Popular Tags</p>
          </div>
          {this.state.tags.map((tag, i) => (
            <button 
              key={i} 
              className="tag button is-success is-medium"
              onClick = {() => this.handleClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      );
    }
  }
  
