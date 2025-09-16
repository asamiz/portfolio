// ========================================
// TERMINAL LOADING ANIMATION
// ========================================

class TerminalLoader {
  constructor() {
    this.init();
  }

  init() {
    this.setupTerminalBootSequence();
  }

  // ========================================
  // TERMINAL BOOT SEQUENCE
  // ========================================
  setupTerminalBootSequence() {
    const bootOutput = [
      { text: '> Initializing portfolio...', type: 'info', delay: 1000 },
      { text: '> Loading React Native experience...', type: 'info', delay: 1300 },
      { text: '> Compiling 6+ years of expertise...', type: 'info', delay: 1600 },
      { text: '> Rendering Al Rajhi Bank projects...', type: 'success', delay: 1900 },
      { text: '> Mounting skill components...', type: 'info', delay: 2200 },
      { text: '> Portfolio build complete!', type: 'success', delay: 2500 },
      { text: '> Welcome to Ahmed Sami\'s portfolio', type: 'success', delay: 2800 },
    ];

    this.animateBootSequence(bootOutput);
  }

  async animateBootSequence(output) {
    const commandElement = document.getElementById('boot-command');
    const outputElement = document.getElementById('boot-output');

    // First type the command
    await this.typeText(commandElement, 'npm start', 50);
    await this.delay(800);

    // Hide cursor after command is complete
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.style.display = 'none';
    }

    // Animate output lines
    for (const line of output) {
      await this.delay(line.delay - 1500);
      const lineElement = document.createElement('div');
      lineElement.className = `boot-output-line ${line.type}`;
      lineElement.textContent = line.text;
      outputElement.appendChild(lineElement);
    }

    // Hide terminal after completion
    setTimeout(() => {
      document.getElementById('terminal-loader').style.display = 'none';
    }, 4000);
  }

  async typeText(element, text, speed) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await this.delay(speed);
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize the terminal loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure everything is ready
  setTimeout(() => {
    window.terminalLoader = new TerminalLoader();
  }, 100);
});