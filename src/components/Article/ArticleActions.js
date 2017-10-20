import { Link } from 'react-router'
import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'
import { DELETE_POST } from '../../constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload => dispatch({ type: DELETE_POST, payload }),
})

const PostActions = props => {
  const article = props.post
  const del = () => {
    props.onClickDelete(agent.Posts.del(article.slug))
  }
  if (props.canModify) {
    return (
      <span>
        <Link
          to={`/editor/${article.slug}`}
          className="btn btn-outline-secondary btn-sm"
        >
          <i className="ion-edit" /> Edit Post
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a" /> Delete Post
        </button>
      </span>
    )
  }

  return <span />
}

export default connect(() => ({}), mapDispatchToProps)(PostActions)
