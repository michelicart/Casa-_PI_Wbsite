// Extracted from casa_pi_site_html.html

document.addEventListener('DOMContentLoaded', function () {
    // Animation on scroll
    function onScrollAnimation() {
        const fadeEls = document.querySelectorAll('.fade-in');
        const slideLeftEls = document.querySelectorAll('.slide-in-left');
        const slideRightEls = document.querySelectorAll('.slide-in-right');
        fadeEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
        slideLeftEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
        slideRightEls.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', onScrollAnimation);
    onScrollAnimation();

    // FAQ toggle
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function () {
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            const item = this.parentElement;
            item.classList.add('active');
        });
    });

    // Exit intent popup
    let exitPopupShown = false;
    function showExitPopup() {
        if (!exitPopupShown) {
            document.getElementById('exitPopup').style.display = 'block';
            exitPopupShown = true;
        }
    }
    document.addEventListener('mouseleave', function (e) {
        if (e.clientY < 0) showExitPopup();
    });
    document.getElementById('closeExitPopup').addEventListener('click', function () {
        document.getElementById('exitPopup').style.display = 'none';
    });

    // Countdown timer
    function updateCountdown() {
        const endDate = new Date('2025-05-25T23:59:59-03:00');
        const now = new Date();
        const diff = endDate - now;
        if (diff < 0) {
            document.querySelector('.countdown').style.display = 'none';
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('nav');
    mobileMenuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = '';
        }
    });
});
