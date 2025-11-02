import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shell from './Shell';
import AdminPage from '@features/admin/AdminPage';
import CompetitionPage from '@features/competition/CompetitionPage';
import LabsPage from '@features/labs/LabsPage';

const router = createBrowserRouter([
{
path: '/',
element: <Shell />,
children: [
{ index: true, element: <CompetitionPage /> },
{ path: 'admin', element: <AdminPage /> },
{ path: 'labs', element: <LabsPage /> }
]
}
]);

export function AppRouter() { return <RouterProvider router={router} />; }