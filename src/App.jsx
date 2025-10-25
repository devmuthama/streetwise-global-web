import { Route, Routes } from 'react-router-dom'
import { Header } from './components/shared/Header'
import { Footer } from './components/shared/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProgramsPage } from './pages/ProgramsPage'
import { CountiesPage } from './pages/CountiesPage'
import { MediaPage } from './pages/MediaPage'
import { GetInvolvedPage } from './pages/GetInvolvedPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProtectedRoute } from './components/shared/ProtectedRoute'
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminVolunteersPage } from './pages/admin/AdminVolunteersPage'
import { AdminReportsPage } from './pages/admin/AdminReportsPage'
import { AdminMediaPage } from './pages/admin/AdminMediaPage'
import { useAuth } from './hooks/useAuth'

function App() {
  // This custom hook will check the user session on app load
  useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/counties" element={<CountiesPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="volunteers" element={<AdminVolunteersPage />} />
              <Route path="reports" element={<AdminReportsPage />} />
              <Route path="media" element={<AdminMediaPage />} />
            </Route>
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App