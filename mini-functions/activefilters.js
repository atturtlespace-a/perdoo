// Highlight the current page link in the resources filter ( For Static Listings Page )
function highlightActiveLink(){let t=window.location.pathname;document.querySelectorAll(".resources__filter-link").forEach(e=>{let i=e.getAttribute("href");e.classList.toggle("w--current",i===t)})}highlightActiveLink();
