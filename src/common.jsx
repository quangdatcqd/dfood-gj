export const fomatCurrency = (number) => {
    return Number(number) > 0 ? number.toLocaleString('it-IT', { style: 'currency', currency: "VND" }) : 0;
}