import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import AuthPage from './pages/Auth';
import Header from './components/Header';
import { useAuth } from './state/AuthContext';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
            <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

