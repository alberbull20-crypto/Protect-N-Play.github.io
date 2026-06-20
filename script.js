const products = [
  // MEDICAL / SPORTS PROTECTION
  {
    id: 2,
    name: "Kinesiology Tape",
    category: "medical",
    price: 300,
    img: "./images/k-tape.jpg",
    desc: ""
  },
  {
    id: 4,
    name: "White Cotton fabric",
    category: "medical",
    price: 300,
    img: "./images/white-ctton.jpeg",
    desc: "White rigid strapping tape 2.5cm x 5cm"
  },
  {
    id: 5,
    name: "Zinc Oxide White Tape",
    category: "medical",
    price: 350,
    img: "./images/zinc-oxide.webp",
    desc: "Strong adhesive athletic tape"
  },
  {
    id: 6,
    name: "Ankle Support Brace",
    category: "medical",
    price: 450,
    img: "./images/ankle-support.jpeg",
    desc: "YC Support Ankle - Black/Orange"
  },
  {
    id: 7,
    name: "Smileplus Cohesive Bandage",
    category: "medical",
    price: 250,
    img: "./images/cohesive-tape.jpeg",
    desc: "Blue self-adhesive bandage"
  },
  {
    id: 8,
    name: "Blue Detectable Plasters",
    category: "medical",
    price: 300,
    img: "./images/detactable.jpeg",
    desc: "Box of 10 sterile detectable bandages"
  },
  {
    id: 9,
    name: "Elastic Bandage with Clips",
    category: "medical",
    price: 250,
    img: "./images/elastic-bandage.jpeg",
    desc: "Beige elastic bandage with metal clips"
  },
 

  // GYM EQUIPMENT

  {
    id: 14,
    name: "Wrist Support",
    category: "gym",
    price: 300,
    img: "./images/wrist-support.jpeg",
    desc: "High quality wrist support, multi directional compression, flatlock stitching technology, durable reinforced edging"
  },
  {
    id: 15,
    name: "Palm Support",
    category: "gym",
    price: 500,
    img: "./images/palm-support.jpeg",
    desc: "YC Support palm support, multi directional compression, flatlock stitching technology, durable reinforced edging"
  },
  {
    id: 10,
    name: "Gym Training Gloves",
    category: "gym",
    price: 350,
    img: "./images/t-gloves.jpg",
    desc: "Anti-slip palm with wrist support"
  },
  {
    id: 11,
    name: "Resistance Bands Set",
    category: "gym",
    price: 650,
    img: "./images/rest-band.jpg",
    desc: "5-piece set with carry bag"
  },
  {
    id: 12,
    name: "Hand Grip",
    category: "gym",
    price: 300,
    img: "./images/hand.webp",
    desc: "Simple grip strength"
  },
  {
    id: 13,
    name: "Hand Grip Strengthener",
    category: "gym",
    price: 650,
    img: "./images/hand-grip.jpg",
    desc: "Adjustable spring gripper"
  },
  {
    id: 12,
    name: "Venum Boxing Gloves",
    category: "gym",
    price: 2800,
    img: "./images/venom.jpg",
    desc: "Venum boxing gloves designed for every level, from beginner training to professional competition"
  },
  {
    id: 13,
    name: "Boxing Hand Wraps",
    category: "gym",
    price: 900,
    img: "./images/boxing-hand-wraps.jpeg",
    desc: "Resistant velcro with thumb hook for a snug and cormfortable"
  },
  {
    id: 14,
    name: "Warp Knee Brace",
    category: "gym",
    price: 1200,
    img: "./images/warp-knee-brace.jpeg",
    desc: "High quality knee brace, multi directional compression, flatlock stitching technology, durable reinforced edging"
  },

  // Optional fields you can add to any product above once you have real
  // data (the UI only renders these when present, so nothing fake shows
  // until you fill it in):
  //   rating: 4.8,            -> shows a 5-star rating row
  //   reviewCount: 23,        -> shows "(23)" next to the rating
  //   featured: true          -> shows a "Bestseller" corner badge
];

const DELIVERY_FEE = 0;

