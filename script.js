const products = [
  
  {
    id: 2,
    name: "Kinesiology Tape",
    category: "medical",
    price: 250,
    img: "./images/k-tape.jpg",
    desc: ""
  },
  
  {
    id: 4,
    name: "White Cotton fabric",
    category: "medical",
    price: 200,
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
    price: 200,
    img: "./images/cohesive-tape.jpeg",
    desc: "Blue self-adhesive bandage"
  },
  {
    id: 8,
    name: "Blue Detectable Plasters",
    category: "medical",
    price: 250,
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
  }
];

let cart = [];

function renderProducts(filteredProducts) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card bg-white rounded-3xl overflow-hidden shadow-md';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="w-full h-52 sm:h-64 object-cover">
      <div class="p-4 sm:p-5">
        <h3 class="font-semibold text-base sm:text-lg">${product.name}</h3>
        <p class="text-sm text-gray-600 mt-1">${product.desc}</p>
        <div class="flex justify-between items-end mt-5">
          <span class="text-2xl sm:text-3xl font-bold text-blue-600">KSh ${product.price}</span>
          <div class="flex gap-2">
            <button onclick="addToCart(${product.id})" 
                    class="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-sm font-medium transition shadow-md">
              Add to Cart
            </button>
            <a href="https://wa.me/254795885916?text=I%20want%20to%20buy%20${encodeURIComponent(product.name)}" 
               target="_blank" 
               class="border border-green-600 text-green-600 hover:bg-green-50 px-4 py-2.5 sm:py-3 rounded-2xl flex items-center transition">
              <i class="fa-solid fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterCategory(category) {
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-category="${category}"]`).classList.add('active');
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  showToast(`${product.name} added to cart`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  const itemsContainer = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  
  if (modal.classList.contains('hidden')) {
    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * (item.quantity || 1);
      total += itemTotal;
      const div = document.createElement('div');
      div.className = "flex gap-4 mb-6";
      div.innerHTML = `
        <img src="${item.img}" class="w-20 h-20 object-cover rounded-2xl">
        <div class="flex-1">
          <h4 class="font-medium">${item.name}</h4>
          <p class="text-blue-600 font-bold">KSh ${itemTotal}</p>
          <p class="text-sm text-gray-500">Qty: ${item.quantity || 1}</p>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-500 text-2xl hover:text-red-700">&times;</button>
      `;
      itemsContainer.appendChild(div);
    });
    if (cart.length === 0) {
      itemsContainer.innerHTML = `<p class="text-center py-12 text-gray-400">Your cart is empty</p>`;
    }
    totalEl.textContent = `KSh ${total}`;
    modal.classList.remove('hidden');
  } else {
    modal.classList.add('hidden');
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  toggleCart();
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
  updateCartCount();
  toggleCart();
  showToast("Order opened in WhatsApp");
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#1e40af; color:white; padding:14px 24px; border-radius:9999px; z-index:9999; font-weight:500; box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.3);';
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

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartCount();
});

// Add this function at the end of your file, before the event listeners

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

// Add mobile search functionality
document.getElementById('mobileSearchInput')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)
    );
    renderProducts(filtered);
    toggleMobileMenu(); // Close menu after search
  }
});