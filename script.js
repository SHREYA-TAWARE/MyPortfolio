// Global Variables
let cart = JSON.parse(localStorage.getItem('krushisagar_cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('krushisagar_user')) || null;
let products = [];

// Product Database
const productDatabase = [
    // Seeds
    {
        id: 1,
        name: "Premium Wheat Seeds",
        category: "seeds",
        price: 450,
        originalPrice: 500,
        image: "🌾",
        description: "High-yield wheat seeds certified for maximum productivity. Disease-resistant variety suitable for all soil types.",
        badge: "Bestseller",
        inStock: true,
        unit: "kg"
    },
    {
        id: 2,
        name: "Organic Rice Seeds",
        category: "seeds",
        price: 380,
        originalPrice: 420,
        image: "🌾",
        description: "Premium organic rice seeds with excellent grain quality. Perfect for sustainable farming practices.",
        badge: "Organic",
        inStock: true,
        unit: "kg"
    },
    {
        id: 3,
        name: "Hybrid Corn Seeds",
        category: "seeds",
        price: 320,
        originalPrice: 350,
        image: "🌽",
        description: "High-quality hybrid corn seeds with excellent yield potential and pest resistance.",
        badge: "New",
        inStock: true,
        unit: "kg"
    },
    {
        id: 4,
        name: "Cotton Seeds",
        category: "seeds",
        price: 280,
        originalPrice: 320,
        image: "🌱",
        description: "Premium cotton seeds with superior fiber quality and high yield potential.",
        badge: "",
        inStock: true,
        unit: "kg"
    },
    {
        id: 5,
        name: "Vegetable Seeds Mix",
        category: "seeds",
        price: 150,
        originalPrice: 180,
        image: "🥬",
        description: "Assorted vegetable seeds including tomato, onion, cabbage, and more for kitchen gardens.",
        badge: "Popular",
        inStock: true,
        unit: "pack"
    },

    // Fertilizers
    {
        id: 6,
        name: "Organic Compost",
        category: "fertilizers",
        price: 200,
        originalPrice: 250,
        image: "🌿",
        description: "100% organic compost made from cow dung and natural materials. Rich in nutrients for healthy plant growth.",
        badge: "Organic",
        inStock: true,
        unit: "kg"
    },
    {
        id: 7,
        name: "NPK Fertilizer",
        category: "fertilizers",
        price: 180,
        originalPrice: 200,
        image: "⚗️",
        description: "Balanced NPK fertilizer (19:19:19) for all crops. Provides essential nutrients for optimal growth.",
        badge: "Bestseller",
        inStock: true,
        unit: "kg"
    },
    {
        id: 8,
        name: "Vermicompost",
        category: "fertilizers",
        price: 160,
        originalPrice: 190,
        image: "🪱",
        description: "Premium vermicompost rich in organic matter and beneficial microorganisms for soil health.",
        badge: "Eco-friendly",
        inStock: true,
        unit: "kg"
    },
    {
        id: 9,
        name: "Bio Fertilizer",
        category: "fertilizers",
        price: 220,
        originalPrice: 260,
        image: "🧪",
        description: "Biological fertilizer containing beneficial bacteria for enhanced nutrient uptake and soil fertility.",
        badge: "Advanced",
        inStock: true,
        unit: "kg"
    },
    {
        id: 10,
        name: "Liquid Fertilizer",
        category: "fertilizers",
        price: 300,
        originalPrice: 350,
        image: "💧",
        description: "Concentrated liquid fertilizer for quick nutrient absorption. Suitable for foliar application.",
        badge: "Fast Acting",
        inStock: true,
        unit: "liter"
    },

    // Pesticides
    {
        id: 11,
        name: "Neem Oil Pesticide",
        category: "pesticides",
        price: 250,
        originalPrice: 280,
        image: "🌳",
        description: "Natural neem oil based pesticide for organic pest control. Safe for beneficial insects and environment.",
        badge: "Organic",
        inStock: true,
        unit: "liter"
    },
    {
        id: 12,
        name: "Bio Insecticide",
        category: "pesticides",
        price: 320,
        originalPrice: 360,
        image: "🐛",
        description: "Biological insecticide containing beneficial microorganisms for sustainable pest management.",
        badge: "Eco-Safe",
        inStock: true,
        unit: "liter"
    },
    {
        id: 13,
        name: "Herbal Pesticide",
        category: "pesticides",
        price: 180,
        originalPrice: 220,
        image: "🌿",
        description: "Herbal pesticide made from natural plant extracts. Effective against common crop pests.",
        badge: "Natural",
        inStock: true,
        unit: "liter"
    },
    {
        id: 14,
        name: "Fungicide Spray",
        category: "pesticides",
        price: 280,
        originalPrice: 320,
        image: "🍄",
        description: "Effective fungicide for controlling plant diseases and fungal infections in crops.",
        badge: "Professional",
        inStock: true,
        unit: "liter"
    },

    // Anticides
    {
        id: 15,
        name: "Ant Control Powder",
        category: "anticides",
        price: 120,
        originalPrice: 150,
        image: "🐜",
        description: "Effective ant control powder for protecting crops from ant damage. Safe for plants and soil.",
        badge: "Effective",
        inStock: true,
        unit: "kg"
    },
    {
        id: 16,
        name: "Termite Control Solution",
        category: "anticides",
        price: 200,
        originalPrice: 240,
        image: "🪲",
        description: "Professional termite control solution for soil treatment and crop protection.",
        badge: "Professional",
        inStock: true,
        unit: "liter"
    },
    {
        id: 17,
        name: "Organic Ant Repellent",
        category: "anticides",
        price: 160,
        originalPrice: 190,
        image: "🌱",
        description: "Natural ant repellent made from organic ingredients. Environmentally safe and effective.",
        badge: "Organic",
        inStock: true,
        unit: "kg"
    },
    {
        id: 18,
        name: "Multi-Pest Control",
        category: "anticides",
        price: 350,
        originalPrice: 400,
        image: "🛡️",
        description: "Comprehensive pest control solution for ants, termites, and other soil pests.",
        badge: "Complete",
        inStock: true,
        unit: "liter"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    products = [...productDatabase];
    updateCartUI();
    loadProducts();
    setupEventListeners();
    updateAuthUI();
    setMinDate();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Product category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Forms
    document.getElementById('consultationForm').addEventListener('submit', handleConsultationSubmit);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Modal close on backdrop click
    document.getElementById('authModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLoginModal();
        }
    });

    // Cart sidebar close on backdrop click
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        if (!cartSidebar.contains(e.target) && !e.target.closest('.cart-icon') && cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    });
}

