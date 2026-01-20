import { Route, Routes } from 'react-router-dom'
import MainPortal from './Portals/Main/MainPortal'

// Public Pages
import Gateway from './Pages/Global/Landing/Gateway'
import About from './Pages/Global/About/About'
import Course from './Pages/Global/Course/Course'
import Faculty from './Pages/Global/Faculty/Faculty'
import Student from './Pages/Global/Student/Student'
import Career from './Pages/Global/Career/Career'
import Contact from './Pages/Global/Contact/Contact'
import Login from './Pages/Global/Login/Login'

// Portals
import EComUserPortal from './Portals/EComUser/EComUserPortal'
import EComAdminPortal from './Portals/EComAdmin/EComAdminPortal'
import StudentPortal from './Portals/Student/StudentPortal'
import TeacherPortal from './Portals/Teacher/TeacherPortal'
import AdminPortal from './Portals/Admin/AdminPortal'

const App = () => {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}
      <Route path="/" element={<MainPortal />}>
        <Route index element={<Gateway />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Course />} />
        <Route path="faculty" element={<Faculty />} />
        <Route path="student-zone" element={<Student />} />
        <Route path="careers" element={<Career />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* ================= E-COMMERCE ================= */}
      <Route path="/krj-ecom/user/*" element={<EComUserPortal />} ></Route>
      <Route path="/krj-ecom/admin/*" element={<EComAdminPortal />} ></Route>

      {/* ================= EDUCATION ================= */}
      <Route path="/krj-education/student/*" element={<StudentPortal />} ></Route>
      <Route path="/krj-education/teacher/*" element={<TeacherPortal />} ></Route>
      <Route path="/krj-education/admin/*" element={<AdminPortal />} ></Route>

    </Routes>
  )
}

export default App
