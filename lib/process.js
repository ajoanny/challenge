const taxesCountries = [
    { country: 'Germany', code: 'DE', tax: 20 },
    { country: 'United Kingdom', code: 'UK', tax: 21 },
    { country: 'France', code: 'FR', tax: 20 },
    { country: 'Italy', code: 'IT', tax: 25 },
    { country: 'Fake', code: 'FAKE', tax: 0 },
    { country: 'Spain', code: 'ES', tax: 19 },
    { country: 'Poland', code: 'PL', tax: 21 },
    { country: 'Romania', code: 'RO', tax: 20 },
    { country: 'Netherlands', code: 'NL', tax: 20 },
    { country: 'Belgium', code: 'BE', tax: 24 },

    { country: 'Fake', code: 'FAKE', tax: 0 },
];

exports.order = function order(
    { prices, quantities, country, reduction },
    onResult
) {
    if (!prices || !quantities) return onResult(null, null);

    const subtotal1 = prices.reduce((subtotal, price, index) => {
        subtotal += price * quantities[index];
        return subtotal;
    }, 0);

    const tax = taxesCountries.find(
        (taxCountry) => taxCountry.code === country
    );
    if (!tax) {
        return onResult(null, null);
    }
    const subtotal2 = subtotal1 + (subtotal1 * tax.tax) / 100;

    let reduc = 0;
    switch (reduction) {
        case 'STANDARD':
            if (subtotal2 >= 1000) {
                if (subtotal2 < 5_000) {
                    reduc = 3;
                }
                if (subtotal2 < 7_000) {
                    reduc = 5;
                }
                if (subtotal2 < 10_000) {
                    reduc = 7;
                }
                if (subtotal2 < 50_000) {
                    reduc = 10;
                }
                if (subtotal2 >= 50_000) {
                    reduc = 15;
                }
            }
            break;
        default:
            return onResult(null, null);
    }
    const subtotal3 = subtotal2 - (reduc * subtotal2) / 100;

    const total = subtotal3;

    onResult(null, total);
};
