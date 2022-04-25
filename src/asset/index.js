let from = "AZN";
let to = "USD";
let rate;
let lastCur;
getRate = () => {
fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
.then(res => res.json())
.then(data => {
rate = Object.values(data.rates)[0];
document.querySelector('.js-converter-rate-from').innerHTML=` 1 ${from} = ${Number((rate).toFixed(3))} ${to}`
document.querySelector('.js-converter-rate-to').innerHTML=` 1 ${to} = ${Number((1/rate).toFixed(3))} ${from}`
document.querySelector('.js-converter-output').value=Number((document.querySelector('.js-converter-input').value*rate).toFixed(3));
 }
)
return rate}
getRate();
selectFrom = (id, check) => {
    lastCur = document.querySelector('.from.selected').id;
    if (document.getElementById(id).innerHTML == to && check === undefined){
        selectTo(Number(lastCur)+4, 1);
    }
    document.querySelector('.from.selected').classList.remove("selected");
    document.getElementById(id).classList.add("selected");
    from = document.getElementById(id).innerHTML;
    getRate();

}
selectTo = (id, check) => {
    lastCur = document.querySelector('.to.selected').id;
    if (document.getElementById(id).innerHTML == from && check === undefined){
        selectFrom(Number(lastCur)-4, 1);
    }
    document.querySelector('.to.selected').classList.remove("selected");
    document.getElementById(id).classList.add("selected");
    to = document.getElementById(id).innerHTML;
    getRate();

}
document.querySelector('.js-converter-input').addEventListener('input', () => {
    document.querySelector('.js-converter-output').value=Number((document.querySelector('.js-converter-input').value*rate).toFixed(3));
})
document.querySelector('.js-converter-output').addEventListener('input', () => {
    document.querySelector('.js-converter-input').value=Number((document.querySelector('.js-converter-output').value/rate).toFixed(3));
})