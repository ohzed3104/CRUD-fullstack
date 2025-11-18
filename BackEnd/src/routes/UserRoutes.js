import express from 'express';
import JwtUser from '../middleware/jwtUser.js'; 
const crudUserRoutes = (getUsers, createUsers, putUsers, deleteUsers) => {
    const router = express.Router();
    router.use(JwtUser);
router.get('/',getUsers);
// router.post('/register',createUsers);
// router.put('/update/:id',putUsers);
router.delete('/delete/:id',deleteUsers);
    return router;
};
export default crudUserRoutes;