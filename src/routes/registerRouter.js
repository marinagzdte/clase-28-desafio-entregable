import passport from '../middlewares/passport.js';
import { Router } from 'express';

const registerRouter = new Router();

registerRouter.get('/register', (req, res) => {
    res.render('register');
})

registerRouter.post('/register', passport.authenticate('register', { failureRedirect: '/register/error' }), (req, res) => { res.redirect('/login') });

registerRouter.get('/register/error', (req, res) => {
    res.render('autherror', { registerError: true })
})

export default registerRouter;