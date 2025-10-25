import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Spinner } from './Spinner'

export function ProtectedRoute() {
  const { user, status } = useSelector((state) => state.auth)
  const location = useLocation()

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  // MVP Check: 'admin' role
  const isAdmin = user && user.role === 'admin';

  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render the child admin routes
  return <Outlet />
}