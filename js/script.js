document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Logic ---
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
    const protectedPages = [];
    const currentPage = window.location.pathname.split('/').pop().toLowerCase(); // Normalize to lowercase

    // 1. Auth Check: Redirect to login if unauthenticated on a protected page
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
        window.location.href = 'login.html';
    }

    // 2. Login Flow (for login.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        });

        // Demo Login Handler
        const demoLoginBtn = document.getElementById('demoLoginBtn');
        if (demoLoginBtn) {
            demoLoginBtn.addEventListener('click', () => {
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');

                emailInput.value = 'demo@alumini.com';
                passwordInput.value = 'password123';

                // Simulate a slight delay for effect, then submit
                setTimeout(() => {
                    loginForm.dispatchEvent(new Event('submit'));
                }, 300);
            });
        }
    }

    // 3. Signup Flow (for signup.html)
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Simulate successful registration and login
            localStorage.setItem('isLoggedIn', 'true');
            alert('Account created successfully! Redirecting to Dashboard...');
            window.location.href = 'dashboard.html';
        });
    }

    // 4. Logout Flow & Navbar State
    const signInBtn = document.querySelector('.nav-item .btn-primary');
    // Find logout link by text content for better reliability
    const logoutLink = Array.from(document.querySelectorAll('.dropdown-item'))
        .find(link => link.textContent.trim() === 'Logout');
    
    // Handle main navigation logout button
    if (signInBtn) {
        if (isAuthenticated) {
            // User is signed in: Change "Sign In" to "Sign Out"
            signInBtn.textContent = 'Sign Out';
            signInBtn.classList.replace('btn-primary', 'btn-outline-danger'); // Optional: change style

            signInBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior if any
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            });
        } else {
            // User is signed out: Ensure it links to login
            signInBtn.addEventListener('click', () => {
                window.location.href = 'login.html';
            });
        }
    }
    
    // Handle dropdown logout link (for pages like directory.html)
    // This should work regardless of authentication state
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Logout clicked from dropdown'); // Debug log
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    } else {
        console.log('Logout link not found'); // Debug log
    }

    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');

    // Check local storage or system preference
    // Check local storage
    const savedTheme = localStorage.getItem('theme');

    // Default to light, only enable dark if explicitly saved
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Toggle Theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Toggle Icon
            if (newTheme === 'dark') {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Active Link Management
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1'; // Ensure it stays visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0'; // Initial state
        observer.observe(el);
    });

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Mobile Navigation Close Button
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Add mobile Home1 and Home2 menu items
    function addMobileHomeItems() {
        if (window.innerWidth <= 1024 && navbarCollapse && !navbarCollapse.querySelector('.mobile-home1')) {
            // Create Home1 menu item
            const home1Item = document.createElement('li');
            home1Item.className = 'nav-item mobile-home1';
            home1Item.innerHTML = '<a class="nav-link" href="index.html">Home 1</a>';
            
            // Create Home2 menu item
            const home2Item = document.createElement('li');
            home2Item.className = 'nav-item mobile-home2';
            home2Item.innerHTML = '<a class="nav-link" href="home2.html">Home 2</a>';
            
            // Insert at the beginning of navbar-nav
            const navbarNav = navbarCollapse.querySelector('.navbar-nav');
            if (navbarNav) {
                navbarNav.insertBefore(home1Item, navbarNav.firstChild);
                navbarNav.insertBefore(home2Item, home1Item.nextSibling);
            }
        }
    }
    
    // Remove mobile Home1 and Home2 menu items on desktop
    function removeMobileHomeItems() {
        const home1Item = navbarCollapse?.querySelector('.mobile-home1');
        const home2Item = navbarCollapse?.querySelector('.mobile-home2');
        if (home1Item && window.innerWidth > 1024) {
            home1Item.remove();
        }
        if (home2Item && window.innerWidth > 1024) {
            home2Item.remove();
        }
    }
    
    // Add close button to mobile navigation
    function addCloseButton() {
        if (window.innerWidth <= 1024 && navbarCollapse && !navbarCollapse.querySelector('.mobile-close-btn')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-close-btn';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute('aria-label', 'Close navigation');
            navbarCollapse.appendChild(closeBtn);
            
            // Add click event to close button
            closeBtn.addEventListener('click', () => {
                // Start closing animation
                navbarCollapse.classList.remove('show');
                
                // Delay actual hiding to allow transition to complete
                setTimeout(() => {
                    if (!navbarCollapse.classList.contains('show')) {
                        navbarCollapse.style.display = 'none';
                    }
                }, 400); // Match CSS transition duration
            });
        }
    }
    
    // Handle navbar toggle click
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Closing
                navbarCollapse.classList.remove('show');
                setTimeout(() => {
                    if (!navbarCollapse.classList.contains('show')) {
                        navbarCollapse.style.display = 'none';
                    }
                }, 400);
            } else {
                // Opening
                navbarCollapse.style.display = 'block';
                setTimeout(() => {
                    navbarCollapse.classList.add('show');
                }, 10); // Small delay to ensure display is set before adding show class
            }
        });
    }
    
    // Remove close button on desktop
    function removeCloseButton() {
        const closeBtn = navbarCollapse?.querySelector('.mobile-close-btn');
        if (closeBtn && window.innerWidth > 1024) {
            closeBtn.remove();
        }
    }
    
    // Handle mobile navigation
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Closing
                navbarCollapse.classList.remove('show');
                setTimeout(() => {
                    if (!navbarCollapse.classList.contains('show')) {
                        navbarCollapse.style.display = 'none';
                    }
                }, 400);
            } else {
                // Opening
                navbarCollapse.style.display = 'block';
                setTimeout(() => {
                    navbarCollapse.classList.add('show');
                }, 10); // Small delay to ensure display is set before adding show class
            }
            // Add close button when opening
            setTimeout(addCloseButton, 10);
        });
        
        // Initial setup
        addMobileHomeItems();
        addCloseButton();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            addMobileHomeItems();
            removeMobileHomeItems();
            addCloseButton();
            removeCloseButton();
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navbarCollapse.classList.contains('show') && 
                !navbarCollapse.contains(e.target) && 
                !navbarToggler.contains(e.target)) {
                navbarCollapse.classList.remove('show');
                setTimeout(() => {
                    if (!navbarCollapse.classList.contains('show')) {
                        navbarCollapse.style.display = 'none';
                    }
                }, 400);
                setTimeout(removeCloseButton, 300);
            }
        });
    }
    
    // Sidebar Toggle
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.dashboard-sidebar');

if (sidebarToggle && sidebar) {

    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent immediate close
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside (mobile/tablet)
    document.addEventListener('click', (e) => {
        if (
            window.innerWidth < 992 &&
            sidebar.classList.contains('show') &&
            !sidebar.contains(e.target) &&
            !sidebarToggle.contains(e.target)   // ✅ FIXED HERE
        ) {
            sidebar.classList.remove('show');
        }
    });
}

});
