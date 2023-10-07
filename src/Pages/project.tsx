import { Box, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Project = () => {
  const location = useLocation();
  const project = location.state.project;

  return (
    <>
      <Typography variant="h4">Project n° {project.id}</Typography>
      {project && Object.entries(project).map(([k, v]) =>
        <Box key={k} display="flex">
          <Box width={'100px'} fontWeight={700} textTransform="capitalize">{k}:</Box>
          <Box>{v as string}</Box>
        </Box>
      )
      }
    </>
  )
}

export default Project;