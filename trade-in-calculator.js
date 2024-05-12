document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tradeInForm').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateTradeInValue();
        }
    });
});

function calculateTradeInValue() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
    const purchaseYear = parseInt(document.getElementById('purchaseYear').value);
    const currentYear = new Date().getFullYear();

    let age = currentYear - purchaseYear;
    let tradeInValue = 100; // Default minimum value

    if (age > 5) {
        tradeInValue = purchaseSource === 'direct' ? 50 : 25;
    } else if (purchaseSource === 'direct') {
        tradeInValue = calculateSlidingScaleValue(purchasePrice, age);
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
    document.getElementById('result').style.display = 'block';
}

function calculateSlidingScaleValue(purchasePrice, age) {
    let tradeInValue;
    if (purchasePrice >= 2500) {
        tradeInValue = 500;
    } else if (purchasePrice >= 2000) {
        tradeInValue = 400;
    } else if (purchasePrice >= 1500) {
        tradeInValue = 300;
    } else if (purchasePrice >= 1000) {
        tradeInValue = 200;
    } else {
        tradeInValue = 100;
    }

    // Calculate depreciation based on the number of years, reducing the value by $10 per year
    const depreciation = (tradeInValue - 100) * (age / 5); // Depreciate over a scale of 5 years
    return tradeInValue - depreciation;
}
