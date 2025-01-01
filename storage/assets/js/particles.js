
// Function to initialize particles.js with your provided configuration
function initializeParticles() {
  particlesJS('particles-js', {
      particles: {
          number: {
              value: 100,  // Number of snowflakes
              density: {
                  enable: true,
                  value_area: 800
              }
          },
          color: {
              value: '#ffffff' // Snowflake color
          },
          shape: {
              type: 'circle',  // Snowflake shape
          },
          opacity: {
              value: 0.5,
              random: true,
              anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.1
              }
          },
          size: {
              value: 3,
              random: true,
              anim: {
                  enable: false
              }
          },
          line_linked: {
              enable: false
          },
          move: {
              enable: true,
              speed: 1,
              direction: 'bottom',  // Fall downwards
              random: true,
              straight: false,
              out_mode: 'out'
          }
      },
      interactivity: {
          events: {
              onhover: {
                  enable: false
              },
              onclick: {
                  enable: false
              }
          }
      },
      retina_detect: true
  });
}

// Function to disable particles.js by hiding the container
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
