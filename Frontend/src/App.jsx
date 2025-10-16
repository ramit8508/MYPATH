import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import FirstpageSchool from './Pages/ContinueAsSchoolStudent/FirstpageSchool'
import FirstPageCollege from './Pages/ContinueAsCollegeStudent/FirstPageCollege'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/firstpage" element={<FirstpageSchool />} />
      <Route path="/firstpagecollege" element={<FirstPageCollege />} />
    </Routes>
  )
}

export default App;


