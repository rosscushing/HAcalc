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

    // Check if the hearing aid is 5 years old or older
    if (age >= 5) {
        if (purchaseSource === 'direct') {
            tradeInValue = 50; // Direct purchase, 5 years ago or more
        } else {
            tradeInValue = 25; // Not purchased directly, 5 years ago or more
        }
    } else if (purchaseSource === 'direct' && age < 5) {
        // Calculate trade-in value for less than 5 years old and purchased directly
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
    document.getElementById('result').style.display = 'block';
}

function calculateWeightedValue(purchasePrice, age, maxTradeInValue) {
    const baseValue = 100; // The lowest value possible
    const range = maxTradeInValue - baseValue; // Total possible decrement
    const depreciationPerYear = Math.floor((range / 5) * ((5 - age) / 5) / 10) * 10; // Adjusted to 5-year scale
    return maxTradeInValue - (depreciationPerYear * age);
}


