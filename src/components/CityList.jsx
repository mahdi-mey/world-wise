import Spinner from '../components/Spinner'
import CityItem from './CityItem';
import styles from "./CityList.module.css";
import Message from '../components/Message'

export default function CityList({cities, isLoading}) {
  if (isLoading) return <Spinner />

  if (!cities.length) return <Message message='Add your first city by clicking on a city on the map' />

  return (
    <ul className={styles.citylist}>
      {cities.map(city => <CityItem city={city} key={city.id} />)}
    </ul>
  );
}
