import express from 'express';
import JwtUser from '../middleware/jwtUser.js'; 
export const friendReqRoutes = (postFriendReq, getFriendReqs, postToFriendReq,getAllFriends) => {
    const router = express.Router();
    router.use(JwtUser);
    router.post('/send', postFriendReq);  //gui yeu cau ket ban 
    router.get('/reqfriend', getFriendReqs); //lay danh sach yeu cau ket ban
    router.post('/respond/:id', postToFriendReq); // tra loi yeu cau ket ban
    router.get('/', getAllFriends); // lay danh sach ban be
    return router;
}