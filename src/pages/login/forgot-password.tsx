import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    alert(`Password reset link sent to ${email}`);
    navigate('/login');
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

        <div className="mt-6">
          <h1 className="text-2xl font-semibold text-white">Forgot password</h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">
            Enter your email and we will send a secure reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#D4D4D8]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none ring-0"
              placeholder="you@company.com"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-primary px-4 py-3 font-semibold text-[#121212] transition hover:opacity-90"
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
}
