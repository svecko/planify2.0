import Navbar from '../../components/Navbar';
import Project from '../../components/Project';
import styles from '../../styles/Projects.module.css';
import ProjectAdd from '../../components/ProjectAdd';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import User from '../../components/User';
import AuthCheck from '../../components/AuthCheck';
import { auth, firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import ProjectFeed from '../../components/ProjectFeed';

export default function Projects() {
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
                    Active Projects
                  </button>
                )}
              </Tab>
              {/* <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? `${styles.tab__button} ${styles.tab__button__active}`
                        : `${styles.tab__button}`
                    }
                  >
                    Shared Projects
                  </button>
                )}
              </Tab> */}
              {/* <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={
                      selected
                        ? `${styles.tab__button} ${styles.tab__button__active}`
                        : `${styles.tab__button}`
                    }
                  >
                    Completed Projects
                  </button>
                )}
              </Tab> */}
              <User />
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className={styles.panel}>
                <ProjectList />
              </Tab.Panel>
              {/* <Tab.Panel className={styles.panel}></Tab.Panel> */}
              {/* <Tab.Panel className={styles.panel}>
                <Project name="Planify" description="Task management web app" />
                <Project name="Planify" description="Task management web app" />
                <Project name="Planify" description="Task management web app" />
              </Tab.Panel> */}
            </Tab.Panels>
          </Tab.Group>
        </div>
        <div className={styles.container__add}>
          <ProjectAdd />
        </div>
      </div>
    </AuthCheck>
  );
}

function ProjectList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('projects');

  const query = ref.orderBy('name');
  const [querySnapshot] = useCollection(query);

  const projects = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <ProjectFeed projects={projects} />
    </>
  );
}
