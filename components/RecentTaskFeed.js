import Task from './TaskCard';

export default function RecentTaskFeed({ tasks }) {
  return tasks
    ? tasks.map((task) => (
        <Task
          name={task.name}
          key={`${task.name}-${task.projectId}`}
          project={task.projectId}
          isCompleted={task.isCompleted}
          date={task.dueDate}
        />
      ))
    : null;
}
