import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

import Button from "../common/Button";
import Label from "../common/Label";
import UserInput from "../common/UserInput";
import Popup from "../common/Popup";
import type { PopupType } from "../common/Popup";

interface PopupProps {
  type: PopupType;
  visible: boolean;
  message: string;
  title: string;
}
export interface AuthFormData {
  code?:string;
  name?: string;
  email: string;
  password: string;
}
interface AuthFormProps {
  mode: "login" | "register" | "forgotPassword";



  onSubmit: (data: AuthFormData) => void | Promise<void>;

  loading: boolean;
  isEmailSent?:boolean;
  popupOptions: PopupProps;
  onClosePopup: () => void;

  children?: ReactNode;
}

export default function AuthForm({
  mode,
  children,
  onSubmit,
  isEmailSent,
  loading,
  popupOptions,
  onClosePopup
}: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
  name:"",  
  email: "",
  password: "",
  code:""
});

  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const isLogin = mode === "login";
const isRegister = mode === "register";
const isForgotPassword = mode === "forgotPassword";
const showPasswordField =
  isLogin ||
  isRegister ||
  (isForgotPassword && isEmailSent);
const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await onSubmit(formData);
  };
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-[#2B2B2B] bg-[#181818] p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">
            ANUBANDH
          </p>
          
          <h1 className="mt-2 text-3xl font-semibold text-white">
            {isLogin ? "Welcome Back" : isRegister ? "Create Account" : "Reset Password Here"}
          </h1>

        {
          (isLogin || isRegister) && (<p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Sign in to continue."
              : "Create your account to get started."}
          </p>)
        }

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
         {isRegister && <div>
            <Label text="Name" />

            <UserInput
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
           </div>}
          {/* Email */}
          <div>
            <Label text="Email" />

            <UserInput
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              readOnly
              onFocus={(e) => {
                e.currentTarget.readOnly = false;
              }}
            />
          </div>
          {isForgotPassword && isEmailSent && (
  <div>
    <Label text="Verification Code" />

    <UserInput
      name="code"
      type="text"
      value={formData.code}
      onChange={handleChange}
      placeholder="Enter the verification code"
      
    />
  </div>
)}
          {/* Password */}
          
          { showPasswordField &&  <div>
            <Label text="Password" />

            <div className="relative">
              <UserInput
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pr-12"
                readOnly
                onFocus={(e) => {
                  e.currentTarget.readOnly = false;
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>}

          {/* Register-specific fields */}
          {children}

          {/* Forgot Password */}
          {isLogin && (
            <Link
  to={"/forgotpassword"}
  className="flex justify-end text-sm text-lime-primary underline"
>
  Forgot Password
</Link>
          )}

          {/* Submit */}
          <Button
            type="submit"
            label={isLogin ? "Sign In" : isRegister ? "Create Account" : (isForgotPassword && !isEmailSent) ? "Send Email" : "Reset Password"}
            loading={loading}
          />

          {/* Login / Register link */}
          <div className="text-center text-sm text-gray-400">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}

<Link
  to={isLogin ? "/register" : "/login"}
  className="font-semibold text-lime-primary hover:underline"
>
  {isLogin ? "Register" : "Log in"}
</Link>
          </div>
        </form>

        <Popup
          type={popupOptions.type}
          visible={popupOptions.visible}
          message={popupOptions.message}
          title={popupOptions.title}
          onCancel={onClosePopup}
        />
      </div>
    </div>
  );
}