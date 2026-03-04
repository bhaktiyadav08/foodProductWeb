/**
 * श्री सिद्धी फुड प्रॉडक्टस् — Cart, Checkout & WhatsApp
 * WhatsApp क्रमांक बदलण्यासाठी खाली CONFIG मध्ये संपादन करा.
 */

(function () {
  'use strict';

  // आपला WhatsApp क्रमांक येथे टाका (देश कोड + नंबर, + किंवा स्पेस नको)
  const CONFIG = { whatsapp: '917709786387', phone: '+917709786387' };
  const WHATSAPP_NUMBER = CONFIG.whatsapp;

  function toMarathiNum(n) {
    const marathiDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return String(n).split('').map(c => marathiDigits[parseInt(c, 10)] || c).join('');
  }

  function formatPhoneDisplay(num) {
    const n = num.replace(/\D/g, '');
    if (n.length >= 10) {
      const rest = n.slice(-10);
      return '+91' + toMarathiNum(rest.slice(0, 5)) + ' ' + toMarathiNum(rest.slice(5));
    }
    return num;
  }

  function getWhatsAppUrl() {
    return 'https://wa.me/' + WHATSAPP_NUMBER.replace(/\D/g, '');
  }

  const PRODUCTS = {
    upvas: [
      {
        id: 'upvas-1',
        name: 'शेंगदाणे लाडू',
        description: 'उपवासात खाण्यासाठी स्वादिष्ट शेंगदाण्याचे लाडू. घरगुती पद्धतीने तयार.',
        image:'./images/shengdanaLado.png',
      },
      {
        id: 'upvas-2',
        name: 'शेंगदाणे चिक्की',
        description: 'कुरकुरीत शेंगदाणा चिक्की. उपवासाच्या दिवशी आनंदाने खावयाचे.',
        image: './images/shengdanaChikki.jpeg',
      },
      {
        id: 'upvas-3',
        name: 'डिंक लाडू',
        description: 'पौष्टिक डिंक आणि गुळाचे मिश्रण. उर्जा देणारे लाडू.',
        image: './images/dinkLadoo.png',
      },
      {
        id: 'upvas-4',
        name: 'उपवासाची चिली-मिली',
        description: 'उपवासातील विशेष चिली-मिली. ताजी आणि चवदार.',
        image: './images/chilimili.png',
      },
    ],
    order: [
      {
        id: 'order-1',
        name: 'गुळपोळी',
        description: 'गुळाची गोड पोळी. महाराष्ट्रिय पारंपरिक पदार्थ.',
        image: './images/gulPoli.png',
      },
      {
        id: 'order-2',
        name: 'खुसखुशीत तिळाची वडी',
        description: 'तिळाची कुरकुरीत वडी. चवदार आणि पौष्टिक.',
        image: './images/tilwadi',
      },
      {
        id: 'order-3',
        name: 'पुरणपोळी',
        description: 'गुळाच्या पुरणाची पोळी. सणोत्सवातील आवडता पदार्थ.',
        image: './images/puranpoli.jpg',
      },
      {
        id: 'order-4',
        name: 'खाजा',
        description: 'कुरकुरीत खाजा. चहासोबत खाण्यासाठी परफेक्ट.',
        image: './images/khaja.png',
      },
      {
        id: 'order-5',
        name: 'रवा लाडू',
        description: 'रव्याचे गोड लाडू. सणोत्सवातील विशेष.',
        image: './images/ravaLadoo.png',
      },
      {
        id: 'order-6',
        name: 'शेंगदाणा पोळी',
        description: 'शेंगदाण्याची भरलेली पोळी. उपवासात खाण्यासाठी.',
        image: './images/shengdanaPoli.png',
      },
      
      {
        id: 'order-7',
        name: 'खोबऱ्याची वडी',
        description: 'नारळाची वडी. स्वादिष्ट आणि घरगुती.',
        image: './images/khobrawadi.png',
      },
      {
        id: 'order-8',
        name: 'पातळ पोह्याचा चिवडा',
        description: 'पातळ पोह्याचा कुरकुरीत चिवडा. नाश्त्यासाठी आदर्श.',
        image: './images/chivda',
      },
      {
        id: 'order-9',
        name: 'नाचणीचे लाडू',
        description: 'घरगुती पद्धतीने तयार केलेले पौष्टिक नाचणीचे लाडू. लोह, कॅल्शियम व फायबरने समृद्ध.',
        image: './images/nachniLado.png',
      },
      {
        id: 'order-10',
        name: 'मूग लाडू',
        description: 'शुद्ध मूग डाळीपासून बनवलेले स्वादिष्ट मूग लाडू. पचनास हलके व प्रथिनांनी समृद्ध .',
        image: './images/moongLado.png',
      }

    ],
  };

  let cart = [];

  function renderProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Crect fill=%22%23e8e0cc%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%239a7b1a%22 font-size=%2224%22%3Eपदार्थ%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-actions">
          <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}">Add to cart</button>
          <a href="${getWhatsAppUrl()}" target="_blank" rel="noopener" class="buy-now-btn">Buy Now</a>
        </div>
      </div>
    `;
    return card;
  }

  function renderProducts() {
    const upvasGrid = document.getElementById('upvasProducts');
    const orderGrid = document.getElementById('orderProducts');

    PRODUCTS.upvas.forEach((p) => upvasGrid.appendChild(renderProductCard(p)));
    PRODUCTS.order.forEach((p) => orderGrid.appendChild(renderProductCard(p)));
  }

  function addToCart(id, name) {
    const existing = cart.find((i) => i.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, qty: 1 });
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    cart = cart.filter((i) => i.id !== id);
    updateCartUI();
  }

  function updateCartQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id);
    else updateCartUI();
  }

  function updateCartUI() {
    const countEl = document.getElementById('cartCount');
    const itemsEl = document.getElementById('cartItems');

    const totalItems = cart.reduce((s, i) => s + i.qty, 0);
    countEl.textContent = toMarathiNum(totalItems);

    itemsEl.innerHTML = '';
    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty. Add products to cart.</p>';
      return;
    }

    cart.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-qty-display">Qty: ${toMarathiNum(item.qty)}</span>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Decrease">−</button>
          <span class="cart-item-qty">${toMarathiNum(item.qty)}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1" aria-label="Increase">+</button>
          <button class="remove-btn" data-id="${item.id}" aria-label="Remove">✕</button>
        </div>
      `;
      itemsEl.appendChild(div);
    });
  }

  function openCart() {
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function checkout() {
    if (cart.length === 0) {
      alert('Please add some products to cart first.');
      return;
    }
    window.open(getWhatsAppUrl(), '_blank');
    closeCart();
  }

  function init() {
    renderProducts();

    document.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id, btn.dataset.name);
      });
    });

    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCartBtn').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', checkout);

    document.getElementById('cartOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'cartOverlay') closeCart();
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('qty-btn')) {
        const id = e.target.dataset.id;
        const delta = parseInt(e.target.dataset.delta, 10);
        updateCartQty(id, delta);
      }
      if (e.target.classList.contains('remove-btn')) {
        removeFromCart(e.target.dataset.id);
      }
    });

    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => {
      s.classList.add('reveal');
      observer.observe(s);
    });

    updateCartUI();

    const phoneLink = document.getElementById('phoneLink');
    const waLink = document.getElementById('whatsappContactLink');
    if (phoneLink) {
      phoneLink.href = 'tel:' + CONFIG.phone.replace(/\D/g, '').replace(/^/, '+');
      phoneLink.textContent = formatPhoneDisplay(CONFIG.phone);
    }
    if (waLink) waLink.href = 'https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '');
  }

  init();
})();
