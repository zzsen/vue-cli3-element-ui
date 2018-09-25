import axios from './axios.config'

export const createProject = (project) => {
  return axios.post('/project', project)
}