// Navigation Functions
function handleNavigation(e) {
    e.preventDefault();
    const target = e.target.getAttribute('href');
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    e.target.classList.add('active');
    
    // Scroll to section
    if (target.startsWith('#')) {
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function scrollToConsultation() {
    document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Product Functions
function loadProducts(category = 'all') {
    const productsGrid = document.getElementById('productsGrid');
    let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                ${product.image}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                    <span class="unit">/${product.unit}</span>
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                        <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="50">
                        <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function handleCategoryFilter(e) {
    const category = e.target.getAttribute('data-category');
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Load filtered products
    loadProducts(category);
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    const productsGrid = document.getElementById('productsGrid');
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
    } else {
        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    ${product.image}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">₹${product.price}</span>
                        ${product.originalPrice > product.price ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                        <span class="unit">/${product.unit}</span>
                    </div>
                    <div class="product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">-</button>
                            <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="50">
                            <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">+</button>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        handleSearch({ target: searchInput });
        scrollToProducts();
    }
}

function changeQuantity(productId, change) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyInput.value);
    let newQty = currentQty + change;
    
    if (newQty >= 1 && newQty <= 50) {
        qtyInput.value = newQty;
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            unit: product.unit,
            quantity: quantity
        });
    }
    
    localStorage.setItem('krushisagar_cart', JSON.stringify(cart));
    updateCartUI();
    showToast('Product added to cart successfully!', 'success');
    
    // Reset quantity to 1
    document.getElementById(`qty-${productId}`).value = 1;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('krushisagar_cart', JSON.stringify(cart));
    updateCartUI();
    showToast('Product removed from cart', 'success');
}

function updateCartQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        localStorage.setItem('krushisagar_cart', JSON.stringify(cart));
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn btn-primary" onclick="scrollToProducts()">Start Shopping</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price} / ${item.unit}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        cartTotal.textContent = totalAmount.toFixed(2);
        cartFooter.style.display = 'block';
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function proceedToCheckout() {
    if (!currentUser) {
        toggleCart();
        openLoginModal();
        showToast('Please login to proceed with checkout', 'error');
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    // Create checkout page
    createCheckoutPage();
}

function createCheckoutPage() {
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryCharge = totalAmount >= 500 ? 0 : 50;
    const finalAmount = totalAmount + deliveryCharge;
    
    const checkoutHTML = `
        <div class="modal open" id="checkoutModal">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>Checkout - Order Summary</h3>
                    <button class="close-modal" onclick="closeCheckout()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div>
                            <h4>Order Items</h4>
                            <div class="checkout-items">
                                ${cart.map(item => `
                                    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border-light);">
                                        <div>
                                            <strong>${item.name}</strong><br>
                                            <small>₹${item.price} × ${item.quantity} ${item.unit}</small>
                                        </div>
                                        <div><strong>₹${(item.price * item.quantity).toFixed(2)}</strong></div>
                                    </div>
                                `).join('')}
                            </div>
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid var(--primary-color);">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <span>Subtotal:</span>
                                    <span>₹${totalAmount.toFixed(2)}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                    <span>Delivery Charge:</span>
                                    <span>${deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; color: var(--primary-color);">
                                    <span>Total:</span>
                                    <span>₹${finalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Delivery Information</h4>
                            <form id="checkoutForm">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" value="${currentUser.name}" required>
                                </div>
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" value="${currentUser.phone || ''}" required>
                                </div>
                                <div class="form-group">
                                    <label>Delivery Address</label>
                                    <textarea rows="3" placeholder="Enter complete address with pincode" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Payment Method</label>
                                    <select required>
                                        <option value="">Select Payment Method</option>
                                        <option value="cod">Cash on Delivery</option>
                                        <option value="online">Online Payment</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Special Instructions (Optional)</label>
                                    <textarea rows="2" placeholder="Any special delivery instructions..."></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary btn-full">
                                    <i class="fas fa-check-circle"></i> Place Order (₹${finalAmount.toFixed(2)})
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
    
    document.getElementById('checkoutForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processOrder();
    });
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.remove();
    }
}

function processOrder() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        closeCheckout();
        toggleCart();
        
        // Clear cart
        cart = [];
        localStorage.setItem('krushisagar_cart', JSON.stringify(cart));
        updateCartUI();
        
        // Show success message
        showOrderSuccess();
    }, 2000);
}

function showOrderSuccess() {
    const successHTML = `
        <div class="modal open" id="successModal">
            <div class="modal-content">
                <div class="modal-body" style="text-align: center; padding: 40px;">
                    <div style="font-size: 4rem; color: var(--primary-color); margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">Order Placed Successfully!</h3>
                    <p style="margin-bottom: 20px;">Thank you for choosing Krushisagar. Your order has been received and will be processed soon.</p>
                    <div style="background: var(--sage-light); padding: 20px; border-radius: var(--border-radius); margin-bottom: 20px;">
                        <p><strong>Order ID:</strong> KS${Date.now()}</p>
                        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
                    </div>
                    <button class="btn btn-primary" onclick="closeSuccessModal()">
                        <i class="fas fa-home"></i> Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.remove();
    }
}

// Authentication Functions
function openLoginModal() {
    const modal = document.getElementById('authModal');
    modal.classList.add('open');
    switchAuthTab('login');
}

function closeLoginModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('open');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTitle = document.getElementById('authTitle');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        authTitle.textContent = 'Login to Krushisagar';
        document.querySelector('.auth-tab:first-child').classList.add('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        authTitle.textContent = 'Create Account';
        document.querySelector('.auth-tab:last-child').classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    showLoading();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        // For demo purposes, accept any email/password
        const user = {
            id: 1,
            name: email.includes('@') ? email.split('@')[0] : email,
            email: email.includes('@') ? email : email + '@example.com',
            phone: email.includes('@') ? '' : email
        };
        
        currentUser = user;
        localStorage.setItem('krushisagar_user', JSON.stringify(user));
        updateAuthUI();
        closeLoginModal();
        showToast('Login successful! Welcome to Krushisagar', 'success');
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone
        };
        
        currentUser = user;
        localStorage.setItem('krushisagar_user', JSON.stringify(user));
        updateAuthUI();
        closeLoginModal();
        showToast('Account created successfully! Welcome to Krushisagar', 'success');
    }, 1500);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('krushisagar_user');
    updateAuthUI();
    showToast('Logged out successfully', 'success');
}

function updateAuthUI() {
    const authBtn = document.querySelector('.auth-btn');
    
    if (currentUser) {
        authBtn.innerHTML = `
            <div style="position: relative; display: inline-block;">
                <i class="fas fa-user-circle"></i> ${currentUser.name}
                <div style="position: absolute; top: 100%; right: 0; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; min-width: 150px; display: none; z-index: 1000;" class="user-menu">
                    <a href="#" onclick="logout()" style="display: block; padding: 10px 15px; color: var(--text-dark); text-decoration: none;">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        `;
        
        // Add hover functionality for user menu
        const userMenu = authBtn.querySelector('.user-menu');
        authBtn.addEventListener('mouseenter', () => {
            userMenu.style.display = 'block';
        });
        authBtn.addEventListener('mouseleave', () => {
            userMenu.style.display = 'none';
        });
    } else {
        authBtn.innerHTML = '<i class="fas fa-user"></i> Login/Register';
        authBtn.onclick = openLoginModal;
    }
}

// Consultation Functions
function handleConsultationSubmit(e) {
    e.preventDefault();
    showLoading();
    
    const formData = new FormData(e.target);
    const consultationData = {
        name: document.getElementById('farmerName').value,
        phone: document.getElementById('farmerPhone').value,
        email: document.getElementById('farmerEmail').value,
        farmSize: document.getElementById('farmSize').value,
        cropType: document.getElementById('cropType').value,
        consultationType: document.getElementById('consultationType').value,
        preferredDate: document.getElementById('preferredDate').value,
        query: document.getElementById('query').value
    };
    
    // Simulate API call
    setTimeout(() => {
        hideLoading();
        showToast('Consultation booked successfully! Our expert will contact you soon.', 'success');
        e.target.reset();
        setMinDate(); // Reset minimum date
    }, 2000);
}

function setMinDate() {
    const dateInput = document.getElementById('preferredDate');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

function showForgotPassword() {
    showToast('Please contact support at +91 9876543210 for password reset', 'success');
}

// Utility Functions
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.add('show');
}

function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    spinner.classList.remove('show');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        if (!document.getElementById('scrollToTop')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            scrollBtn.onclick = scrollToTop;
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.getElementById('scrollToTop');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeLoginModal();
        closeCheckout();
        closeSuccessModal();
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
    
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics and performance monitoring (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track product views
function trackProductView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        trackEvent('Product', 'View', product.name);
    }
}

// Track cart additions
function trackAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        trackEvent('Cart', 'Add', product.name);
    }
}

// Performance monitoring
window.addEventListener('load', function() {
    setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showToast('Something went wrong. Please refresh the page.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    showToast('Something went wrong. Please try again.', 'error');
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateCartQuantity,
        handleLogin,
        handleRegister,
        showToast
    };
}