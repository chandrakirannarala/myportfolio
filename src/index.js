import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import initProfileCard from "./scripts/profileCard";
import initDecryptedText from "./scripts/variableProximity";
import initVariableProximity from "./scripts/variableProximity";
import initLetterGlitch from "./scripts/letterGlitch";

// Initialize all components
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
initProfileCard();
initVariableProximity(); 
initLetterGlitch();

// Initialize the Decrypted Text Effect
document.addEventListener('DOMContentLoaded', () => {
    const decryptedElements = document.querySelectorAll('.decrypted-text');
    decryptedElements.forEach(initDecryptedText);
});

// Enhanced Night Mode Toggle
const initDarkMode = () => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    if (!toggleSwitch) {
        console.warn('Dark mode toggle not found');
        return;
    }

    // Function to apply dark mode
    const applyDarkMode = (isDark) => {
        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
            toggleSwitch.checked = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-mode');
            toggleSwitch.checked = false;
        }
    };

    // Get saved theme preference or default to system preference
    const getSavedTheme = () => {
        const saved = localStorage.getItem('theme');
        
        // If no saved preference, check system preference
        if (!saved) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
            return 'light';
        }
        
        return saved;
    };

    // Initialize theme immediately to prevent flash
    const currentTheme = getSavedTheme();
    applyDarkMode(currentTheme === 'dark');

    // Theme toggle function
    const switchTheme = (e) => {
        const isDark = e.target.checked;
        const theme = isDark ? 'dark' : 'light';
        
        applyDarkMode(isDark);
        localStorage.setItem('theme', theme);
        
        // Dispatch custom event for components that need to react to theme changes
        window.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme, isDark } 
        }));
    };

    // Listen for toggle changes
    toggleSwitch.addEventListener('change', switchTheme, false);

    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Only apply system theme if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                applyDarkMode(e.matches);
            }
        });
    }
};

// Initialize dark mode immediately
initDarkMode();

// Also ensure it's applied when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});