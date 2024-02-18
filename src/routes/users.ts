import { Router } from 'express'
import {Request, Response} from "express";

import * as userService from '../services/userService'

const usersRouter = Router();

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    try {
        const result = await userService.getById(id)
        return res.status(200).send(result)
    } catch (e) {
        return res.status(404).send('user not found')
    }
});

usersRouter.post('/', () => {
    // create ingredient
})

export default usersRouter
