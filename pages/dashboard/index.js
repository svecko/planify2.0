import Navbar from '../../components/Navbar';
import Project from '../../components/Project';
import styles from '../../styles/Dashboard.module.css';
import ProjectAdd from '../../components/ProjectAdd';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import User from '../../components/User';
import ProjectCard from '../../components/ProjectCard';
import RecentTasks from '../../components/RecentTasks';
import Stats from '../../components/Stats';
import AuthCheck from '../../components/AuthCheck';
import ProjectCardFeed from '../../components/ProjectCardFeed';
import { auth, docToJSON, firestore } from '../../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import TaskFeed from '../../components/TaskFeed';
import AllTaskFeed from '../../components/AllTaskFeed';

export default function Dashboard() {
  return (
    <AuthCheck>
      <div className={styles.container}>
        <div className={styles.container__nav}>
          <Navbar className={styles.nav} />
        </div>
        <div className={styles.bar}>
          <User />
        </div>
        <div className={styles.components}>
          <div className={styles.projects}>
            <div className={styles.projects__container}>
              <ProjectList />
            </div>
            <div className={styles.tasks__container}>
              <div className={styles.list__container}>
                <TaskList isCompleted={false} />
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <Stats />
            <RecentTasks />
          </div>
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

  const query = ref
    .where('isCompleted', '==', props.isCompleted)
    .orderBy('dueDate');

  const [querySnapshot] = useCollection(query);

  const tasks = querySnapshot?.docs.map(docToJSON);
  console.log(tasks);

  return (
    <>
      <AllTaskFeed tasks={tasks} />
    </>
  );
}

function ProjectList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('projects');

  const query = ref.orderBy('dueDate');
  const [querySnapshot] = useCollection(query);

  const projects = querySnapshot?.docs.map(docToJSON);

  return (
    <>
      <ProjectCardFeed projects={projects} />
    </>
  );
}
