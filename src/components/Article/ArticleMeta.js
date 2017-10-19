import ArticleActions from './ArticleActions'
import { Link } from 'react-router'
import React from 'react'

const ArticleMeta = props => {
  const post = props.post
  return (
    <div className="article-meta">
      <Link to={`@${post.author.username}`}>
        <img src={post.author.image} alt={post.author.username} />
      </Link>

      <div className="info">
        <Link to={`@${post.author.username}`} className="author">
          {post.author.username}
        </Link>
        <span className="date">{new Date(post.createdAt).toDateString()}</span>
      </div>

      <ArticleActions canModify={props.canModify} post={post} />
    </div>
  )
}

export default ArticleMeta
