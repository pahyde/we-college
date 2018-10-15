module.exports = app => {    
    const session = require('express-session');
    const KnexSessionStore = require('connect-session-knex')(session);

    const knex = require('../db/knex.js');

    const store = new KnexSessionStore({
        knex: knex,
        tablename: 'sessions' 
    });

    app.use(session({
        secret: '1gsucompsci1',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        store: store,
        resave: false,
        saveUninitialized: false
    }))
}