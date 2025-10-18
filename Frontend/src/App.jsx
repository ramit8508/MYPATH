import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import FirstpageSchool from './Pages/ContinueAsSchoolStudent/FirstpageSchool'
import SecondPageSchool from './Pages/ContinueAsSchoolStudent/SecondPageSchool'
import FirstPageCollege from './Pages/ContinueAsCollegeStudent/FirstPageCollege'
import DashBoardSchool from './Pages/ContinueAsSchoolStudent/DashBoardSchool'
import DashBoardCollege from './Pages/ContinueAsCollegeStudent/DashBoardCollege'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/firstpage" element={<FirstpageSchool />} />
      <Route path="/secondpage" element={<SecondPageSchool />} />
      <Route path="/firstpagecollege" element={<FirstPageCollege />} />
      <Route path="/dashboardschool" element={<DashBoardSchool />} /> 
      <Route path="/dashboardcollege" element={<DashBoardCollege />} />
    </Routes>
  )
}

export default App;


