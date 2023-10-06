import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from '../Pages/home';
import Projects from '../Pages/projects';
import './global.scss';

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='projects' element={<Projects />} />
      </Route>
    </Routes>
  )
}

export default App
