// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    if (!carouselImages.length) return;

    function showImage(index) {
        carouselImages.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextImage() {
        showImage((currentIndex + 1) % carouselImages.length);
    }

    function prevImage() {
        showImage((currentIndex - 1 + carouselImages.length) % carouselImages.length);
    }

    // Create dots
    carouselImages.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('tabindex', '0');
        dot.setAttribute('aria-label', `Selecionar imagem ${i + 1}`);
        dot.addEventListener('click', () => showImage(i));
        dot.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                showImage(i);
            }
        });
        dotsContainer.appendChild(dot);
    });

    // Add event listeners to buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevImage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextImage();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.activeElement.closest('.gallery')) {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });

    // No auto-advance - images only change when arrows are clicked

    // Swipe navigation for mobile
    let startX = null;
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        carousel.addEventListener('touchend', (e) => {
            if (startX === null) return;
            const endX = e.changedTouches[0].clientX;
            if (endX - startX > 50) prevImage();
            if (startX - endX > 50) nextImage();
            startX = null;
        });
    }
});
