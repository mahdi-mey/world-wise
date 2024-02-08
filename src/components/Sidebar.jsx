import { Outlet } from 'react-router-dom'
import styles from '../components/Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'

function Sidebar() {
  return (
    <div className={styles.sidebar}>
          <Logo />
          <AppNav />
          <Outlet />
    </div>
  )
}

export default Sidebar
