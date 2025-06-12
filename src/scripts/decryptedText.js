/**
 * Initializes the text decryption effect for a given HTML element.
 * The element must have a `data-text` attribute containing the final text.
 *
 * @param {HTMLElement} element - The element to apply the effect to.
 */
export default function initDecryptedText(element) {
    const originalText = element.dataset.text;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';
    let intervalId = null;
  
    /**
     * Shuffles the text, revealing characters one by one.
     * @param {Set<number>} revealedIndices - A set of indices that have been revealed.
     * @returns {string} - The HTML string with scrambled and revealed characters.
     */
    const shuffleText = (revealedIndices) => {
      return originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (revealedIndices.has(index)) {
            // Use a class for revealed characters for styling
            return `<span class="decrypted-text-revealed">${originalText[index]}</span>`;
          }
          // Use a class for encrypted characters
          const randomChar = characters[Math.floor(Math.random() * characters.length)];
          return `<span class="decrypted-text-encrypted">${randomChar}</span>`;
        })
        .join('');
    };
  
    /**
     * Starts the decryption animation on the element.
     */
    const startAnimation = () => {
      // Prevent multiple intervals from running
      if (intervalId) clearInterval(intervalId);
  
      const revealedIndices = new Set();
      let revealCount = 0;
  
      intervalId = setInterval(() => {
        // Reveal one new character at a time
        if (revealCount < originalText.length) {
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * originalText.length);
          } while (revealedIndices.has(randomIndex) || originalText[randomIndex] === ' ');
          
          revealedIndices.add(randomIndex);
          revealCount = revealedIndices.size;
        }
        
        // Update the display with the new mix of scrambled and revealed text
        element.innerHTML = shuffleText(revealedIndices);
  
        // Stop the animation once all characters are revealed
        if (revealedIndices.size >= originalText.replace(/\s/g, '').length) {
          clearInterval(intervalId);
          element.innerHTML = originalText; // Set to final text
        }
      }, 50); // Animation speed
    };
  
    /**
     * Resets the text to its original state.
     */
    const resetText = () => {
      clearInterval(intervalId);
      intervalId = null;
      element.innerHTML = originalText;
    };
  
    // Trigger the animation on hover
    element.addEventListener('mouseenter', startAnimation);
    // Optional: Reset when the mouse leaves
    // element.addEventListener('mouseleave', resetText);
  }
  