// Shopping Cart Functionality for Divine Blessings E-commerce

// Cart state management
let cart = JSON.parse(localStorage.getItem('divineCart')) || [];

// DOM elements
let cartSidebar, cartItems, cartTotal, cartCount, checkoutBtn;

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCartElements();
    updateCartDisplay();
    bindCartEvents();
});

// Initialize cart DOM elements
function initializeCartElements() {
    cartSidebar = document.getElementById('cartSidebar');
    cartItems = document.getElementById('cartItems');
    cartTotal = document.getElementById('cartTotal');
    cartCount = document.querySelector('.cart-count');
    checkoutBtn = document.getElementById('checkoutBtn');
    
    // Cart button click handler
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            toggleCart();
        });
    }
    
    // Close cart button
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            closeCart();
        });
    }
}

// Bind cart events
function bindCartEvents() {
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            
            // Close cart and proceed to checkout
            closeCart();
            proceedToCheckout();
        });
    }
    
    // Close cart when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (cartSidebar && cartSidebar.classList.contains('open')) {
                closeCart();
            }
        });
    }
}

// Add item to cart
window.addToCart = function(productId, title, price, image) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        // Update quantity of existing item
        cart[existingItemIndex].quantity += quantity;
        showNotification(`Updated ${title} quantity in cart`, 'success');
    } else {
        // Add new item to cart
        const cartItem = {
            id: productId,
            title: title,
            price: price,
            image: image,
            quantity: quantity,
            addedAt: new Date().toISOString()
        };
        
        cart.push(cartItem);
        showNotification(`${title} added to cart`, 'success');
    }
    
    // Save cart to localStorage
    saveCart();
    
    // Update cart display
    updateCartDisplay();
    
    // Reset quantity selector
    if (quantityInput) {
        quantityInput.value = 1;
    }
    
    // Show cart briefly
    showCartPreview();
};

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        
        showNotification(`${removedItem.title} removed from cart`, 'info');
        
        // Save and update display
        saveCart();
        updateCartDisplay();
    }
}

// Update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            cart[itemIndex].quantity = newQuantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

// Update cart display
function updateCartDisplay() {
    updateCartCount();
    updateCartTotal();
    renderCartItems();
}

// Update cart count badge
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartTotal) {
        cartTotal.textContent = total.toLocaleString('en-IN');
    }
}

