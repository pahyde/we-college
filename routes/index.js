const path = require('path');
const knex = require('../db/knex.js');

module.exports = app => {
    
    //login
    app.get('/login', (req, res) => {
        var user = req.session.user || null;
        res.render('pages/landing', {user});
    })

    //sign up
    app.post('/sign-up', (req, res) => {
        var user = req.body;
        knex('users')
          .insert({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
          })
          .then(() => {
            res.redirect('/');
          })
        res.redirect('/');
    })

    app.post('/log-in', (req, res) => {
        console.log('here');
        knex('users')
          .where('email', req.body.email)
          .then(results => {
                var user = results[0];
                console.log(user);
                console.log(req.body);
                if (user.password == req.body.password) {
                    req.session.user = user;
                    res.redirect('/');
                } else {
                    res.redirect('/login');
                }
          })
          .catch(() => {
              res.redirect('/login');
          })
    })
    
    app.use(loginAuthentication);

    //home route
    app.get('/', (req, res) => {
        req.session.views = (req.session.views || 0) + 1;
        console.log(req.session.views);
        knex('posts')
          .select()
          .then(posts => {
            var user = req.session.user || null;
            res.render('pages/home', {posts, user});
        })
    });
    
    //sign up
    app.get('/sign-up', (req, res) => res.send('sign-up'));
    
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
     
    function loginAuthentication(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }

};