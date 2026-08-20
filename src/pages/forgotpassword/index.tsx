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
 
export default function ForgotPasswordPage() {
  const navigateTo = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isEmailSent,setIsEmailSent] = useState<boolean>(false);
  const [isPasswordResetted,setIsPasswordResetted] = useState<boolean>(false);
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
    if(isEmailSent && isPasswordResetted){
        navigateTo('/login');
        setIsEmailSent(false);
        setIsPasswordResetted(false);
    }
  };
  
  

  const handleForgotPassword = async ({
    code,
    email,
    password,
  }: AuthFormData) => {

    if(!isEmailSent){
        if (!email.trim()) {
            setPopupOptions({
                type: "failure",
                visible: true,
                title: "Error",
                message: "Email is required",
      });

      return;
    }
    }
    else {
  if (!email.trim() || !code?.trim() || !password?.trim()) {
    setPopupOptions({
      type: "failure",
      visible: true,
      title: "Error",
      message: "Email, Code and New Password are required",
    });

    return;
  }
}

    

    try {
      const payloadMaker = {
        endPoint: !isEmailSent ? "/auth/forgotpassword" : "/auth/verifypassword",
        payload: !isEmailSent ?  {email} : {email,code,newPassword:password},
        successMessage : !isEmailSent ? "Email sent successfully" : "Password reset successful"
      }  
      setLoading(true);
      const { data } = await api.post(payloadMaker.endPoint,payloadMaker.payload);

      console.log("Successful Registration", data);

      setPopupOptions({
        type: "success",
        visible: true,
        title: "Success",
        message: payloadMaker.successMessage,
      });
      if (!isEmailSent) {
  setIsEmailSent(true);
} else {
  setIsPasswordResetted(true);
}
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
      mode="forgotPassword"
      isEmailSent={isEmailSent}
      onSubmit={handleForgotPassword}
      loading={loading}
      popupOptions={popupOptions}
      onClosePopup={closePopup}
    />
  );
}