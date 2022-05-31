let from = "AZN";
let to = "USD";
let rate;
getRate = () => {
  if (from !== to){
fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
.then(res => res.json())
.then(data => {
rate = Object.values(data.rates)[0];
document.querySelector('.js-converter-rate-from').innerHTML=` 1 ${from} = ${Number((rate).toFixed(3))} ${to}`
document.querySelector('.js-converter-rate-to').innerHTML=` 1 ${to} = ${Number((1/rate).toFixed(3))} ${from}`
document.querySelector('.js-converter-output').value=Number((document.querySelector('.js-converter-input').value*rate).toFixed(3));
 }
)}}
getRate();
selectFrom = (cur, check) => {
    cur = cur.replace(/[^a-zA-Z]+/g, '');
    if (cur == to && check === undefined){
        selectTo(from, 1);
    }
    document.querySelector('.from.selected').classList.remove("selected");
    document.querySelector(`.from.${cur}`).classList.add("selected");
    from = cur;
    getRate();
}
selectTo = (cur, check) => {
    cur = cur.replace(/[^a-zA-Z]+/g, '');
    if (cur == from && check === undefined){
        selectFrom(to, 1);
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

















const defaultLocale = "ru";
let locale;
let translations = {};
async function setLocale(newLocale) {
  if (newLocale === locale) return;
  const newTranslations = 
    await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;
  translatePage();
}
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`https://raw.githubusercontent.com/Vyrskal/M3/main/src/asset/lang/${newLocale}.json`);
  return await response.json();
}
function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}
document.addEventListener("DOMContentLoaded", () => {
    setLocale(defaultLocale);
    bindLocaleSwitcher(defaultLocale);
  });
  function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
      setLocale(e.target.value);
    };
  }
  function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerText = translation;
  }
