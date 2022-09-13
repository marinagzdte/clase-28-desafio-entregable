import passport from '../middlewares/passport.js';
import { Router } from 'express';

const loginRouter = new Router();

loginRouter.get('/login', (req, res) => {
    res.render('login')
})

loginRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), (req, res) => res.redirect('/'));

loginRouter.get('/logout', (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => res.redirect('/'))
})

loginRouter.get('/login/error', (req, res) => {
    res.render('autherror', { loginError: true })
})

export default loginRouter;