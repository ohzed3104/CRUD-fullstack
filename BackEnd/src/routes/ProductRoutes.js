// src/routes/ProductRoutes.js
import express from 'express';

const crudProductRoutes = (getProducts,createProduct,putProduct,deleteProduct) => {
  const router = express.Router();
  router.get('/', getProducts);
  router.post('/add', createProduct);
  router.put('/update/:id',putProduct)
  router.delete('/delete/:id',deleteProduct)
  return router;
};

export default crudProductRoutes;