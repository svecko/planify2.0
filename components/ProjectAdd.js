import styles from '../styles/ProjectAdd.module.css';
import { Menu } from '@headlessui/react';
import { firestore, auth, serverTimestamp } from '../lib/firebase';
import toast from 'react-hot-toast';
import kebabCase from 'lodash.kebabcase';

import DatePicker from 'react-datepicker';
import { PlusIcon } from '@heroicons/react/solid';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function ProjectAdd() {
  const { register, handleSubmit, reset, control } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('projects')
      .doc(data.project);

    const projectData = {
      name: data.project,
      dueDate: data.date,
      totalTasks: 0,
      completedTasks: 0,
      description: data.description,
      createdAt: serverTimestamp(),
    };

    await ref.set(projectData);
    setOpen(false);
    reset();

    toast.success('Project added!');
  };

  return (
    <div className={styles.card}>
      {open ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <h1 className={styles.form__title}>Create new Project</h1>
          <label htmlFor="project" className={styles.label}>
            Add Project Name
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter project name..."
            {...register('project')}
          />
          <label htmlFor="description" className={styles.label}>
            Add Project Description
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter project description..."
            {...register('description')}
          />
          <label htmlFor="date" className={styles.label}>
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
                setOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className={styles.button__container}>
          <button className={styles.button__add} onClick={() => setOpen(true)}>
            <PlusIcon className={styles.icon__add} />
          </button>
        </div>
      )}
    </div>
  );
}
