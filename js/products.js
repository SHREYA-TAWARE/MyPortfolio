// Products functionality for Divine Blessings E-commerce

// Initialize products module
document.addEventListener('DOMContentLoaded', function() {
    initializeProductFeatures();
});

// Initialize product features
function initializeProductFeatures() {
    bindProductEvents();
    initializeWishlist();
    initializeProductComparison();
}

// Bind product-related events
function bindProductEvents() {
    // Product card clicks for detailed view
    document.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        const productImage = e.target.closest('.product-image');
        const productTitle = e.target.closest('.product-title');
        
        if ((productImage || productTitle) && productCard) {
            const productId = getProductIdFromCard(productCard);
            if (productId) {
                showProductDetails(productId);
            }
        }
    });
    
    // Service card clicks
    document.addEventListener('click', function(e) {
        const serviceBtn = e.target.closest('.service-card .btn');
        if (serviceBtn) {
            const serviceCard = serviceBtn.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            handleServiceClick(serviceName);
        }
    });
    
    // Puja booking buttons
    document.addEventListener('click', function(e) {
        const pujaBtn = e.target.closest('.puja-card .btn');
        if (pujaBtn) {
            const pujaCard = pujaBtn.closest('.puja-card');
            const pujaName = pujaCard.querySelector('h3').textContent;
            const pujaPrice = pujaCard.querySelector('.puja-price').textContent;
            bookPuja(pujaName, pujaPrice);
        }
    });
    
    // Consultation booking buttons
    document.addEventListener('click', function(e) {
        const consultationBtn = e.target.closest('.consultant-card .btn');
        if (consultationBtn) {
            const consultantCard = consultationBtn.closest('.consultant-card');
            const consultantName = consultantCard.querySelector('h3').textContent;
            const consultantPrice = consultantCard.querySelector('.consultation-price').textContent;
            bookConsultation(consultantName, consultantPrice);
        }
    });
}

