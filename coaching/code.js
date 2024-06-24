// Last Updated 24th June 24
let continentInitial = getCookie("continentCode");
let currencySelected;
let dataCurrency = document.querySelectorAll("[data-pricing='currency']");
let allEles = document.querySelectorAll("[data-el]");

function getCookie(name) {
  let cookieArray = document.cookie.split(";"); // Split the cookie string into an array
  let cookieName = `${name}=`; // Create the cookie name string with an equal sign
  for (let cookie of cookieArray) {
    cookie = cookie.trim(); // Trim whitespace from the cookie string
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length, cookie.length); // Extract and return the cookie value
    }
  }
  return ""; // Return empty string if the cookie was not found
}

function intialCheck() {
  if (continentInitial === "NA" || continentInitial === "SA") {
    // Set things based on DOLLARS for North America or South America
    currencySelected = "$";
    dataCurrency.forEach((element) => (element.textContent = "Switch to €"));
  } else {
    // Set things based on EUROS for all other continents
    currencySelected = "€";
    dataCurrency.forEach((element) => (element.textContent = "Switch to $"));
  }
}

intialCheck();

function toggleCurrency() {
  if (currencySelected === "€") {
    currencySelected = "$";
    dataCurrency.forEach((element) => (element.textContent = "Switch to €"));
  } else {
    currencySelected = "€";
    dataCurrency.forEach((element) => (element.textContent = "Switch to $"));
  }
  displayValues(); // Update displayed values after toggling currency
}

// Add click event listener to each dataCurrency element
dataCurrency.forEach((element) => {
  element.addEventListener("click", toggleCurrency);
});

function displayValues() {
  if (currencySelected === "€") {
    allEles.forEach((element) => {
      let euroValue = element.getAttribute("data-co-eu");
      element.textContent = `€${euroValue}`;
    });
  } else {
    allEles.forEach((element) => {
      let dollarValue = element.getAttribute("data-co-dollar");
      element.textContent = `$${dollarValue}`;
    });
  }
}

displayValues(); // Initial display of values based on currencySelected
