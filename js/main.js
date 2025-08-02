// Main JavaScript for Divine Blessings Spiritual E-commerce Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeSearchFunctionality();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeModals();
    
    // Load initial content
    loadFeaturedProducts();
    initializeDarshanSchedule();
    
    console.log('Divine Blessings website initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.main-nav');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Dropdown menu functionality for touch devices
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.getElementById('overlay');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            mainNav.classList.remove('mobile-open');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileToggle.classList.remove('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 991) {
                    mainNav.classList.remove('mobile-open');
                    overlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    mobileToggle.classList.remove('active');
                }
            });
        });
    }
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .product-card, .darshan-card, .puja-card, .consultant-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.display = 'none';
    
    if (searchInput) {
        searchInput.parentNode.appendChild(searchResults);
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            if (query.length > 2) {
                performSearch(query, searchResults);
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.parentNode.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
}

// Perform search operation
function performSearch(query, resultsContainer) {
    // Mock search data - in real implementation, this would be an API call
    const searchData = [
        { title: 'Ganesha Idol', category: 'Idols', price: '₹1,500', image: 'images/products/ganesha-idol.jpg' },
        { title: 'Om Pendant', category: 'Jewelry', price: '₹800', image: 'images/products/om-pendant.jpg' },
        { title: 'Bhagavad Gita', category: 'Books', price: '₹350', image: 'images/products/bhagavad-gita.jpg' },
        { title: 'Sandalwood Incense', category: 'Incense', price: '₹200', image: 'images/products/sandalwood-incense.jpg' },
        { title: 'Rudraksha Mala', category: 'Jewelry', price: '₹1,200', image: 'images/products/rudraksha-mala.jpg' }
    ];
    
    const filteredResults = searchData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );
    
    if (filteredResults.length > 0) {
        resultsContainer.innerHTML = filteredResults.map(item => `
            <div class="search-result-item">
                <img src="${item.image}" alt="${item.title}" onerror="this.src='images/placeholder.jpg'">
                <div class="search-result-info">
                    <h4>${item.title}</h4>
                    <p>${item.category}</p>
                    <span class="price">${item.price}</span>
                </div>
            </div>
        `).join('');
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.innerHTML = '<div class="no-results">No products found</div>';
        resultsContainer.style.display = 'block';
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Counter animation for statistics (if added later)
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Modal functionality
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('overlay');
    
    // Function to open modal
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Function to close modal
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    
    // Close modal when clicking close button or overlay
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
    
    overlay.addEventListener('click', function() {
        modals.forEach(modal => {
            modal.classList.remove('open');
        });
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Prevent modal content clicks from closing modal
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
}

// Load featured products
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    // Mock product data - in real implementation, this would be fetched from API
    const products = [
        {
            id: 1,
            title: 'Ganesha Marble Idol',
            description: 'Handcrafted marble Ganesha idol for home temple',
            price: 1500,
            originalPrice: 2000,
            image: 'images/products/ganesha-idol.jpg',
            category: 'idols',
            badge: 'Blessed'
        },
        {
            id: 2,
            title: 'Om Sacred Pendant',
            description: 'Pure silver Om pendant with authentic gemstone',
            price: 800,
            originalPrice: 1200,
            image: 'images/products/om-pendant.jpg',
            category: 'jewelry',
            badge: 'Popular'
        },
        {
            id: 3,
            title: 'Bhagavad Gita (Sanskrit)',
            description: 'Original Sanskrit text with Hindi translation',
            price: 350,
            originalPrice: null,
            image: 'images/products/bhagavad-gita.jpg',
            category: 'books',
            badge: null
        },
        {
            id: 4,
            title: 'Sandalwood Incense Set',
            description: 'Premium sandalwood incense sticks (50 pieces)',
            price: 200,
            originalPrice: 300,
            image: 'images/products/sandalwood-incense.jpg',
            category: 'incense',
            badge: 'Organic'
        },
        {
            id: 5,
            title: 'Rudraksha Prayer Mala',
            description: '108 beads authentic Rudraksha mala from Nepal',
            price: 1200,
            originalPrice: null,
            image: 'images/products/rudraksha-mala.jpg',
            category: 'jewelry',
            badge: 'Authentic'
        },
        {
            id: 6,
            title: 'Lakshmi Brass Diya',
            description: 'Traditional brass diya with Lakshmi engravings',
            price: 450,
            originalPrice: 600,
            image: 'images/products/brass-diya.jpg',
            category: 'idols',
            badge: 'Handmade'
        }
    ];
    
    renderProducts(products, productsGrid);
    
    // Initialize category filtering
    initializeCategoryFiltering(products);
}

// Render products to grid
function renderProducts(products, container) {
    container.innerHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='images/placeholder.jpg'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
                        <input type="number" class="quantity-input" value="1" min="1" id="qty-${product.id}">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize category filtering
function initializeCategoryFiltering(products) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter products
            let filteredProducts;
            if (category === 'all') {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(product => product.category === category);
            }
            
            // Re-render products with animation
            productsGrid.style.opacity = '0.5';
            setTimeout(() => {
                renderProducts(filteredProducts, productsGrid);
                productsGrid.style.opacity = '1';
            }, 200);
        });
    });
}

// Update quantity function
window.updateQuantity = function(productId, change) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value);
        const newValue = Math.max(1, currentValue + change);
        quantityInput.value = newValue;
    }
};

// Initialize Darshan schedule
function initializeDarshanSchedule() {
    // Update darshan times dynamically
    updateDarshanTimes();
    
    // Update times every minute
    setInterval(updateDarshanTimes, 60000);
    
    // Add click handlers for darshan buttons
    const darshanBtns = document.querySelectorAll('.darshan-card .btn');
    darshanBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const darshanCard = this.closest('.darshan-card');
            const templeName = darshanCard.querySelector('h3').textContent;
            
            // Show darshan modal or redirect to darshan page
            showNotification(`Joining ${templeName} darshan...`, 'success');
            
            // In real implementation, this would open a video stream
            setTimeout(() => {
                showNotification('Darshan will begin shortly. Please maintain silence and devotion.', 'info');
            }, 2000);
        });
    });
}

// Update darshan times
function updateDarshanTimes() {
    const darshanTimes = document.querySelectorAll('.darshan-time');
    const now = new Date();
    
    darshanTimes.forEach((timeElement, index) => {
        // Mock schedule - in real implementation, this would come from API
        const schedules = [
            { start: '06:00', end: '08:00' },
            { start: '04:00', end: '06:00' },
            { start: '05:00', end: '07:00' }
        ];
        
        const schedule = schedules[index] || schedules[0];
        timeElement.innerHTML = `<i class="fas fa-clock"></i> Next: ${schedule.start} - ${schedule.end}`;
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
    
    // Add entrance animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Utility functions
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to log this to an error tracking service
});

// Service Worker registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for use in other modules
window.DivineBlessing = {
    showNotification,
    formatCurrency,
    formatDate,
    formatTime,
    openModal,
    closeModal
};