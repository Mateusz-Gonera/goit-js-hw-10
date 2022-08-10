import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');

input.addEventListener('input', debounce((event) => {
  console.log(input.value);
}, 500))

fetchCountries('sweden').then(countries => {
  console.log(countries[0].flags.svg);
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  let object = countries[0].languages;
  console.log(Object.values(object).join(', '));
});
