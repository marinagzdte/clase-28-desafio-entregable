import { Router } from 'express';

const infoRouter = new Router();

infoRouter.get('/info', (req, res) => {
    const info = {
        os: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage().rss,
        directory: process.cwd(),
        pid: process.pid,
        path: process.execPath,
        args: process.argv
    };
    res.render('info', info);
})

export default infoRouter;