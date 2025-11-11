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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});