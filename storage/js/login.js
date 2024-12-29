// Get the switch element
const switchElement = document.getElementById('mySwitch');

// Function to handle the switch change
function handleSwitchChange() {
  // Get the script element
  const scriptElement = document.getElementById('afdsScript');

  // Check if the switch is checked
  if (switchElement.checked) {
    // If the switch is checked, add the script tag
    if (!scriptElement) {
      const newScript = document.createElement('script');
      newScript.id = 'afdsScript';
      newScript.src = 'afds.js';
      document.body.appendChild(newScript);
    }
  } else {
    // If the switch is unchecked, remove the script tag
    if (scriptElement) {
      scriptElement.removeAttribute('id');
    }
  }

  // Save the switch state to local storage
  localStorage.setItem('switchState', switchElement.checked);
}

// Add an event listener to the switch
switchElement.addEventListener('change', handleSwitchChange);

// Load the switch state from local storage
const savedSwitchState = localStorage.getItem('switchState');
if (savedSwitchState === 'true') {
  switchElement.checked = true;
}
