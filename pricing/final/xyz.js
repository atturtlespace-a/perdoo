// Last Updated 28 May  24

// console.log("Working now 22");

let continentInitial = getCookie("continentCode");
let regime = "annual";
let quaterlyPercentageChange = 1.1;
let rCEuros = 5000 * 0.92;
let rCDollars = 5000;
let acvDollartoEuro = 0.91;
let numberofusers, numberofviewonly;
let totalmonthlypremium, totalmonthlysupreme;
let discountPremiumValue, discountSupremeValue;
let discountPremiumInPercent, discountSupremeInPercent;

let dataPricingToggle = document.querySelector("[data-pricing='toggle']");
let dataPricingAnnual = dataPricingToggle.querySelector(
  "[data-pricing='annual']",
);
let dataPricingQuaterly = dataPricingToggle.querySelector(
  "[data-pricing='quaterly']",
);
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
let currencySelected;
let dataCurrency = document.querySelector("[data-pricing='currency']");
let topInputRegularField = document.querySelector(
  "[fs-mirrorinput-element='trigger']",
);

let inputUserOnly = document.querySelector('[data-pr="inputusers"]');
let inputViewOnly = document.querySelector('[data-pr="inputviewonly"]');

if (continentInitial === "NA" || continentInitial === "SA") {
  // Set things based on DOLLARS for North America or South America
  currencySelected = "$";
  dataCurrency.textContent = "Switch to €";
} else {
  // Set things based on EUROS for all other continents
  currencySelected = "€";
  dataCurrency.textContent = "Switch to $";
}

function checkCurrency() {
  if (currencySelected === "€") {
    currencySelected = "$";
    dataCurrency.textContent = `Switch to €`;
    // console.log(` the current Value selected ${currencySelected}`);
  } else {
    currencySelected = "€";
    dataCurrency.textContent = `Switch to $`;
    // console.log(`the current Value selected ${currencySelected}`);
  }
}
function regimeUpdate() {
  if (regime === "annual") {
    regime = "quaterly";
    // console.log(regime);
  }
  if (regime === "quaterly") {
    regime = "annual";
    // console.log(regime);
  }
}
function calculateFinalDiscount(value) {
  if (value < 2400) {
    return 0;
  } else if (value < 5000) {
    return 10;
  } else if (value < 10000) {
    return 15;
  } else if (value < 15000) {
    return 20;
  } else if (value < 20000) {
    return 25;
  } else if (value < 25000) {
    return 30;
  } else if (value < 30000) {
    return 35;
  } else if (value < 40000) {
    return 40;
  } else if (value < 50000) {
    return 50;
  } else if (value < 75000) {
    return 60;
  } else {
    return 75;
  }
}

function updateTopInputField() {
  topInputRegularField.value = Number(inputUserOnly.value);
}

// function internationalUpToTwoDecimals(arg) {
//   // Round the number to two decimal places and convert back to float to remove trailing zeros
//   const rounded = parseFloat(Number(arg).toFixed(2));

//   // Convert to a localized string with options to control fraction digits dynamically
//   return rounded.toLocaleString("en-US", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 2,
//   });
// }

function internationalUpToTwoDecimals(arg) {
  // Round the number to two decimal places
  const rounded = Number(arg).toFixed(2);

  // Check if the rounded number is an integer
  if (Number.isInteger(Number(rounded))) {
    // If it's an integer, convert to a string and remove the trailing ".00"
    return Number(rounded).toLocaleString("en-US");
  } else {
    // If it's not an integer, keep the two decimal places
    return rounded.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }
}

