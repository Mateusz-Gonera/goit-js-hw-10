import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');


countryList.style.listStyle = "none";
countryList.style.margin = "0";
countryList.style.padding = "0";

const renderInfo = (countries) => {
  let markupList = countries
    .map(country => {
      return ``;
  })
};

const renderList = (countries) => {
  let markupList = countries
    .map(country => {
      return `<li class="country-element" style="display: flex; align-items: center; padding-bottom: 5px"><img src="${country.flags.svg}" width="30" style="display: inline-block" /><span class="country-span" style="padding-left: 5px;">${country.name.official}</span></li>`
    })
    .join("");
  countryList.innerHTML = markupList;
};



input.addEventListener('input', debounce((event) => {
  let trimInput = input.value.trim();
  if (trimInput === "") {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
    return
  };
  return fetchCountries(trimInput)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {width: '50vw'});
        countryList.innerHTML = "";
    countryInfo.innerHTML = "";
      };
      if (countries.length <= 10 && countries.length >= 2) {
        countryInfo.innerHTML = "";
        renderList(countries);
      };
  console.log(countries);
  console.log(countries[0].flags.svg);
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  let object = countries[0].languages;
  console.log(Object.values(object).join(', '));
  })
  .catch(error => {})
  console.log(trimInput);
}, DEBOUNCE_DELAY))

fetchCountries('peru')
  
