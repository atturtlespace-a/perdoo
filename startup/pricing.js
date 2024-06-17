// Last Updated 18 June 24. for startup page

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
  toggleCta: {
    premium: document.querySelectorAll('[data-pr="premiumPriceButton"]'),
    supreme: document.querySelectorAll('[data-pr="supremePriceButton"]'),
    viewSupreme: document.querySelectorAll(
      '[data-pr="supremePriceViewButton"]',
    ),
  },
  boxes: {
    premium: document.querySelectorAll('[data-pr="premiumPriceDiv"]'),
    supreme: document.querySelectorAll('[data-pr="supremePriceDiv"]'),
    viewSupreme: document.querySelectorAll('[data-pr="supremePriceViewDiv"]'),
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

function discountRegularUser(value) {
  if (value < 25) {
    return 0;
  } else if (value < 50) {
    return 10;
  } else if (value < 100) {
    return 15;
  } else if (value < 150) {
    return 20;
  } else if (value < 200) {
    return 25;
  } else if (value < 250) {
    return 30;
  } else if (value < 300) {
    return 35;
  } else if (value < 350) {
    return 40;
  } else if (value < 400) {
    return 45;
  } else if (value < 450) {
    return 50;
  } else if (value < 500) {
    return 55;
  } else if (value < 600) {
    return 60;
  }
}

function discountViewOnly(value) {
  if (value < 50) {
    return 0;
  } else if (value < 100) {
    return 10;
  } else if (value < 200) {
    return 15;
  } else if (value < 300) {
    return 20;
  } else if (value < 400) {
    return 25;
  } else if (value < 500) {
    return 30;
  } else if (value < 750) {
    return 35;
  } else if (value < 1000) {
    return 40;
  }
}
let druser,
  dvuser,
  premiumRegularPrice,
  supremeRegularPrice,
  supremeViewOnlyPrice,
  perEmpPmPre,
  perEmpPmSup,
  totalInvPre,
  totalInvSup,
  roiPeryearPre,
  roiPeryearSup,
  roiMultiplyValuePre,
  roiMultiplyValueSup;

function displayOnlyContent(selector, value) {
  selector.forEach((e) => {
    e.textContent = `${currencySelected}${value}`;
  });
}

function totalMonthlyDisplayTextcontent(
  selector,
  value,
  roundTwoDecimalorZeroDecimal,
) {
  // Right true for Zero and Flase for upto two digits
  if (roundTwoDecimalorZeroDecimal) {
    selector.textContent = `${currencySelected}${internationalZeroDecimal(
      value,
    )}`;
  } else {
    selector.textContent = `${currencySelected}${internationalUpToTwoDecimals(
      value,
    )}`;
  }
}

function totalMonthlyDisplayTextcontent(
  selector,
  value,
  roundTwoDecimalorZeroDecimal,
) {
  // Check if value is NaN
  if (isNaN(value)) {
    selector.textContent = "-";
    return;
  }

  // Round value based on the roundTwoDecimalorZeroDecimal flag
  if (roundTwoDecimalorZeroDecimal) {
    selector.textContent = `${currencySelected}${internationalZeroDecimal(value)}`;
  } else {
    selector.textContent = `${currencySelected}${internationalUpToTwoDecimals(value)}`;
  }
}

// Function to set the display style for a NodeList of elements
function setDisplay(elements, displayStyle) {
  elements.forEach((element) => {
    element.style.display = displayStyle;
  });
}

let preStartup = document.querySelectorAll("[data-pr='half-pre-startup']");
let supStartup = document.querySelectorAll("[data-pr='half-sup-startup']");

let supStartupPrice, preStartupPrice;

function calculations(preUser, supUser, supView, rC) {
  updateTopInputField();
  numberofusers = Number(inputUserOnly.value); // A4 (Input values)
  numberofviewonly = Number(inputViewOnly.value); //A5 (Input Values)
  druser = discountRegularUser(numberofusers);
  dvuser = discountViewOnly(numberofviewonly);
  premiumRegularPrice = preUser * ((100 - druser) / 100);
  supremeRegularPrice = supUser * ((100 - druser) / 100);
  supremeViewOnlyPrice = supView * ((100 - dvuser) / 0);
  totalmonthlypremium = numberofusers * premiumRegularPrice;

  totalmonthlysupreme =
    numberofusers * supremeRegularPrice +
    numberofviewonly * supremeViewOnlyPrice;
  totalMonthlyDisplayTextcontent(
    panels.totalMonthly.premium,
    totalmonthlypremium,
    true,
  ); // Total Per Month Premium
  totalMonthlyDisplayTextcontent(
    panels.totalMonthly.supreme,
    totalmonthlysupreme,
    true,
  ); // Total Per Month Supreme (Both)
  perEmpPmPre = totalmonthlypremium / numberofusers;
  perEmpPmSup = totalmonthlysupreme / (numberofusers + numberofviewonly);
  totalMonthlyDisplayTextcontent(
    panels.perEmployee.premium,
    perEmpPmPre,
    false,
  ); // Per employee premium
  totalMonthlyDisplayTextcontent(
    panels.perEmployee.supreme,
    perEmpPmSup,
    false,
  ); // Per employee supreme
  totalInvPre = totalmonthlypremium * 12;
  totalInvSup = totalmonthlysupreme * 12;
  totalMonthlyDisplayTextcontent(
    panels.totalInvestment.premium,
    totalInvPre,
    true,
  );
  totalMonthlyDisplayTextcontent(
    panels.totalInvestment.supreme,
    totalInvSup,
    true,
  ); //
  roiPeryearPre = rC * numberofusers; // ROI Premium
  roiPeryearSup = rC * (numberofusers + numberofviewonly); // ROI Supreme
  totalMonthlyDisplayTextcontent(
    panels.roiPerYear.premium,
    roiPeryearPre,
    true,
  );
  totalMonthlyDisplayTextcontent(
    panels.roiPerYear.supreme,
    roiPeryearSup,
    true,
  );
  roiMultiplyValuePre = roiPeryearPre / totalInvPre;
  roiMultiplyValueSup = roiPeryearSup / totalInvSup;
  panels.roiMultiple.premium.textContent = `${Math.round(roiMultiplyValuePre)}x`;
  panels.roiMultiple.supreme.textContent = `${Math.round(roiMultiplyValueSup)}x`;
  if (numberofusers < 500) {
    // This code only exist for starup one
    preStartupPrice = premiumRegularPrice / 2;
    supStartupPrice = supremeRegularPrice / 2;

    displayOnlyContent(
      preStartup,
      internationalUpToTwoDecimals(preStartupPrice),
    );

    displayOnlyContent(
      supStartup,
      internationalUpToTwoDecimals(supStartupPrice),
    );
    displayOnlyContent(
      panels.displayPricing.premiumUsers,
      internationalUpToTwoDecimals(premiumRegularPrice),
    );

    displayOnlyContent(
      panels.displayPricing.supremeUsers,
      internationalUpToTwoDecimals(supremeRegularPrice),
    );
    // Set the display properties
    setDisplay(panels.toggleCta.premium, "none");
    setDisplay(panels.toggleCta.supreme, "none");
    setDisplay(panels.boxes.premium, "flex");
    setDisplay(panels.boxes.supreme, "flex");
  } else {
    // Set the display properties
    totalMonthlyDisplayTextcontent(panels.totalMonthly.premium, "-", true); // Total Per Month Premium
    totalMonthlyDisplayTextcontent(panels.totalMonthly.supreme, "-", true); // Total Per Month Supreme (Both)
    totalMonthlyDisplayTextcontent(panels.perEmployee.premium, "-", false); // Per employee premium
    totalMonthlyDisplayTextcontent(panels.perEmployee.supreme, "-", false); // Per employee supreme
    totalMonthlyDisplayTextcontent(panels.totalInvestment.premium, "-", true);
    totalMonthlyDisplayTextcontent(panels.totalInvestment.supreme, "-", true); //
    totalMonthlyDisplayTextcontent(panels.roiPerYear.premium, "-", true);
    totalMonthlyDisplayTextcontent(panels.roiPerYear.supreme, "-", true);

    panels.roiMultiple.premium.textContent = `-`;
    panels.roiMultiple.supreme.textContent = `-`;
    setDisplay(panels.toggleCta.premium, "flex");
    setDisplay(panels.toggleCta.supreme, "flex");
    setDisplay(panels.boxes.premium, "none");
    setDisplay(panels.boxes.supreme, "none");
  }
  if (numberofviewonly < 1000) {
    setDisplay(panels.toggleCta.viewSupreme, "none");
    setDisplay(panels.boxes.viewSupreme, "flex");

    displayOnlyContent(
      panels.displayPricing.supremeView,
      internationalUpToTwoDecimals(supremeViewOnlyPrice),
    );
  } else {
    totalMonthlyDisplayTextcontent(panels.totalMonthly.supreme, "-", true); // Total Per Month Supreme (Both)
    totalMonthlyDisplayTextcontent(panels.perEmployee.supreme, "-", false); // Per employee supreme
    totalMonthlyDisplayTextcontent(panels.totalInvestment.supreme, "-", true); //
    totalMonthlyDisplayTextcontent(panels.roiPerYear.supreme, "-", true);
    panels.roiMultiple.supreme.textContent = `-`;
    setDisplay(panels.toggleCta.viewSupreme, "flex");
    setDisplay(panels.boxes.viewSupreme, "none");
    console.log("View Only contact Sales");
  }
}

dataCurrency.addEventListener("click", () => {
  checkCurrency();
  roiLogicFinal();
  updateCurrencyIconOnly();
});

dataPricingQuaterly.addEventListener("click", () => {
  regime = "quaterly";
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
  }
}

roiLogicFinal();

inputUserOnly.addEventListener("input", roiLogicFinal);
inputViewOnly.addEventListener("input", roiLogicFinal);
