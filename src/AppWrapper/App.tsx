import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from '../Pages/home';
import Projects from '../Pages/projects';
import ProjectsProvider from '../Context/projectsContext';
import './global.scss';
import Project from '../Pages/project';

function App() {

  return (
    <ProjectsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='projects' element={<Projects />} />
          <Route path="projects/:id" element={<Project />} />
        </Route>
      </Routes>
    </ProjectsProvider>
  )
}

export default App
