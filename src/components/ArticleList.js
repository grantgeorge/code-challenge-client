import ArticlePreview from './ArticlePreview'
import ListPagination from './ListPagination'
import React from 'react'

const ArticleList = props => {
  if (!props.posts) {
    return <div className="article-preview">Loading...</div>
  }

  if (props.posts.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>
  }

  return (
    <div>
      {props.posts.map(post => {
        return <ArticlePreview post={post} key={post.id} />
      })}

      <ListPagination
        pager={props.pager}
        articlesCount={props.postsCount}
        currentPage={props.currentPage}
      />
    </div>
  )
}

export default ArticleList
