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
    { country: 'Greece', code: 'EL', tax: 20 },
    { country: 'Czech Republic', code: 'CZ', tax: 19 },
    { country: 'Portugal', code: 'PT', tax: 23 },
    { country: 'Hungary', code: 'HU', tax: 27 },
    { country: 'Sweden', code: 'SE', tax: 23 },
    { country: 'Austria', code: 'AT', tax: 22 },
    { country: 'Bulgaria', code: 'BG', tax: 21 },
    { country: 'Denmark', code: 'DK', tax: 21 },
    { country: 'Finland', code: 'FI', tax: 17 },
    { country: 'Slovakia', code: 'SK', tax: 18 },
    { country: 'Ireland', code: 'IE', tax: 21 },
    { country: 'Croatia', code: 'HR', tax: 23 },
    { country: 'Lithuania', code: 'LT', tax: 23 },
    { country: 'Slovenia', code: 'SI', tax: 24 },
    { country: 'Latvia', code: 'LV', tax: 20 },
    { country: 'Estonia', code: 'EE', tax: 22 },
    { country: 'Cyprus', code: 'CY', tax: 21 },
    { country: 'Luxembourg', code: 'LU', tax: 25 },
    { country: 'Malta', code: 'MT', tax: 20 },
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
            if (subtotal2 >= 50000) {
                reduc = 15;
            } else if (subtotal2 >= 10000) {
                reduc = 10;
            } else if (subtotal2 >= 7000) {
                reduc = 7;
            } else if (subtotal2 >= 5000) {
                reduc = 5;
            } else if (subtotal2 >= 1000) {
                reduc = 3;
            }
            break;
        default:
            return onResult(null, null);
    }
    const subtotal3 = subtotal2 - (reduc * subtotal2) / 100;

    const total = subtotal3;

    onResult(null, total);
};
