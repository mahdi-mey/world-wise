import styles from '../components/Sidebar.module.css'
import Logo from './Logo'

function Sidebar() {
  return (
    <div className={styles.sidebar}>
          <Logo />
          {/* <AppNav /> */}
          <p>list of cities</p>

    </div>
  )
}

export default Sidebar
