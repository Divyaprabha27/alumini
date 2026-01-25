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

    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
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
});
