import passport from 'passport';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt';
import MongoDbUsersDao from '../daos/MongoDbUsersDao.js';
const userContainer = new MongoDbUsersDao();

/*-----------------------------------------------*/
/*                 passport                      */
/*-----------------------------------------------*/

const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

const hash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use('login', new passportLocal.Strategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
        try {
            const user = await userContainer.getByCondition({ username: username });

            if (!isValidPassword(user, password)) {
                console.log('Contraseña inválida.');
                return done(null, false);
            }

            return done(null, user);
        }
        catch (error) {
            console.log(`Usuario ${username} no encontrado.`);
            return done(null, false);
        }
    }

));

passport.use('register', new passportLocal.Strategy({
    passReqToCallback: true
},
    async (req, username, password, done) => {
        try {
            const user = await userContainer.getByCondition({ username: username });
            if (user) {
                console.log(`El usuario ${username} ya existe.`);
                return done(null, false);
            }
            const newUser = {
                username: username,
                password: hash(password),
                name: req.body.name
            }
            console.log(newUser)
            await userContainer.save(newUser);
            return done(null, newUser);

        } catch (error) {
            console.log(`error en registro: ${error}`)
            return done(error);
        }
    }
))

export default passport;