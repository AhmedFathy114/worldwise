import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import ReactCountryFlag from "react-country-flag";
import { useCities } from "../contexts/Context";
function CityItem({ city }) {
    const { cityName, emoji, date , id , position} = city;
    const formatDate = (date) =>
        Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        }).format(new Date(date));
    
    const {currentCity , deleteCity} = useCities();
    const isActive = id === currentCity.id;

    function handleClick(e){
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <>
        <li >
            <Link className={`${styles.cityItem} ${isActive ? styles['cityItem--active'] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
            <span className={styles.emoji}>
            <ReactCountryFlag countryCode={emoji} svg />
            </span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>
            ({formatDate(date)})
            </time>
            <button className={styles.deleteBtn}
            onClick={handleClick}
            >&times;</button>
            </Link>
        </li>
        </>
    );
}

export default CityItem;
