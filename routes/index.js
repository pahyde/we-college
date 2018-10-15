const path = require('path');
const knex = require('../db/knex.js');

module.exports = app => {
    
    //login
    app.get('/login', (req, res) => {
        res.render('pages/landing');
    })

    //sign up
    app.post('/sign-up', (req, res) => {
        var user = req.body;
        console.log(user);
        res.redirect('/');
    })
    
    app.use(loginAuthentication);

    //home route
    app.get('/', (req, res) => {
        req.session.views = (req.session.views || 0) + 1;
        console.log(req.session.views);
        knex('posts')
          .select()
          .then(posts => {
            res.render('pages/home', {posts});
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
        res.render('pages/create');
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
        next();
    }

};