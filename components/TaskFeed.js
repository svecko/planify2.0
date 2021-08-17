import TaskCard from './TaskCard';
import { fromMillis } from '../lib/firebase';
import kebabCase from 'lodash.kebabcase';

export default function TaskFeed({ tasks, project }) {
  return tasks
    ? tasks.map((task) => (
        <TaskCard
          name={task.name}
          key={task.name}
          project={project}
          isCompleted={task.isCompleted}
          date={task.dueDate}
        />
      ))
    : null;
}
