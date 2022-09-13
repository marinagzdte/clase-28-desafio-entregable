import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from './middlewares/passport.js';
import { engine } from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './config.js';
import DbContainer from './containers/DbContainer.js';
import FirebaseMessageDao from './daos/FirebaseMessageDao.js';
import { getFiveRandomProducts } from './utils/fakerUtils.js';
import { normalizeMessages } from './utils/normalizrUtils.js';
import registerRouter from './routes/registerRouter.js';
import loginRouter from './routes/loginRouter.js';
import infoRouter from './routes/infoRouter.js';
import randomNumberRouter from './routes/randomNumberRouter.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers'

/*-----------------------------------------------*/
/*                  instances                    */
/*-----------------------------------------------*/
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productContainer = new DbContainer(config.mariaDb, 'products');
const messageContainer = new FirebaseMessageDao('messages');

/*-----------------------------------------------*/
/*                  app setup                    */
/*-----------------------------------------------*/
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: false,
        secure: false
    },
    rolling: true
}));

app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: "../public/views/layouts",
    partialsDir: "../public/views/partials"
}));
app.set('view engine', 'hbs');
app.set('views', "../public/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

app.use(registerRouter)
app.use(loginRouter)
app.use(infoRouter)
app.use(randomNumberRouter)

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect('/login');
}

/*-----------------------------------------------*/
/*                   routes                      */
/*-----------------------------------------------*/

app.get('/', checkAuth, (req, res) => {
    res.render('main', { name: req.user.name, username: req.user.username });
});

app.get('/api/test-productos', (req, res) => {
    const randomProducts = getFiveRandomProducts();
    res.render('test', { randomProducts: randomProducts });
});

/*-----------------------------------------------*/
/*               socket setup                    */
/*-----------------------------------------------*/

io.on('connection', async socket => {
    console.log('Un cliente se ha conectado.');

    const messages = await messageContainer.getAll();
    normalizeMessages(messages);

    socket.emit('products', { products: await productContainer.getAllItems() });
    socket.emit('messages', { messages: messages });

    socket.on('new-product', async data => {
        await productContainer.add(data);
        io.sockets.emit('products', { products: await productContainer.getAllItems() });
    })

    socket.on('new-chat-message', async data => {
        await messageContainer.save(data);
        const messages = await messageContainer.getAll();
        normalizeMessages(messages);
        io.sockets.emit('messages', { messages: messages })
    });
});

/*-----------------------------------------------*/
/*                 server listen                 */
/*-----------------------------------------------*/

const PORT = yargs(hideBin(process.argv)).argv.port || 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})

server.on('error', error => console.log(`Error en servidor ${error}`));
