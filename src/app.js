// Toggle menu hamburger
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
});

// Filter kategori produk
const filterButtons = document.querySelectorAll('#filter-buttons button');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove('border-b-2', 'border-black', 'font-medium');
      btn.classList.add('text-gray-500');
    });
    button.classList.add('border-b-2', 'border-black', 'font-medium');
    button.classList.remove('text-gray-500');

    productCards.forEach(card => {
      if (category === 'semua' || card.dataset.category === category) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
          const visibleCount = document.querySelectorAll('.product-card:not(.hidden)').length;
    document.getElementById('product-count').textContent = `Menampilkan ${visibleCount} Produk`;
    });
  });
});

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
// Mini cart drawer
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const cartClose = document.getElementById('cart-close');
const cartItemsEl = document.getElementById('cart-items');
const cartEmptyEl = document.getElementById('cart-empty');
const cartCountEl = document.getElementById('cart-count');

let cart = [];

function openCart() {
  cartDrawer.classList.remove('translate-x-full');
  cartOverlay.classList.remove('hidden');
}
function closeCart() {
  cartDrawer.classList.add('translate-x-full');
  cartOverlay.classList.add('hidden');
}

cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
document.getElementById('cart-btn').addEventListener('click', openCart);

function renderCart() {
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="text-sm text-gray-400">Keranjang masih kosong.</p>';
    cartCountEl.textContent = '0';
    return;
  }

  let totalQty = 0;

  cart.forEach((item, index) => {
    totalQty += item.qty;

    const row = document.createElement('div');
    row.className = 'flex gap-3 items-center';
    row.innerHTML = `
      <img src="${item.img}" class="w-14 h-16 object-cover">
      <div class="flex-1">
        <p class="text-sm font-medium">${item.name}</p>
        <p class="text-xs text-gray-500 mb-1">${item.price}</p>
        <div class="flex items-center gap-2">
          <button class="qty-btn w-6 h-6 border border-gray-300 text-xs" data-index="${index}" data-action="dec">-</button>
          <span class="text-xs">${item.qty}</span>
          <button class="qty-btn w-6 h-6 border border-gray-300 text-xs" data-index="${index}" data-action="inc">+</button>
          <button class="remove-btn text-xs text-gray-400 hover:text-black ml-2" data-index="${index}">Hapus</button>
        </div>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  cartCountEl.textContent = totalQty;

  cartItemsEl.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.index);
      if (btn.dataset.action === 'inc') cart[i].qty++;
      else {
        cart[i].qty--;
        if (cart[i].qty <= 0) cart.splice(i, 1);
      }
      renderCart();
    });
  });

  cartItemsEl.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(parseInt(btn.dataset.index), 1);
      renderCart();
    });
  });
}

document.querySelectorAll('.product-card').forEach(card => {
  card.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === 'Beli') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('p').textContent;
        const img = card.querySelector('img').src;

        const existing = cart.find(item => item.name === name);
        if (existing) {
          existing.qty++;
        } else {
          cart.push({ name, price, img, qty: 1 });
        }

        renderCart();
        openCart();
      });
    }
  });
});

// Navbar mengecil pas scroll
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('py-2');
    navbar.classList.remove('py-5');
  } else {
    navbar.classList.add('py-5');
    navbar.classList.remove('py-2');
  }
});

// Size & color selector jadi bisa dipilih
document.querySelectorAll('.product-card').forEach(card => {
  // Size buttons
  const sizeButtons = card.querySelectorAll('.flex.gap-1\\.5.mb-2 button');
  sizeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      sizeButtons.forEach(b => b.classList.remove('bg-black', 'text-white', 'border-black'));
      btn.classList.add('bg-black', 'text-white', 'border-black');
    });
  });

  // Color swatches
  const colorButtons = card.querySelectorAll('.flex.gap-1\\.5.mt-2.mb-2 button');
  colorButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      colorButtons.forEach(b => b.classList.remove('ring-2', 'ring-offset-2', 'ring-black'));
      btn.classList.add('ring-2', 'ring-offset-2', 'ring-black');

      const newSrc = btn.dataset.img;
    if (newSrc) card.querySelector('.product-img').src = newSrc;
    });
  });
});

// Wishlist toggle
document.querySelectorAll('[aria-label="Wishlist"]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const active = btn.classList.toggle('text-red-500');
    btn.textContent = active ? '♥' : '♡';
  });
});

// Detail produk (sementara, sebelum ada halaman detail beneran)
document.querySelectorAll('.product-card').forEach(card => {
  card.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.trim() === 'Detail') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = card.querySelector('h3').textContent;
        alert(`Halaman detail untuk "${name}" akan tersedia setelah fitur backend (PHP/Laravel) dipelajari.`);
      });
    }
  });
});

// Checkout (sementara)
document.querySelector('#cart-drawer button.w-full').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang kamu masih kosong.');
  } else {
    alert('Fitur checkout & pembayaran akan tersedia setelah materi Laravel.');
  }
});

// Search
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => {
  searchOverlay.classList.remove('hidden');
  searchInput.focus();
  document.getElementById('results-bar').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
searchClose.addEventListener('click', () => {
  searchOverlay.classList.add('hidden');
  searchInput.value = '';
  productCards.forEach(card => card.classList.remove('hidden'));
});

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  productCards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    card.classList.toggle('hidden', !name.includes(keyword));
  });
});

// Sort produk
document.getElementById('sort-select').addEventListener('change', (e) => {
  const grid = document.getElementById('grid-produk');
  const cards = Array.from(grid.querySelectorAll('.product-card'));
  const value = e.target.value;

  const getPrice = (card) => parseInt(card.querySelector('p').textContent.replace(/\D/g, ''));
  const getName = (card) => card.querySelector('h3').textContent;

  if (value.includes('Rendah ke Tinggi')) cards.sort((a, b) => getPrice(a) - getPrice(b));
  else if (value.includes('Tinggi ke Rendah')) cards.sort((a, b) => getPrice(b) - getPrice(a));
  else if (value.includes('A-Z')) cards.sort((a, b) => getName(a).localeCompare(getName(b)));

  cards.forEach(card => grid.appendChild(card));
});