function findAndRunCode() {
    let attempts = 0;
    const maxAttempts = 10;
    const intervalTime = 100; // Interval time in milliseconds

    const checkElement = setInterval(() => {
        const element = document.querySelector('[style*="scroll-margin-top: 10rem;"]');

        if (element || attempts >= maxAttempts) {
            clearInterval(checkElement);

            const headingElement = document.querySelector('[data-toc="heading"]');
            const tableConditionElement = document.querySelector('[data-toc="table-condition"]');

            if (element) {
                if (headingElement) headingElement.style.display = "block";
                if (tableConditionElement) tableConditionElement.style.display = "block";
            } else {
                if (headingElement) {
                    headingElement.textContent = "No index added";
                }

                if (tableConditionElement) {
                    tableConditionElement.style.display = "none";
                }
            }
        }

        attempts++;
    }, intervalTime);
}

// Call the function to start the search
findAndRunCode();