// ---- cart persistence: survives page refresh / closing the tab ----
function loadCart() {
  try {
    const stored = localStorage.getItem('pnp_cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}
function saveCart() {
  try {
    localStorage.setItem('pnp_cart', JSON.stringify(cart));
  } catch (e) {
    // storage unavailable (private mode, etc.) - cart still works for this session
  }
}
let cart = loadCart();

// ---- 3D interaction support flags ----
const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tiltEnabled = supportsHover && !prefersReducedMotion;

function renderProducts(filteredProducts) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  filteredProducts.forEach((product, index) => {
    const card = document.createElement('div');
    const categoryLabel = product.category === 'medical' ? 'Medical' : 'Gym';
    card.className = 'product-card card-enter bg-white rounded-3xl overflow-hidden shadow-md relative';
    card.style.setProperty('--i', Math.min(index, 9));
    card.innerHTML = `
      <div class="card-shine"></div>
      <div class="ribbon-3d ribbon-${product.category}">${categoryLabel}</div>
      ${featuredBadgeHTML(product)}
      <img src="${product.img}" alt="${product.name}" class="w-full h-52 sm:h-64 object-cover" loading="lazy" decoding="async">
      <div class="p-4 sm:p-5">
        <h3 class="font-semibold text-base sm:text-lg">${product.name}</h3>
        <p class="text-sm text-gray-600 mt-1">${product.desc}</p>
        ${ratingHTML(product)}
        <div class="flex justify-between items-end mt-5">
          <div class="price-tag-3d">
            <span class="price-tag-hole"></span>
            KSh ${product.price}
          </div>
          <div class="flex gap-2">
            <button onclick="addToCart(${product.id}, event)" 
                    class="btn-3d-red bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition">
              Add to Cart
            </button>
            <a href="https://wa.me/254795885916?text=I%20want%20to%20buy%20${encodeURIComponent(product.name)}" 
               target="_blank" 
               class="btn-3d-outline-sm border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2.5 sm:py-3 rounded-2xl flex items-center transition">
              <i class="fa-solid fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);

    // free the card's transform back up to the tilt handler once the
    // drop-in animation finishes, so hover-tilt isn't fighting it
    card.addEventListener('animationend', () => card.classList.remove('card-enter'), { once: true });

    if (tiltEnabled) {
      card.addEventListener('mousemove', (e) => handleCardTilt(e, card));
      card.addEventListener('mouseleave', () => resetCardTilt(card));
    }
  });
}

// ---- opt-in trust elements: render ONLY when real data is present on the
// product (see the comment above the products array) - never fabricated ----
function ratingHTML(product) {
  if (!product.rating) return '';
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= Math.round(product.rating)
      ? '<i class="fa-solid fa-star"></i>'
      : '<i class="fa-regular fa-star"></i>';
  }
  const count = product.reviewCount ? ` (${product.reviewCount})` : '';
  return `<div class="rating-3d">${stars}<span class="rating-count">${product.rating.toFixed(1)}${count}</span></div>`;
}

function featuredBadgeHTML(product) {
  return product.featured
    ? `<div class="featured-badge-3d"><i class="fa-solid fa-star"></i> Bestseller</div>`
    : '';
}

// ---- 3D tilt: product cards follow the cursor like a tilted shelf item ----
function handleCardTilt(e, card) {
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;
  const rotateY = (px - 0.5) * 16;
  const rotateX = (0.5 - py) * 16;

  card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
  card.style.boxShadow = `${-rotateY * 2}px ${(-rotateX * 2) + 26}px 40px -14px rgba(15, 23, 42, 0.4)`;
  card.style.setProperty('--mx', `${px * 100}%`);
  card.style.setProperty('--my', `${py * 100}%`);
}

function resetCardTilt(card) {
  card.style.transform = '';
  card.style.boxShadow = '';
}

function filterCategory(category) {
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-category="${category}"]`)?.classList.add('active');
  document.querySelectorAll('.category-btn-mobile').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.category-btn-mobile[data-category="${category}"]`)?.classList.add('active');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function addToCart(id, evt) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  showToast(`${product.name} added to cart`);
  if (evt) flyToCart(evt.currentTarget);
}

// ---- 3D "fly to cart": the product thumbnail arcs into the cart icon,
// shrinking and spinning into the distance, then the cart icon catches it ----
function flyToCart(button) {
  if (prefersReducedMotion) return;

  const card = button.closest('.product-card');
  const img = card?.querySelector('img');
  const cartIcon = document.getElementById('cartCount')?.closest('a');
  if (!img || !cartIcon) return;

  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  const clone = img.cloneNode(true);
  clone.style.position = 'fixed';
  clone.style.left = `${imgRect.left}px`;
  clone.style.top = `${imgRect.top}px`;
  clone.style.width = `${imgRect.width}px`;
  clone.style.height = `${imgRect.height}px`;
  clone.style.margin = '0';
  clone.style.borderRadius = '14px';
  clone.style.zIndex = '9999';
  clone.style.pointerEvents = 'none';
  clone.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,.45)';
  clone.style.transition = 'transform 0.7s cubic-bezier(.3,.85,.4,1), opacity 0.7s ease';
  clone.style.transform = 'perspective(700px) translate3d(0,0,0) rotate(0deg) scale(1)';
  document.body.appendChild(clone);

  const deltaX = (cartRect.left + cartRect.width / 2) - (imgRect.left + imgRect.width / 2);
  const deltaY = (cartRect.top + cartRect.height / 2) - (imgRect.top + imgRect.height / 2);

  requestAnimationFrame(() => {
    clone.style.transform = `perspective(700px) translate3d(${deltaX}px, ${deltaY}px, -260px) rotate(440deg) scale(0.1)`;
    clone.style.opacity = '0.25';
  });

  clone.addEventListener('transitionend', () => {
    clone.remove();
    cartIcon.classList.remove('cart-catch');
    void cartIcon.offsetWidth;
    cartIcon.classList.add('cart-catch');
  }, { once: true });
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const el = document.getElementById('cartCount');
  el.textContent = count;
  // retrigger the 3D "pop" animation every time the count changes
  el.classList.remove('count-pop');
  void el.offsetWidth;
  el.classList.add('count-pop');
  updateMobileCartBar(count);
}

function updateMobileCartBar(count) {
  const bar = document.getElementById('mobileCartBar');
  if (!bar) return;
  if (count > 0) {
    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    document.getElementById('mobileCartBarText').textContent =
      `${count} item${count > 1 ? 's' : ''} \u2022 KSh ${total}`;
    bar.classList.remove('hidden');
    document.body.classList.add('has-mobile-cart-bar');
  } else {
    bar.classList.add('hidden');
    document.body.classList.remove('has-mobile-cart-bar');
  }
}

// renders cart contents + total into the already-open modal; safe to call
// repeatedly (e.g. from the qty stepper) without re-triggering the open animation
function renderCartModal() {
  const itemsContainer = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');

  itemsContainer.innerHTML = '';
  let productTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * (item.quantity || 1);
    productTotal += itemTotal;
    const div = document.createElement('div');
    div.className = "flex gap-4 mb-6";
    div.innerHTML = `
      <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl">
      <div class="flex-1">
        <h4 class="font-medium">${item.name}</h4>
        <p class="text-blue-600 font-bold">KSh ${itemTotal}</p>
        <div class="qty-stepper-3d">
          <button onclick="decrementQty(${index})" aria-label="Decrease quantity">&minus;</button>
          <span>${item.quantity || 1}</span>
          <button onclick="incrementQty(${index})" aria-label="Increase quantity">&plus;</button>
        </div>
      </div>
      <button onclick="removeFromCart(${index})" class="text-red-500 text-2xl hover:text-red-700">&times;</button>
    `;
    itemsContainer.appendChild(div);
  });

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p class="text-center py-12 text-gray-400">Your cart is empty</p>`;
    totalEl.textContent = `KSh 0`;
    checkoutBtn.style.display = 'none';
  } else {
    totalEl.textContent = `KSh ${productTotal}`;
    checkoutBtn.style.display = 'flex';
  }
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  if (modal.classList.contains('hidden')) {
    renderCartModal();
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function incrementQty(index) {
  if (!cart[index]) return;
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  saveCart();
  renderCartModal();
  updateCartCount();
}

function decrementQty(index) {
  const item = cart[index];
  if (!item) return;
  item.quantity = (item.quantity || 1) - 1;
  if (item.quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCartModal();
  updateCartCount();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartModal();
  updateCartCount();
}

function checkout() {
  if (cart.length === 0) return;
  
  let message = "Hi Protect N Play!%0AI would like to order:%0A%0A";
  let total = 0;
  
  cart.forEach(item => {
    const qty = item.quantity || 1;
    const itemTotal = item.price * qty;
    total += itemTotal;
    message += `- ${item.name} x${qty} = KSh ${itemTotal}%0A`;
  });
  
  message += `%0ATotal: KSh ${total}%0A%0AThank you!`;
  
  window.open(`https://wa.me/254795885916?text=${message}`, '_blank');
  
  cart = [];
  saveCart();
  updateCartCount();
  toggleCart();
  showToast("Order sent to WhatsApp!");
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    menu.classList.add('hidden');
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast-3d';
  toast.style.cssText = 'position:fixed; bottom:20px; left:50%; background:#1e40af; color:white; padding:14px 24px; border-radius:9999px; z-index:9999; font-weight:500; box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.3);';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

document.getElementById('searchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  }
});

document.getElementById('mobileSearchInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)
    );
    renderProducts(filtered);
    toggleMobileMenu();
  }
});

// ---- 3D parallax: hero product image gently tilts toward the cursor ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartCount();

  const heroArt = document.querySelector('.hero-art');
  const heroCard = document.querySelector('.hero-3d-card');
  if (heroArt && heroCard && tiltEnabled) {
    heroArt.addEventListener('mousemove', (e) => {
      const rect = heroArt.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 22 - 8;
      const rotateX = (0.5 - py) * 16 + 4;
      heroCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
    });
    heroArt.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
    });
  }
});
