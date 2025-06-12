import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";
import initProfileCard from "./scripts/profileCard";
import initDecryptedText from "./scripts/variableProximity";
import initVariableProximity from "./scripts/variableProximity";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();
initProfileCard();
initVariableProximity(); 

// Initialize the Decrypted Text Effect
document.addEventListener('DOMContentLoaded', () => {
    const decryptedElements = document.querySelectorAll('.decrypted-text');
    decryptedElements.forEach(initDecryptedText);
  });

// Night Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark-mode');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark-mode');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);