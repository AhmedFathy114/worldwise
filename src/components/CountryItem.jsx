import styles from "./CountryItem.module.css";
import ReactCountryFlag from "react-country-flag";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span><ReactCountryFlag countryCode={country.emoji} svg /></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
