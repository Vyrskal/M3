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
selectFrom = (cur, check) => {
    cur = cur.replace(/[^a-zA-Z]+/g, '');
    lastCur = document.querySelector('.from.selected').innerHTML;
    if (cur == to && check === undefined){
        selectTo(lastCur, 1);
    }
    document.querySelector('.from.selected').classList.remove("selected");
    console.log(cur, `.from.${cur}`);
    document.querySelector(`.from.${cur}`).classList.add("selected");
    from = cur;
    getRate();

}
selectTo = (cur, check) => {
    cur = cur.replace(/[^a-zA-Z]+/g, '');
    lastCur = document.querySelector('.to.selected').innerHTML;
    if (cur == from && check === undefined){
        selectFrom(lastCur, 1);
    }
    document.querySelector('.to.selected').classList.remove("selected");
    document.querySelector(`.to.${cur}`).classList.add("selected");
    to=cur;
    getRate();

}
document.querySelector('.js-converter-input').addEventListener('input', () => {
    document.querySelector('.js-converter-output').value=Number((document.querySelector('.js-converter-input').value*rate).toFixed(3));
})
document.querySelector('.js-converter-output').addEventListener('input', () => {
    document.querySelector('.js-converter-input').value=Number((document.querySelector('.js-converter-output').value/rate).toFixed(3));
})