// src/scripts/letterGlitch.js

export default function initLetterGlitch() {
    const canvas = document.getElementById("letter-glitch-bg");
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
  
    // CONFIG – tweak these to taste
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$%&@#*+-/<>?";
    const fontSize = 16;           // size of each cell
    const glitchChance = 0.002;     // how often a cell changes character
    const fadeAlpha = 0.79;        // trail strength (higher = faster fade)
    const mainColor = "rgba(0, 255, 0, 0.15)";   // teal-ish (match your accent)
    const secondaryColor = "rgba(0, 255, 81, 0.49)"; // bright cyan for highlights
  
    let width, height, cols, rows, grid = [];
  
    function resizeCanvas() {
      // Note: Changed this to query #hero instead of .hero
      const hero = document.querySelector("#hero"); 
      if (!hero) return;
  
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
  
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  
      initGrid();
    }
  
    function initGrid() {
      cols = Math.ceil(width / fontSize);
      rows = Math.ceil(height / fontSize);
      grid = [];
  
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          grid.push({
            x,
            y,
            char: randomChar(),
            timer: randomInt(5, 40) // frames until next glitch
          });
        }
      }
    }
  
    function randomChar() {
      return letters[Math.floor(Math.random() * letters.length)];
    }
  
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function draw() {
      if (!ctx) return;
  
      // Fade the previous frame
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
      ctx.fillRect(0, 0, width, height);
  
      ctx.textBaseline = "top";
      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", monospace`;
  
      grid.forEach((cell, index) => {
        cell.timer--;
  
        if (cell.timer <= 0 || Math.random() < glitchChance) {
          cell.char = randomChar();
          cell.timer = randomInt(10, 60);
        }
  
        const isHighlight = Math.random() < 0.06;
        ctx.fillStyle = isHighlight ? secondaryColor : mainColor;
  
        const x = cell.x * fontSize;
        const y = cell.y * fontSize;
  
        ctx.fillText(cell.char, x, y);
      });
  
      requestAnimationFrame(draw);
    }
  
    window.addEventListener("resize", resizeCanvas);
  
    // Initialize
    // No need for DOMContentLoaded, as we'll call this from index.js
    resizeCanvas();
    draw();
  }