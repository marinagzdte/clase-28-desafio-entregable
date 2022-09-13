import { fork } from 'child_process'
import { Router } from 'express';

const randomNumberRouter = new Router();

randomNumberRouter.get('/randoms', (req, res) => {
    const quantity = req.query.cant || 100000000;
    const forked = fork('../src/utils/randomNumberGenerator.js')
    forked.send({ quantity: quantity })
    forked.on('message', resultado => {
        res.json({ resultado })
    })
})


export default randomNumberRouter;