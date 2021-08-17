import Project from './Project';

export default function ProjectFeed({ projects }) {
  return projects
    ? projects.map((project) => (
        <Project
          name={project.name}
          description={project.description}
          key={project.name}
        />
      ))
    : null;
}
