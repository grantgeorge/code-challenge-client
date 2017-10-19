import ListErrors from './ListErrors'
import React from 'react'
import agent from '../agent'
import { connect } from 'react-redux'
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.editor,
})

const mapDispatchToProps = dispatch => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: payload => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  // onRemoveTag: tag => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: payload => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: payload => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
})

class Editor extends React.Component {
  constructor() {
    super()

    const updateFieldEvent = key => ev =>
      this.props.onUpdateField(key, ev.target.value)
    this.changeBody = updateFieldEvent('body')

    this.watchForEnter = ev => {
      if (ev.keyCode === 13) {
        ev.preventDefault()
        this.props.onAddTag()
      }
    }

    this.removeTagHandler = tag => () => {
      this.props.onRemoveTag(tag)
    }

    this.submitForm = ev => {
      ev.preventDefault()
      const post = {
        body: this.props.body,
      }

      const promise = this.props.id
        ? agent.Posts.update(Object.assign(post, this.props.post.id))
        : agent.Posts.create(post)

      this.props.onSubmit(promise)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      if (nextProps.params.id) {
        this.props.onUnload()
        return this.props.onLoad(agent.Posts.get(this.props.params.id))
      }
      this.props.onLoad(null)
    }
  }

  componentWillMount() {
    if (this.props.params.id) {
      return this.props.onLoad(agent.Posts.get(this.props.params.id))
    }
    this.props.onLoad(null)
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListErrors errors={this.props.errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Post body"
                      value={this.props.body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Post
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
