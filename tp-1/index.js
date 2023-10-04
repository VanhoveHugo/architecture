const express           = require('express');
const app               = express();
const session           = require('express-session');
const flash             = require('express-flash');
const cors              = require('cors');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash())
app.use(cors())


app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

const routes = require('./controllers/routes')
app.use('/', routes);

app.listen(3000);