import React from 'react'
import { Link } from 'react-router'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
} from '../constants/actionTypes'

const FAVORITED_CLASS = 'btn btn-sm btn-primary'
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary'

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Posts.favorite(slug),
    }),
  unfavorite: slug =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Posts.unfavorite(slug),
    }),
})

const ArticlePreview = props => {
  const post = props.post
  const favoriteButtonClass = post.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS

  const handleClick = ev => {
    ev.preventDefault()
    if (post.favorited) {
      props.unfavorite(post.id)
    } else {
      props.favorite(post.id)
    }
  }

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${post.author.username}`}>
          <img src={post.author.image} alt={post.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${post.author.username}`}>
            {post.author.username}
          </Link>
          <span className="date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart" /> {post.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`article/${post.id}`} className="preview-link">
        <p>{post.body}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview)
