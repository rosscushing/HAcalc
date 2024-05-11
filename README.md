# Hearing Aid Trade-In Value Calculator

## Overview
This repository contains a simple web application designed to calculate the trade-in value of hearing aids based on specific criteria. It's intended for customers or staff to easily determine the potential trade-in value for different hearing aids based on their purchase conditions and age.

## How It Works
The calculator uses the following criteria to determine the trade-in value:
- **$500 per device**: For devices purchased directly from us with an original purchase price exceeding $2500 and less than 3 years old.
- **$400 per device**: For devices purchased directly from us with an original purchase price exceeding $2500 and 4 years old, or priced between $1800-$2499 and less than 3 years old.
- **$300 per device**: For devices purchased directly from us with an original purchase price between $1300-$1799 and less than 3 years old, or priced at $2500 and between 3-4 years old.
- **$200 per device**: For devices not purchased directly from us but less than 3 years old, or with an original purchase price between $1800-$2499 and between 3-4 years old.
- **$100 per device**: Applies to all devices not included in the above categories.

## Usage
To use the calculator:
1. Open the web application hosted on GitHub Pages at 
2. Select whether the hearing aid was purchased directly from us.
3. Enter the original purchase price.
4. Enter the age of the hearing aid.
5. Click the "Calculate Trade-In Value" button to see the result.

## Files
- `index.html`: The main HTML file for the web application.
- `style.css`: Contains styling for the web application.
- `trade-in-calculator.js`: JavaScript file that contains the logic for calculating the trade-in value.
