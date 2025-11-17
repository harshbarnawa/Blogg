import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../state/AuthContext';

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-semibold text-slate-800">
          InsightSpace
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-600">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-600 transition hover:border-slate-400"
              >
                Logout
              </button>
            </>
          ) : (
            location.pathname !== '/auth' && (
              <Link
                to="/auth"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

