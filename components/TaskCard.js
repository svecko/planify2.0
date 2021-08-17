import { Menu, Transition, Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { PencilIcon } from '@heroicons/react/outline';
import { firestore, auth, increment } from '../lib/firebase';
import kebabCase from 'lodash.kebabcase';
import moment from 'moment';

import styles from '../styles/TaskCard.module.css';

import DatePicker from 'react-datepicker';

import { useState } from 'react';
import { Controller, set, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function TaskCard({ name, date, isCompleted, project }) {
  const [completed, setCompleted] = useState(isCompleted);
  const [edit, setEdit] = useState(false);

  const { register, handleSubmit, control, reset } = useForm();

  console.log(new Date(date));

  const onSubmit = async (data) => {
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(`${name}-${project}`);

    setEdit(false);
    reset();

    await ref.update({ dueDate: data.date });
    toast.success('Due Date updated!');
  };

  const updateState = async () => {
    setCompleted(!completed);
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    const projectRef = firestore
      .collection('users')
      .doc(uid)
      .collection('projects')
      .doc(project);

    const taskRef = firestore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(`${name}-${project}`);

    if (!completed) {
      batch.update(projectRef, { completedTasks: increment(1) });
    } else {
      batch.update(projectRef, { completedTasks: increment(-1) });
    }

    batch.update(taskRef, { isCompleted: !completed });
    await batch.commit();
  };

  return (
    <div className={styles.card}>
      {edit ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.form__title}>Edit Task</h1>

          <label htmlFor="date" className={styles.label}>
            Edit Due Date
          </label>
          <Controller
            name="date"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <DatePicker
                minDate={new Date()}
                dateFormat="d. MMMM yyyy"
                className={styles.input}
                onChange={(e) => field.onChange(e)}
                selected={field.value}
                placeholderText={moment(date).format('D. MMM YYYY')}
              />
            )}
          />

          <div className={styles.form__button__container}>
            <button
              className={`${styles.form__button} ${styles.form__button__confirm}`}
              type="submit"
            >
              Save
            </button>
            <button
              className={styles.form__button}
              onClick={() => {
                setEdit(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`${styles.form__button} ${styles.form__button__delete}`}
            >
              Delete
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.button__container}>
          <button className={styles.button} onClick={updateState}>
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
                Due Date:{' '}
                <span className={styles.day}>
                  {moment(date).format('D. MMM YYYY')}
                </span>
              </p>
            </div>
          </button>
          <button className={styles.edit__button} onClick={() => setEdit(true)}>
            <PencilIcon className={styles.edit__button__icon} />
          </button>
        </div>
      )}
    </div>
  );
}
