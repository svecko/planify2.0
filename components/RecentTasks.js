import styles from '../styles/RecentTasks.module.css';
import RecentTaskFeed from './RecentTaskFeed';
import { auth, docToJSON, firestore, serverTimestamp } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function RecentTasks() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Recent Tasks</h1>
      <div className={styles.tasks}>{<TaskList isCompleted={false} />}</div>
    </div>
  );
}

function TaskList(props) {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('tasks');

  const query = ref
    .where('isCompleted', '==', props.isCompleted)
    .orderBy('createdAt', 'desc')
    .limit(5);

  const [querySnapshot] = useCollection(query);

  const tasks = querySnapshot?.docs.map(docToJSON);
  console.log(tasks);

  return (
    <>
      <RecentTaskFeed tasks={tasks} />
    </>
  );
}
