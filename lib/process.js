const taxesCountries = [
    { country: 'Germany', code: 'DE', tax: 20 },
    { country: 'United Kingdom', code: 'UK', tax: 21 },
    { country: 'France', code: 'FR', tax: 20 },
    { country: 'Italy', code: 'IT', tax: 25 },
    { country: 'Fake', code: 'FAKE', tax: 0 },
];

exports.order = function order({ prices, quantities, country }, onResult) {
    if (!prices || !quantities) return onResult(null, {});

    const subtotal1 = prices.reduce((subtotal, price, index) => {
        subtotal += price * quantities[index];
        return subtotal;
    }, 0);

    const tax = taxesCountries.find(
        (taxCountry) => taxCountry.code === country
    );
    if (!tax) {
        return onResult(null, {});
    }
    const subtotal2 = subtotal1 + (subtotal1 * tax.tax) / 100;

    const total = subtotal2;

    onResult(null, total);
};
