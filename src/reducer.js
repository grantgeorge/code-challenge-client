import post from './reducers/post'
import postList from './reducers/postList'
import auth from './reducers/auth'
import { combineReducers } from 'redux'
import common from './reducers/common'
import editor from './reducers/editor'
import home from './reducers/home'
import profile from './reducers/profile'
import settings from './reducers/settings'

export default combineReducers({
  post,
  postList,
  auth,
  common,
  editor,
  home,
  profile,
  settings,
})
