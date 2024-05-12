document.addEventListener('DOMContentLoaded', function() {
    populateYearDropdown();
    document.getElementById('tradeInForm').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateTradeInValue();
        }
    });
});

function populateYearDropdown() {
    const purchaseYearSelect = document.getElementById('purchaseYear');
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= 10; i++) {
        const yearOption = document.createElement('option');
        yearOption.value = currentYear - i;
        yearOption.text = currentYear - i;
        purchaseYearSelect.appendChild(yearOption);
    }
}

function calculateTradeInValue() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const deviceType = document.getElementById('deviceType').value;
    const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
    const purchaseYear = parseInt(document.getElementById('purchaseYear').value);
    const currentYear = new Date().getFullYear();

    let age = currentYear - purchaseYear;
    let tradeInValue = 100; // Default minimum value

    if (purchasePrice < 2000) {
        tradeInValue = Math.min(250, calculateSlidingScaleValue(purchasePrice, age));
    } else if (age > 5) {
        tradeInValue = purchaseSource === 'direct' ? 50 : 25;
    } else if (purchaseSource === 'direct') {
        tradeInValue = calculateSlidingScaleValue(purchasePrice, age);
    }

    if (deviceType === 'custom') {
        tradeInValue = Math.round(tradeInValue * 0.95); // Reduce by 5% for custom devices
    }

    let tradeInValueForTwo = tradeInValue * 2; // Calculate the value for two hearing aids

    document.getElementById('result').innerText = `Trade-In Value for one hearing aid: $${tradeInValue}`;
    document.getElementById('resultForTwo').innerText = `Trade-In Value for two hearing aids: $${tradeInValueForTwo}`;
    document.getElementById('result').style.display = 'block';
    document.getElementById('resultForTwo').style.display = 'block';
}

function calculateSlidingScaleValue(purchasePrice, age) {
    let tradeInValue = purchasePrice >= 2500 ? 500 :
                       purchasePrice >= 2000 ? 400 :
                       purchasePrice >= 1500 ? 300 :
                       purchasePrice >= 1000 ? 200 : 100;

    const depreciation = (tradeInValue - 100) * (age / 5); // Depreciate over a scale of 5 years
    return Math.max(100, tradeInValue - depreciation);  // Ensure value does not drop below $100
}
