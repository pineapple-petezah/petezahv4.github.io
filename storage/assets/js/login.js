
// Get the switch element
const switchElement = document.getElementById('mySwitch');
const saveButton = document.getElementById('saveButton');

// Function to handle the switch change
function handleSwitchChange() {
  // Get the script element (if it exists)
  const scriptElement = document.getElementById('authproScript');

  // Check if the switch is checked
  if (switchElement.checked) {
    // If the switch is checked, add the script tag
    if (!scriptElement) {
      const newScript = document.createElement('script');
      newScript.id = 'authproScript';
      newScript.type = 'text/javascript';
      newScript.src = 'https://www.authpro.com/auth/PeteZah/?action=pp';
      document.body.appendChild(newScript);
    }
  } else {
    // If the switch is unchecked, remove the script tag
    if (scriptElement) {
      scriptElement.remove();
    }
  }

  // Save the switch state to local storage
  localStorage.setItem('switchState', switchElement.checked);
}

// Add an event listener to the save button
saveButton.addEventListener('click', () => {
  handleSwitchChange();
});

// Load the switch state from local storage
const savedSwitchState = localStorage.getItem('switchState');
if (savedSwitchState === 'true') {
  switchElement.checked = true;
}