function internationalZeroDecimal(arg) {
  // Round the number to the nearest integer and convert back to float to remove any decimals
  const rounded = parseFloat(Number(arg).toFixed(0));

  // Convert to a localized string without displaying any decimals
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// console.log(`Default Regime ${regime}`);
// console.log(`Default Currency Selected ${currencySelected}`);

const panels = {
  displayPricing: {
    premiumUsers: document.querySelectorAll(
      '[data-pr="display-premium-pricing-users"]',
    ),
    premiumUsersHero: document.querySelectorAll(
      '[data-pr="display-premium-pricing-users-hero"]',
    ),
    supremeUsers: document.querySelectorAll(
      '[data-pr="display-supreme-pricing-users"]',
    ),
    supremeUsersHero: document.querySelectorAll(
      '[data-pr="display-supreme-pricing-users-hero"]',
    ),
    supremeView: document.querySelectorAll(
      '[data-pr="display-supreme-pricing-view"]',
    ),
  },
  totalMonthly: {
    premium: document.querySelector(
      '[data-pr="display-premium-total-monthly"]',
    ),
    supreme: document.querySelector(
      '[data-pr="display-supreme-total-monthly"]',
    ),
  },
  yourMonthly: {
    premium: document.querySelector('[data-pr="display-premium-your-monthly"]'),
    supreme: document.querySelector('[data-pr="display-supreme-your-monthly"]'),
  },
  perEmployee: {
    premium: document.querySelector('[data-pr="display-premium-per-employee"]'),
    supreme: document.querySelector('[data-pr="display-supreme-per-employee"]'),
  },
  totalInvestment: {
    premium: document.querySelector('[data-pr="display-premium-total-inv"]'),
    supreme: document.querySelector('[data-pr="display-supreme-total-inv"]'),
  },
  roiPerYear: {
    premium: document.querySelector('[data-pr="display-premium-roi-py"]'),
    supreme: document.querySelector('[data-pr="display-supreme-roi-py"]'),
  },
  roiMultiple: {
    premium: document.querySelector('[data-pr="display-premium-roi-multiple"]'),
    supreme: document.querySelector('[data-pr="display-supreme-roi-multiple"]'),
  },
  discount: {
    premium: document.querySelector('[data-pr="discountpremium"]'),
    supreme: document.querySelector('[data-pr="discountsupreme"]'),
  },
};

// Function to retrieve and parse numeric data from DOM elements
function getNumericValue(selector) {
  const elementText = document.querySelector(
    `[data-pr="${selector}"]`,
  ).textContent;
  return Number(elementText);
}

// Structured data object for currency rates
const currencyRates = {
  euros: {
    annualPremiumUsers: getNumericValue("euros-annual-premium-users"),
    annualSupremeUsers: getNumericValue("euros-annual-supreme-users"),
    annualSupremeViews: getNumericValue("euros-annual-supreme-view"),
  },
  dollars: {
    annualPremiumUsers: getNumericValue("dollar-annual-premium-users"),
    annualSupremeUsers: getNumericValue("dollar-annual-supreme-users"),
    annualSupremeViews: getNumericValue("dollar-annual-supreme-view"),
  },
};

function calculations(preUser, supUser, supView, rC) {
  updateCurrencyIconOnly();
  updateTopInputField();
  numberofusers = Number(inputUserOnly.value);
  numberofviewonly = Number(inputViewOnly.value);

  panels.displayPricing.premiumUsers.forEach((e) => {
    e.textContent = `${currencySelected}${preUser}`;
  });
  panels.displayPricing.supremeUsers.forEach((e) => {
    e.textContent = `${currencySelected}${internationalUpToTwoDecimals(
      supUser,
    )}`;
  });

  panels.displayPricing.supremeView.forEach((e) => {
    e.textContent = `${currencySelected}${internationalUpToTwoDecimals(
      supView,
    )}`;
  });

  totalmonthlypremium = numberofusers * preUser;
  totalmonthlysupreme = numberofusers * supUser + numberofviewonly * supView;
  panels.totalMonthly.premium.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlypremium,
  )}`;
  panels.totalMonthly.supreme.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlysupreme,
  )}`;

  let premACV, supACV;

  if (currencySelected === "$") {
    // console.log(" $ annual  ");
    premACV =
      numberofusers *
      currencyRates.dollars.annualPremiumUsers *
      12 *
      acvDollartoEuro;
    supACV =
      (numberofusers * currencyRates.dollars.annualSupremeUsers +
        numberofviewonly * currencyRates.dollars.annualSupremeViews) *
      12 *
      acvDollartoEuro;
  }
  if (currencySelected === "€") {
    // console.log(" € annual  Done");

    premACV = numberofusers * currencyRates.euros.annualPremiumUsers * 12;
    supACV =
      (numberofusers * currencyRates.euros.annualSupremeUsers +
        numberofviewonly * currencyRates.euros.annualSupremeViews) *
      12;
  }

  // console.log(premACV, supACV);

  discountPremiumValue = calculateFinalDiscount(premACV);
  discountSupremeValue = calculateFinalDiscount(supACV);

  // console.log(discountPremiumValue, discountSupremeValue);

  panels.discount.premium.textContent = `${discountPremiumValue}`;
  panels.discount.supreme.textContent = `${discountSupremeValue}`;
  discountPremiumInPercent = (100 - discountPremiumValue) * 0.01;
  discountSupremeInPercent = (100 - discountSupremeValue) * 0.01;
  panels.yourMonthly.premium.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlypremium * discountPremiumInPercent,
  )}`;
  panels.yourMonthly.supreme.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlysupreme * discountSupremeInPercent,
  )}`;
  panels.perEmployee.premium.textContent = `${currencySelected}${internationalUpToTwoDecimals(
    Number(totalmonthlypremium * discountPremiumInPercent) / numberofusers,
  )}`;
  panels.perEmployee.supreme.textContent = `${currencySelected}${internationalUpToTwoDecimals(
    Number(totalmonthlysupreme * discountSupremeInPercent) /
      (numberofusers + numberofviewonly),
  )}`;

  panels.displayPricing.premiumUsersHero.forEach((e) => {
    e.textContent = `${currencySelected}${internationalUpToTwoDecimals(
      Number(totalmonthlypremium * discountPremiumInPercent) / numberofusers,
    )}`;
  });

  panels.displayPricing.supremeUsersHero.forEach((e) => {
    e.textContent = `${currencySelected}${internationalUpToTwoDecimals(
      Number(totalmonthlysupreme * discountSupremeInPercent) /
        (numberofusers + numberofviewonly),
    )}`;
  });

  panels.totalInvestment.premium.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlypremium * discountPremiumInPercent * 12,
  )}`;

  panels.totalInvestment.supreme.textContent = `${currencySelected}${internationalZeroDecimal(
    totalmonthlysupreme * discountSupremeInPercent * 12,
  )}`;
  panels.roiPerYear.premium.textContent = `${currencySelected}${internationalZeroDecimal(
    rC * numberofusers,
  )}`;
  panels.roiPerYear.supreme.textContent = `${currencySelected}${internationalZeroDecimal(
    rC * (numberofusers + numberofviewonly),
  )}`;
  panels.roiMultiple.premium.textContent = `${Math.round(
    (rC * numberofusers) /
      (totalmonthlypremium * discountPremiumInPercent * 12),
  )}`;
  panels.roiMultiple.supreme.textContent = `${Math.round(
    (rC * (numberofusers + numberofviewonly)) /
      (totalmonthlysupreme * discountSupremeInPercent * 12),
  )}`;
}

dataCurrency.addEventListener("click", () => {
  checkCurrency();
  roiLogicFinal();
});

dataPricingQuaterly.addEventListener("click", () => {
  regime = "quaterly";
  // console.log(regime);
  dataPricingQuaterly.classList.add("is--active");
  dataPricingAnnual.classList.remove("is--active");
  roiLogicFinal();
});

dataPricingAnnual.addEventListener("click", () => {
  regime = "annual";
  console.log(regime);
  dataPricingAnnual.classList.add("is--active");
  dataPricingQuaterly.classList.remove("is--active");
  roiLogicFinal();
});

// Select the value of Initial discount
let discountOffered = Number(
  document.querySelector('[data-pr="discount"]').textContent,
);

// Select the value of CurrencyIcon discount
let currencyIcon = document.querySelectorAll("[data-pr='currencysymbol']");

function updateCurrencyIconOnly() {
  currencyIcon.forEach((i) => (i.textContent = `${currencySelected}`));
}

function roiLogicFinal() {
  if (currencySelected === "$" && regime === "annual") {
    calculations(
      currencyRates.dollars.annualPremiumUsers,
      currencyRates.dollars.annualSupremeUsers,
      currencyRates.dollars.annualSupremeViews,
      rCDollars,
    );
    // console.log(`We have to run code with Dollar Values and for Annual Regime`);
  }
  if (currencySelected === "$" && regime === "quaterly") {
    calculations(
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualPremiumUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualSupremeUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualSupremeViews,
      ),
      rCDollars,
    );
  }
  if (currencySelected === "€" && regime === "annual") {
    calculations(
      currencyRates.euros.annualPremiumUsers,
      currencyRates.euros.annualSupremeUsers,
      currencyRates.euros.annualSupremeViews,
      rCEuros,
    );
    // console.log(`We have to run code with Euros Values and for Annual Regime`);
  }

  if (currencySelected === "€" && regime === "quaterly") {
    calculations(
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualPremiumUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualSupremeUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualSupremeViews,
      ),
      rCEuros,
    );
    // console.log(
    //   `We have to run code with Euros Values and for Quaterly Regime`,
    // );
  }
}

roiLogicFinal();

inputUserOnly.addEventListener("input", roiLogicFinal);
inputViewOnly.addEventListener("input", roiLogicFinal);
