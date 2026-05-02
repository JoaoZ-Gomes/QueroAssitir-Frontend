import { createBrowserRouter, Outlet } from 'react-router';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { History } from './pages/History';
import { Premium } from './pages/Premium';

function Root() {
  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
      <Header />
      <Outlet />
    </div>
  );
}

function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-4"
      style={{ color: '#71717a' }}
    >
      <p style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a' }}>404</p>
      <p style={{ fontSize: 14 }}>Página não encontrada</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'resultados', Component: Results },
      { path: 'historico', Component: History },
      { path: 'premium', Component: Premium },
      { path: '*', Component: NotFound },
    ],
  },
]);
