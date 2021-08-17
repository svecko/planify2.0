import { auth } from '../lib/firebase';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Profile() {
  const { user, job } = useContext(UserContext);

  return (
    <Menu as="div" className={styles.menu}>
      <Menu.Button className={styles.button}>
        <span className={styles.name}>{user?.displayName}</span>
        <ChevronDownIcon />
      </Menu.Button>
      <Menu.Items className={styles.list}>
        <Menu.Item as="div" className={styles.item__info} disabled>
          <div className={styles.container}>
            <img
              src={user?.photoURL}
              className={styles.profile}
              alt="Profile picture"
              width={48}
              height={48}
            />
            <div className={styles.info}>
              <p className={styles.info__name}>{user?.displayName}</p>
              <p className={styles.info__role}>{job}</p>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item as="div" className={styles.item}>
          <CogIcon className={styles.icon} />
          <Link href="/settings">Account Settings</Link>
        </Menu.Item>
        <Menu.Item as="div" className={styles.item}>
          <LogoutIcon className={styles.icon} />
          <Link href="/logout">Logout</Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
