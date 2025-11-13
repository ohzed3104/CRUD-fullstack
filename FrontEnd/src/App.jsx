import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Danh Sách Sản Phẩm</h1>
        <p className="subtitle">Quản lý sản phẩm từ Node.js API</p>
      </header>

      <div className="table-container">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>Chưa có sản phẩm nào</p>
          </div>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá</th>
                <th>Mô Tả</th>
                
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="table-row">
                  <td className="id-cell">#{product.id}</td>
                  <td className="name-cell">{product.name}</td>
                  <td className="price-cell">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </td>
                  <td className="desc-cell">
                    {product.description || <em>Không có mô tả</em>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="footer">
        <p>© 2025 Node.js + React CRUD</p>
      </footer>
    </div>
  );
}

export default App;