// src/controllers/ProductControllers.js
let productModel = null;

// Khởi tạo controller với model
export const initProductController = (model) => {
  productModel = model;

  return {
    getProducts: async (req, res) => {
      try {
        const products = await productModel.getALL();
        res.json(products);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    createProduct : async (req,res) => {
      try {
        const { name , price , description} = req.body;
        if (!name || !price ){
          return res.status(400).json({ message: "Thiếu tên hoặc giá sản phẩm" });    
        }
        const results = await productModel.create(name ,price , description);
        res.status(201).json({
          message : results.message,
          productId: results.insertId
        });
      }catch (err) {
        res.status(500).json({ message: err.message });
      }
    },
    putProduct : async (req,res) => {
      try {
        const {id} =req.params;
        const {name ,price,description} = req.body;
        if(!name||!price){
          return res.status(400).json({message : "Thiếu tên hoặc giá sản phẩm"});
        }
        const results = await productModel.put(id,name,price,description);
        res.status(200).json({
          message : results.message,
          affectedRows : results.affectedRows
        });
      }catch (err) {
        res.status(500).json({ message: err.message }); 
        }
    },
    deleteProduct : async (req,res) => {
      try{
        const {id} = req.params;
        const resutles = await productModel.delete(id);
        res.status(200).json({
          message : resutles.message,
          affectedRows : resutles.affectedRows
        });
      }catch (err) {
        res.status(500).json({ message: err.message });   
      }
    }
    
    };
  };
