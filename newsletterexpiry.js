// Function to check if the modal has been opened within the last 60 days
const hasOpenedNewsletterRecently = () => {
    const lastOpened = localStorage.getItem('newsletterOpenedAt');
    if (lastOpened) {
        const now = new Date().getTime();
        const sixtyDaysInMs = 60 * 24 * 60 * 60 * 1000;
        return (now - lastOpened) < sixtyDaysInMs;
    }
    return false;
};

// Function to set the local storage with the current time
const setNewsletterOpened = () => {
    const now = new Date().getTime();
    localStorage.setItem('newsletterOpenedAt', now);
};

// Function to handle scroll and check for the newsletter modal
const handleScroll = () => {
    // Check if the modal has already been opened within the last 60 days
    if (hasOpenedNewsletterRecently()) {
        return;
    }

    // Calculate the scroll position as a percentage of the total scrollable height
    const scrollPosition = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;

    // Select the modal6 element
    const modal6 = document.querySelector('[fs-modal-element="modal-6"]');

    // Check if the scroll position is between 50% and 60%
    if (scrollPosition >= 50 && scrollPosition <= 60) {
        // Open modal6 by setting its display to 'flex'
        modal6.style.display = 'flex';

        // Store the opening time in local storage
        setNewsletterOpened();

        // Remove the scroll event listener after the modal is opened
        window.removeEventListener('scroll', handleScroll);
    }
};

// Add the scroll event listener
window.addEventListener('scroll', handleScroll);

// Listen for the Escape key to close modal6
window.addEventListener('keydown', (event) => {
    const modal6 = document.querySelector('[fs-modal-element="modal-6"]');

    if (event.key === 'Escape' && modal6.style.display === 'flex') {
        // Close modal6 by setting its display to 'none'
        modal6.style.display = 'none';
    }
});
