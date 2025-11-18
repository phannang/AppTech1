const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Laptop Gaming X15 Pro",
    price: 32500000,
    imageUrl: "https://placehold.co/600x800/0f766e/ffffff?text=Laptop+Gaming",
    description: "Chip Core i9, RAM 32GB, Card RTX 4070. Màn hình 240Hz.",
    category: "Laptop"
  },
  {
    id: 2,
    name: "Điện Thoại Flagship S25 Ultra",
    price: 24990000,
    imageUrl: "https://placehold.co/600x800/3b82f6/ffffff?text=Phone+S25",
    description: "Camera 200MP, Màn hình Dynamic AMOLED, Pin 5000mAh. Hỗ trợ 5G.",
    category: "Điện Thoại"
  },
  {
    id: 3,
    name: "Màn Hình Cong 34 inch UltraWide",
    price: 9500000,
    imageUrl: "https://placehold.co/600x800/a855f7/ffffff?text=Monitor+34",
    description: "Độ phân giải 2K, Tấm nền VA, Tần số quét 144Hz. Hỗ trợ HDR.",
    category: "Màn Hình"
  },
  {
    id: 4,
    name: "Tai Nghe Không Dây Noise Cancelling",
    price: 3590000,
    imageUrl: "https://placehold.co/600x800/f59e0b/ffffff?text=Headphone+ANC",
    description: "Chống ồn chủ động, Thời lượng pin 30 giờ, Âm thanh Hi-Res.",
    category: "Phụ Kiện"
  }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

//
// *** ĐÂY LÀ ROUTE MỚI ĐÃ THÊM VÀO ***
//
// --- API TẠO SẢN PHẨM MỚI (POST /api/products) ---
app.post('/api/products', (req, res) => {
  try {
    // 1. Lấy dữ liệu sản phẩm mới từ Postman (hoặc Flutter)
    // (Đảm bảo các trường này khớp với JSON bạn gửi)
    const { name, description, price, imageUrl, category } = req.body;

    // 2. (Nên có) Kiểm tra dữ liệu cơ bản
    if (!name || !price) {
      return res.status(400).json({ message: "Tên và giá sản phẩm là bắt buộc" });
    }

    // 3. Tạo ID mới cho sản phẩm (vì chúng ta đang dùng mảng)
    // Tìm ID lớn nhất hiện tại và cộng thêm 1
    const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
    const newId = maxId + 1;

    // 4. Tạo đối tượng sản phẩm mới
    const newProduct = {
      id: newId,
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      category: category
    };

    // 5. Thêm sản phẩm mới vào mảng (sau này sẽ là thêm vào database)
    products.push(newProduct);

    console.log('Sản phẩm mới đã được thêm:', newProduct);

    // 6. Trả về thành công (status 201 = Created) và gửi lại sản phẩm đã tạo
    res.status(201).json(newProduct);

  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    res.status(500).json({ message: "Lỗi server khi thêm sản phẩm" });
  }
});
//
// *** KẾT THÚC ROUTE MỚI ***
//


// --- API ĐĂNG KÝ MỚI (POST /api/register) ---
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đủ email và mật khẩu" });
    }

    // 2. Kiểm tra email đã tồn tại chưa
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email này đã tồn tại" });
    }

    // 3. Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10); // Băm mật khẩu

    // 4. Lưu user mới (vào mảng, sau này là DB)
    const newUser = { email, password: hashedPassword };
    users.push(newUser);

    console.log('User đã đăng ký:', newUser);
    console.log('Tất cả Users:', users);

    // 5. Trả về thành công
    res.status(201).json({ message: "Đăng ký thành công" });

  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// --- API ĐĂNG NHẬP MỚI (POST /api/login) ---
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra email và password
    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập đủ email và mật khẩu" });
    }

    // 2. Tìm user trong mảng
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu sai" });
    }

    // 3. So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email hoặc mật khẩu sai" });
    }

    // 4. Tạo Token (JWT)
    const token = jwt.sign(
      { email: user.email }, // Dữ liệu chứa trong token
      JWT_SECRET, // Khóa bí mật
      { expiresIn: '1h' } // Hết hạn sau 1 giờ
    );

    // 5. Trả về token cho client (Flutter)
    res.status(200).json({ token: token });

  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});


// --- KHỞI ĐỘNG SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});