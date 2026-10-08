# Tugas Rutin 3 — Katalog Produk Responsif

## Identitas

- **Nama:** Rahmat Hamonangan Nasution
- **NIM:** 4253250053
- **Kelas:** PSIK 25B
- **Mata Kuliah:** Pemrograman Web
- **Pertemuan:** 3

## Deskripsi

Tugas Rutin 3 merupakan project pembuatan katalog produk fashion berbasis web dengan desain responsif dan konsep mobile-first.

Project ini dibuat dengan tampilan minimalis menggunakan Tailwind CSS dan Vite. Website menampilkan berbagai produk fashion yang dapat difilter berdasarkan kategori, dicari berdasarkan nama produk, diurutkan berdasarkan harga atau nama, serta dilengkapi dengan fitur interaktif seperti mini cart, pemilihan ukuran dan warna, wishlist, dan responsive navigation.

## Teknologi

- HTML5
- Tailwind CSS
- JavaScript Vanilla
- Vite

## Fitur Utama

### 1. Responsive Navbar

Navbar menyesuaikan ukuran layar.

Pada desktop tersedia menu:

- Pria
- Wanita
- Semua

Sedangkan pada perangkat mobile digunakan hamburger menu.

Navbar juga memiliki efek perubahan ukuran ketika halaman di-scroll.

### 2. Hero Section

Halaman memiliki hero section dengan:

- Video background
- Overlay
- Judul "New Arrivals"
- Tombol "Belanja Sekarang"

Hero section dibuat untuk memberikan tampilan utama yang menarik ketika website pertama kali dibuka.

### 3. Filter Kategori Produk

Produk dapat difilter berdasarkan kategori:

- Semua
- Pria
- Wanita

Filter dilakukan menggunakan JavaScript tanpa perlu memuat ulang halaman.

### 4. Grid Produk Responsif

Produk ditampilkan menggunakan grid yang menyesuaikan ukuran layar.

Layout yang digunakan:

- Mobile: 1 kolom
- Tablet: 2 kolom
- Desktop: 3 kolom
- Large screen: 4 kolom

Setiap produk menampilkan:

- Gambar produk
- Nama produk
- Harga
- Pilihan warna
- Pilihan ukuran
- Tombol Beli
- Tombol Detail
- Wishlist

### 5. Product Color Selector

Setiap produk memiliki pilihan warna.

Ketika warna dipilih, gambar produk akan berubah sesuai dengan warna yang dipilih.

Contohnya:

```javascript
const newSrc = btn.dataset.img;

if (newSrc) {
    card.querySelector('.product-img').src = newSrc;
}
```

### 6. Size Selector

Produk memiliki pilihan ukuran:

- S
- M
- L
- XL

Ukuran yang dipilih akan diberikan tampilan aktif menggunakan JavaScript.

### 7. Mini Cart

Website memiliki fitur mini cart berbentuk drawer yang muncul dari sisi kanan layar.

Fitur keranjang meliputi:

- Menambahkan produk
- Menampilkan jumlah produk
- Menambah quantity
- Mengurangi quantity
- Menghapus produk
- Menampilkan jumlah item pada icon keranjang

Data keranjang dikelola menggunakan JavaScript.

```javascript
let cart = [];
```

### 8. Wishlist

Setiap produk memiliki tombol wishlist.

Ketika tombol wishlist ditekan, icon akan berubah dari:

```text
♡
```

menjadi:

```text
♥
```

### 9. Search Produk

Website memiliki fitur pencarian produk.

Pengguna dapat mengetik nama produk dan daftar produk akan difilter secara langsung berdasarkan keyword.

```javascript
const keyword = searchInput.value.toLowerCase();

productCards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.classList.toggle('hidden', !name.includes(keyword));
});
```

### 10. Sorting Produk

Produk dapat diurutkan menggunakan pilihan:

- Terbaru
- Harga rendah ke tinggi
- Harga tinggi ke rendah
- Nama A-Z

Sorting dilakukan menggunakan JavaScript.

