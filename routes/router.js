const router = require('express').Router();
const passport = require('passport');
const { getIndex, getLogin, getSignup, postLogin, postSignup, getFailLogin, getFailSignup, getLogout, failRoute } = require('../controllers/controller');
const { sendEmail, sendEmailCart } = require ('../controllers/sendmail');
const checkAuthentication = require('../middlewares/auth');
const logger = require ('../logguer/logguer');
const { productShow, productCreate, renderProduct } = require ('../controllers/productsDb');
const { info, infoZip, random, addToCart, deleteCart, removeCart, cart } = require ('../controllers/controlsOptional');



// Index
router.get('/', checkAuthentication, getIndex);

// Login
router.get('/login', getLogin);
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), postLogin);
router.get('/faillogin', getFailLogin);

// Signup
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), sendEmail, postSignup);
router.get('/failsignup', getFailSignup);

// Redirect to login & signup
router.post('/redirect-signup', (req, res) => res.redirect('/signup'));
router.post('/redirect-login', (req, res) => res.redirect('/login'));

// Logout
router.post('/logout', getLogout);

// Info
router.get('/info', info);

router.get('/infozip',infoZip );

// Api randoms
router.get('/api/randoms', random);

///////////////////-------------------CREACION PRODUCTOS------------------------------//////////////////

router.get('/product', productShow);
router.get('/product-create', renderProduct);
router.post('/create-product', productCreate);


///////////////////-------------------CART------------------------------//////////////////


router.get('/cart/add-to-cart/:id',  addToCart);

router.get('/cart/reduce/:id', deleteCart);

router.get('/cart/remove/:id', removeCart );

router.get('/cart', cart );


///////////////////-------------------checkout------------------------------//////////////////

router.get('/checkout', (req, res) => {res.render('partials/checkout.handlebars');});

router.post('/checkout', sendEmailCart);

// Fail route
router.get('*', failRoute);



module.exports = router;