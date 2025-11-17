import express from 'express';

const crRoutes = (login,register) => {
    const router = express.Router();
    router.post('/login',login);
    router.post('/register',register);
    
    return router;
}
export default crRoutes;