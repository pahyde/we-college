const path = require('path');
const knex = require('../db/knex.js');
const hasher = require('../config/hasher');
const requester = require('../config/requester');
const keys = require('../config/keys.js');

module.exports = app => {
    
    //login
    app.get('/login', (req, res) => {
        var user = req.session.user || null;
        res.render('pages/landing', {user});
    })

    //sign up
    app.post('/sign-up', (req, res) => {
        hasher.hash(req.body).then(user => {
            knex('users').insert({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.error(err);
            })
        })
    })

    app.post('/log-in', (req, res) => {
        knex('users').where('email', req.body.email)
            .then(results => {
                var user = results[0];
                hasher.compare(req.body, user).then(isMatch => {
                    if (isMatch) {
                        req.session.user = user;
                        req.session.save(() => {
                            res.redirect('/');
                        });
                    } else {
                        res.redirect('/login');
                    }
                })
            })
            .catch(err => {
                console.error(err);
            })
            
    })
    
    app.use(loginAuthentication);

    //home route
    app.get('/', (req, res) => {
        knex('posts')
          .select()
          .then(posts => {
            var user = req.session.user || null;
            res.render('pages/home', {posts, user});
        })
    });
    
    //view edit profile
    app.get('/user-profile', (req, res) => res.send('user-profile test'));
    
    //view edit thread
    app.get('/thread', (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/pages/create.html'));
    });
    
    //create thread
    app.get('/create', (req, res) => {
        var user = req.session.user || null;
        res.render('pages/create', {user});
    });

    //POST

    //create thread
    app.post('/create-topic', (req, res) => {
        var post = req.body;
        knex('posts')
          .insert({
            user: 'diff_user',
            title: post.title,
            description: post.description,
            category: post.cat,
            likes: 0,
            comments: 0,
            created: (new Date()).toISOString(),
            updated: (new Date()).toISOString()
          })
          .then(() => {
              res.redirect('/');
          })
    })

    //API

    app.get('/api/run', (req, res) => {
        var program = req.query;
        var url = 'https://api.jdoodle.com/v1/execute';
        var params = {
            clientId: keys.compilerId,
            clientSecret:keys.compilerSecret,
            script: program.script,
            stdin: program.stdin,
            language: 'java',
            versionIndex: 2
        }
        requester.get(url, params).then(response => {
            res.send(response);
        })
        .catch(error => {
            res.send('error: ' + error);
        })
    })

    function loginAuthentication(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

};