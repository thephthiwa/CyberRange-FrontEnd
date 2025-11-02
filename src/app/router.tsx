import { Navigate, Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shell from './Shell';
import AdminPage from '@features/admin/AdminPage';
import CompetitionPage from '@features/competition/CompetitionPage';
import LabsPage from '@features/labs/LabsPage';
import LoginPage from '@features/auth/LoginPage';
import { useAuth } from '@features/auth/AuthContext';

function ProtectedRoute() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Shell />,
        children: [
          { index: true, element: <LabsPage /> },
          { path: 'labs', element: <LabsPage /> },
          { path: 'competition', element: <CompetitionPage /> },
          { path: 'admin', element: <AdminPage /> }
        ]
      }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
]);

export function AppRouter() { return <RouterProvider router={router} />; }