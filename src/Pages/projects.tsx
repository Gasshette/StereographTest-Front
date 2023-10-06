import { Box } from '@mui/material';
import { projects } from '../Apis/projectsApis';
import { useEffect } from 'react';

const Projects = () => {
  useEffect(() => {
    projects();
  }, []);

  return <Box>Projects</Box>
}

export default Projects;