// Get product ID from product card
function getProductIdFromCard(productCard) {
    // Try to find product ID from various sources
    const addToCartBtn = productCard.querySelector('.add-to-cart');
    if (addToCartBtn) {
        const onclickAttr = addToCartBtn.getAttribute('onclick');
        const match = onclickAttr.match(/addToCart\((\d+)/);
        if (match) {
            return parseInt(match[1]);
        }
    }
    return null;
}

// Show product details modal
function showProductDetails(productId) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('Product not found', 'error');
        return;
    }
    
    const productModal = createProductDetailsModal(product);
    document.body.appendChild(productModal);
    
    setTimeout(() => {
        productModal.classList.add('open');
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
}

// Get product by ID
function getProductById(productId) {
    // Mock product data - in real implementation, this would come from API
    const products = [
        {
            id: 1,
            title: 'Ganesha Marble Idol',
            description: 'Handcrafted marble Ganesha idol for home temple. Made from pure Makrana marble with intricate detailing. Blessed by priests before delivery.',
            price: 1500,
            originalPrice: 2000,
            image: 'images/products/ganesha-idol.jpg',
            category: 'idols',
            badge: 'Blessed',
            images: [
                'images/products/ganesha-idol.jpg',
                'images/products/ganesha-idol-2.jpg',
                'images/products/ganesha-idol-3.jpg'
            ],
            specifications: {
                'Material': 'Pure Makrana Marble',
                'Height': '8 inches',
                'Weight': '2.5 kg',
                'Origin': 'Rajasthan, India',
                'Blessing': 'Temple Blessed'
            },
            benefits: [
                'Removes obstacles from life',
                'Brings prosperity and success',
                'Enhances wisdom and knowledge',
                'Protects from negative energies'
            ],
            reviews: [
                {
                    user: 'Priya Sharma',
                    rating: 5,
                    comment: 'Beautiful idol with amazing craftsmanship. Highly recommended!',
                    date: '2024-01-15'
                },
                {
                    user: 'Rajesh Kumar',
                    rating: 5,
                    comment: 'Perfect for home temple. Good quality marble.',
                    date: '2024-01-10'
                }
            ]
        },
        {
            id: 2,
            title: 'Om Sacred Pendant',
            description: 'Pure silver Om pendant with authentic gemstone. Handcrafted by skilled artisans with traditional techniques.',
            price: 800,
            originalPrice: 1200,
            image: 'images/products/om-pendant.jpg',
            category: 'jewelry',
            badge: 'Popular',
            images: [
                'images/products/om-pendant.jpg',
                'images/products/om-pendant-2.jpg'
            ],
            specifications: {
                'Material': '92.5% Sterling Silver',
                'Gemstone': 'Natural Ruby',
                'Chain Length': '18 inches',
                'Pendant Size': '1.2 x 1.2 inches',
                'Weight': '15 grams'
            },
            benefits: [
                'Enhances spiritual energy',
                'Provides protection',
                'Improves concentration',
                'Brings peace and harmony'
            ],
            reviews: [
                {
                    user: 'Meera Patel',
                    rating: 4,
                    comment: 'Beautiful pendant, good quality silver.',
                    date: '2024-01-12'
                }
            ]
        }
        // Add more products as needed
    ];
    
    return products.find(p => p.id === productId);
}

// Create product details modal
function createProductDetailsModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal product-details-modal';
    modal.id = 'productDetailsModal';
    
    modal.innerHTML = `
        <div class="modal-content product-details-content">
            <div class="modal-header">
                <h3>${product.title}</h3>
                <button class="close-modal" onclick="closeProductDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="product-details-body">
                <div class="product-details-grid">
                    <!-- Product Images -->
                    <div class="product-images">
                        <div class="main-image">
                            <img src="${product.image}" alt="${product.title}" id="mainProductImage" onerror="this.src='images/placeholder.jpg'">
                            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                        </div>
                        ${product.images && product.images.length > 1 ? `
                            <div class="image-thumbnails">
                                ${product.images.map((img, index) => `
                                    <img src="${img}" alt="${product.title}" onclick="changeMainImage('${img}')" class="${index === 0 ? 'active' : ''}" onerror="this.src='images/placeholder.jpg'">
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Product Info -->
                    <div class="product-info-detailed">
                        <div class="product-price-section">
                            <div class="price-display">
                                <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
                            </div>
                            ${product.originalPrice ? `
                                <div class="savings">
                                    You save ₹${(product.originalPrice - product.price).toLocaleString('en-IN')} (${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="product-description-detailed">
                            <p>${product.description}</p>
                        </div>
                        
                        <div class="product-actions-detailed">
                            <div class="quantity-section">
                                <label>Quantity:</label>
                                <div class="quantity-selector">
                                    <button class="quantity-btn" onclick="updateModalQuantity(-1)">-</button>
                                    <input type="number" class="quantity-input" value="1" min="1" id="modalQuantity">
                                    <button class="quantity-btn" onclick="updateModalQuantity(1)">+</button>
                                </div>
                            </div>
                            
                            <div class="action-buttons">
                                <button class="btn btn-primary btn-full" onclick="addToCartFromModal(${product.id}, '${product.title}', ${product.price}, '${product.image}')">
                                    <i class="fas fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                                <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})">
                                    <i class="fas fa-heart"></i>
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>
                        
                        <!-- Specifications -->
                        ${product.specifications ? `
                            <div class="product-specifications">
                                <h4>Specifications</h4>
                                <div class="specs-grid">
                                    ${Object.entries(product.specifications).map(([key, value]) => `
                                        <div class="spec-item">
                                            <span class="spec-label">${key}:</span>
                                            <span class="spec-value">${value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        <!-- Benefits -->
                        ${product.benefits ? `
                            <div class="product-benefits">
                                <h4>Spiritual Benefits</h4>
                                <ul>
                                    ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Reviews Section -->
                ${product.reviews && product.reviews.length > 0 ? `
                    <div class="product-reviews">
                        <h4>Customer Reviews</h4>
                        <div class="reviews-list">
                            ${product.reviews.map(review => `
                                <div class="review-item">
                                    <div class="review-header">
                                        <div class="reviewer-name">${review.user}</div>
                                        <div class="review-rating">
                                            ${generateStarRating(review.rating)}
                                        </div>
                                        <div class="review-date">${formatDate(new Date(review.date))}</div>
                                    </div>
                                    <div class="review-comment">${review.comment}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    return modal;
}

// Change main product image
window.changeMainImage = function(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.image-thumbnails img');
    
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update active thumbnail
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
};

// Update modal quantity
window.updateModalQuantity = function(change) {
    const quantityInput = document.getElementById('modalQuantity');
    if (quantityInput) {
        let currentValue = parseInt(quantityInput.value);
        const newValue = Math.max(1, currentValue + change);
        quantityInput.value = newValue;
    }
};

// Add to cart from modal
window.addToCartFromModal = function(productId, title, price, image) {
    const quantityInput = document.getElementById('modalQuantity');
    const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
    
    // Use the existing addToCart function but with custom quantity
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
        showNotification(`Updated ${title} quantity in cart`, 'success');
    } else {
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
    
    // Save cart and update display
    localStorage.setItem('divineCart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Close modal and show cart
    closeProductDetailsModal();
    setTimeout(() => {
        openCart();
    }, 300);
};

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Close product details modal
function closeProductDetailsModal() {
    const modal = document.getElementById('productDetailsModal');
    if (modal) {
        modal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Handle service clicks
function handleServiceClick(serviceName) {
    switch (serviceName) {
        case 'Online Darshan':
            scrollToSection('darshan');
            break;
        case 'Book Puja':
            scrollToSection('puja');
            break;
        case 'Consultation':
            scrollToSection('consultation');
            break;
        case 'Sacred Products':
            scrollToSection('products');
            break;
        default:
            showNotification(`${serviceName} feature coming soon!`, 'info');
    }
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Book Puja function
function bookPuja(pujaName, pujaPrice) {
    requireAuth(() => {
        const pujaModal = createPujaBookingModal(pujaName, pujaPrice);
        document.body.appendChild(pujaModal);
        
        setTimeout(() => {
            pujaModal.classList.add('open');
            document.getElementById('overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 100);
    });
}

// Create puja booking modal
function createPujaBookingModal(pujaName, pujaPrice) {
    const modal = document.createElement('div');
    modal.className = 'modal puja-booking-modal';
    modal.id = 'pujaBookingModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book ${pujaName}</h3>
                <button class="close-modal" onclick="closePujaBookingModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="booking-content">
                <div class="puja-info">
                    <h4>${pujaName}</h4>
                    <p class="puja-price">${pujaPrice}</p>
                </div>
                
                <form id="pujaBookingForm">
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <select name="time" required>
                            <option value="">Select Time</option>
                            <option value="06:00">6:00 AM</option>
                            <option value="07:00">7:00 AM</option>
                            <option value="08:00">8:00 AM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Special Requests (Optional)</label>
                        <textarea name="requests" rows="3" placeholder="Any specific prayers or requirements..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closePujaBookingModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Book Puja (${pujaPrice})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Bind form submission
    const form = modal.querySelector('#pujaBookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handlePujaBooking(e, pujaName, pujaPrice);
    });
    
    return modal;
}

// Handle puja booking
function handlePujaBooking(e, pujaName, pujaPrice) {
    const formData = new FormData(e.target);
    const bookingData = {
        type: 'puja',
        service: pujaName,
        price: pujaPrice,
        date: formData.get('date'),
        time: formData.get('time'),
        requests: formData.get('requests'),
        customer: getCurrentUser(),
        bookingId: generateBookingId(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Save booking
    const bookings = JSON.parse(localStorage.getItem('divineBookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('divineBookings', JSON.stringify(bookings));
    
    closePujaBookingModal();
    showNotification(`${pujaName} booked successfully for ${bookingData.date}`, 'success');
}

// Book consultation function
function bookConsultation(consultantName, consultantPrice) {
    requireAuth(() => {
        const consultationModal = createConsultationBookingModal(consultantName, consultantPrice);
        document.body.appendChild(consultationModal);
        
        setTimeout(() => {
            consultationModal.classList.add('open');
            document.getElementById('overlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 100);
    });
}

// Create consultation booking modal
function createConsultationBookingModal(consultantName, consultantPrice) {
    const modal = document.createElement('div');
    modal.className = 'modal consultation-booking-modal';
    modal.id = 'consultationBookingModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Consultation</h3>
                <button class="close-modal" onclick="closeConsultationBookingModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="booking-content">
                <div class="consultant-info">
                    <h4>${consultantName}</h4>
                    <p class="consultation-price">${consultantPrice}</p>
                </div>
                
                <form id="consultationBookingForm">
                    <div class="form-group">
                        <label>Consultation Type</label>
                        <select name="type" required>
                            <option value="">Select Type</option>
                            <option value="astrology">Astrology Reading</option>
                            <option value="numerology">Numerology</option>
                            <option value="tarot">Tarot Reading</option>
                            <option value="spiritual">Spiritual Guidance</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Preferred Date</label>
                        <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    
                    <div class="form-group">
                        <label>Preferred Time</label>
                        <select name="time" required>
                            <option value="">Select Time</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Questions/Concerns (Optional)</label>
                        <textarea name="questions" rows="3" placeholder="What would you like to discuss?"></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeConsultationBookingModal()">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Book Consultation (${consultantPrice})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Bind form submission
    const form = modal.querySelector('#consultationBookingForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleConsultationBooking(e, consultantName, consultantPrice);
    });
    
    return modal;
}

// Handle consultation booking
function handleConsultationBooking(e, consultantName, consultantPrice) {
    const formData = new FormData(e.target);
    const bookingData = {
        type: 'consultation',
        consultant: consultantName,
        price: consultantPrice,
        consultationType: formData.get('type'),
        date: formData.get('date'),
        time: formData.get('time'),
        questions: formData.get('questions'),
        customer: getCurrentUser(),
        bookingId: generateBookingId(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Save booking
    const bookings = JSON.parse(localStorage.getItem('divineBookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('divineBookings', JSON.stringify(bookings));
    
    closeConsultationBookingModal();
    showNotification(`Consultation with ${consultantName} booked successfully`, 'success');
}

// Initialize wishlist
function initializeWishlist() {
    // Wishlist functionality can be expanded here
}

// Toggle wishlist
function toggleWishlist(productId) {
    requireAuth(() => {
        const wishlist = JSON.parse(localStorage.getItem('divineWishlist')) || [];
        const productIndex = wishlist.findIndex(item => item.id === productId);
        
        if (productIndex > -1) {
            wishlist.splice(productIndex, 1);
            showNotification('Removed from wishlist', 'info');
        } else {
            const product = getProductById(productId);
            if (product) {
                wishlist.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    addedAt: new Date().toISOString()
                });
                showNotification('Added to wishlist', 'success');
            }
        }
        
        localStorage.setItem('divineWishlist', JSON.stringify(wishlist));
    });
}

// Initialize product comparison
function initializeProductComparison() {
    // Product comparison functionality can be expanded here
}

// Generate booking ID
function generateBookingId() {
    return 'BK' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Close modals
function closePujaBookingModal() {
    const modal = document.getElementById('pujaBookingModal');
    if (modal) {
        modal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    }
}

function closeConsultationBookingModal() {
    const modal = document.getElementById('consultationBookingModal');
    if (modal) {
        modal.classList.remove('open');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.remove(), 300);
    }
}

// Export functions for global use
window.productFunctions = {
    showProductDetails,
    toggleWishlist,
    bookPuja,
    bookConsultation,
    closeProductDetailsModal,
    closePujaBookingModal,
    closeConsultationBookingModal
};