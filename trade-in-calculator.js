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

    // Cap for hearing aids purchased for less than $2000
    if (purchasePrice < 2000) {
        tradeInValue = Math.min(250, calculateSlidingScaleValue(purchasePrice, age));
    } else if (age > 5) {
        // Set fixed values for hearing aids older than 5 years
        tradeInValue = purchaseSource === 'direct' ? 50 : 25;
    } else if (purchaseSource === 'direct') {
        // Calculate value based on sliding scale for hearing aids less than 5 years old and purchased directly
        tradeInValue = calculateSlidingScaleValue(purchasePrice, age);
    }

    document.getElementById('result').innerText = `Trade-In Value for One Hearing Aid: $${tradeInValue}`;
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
    return Math.max(100, tradeInValue - depreciation);  // Ensure value does not drop below $100
}
