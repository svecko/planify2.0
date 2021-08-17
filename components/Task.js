import { CheckIcon } from '@heroicons/react/solid';
import styles from '../styles/Task.module.css';
import { useState } from 'react';

export default function TaskCard({ name, date, isCompleted }) {
  const [completed, setCompleted] = useState(isCompleted);

  return (
    <div className={styles.card}>
      <div className={styles.button__container}>
        <button
          className={styles.button}
          onClick={() => {
            setCompleted(!completed);
          }}
        >
          <div
            className={`${styles.checkbox} ${
              completed ? styles.completed__checkbox : ''
            }`}
          >
            <CheckIcon
              className={`${styles.icon} ${
                completed ? styles.completed__icon : ''
              }`}
            />
          </div>
          <div className={styles.task__container}>
            <p
              className={`${styles.task} ${
                completed ? styles.completed__task : ''
              }`}
            >
              {name}
            </p>
            <p className={styles.date}>
              Due Date: <span className={styles.day}>{date}</span>
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
