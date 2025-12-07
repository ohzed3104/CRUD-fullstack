import React, { useEffect, useState } from "react";
import { 
  Home, Package, Users, MessageSquare, Heart, LogOut, Box,
  User, Send, Bell, Store, MessageCircle, Phone, Zap, Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const HomePage = () => {
  const navigate = useNavigate();

  // STATES
  const [product, setProduct] = useState([]);
  const [popup, setPopup] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discrep, setDiscrep] = useState("");

  // Edit product popup
  const [newPopup, setNewPopup] = useState(false);
  const [IdProd, setIdProd] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDiscrep, setNewDiscrep] = useState("");

  // HANDLE EDIT
  const handleEdit = (id) => {
    setIdProd(id);
    setNewPopup(true);
    document.body.classList.add("overflow-hidden");
  };

  // Fetch product details for editing
  useEffect(() => {
    if (!IdProd) return;

    const getProductDetails = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`http://localhost:3000/api/products/detail/${IdProd}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const product = res.data;
        setNewName(product.name);
        setNewPrice(product.price);
        setNewDiscrep(product.description);
      } catch (error) {
        console.error("Fetch product details error:", error);
      }
    };

    getProductDetails();
  }, [IdProd]);

  // UPDATE PRODUCT
  const fecthEdit = async () => {
    try {
      const payload = {
        name: newName,
        price: parseFloat(newPrice),
        description: newDiscrep
      };
      const token = localStorage.getItem("access_token");
      const res = await axios.put(
        `http://localhost:3000/api/products/update/${IdProd}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProduct((prev) =>
        prev.map((item) => (item.id === IdProd ? { ...item, ...res.data } : item))
      );

      alert("Cập nhật sản phẩm thành công");
      setNewPopup(false);
    } catch (error) {
      console.error("Update product error:", error);
    }
  };

  // ADD PRODUCT
  const addProduct = async () => {
    try {
      const payload = { name, price: parseFloat(price), description: discrep };
      const token = localStorage.getItem("access_token");
      const res = await axios.post("http://localhost:3000/api/products/add", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const newProduct = res.data;
      setProduct([...product, newProduct]);
      alert("Thêm sản phẩm thành công");
      setPopup(false);
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:3000/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProduct((prev) => prev.filter((p) => p.id !== id));
      alert("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Delete product error:", error);
    }
  };

  // HANDLE BODY OVERFLOW FOR POPUP
  useEffect(() => {
    if (popup || newPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [popup, newPopup]);

  // FETCH PRODUCTS ON PAGE LOAD
  useEffect(() => {
    const handleProduct = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:3000/api/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(res.data ?? []);
      } catch (err) {
        console.error("Fetch products error:", err);
      }
    };
    handleProduct();
  }, []);

  return (
    <>
      {/* HEADER */}
      <div className="w-full min-h-12 md:min-h-20 lg:min-h-17 flex justify-between items-center px-90 border-b border-gray-300 overflow-hidden">
        <div className="flex items-center font-bold">
          <Store className="w-10 h-8" /> Old Store
        </div>
        <nav className="space-x-6 flex items-center">
          <a>San Pham</a>
          <div className="flex items-center">
            <MessageCircle className="w-10 h-6 px-2" /> chat
          </div>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white cursor-pointer font-semibold rounded-md px-5 py-2 text-md"
          >
            Dang nhap
          </button>
        </nav>
      </div>

      {/* HERO SECTION */}
      <div className="bg-gray-50 py-12 md:py-16 lg:py-20 border-b border-gray-50">
        <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-10 xl:gap-16">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block bg-yellow-200 text-yellow-800 text-xs md:text-sm font-semibold px-3 py-1 rounded-full mb-3">
              Mới & Độc quyền
            </span>
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight mt-2">
              Mua sắm thông minh với <span className="text-green-600">Chat trực tiếp</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Khám phá các sản phẩm công nghệ chất lượng cao. Chat với người bán để nhận tư vấn miễn phí.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
                Mua sắm ngay
              </button>
              <button className="px-6 py-3 bg-white hover:bg-gray-50 text-green-700 font-medium rounded-lg border border-green-600 shadow-md hover:shadow-lg transition">
                Chat ngay
              </button>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0 flex justify-center">
            <div className="bg-linear-to-br from-blue-400 to-cyan-500 rounded-2xl shadow-xl w-full max-w-md h-64 md:h-80 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
              Hình sản phẩm
            </div>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="py-10 md:py-14 lg:py-18 text-center border-b border-gray-100">
        <h3 className="font-bold text-3xl">Tại sao chọn OldShop?</h3>
        <div className="py-12 flex items-center justify-center space-x-4">
          <div className="flex flex-col space-y-1 items-center">
            <Zap className="text-blue-400 bg-blue-100 rounded-md p-3 w-13 h-13" />
            <span className="text-center font-bold">Giao hàng nhanh</span>
            <h1 className="mt-2">Giao hàng trong 24 giờ đến toàn bộ thành phố</h1>
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <MessageCircle className="text-purple-400 bg-purple-100 rounded-md p-3 w-13 h-13" />
            <span className="text-center font-bold">Chat tức thời</span>
            <h1 className="mt-2">Hỗ trợ 24/7 từ những người bán hàng chuyên nghiệp</h1>
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <Shield className="text-green-400 bg-green-100 rounded-md p-3 w-13 h-13" />
            <span className="text-center font-bold">An toàn đảm bảo</span>
            <h1 className="mt-2">Thanh toán bảo mật và bảo hành chất lượng</h1>
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <Phone className="text-orange-400 bg-orange-100 rounded-md p-3 w-13 h-13" />
            <span className="text-center font-bold">Hỗ trợ tuyệt vời</span>
            <h1 className="mt-2">Đội ngũ chuyên viên sẵn sàng giúp bạn</h1>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow">
              <img
                src="https://cdn2.fptshop.com.vn/unsafe/800x0/hinh_nen_galaxy_4_8b4fbbb293.jpg"
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="font-semibold text-lg mt-4">{item.name}</h3>
              <p className="text-gray-600 mt-2">{item.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-green-600">${item.price}</span>
                <button onClick={() => handleEdit(item.id)}>chinh sua</button>
                <button onClick={() => deleteProduct(item.id)}>xoa</button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
                  Mua ngay
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition">
            <button
              onClick={() => setPopup(true)}
              className="bg-red-500 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>

      {/* ADD PRODUCT POPUP */}
      {popup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Thêm sản phẩm mới
            </h3>
            <p className="text-gray-500 text-center mb-6">
              Điền thông tin sản phẩm bên dưới
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Giá sản phẩm</label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  placeholder="Nhập giá sản phẩm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setDiscrep(e.target.value)}
                  value={discrep}
                  placeholder="Nhập mô tả sản phẩm"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPopup(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button
                onClick={addProduct}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT POPUP */}
      {newPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">Sửa sản phẩm</h3>
            <p className="text-gray-500 text-center mb-6">
              Điền thông tin sản phẩm bên dưới
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Tên sản phẩm</label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNewName(e.target.value)}
                  value={newName}
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Giá sản phẩm</label>
                <input
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNewPrice(e.target.value)}
                  value={newPrice}
                  placeholder="Nhập giá sản phẩm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setNewDiscrep(e.target.value)}
                  value={newDiscrep}
                  placeholder="Nhập mô tả sản phẩm"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setNewPopup(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Hủy
              </button>
              <button
                onClick={fecthEdit}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition"
              >
                Sửa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
