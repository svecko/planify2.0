import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, PlusIcon } from '@heroicons/react/solid';
import styles from '../styles/Project.module.css';
import DatePicker from 'react-datepicker';
import {
  auth,
  docToJSON,
  firestore,
  increment,
  serverTimestamp,
} from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TaskFeed from './TaskFeed';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast';

export default function Project({ name, description }) {
  let [taskOpen, setTaskOpen] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    const taskRef = firestore
      .collection('users')
      .doc(uid)
      .collection('tasks')
      .doc(`${data.task}-${name}`);

    const projectRef = firestore
      .collection('users')
      .doc(uid)
      .collection('projects')
      .doc(name);

    const taskData = {
      name: data.task,
      projectId: name,
      dueDate: data.date,
      createdAt: serverTimestamp(),
      isCompleted: false,
    };

    batch.update(projectRef, { totalTasks: increment(1) });
    batch.set(taskRef, taskData);

    await batch.commit();
    setTaskOpen(false);
    reset();

    toast.success('Task added!');
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.project__title}>{name}</h1>
      <p className={styles.project__description}>{description}</p>

      {taskOpen ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.form__title}>Create new Task</h1>
          <label htmlFor="task" className={styles.label}>
            Add Task Name
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter task name..."
            {...register('task')}
          />
          <label htmlFor="due-date" className={styles.label}>
            Add Due Date
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
                placeholderText="Enter due date..."
              />
            )}
          />
          <div className={styles.form__button__container}>
            <button
              className={`${styles.form__button} ${styles.form__button__confirm}`}
              type="submit"
            >
              Add
            </button>
            <button
              className={styles.form__button}
              onClick={() => {
                setTaskOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.disclosure__container}>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className={styles.disclosure__button}>
                  <p className={styles.disclosure__tasks__count}>Tasks</p>
                  <ChevronUpIcon
                    className={`${styles.icon} ${
                      open ? styles.icon__open : ''
                    }`}
                  />
                </Disclosure.Button>
                <div className={styles.line} />
                <Disclosure.Panel className={styles.disclosure__panel}>
                  {<TaskList project={name} isCompleted={false} />}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure defaultOpen={true}>
            {({ open }) => (
              <>
                <Disclosure.Button className={styles.disclosure__button}>
                  <p className={styles.disclosure__tasks__count}>Completed</p>
                  <ChevronUpIcon
                    className={`${styles.icon} ${
                      open ? styles.icon__open : ''
                    }`}
                  />
                </Disclosure.Button>
                <div className={styles.line} />
                <Disclosure.Panel className={styles.disclosure__panel}>
                  <TaskList project={name} isCompleted />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      )}
      <button onClick={() => setTaskOpen(true)} className={styles.button__add}>
        <PlusIcon className={styles.icon__add} />
      </button>
    </div>
  );
}

function TaskList(props) {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('tasks');

  const query = ref
    .where('projectId', '==', props.project)
    .where('isCompleted', '==', props.isCompleted);

  const [querySnapshot] = useCollection(query);

  const tasks = querySnapshot?.docs.map(docToJSON);
  console.log(tasks);

  return (
    <>
      <TaskFeed tasks={tasks} project={props.project} />
    </>
  );
}
