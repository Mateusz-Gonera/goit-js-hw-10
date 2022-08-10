import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');
const body = document.querySelector("body");

body.style.padding = "15px";
body.style.backgroundColor = "#f2f5f2";

input.style.width = "30vw";
input.style.fontWeight = "600";


countryList.style.listStyle = "none";
countryList.style.margin = "0";
countryList.style.padding = "0";

const renderInfo = (countries) => {
  let markupInfo = countries
    .map(country => {
      return `<p class="info-header" style="display: flex; align-items: center; font-size: 40px; font-weight: 700; margin: 0; margin-bottom: 30px;" ><img src="${country.flags.svg}" width="30" style="display: inline-block" /><span class="country-span"
      style="padding-left: 5px;">${country.name.official}</span></p> <ul class="info-list" style="list-style: none; padding: 0; margin: 0 " >
        <li class="info-element" style="margin-bottom: 18px;"><span class="info-span" style="font-size: 20px; font-weight: 700; ">Capital:</span><span class="country-info-span" style="font-size: 20px; margin-left: 5px; font-weight: 600 ">${country.capital}</span></li>
        <li class="info-element" style="margin-bottom: 18px;"><span class="info-span" style="font-size: 20px; font-weight: 700; ">Population:</span><span class="country-info-span" style="font-size: 20px; margin-left: 5px; font-weight: 600">${country.population}</span></li>
        <li class="info-element" style="margin-bottom: 18px;"><span class="info-span" style="font-size: 20px; font-weight: 700; ">Languages:</span><span class="country-info-span" style="font-size: 20px; margin-left: 5px; font-weight: 600">${Object.values(country.languages).join(', ')}</span></li>
      </ul> `;
    })
    .join("");
  countryInfo.innerHTML = markupInfo;
};

const renderList = (countries) => {
  let markupList = countries
    .map(country => {
      return `<li class="country-element" style="display: flex; align-items: center; padding-bottom: 5px"><img src="${country.flags.svg}" width="30" style="display: inline-block" /><span class="country-span" style="padding-left: 5px; font-weight: 600">${country.name.official}</span></li>`
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
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", {width: '35vw'});
        countryList.innerHTML = "";
    countryInfo.innerHTML = "";
      };
      if (countries.length <= 10 && countries.length >= 2) {
        countryInfo.innerHTML = "";
        renderList(countries);
      };
      if (countries.length === 1) {
        countryList.innerHTML = "";
        renderInfo(countries);
      };
  console.log(countries);
  console.log(countries[0].flags.svg);
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  let object = countries[0].languages;
  console.log(Object.values(countries[0].languages).join(', '));
  })
  .catch(error => {})
  console.log(trimInput);
}, DEBOUNCE_DELAY))

fetchCountries('peru')
  
