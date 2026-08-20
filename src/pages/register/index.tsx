import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import AuthForm, { type AuthFormData } from "../../components/auth/AuthForm";
import api from "../../utils/api";
import type { PopupType } from "../../components/common/Popup";

interface PopupProps {
  type: PopupType;
  visible: boolean;
  message: string;
  title: string;
}
 
export default function RegisterPage() {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isRegistrationSuccess,setIsRegistrationSuccess] = useState<boolean>(false)
  const [popupOptions, setPopupOptions] = useState<PopupProps>({
    type: "failure",
    visible: false,
    message: "",
    title: "Error",
  });

  const closePopup = () => {
    setPopupOptions({
      type: "failure",
      visible: false,
      message: "",
      title: "Error",
    });
    if(isRegistrationSuccess){
        navigateTo('/login');
        setIsRegistrationSuccess(false);
    }
  };

  const handleRegister = async ({
    name,
    email,
    password,
  }: AuthFormData) => {
    if (!name?.trim() || !email.trim() || !password.trim()) {
      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Error",
        message: "Email and Password required",
      });

      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role:"marketing"
      });

      console.log("Successful Registration", data);

      setPopupOptions({
        type: "success",
        visible: true,
        title: "Success",
        message: "Account created successfully",
      });

      setIsRegistrationSuccess(true);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response;

        setPopupOptions({
          type: "failure",
          visible: true,
          title: "Error",
          message:
            errorResponse?.data?.message ||
            "Something Went Wrong",
        });

        console.error(error);

        return;
      }

      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Error",
        message: "Something Went Wrong",
      });

      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="register"
      onSubmit={handleRegister}
      loading={loading}
      popupOptions={popupOptions}
      onClosePopup={closePopup}
    />
  );
}