import Navbar from '../../components/Navbar';
import Project from '../../components/Project';
import styles from '../../styles/Today.module.css';
import ProjectAdd from '../../components/ProjectAdd';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import User from '../../components/User';
import AuthCheck from '../../components/AuthCheck';
import CalendarCard from '../../components/CalanderCard';
import TaskFeed from '../../components/TaskFeed';
import AllTaskFeed from '../../components/AllTaskFeed';
import TodayTaskFeed from '../../components/TodayTaskFeed';

import {
  auth,
  docToJSON,
  firestore,
  increment,
  serverTimestamp,
} from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';

export default function Today() {
  return (
    <AuthCheck>
      <div className={styles.container}>
        <div className={styles.container__nav}>
          <Navbar className={styles.nav} />
        </div>
        <div className={styles.container__projects}>
          <Tab.Group className={styles.tab} as="div">
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
                    To-do Tasks
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
                    Completed Tasks
                  </button>
                )}
              </Tab>
              <User />
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className={styles.panel}>
                <CalendarCard />
                <div className={styles.task__container}>
                  <TaskList isCompleted={false} />
                </div>
              </Tab.Panel>
              <Tab.Panel className={styles.panel}>
                <CalendarCard />
                <div className={styles.task__container}>
                  <TaskList isCompleted={true} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </AuthCheck>
  );
}

function TaskList(props) {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('tasks');

  const query = ref.where('isCompleted', '==', props.isCompleted);

  const [querySnapshot] = useCollection(query);

  const tasks = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <TodayTaskFeed tasks={tasks} />
    </>
  );
}
