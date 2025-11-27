// src/models/ProductModels.js
let db = null;

// Hàm khởi tạo model với db
export const initProductModel = (connection) => {
  db = connection;

  return {
    getALL: async () => {
      const [rows] = await db.query('SELECT * FROM products'); 
      return rows;
    },
    create: async (name, price, description) => {
       const  sql = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
       const [result] = await db.query(sql,[name,price,description]);
       return {
        insertId : result.insertId,
        message : "Tạo sản phẩm thành công"     
       }
    },
    put: async (id,name,price,description) =>{
      const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
      const [result] = await db.query(sql,[name,price,description,id]);
      return {
        affectedRows : result.affectedRows,
        message : "Cập nhật sản phẩm thành công"  
    }
    },
    delete: async (id) =>{
      const sql = 'DELETE FROM products WHERE id = ?';
      const [result] = await db.query(sql,[id]);
      return {
        affectedRows : result.affectedRows,
        message : "Xóa sản phẩm thành công"  
      }
    },
}
}