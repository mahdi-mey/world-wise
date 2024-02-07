import { NavLink } from "react-router-dom";
// import styles from './'

export default function PageNav() {
  return (
    <nav className="nav">
      <ul>
        <li>
            <NavLink to='/'>Home</NavLink>
        </li>
        <li>
            <NavLink to='/products'>Products</NavLink>
        </li>
        <li>
            <NavLink to='/pricing'>Prices</NavLink>
        </li>
      </ul>
    </nav>
  );
}
