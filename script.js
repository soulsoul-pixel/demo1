// Check if user is logged in and display user data
function displayUserData() {
    const userDataSection = document.getElementById('userDataSection');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userCreated = document.getElementById('userCreated');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (!userDataSection) return;
    
    // Check for logged in user
    let currentUser = null;
    const localStorageUser = localStorage.getItem('currentUser');
    const sessionStorageUser = sessionStorage.getItem('currentUser');
    
    if (localStorageUser) {
        currentUser = JSON.parse(localStorageUser);
    } else if (sessionStorageUser) {
        currentUser = JSON.parse(sessionStorageUser);
    }
    
    if (currentUser) {
        // Get full user data from users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const fullUserData = users.find(u => u.email === currentUser.email);
        
        if (fullUserData) {
            // Display user data
            userName.textContent = fullUserData.name;
            userEmail.textContent = fullUserData.email;
            
            // Format creation date
            if (fullUserData.createdAt) {
                const createdDate = new Date(fullUserData.createdAt);
                userCreated.textContent = createdDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else {
                userCreated.textContent = 'N/A';
            }
            
            // Show user data section
            userDataSection.style.display = 'block';
            
            // Update hero title
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.textContent = `Welcome back, ${fullUserData.name}!`;
            }
            
            // Hide Get Started button if logged in
            const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
            if (getStartedBtn && getStartedBtn.textContent.includes('Get Started')) {
                getStartedBtn.style.display = 'none';
            }
        }
    } else {
        userDataSection.style.display = 'none';
    }
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
            alert('You have been logged out successfully!');
            window.location.reload();
        });
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
    displayUserData();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

if (hamburger && navMenu && menuOverlay) {
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Notification Icon Click Handler
const notificationIcon = document.getElementById('notificationIcon');
const notificationBadge = document.getElementById('notificationBadge');

if (notificationIcon && notificationBadge) {
    notificationIcon.addEventListener('click', () => {
        // You can replace this with a dropdown menu or modal
        alert('You have ' + notificationBadge.textContent + ' new notifications!');
        
        // Example: Hide badge after clicking (uncomment to enable)
        // notificationBadge.style.display = 'none';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for sticky navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation (you can enhance this)
    if (name && email && message) {
        // Show success message (you can replace this with actual form submission)
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }
});

// Enhanced scroll animation with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.section-title, .contact-info, .contact-form').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add stagger animation to cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards with delay
document.querySelectorAll('.feature-card, .service-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(el);
});

// Navbar background on scroll with enhanced effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
        }
    }
});

// Consulting Service Card Click Handler
const consultingCard = document.getElementById('consultingCard');
const consultingModal = document.getElementById('consultingModal');
const modalClose = document.getElementById('modalClose');

consultingCard.addEventListener('click', () => {
    consultingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

modalClose.addEventListener('click', () => {
    consultingModal.classList.remove('active');
    document.body.style.overflow = '';
});

consultingModal.addEventListener('click', (e) => {
    if (e.target === consultingModal) {
        consultingModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (consultingModal.classList.contains('active')) {
            consultingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (webDevModal && webDevModal.classList.contains('active')) {
            webDevModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Web Development Service Card Click Handler
const webDevCard = document.getElementById('webDevCard');
const webDevModal = document.getElementById('webDevModal');
const webDevModalClose = document.getElementById('webDevModalClose');

if (webDevCard && webDevModal && webDevModalClose) {
    webDevCard.addEventListener('click', () => {
        webDevModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    webDevModalClose.addEventListener('click', () => {
        webDevModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    webDevModal.addEventListener('click', (e) => {
        if (e.target === webDevModal) {
            webDevModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const terms = document.querySelector('input[name="terms"]').checked;
        
        // Validation
        if (!terms) {
            alert('Please agree to the Terms & Conditions');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            document.getElementById('signup-confirm-password').focus();
            return;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters long!');
            document.getElementById('signup-password').focus();
            return;
        }
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.find(user => user.email === email);
        
        if (userExists) {
            alert('An account with this email already exists!');
            return;
        }
        
        // Store user data
        const newUser = {
            name: name,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };
        
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        // Show success message and redirect to login
        alert('Account created successfully! Please sign in.');
        window.location.href = 'login.html';
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.querySelector('input[name="remember"]').checked;
        
        // Get stored users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user by email
        const user = users.find(u => u.email === email);
        
        if (!user) {
            alert('No account found with this email address. Please sign up first.');
            return;
        }
        
        // Check password
        if (user.password !== password) {
            alert('Incorrect password. Please try again.');
            document.getElementById('password').focus();
            return;
        }
        
        // Store current user session
        if (rememberMe) {
            localStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                name: user.name
            }));
        } else {
            sessionStorage.setItem('currentUser', JSON.stringify({
                email: user.email,
                name: user.name
            }));
        }
        
        // Success - redirect to home page
        alert('Welcome back, ' + user.name + '!');
        window.location.href = 'index.html';
    });
}







