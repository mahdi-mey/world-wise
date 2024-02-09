import Spinner from '../components/Spinner'
import CityItem from './CityItem';
import styles from "./CityList.module.css";

export default function CityList(cities, isLoading) {

  if(isLoading) return <Spinner />

  return (
    <div className={styles.citylist}>
      {cities.map(city => <CityItem city={city} key={city.id} />)}
    </div>
  );
}
