import { Eye, EyeOff, Lock, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match.');
      return;
    }

    alert('Password updated successfully');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#2b2b2b] bg-[#181818] shadow-xl">
        <div className="p-8">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="text-sm text-lime-400 transition hover:text-lime-300"
          >
            ← Back to Profile
          </button>

          <div className="mt-6 rounded-2xl border border-[#2b2b2b] bg-[#121212] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-lime-500/15 p-3 text-lime-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Change Password</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Update your account password from a dedicated secure page.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {[
                {
                  label: 'Current Password',
                  value: currentPassword,
                  setter: setCurrentPassword,
                  show: showCurrent,
                  toggle: () => setShowCurrent((prev) => !prev),
                },
                {
                  label: 'New Password',
                  value: newPassword,
                  setter: setNewPassword,
                  show: showNew,
                  toggle: () => setShowNew((prev) => !prev),
                },
                {
                  label: 'Confirm Password',
                  value: confirmPassword,
                  setter: setConfirmPassword,
                  show: showConfirm,
                  toggle: () => setShowConfirm((prev) => !prev),
                },
              ].map((field) => (
                <div key={field.label} className="relative">
                  <label className="mb-2 block text-sm text-gray-400">{field.label}</label>
                  <Lock className="absolute left-4 top-11 text-gray-500" size={18} />
                  <input
                    type={field.show ? 'text' : 'password'}
                    value={field.value}
                    onChange={(event) => field.setter(event.target.value)}
                    className="w-full rounded-xl border border-[#2b2b2b] bg-[#0f0f0f] py-3 pl-11 pr-12 outline-none"
                  />
                  <button
                    type="button"
                    onClick={field.toggle}
                    className="absolute right-4 top-11 text-gray-400"
                  >
                    {field.show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="w-full rounded-xl bg-lime-500 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
