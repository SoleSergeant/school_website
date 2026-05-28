import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './admin/layout/AdminLayout'
import RoleGuard from './admin/guards/RoleGuard'
import { AuthProvider } from './admin/context/AuthContext'

// Public pages
import Home from './pages/Home'
import Teachers from './pages/Teachers'
import Students from './pages/Students'
import Articles from './pages/Articles'
import ArticlePage from './pages/ArticlePage'
import Echo from './pages/Echo'
import StudentLife from './pages/StudentLife'
import Admissions from './pages/Admissions'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

// Admin pages
import AdminLogin from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import AdminTeachers from './admin/pages/Teachers'
import AdminStudents from './admin/pages/Students'
import AdminUsers from './admin/pages/Users'
import AdminGallery from './admin/pages/Gallery'
import AdminArticles from './admin/pages/Articles'
import ArticleEditor from './admin/pages/ArticleEditor'
import AdminSurveys from './admin/pages/Surveys'
import SurveyResults from './admin/pages/SurveyResults'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="students" element={<Students />} />
            <Route path="magazine" element={<Articles />} />
            <Route path="magazine/:id" element={<ArticlePage />} />
            <Route path="echo" element={<Echo />} />
            <Route path="life" element={<StudentLife />} />
            <Route path="admissions" element={<Admissions />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<RoleGuard><AdminLayout /></RoleGuard>}>
            <Route index element={<Dashboard />} />
            <Route path="teachers" element={<RoleGuard roles={['superadmin']}><AdminTeachers /></RoleGuard>} />
            <Route path="students" element={<RoleGuard roles={['superadmin']}><AdminStudents /></RoleGuard>} />
            <Route path="users" element={<RoleGuard roles={['superadmin']}><AdminUsers /></RoleGuard>} />
            <Route path="gallery" element={<RoleGuard roles={['superadmin','media']}><AdminGallery /></RoleGuard>} />
            <Route path="articles" element={<RoleGuard roles={['superadmin','writer']}><AdminArticles /></RoleGuard>} />
            <Route path="articles/new" element={<RoleGuard roles={['superadmin','writer']}><ArticleEditor /></RoleGuard>} />
            <Route path="articles/:id/edit" element={<RoleGuard roles={['superadmin','writer']}><ArticleEditor /></RoleGuard>} />
            <Route path="surveys" element={<RoleGuard roles={['superadmin','writer']}><AdminSurveys /></RoleGuard>} />
            <Route path="surveys/:id/results" element={<RoleGuard roles={['superadmin','writer']}><SurveyResults /></RoleGuard>} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
