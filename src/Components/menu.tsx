import { Folder, Home } from '@mui/icons-material';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <List sx={{ width: "100%", position: "sticky", top: 0 }}>
      <ListItemButton component={NavLink} to="/">
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText>Home</ListItemText>
      </ListItemButton>
      <ListItemButton component={NavLink} to="projects">
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText>Projects</ListItemText>
      </ListItemButton>
    </List>
  )
}

export default Menu;