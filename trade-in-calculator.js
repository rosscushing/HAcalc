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

    if (purchaseSource === 'direct' && age <= 4) {
        if (purchasePrice >= 2500) {
            tradeInValue = calculateSlidingScaleValue(purchasePrice, age, 500);
        } else if (purchasePrice >= 2000) {
            tradeInValue = calculateSlidingScaleValue(purchasePrice, age, 400);
        } else if (purchasePrice >= 1500) {
            tradeInValue = calculateSlidingScaleValue(purchasePrice, age, 300);
        } else if (purchasePrice >= 1000) {
            tradeInValue = calculateSlidingScaleValue(purchasePrice, age, 200);
        } else {
            tradeInValue = calculateSlidingScaleValue(purchasePrice, age, 100);
        }
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
    document.getElementById('result').style.display = 'block';
}

function calculateSlidingScaleValue(purchasePrice, age, maxTradeInValue) {
    const baseValue = 100; // The lowest value possible
    const range = maxTradeInValue - baseValue; // Total possible decrement
    const depreciationPerYear = Math.floor(range / 4 / 10) * 10; // $10 decrement steps
    return maxTradeInValue - (depreciationPerYear * age);
}
