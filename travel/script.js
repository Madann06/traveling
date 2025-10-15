// script.js
class TravelSchedulingSystem {
    constructor() {
        this.currentUser = null;
        this.bookings = [];
        this.searchResults = [];
        this.packages = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
        this.initializeLucideIcons();
        this.setMinDate();
    }

    initializeLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const departureDate = document.getElementById('departureDate');
        const returnDate = document.getElementById('returnDate');
        
        if (departureDate) {
            departureDate.setAttribute('min', today);
            departureDate.addEventListener('change', () => {
                if (returnDate) {
                    returnDate.setAttribute('min', departureDate.value);
                }
            });
        }
    }

    setupEventListeners() {
        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.page);
                this.setActiveNavLink(link);
            });
        });

        // Mobile navigation toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }

        // Login modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => {
                loginModal.classList.add('active');
            });
        }

        if (closeModal && loginModal) {
            closeModal.addEventListener('click', () => {
                loginModal.classList.remove('active');
            });
        }

        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Search form
        const quickSearchForm = document.getElementById('quickSearchForm');
        if (quickSearchForm) {
            quickSearchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm();
            });
        }

        // Booking form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBooking();
            });
        }

        // Filters
        const priceFilter = document.getElementById('priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('input', (e) => {
                this.updatePriceDisplay(e.target.value);
                this.filterResults();
            });
        }

        const durationFilter = document.getElementById('durationFilter');
        const typeFilter = document.getElementById('typeFilter');
        
        if (durationFilter) {
            durationFilter.addEventListener('change', () => this.filterResults());
        }
        
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterResults());
        }

        // Modal close on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Load section-specific data
        switch(sectionId) {
            case 'search':
                this.displaySearchResults();
                break;
            case 'bookings':
                this.displayBookings();
                break;
            case 'packages':
                this.displayPackages();
                break;
        }
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    handleLogin() {
        // Simulate login
        this.currentUser = {
            name: 'John Doe',
            email: 'john@example.com'
        };

        const loginModal = document.getElementById('loginModal');
        const loginBtn = document.getElementById('loginBtn');
        
        if (loginModal) {
            loginModal.classList.remove('active');
        }
        
        if (loginBtn) {
            loginBtn.textContent = 'Account';
            loginBtn.style.background = '#10b981';
        }

        this.showToast('Login successful! Welcome back.', 'success');
    }

    handleSearch() {
        const fromCity = document.getElementById('fromCity').value;
        const toCity = document.getElementById('toCity').value;
        const departureDate = document.getElementById('departureDate').value;
        const returnDate = document.getElementById('returnDate').value;

        if (!fromCity || !toCity || !departureDate) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Generate search results
        this.generateSearchResults(fromCity, toCity, departureDate, returnDate);
        this.showSection('search');
        this.showToast('Search completed! Found multiple options.', 'success');
    }

    generateSearchResults(from, to, departure, returnDate) {
        const sampleResults = [
            {
                id: 1,
                title: `${from} to ${to} - Premium Package`,
                description: 'Luxury travel experience with 5-star accommodations',
                price: 1299,
                duration: '7 days',
                type: 'relaxation',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                rating: 4.8
            },
            {
                id: 2,
                title: `${from} to ${to} - Adventure Tour`,
                description: 'Exciting adventure activities and cultural experiences',
                price: 899,
                duration: '5 days',
                type: 'adventure',
                image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
                rating: 4.6
            },
            {
                id: 3,
                title: `${from} to ${to} - Cultural Journey`,
                description: 'Immerse yourself in local culture and traditions',
                price: 749,
                duration: '4 days',
                type: 'cultural',
                image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400',
                rating: 4.7
            },
            {
                id: 4,
                title: `${from} to ${to} - Business Travel`,
                description: 'Comfortable business travel with meeting facilities',
                price: 599,
                duration: '3 days',
                type: 'business',
                image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
                rating: 4.5
            }
        ];

        this.searchResults = sampleResults;
    }

    displaySearchResults() {
        const resultsGrid = document.getElementById('resultsGrid');
        if (!resultsGrid || !this.searchResults.length) return;

        resultsGrid.innerHTML = this.searchResults.map(result => `
            <div class="result-card">
                <img src="${result.image}" alt="${result.title}" class="result-image">
                <div class="result-content">
                    <h3 class="result-title">${result.title}</h3>
                    <p class="result-description">${result.description}</p>
                    <div class="result-details">
                        <span class="result-price">$${result.price}</span>
                        <span class="result-duration">${result.duration}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <i data-lucide="star" style="width: 16px; height: 16px; fill: #f59e0b; color: #f59e0b;"></i>
                            <span style="font-size: 0.875rem; color: var(--text-secondary);">${result.rating}</span>
                        </div>
                        <button class="btn-primary" onclick="travelSystem.openBookingModal(${result.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.initializeLucideIcons();
    }

    displayPackages() {
        const packagesGrid = document.getElementById('packagesGrid');
        if (!packagesGrid) return;

        const samplePackages = [
            {
                id: 1,
                title: 'European Grand Tour',
                description: 'Visit 7 countries in 14 days with expert guides and luxury accommodations.',
                price: 3299,
                badge: 'Popular',
                image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400',
                features: ['14 Days', '7 Countries', 'Luxury Hotels', 'Expert Guide', 'All Meals']
            },
            {
                id: 2,
                title: 'Asian Adventure',
                description: 'Explore the diverse cultures and landscapes of Southeast Asia.',
                price: 2499,
                badge: 'Adventure',
                image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                features: ['12 Days', '4 Countries', 'Local Experiences', 'Small Groups', 'Cultural Tours']
            },
            {
                id: 3,
                title: 'Caribbean Paradise',
                description: 'Relax on pristine beaches and enjoy tropical island life.',
                price: 1899,
                badge: 'Relaxation',
                image: 'https://images.unsplash.com/photo-1502780402662-acc01917076e?w=400',
                features: ['10 Days', 'Beach Resort', 'Water Sports', 'Spa Treatments', 'All Inclusive']
            }
        ];

        packagesGrid.innerHTML = samplePackages.map(pkg => `
            <div class="package-card">
                <img src="${pkg.image}" alt="${pkg.title}" class="package-image">
                <div class="package-content">
                    <span class="package-badge">${pkg.badge}</span>
                    <h3 class="package-title">${pkg.title}</h3>
                    <p class="package-description">${pkg.description}</p>
                    <ul class="package-features">
                        ${pkg.features.map(feature => `
                            <li>
                                <i data-lucide="check" style="width: 16px; height: 16px;"></i>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                    <div class="package-footer">
                        <span class="package-price">$${pkg.price}</span>
                        <button class="btn-primary" onclick="travelSystem.openBookingModal(${pkg.id})">
                            Book Package
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        this.initializeLucideIcons();
    }

    displayBookings() {
        const bookingsContainer = document.getElementById('bookingsContainer');
        if (!bookingsContainer) return;

        if (this.bookings.length === 0) {
            bookingsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i data-lucide="calendar-x" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                    <h3>No bookings yet</h3>
                    <p>Start planning your next adventure!</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="travelSystem.showSection('search')">
                        Search Trips
                    </button>
                </div>
            `;
        } else {
            bookingsContainer.innerHTML = this.bookings.map(booking => `
                <div class="booking-card">
                    <div class="booking-info">
                        <h3>${booking.title}</h3>
                        <div class="booking-details">
                            <div class="booking-detail">
                                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                                ${booking.date}
                            </div>
                            <div class="booking-detail">
                                <i data-lucide="users" style="width: 16px; height: 16px;"></i>
                                ${booking.travelers} Travelers
                            </div>
                            <div class="booking-detail">
                                <i data-lucide="dollar-sign" style="width: 16px; height: 16px;"></i>
                                $${booking.price}
                            </div>
                        </div>
                    </div>
                    <div class="booking-status ${booking.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">
                        ${booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </div>
                </div>
            `).join('');
        }

        this.initializeLucideIcons();
    }

    openBookingModal(itemId) {
        const bookingModal = document.getElementById('bookingModal');
        if (bookingModal) {
            bookingModal.classList.add('active');
        }
    }

    handleBooking() {
        const bookingModal = document.getElementById('bookingModal');
        const formData = new FormData(document.getElementById('bookingForm'));
        
        // Create new booking
        const newBooking = {
            id: Date.now(),
            title: 'European Grand Tour',
            date: '2025-06-15',
            travelers: formData.get('travelers') || '2',
            price: 1299,
            status: 'confirmed'
        };

        this.bookings.push(newBooking);
        
        if (bookingModal) {
            bookingModal.classList.remove('active');
        }

        this.showToast('Booking confirmed! Check your email for details.', 'success');
        
        // Clear form
        document.getElementById('bookingForm').reset();
    }

    handleContactForm() {
        // Simulate form submission
        this.showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }

    updatePriceDisplay(value) {
        const priceDisplay = document.querySelector('.price-display');
        if (priceDisplay) {
            priceDisplay.textContent = `$0 - $${value}`;
        }
    }

    filterResults() {
        const priceFilter = document.getElementById('priceFilter');
        const durationFilter = document.getElementById('durationFilter');
        const typeFilter = document.getElementById('typeFilter');

        if (!priceFilter || !durationFilter || !typeFilter) return;

        const maxPrice = parseInt(priceFilter.value);
        const selectedDuration = durationFilter.value;
        const selectedType = typeFilter.value;

        let filteredResults = this.searchResults.filter(result => {
            const priceMatch = result.price <= maxPrice;
            const durationMatch = !selectedDuration || this.matchesDuration(result.duration, selectedDuration);
            const typeMatch = !selectedType || result.type === selectedType;

            return priceMatch && durationMatch && typeMatch;
        });

        this.displayFilteredResults(filteredResults);
    }

    matchesDuration(duration, filter) {
        const days = parseInt(duration);
        switch(filter) {
            case '1-3':
                return days >= 1 && days <= 3;
            case '4-7':
                return days >= 4 && days <= 7;
            case '8+':
                return days >= 8;
            default:
                return true;
        }
    }

    displayFilteredResults(results) {
        const resultsGrid = document.getElementById('resultsGrid');
        if (!resultsGrid) return;

        if (results.length === 0) {
            resultsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i data-lucide="search-x" style="width: 48px; height: 48px; margin-bottom: 1rem;"></i>
                    <h3>No results found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `;
        } else {
            resultsGrid.innerHTML = results.map(result => `
                <div class="result-card">
                    <img src="${result.image}" alt="${result.title}" class="result-image">
                    <div class="result-content">
                        <h3 class="result-title">${result.title}</h3>
                        <p class="result-description">${result.description}</p>
                        <div class="result-details">
                            <span class="result-price">$${result.price}</span>
                            <span class="result-duration">${result.duration}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <i data-lucide="star" style="width: 16px; height: 16px; fill: #f59e0b; color: #f59e0b;"></i>
                                <span style="font-size: 0.875rem; color: var(--text-secondary);">${result.rating}</span>
                            </div>
                            <button class="btn-primary" onclick="travelSystem.openBookingModal(${result.id})">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.initializeLucideIcons();
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const toastIcon = toast.querySelector('.toast-icon');

        if (!toast || !toastMessage) return;

        // Update message
        toastMessage.textContent = message;

        // Update icon and style based on type
        let iconName = 'check-circle';
        let bgColor = 'var(--success-color)';

        switch(type) {
            case 'error':
                iconName = 'x-circle';
                bgColor = 'var(--error-color)';
                break;
            case 'warning':
                iconName = 'alert-triangle';
                bgColor = 'var(--warning-color)';
                break;
            case 'info':
                iconName = 'info';
                bgColor = 'var(--primary-color)';
                break;
        }

        if (toastIcon) {
            toastIcon.setAttribute('data-lucide', iconName);
        }
        
        toast.style.background = bgColor;

        // Show toast
        toast.classList.add('show');

        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);

        this.initializeLucideIcons();
    }

    loadSampleData() {
        // Load some sample search results
        this.searchResults = [
            {
                id: 1,
                title: 'Paris Weekend Getaway',
                description: 'Romantic weekend in the City of Light',
                price: 899,
                duration: '3 days',
                type: 'cultural',
                image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400',
                rating: 4.8
            },
            {
                id: 2,
                title: 'Tokyo Adventure',
                description: 'Experience modern Japan and traditional culture',
                price: 1599,
                duration: '7 days',
                type: 'adventure',
                image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
                rating: 4.9
            }
        ];
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.travelSystem = new TravelSchedulingSystem();
});

// Close booking modal
document.addEventListener('DOMContentLoaded', () => {
    const closeBookingModal = document.getElementById('closeBookingModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (closeBookingModal && bookingModal) {
        closeBookingModal.addEventListener('click', () => {
            bookingModal.classList.remove('active');
        });
    }
});
