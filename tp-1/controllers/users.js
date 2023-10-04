const Datastore = require("nedb")
const db = new Datastore({filename: __dirname + "/../data/user", autoload: true})
const bcrypt = require("bcrypt")

module.exports = router => {
    router.get('/', (req, res) => {
        console.log(req.flash);
        res.render('index', { user: req.user, logs: req.flash('message') });
    })

    router.get('/login', (req, res) => {
        res.render('login', { logs: req.flash('message') });
    }).post('/login', (req, res) => {
        db.findOne({
            login: req.body.login
        }, (err, doc) => {
            if (doc && bcrypt.compareSync(req.body.password, doc.password)) {
                req.session.user = doc;
                req.flash("message", "Vous êtes connecté")
                console.log(req.flash('message'));
                res.redirect("/")
            } else {
                req.flash("message", "Votre login ou mot de passe est incorrect")
                res.redirect("/login")
            }
        })
    })

    router.get('/register', (req, res) => {
        res.render('register', { logs: req.flash('message') });
    }).post('/register', (req, res) => {
        db.findOne({
            login: req.body.login,
            password: req.body.password
        }, (err, doc) => {
            if (!doc) {
                if(!req.body.login || !req.body.password) {
                    req.flash("message", "Veuillez remplir tous les champs")
                    return res.redirect("/register")
                } 
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                db.insert(req.body, (err) => {
                    req.flash("message", "Vous êtes inscrit")
                    res.redirect(err ? "/register" : "/login")
                })
                return
            }
            req.flash("message", "Ce login existe déjà")
            res.redirect("/login")
        })
    })
    
    router.post('/logout', (req, res) => {
        delete req.session.user;
        req.flash("message", "Vous êtes déconnecté")
        res.redirect("/")
    })
}