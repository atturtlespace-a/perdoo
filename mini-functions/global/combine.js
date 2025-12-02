// Function to handle button clicks
function handleButtonClick(triggerAttribute, buttonAttribute) {
    // Get all buttons with the specified trigger attribute
    var buttons = document.querySelectorAll(`[data-click-trigger="${triggerAttribute}"]`);
    
    console.log(`Found ${buttons.length} buttons with trigger attribute "${triggerAttribute}"`);

    // Add click event listener to each button
    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            console.log(`Button with trigger attribute "${triggerAttribute}" clicked`);

            // Get the element to be clicked with the specified button attribute
            var elementToClick = document.querySelector(`[data-button="${buttonAttribute}"]`);
            
            // Check if the element exists
            if (elementToClick) {
                // Create and dispatch a click event on the element
                var clickEvent = new Event('click', { bubbles: true });
                elementToClick.dispatchEvent(clickEvent);
                console.log(`Dispatched click event on element with button attribute "${buttonAttribute}"`);
            } else {
                console.log(`Element to be clicked with attribute "${buttonAttribute}" not found`);
            }
        });
    });
}

// Add event listeners after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle clicks for buttons with "demo" trigger and "demo" button attribute
    handleButtonClick("demo", "demo");
    // Handle clicks for buttons with "startfree" trigger and "free" button attribute
    handleButtonClick("startfree", "free");
  	handleButtonClick("security", "security");
});



//Script for select inputs for initial and other options to change colors
const selects = document.querySelectorAll('select');

selects.forEach(select => {
  select.addEventListener('change', () => {
    const selectedOption = select.selectedOptions[0];
    if (selectedOption.index === 0) {
      select.style.color = 'var(--text-color--text-secondary)';
    } else {
      select.style.color = 'var(--base-color-brand--black)';
    }
  });
});



// for newsletter form
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector('[data-form="newsletter-submit"]');

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      // Prevent multiple submissions
      if (submitButton.classList.contains("no-events")) {
        event.preventDefault(); // Stop multiple clicks
        return;
      }

      submitButton.classList.add("no-events"); // Add no-events class
      submitButton.value = submitButton.getAttribute("data-wait"); // Change text to "Please wait..."

      setTimeout(() => {
        submitButton.classList.remove("no-events"); // Remove class after 10 seconds
        submitButton.value = "Subscribe"; // Restore original text
      }, 10000);
    });
  }
});
