import styles from '../styles/Stats.module.css';
import { auth, docToJSON, firestore } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Stats() {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Statistics</h1>
      <div className={styles.box__container}>
        <Box name="Total Projects" counter="6" />
        <Box name="Total Tasks" counter="13" />
        <Box name="Completed Projects" counter="0" />
        <Box name="Completed Tasks" counter="3" />
      </div>
    </div>
  );
}

function Box(props) {
  return (
    <div className={styles.box}>
      <p className={styles.stat__name}>{props.name}</p>
      <div className={styles.line__container}>
        <div className={styles.line}></div>
        <p className={styles.stat__counter}>{props.counter}</p>
      </div>
    </div>
  );
}
