import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shell from './Shell';
import DashboardPage from '@features/dashboard/DashboardPage';
import AdminPage from '@features/admin/AdminPage';
import JeopardyPage from '@features/jeopardy/JeopardyPage';
import ADPage from '@features/attackdefense/ADPage';
import KothPage from '@features/koth/KothPage';
import LabsPage from '@features/labs/LabsPage';
import ScoreboardPage from '@features/scoreboard/ScoreboardPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'admin', element: <AdminPage /> },
      { path: 'jeopardy', element: <JeopardyPage /> },
      { path: 'attack-defense', element: <ADPage /> },
      { path: 'koth', element: <KothPage /> },
      { path: 'labs', element: <LabsPage /> },
      { path: 'scoreboard', element: <ScoreboardPage /> }
    ]
  }
]);

export function AppRouter() { return <RouterProvider router={router} />; }
