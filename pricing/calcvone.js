let dataPricingToggle = document.querySelector("[data-pricing='toggle']");
let dataPricingAnnual = dataPricingToggle.querySelector(
  "[data-pricing='annual']",
);
let dataPricingQuaterly = dataPricingToggle.querySelector(
  "[data-pricing='quaterly']",
);

dataPricingQuaterly.addEventListener("click", runQuaterly);

dataPricingAnnual.addEventListener("click", runAnnually);

function runAnnually() {
  let currencySelected = "€";
  // Let Country currency

  let dataCurrency = document.querySelector("[data-pricing='currency']");

  let discountOffered = Number(
    document.querySelector('[data-pr="discount"]').textContent,
  );
  let discount = (100 - discountOffered) * 0.01;
  let displayDiscount = document.querySelectorAll(
    '[data-pr="displaydiscount"]',
  );

  let currencyIcon = document.querySelectorAll("[data-pr='currencysymbol']");

  // Select all the current rates set by the client in webflow

  // -----------------Euros-----------------------

  let RateEurosAnnualPremiumUsers = Number(
    document.querySelector('[data-pr="euros-annual-premium-users"]')
      .textContent,
  );
  let RateEurosAnnualSupremeUsers = Number(
    document.querySelector('[data-pr="euros-annual-supreme-users"]')
      .textContent,
  );
  let RateEurosAnnualSupremeViews = Number(
    document.querySelector('[data-pr="euros-annual-supreme-view"]').textContent,
  );

  // -----------------Dollars-----------------------

  let RateDollarsAnnualPremiumUsers = Number(
    document.querySelector('[data-pr="dollar-annual-premium-users"]')
      .textContent,
  );
  let RateDollarsAnnualSupremeUsers = Number(
    document.querySelector('[data-pr="dollar-annual-supreme-users"]')
      .textContent,
  );
  let RateDollarsAnnualSupremeViews = Number(
    document.querySelector('[data-pr="dollar-annual-supreme-view"]')
      .textContent,
  );

  // ------------------Select Items to display them as Const ----------------------

  let DisplayPremiumPricingUsers = document.querySelectorAll(
    '[data-pr="display-premium-pricing-users"]',
  );
  let DisplaySupremePricingUsers = document.querySelectorAll(
    '[data-pr="display-supreme-pricing-users"]',
  );
  let DisplaySupremePricingView = document.querySelector(
    '[data-pr="display-supreme-pricing-view"]',
  );

  // Select input feilds

  let inputUserOnly = document.querySelector('[data-pr="inputusers"]');
  let inputViewOnly = document.querySelector('[data-pr="inputviewonly"]');

  // Total Monthly Display

  let DisplayTotalMonthlyPremium = document.querySelector(
    '[data-pr="display-premium-total-monthly"]',
  );
  let DisplayTotalMonthlySupreme = document.querySelector(
    '[data-pr="display-supreme-total-monthly"]',
  );

  // Your monthly Display

  let DisplayYourMonthlyPremium = document.querySelector(
    '[data-pr="display-premium-your-monthly"]',
  );
  let DisplayYourMonthlySupreme = document.querySelector(
    '[data-pr="display-supreme-your-monthly"]',
  );

  // Per Employee Selection

  let DisplayPerEmployeePremium = document.querySelector(
    '[data-pr="display-premium-per-employee"]',
  );
  let DisplayPerEmployeeSupreme = document.querySelector(
    '[data-pr="display-supreme-per-employee"]',
  );

  // Total investment
  let DisplayTotalInvPremium = document.querySelector(
    '[data-pr="display-premium-total-inv"]',
  );
  let DisplayTotalInvSupreme = document.querySelector(
    '[data-pr="display-supreme-total-inv"]',
  );

  // ROI Per year
  let DisplayRoiPyPremium = document.querySelector(
    '[data-pr="display-premium-roi-py"]',
  );
  let DisplayRoiPySupreme = document.querySelector(
    '[data-pr="display-supreme-roi-py"]',
  );

  // ROI Per Multiple

  let DisplayRoiMultiplePremium = document.querySelector(
    '[data-pr="display-premium-roi-multiple"]',
  );
  let DisplayRoiMultipleSupreme = document.querySelector(
    '[data-pr="display-supreme-roi-multiple"]',
  );

  // Discount Selectors

  let DisplayDiscountPremium = document.querySelector(
    '[data-pr="discountpremium"]',
  );

  let DisplayDiscountSupreme = document.querySelector(
    '[data-pr="discountsupreme"]',
  );

  function updatePricingConstants() {
    if (currencySelected === "€") {
      currencyIcon.forEach((item) => (item.textContent = "€"));
      DisplayPremiumPricingUsers.forEach(
        (item) => (item.textContent = `€${RateEurosAnnualPremiumUsers}`),
      );
      DisplaySupremePricingUsers.forEach(
        (item) => (item.textContent = `€${RateEurosAnnualSupremeUsers}`),
      );
      DisplaySupremePricingView.textContent = `€${RateEurosAnnualSupremeViews}`;
    } else {
      currencyIcon.forEach((item) => (item.textContent = "$"));
      DisplayPremiumPricingUsers.forEach(
        (item) => (item.textContent = `$${RateDollarsAnnualPremiumUsers}`),
      );
      DisplaySupremePricingUsers.forEach(
        (item) => (item.textContent = `$${RateDollarsAnnualSupremeUsers}`),
      );
      DisplaySupremePricingView.textContent = `$${RateDollarsAnnualSupremeViews}`;
    }
  }

  // Update quaterly

  function international(arg) {
    return arg.toLocaleString("en-US");
  }

  function updateCurrency() {
    currencySelected = currencySelected === "€" ? "$" : "€";
    dataCurrency.textContent = `Switch to ${currencySelected}`;
  }

  dataCurrency.addEventListener("click", function () {
    updatePricingConstants();
    updateCurrency();
    roilogic();
  });

  dataPricingAnnual.addEventListener("click", function () {
    dataPricingAnnual.classList.add("is--active");
    dataPricingQuaterly.classList.remove("is--active");
  });

  dataPricingQuaterly.addEventListener("click", function () {
    dataPricingQuaterly.classList.add("is--active");
    dataPricingAnnual.classList.remove("is--active");
  });

  // function UpdateDiscountDisplay() {
  //   displayDiscount.forEach((item) => (item.textContent = `${discountOffered}`));
  // }

  function calculateFinalDiscount(value) {
    if (value < 2500) {
      return 0;
    } else if (value < 10000) {
      return 10;
    } else if (value < 25000) {
      return 20;
    } else if (value < 50000) {
      return 40;
    } else if (value < 75000) {
      return 50;
    } else {
      return 60;
    }
  }

  let discountPremium;
  let discountSupreme;

  function roilogic() {
    let numberofusers = Number(inputUserOnly.value);
    let numberofviewonly = Number(inputViewOnly.value);

    let totalmonthlypremiumDollar =
      numberofusers * RateDollarsAnnualPremiumUsers;
    let totalmonthlysupremeDollar =
      numberofusers * RateDollarsAnnualSupremeUsers +
      numberofviewonly * RateDollarsAnnualSupremeViews;

    let totalMonthpremiumEuro = numberofusers * RateEurosAnnualPremiumUsers;
    let totalmonthlysupremeEuro =
      numberofusers * RateEurosAnnualSupremeUsers +
      numberofviewonly * RateEurosAnnualSupremeViews;

    let discountPremiumValue, discountSupremeValue;

    if (currencySelected === "€") {
      DisplayTotalMonthlyPremium.textContent = `$${international(totalmonthlypremiumDollar)}`;
      DisplayTotalMonthlySupreme.textContent = `$${international(totalmonthlysupremeDollar)}`;

      discountPremiumValue = calculateFinalDiscount(totalmonthlypremiumDollar);
      discountSupremeValue = calculateFinalDiscount(totalmonthlysupremeDollar);

      DisplayDiscountPremium.textContent = `${discountPremiumValue}`;
      DisplayDiscountSupreme.textContent = `${discountSupremeValue}`;

      discountPremium = (100 - discountPremiumValue) * 0.01;
      discountSupreme = (100 - discountSupremeValue) * 0.01;

      DisplayYourMonthlyPremium.textContent = `$${international(
        totalmonthlypremiumDollar * discountPremium,
      )}`;
      DisplayYourMonthlySupreme.textContent = `$${international(
        totalmonthlysupremeDollar * discountSupreme,
      )}`;

      DisplayPerEmployeePremium.textContent = `$${international(Number((totalmonthlypremiumDollar * discountPremium) / numberofusers))}`;
      DisplayPerEmployeeSupreme.textContent = `$${international(Number(totalmonthlysupremeDollar * discountSupreme) / (numberofusers + numberofviewonly))}`;

      DisplayTotalInvPremium.textContent = `$${international(totalmonthlypremiumDollar * discountPremium * 12)}`;
      DisplayTotalInvSupreme.textContent = `$${international(totalmonthlysupremeDollar * discountSupreme * 12)}`;

      DisplayRoiPyPremium.textContent = `$${international(5000 * numberofusers)}`;
      DisplayRoiPySupreme.textContent = `$${international(5000 * (numberofusers + numberofviewonly))}`;

      DisplayRoiMultiplePremium.textContent = `${Math.round((5000 * numberofusers) / (totalmonthlypremiumDollar * discountPremium * 12))}`;
      DisplayRoiMultipleSupreme.textContent = `${Math.round((5000 * (numberofusers + numberofviewonly)) / (totalmonthlysupremeDollar * discountSupreme * 12))}`;
    } else {
      discountPremiumValue = calculateFinalDiscount(totalMonthpremiumEuro);
      discountSupremeValue = calculateFinalDiscount(totalmonthlysupremeDollar);

      DisplayDiscountPremium.textContent = `${discountPremiumValue}`;
      DisplayDiscountSupreme.textContent = `${discountSupremeValue}`;

      discountPremium = (100 - discountPremiumValue) * 0.01;
      discountSupreme = (100 - discountSupremeValue) * 0.01;

      DisplayTotalMonthlyPremium.textContent = `€${international(totalMonthpremiumEuro)}`;
      DisplayTotalMonthlySupreme.textContent = `€${international(totalmonthlysupremeEuro)}`;

      DisplayYourMonthlyPremium.textContent = `€${international(
        totalMonthpremiumEuro * discountPremium,
      )}`;
      DisplayYourMonthlySupreme.textContent = `€${international(
        totalmonthlysupremeEuro * discountSupreme,
      )}`;

      DisplayPerEmployeePremium.textContent = `€${international(Number(totalMonthpremiumEuro * discountPremium) / numberofusers)}`;
      DisplayPerEmployeeSupreme.textContent = `€${international(Number((totalmonthlysupremeEuro * discountSupreme) / (numberofusers + numberofviewonly)))}`;

      DisplayTotalInvPremium.textContent = `€${international(totalMonthpremiumEuro * discountPremium * 12)}`;
      DisplayTotalInvSupreme.textContent = `€${international(totalmonthlysupremeEuro * discountSupreme * 12)}`;

      DisplayRoiPyPremium.textContent = `€${international(5000 * 0.92 * numberofusers)}`;
      DisplayRoiPySupreme.textContent = `€${international(5000 * 0.92 * (numberofusers + numberofviewonly))}`;

      DisplayRoiMultiplePremium.textContent = `${Math.round((5000 * 0.92 * numberofusers) / (totalMonthpremiumEuro * discountPremium * 12))}`;
      DisplayRoiMultipleSupreme.textContent = `${Math.round((5000 * 0.92 * (numberofusers + numberofviewonly)) / (totalmonthlysupremeEuro * discountSupreme * 12))}`;
    }
  }

  inputUserOnly.addEventListener("input", roilogic);
  inputViewOnly.addEventListener("input", roilogic);

  //----------------Load them onLoad ---------------------
  updatePricingConstants();
  updateCurrency();
  roilogic();
}

