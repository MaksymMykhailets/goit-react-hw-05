import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';

const getClassNames = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.isActive);
};

const Navigation = () => (
  <nav className={styles.nav}>
    <NavLink className={getClassNames} to="/">
      Home
    </NavLink>
    <NavLink className={getClassNames} to="/movies">
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
