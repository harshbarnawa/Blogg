import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../state/AuthContext';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, password: form.password });
      }
    } catch (err) {
      console.error(err);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-sm backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Welcome to InsightSpace</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {mode === 'login' ? 'Sign in to continue' : 'Create your account'}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Join our writer community, publish blogs, and engage with peers.
        </p>

        <form className="mt-8 space-y-4 text-left" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none"
          />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
          >
            {loading ? 'Processing…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-500">
          {mode === 'login' ? 'Need an account?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setMode((prev) => (prev === 'login' ? 'register' : 'login'))}
            className="font-semibold text-slate-800 underline underline-offset-4"
          >
            {mode === 'login' ? 'Join now' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

