import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCities } from '../contexts/Context'
function CityList() {
    const {cities , isLoading} = useCities();
    return (
        <>
            {isLoading ? 
            <Spinner/>
            :
            !cities.length ?
            <Message message="Add your first city by clicking on a city on thw map "/>
            :
            <ul className={styles.cityList}>
                {cities.map(city => <CityItem city={city} key={city.id}/>)}
            </ul>
            }
        </>
    )
}

export default CityList
