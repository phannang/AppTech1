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
    imageUrl: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/a/s/asusus_1.png",
    description: "Chip Core i9, RAM 32GB, Card RTX 4070. Màn hình 240Hz.",
    category: "Laptop"
  },
  {
    id: 2,
    name: "Điện Thoại Flagship S25 Ultra",
    price: 24990000,
    imageUrl: "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m5cmq5mx7igmd6.webp",
    description: "Camera 200MP, Màn hình Dynamic AMOLED, Pin 5000mAh. Hỗ trợ 5G.",
    category: "Điện Thoại"
  },
  {
    id: 3,
    name: "Màn Hình Cong 34 inch UltraWide",
    price: 9500000,
    imageUrl: "http://idcsaigon.com/Image/Picture/Product/Man%20hinh%20LG/34%20inch/34WP65C/LG34WP65C-B_2-01.png",
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

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API đang chạy tại http://localhost:${PORT}`);
});
