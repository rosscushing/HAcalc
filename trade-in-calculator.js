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

    if (purchaseSource === 'direct') {
        if (age <= 5) {
            tradeInValue = calculateWeightedValue(purchasePrice, age);
        } else {
            tradeInValue = 25; // Default for hearing aids older than 5 years not purchased directly
        }
    } else {
        tradeInValue = 25; // Default for all non-directly purchased hearing aids older than 5 years
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
    document.getElementById('result').style.display = 'block';
}

function calculateWeightedValue(purchasePrice, age) {
    const maxValues = [500, 400, 350, 300, 250, 190]; // Max values for each year from 0 to 5
    let baseValue = 100; // The lowest possible trade-in value

    if (age < maxValues.length) {
        let maxValue = maxValues[age];
        let range = maxValue - baseValue;
        let depreciationPerYear = Math.floor(range / (age + 1) / 10) * 10;
        return maxValue - (depreciationPerYear * age);
    }

    return baseValue; // Return the lowest value if something goes wrong or if age is unexpectedly high
}

