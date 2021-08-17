import styles from '../styles/User.module.css';
import Image from 'next/image';
import Notification from './Notification';
import Profile from './Profile';

import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function User() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.container}>
      {/* <Notification /> */}
      <Profile />
      <img
        src={user?.photoURL}
        className={styles.profile}
        alt="Profile picture"
        width={48}
        height={48}
      />
    </div>
  );
}