// Render cart items
function renderCartItems() {
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some spiritual items to get started</p>
                <button class="btn btn-primary" onclick="closeCart()">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="cart-item-subtotal">
                    Subtotal: ₹${(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
            </div>
        </div>
    `).join('');
}

// Toggle cart sidebar
function toggleCart() {
    if (cartSidebar) {
        const isOpen = cartSidebar.classList.contains('open');
        
        if (isOpen) {
            closeCart();
        } else {
            openCart();
        }
    }
}

// Open cart sidebar
function openCart() {
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update cart display when opening
        updateCartDisplay();
    }
}

// Close cart sidebar
function closeCart() {
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Show cart preview briefly after adding item
function showCartPreview() {
    openCart();
    
    // Auto-close after 3 seconds if user doesn't interact
    setTimeout(() => {
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            // Check if user is hovering over cart
            if (!cartSidebar.matches(':hover')) {
                closeCart();
            }
        }
    }, 3000);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('divineCart', JSON.stringify(cart));
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        showNotification('Cart cleared', 'info');
    }
}

// Get cart summary for checkout
function getCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 50; // Free shipping over ₹1000
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;
    
    return {
        items: cart,
        itemCount: cart.length,
        totalQuantity: cart.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Store cart summary for checkout page
    const cartSummary = getCartSummary();
    sessionStorage.setItem('checkoutData', JSON.stringify(cartSummary));
    
    // Create and show checkout modal
    showCheckoutModal();
}

// Show checkout modal
function showCheckoutModal() {
    const checkoutModal = createCheckoutModal();
    document.body.appendChild(checkoutModal);
    
    // Show modal
    setTimeout(() => {
        checkoutModal.classList.add('open');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
}

// Create checkout modal
function createCheckoutModal() {
    const cartSummary = getCartSummary();
    
    const modal = document.createElement('div');
    modal.className = 'modal checkout-modal';
    modal.id = 'checkoutModal';
    
    modal.innerHTML = `
        <div class="modal-content checkout-content">
            <div class="modal-header">
                <h3>Secure Checkout</h3>
                <button class="close-modal" onclick="closeCheckoutModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="checkout-body">
                <div class="checkout-sections">
                    <!-- Order Summary -->
                    <div class="order-summary">
                        <h4>Order Summary</h4>
                        <div class="summary-items">
                            ${cartSummary.items.map(item => `
                                <div class="summary-item">
                                    <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
                                    <div class="item-details">
                                        <span class="item-name">${item.title}</span>
                                        <span class="item-quantity">Qty: ${item.quantity}</span>
                                        <span class="item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="summary-totals">
                            <div class="total-row">
                                <span>Subtotal:</span>
                                <span>₹${cartSummary.subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="total-row">
                                <span>Shipping:</span>
                                <span>${cartSummary.shipping === 0 ? 'Free' : '₹' + cartSummary.shipping}</span>
                            </div>
                            <div class="total-row">
                                <span>Tax (GST):</span>
                                <span>₹${cartSummary.tax.toLocaleString('en-IN')}</span>
                            </div>
                            <div class="total-row final-total">
                                <span>Total:</span>
                                <span>₹${cartSummary.total.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Checkout Form -->
                    <div class="checkout-form">
                        <form id="checkoutFormData">
                            <h4>Shipping Information</h4>
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" name="firstName" placeholder="First Name" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="lastName" placeholder="Last Name" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <input type="email" name="email" placeholder="Email Address" required>
                            </div>
                            
                            <div class="form-group">
                                <input type="tel" name="phone" placeholder="Phone Number" required>
                            </div>
                            
                            <div class="form-group">
                                <textarea name="address" placeholder="Complete Address" rows="3" required></textarea>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <input type="text" name="city" placeholder="City" required>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="pincode" placeholder="PIN Code" required>
                                </div>
                            </div>
                            
                            <h4>Payment Method</h4>
                            <div class="payment-methods">
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="cod" checked>
                                    <span class="payment-label">
                                        <i class="fas fa-money-bill-wave"></i>
                                        Cash on Delivery
                                    </span>
                                </label>
                                
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="upi">
                                    <span class="payment-label">
                                        <i class="fab fa-google-pay"></i>
                                        UPI Payment
                                    </span>
                                </label>
                                
                                <label class="payment-option">
                                    <input type="radio" name="paymentMethod" value="card">
                                    <span class="payment-label">
                                        <i class="fas fa-credit-card"></i>
                                        Credit/Debit Card
                                    </span>
                                </label>
                            </div>
                            
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeCheckoutModal()">
                                    Continue Shopping
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Place Order (₹${cartSummary.total.toLocaleString('en-IN')})
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Bind form submission
    const form = modal.querySelector('#checkoutFormData');
    form.addEventListener('submit', handleCheckoutSubmission);
    
    return modal;
}

// Handle checkout form submission
function handleCheckoutSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            pincode: formData.get('pincode')
        },
        paymentMethod: formData.get('paymentMethod'),
        cart: getCartSummary(),
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
    
    // Simulate order processing
    processOrder(orderData);
}

// Process order
function processOrder(orderData) {
    // Show loading state
    const submitBtn = document.querySelector('#checkoutFormData button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Store order in localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('divineOrders')) || [];
        orders.push(orderData);
        localStorage.setItem('divineOrders', JSON.stringify(orders));
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartDisplay();
        
        // Close checkout modal
        closeCheckoutModal();
        
        // Show success message
        showOrderConfirmation(orderData);
        
    }, 2000);
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `DB${timestamp}${random}`.toUpperCase();
}

// Show order confirmation
function showOrderConfirmation(orderData) {
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal order-confirmation-modal';
    confirmationModal.innerHTML = `
        <div class="modal-content">
            <div class="confirmation-header">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Order Placed Successfully!</h3>
                <p>Thank you for your order. May divine blessings be with you!</p>
            </div>
            
            <div class="order-details">
                <div class="order-info">
                    <h4>Order ID: ${orderData.orderId}</h4>
                    <p>Total Amount: ₹${orderData.cart.total.toLocaleString('en-IN')}</p>
                    <p>Payment Method: ${orderData.paymentMethod.toUpperCase()}</p>
                </div>
                
                <div class="delivery-info">
                    <h4>Delivery Information</h4>
                    <p>Your order will be delivered to:</p>
                    <address>
                        ${orderData.customer.firstName} ${orderData.customer.lastName}<br>
                        ${orderData.customer.address}<br>
                        ${orderData.customer.city} - ${orderData.customer.pincode}<br>
                        Phone: ${orderData.customer.phone}
                    </address>
                </div>
                
                <div class="next-steps">
                    <h4>What's Next?</h4>
                    <ul>
                        <li>You'll receive an order confirmation email shortly</li>
                        <li>Your order will be blessed before dispatch</li>
                        <li>Expected delivery: 3-5 business days</li>
                        <li>Track your order using Order ID</li>
                    </ul>
                </div>
            </div>
            
            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="closeOrderConfirmation()">
                    Continue Shopping
                </button>
                <button class="btn btn-secondary" onclick="trackOrder('${orderData.orderId}')">
                    Track Order
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmationModal);
    
    setTimeout(() => {
        confirmationModal.classList.add('open');
        document.getElementById('overlay').classList.add('active');
    }, 100);
}

// Close checkout modal
function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            checkoutModal.remove();
        }, 300);
    }
}

// Close order confirmation
function closeOrderConfirmation() {
    const confirmationModal = document.querySelector('.order-confirmation-modal');
    if (confirmationModal) {
        confirmationModal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            confirmationModal.remove();
        }, 300);
    }
}

// Track order function
function trackOrder(orderId) {
    closeOrderConfirmation();
    showNotification(`Order tracking for ${orderId} - Feature coming soon!`, 'info');
}

// Export cart functions for global use
window.cartFunctions = {
    addToCart: window.addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartSummary,
    openCart,
    closeCart
};