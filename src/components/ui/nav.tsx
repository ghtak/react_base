import styles from './styles/nav.module.scss';
import { Link } from '@tanstack/react-router';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}