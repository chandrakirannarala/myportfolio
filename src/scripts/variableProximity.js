// This module handles the interactive variable font effect.

// Stores the current mouse position.
const mousePosition = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => {
  mousePosition.x = ev.clientX;
  mousePosition.y = ev.clientY;
});
window.addEventListener("touchmove", (ev) => {
  const touch = ev.touches[0];
  mousePosition.x = touch.clientX;
  mousePosition.y = touch.clientY;
});

/**
 * Initializes the variable proximity effect on a single element.
 * @param {HTMLElement} el - The target element with data attributes.
 */
function initVariableText(el) {
  let label = el.dataset.text;
  const fromSettings = el.dataset.fromSettings;
  const toSettings = el.dataset.toSettings;
  const radius = parseInt(el.dataset.radius, 10);
  const falloff = "linear";

  const letterRefs = [];

  // Find and mark the text to be highlighted (e.g., "[[Your Name]]").
  const highlightRegex = /\[\[(.*?)\]\]/;
  const match = label.match(highlightRegex);
  let highlightStartIndex = -1;
  let highlightEndIndex = -1;

  if (match) {
    const highlightContent = match[1];
    highlightStartIndex = label.indexOf(match[0]);
    // The new label is the original string without the [[...]] markers.
    label = label.replace(highlightRegex, highlightContent);
    highlightEndIndex = highlightStartIndex + highlightContent.length;
  }

  // Parse font variation settings string into a map.
  const parseSettings = (settingsStr) =>
    new Map(
      settingsStr.split(",").map(s => {
        const [name, value] = s.trim().split(" ");
        return [name.replace(/['"]/g, ""), parseFloat(value)];
      })
    );

  const fromSettingsMap = parseSettings(fromSettings);
  const toSettingsMap = parseSettings(toSettings);

  // Prepare settings for interpolation.
  const parsedSettings = Array.from(fromSettingsMap.entries()).map(([axis, fromValue]) => ({
    axis,
    fromValue,
    toValue: toSettingsMap.get(axis) ?? fromValue,
  }));

  // Split text into words to preserve spaces and handle highlighting.
  el.innerHTML = ''; // Clear original text
  const words = label.split(' ');
  let charIndex = 0; // Keep track of the character index in the full string.

  words.forEach((word, wordIndex) => {
    const wordWrapper = document.createElement('span');
    wordWrapper.style.display = 'inline-block';
    wordWrapper.style.whiteSpace = 'nowrap';

    word.split('').forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      span.style.fontVariationSettings = fromSettings;

      // Add highlight class if the character is part of the name.
      if (highlightStartIndex !== -1 && charIndex >= highlightStartIndex && charIndex < highlightEndIndex) {
        span.classList.add('name-highlight');
      }

      wordWrapper.appendChild(span);
      letterRefs.push(span);
      charIndex++;
    });

    el.appendChild(wordWrapper);

    // Add a space after each word, except the last one.
    if (wordIndex < words.length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      el.appendChild(space);
      charIndex++; // Increment for the space character.
    }
  });

  // Add a hidden space for screen readers.
  const srOnlySpan = document.createElement('span');
  srOnlySpan.textContent = ' ';
  srOnlySpan.classList.add('sr-only');
  el.appendChild(srOnlySpan);

  // Animation loop.
  function animate() {
    letterRefs.forEach((letterRef) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        (mousePosition.x - letterCenterX) ** 2 +
        (mousePosition.y - letterCenterY) ** 2
      );

      // If the mouse is outside the radius, reset to initial state.
      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromSettings;
        return;
      }

      // Calculate the influence based on distance (falloff).
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      let falloffValue;
      switch (falloff) {
        case "exponential": falloffValue = norm ** 2; break;
        case "gaussian": falloffValue = Math.exp(-((distance / (radius / 2)) ** 2) / 2); break;
        default: falloffValue = norm;
      }

      // Interpolate and apply the new font settings.
      const newSettings = parsedSettings.map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      letterRef.style.fontVariationSettings = newSettings;
    });

    requestAnimationFrame(animate);
  }

  // Start the animation.
  requestAnimationFrame(animate);
}

// Export a function that initializes the effect on all relevant elements.
export default function initVariableProximity() {
  const elements = document.querySelectorAll('.variable-proximity-text');
  elements.forEach(initVariableText);
}