```javascript
if (value.includes('Rendah ke Tinggi')) {
    cards.sort((a, b) => getPrice(a) - getPrice(b));
} else if (value.includes('Tinggi ke Rendah')) {
    cards.sort((a, b) => getPrice(b) - getPrice(a));
} else if (value.includes('A-Z')) {
    cards.sort((a, b) => getName(a).localeCompare(getName(b)));
}
```

### 11. Scroll Reveal Animation

Kartu produk memiliki animasi ketika muncul pada area viewport.

Animasi menggunakan `IntersectionObserver` untuk mendeteksi ketika elemen mulai terlihat.

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });
```

### 12. Promotional Banner

Di antara daftar produk terdapat beberapa promotional banner dengan gambar/video dan teks promosi.

Banner digunakan untuk membuat katalog lebih menarik dan memberikan variasi pada tampilan grid produk.

### 13. Detail Produk

Tombol Detail tersedia pada setiap produk.

Pada versi tugas ini, tombol Detail masih berupa fitur sementara dan menampilkan informasi bahwa halaman detail akan dikembangkan setelah mempelajari backend seperti PHP/Laravel.

### 14. Checkout

Mini cart memiliki tombol Checkout.

Pada versi tugas ini, checkout masih berupa fitur sementara dan memberikan informasi bahwa fitur checkout dan pembayaran akan dikembangkan pada materi backend berikutnya.

## Responsive Breakpoint

| Device | Ukuran | Layout |
|---|---:|---|
| Mobile | < 640px | 1 kolom produk |
| Tablet | 640px – 1024px | 2 kolom produk |
| Desktop | 1024px – 1280px | 3 kolom produk |
| Large Screen | > 1280px | 4 kolom produk |

## Struktur Project

```text
TugasWeb-Pertemuan3-Katalog/
├── public/
│   ├── images/
│   │   └── products/
│   ├── videos/
│   └── ...
├── src/
│   ├── app.js
│   ├── main.js
│   ├── style.css
│   └── ...
├── screenshots/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Package yang Digunakan

Project menggunakan Vite sebagai build tool dan Tailwind CSS untuk styling.

Dependencies utama:

```json
{
    "@tailwindcss/vite": "^4.3.3",
    "tailwindcss": "^4.3.3"
}
```

Development dependency:

```json
{
    "vite": "^8.2.2"
}
```

## Cara Menjalankan Project

Pastikan Node.js dan npm sudah terinstall.

### 1. Clone Repository

```bash
git clone https://github.com/rhmtnst/TugasWeb-Pertemuan3-Katalog.git
```

### 2. Masuk ke Folder Project

```bash
cd TugasWeb-Pertemuan3-Katalog
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Jalankan Development Server

```bash
npm run dev
```

### 5. Buka di Browser

Setelah server berjalan, buka alamat yang diberikan oleh Vite, biasanya:

```text
http://localhost:5173
```

## Testing Responsivitas

Pengujian responsivitas dapat dilakukan menggunakan Chrome DevTools dengan Device Mode.

Beberapa ukuran yang digunakan:

### Mobile

```text
480px
```

### Tablet

```text
768px
```

### Desktop

```text
1280px
```

Pengujian dilakukan untuk memastikan grid produk, navbar, menu hamburger, dan elemen lainnya dapat menyesuaikan ukuran layar.

## Pengembangan dari Tugas Rutin Sebelumnya

Pada Tugas Rutin 3, project dikembangkan dari halaman web sebelumnya menjadi katalog produk yang lebih interaktif.

Pengembangan yang diterapkan meliputi:

- Penggunaan Tailwind CSS
- Penggunaan Vite
- Responsive product grid
- Filter kategori
- Search produk
- Sorting produk
- Mini cart
- Quantity control
- Size selector
- Color selector
- Wishlist
- Scroll reveal animation
- Responsive navbar
- Hero section dengan video
- Promotional banner

## Catatan

Beberapa fitur seperti halaman detail produk dan sistem checkout masih berupa simulasi frontend. Fitur tersebut direncanakan untuk dikembangkan lebih lanjut setelah mempelajari teknologi backend seperti PHP dan Laravel.

## Repository

GitHub:

https://github.com/rhmtnst/TugasWeb-Pertemuan3-Katalog

