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
    createProduct: async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Thiếu tên hoặc giá sản phẩm" });
    }

    const results = await productModel.create(name, price, description);

    res.status(201).json({
      id: results.id,
      name,
      price,
      description,
      message: "Thêm sản phẩm thành công"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},
   putProduct: async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Thiếu tên hoặc giá sản phẩm" });
    }
    const result = await productModel.put(id, name, parseFloat(price), description);

    res.status(200).json({
      message: "Cập nhật sản phẩm thành công",
      id,
      name,
      price: parseFloat(price),
      description
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

    deleteProduct : async (req,res) => {
      try{
        const {id} = req.params;
        console.log("Delete Product ID:", id);
        const resutles = await productModel.delete(id);
        res.status(200).json({
          message : resutles.message,
          affectedRows : resutles.affectedRows
        });
      }catch (err) {
        res.status(500).json({ message: err.message });   
      }
    },
    getProductById: async (req,res) => {
  try {
    const { id } = req.params;
    const product = await productModel.getById(id);
    if (!product) return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
    
    };
  };
