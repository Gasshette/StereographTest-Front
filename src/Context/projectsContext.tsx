import React from 'react';
import { Project } from '../Models/project';
import { produce } from 'immer';

interface IProjectsContext {
  projects: Array<Project>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  removeProject: (id: number) => void,
  editOrAddProject: (project: Project, isEditMode: boolean) => void
}

const ProjectContext = React.createContext<IProjectsContext>(null!)


const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = React.useState<Array<Project>>([]);

  const removeProject = (id: number) => {
    const newProjects = [...projects];
    setProjects(newProjects.filter((d) => d.id !== id));
  }

  const editOrAddProject = (project: Project, isEditMode: boolean) => {
    if (isEditMode) {
      //Edit
      const newProjects = produce(projects, draft => {
        const index = projects.findIndex(p => p.id === project.id);
        draft[index] = project;
      });
      setProjects(newProjects);
    } else {
      // Add
      const newProjects = [...projects, project];
      setProjects(newProjects);
    }
  }

  return <ProjectContext.Provider value={{ projects, setProjects, removeProject, editOrAddProject }}>{children}</ProjectContext.Provider>
}

// eslint-disable-next-line
export const useProjectsContext = () => React.useContext(ProjectContext);

export default ProjectsProvider;