/**
 * Shimmer Birthday — Interactive Script
 * Dark Luxury • Three Screen Layout
 * Full Features Edition
 */

// ========================================
// Event Configuration (EDIT THIS)
// ========================================
const eventConfig = {
    date: '25 августа 2026',
    day: 'вторник',
    time: '19:00',
    location: 'г.Якутск',
    address: 'ул. Ярославского 39/1',
    rsvpDate: '20 марта',
    telegram: 'tyanda' // Ваш логин Telegram без @
};

// ========================================
// Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeEventDetails();
    initializeScrollAnimations();
    startCountdown();
    initializeRSVP();
    initializeNavbar();
    initializeScrollProgress();
    initializeScrollToTop();
    initializeLazyLoading();
    initializeMusic();
    initializeLightbox();
});

/**
 * Music Player Functionality
 */
function initializeMusic() {
    const music = document.getElementById('bg-music');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    
    if (!music || !toggle) return;

    // Проверка наличия файла
    fetch(music.src, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) console.warn("Аудиофайл не найден! Проверьте путь в index.html.");
        })
        .catch(() => console.warn("Ошибка при проверке аудиофайла"));

    toggle.addEventListener('click', function() {
        if (music.paused) {
            playMusic(music, toggle, icon);
        } else {
            pauseMusic(music, toggle, icon);
        }
    });

    // Автовоспроизведение при первом клике (политика браузеров)
    document.addEventListener('click', function() {
        if (music.paused && !toggle.dataset.manualPause) {
            playMusic(music, toggle, icon);
        }
    }, { once: true });
}

function playMusic(music, toggle, icon) {
    music.play().then(() => {
        toggle.classList.add('playing');
        icon.textContent = '❙❙';
        delete toggle.dataset.manualPause;
    }).catch(e => console.log("Audio play failed:", e));
}

function pauseMusic(music, toggle, icon) {
    music.pause();
    toggle.classList.remove('playing');
    icon.textContent = '▶';
    toggle.dataset.manualPause = 'true';
}

/**
 * Lightbox Gallery Functionality
 */
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImgs = document.querySelectorAll('.gallery img');

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    galleryImgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('show'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
    });
}

/**
 * Initialize event details from config
 */
function initializeEventDetails() {
    const dateEl = document.getElementById('event-date');
    const dayEl = document.getElementById('event-day');
    const timeEl = document.getElementById('event-time');
    const locationEl = document.getElementById('event-location');
    const addressEl = document.getElementById('event-address');
    const rsvpDateEl = document.getElementById('rsvp-date');

    if (dateEl) dateEl.textContent = eventConfig.date;
    if (dayEl) dayEl.textContent = eventConfig.day;
    if (timeEl) timeEl.textContent = eventConfig.time;
    if (locationEl) locationEl.textContent = eventConfig.location;
    if (addressEl) addressEl.textContent = eventConfig.address;
    if (rsvpDateEl) rsvpDateEl.textContent = eventConfig.rsvpDate;
}

/**
 * Navbar functionality
 */
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Scroll Progress Bar
 */
function initializeScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Scroll to Top Button
 */
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll animations with Intersection Observer
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
            }
        });
    }, observerOptions);

    // Observe gallery images
    document.querySelectorAll('.gallery img').forEach(img => {
        observer.observe(img);
    });

    // Observe gift items
    document.querySelectorAll('.gift-item').forEach(item => {
        observer.observe(item);
    });
}

/**
 * Lazy Loading for images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Countdown Timer
// ========================================

/**
 * Start countdown timer
 */
function startCountdown() {
    const eventDate = new Date('2026-08-25T19:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const diff = eventDate - now;
        
        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
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
}

// ========================================
// RSVP Functionality with WhatsApp/Telegram
// ========================================

/**
 * Initialize RSVP buttons
 */
function initializeRSVP() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modal-close');
    const modalMessage = document.getElementById('modal-message');

    if (btnYes) {
        btnYes.addEventListener('click', function() {
            // Показываем модальное окно
            showModal(modal, modalMessage, 'Ура! Жду тебя с нетерпением!<br>Это будет незабываемый вечер!', true);

            // Открываем Telegram с задержкой для iOS
            setTimeout(() => {
                const telegramUrl = `https://t.me/${eventConfig.telegram}`;
                
                // Пробуем открыть в новом окне
                const newWindow = window.open(telegramUrl, '_blank');
                
                // Если браузер заблокировал popup (iOS Safari), перенаправляем в текущем окне
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                    window.location.href = telegramUrl;
                }
            }, 1500);
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', function() {
            showModal(modal, modalMessage, 'Жаль, но я понимаю!<br>Может быть в следующий раз!', false);
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideModal(modal);
        });
    }

    // Close on overlay click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal(modal);
            }
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal(modal);
        }
    });
}

/**
 * Show modal
 */
function showModal(modal, messageEl, message, triggerConfetti) {
    if (!modal) return;
    
    messageEl.innerHTML = message;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

/**
 * Hide modal
 */
function hideModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

/**
 * Send RSVP via WhatsApp
 */
function sendRSVPWhatsApp(response) {
    const message = response === 'yes' 
        ? 'Привет! Я подтверждая, что приду на день рождения! 🎉' 
        : 'Привет! К сожалению, не смогу прийти 😔';
    
    const url = `https://wa.me/${eventConfig.whatsapp || ''}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/**
 * Send RSVP via Telegram
 */
function sendRSVPTelegram(response) {
    const message = response === 'yes'
        ? 'Привет! Я подтверждая, что приду на день рождения! 🎉'
        : 'Привет! К сожалению, не смогу прийти 😔';
    
    const url = `https://t.me/${eventConfig.telegram}`;
    window.open(url, '_blank');
}

// ========================================
// Accessibility
// ========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('scroll-behavior', 'auto');
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
