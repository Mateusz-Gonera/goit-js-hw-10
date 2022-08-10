import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const countryList = document.querySelector('ul.country-list');
const countryInfo = document.querySelector('div.country-info');


input.addEventListener('input', debounce((event) => {
  let trimInput = input.value.trim();
  console.log(trimInput);
}, DEBOUNCE_DELAY))

fetchCountries('peru')
  .then(countries => {
  console.log(countries);
  console.log(countries[0].flags.svg);
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  let object = countries[0].languages;
  console.log(Object.values(object).join(', '));
  })
  .catch(error => {})
