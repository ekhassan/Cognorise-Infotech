async function populateCurrencyDropdowns() {
    const url = 'https://open.er-api.com/v6/latest';

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.result !== "success") {
            alert('Failed to fetch exchange rates. Please try again later.');
            return;
        }

        const exchangeRates = data.rates;

        // Get currency codes (country codes) from the exchange rates object
        const currencyCodes = Object.keys(exchangeRates);

        // Populate dropdown options for "From" and "To" currencies
        const fromDropdown = document.getElementById('from');
        const toDropdown = document.getElementById('to');

        currencyCodes.forEach(currencyCode => {
            const option = document.createElement('option');
            option.value = currencyCode;
            option.textContent = currencyCode;
            fromDropdown.appendChild(option.cloneNode(true));
            toDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('An error occurred while fetching exchange rates. Please try again later.');
    }
}

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from').value;
    const toCurrency = document.getElementById('to').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const url = 'https://open.er-api.com/v6/latest';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.result !== "success") {
            alert('Failed to fetch exchange rates. Please try again later.');
            return;
        }

        const exchangeRates = data.rates;
        const exchangeRateFrom = exchangeRates[fromCurrency];
        const exchangeRateTo = exchangeRates[toCurrency];

        if (!exchangeRateFrom || !exchangeRateTo) {
            alert('Exchange rate not found for selected currencies.');
            return;
        }

        const convertedAmount = (amount / exchangeRateFrom) * exchangeRateTo;
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        alert('An error occurred while fetching exchange rates. Please try again later.');
    }
}

populateCurrencyDropdowns();
