import express from 'express';
import JwtUser from '../middleware/jwtUser.js';
import { jwtMess } from '../middleware/jwtMess.js';

export const MessageRoutes = (sendDirectMess) => {
    const router = express.Router();

    router.use(JwtUser);
    router.use(jwtMess);

    router.post('/direct', sendDirectMess);

    return router;
};