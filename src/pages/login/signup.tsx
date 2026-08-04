import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../../utils/auth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    saveUser({
      name: name.trim(),
      email: `${username.trim()}@crmportal.com`,
      role: 'Revenue Ops Lead',
    });

    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10">
      <div className="mx-auto flex max-w-2xl flex-col rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-fit text-sm text-lime-primary hover:underline"
        >
          ← Back to login
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">Create account</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Sign up</h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">Create your CRM Portal account to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#D4D4D8]">Full name</label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none ring-0"
              placeholder="Aarav Mehta"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium text-[#D4D4D8]">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none ring-0"
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-primary px-4 py-3 font-semibold text-[#121212] transition hover:opacity-90"
          >
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}
