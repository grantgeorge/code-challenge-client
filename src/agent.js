import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise)

// const API_ROOT = 'https://sts-code-challenge.herokuapp.com/api'
const API_ROOT = 'http://localhost:1337/api'

const encode = encodeURIComponent
const responseBody = res => res.body

let token = null
const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`)
  }
}

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
}

const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/user', { user }),
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const Posts = {
  all: page => requests.get(`/posts?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/posts?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/posts?tag=${encode(tag)}&${limit(10, page)}`),
  del: id => requests.del(`/posts/${id}`),
  favorite: id => requests.post(`/posts/${id}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/posts?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/posts/feed?limit=10&offset=0'),
  get: id => requests.get(`/posts/${id}`),
  unfavorite: id => requests.del(`/posts/${id}/favorite`),
  update: post => requests.put(`/posts/${post.id}`, { post }),
  create: post => requests.post('/posts', { post }),
}

const Comments = {
  create: (is, comment) => requests.post(`/posts/${is}/comments`, { comment }),
  delete: (is, commentId) => requests.del(`/posts/${is}/comments/${commentId}`),
  forPost: is => requests.get(`/posts/${is}/comments`),
}

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
}

export default {
  Posts,
  Auth,
  Comments,
  Profile,
  // Tags,
  setToken: _token => {
    token = _token
  },
}
