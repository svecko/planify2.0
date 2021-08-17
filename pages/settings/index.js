import styles from '../../styles/Settings.module.css';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import User from '../../components/User';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  PencilIcon,
  CreditCardIcon,
  MoonIcon,
  ChevronLeftIcon,
} from '@heroicons/react/outline';

import { auth, firestore } from '../../lib/firebase';

import { Controller, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';
import AuthCheck from '../../components/AuthCheck';
import toast from 'react-hot-toast';

export default function Settings() {
  return (
    <AuthCheck>
      <div className={styles.container}>
        <div className={styles.bar}>
          <BackButton />
          <User />
        </div>
        <Tab.Group>
          <div className={styles.menu__container}>
            <Tab.List className={styles.tab__buttons}>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? `${styles.tab__button} ${styles.tab__button__active}`
                        : `${styles.tab__button}`
                    }
                  >
                    <PencilIcon className={styles.icon} />
                    Edit Profile
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? `${styles.tab__button} ${styles.tab__button__active}`
                        : `${styles.tab__button}`
                    }
                  >
                    <MoonIcon className={styles.icon} />
                    Appearance
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? `${styles.tab__button} ${styles.tab__button__active}`
                        : `${styles.tab__button}`
                    }
                  >
                    <CreditCardIcon className={styles.icon} />
                    Choose Plan
                  </button>
                )}
              </Tab>
            </Tab.List>
          </div>
          <div className={styles.settings__container}>
            <Tab.Panels className={styles.panels}>
              <Tab.Panel className={styles.panel}>
                <ProfileForm />
              </Tab.Panel>
              <Tab.Panel>
                <span className={styles.big__text}>Coming Soon</span>
              </Tab.Panel>
              <Tab.Panel>
                <span className={styles.big__text}>Coming Soon</span>
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </AuthCheck>
  );
}

function BackButton() {
  const router = useRouter();
  return (
    <button className={styles.back__button} onClick={() => router.back()}>
      <ChevronLeftIcon className={styles.icon} /> Back
    </button>
  );
}

function ProfileForm() {
  const { user, job } = useContext(UserContext);
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid);

    await ref.update({ job: data.job });
    reset();
    toast.success('Profile settings updated!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h1 className={styles.form__title}>Edit Profile</h1>
      <label htmlFor="photo" className={styles.label}>
        Photo
      </label>
      <div className={styles.image__container}>
        <img
          src={user?.photoURL}
          className={styles.profile}
          alt="Profile picture"
          width={72}
          height={72}
        />
        <label className={styles.image__label}>
          Change Photo
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className={styles.image__input}
          />
        </label>
      </div>
      <div className={styles.line}></div>
      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        disabled
        className={styles.input}
        type="text"
        placeholder={user.email}
        {...register('email')}
      />
      <label htmlFor="name" className={styles.label}>
        Display Name
      </label>
      <input
        disabled
        className={styles.input}
        type="text"
        placeholder={user.displayName}
        {...register('name')}
      />
      <label htmlFor="job" className={styles.label}>
        Job Title
      </label>
      <input
        className={styles.input}
        type="text"
        placeholder={job}
        {...register('job')}
      />

      <div className={styles.form__button__container}>
        <button
          className={`${styles.form__button} ${styles.form__button__confirm}`}
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
}
