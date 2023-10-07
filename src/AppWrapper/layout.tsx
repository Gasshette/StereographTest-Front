import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Menu from '../Components/menu';

const Layout = () => {
  const theme = useTheme();

  return (
    <Box display="flex" minHeight="100%">
      <Box width="20%" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Menu />
      </Box>
      <Box width="80%" p={2}>
        <Outlet />
      </Box>

    </Box>
  )
}

export default Layout;