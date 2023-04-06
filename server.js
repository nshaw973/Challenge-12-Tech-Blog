const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'I am Error',
    cookie: {
      maxAge: 720000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));


//HandleBars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashboard/js/logout.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/public/js/logout.js');
});

app.get('/dashboard/js/edit.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/public/js/edit.js');
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
