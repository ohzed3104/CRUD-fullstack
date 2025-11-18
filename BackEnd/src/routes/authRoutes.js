import express from 'express';
import JwtUser from '../middleware/jwtUser.js'; 

const crRoutes = (login,register,getAccount) => {
    const router = express.Router();
    router.use(JwtUser);
    router.post('/login',login);
    router.post('/register',register);
    router.get('/refresh', getAccount);
    
    return router;
}
export default crRoutes;