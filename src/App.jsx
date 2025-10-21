import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import About from './components/about-me/about-me.jsx';
import Projects from './components/projects/Projects.jsx';

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          { <Route path="/" element={<About isServices={0}/>} /> }
          { <Route path="/services" element={<About isServices={1}/>} /> }
          { <Route path="/projects" element={<Projects />} /> }
          {/* <Route path="/cv" element={<Contact />} /> */}
        </Routes>
      </BrowserRouter>
    </>


  )
}

export default App
