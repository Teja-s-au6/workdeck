const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const methodOverride = require('method-override');
dotenv.config()
const hbs  = require("hbs");
const path = require("path");
require('./db');
require("./utils/hbs");

const PORT = process.env.PORT || 1234

const employeeApiRoutes= require('./routes/apiRoutes/employeeApiRoutes');
const employeeNormalRoutes = require('./routes/normalRoutes/employeeNormalRoutes');
const companyApiRoutes = require('./routes/apiRoutes/companyApiRoute');
const companyNormalRoutes = require('./routes/normalRoutes/companyNormalRoute');

const app = express()

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');

app.set('view options', { layout: 'main' });

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(
    session({
        name: 'Session1',
        resave: false,
        saveUninitialized: false,
        secret: 'Tejas',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60,
            sameSite: 'strict'
        }
    })
);

app.use(employeeApiRoutes);
app.use(employeeNormalRoutes);
app.use(companyApiRoutes);
app.use(companyNormalRoutes);

app.get('/', function (req, res) {
    res.render('index', {
        title: "Home page",
        userId: req.session.userId
    })
})

app.listen(PORT)