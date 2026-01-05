/* ==========================================
   PORTFOLIO JAVASCRIPT
   Interactive features and functionality
   ========================================== */

// ==========================================
// DOCUMENT READY
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initWelcomeScreen();
    initMobileMenu();
    initScrollToTop();
    initSmoothScroll();
    initFormHandling();
    initImageZoom();
    initMusicPlayer();
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initWelcomeScreen() {
    // 1. เลือก Element (ใช้ ID ตามที่ตั้งไว้ใน index.html)
    const enterButton = document.querySelector('#enterButton');
    const welcomeSection = document.querySelector('#welcome');

    // ตรวจสอบว่ามี Element อยู่จริงไหม เพื่อป้องกัน Error
    if (!enterButton || !welcomeSection) return;

    // 2. เมื่อคลิกปุ่ม
    enterButton.addEventListener('click', () => {
        console.log('Enter button clicked'); // เช็คใน Console ว่าปุ่มทำงานไหม
        
        // ทำให้ค่อยๆ จาง (ใช้ Class ของ Tailwind ที่มีอยู่ใน index.html)
        welcomeSection.classList.add('opacity-0');
        
        // ตั้งเวลาให้หายไปหลังจากจางเสร็จ (1000ms ตาม duration ใน HTML)
        setTimeout(() => {
            welcomeSection.classList.add('hidden');
            // หรือจะใช้ welcomeSection.style.display = 'none'; ก็ได้ครับ
        }, 1000); 
    });
}
    // Allow Enter key to also trigger entry
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && welcomeSection.style.display !== 'none' && !welcomeSection.classList.contains('welcome-exit')) {
            console.log('Enter key pressed');
            enterButton.click();
        }
    });
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// ==========================================
// SCROLL TO TOP FUNCTIONALITY
// ==========================================

function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            scrollToTopBtn.classList.remove('opacity-100');
        }
    });

    // Scroll to top when button clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// SMOOTH SCROLL NAVIGATION
// ==========================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==========================================
// FORM HANDLING
// ==========================================

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email');
            return;
        }

        // Show success message
        if (successMessage) {
            successMessage.classList.remove('hidden');
            
            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        }

        // Reset form
        contactForm.reset();

        // Log for demonstration
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// ==========================================
// IMAGE ZOOM FUNCTIONALITY
// ==========================================

function initImageZoom() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');

    if (!modal || !modalImage || !closeModal) return;

    // Get all images in gallery sections
    const galleryImages = document.querySelectorAll('.group img');

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal functions
    function closeImageModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeImageModal);

    // Close modal when clicking outside image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeImageModal();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeImageModal();
        }
    });
}

// ==========================================
// MUSIC PLAYER FUNCTIONALITY
// ==========================================

function initMusicPlayer() {
    // Create audio element
    const audio = new Audio('images/djo-end-of-beginning.mp3');
    audio.volume = 0.7;

    // Get player elements
    const playButton = document.querySelector('[data-music-play]');
    const prevButton = document.querySelector('[data-music-prev]');
    const nextButton = document.querySelector('[data-music-next]');
    const shuffleButton = document.querySelector('[data-music-shuffle]');
    const repeatButton = document.querySelector('[data-music-repeat]');
    const volumeSlider = document.querySelector('[data-music-volume]');
    const progressBar = document.querySelector('[data-music-progress]');
    const currentTimeEl = document.querySelector('[data-music-current-time]');
    const durationEl = document.querySelector('[data-music-duration]');

    if (!playButton) return; // Exit if music player not found

    let isPlaying = false;
    let isShuffle = false;
    let repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one

    // Play/Pause button
    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = '<i class="fas fa-play ml-1"></i>';
            isPlaying = false;
        } else {
            audio.play();
            playButton.innerHTML = '<i class="fas fa-pause ml-1"></i>';
            isPlaying = true;
        }
    });

    // Update progress bar
    audio.addEventListener('timeupdate', function() {
        if (progressBar) {
            const percentage = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = percentage + '%';
        }

        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(audio.currentTime);
        }
    });

    // Update duration
    audio.addEventListener('loadedmetadata', function() {
        if (durationEl) {
            durationEl.textContent = formatTime(audio.duration);
        }
    });

    // Progress bar click
    const progressContainer = document.querySelector('[data-music-progress-container]');
    if (progressContainer) {
        progressContainer.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    }

    // Volume control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            audio.volume = this.value / 100;
            
            // Update volume display
            const volumeDisplay = document.querySelector('[data-music-volume-display]');
            if (volumeDisplay) {
                volumeDisplay.textContent = this.value;
            }
        });
    }

    // Shuffle button
    if (shuffleButton) {
        shuffleButton.addEventListener('click', function() {
            isShuffle = !isShuffle;
            this.classList.toggle('opacity-50');
        });
    }

    // Repeat button
    if (repeatButton) {
        repeatButton.addEventListener('click', function() {
            repeatMode = (repeatMode + 1) % 3;
            this.classList.toggle('opacity-50');
            
            if (repeatMode === 0) {
                audio.loop = false;
            } else if (repeatMode === 1) {
                audio.loop = true;
            } else if (repeatMode === 2) {
                audio.loop = true;
            }
        });
    }

    // Previous button
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            audio.currentTime = 0;
        });
    }

    // Next button (simulate skip)
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
        });
    }

    // End of song
    audio.addEventListener('ended', function() {
        playButton.innerHTML = '<i class="fas fa-play ml-1"></i>';
        isPlaying = false;
        if (repeatMode === 0) {
            audio.currentTime = 0;
        }
    });

    // Copy button
    const copyButton = document.querySelector('[data-music-copy]');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const songInfo = 'End of Beginning - DJO';
            navigator.clipboard.writeText(songInfo).then(() => {
                // Show feedback
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                }, 2000);
            });
        });
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// ==========================================
// ANIMATIONS ON SCROLL (AOS alternative)
// ==========================================

function initAOS() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all section elements
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        observer.observe(section);
    });
}

// ==========================================
// CONSOLE EASTER EGG
// ==========================================

console.log('%cWelcome to Thanadon Jaimuang\'s Portfolio! 👋', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to check out my work on GitHub: https://github.com/AlphaGFX701', 'color: #3b82f6; font-size: 14px;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #a855f7; font-size: 14px;');