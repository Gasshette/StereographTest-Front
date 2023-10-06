import * as _ from './constants';

let getAllprojectsController = new AbortController();

/**
 * Get all projects
 */
export const projects = async () => {
  getAllprojectsController.abort();
  getAllprojectsController = new AbortController();

  const allprojects = await fetch(`${_.BASE_URL}${_.PROJECTS}`, {
    signal: getAllprojectsController.signal,
    method: 'GET',
  });

  return await allprojects.text();
}