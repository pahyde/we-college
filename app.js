const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

require('./config/session.js')(app);
require('./routes/index.js')(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => console.log(`app listening on port ${PORT}...`));
