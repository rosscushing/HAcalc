document.getElementById('tradeInForm').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        calculateTradeInValue();
    }
});

function calculateTradeInValue() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
    const purchaseYear = parseInt(document.getElementById('purchaseYear').value);
    const currentYear = new Date().getFullYear();

    let age = currentYear - purchaseYear;
    let tradeInValue = 100; // Default minimum value

    if (purchaseSource === 'direct' && age <= 5) {  // Adjusted to consider hearing aids up to 5 years old
        if (purchasePrice >= 2500) {
            tradeInValue = calculateWeightedValue(purchasePrice, age, 500);
        } else if (purchasePrice >= 2000) {
            tradeInValue = calculateWeightedValue(purchasePrice, age, 400);
        } else if (purchasePrice >= 1500) {
            tradeInValue = calculateWeightedValue(purchasePrice, age, 300);
        } else if (purchasePrice >= 1000) {
            tradeInValue = calculateWeightedValue(purchasePrice, age, 200);
        } else {
            tradeInValue = calculateWeightedValue(purchasePrice, age, 100);
        }
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
    document.getElementById('result').style.display = 'block';  // Ensures the result is displayed when calculated
}

function calculateWeightedValue(purchasePrice, age, maxTradeInValue) {
    const baseValue = 100; // The lowest value possible
    const range = maxTradeInValue - baseValue; // Total possible decrement
    // Adjust the weight to decrease depreciation as the age decreases over a 5-year scale
    const depreciationPerYear = Math.floor((range / 5) * ((5 - age) / 5) / 10) * 10;  // Adjusted to 5-year scale
    return maxTradeInValue - (depreciationPerYear * age);
}

