import moment from 'moment';
import Task from './TaskCard';
import { fromMillis } from '../lib/firebase';

export default function TodayTaskFeed({ tasks }) {
  console.log(tasks);

  return tasks
    ? tasks
        .filter(
          (task) =>
            task.dueDate.seconds ===
            fromMillis(moment().startOf('day').toDate()).seconds
        )
        .map((task) => (
          <Task
            name={task.name}
            key={`${task.name}-${task.projectId}`}
            project={task.projectId}
            isCompleted={task.isCompleted}
            date={task.dueDate.toMillis()}
          />
        ))
    : null;
}
