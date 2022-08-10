import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

fetchCountries('sweden').then(countries => {
  console.log(countries[0].flags.svg);
  console.log(countries[0].name.official);
  console.log(countries[0].capital[0]);
  console.log(countries[0].population);
  let object = countries[0].languages;
  console.log(Object.values(object).join(', '));
});