function runQuaterly() {
  let currencySelected = "€";
  // Let Country currency

  let dataCurrency = document.querySelector("[data-pricing='currency']");

  let discountOffered = Number(
    document.querySelector('[data-pr="discount"]').textContent,
  );
  let discount = (100 - discountOffered) * 0.01;
  let displayDiscount = document.querySelectorAll(
    '[data-pr="displaydiscount"]',
  );

  let currencyIcon = document.querySelectorAll("[data-pr='currencysymbol']");

  // Select all the current rates set by the client in webflow

  // -----------------Euros-----------------------

  let percentageChange = 1.1;

  let RateEurosAnnualPremiumUsers = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="euros-annual-premium-users"]')
          .textContent,
      )
    ).toFixed(2),
  );
  let RateEurosAnnualSupremeUsers = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="euros-annual-supreme-users"]')
          .textContent,
      )
    ).toFixed(2),
  );
  let RateEurosAnnualSupremeViews = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="euros-annual-supreme-view"]')
          .textContent,
      )
    ).toFixed(2),
  );

  // -----------------Dollars-----------------------

  let RateDollarsAnnualPremiumUsers = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="dollar-annual-premium-users"]')
          .textContent,
      )
    ).toFixed(2),
  );
  let RateDollarsAnnualSupremeUsers = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="dollar-annual-supreme-users"]')
          .textContent,
      )
    ).toFixed(2),
  );
  let RateDollarsAnnualSupremeViews = Number(
    (
      percentageChange *
      Number(
        document.querySelector('[data-pr="dollar-annual-supreme-view"]')
          .textContent,
      )
    ).toFixed(2),
  );

  // ------------------Select Items to display them as Const ----------------------

  let DisplayPremiumPricingUsers = document.querySelectorAll(
    '[data-pr="display-premium-pricing-users"]',
  );
  let DisplaySupremePricingUsers = document.querySelectorAll(
    '[data-pr="display-supreme-pricing-users"]',
  );
  let DisplaySupremePricingView = document.querySelector(
    '[data-pr="display-supreme-pricing-view"]',
  );

  // Select input feilds

  let inputUserOnly = document.querySelector('[data-pr="inputusers"]');
  let inputViewOnly = document.querySelector('[data-pr="inputviewonly"]');

  // Total Monthly Display

  let DisplayTotalMonthlyPremium = document.querySelector(
    '[data-pr="display-premium-total-monthly"]',
  );
  let DisplayTotalMonthlySupreme = document.querySelector(
    '[data-pr="display-supreme-total-monthly"]',
  );

  // Your monthly Display

  let DisplayYourMonthlyPremium = document.querySelector(
    '[data-pr="display-premium-your-monthly"]',
  );
  let DisplayYourMonthlySupreme = document.querySelector(
    '[data-pr="display-supreme-your-monthly"]',
  );

  // Per Employee Selection

  let DisplayPerEmployeePremium = document.querySelector(
    '[data-pr="display-premium-per-employee"]',
  );
  let DisplayPerEmployeeSupreme = document.querySelector(
    '[data-pr="display-supreme-per-employee"]',
  );

  // Total investment
  let DisplayTotalInvPremium = document.querySelector(
    '[data-pr="display-premium-total-inv"]',
  );
  let DisplayTotalInvSupreme = document.querySelector(
    '[data-pr="display-supreme-total-inv"]',
  );

  // ROI Per year
  let DisplayRoiPyPremium = document.querySelector(
    '[data-pr="display-premium-roi-py"]',
  );
  let DisplayRoiPySupreme = document.querySelector(
    '[data-pr="display-supreme-roi-py"]',
  );

  // ROI Per Multiple

  let DisplayRoiMultiplePremium = document.querySelector(
    '[data-pr="display-premium-roi-multiple"]',
  );
  let DisplayRoiMultipleSupreme = document.querySelector(
    '[data-pr="display-supreme-roi-multiple"]',
  );

  // Discount Selectors

  let DisplayDiscountPremium = document.querySelector(
    '[data-pr="discountpremium"]',
  );

  let DisplayDiscountSupreme = document.querySelector(
    '[data-pr="discountsupreme"]',
  );

  function updatePricingConstants() {
    if (currencySelected === "€") {
      currencyIcon.forEach((item) => (item.textContent = "€"));
      DisplayPremiumPricingUsers.forEach(
        (item) => (item.textContent = `€${RateEurosAnnualPremiumUsers}`),
      );
      DisplaySupremePricingUsers.forEach(
        (item) => (item.textContent = `€${RateEurosAnnualSupremeUsers}`),
      );
      DisplaySupremePricingView.textContent = `€${RateEurosAnnualSupremeViews}`;
    } else {
      currencyIcon.forEach((item) => (item.textContent = "$"));
      DisplayPremiumPricingUsers.forEach(
        (item) => (item.textContent = `$${RateDollarsAnnualPremiumUsers}`),
      );
      DisplaySupremePricingUsers.forEach(
        (item) => (item.textContent = `$${RateDollarsAnnualSupremeUsers}`),
      );
      DisplaySupremePricingView.textContent = `$${RateDollarsAnnualSupremeViews}`;
    }
  }

  // Update quaterly

  function international(arg) {
    return arg.toLocaleString("en-US");
  }

  function updateCurrency() {
    currencySelected = currencySelected === "€" ? "$" : "€";
    dataCurrency.textContent = `Switch to ${currencySelected}`;
  }

  dataCurrency.addEventListener("click", function () {
    updatePricingConstants();
    updateCurrency();
    roilogic();
  });

  dataPricingAnnual.addEventListener("click", function () {
    dataPricingAnnual.classList.add("is--active");
    dataPricingQuaterly.classList.remove("is--active");
  });

  dataPricingQuaterly.addEventListener("click", function () {
    dataPricingQuaterly.classList.add("is--active");
    dataPricingAnnual.classList.remove("is--active");
  });

  // function UpdateDiscountDisplay() {
  //   displayDiscount.forEach((item) => (item.textContent = `${discountOffered}`));
  // }

  function calculateFinalDiscount(value) {
    if (value < 2500) {
      return 0;
    } else if (value < 10000) {
      return 10;
    } else if (value < 25000) {
      return 20;
    } else if (value < 50000) {
      return 40;
    } else if (value < 75000) {
      return 50;
    } else {
      return 60;
    }
  }

  let discountPremium;
  let discountSupreme;

  function roilogic() {
    let numberofusers = Number(inputUserOnly.value);
    let numberofviewonly = Number(inputViewOnly.value);

    let totalmonthlypremiumDollar =
      numberofusers * RateDollarsAnnualPremiumUsers;
    let totalmonthlysupremeDollar =
      numberofusers * RateDollarsAnnualSupremeUsers +
      numberofviewonly * RateDollarsAnnualSupremeViews;

    let totalMonthpremiumEuro = numberofusers * RateEurosAnnualPremiumUsers;
    let totalmonthlysupremeEuro =
      numberofusers * RateEurosAnnualSupremeUsers +
      numberofviewonly * RateEurosAnnualSupremeViews;

    let discountPremiumValue, discountSupremeValue;

    if (currencySelected === "€") {
      DisplayTotalMonthlyPremium.textContent = `$${international(totalmonthlypremiumDollar)}`;
      DisplayTotalMonthlySupreme.textContent = `$${international(totalmonthlysupremeDollar)}`;

      discountPremiumValue = calculateFinalDiscount(totalmonthlypremiumDollar);
      discountSupremeValue = calculateFinalDiscount(totalmonthlysupremeDollar);

      DisplayDiscountPremium.textContent = `${discountPremiumValue}`;
      DisplayDiscountSupreme.textContent = `${discountSupremeValue}`;

      discountPremium = (100 - discountPremiumValue) * 0.01;
      discountSupreme = (100 - discountSupremeValue) * 0.01;

      DisplayYourMonthlyPremium.textContent = `$${international(
        totalmonthlypremiumDollar * discountPremium,
      )}`;
      DisplayYourMonthlySupreme.textContent = `$${international(
        totalmonthlysupremeDollar * discountSupreme,
      )}`;

      DisplayPerEmployeePremium.textContent = `$${international(Number((totalmonthlypremiumDollar * discountPremium) / numberofusers))}`;
      DisplayPerEmployeeSupreme.textContent = `$${international(Number(totalmonthlysupremeDollar * discountSupreme) / (numberofusers + numberofviewonly))}`;

      DisplayTotalInvPremium.textContent = `$${international(totalmonthlypremiumDollar * discountPremium * 12)}`;
      DisplayTotalInvSupreme.textContent = `$${international(totalmonthlysupremeDollar * discountSupreme * 12)}`;

      DisplayRoiPyPremium.textContent = `$${international(5000 * numberofusers)}`;
      DisplayRoiPySupreme.textContent = `$${international(5000 * (numberofusers + numberofviewonly))}`;

      DisplayRoiMultiplePremium.textContent = `${Math.round((5000 * numberofusers) / (totalmonthlypremiumDollar * discountPremium * 12))}`;
      DisplayRoiMultipleSupreme.textContent = `${Math.round((5000 * (numberofusers + numberofviewonly)) / (totalmonthlysupremeDollar * discountSupreme * 12))}`;
    } else {
      discountPremiumValue = calculateFinalDiscount(totalMonthpremiumEuro);
      discountSupremeValue = calculateFinalDiscount(totalmonthlysupremeDollar);

      DisplayDiscountPremium.textContent = `${discountPremiumValue}`;
      DisplayDiscountSupreme.textContent = `${discountSupremeValue}`;

      discountPremium = (100 - discountPremiumValue) * 0.01;
      discountSupreme = (100 - discountSupremeValue) * 0.01;

      DisplayTotalMonthlyPremium.textContent = `€${international(totalMonthpremiumEuro)}`;
      DisplayTotalMonthlySupreme.textContent = `€${international(totalmonthlysupremeEuro)}`;

      DisplayYourMonthlyPremium.textContent = `€${international(
        totalMonthpremiumEuro * discountPremium,
      )}`;
      DisplayYourMonthlySupreme.textContent = `€${international(
        totalmonthlysupremeEuro * discountSupreme,
      )}`;

      DisplayPerEmployeePremium.textContent = `€${international(Number(totalMonthpremiumEuro * discountPremium) / numberofusers)}`;
      DisplayPerEmployeeSupreme.textContent = `€${international(Number((totalmonthlysupremeEuro * discountSupreme) / (numberofusers + numberofviewonly)))}`;

      DisplayTotalInvPremium.textContent = `€${international(totalMonthpremiumEuro * discountPremium * 12)}`;
      DisplayTotalInvSupreme.textContent = `€${international(totalmonthlysupremeEuro * discountSupreme * 12)}`;

      DisplayRoiPyPremium.textContent = `€${international(5000 * 0.92 * numberofusers)}`;
      DisplayRoiPySupreme.textContent = `€${international(5000 * 0.92 * (numberofusers + numberofviewonly))}`;

      DisplayRoiMultiplePremium.textContent = `${Math.round((5000 * 0.92 * numberofusers) / (totalMonthpremiumEuro * discountPremium * 12))}`;
      DisplayRoiMultipleSupreme.textContent = `${Math.round((5000 * 0.92 * (numberofusers + numberofviewonly)) / (totalmonthlysupremeEuro * discountSupreme * 12))}`;
    }
  }

  inputUserOnly.addEventListener("input", roilogic);
  inputViewOnly.addEventListener("input", roilogic);

  //----------------Load them onLoad ---------------------
  updatePricingConstants();
  updateCurrency();
  roilogic();
}

runAnnually();
