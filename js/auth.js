// Authentication System for Divine Blessings E-commerce

// User state management
let currentUser = JSON.parse(localStorage.getItem('divineUser')) || null;

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthSystem();
    updateAuthUI();
});

// Initialize authentication system
function initializeAuthSystem() {
    bindAuthEvents();
    
    // Check if user is already logged in
    if (currentUser) {
        updateAuthUI();
    }
}

// Bind authentication events
function bindAuthEvents() {
    // Login button click
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            if (currentUser) {
                showUserMenu();
            } else {
                openModal('authModal');
                showLoginForm();
            }
        });
    }
    
    // Form switching
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            showSignupForm();
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginForm();
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing in...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Check credentials (in real app, this would be server-side)
        const users = JSON.parse(localStorage.getItem('divineUsers')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Successful login
            currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                joinDate: user.joinDate,
                lastLogin: new Date().toISOString()
            };
            
            // Save user session
            localStorage.setItem('divineUser', JSON.stringify(currentUser));
            
            // Update UI
            updateAuthUI();
            closeModal('authModal');
            
            showNotification(`Welcome back, ${currentUser.name}!`, 'success');
            
        } else {
            // Failed login
            showNotification('Invalid email or password', 'error');
        }
        
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 1500);
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validate form
    if (!validateSignupForm(name, email, phone, password, confirmPassword)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Creating account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('divineUsers')) || [];
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
            showNotification('An account with this email already exists', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Create new user
        const newUser = {
            id: generateUserId(),
            name: name,
            email: email,
            phone: phone,
            password: password, // In real app, this would be hashed
            joinDate: new Date().toISOString(),
            isActive: true
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('divineUsers', JSON.stringify(users));
        
        // Auto-login the new user
        currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            joinDate: newUser.joinDate,
            lastLogin: new Date().toISOString()
        };
        
        localStorage.setItem('divineUser', JSON.stringify(currentUser));
        
        // Update UI
        updateAuthUI();
        closeModal('authModal');
        
        showNotification(`Welcome to Divine Blessings, ${currentUser.name}!`, 'success');
        
        // Reset form
        e.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// Validate signup form
function validateSignupForm(name, email, phone, password, confirmPassword) {
    // Name validation
    if (name.trim().length < 2) {
        showNotification('Name must be at least 2 characters long', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showNotification('Please enter a valid 10-digit mobile number', 'error');
        return false;
    }
    
    // Password validation
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long', 'error');
        return false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }
    
    return true;
}

// Show login form
function showLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');
    
    if (loginForm && signupForm && authTitle) {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        authTitle.textContent = 'Login';
    }
}

// Show signup form
function showSignupForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');
    
    if (loginForm && signupForm && authTitle) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        authTitle.textContent = 'Sign Up';
    }
}

// Update authentication UI
function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginBtn) {
        if (currentUser) {
            // User is logged in
            loginBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Hi, ${currentUser.name.split(' ')[0]}</span>
            `;
            loginBtn.classList.add('logged-in');
        } else {
            // User is not logged in
            loginBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Login</span>
            `;
            loginBtn.classList.remove('logged-in');
        }
    }
}

// Show user menu
function showUserMenu() {
    const userMenu = createUserMenu();
    document.body.appendChild(userMenu);
    
    // Position menu below login button
    const loginBtn = document.getElementById('loginBtn');
    const rect = loginBtn.getBoundingClientRect();
    
    userMenu.style.position = 'fixed';
    userMenu.style.top = `${rect.bottom + 10}px`;
    userMenu.style.right = `${window.innerWidth - rect.right}px`;
    
    // Show menu
    setTimeout(() => {
        userMenu.classList.add('show');
    }, 10);
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeUserMenu(e) {
        if (!userMenu.contains(e.target) && !loginBtn.contains(e.target)) {
            userMenu.classList.remove('show');
            setTimeout(() => {
                if (userMenu.parentNode) {
                    userMenu.remove();
                }
            }, 200);
            document.removeEventListener('click', closeUserMenu);
        }
    });
}

// Create user menu
function createUserMenu() {
    const menu = document.createElement('div');
    menu.className = 'user-menu';
    
    menu.innerHTML = `
        <div class="user-menu-header">
            <div class="user-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <div class="user-info">
                <h4>${currentUser.name}</h4>
                <p>${currentUser.email}</p>
            </div>
        </div>
        
        <div class="user-menu-items">
            <a href="#" onclick="showUserProfile()">
                <i class="fas fa-user"></i>
                My Profile
            </a>
            <a href="#" onclick="showUserOrders()">
                <i class="fas fa-shopping-bag"></i>
                My Orders
            </a>
            <a href="#" onclick="showUserBookings()">
                <i class="fas fa-calendar"></i>
                My Bookings
            </a>
            <a href="#" onclick="showUserConsultations()">
                <i class="fas fa-star"></i>
                Consultations
            </a>
            <div class="menu-divider"></div>
            <a href="#" onclick="showSettings()">
                <i class="fas fa-cog"></i>
                Settings
            </a>
            <a href="#" onclick="logout()" class="logout-link">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </a>
        </div>
    `;
    
    return menu;
}

