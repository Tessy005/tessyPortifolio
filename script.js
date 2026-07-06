(function() {
    'use strict';

    // ---- DOM refs ----
    const navLinks = document.querySelectorAll('.nav-list a');
    const sections = document.querySelectorAll('.page-section');
    const darkToggle = document.getElementById('darkToggle');
    const mobileToggle = document.getElementById('mobileToggle');
    const navList = document.getElementById('navList');
    const contactForm = document.getElementById('contactForm');
    const whatsappBtn = document.getElementById('whatsappBtn');

    // ---- Page navigation ----
    function navigateTo(pageId) {
        // Hide all sections
        sections.forEach(sec => sec.classList.remove('active'));

        // Show target
        const target = document.getElementById('page-' + pageId);
        if (target) target.classList.add('active');

        // Update nav links
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === pageId);
        });

        // Close mobile menu
        navList.classList.remove('open');

        // Scroll to top of portfolio
        document.querySelector('.portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update URL hash
        history.pushState(null, '', '#' + pageId);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) navigateTo(page);
        });
    });

    // Handle hash on load
    function handleHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById('page-' + hash)) {
            navigateTo(hash);
        } else {
            navigateTo('home');
        }
    }

    // Handle logo click
    document.querySelector('.nav-logo')?.addEventListener('click', function(e) {
        e.preventDefault();
        navigateTo('home');
    });

    // ---- Mobile toggle ----
    mobileToggle.addEventListener('click', function() {
        navList.classList.toggle('open');
        const icon = this.querySelector('i');
        icon.className = navList.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });

    // ---- Dark mode ----
    darkToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        icon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'true' : 'false');
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkToggle.querySelector('i').className = 'fas fa-sun';
    }

    // ---- Contact form ----
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('inputName').value.trim();
        const email = document.getElementById('inputEmail').value.trim();
        const subject = document.getElementById('inputSubject').value.trim() || 'Portfolio Inquiry';
        const message = document.getElementById('inputMessage').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all required fields (name, email, message).');
            return;
        }

        const mailto = `mailto:tessy9254@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        )}`;
        window.location.href = mailto;
    });

    // ---- WhatsApp button ----
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const phone = '254111909015';
        const msg = encodeURIComponent('Hi Tessy, I came across your portfolio and would like to connect!');
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    });

    // ---- Handle hash changes ----
    window.addEventListener('hashchange', handleHash);

    // ---- Init ----
    handleHash();

    // ---- Close mobile menu on resize ----
    window.addEventListener('resize', function() {
        if (window.innerWidth > 820 && navList.classList.contains('open')) {
            navList.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    // ---- Keyboard shortcut: Escape closes mobile menu ----
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navList.classList.contains('open')) {
            navList.classList.remove('open');
            mobileToggle.querySelector('i').className = 'fas fa-bars';
        }
    });

    console.log('%c👋 Tessy Mwangi Portfolio', 'font-size:1.4rem;font-weight:700;color:#1e4a7a;');
    console.log('%c📍 Mombasa, Kenya · Aspiring IT Professional & Web Developer', 'font-size:0.95rem;color:#475569;');
    console.log('%cBuilt with ❤️ · Professional portfolio', 'font-size:0.9rem;color:#475569;');

})();