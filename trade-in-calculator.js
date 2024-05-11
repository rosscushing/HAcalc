function calculateTradeInValue() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
    const age = parseInt(document.getElementById('age').value);

    let tradeInValue = 100; // Default fallback value

    if (purchaseSource === 'direct') {
        if (purchasePrice > 2500) {
            if (age < 3) {
                tradeInValue = 500;
            } else if (age === 4) {
                tradeInValue = 400; 
            }
        } else if (purchasePrice >= 1800 && purchasePrice <= 2499) {
            if (age < 3) {
                tradeInValue = 400;
            } else if (age >= 3 && age <= 4) { // Clear range for age 3-4
                tradeInValue = 200;
            }
        } else if (purchasePrice >= 1300 && purchasePrice <= 1799 && age < 3) {
            tradeInValue = 300;
        } else if (purchasePrice === 2500 && age >= 3 && age <= 4) {
            tradeInValue = 300;
        }
    } else if (age < 3) {
        tradeInValue = 200;
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
}
