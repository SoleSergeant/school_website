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
import News from './pages/News'
import Committees from './pages/Committees'
import CommitteePage from './pages/CommitteePage'
import Contact from './pages/Contact'

// Admin pages
import AdminLogin from './admin/pages/Login'
import Dashboard from './admin/pages/Dashboard'
import AdminTeachers from './admin/pages/Teachers'
import AdminStudents from './admin/pages/Students'
import AdminUsers from './admin/pages/Users'
import AdminArticles from './admin/pages/Articles'
import ArticleEditor from './admin/pages/ArticleEditor'
import AdminSurveys from './admin/pages/Surveys'
import SurveyResults from './admin/pages/SurveyResults'
import AdminCommittees from './admin/pages/Committees'
import CommitteeEditor from './admin/pages/CommitteeEditor'
import MyCommittee from './admin/pages/MyCommittee'
import ContactSubmissions from './admin/pages/ContactSubmissions'
import AdminNews from './admin/pages/News'

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
            <Route path="news" element={<News />} />
            <Route path="committees" element={<Committees />} />
            <Route path="committees/:slug" element={<CommitteePage />} />
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
            <Route path="committees" element={<RoleGuard roles={['superadmin']}><AdminCommittees /></RoleGuard>} />
            <Route path="committees/new" element={<RoleGuard roles={['superadmin']}><CommitteeEditor /></RoleGuard>} />
            <Route path="committees/:id/edit" element={<RoleGuard roles={['superadmin']}><CommitteeEditor /></RoleGuard>} />
            <Route path="articles" element={<RoleGuard roles={['superadmin','writer']}><AdminArticles /></RoleGuard>} />
            <Route path="articles/new" element={<RoleGuard roles={['superadmin','writer']}><ArticleEditor /></RoleGuard>} />
            <Route path="articles/:id/edit" element={<RoleGuard roles={['superadmin','writer']}><ArticleEditor /></RoleGuard>} />
            <Route path="surveys" element={<RoleGuard roles={['superadmin','writer']}><AdminSurveys /></RoleGuard>} />
            <Route path="surveys/:id/results" element={<RoleGuard roles={['superadmin','writer']}><SurveyResults /></RoleGuard>} />
            <Route path="my-committee" element={<RoleGuard roles={['committee_leader']}><MyCommittee /></RoleGuard>} />
            <Route path="messages" element={<RoleGuard roles={['superadmin']}><ContactSubmissions /></RoleGuard>} />
            <Route path="news" element={<RoleGuard roles={['superadmin']}><AdminNews /></RoleGuard>} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
