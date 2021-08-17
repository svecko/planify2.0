import ProjectCard from './ProjectCard';

export default function ProjectCardFeed({ projects }) {
  return projects
    ? projects.map((project) => (
        <ProjectCard
          name={project.name}
          description={project.description}
          key={project.name}
          date={project.dueDate}
          progress={
            project.totalTasks === 0
              ? 0
              : Math.round((project.completedTasks / project.totalTasks) * 100)
          }
        />
      ))
    : null;
}
