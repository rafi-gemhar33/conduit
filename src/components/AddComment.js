import React from 'react';
import { Link } from "react-router-dom";

import auth from "./auth";
import customFetch from '../customFetch';
import ShowComments from './ShowComments';

export default class AddComment extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            comment: "",
            message: "",
            comments: []
        }
    }

    componentDidMount(){
        this.fetchAllComments();
    }

    handleComment = (ev) => {
        this.setState({comment: ev.target.value, message:""})
    }

    addComment = () => {
        const {comment} = this.state
        if(comment.length>0) {

            const slug = this.props.slug;
            const url = `https://conduit.productionready.io/api/articles/${slug}/comments`;
            const data = {
                    comment: {
                    body: comment
                    }
              }

            const token = `Token ${auth.getToken()}`
            customFetch(url, data, token)
            .then(commetData => {
                if(!commetData.errors){
                    this.fetchAllComments();
                } else {
                  this.setState({ message: "Something went wrong"});
                }
              })
              .catch(error => console.error(error));
              } else {
                this.setState({ message: "Why the hell are posting empty commnet"});
              }
    }

    fetchAllComments = () => {
        const slug = this.props.slug;

        const url = `https://conduit.productionready.io/api/articles/${slug}/comments`
        fetch(url)
        .then(response => response.json())
        .then(commetData => {
            if(!commetData.errors){
                this.setState({ 
                    comments: commetData.comments,
                    comment: ""
                })
              }
        })
        .catch(error => console.error(error));
    }

    deleteComment = (commentID) => {

        const slug = this.props.slug;
        const url = `https://conduit.productionready.io/api/articles/${slug}/comments/${commentID}`;
        const token = `Token ${auth.getToken()}`

        customFetch(url, null, token, "DELETE")
        .then(commetData => {
            if(!commetData.errors){
                this.fetchAllComments();
            } else {
              this.setState({ message: "Something went wrong"});
            }
          })
          .catch(error => console.error(error));
          
    }

    render() {
        return auth.isLogged() ? 
        (
            <>
                <article className="media comment-box">
                    <div className="media-content">
                        <div className="field">
                        <p className="control">
                            <textarea className="textarea old-comment" placeholder="Add a comment..." rows='3' onChange={this.handleComment} value={this.state.comment}></textarea>
                        </p>
                        </div>
                        <nav className="level comment-footer">
                            <div className="level-left">
                                <div className="media commnet-media">
                                    <div className="media-left">
                                        <figure className="image is-32x32">
                                            <img className=" is-responsive is-rounded" src="" alt="" />
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <div className="level-item">
                                    <p className="help is-danger">{this.state.message}</p>
                                        <button className="button is-success is-small" onClick={this.addComment}>Post Comment</button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </article>
                <ShowComments comments={this.state.comments} delete = {this.deleteComment}/>
            </>
        )
        :
        (
            <p className="help is-medium">
            <Link className="green-text" to='/login'> Sign In </Link>
              or 
            <Link className="green-text" to='/register'> Sign Up </Link>
              to add comments</p>
        )
    }
}

