// src/routes/ProductRoutes.js
import express from 'express';
import JwtUser from '../middleware/jwtUser.js'; 

const crudProductRoutes = (getProducts,createProduct,putProduct,deleteProduct,getProductById) => {
  const router = express.Router();
  router.use(JwtUser);
  router.get('/', getProducts);
  router.get('/detail/:id', getProductById);
  router.post('/add', createProduct);
  router.put('/update/:id',putProduct)
  router.delete('/delete/:id',deleteProduct)
  return router;
};

export default crudProductRoutes;