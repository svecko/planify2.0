import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import styles from '../styles/Notification.module.css';
import { Fragment } from 'react';

export default function Notification() {
  const user = null;
  const username = null;

  return (
    <Menu as="div" className={styles.menu}>
      <Menu.Button className={styles.button}>
        <BellIcon />
      </Menu.Button>

      <Menu.Items className={styles.list}>
        <div className={styles.container}>
          <Menu.Item as="div" disabled className={styles.title}>
            Notifications
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}
