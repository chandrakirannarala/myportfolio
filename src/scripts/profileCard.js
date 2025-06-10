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
    const adjust = (value, fromMin, fromMax, toMin, toMax) => round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));
    const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

    let rafId = null;

    const updateCardTransform = (offsetX, offsetY) => {
        const width = card.clientWidth;
        const height = card.clientHeight;
        const percentX = clamp((100 / width) * offsetX);
        const percentY = clamp((100 / height) * offsetY);
        const centerX = percentX - 50;
        const centerY = percentY - 50;

        const properties = {
            "--pointer-x": `${percentX}%`,
            "--pointer-y": `${percentY}%`,
            "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
            "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
            "--pointer-from-center": `${clamp(Math.hypot(centerY, centerX) / 50, 0, 1)}`,
            "--rotate-x": `${round(-(centerY / 4))}deg`,
            "--rotate-y": `${round(centerX / 5)}deg`,
        };

        Object.entries(properties).forEach(([property, value]) => {
            wrap.style.setProperty(property, value);
        });
    };

    const createSmoothAnimation = (duration, startX, startY) => {
        const startTime = performance.now();
        const targetX = wrap.clientWidth / 2;
        const targetY = wrap.clientHeight / 2;

        const animationLoop = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = clamp(elapsed / duration);
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

    card.addEventListener("pointerenter", () => {
        cancelAnimation();
        wrap.classList.add("active");
        card.classList.add("active");
    });

    card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        updateCardTransform(event.clientX - rect.left, event.clientY - rect.top);
    });

    card.addEventListener("pointerleave", (event) => {
        createSmoothAnimation(ANIMATION_CONFIG.SMOOTH_DURATION, event.offsetX, event.offsetY);
        wrap.classList.remove("active");
        card.classList.remove("active");
    });

    // Initial animation
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    updateCardTransform(initialX, initialY);
    createSmoothAnimation(ANIMATION_CONFIG.INITIAL_DURATION, initialX, initialY);
}