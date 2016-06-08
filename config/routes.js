'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.get('/user-posts/:id', 'posts#setPosts')
.resources('posts')

.get('/user-comments/:id', 'comments#setCommentsByAuthor')
.get('/post-comments/:id', 'comments#setCommentsByPost')
.get('/comment-comments/:id', 'comments#setCommentsByComment')
.resources('comments')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
