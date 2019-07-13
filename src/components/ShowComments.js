import React from 'react';
import {Link} from 'react-router-dom';

export default class ShowComments extends React.Component {

    deleteCommnt(commentID) {
        if(window.confirm("Are you sure to delete")){
            this.props.delete(commentID);
        }
    }
    render(){
        const userData = JSON.parse(localStorage.getItem("userData"));
        const currentUser = (userData && userData.user && userData.user.username) || ""; 
        return(
            <>
            {
                this.props.comments.map((comment, i)=>{
                    const {author, body, createdAt, id} = comment
                    return(
                        <article key={i} className="media comment-box">
                            <div className="media-content">
                                <div className="field">
                                <p className="control">
                                    <textarea className="textarea old-comment" value={body} placeholder="Add a comment..." rows='3' readOnly></textarea>
                                </p>
                                </div>
                                <nav className="level comment-footer">
                                <div className="level-left">
                                    <div className="media commnet-media">
                                        <div className="media-left">
                                            <figure className="image is-32x32">
                                                <img className=" is-responsive is-rounded" src={author.image || "https://bulma.io/images/placeholders/96x96.png"} alt="author avatar" />
                                            </figure>
                                        </div>
                                        <div className="v-center media-content is-small">
                                            <Link to={{
                                                    pathname: "/profile",
                                                    state: {
                                                        username: author.username
                                                    }
                                                    }} className="green-text">
                                                <span className="green-text">
                                                    {author.username}
                                                </span>
                                            </Link>
                                            <span className="thin-text"><em>{Date(createdAt).slice(0, 15)}</em></span>
                                        </div>
                                    </div>
                                </div>
                                    {
                                        author.username ===  currentUser 
                                        ?
                                        <div className="level-right">
                                            <div className="level-item">
                                                <div className="level-item">
                                                    <button 
                                                    className="button is-text"
                                                    onClick = {() => this.deleteCommnt(id)}
                                                    >
                                                        <span className="icon is-small">
                                                        <i className="fas fa-trash-alt"></i>
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <></>
                                    }
                                </nav>
                            </div>
                        </article>
                    )
                })
            }
            </>
        )
    }

}