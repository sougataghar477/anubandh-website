import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../utils/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      return;
    }

    saveUser({
      name: username.trim(),
      email: `${username.trim()}@crmportal.com`,
      role: 'Revenue Ops Lead',
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-2xl md:p-12">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">CRM Portal</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">Sign in to see your profile details.</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#D4D4D8]">Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none ring-0"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#D4D4D8]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none ring-0"
              placeholder="Enter password"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-[#A0A0A0]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn((value) => !value)}
                className="h-4 w-4 rounded border-[#2B2B2B] bg-[#121212]"
              />
              Keep me signed in
            </label>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-lime-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-primary px-4 py-3 font-semibold text-[#121212] transition hover:opacity-90"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-[#A0A0A0]">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-semibold text-lime-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
