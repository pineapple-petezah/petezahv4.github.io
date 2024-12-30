function disableParticles() {
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
      particlesContainer.style.display = 'none'; // Hide particles container
  }
  localStorage.setItem('particlesEnabled', 'false'); // Save state
  toggleButtons('hide');
}

// Function to enable particles.js by showing the container
function enableParticles() {
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
      particlesContainer.style.display = 'block'; // Show particles container
  }
  localStorage.setItem('particlesEnabled', 'true'); // Save state
  initializeParticles();
  toggleButtons('show');
}

// Toggle button visibility based on state
function toggleButtons(action) {
  const disableButton = document.getElementById('disable-particles');
  const enableButton = document.getElementById('enable-particles');

  if (action === 'hide') {
      disableButton.style.display = 'none';
      enableButton.style.display = 'inline-block';
  } else if (action === 'show') {
      disableButton.style.display = 'inline-block';
      enableButton.style.display = 'none';
  }
}

// Check if particles are enabled on page load
window.addEventListener('load', function() {
  const particlesEnabled = localStorage.getItem('particlesEnabled');
  if (particlesEnabled !== 'false') {
      initializeParticles(); // Initialize if enabled
      toggleButtons('show');
  } else {
      document.getElementById('particles-js').style.display = 'none'; // Hide by default if disabled
      toggleButtons('hide');
  }
});

// Add event listeners for the toggle buttons
document.getElementById('disable-particles').addEventListener('click', disableParticles);
document.getElementById('enable-particles').addEventListener('click', enableParticles);
