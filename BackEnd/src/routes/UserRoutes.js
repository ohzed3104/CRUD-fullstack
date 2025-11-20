import express from 'express';
import JwtUser from '../middleware/jwtUser.js'; 
import { jwtRole } from '../middleware/jwtRole.js';
const crudUserRoutes = (getUsers, createUsers, putUsers, deleteUsers) => {
    const router = express.Router();
    router.use(JwtUser);
    // router.put('/update/:id',putUsers);
    router.use(jwtRole(['admin']));
    router.get('/',getUsers);
// router.post('/register',createUsers);
 router.delete('/delete/:id',deleteUsers);
    
    return router;
};
export default crudUserRoutes;