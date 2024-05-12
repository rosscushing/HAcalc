document.getElementById('tradeInForm').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (validateInputs()) {
            calculateTradeInValue();
        } else {
            alert('Please fill in all required fields.');
        }
    }
});

function validateInputs() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const purchaseMonth = document.getElementById('purchaseMonth').value;
    const purchaseYear = document.getElementById('purchaseYear').value;
    const purchasePrice = document.getElementById('purchasePrice').value;

    return purchaseSource && purchaseMonth && purchaseYear && purchasePrice; // Ensures all fields are not empty
}

function calculateTradeInValue() {
    const purchaseSource = document.getElementById('purchaseSource').value;
    const purchaseMonth = parseInt(document.getElementById('purchaseMonth').value);
    const purchaseYear = parseInt(document.getElementById('purchaseYear').value);
    const purchasePrice = parseInt(document.getElementById('purchasePrice').value);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    let age = currentYear - purchaseYear;
    if (currentMonth < purchaseMonth) {
        age--;
    }

    let tradeInValue = 100; // Default fallback value

    if (purchaseSource === 'direct') {
        if (purchasePrice >= 2500) {
            if (age <= 2) {
                tradeInValue = 500;
            } else if (age > 2 && age <= 3) {
                tradeInValue = 400;
            } else if (age > 3 && age <= 4) {
                tradeInValue = 300;
            } else if (age > 4 && age <= 5) {
                tradeInValue = 200;
            }
        } else if (purchasePrice >= 1800 && purchasePrice <= 2499) {
            if (age <= 2) {
                tradeInValue = 400;
            } else if (age > 2 && age <= 3) {
                tradeInValue = 300;
            } else if (age >= 3 && age <= 4) {
                tradeInValue = 200;
            }
        } else if (purchasePrice >= 1300 && purchasePrice <= 1799) {
            if (age <= 3) {
                tradeInValue = 275;
            } else if (age > 3 && age <= 4) {
                tradeInValue = 175;
            }
        }
    }

    document.getElementById('result').innerText = `Trade-In Value: $${tradeInValue}`;
}
