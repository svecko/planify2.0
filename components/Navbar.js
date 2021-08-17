import styles from '../styles/Navbar.module.css';

import Link from 'next/link';
import router, { useRouter } from 'next/router';

import {
  ViewGridIcon,
  ClipboardListIcon,
  FolderOpenIcon,
  CalendarIcon,
  CogIcon,
  LogoutIcon,
} from '@heroicons/react/outline';

export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.nav}>
        <NavItem to="dashboard" icon={<ViewGridIcon />} name="Dashboard" />
        <NavItem to="today" icon={<CalendarIcon />} name="Today" />
        <NavItem to="projects" icon={<FolderOpenIcon />} name="Projects" />

        <div className={styles.group}>
          <NavItem to="settings" icon={<CogIcon />} name="Settings" />
          <NavItem to="logout" icon={<LogoutIcon />} name="Logout" />
        </div>
      </ul>
    </nav>
  );
}

function NavItem(props) {
  const router = useRouter();
  const active = router.pathname === `/${props.to}`;

  return (
    <>
      <li className={styles.item}>
        <Link href={props.to.toLowerCase()}>
          <a className={`${styles.link} ${active ? styles.link__active : ''}`}>
            <span className={styles.icon}>{props.icon}</span>
          </a>
        </Link>
        <div className={styles.tag}>
          <p>{props.name}</p>
        </div>
      </li>
    </>
  );
}