// Show user profile
function showUserProfile() {
    const profileModal = createProfileModal();
    document.body.appendChild(profileModal);
    
    setTimeout(() => {
        profileModal.classList.add('open');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
}

// Create profile modal
function createProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal profile-modal';
    modal.id = 'profileModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>My Profile</h3>
                <button class="close-modal" onclick="closeProfileModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="profile-content">
                <div class="profile-avatar">
                    <div class="avatar-circle">
                        <i class="fas fa-user"></i>
                    </div>
                    <h3>${currentUser.name}</h3>
                    <p>Member since ${formatDate(new Date(currentUser.joinDate))}</p>
                </div>
                
                <form id="profileForm" class="profile-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" value="${currentUser.name}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value="${currentUser.email}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" value="${currentUser.phone}" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeProfileModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Bind form submission
    const form = modal.querySelector('#profileForm');
    form.addEventListener('submit', handleProfileUpdate);
    
    return modal;
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Validate form
    if (!name.trim() || !email.trim() || !phone.trim()) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Updating...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Update current user
        currentUser.name = name;
        currentUser.email = email;
        currentUser.phone = phone;
        
        // Update in localStorage
        localStorage.setItem('divineUser', JSON.stringify(currentUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem('divineUsers')) || [];
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex > -1) {
            users[userIndex] = { ...users[userIndex], name, email, phone };
            localStorage.setItem('divineUsers', JSON.stringify(users));
        }
        
        // Update UI
        updateAuthUI();
        closeProfileModal();
        
        showNotification('Profile updated successfully', 'success');
        
    }, 1500);
}

// Show user orders
function showUserOrders() {
    const orders = JSON.parse(localStorage.getItem('divineOrders')) || [];
    const userOrders = orders.filter(order => order.customer.email === currentUser.email);
    
    if (userOrders.length === 0) {
        showNotification('No orders found', 'info');
        return;
    }
    
    const ordersModal = createOrdersModal(userOrders);
    document.body.appendChild(ordersModal);
    
    setTimeout(() => {
        ordersModal.classList.add('open');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
}

// Create orders modal
function createOrdersModal(orders) {
    const modal = document.createElement('div');
    modal.className = 'modal orders-modal';
    modal.id = 'ordersModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>My Orders</h3>
                <button class="close-modal" onclick="closeOrdersModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="orders-content">
                ${orders.map(order => `
                    <div class="order-item">
                        <div class="order-header">
                            <div class="order-id">Order #${order.orderId}</div>
                            <div class="order-date">${formatDate(new Date(order.orderDate))}</div>
                        </div>
                        
                        <div class="order-details">
                            <div class="order-items">
                                ${order.cart.items.map(item => `
                                    <div class="order-product">
                                        <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
                                        <div class="product-info">
                                            <span class="product-name">${item.title}</span>
                                            <span class="product-quantity">Qty: ${item.quantity}</span>
                                        </div>
                                        <div class="product-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
                                    </div>
                                `).join('')}
                            </div>
                            
                            <div class="order-summary">
                                <div class="order-total">Total: ₹${order.cart.total.toLocaleString('en-IN')}</div>
                                <div class="order-status">Status: Processing</div>
                                <div class="payment-method">Payment: ${order.paymentMethod.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    return modal;
}

// Show user bookings
function showUserBookings() {
    showNotification('Bookings feature coming soon!', 'info');
}

// Show user consultations
function showUserConsultations() {
    showNotification('Consultations feature coming soon!', 'info');
}

// Show settings
function showSettings() {
    showNotification('Settings feature coming soon!', 'info');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('divineUser');
        updateAuthUI();
        showNotification('Logged out successfully', 'info');
        
        // Close any open user menus
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.remove();
        }
    }
}

// Close profile modal
function closeProfileModal() {
    const profileModal = document.getElementById('profileModal');
    if (profileModal) {
        profileModal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            profileModal.remove();
        }, 300);
    }
}

// Close orders modal
function closeOrdersModal() {
    const ordersModal = document.getElementById('ordersModal');
    if (ordersModal) {
        ordersModal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            ordersModal.remove();
        }, 300);
    }
}

// Generate user ID
function generateUserId() {
    return 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Check if user is logged in
function isLoggedIn() {
    return currentUser !== null;
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Require authentication for certain actions
function requireAuth(callback) {
    if (isLoggedIn()) {
        callback();
    } else {
        showNotification('Please login to continue', 'info');
        openModal('authModal');
        showLoginForm();
    }
}

// Export auth functions for global use
window.authFunctions = {
    isLoggedIn,
    getCurrentUser,
    requireAuth,
    logout,
    showUserProfile,
    showUserOrders,
    showUserBookings,
    showUserConsultations,
    showSettings
};