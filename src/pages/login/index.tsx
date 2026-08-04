import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/useAuth";
import api from "../../utils/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      console.log("Successful Login")
      await login(
        data.user,
        data.accessToken,
        data.refreshToken
      );

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">
            CRM Portal
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none focus:border-lime-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-white outline-none focus:border-lime-primary"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={() =>
                  setKeepSignedIn((v) => !v)
                }
              />

              Keep me signed in
            </label>

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              className="text-lime-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-lime-primary px-4 py-3 font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/signup")
              }
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