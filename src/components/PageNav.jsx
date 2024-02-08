import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "../components/PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <div className="nav-container">
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/pricing">Prices</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
