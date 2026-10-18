import React, { Component, Suspense, lazy, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import {
  LayoutDashboard,
  Dumbbell,
  Target,
  ChartNoAxesCombined,
  BookOpen,
  History,
  UserRound,
  LogOut,
  Menu,
  X,
  ArrowUpRight,
  Bot,
} from 'lucide-react';
import { AuthProvider, useAuth, api, useAction } from './lib';
import { Button, Confirm, Empty, Feedback } from './components/ui';
import Auth, { Landing, Brand } from './pages/Auth';
const named = (loader, name) => lazy(() => loader().then((m) => ({ default: m[name] })));
const Dashboard = named(() => import('./pages/Fitness'), 'Dashboard'),
  Progress = named(() => import('./pages/Fitness'), 'Progress'),
  Goals = named(() => import('./pages/Fitness'), 'Goals');
const RoutineList = named(() => import('./pages/Routines'), 'RoutineList'),
  RoutineDetail = named(() => import('./pages/Routines'), 'RoutineDetail'),
  RoutineEditor = named(() => import('./pages/Routines'), 'RoutineEditor'),
  ExerciseCatalog = named(() => import('./pages/Routines'), 'ExerciseCatalog'),
  Workouts = named(() => import('./pages/Routines'), 'Workouts'),
  WorkoutDetail = named(() => import('./pages/Routines'), 'WorkoutDetail');
const Account = lazy(() => import('./pages/Account')),
  Assistant = lazy(() => import('./pages/Assistant'));
class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <div className="fatal">
        <h1>No pudimos mostrar esta pantalla.</h1>
        <p>Recargá la página. Tus datos guardados se conservan.</p>
        <Button onClick={() => window.location.reload()}>Recargar</Button>
      </div>
    ) : (
      this.props.children
    );
  }
}
const links = [
  ['/dashboard', 'Mi panel', LayoutDashboard],
  ['/objetivos', 'Objetivos', Target],
  ['/rutinas', 'Mis rutinas', Dumbbell],
  ['/entrenamientos', 'Entrenamientos', History],
  ['/progreso', 'Mi progreso', ChartNoAxesCombined],
  ['/ejercicios', 'Explorar ejercicios', BookOpen],
  ['/asistente', 'Asistente IA', Bot],
];
function Protected({ permission, children }) {
  const { user } = useAuth();
  return permission && !user.permisos.includes(permission) ? (
    <Empty title="Esta sección necesita otro permiso">
      Tu cuenta no tiene acceso. Consultá al administrador.
    </Empty>
  ) : (
    children
  );
}
function Shell() {
  const { user, loading, error, refresh, setUser } = useAuth(),
    [menu, setMenu] = useState(false),
    [logout, setLogout] = useState(false),
    action = useAction(),
    location = useLocation();
  if (loading) return <div className="loading">Preparando tu espacio…</div>;
  if (error)
    return (
      <div className="fatal">
        <Feedback error={error} />
        <Button onClick={refresh}>Reintentar conexión</Button>
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="app-layout">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      {menu && (
        <button className="sidebar-scrim" aria-label="Cerrar menú" onClick={() => setMenu(false)} />
      )}
      <aside className={`sidebar ${menu ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <Brand />
          <button
            className="icon-btn mobile-only"
            aria-label="Cerrar menú"
            onClick={() => setMenu(false)}
          >
            <X />
          </button>
        </div>
        <p className="nav-label">PREENTREGA · 20/39 CASOS</p>
        <nav aria-label="Principal">
          {user.permisos.includes('fitness:use') &&
            links.map(([path, label, Icon]) => (
              <NavLink to={path} key={path} onClick={() => setMenu(false)}>
                <Icon size={19} />
                {label}
              </NavLink>
            ))}
          <div className="nav-divider" />
          <NavLink to="/me" onClick={() => setMenu(false)}>
            <UserRound size={19} />
            Mi cuenta
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span>NO SE TRATA DE UN DÍA.</span>
            <strong>
              Se trata de
              <br />
              seguir volviendo.
            </strong>
            <ArrowUpRight size={27} />
          </div>
          <button className="profile-button" onClick={() => setLogout(true)}>
            <span className="avatar">{user.nombre.slice(0, 1)}</span>
            <span>
              <strong>{user.nombre}</strong>
              <small>Cerrar sesión</small>
            </span>
            <LogOut size={18} />
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button
            className="icon-btn mobile-only"
            aria-label="Abrir menú"
            onClick={() => setMenu(true)}
          >
            <Menu />
          </button>
          <div className="breadcrumb">
            GYM—OS <span>/</span>{' '}
            {links.find(([p]) => location.pathname.startsWith(p))?.[1] || 'Mi espacio'}
          </div>
          <Link to="/me" className="top-profile">
            <span className="online-dot" />
            Tu espacio personal<span className="avatar small">{user.nombre[0]}</span>
          </Link>
        </header>
        <main id="main-content" className="main-content">
          <ErrorBoundary key={location.pathname}>
            <Suspense
              fallback={
                <div className="loading" role="status">
                  Cargando sección…
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
        <footer className="app-footer">
          <span>GYM—OS · Un día a la vez.</span>
          <Link to="/nosotros">Sobre el proyecto ↗</Link>
        </footer>
      </div>
      {logout && (
        <Confirm
          title="¿Cerrar sesión?"
          action="Cerrar sesión"
          onClose={() => setLogout(false)}
          busy={action.busy}
          error={action.error}
          onConfirm={() =>
            action.run(async () => {
              await api('/auth/logout', { confirmar: true });
              setUser(null);
              setLogout(false);
            })
          }
        >
          Tus registros guardados se conservarán. Podés volver cuando quieras.
        </Confirm>
      )}
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/nosotros" element={<Landing about />} />
            <Route path="/acerca" element={<Navigate to="/nosotros" replace />} />
            <Route path="/contacto" element={<Navigate to="/nosotros" replace />} />
            {['login', 'registro', 'recuperar', 'restablecer'].map((mode) => (
              <Route key={mode} path={`/${mode}`} element={<Auth key={mode} mode={mode} />} />
            ))}
            <Route element={<Shell />}>
              {[
                ['dashboard', Dashboard],
                ['objetivos', Goals],
                ['progreso', Progress],
                ['rutinas', RoutineList],
                ['rutinas/nueva', RoutineEditor],
                ['rutinas/:id', RoutineDetail],
                ['rutinas/:id/editar', RoutineEditor],
                ['entrenamientos', Workouts],
                ['entrenamientos/:id', WorkoutDetail],
                ['ejercicios', ExerciseCatalog],
                ['asistente', Assistant],
              ].map(([path, Page]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Protected permission="fitness:use">
                      <Page />
                    </Protected>
                  }
                />
              ))}
              <Route path="me" element={<Account />} />
            </Route>
            <Route
              path="*"
              element={
                <div className="fatal">
                  <Brand />
                  <Empty title="Este camino no existe" to="/dashboard" action="Volver a mi panel">
                    Revisá la dirección o volvé a tu espacio.
                  </Empty>
                </div>
              }
            />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}
