import { Project } from '../Models/project';
import * as _ from './constants';

let getAllProjectsController = new AbortController();
let removeProjectController = new AbortController();
let addProjectController = new AbortController();

/**
 * Get all projects
 */
export const getAll = async () => {
  getAllProjectsController.abort();
  getAllProjectsController = new AbortController();

  const response = await fetch(`${_.BASE_URL}${_.PROJECTS}`, {
    signal: getAllProjectsController.signal,
    method: 'GET',
  });

  const projects: Array<Project> = await response.json();
  return projects;
}

/**
 * Remove a project
 */
export const remove = async (id: number) => {
  removeProjectController.abort();
  removeProjectController = new AbortController();

  return await fetch(`${_.BASE_URL}${_.PROJECTS}/${id}`, {
    signal: removeProjectController.signal,
    method: 'DELETE',
  });
}

/**
 * Add a project
 */
export const Add = async (project: Project) => {
  addProjectController.abort();
  addProjectController = new AbortController();

  const response = await fetch(`${_.BASE_URL}${_.PROJECTS}`, {
    signal: addProjectController.signal,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });

  const projects: Array<Project> = await response.json();
  return projects;
}

/**
 * Add a project
 */
export const Edit = async (project: Project) => {
  addProjectController.abort();
  addProjectController = new AbortController();

  const response = await fetch(`${_.BASE_URL}${_.PROJECTS}`, {
    signal: addProjectController.signal,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });

  const projects: Array<Project> = await response.json();
  return projects;
}