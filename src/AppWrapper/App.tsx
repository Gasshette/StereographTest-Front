import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from '../Pages/home';
import Projects from '../Pages/projects';
import ProjectsProvider from '../Context/projectsContext';
import './global.scss';

function App() {

  return (
    <ProjectsProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='projects' element={<Projects />} />
        </Route>
      </Routes>
    </ProjectsProvider>
  )
}

export default App
