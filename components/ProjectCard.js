import { Menu, Transition } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import styles from '../styles/ProjectCard.module.css';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

export default function ProjectCard(props) {
  const user = null;
  const username = null;

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.dropdown__container}>
          <h1 className={styles.title}>{props.name}</h1>
          {/* <Menu as="div" className={styles.menu}>
            <Menu.Button className={styles.button}>
              <DotsHorizontalIcon />
            </Menu.Button>
            <Menu.Items className={styles.list}>
              <Menu.Item as="div" className={styles.item}>
                <PencilIcon className={styles.icon} />
                <p>Edit</p>
              </Menu.Item>
              <Menu.Item as="div" className={styles.item}>
                <TrashIcon className={`${styles.icon} ${styles.danger}`} />
                <p className={styles.danger}>Delete</p>
              </Menu.Item>
            </Menu.Items>
          </Menu> */}
        </div>
        <p className={styles.description}>{props.description}</p>
        {/* <div className={styles.profiles}>
          <div className={styles.image__container}>
            <Image
              className={styles.profile}
              src="/profile.jpg"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.image__container}>
            <Image
              className={styles.profile}
              src="/profile.jpg"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.image__container}>
            <Image
              className={styles.profile}
              src="/profile.jpg"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.image__container}>
            <Image
              className={styles.profile}
              src="/profile.jpg"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.image__container}>
            <Image
              className={styles.profile}
              src="/profile.jpg"
              alt="Profile picture"
              width={32}
              height={32}
            />
          </div>
        </div> */}
        <p className={styles.date}>
          Due Date:{' '}
          <span className={styles.day}>
            {moment(props.date).format('D. MMM YYYY')}
          </span>
        </p>
        <div className={styles.progress__container}>
          <p className={styles.progress}>{props.progress}%</p>
          <div className={styles.progressbar__container}>
            <div
              className={styles.progressbar}
              style={{ width: `${props.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
