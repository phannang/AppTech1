const express = require('express');
const cors = require('cors');
// const bcrypt = require('bcrypt'); // Cần uncomment nếu dùng đăng ký/đăng nhập
// const jwt = require('jsonwebtoken'); // Cần uncomment nếu dùng đăng ký/đăng nhập

const app = express();

app.use(cors());
app.use(express.json());

// Giả định dữ liệu sản phẩm (In-memory storage)
let products = [
  {
    id: 1,
    name: "Laptop Gaming X15 Pro",
    price: 32500000,
    imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/s/asusus.png",
    description: "Chip Core i9, RAM 32GB, Card RTX 4070. Màn hình 240Hz.",
    category: "Laptop"
  },
  {
    id: 2,
    name: "Điện Thoại Flagship S25 Ultra",
    price: 24990000,
    imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-utra.png",
    description: "Camera 200MP, Màn hình Dynamic AMOLED, Pin 5000mAh. Hỗ trợ 5G.",
    category: "Điện Thoại"
  },
  {
    id: 3,
    name: "Màn Hình Cong 34 inch UltraWide",
    price: 9500000,
    imageUrl: "https://product.hstatic.net/200000722513/product/c34g55-34-2k-165hz-gsync-compatible-1_fb597c946f6b495e88076b59551e2ec9_10aa4d6d8f1743a090bf9ce066a75646_grande.jpg",
    description: "Độ phân giải 2K, Tấm nền VA, Tần số quét 144Hz. Hỗ trợ HDR.",
    category: "Màn Hình"
  },
  {
    id: 4,
    name: "Tai Nghe Không Dây Noise Cancelling",
    price: 3590000,
    imageUrl: "https://product.hstatic.net/200000567141/product/wechatimg8510_2ed7da3cfb68499abf1aed026c428466_master.jpeg",
    description: "Chống ồn chủ động, Thời lượng pin 30 giờ, Âm thanh Hi-Res.",
    category: "Phụ Kiện"
  }
];

// Giả định mảng users (In-memory storage)
const users = []; 
// const JWT_SECRET = 'your_super_secret_key'; // Cần định nghĩa nếu dùng đăng nhập

// --- API LẤY TẤT CẢ SẢN PHẨM (GET /api/products) ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

// --- API TẠO SẢN PHẨM MỚI (POST /api/products) ---
app.post('/api/products', (req, res) => {
  try {
    const { name, description, price, imageUrl, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Tên và giá sản phẩm là bắt buộc" });
    }

    const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
    const newId = maxId + 1;

    const newProduct = {
      id: newId,
      name,
      description: description || '',
      price: parseInt(price), // Đảm bảo giá là số
      imageUrl: imageUrl || '',
      category: category || 'Khác'
    };

    products.push(newProduct);
    console.log('Sản phẩm mới đã được thêm:', newProduct);

    res.status(201).json(newProduct);

  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi thêm sản phẩm" });
  }
});

// --------------------------------------------------------------------------------
// --- ROUTE MỚI: API CẬP NHẬT SẢN PHẨM (PUT /api/products/:id) ---
// --------------------------------------------------------------------------------
app.put('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const updatedData = req.body;

    const index = products.findIndex(p => p.id === productId);

    if (index === -1) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Cập nhật sản phẩm
    products[index] = {
      ...products[index], // Giữ lại ID cũ và các trường không được gửi (nếu có)
      name: updatedData.name || products[index].name,
      price: updatedData.price ? parseInt(updatedData.price) : products[index].price,
      imageUrl: updatedData.imageUrl || products[index].imageUrl,
      description: updatedData.description || products[index].description,
      category: updatedData.category || products[index].category,
    };

    console.log(`Sản phẩm ID ${productId} đã được cập nhật:`, products[index]);

    res.status(200).json(products[index]);
    
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật sản phẩm" });
  }
});

// --------------------------------------------------------------------------------
// --- ROUTE MỚI: API XÓA SẢN PHẨM (DELETE /api/products/:id) ---
// --------------------------------------------------------------------------------
app.delete('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const initialLength = products.length;

    products = products.filter(p => p.id !== productId);

    if (products.length === initialLength) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại để xóa" });
    }

    console.log(`Sản phẩm ID ${productId} đã được xóa.`);

    // Trả về 204 No Content hoặc 200 OK
    res.status(200).json({ message: "Xóa sản phẩm thành công" }); 

  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi xóa sản phẩm" });
  }
});

// --- API ĐĂNG KÝ (POST /api/register) ---
// (Giữ nguyên như bạn đã cung cấp, nhưng tôi comment tạm thời các thư viện chưa dùng)
app.post('/api/register', async (req, res) => {
  // Code đăng ký...
  res.status(501).json({ message: "Route đăng ký chưa hoàn thành/cần thư viện bcrypt" });
});

// --- API ĐĂNG NHẬP (POST /api/login) ---
// (Giữ nguyên như bạn đã cung cấp, nhưng tôi comment tạm thời các thư viện chưa dùng)
app.post('/api/login', async (req, res) => {
  // Code đăng nhập...
  res.status(501).json({ message: "Route đăng nhập chưa hoàn thành/cần thư viện jwt" });
});


// --- KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});