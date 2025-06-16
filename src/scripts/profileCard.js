export default function initProfileCard() {
    const wrap = document.querySelector(".pc-card-wrapper");
    const card = document.querySelector(".pc-card");

    if (!wrap || !card) return;

    const ANIMATION_CONFIG = {
        SMOOTH_DURATION: 600,
        INITIAL_DURATION: 1500,
        INITIAL_X_OFFSET: 70,
        INITIAL_Y_OFFSET: 60,
    };

    const clamp = (value, min = 0, max = 100) => Math.min(Math.max(value, min), max);
    const round = (value, precision = 3) => parseFloat(value.toFixed(precision));
    const adjust = (value, fromMin, fromMax, toMin, toMax) => 
        round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        const percentX = clamp((100 / width) * offsetX);
        const percentY = clamp((100 / height) * offsetY);
        const centerX = percentX - 50;
        const centerY = percentY - 50;
        
        // Calculate distance from center for opacity effects
        const distance = Math.hypot(centerX, centerY);
        const fromCenter = clamp(distance / 50, 0, 1);
        const fromLeft = clamp(percentX / 100, 0, 1);
        const fromTop = clamp(percentY / 100, 0, 1);

        const properties = {
            "--pointer-x": `${percentX}%`,
            "--pointer-y": `${percentY}%`,
            "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
            "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
            "--pointer-from-center": `${fromCenter}`,
            "--pointer-from-left": `${fromLeft}`,
            "--pointer-from-top": `${fromTop}`,
            "--rotate-x": `${round(-(centerX / 5))}deg`,
            "--rotate-y": `${round(centerY / 4)}deg`,
        };

        Object.entries(properties).forEach(([property, value]) => {
            wrap.style.setProperty(property, value);
        });
    };

    const createSmoothAnimation = (duration, startX, startY) => {
        const startTime = performance.now();
        const rect = wrap.getBoundingClientRect();
        const targetX = rect.width / 2;
        const targetY = rect.height / 2;

        const animationLoop = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = clamp(elapsed / duration, 0, 1);
            const easedProgress = easeInOutCubic(progress);
            const currentX = adjust(easedProgress, 0, 1, startX, targetX);
            const currentY = adjust(easedProgress, 0, 1, startY, targetY);

            updateCardTransform(currentX, currentY);

            if (progress < 1) {
                rafId = requestAnimationFrame(animationLoop);
            }
        };
        rafId = requestAnimationFrame(animationLoop);
    };

    const cancelAnimation = () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };

    // Event handlers
    const handlePointerEnter = () => {
        cancelAnimation();
        wrap.classList.add("active");
        card.classList.add("active");
    };

    const handlePointerMove = (event) => {
        if (!wrap.classList.contains("active")) return;
        
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        
        updateCardTransform(offsetX, offsetY);
    };

    const handlePointerLeave = (event) => {
        const rect = card.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        
        createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, offsetX, offsetY);
        wrap.classList.remove("active");
        card.classList.remove("active");
    };

    // Add modern pointer events
    card.addEventListener("pointerenter", handlePointerEnter);
    card.addEventListener("pointermove", handlePointerMove);
    card.addEventListener("pointerleave", handlePointerLeave);

    // Fallback for older browsers
    card.addEventListener("mouseenter", handlePointerEnter);
    card.addEventListener("mousemove", handlePointerMove);
    card.addEventListener("mouseleave", handlePointerLeave);

    // Touch support
    let touchStarted = false;
    
    card.addEventListener("touchstart", (event) => {
        event.preventDefault();
        touchStarted = true;
        handlePointerEnter();
        
        const touch = event.touches[0];
        if (touch) {
            const rect = card.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            updateCardTransform(offsetX, offsetY);
        }
    });

    card.addEventListener("touchmove", (event) => {
        if (!touchStarted) return;
        event.preventDefault();
        
        const touch = event.touches[0];
        if (touch) {
            const rect = card.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            updateCardTransform(offsetX, offsetY);
        }
    });

    card.addEventListener("touchend", (event) => {
        if (!touchStarted) return;
        event.preventDefault();
        touchStarted = false;
        
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, centerX, centerY);
        wrap.classList.remove("active");
        card.classList.remove("active");
    });

    // Initialize card position
    const initializeCard = () => {
        const rect = wrap.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            setTimeout(initializeCard, 100);
            return;
        }
        
        const initialX = rect.width - ANIMATION_CONFIG.INITIAL_X_OFFSET;
        const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
        
        updateCardTransform(initialX, initialY);
        
        // Start initial animation after a short delay
        setTimeout(() => {
            createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY);
        }, 200);
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCard);
    } else {
        initializeCard();
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            cancelAnimation();
            const rect = wrap.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            updateCardTransform(centerX, centerY);
        }, 150);
    });

    // Make contact button functional
    const contactBtn = document.querySelector('.pc-contact-btn');
    if (contactBtn) {
        contactBtn.style.pointerEvents = 'auto';
        contactBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}