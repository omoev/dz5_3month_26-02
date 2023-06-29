const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');



const convert = (currency, targetInput1, targetInput2, isTrue, currencyType) => {
    currency.oninput = () => {
        const request = new XMLHttpRequest();
        request.open("GET", "data.json");
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        request.onload = () => {
            const response = JSON.parse(request.response);
            if (isTrue && currencyType === "usd") {
                targetInput1.value = (currency.value / response.usd).toFixed(2);
                targetInput2.value = (currency.value / response.eur).toFixed(2);
            } else if (isTrue && currencyType === "eur") {
                targetInput1.value = (currency.value * response.usd).toFixed(2);
                targetInput2.value = (currency.value * response.eur).toFixed(2);
            } else if (!isTrue && currencyType === "usd") {
                targetInput1.value = (currency.value * response.usd).toFixed(2);
                targetInput2.value = (currency.value * (response.usd / response.eur)).toFixed(2);
            } else if (!isTrue && currencyType === "eur") {
                targetInput1.value = (currency.value * (response.eur / response.usd)).toFixed(2);
                targetInput2.value = (currency.value * response.eur).toFixed(2);
            }
            currency.value === '' && (targetInput1.value = '');
            currency.value === '' && (targetInput2.value = '');
        }
    }
}

convert(som, usd, eur, true, "usd");
convert(usd, som, eur, false, "usd");
convert(eur, som, usd, false, "eur");