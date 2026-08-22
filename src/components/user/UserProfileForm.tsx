
import React,{  useEffect, useState } from "react";
import {  useParams } from 'react-router';
import {
  Camera,
  Mail,
  User,
  LogOut,
  Save,
  Eye,
  Info
} from "lucide-react";
import Label from "../common/Label";
import UserInput from "../common/UserInput";
import Select from "../common/Select";
import axios from "axios";
import api from "../../utils/api";
import Button from "../common/Button";
import { useAuth } from "../../auth/useAuth";
import type { PopupType } from "../common/Popup";
import Loader from "../common/Loader";
import Popup from "../common/Popup";
interface UserProfileProps {
  isEditable: boolean;
  isOwnProfile: boolean;
}
type UserRole = 'admin' | 'marketing';
interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  password:string;
}
const initialFormData: UserFormData = {
  name: '',
  email: '',
  role: 'marketing',
  password:''
};
interface PopupProps{
  type:PopupType,
  visible:boolean;
  message:string;
  title:string;
}
export default function UserProfile({ isOwnProfile,isEditable }:UserProfileProps) {
    const {userId} = useParams();
    const [profileFieldsEdited,setProfileFieldsEdited] = useState<boolean>(false);
    const [passwordEdited,setPasswordEdited] = useState<boolean>(false);
    const [submitLoading,setSubmitLoading] = useState<boolean>(false);
    const [pageLoading,setpageLoading] = useState<boolean>(false);
    const roleOptions = [{label:"Admin",value:"admin"},{label:"Marketing",value:"marketing"}];
    const [popupOptions,setPopupOptions] = useState<PopupProps>({type:'failure',visible:false,title:'',message:''})
    const {user} = useAuth();
    const userRole = user && user.role.toLowerCase();
    const isAdmin : boolean = user ? userRole === "admin" : false;
    const [formData, setFormData] = useState<UserFormData>(initialFormData);
    const [newPassword,setNewPassword] = useState({password:'',confirmPassword:''})
    const [image, setImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<{
      profilePicture?: string;
    }>({});
    const closePopup = () => setPopupOptions({type:'failure',visible:false,title:'',message:''})
    const canManageRoles = isAdmin && !isOwnProfile;
    const canChangeOwnPassword = isOwnProfile;
    const canResetOtherPassword = isAdmin && !isOwnProfile;
    const isPasswordBeingChanged : boolean = formData.password.trim() !== ""; 
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        setPopupOptions({type:'failure',visible:true,title:'Error',message:'Please select an image smaller than 5 MB.'})
        return;
      }

      // Fast preview
      setImage(URL.createObjectURL(file));

      // Convert to Base64 for the API
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile({
          profilePicture: reader.result as string,
        });
      };

      reader.readAsDataURL(file);
    };
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
): void => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (name === "password") {
    setPasswordEdited(true);
  } else {
    setProfileFieldsEdited(true);
  }
};

  const handleReset = (): void => {
    setFormData(initialFormData);
  };

   const handleCreateUserByAdmin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    try {
      setSubmitLoading(true)
      const response = await api.post("/auth/register",formData);
      const successMessage = response.data.message;
      setPopupOptions({type:'success',visible:true,title:'Success',message:successMessage})
      handleReset();

    } 
    catch (error) {
      if(axios.isAxiosError(error)){
        const errorMessage = (error.response && error.response.data.message) || "Failed to Create User";
        setPopupOptions({type:'failure',visible:true,title:'Error',message:errorMessage})
      }
    }
    finally{
      setSubmitLoading(false);
    }
  };

const updateProfile = async (url: string) => {
  if (!profileFieldsEdited) {
    return false;
  }

  await api.post(url, {
    name: formData.name.trim(),
    email: formData.email,
    ...(selectedFile.profilePicture && {
      profilePicture: selectedFile.profilePicture,
    }),
  });

  return true;
};

const updatePassword = async (
  url: string,
  payload: object
) => {
  const response = await api.post(url, payload);
  const successMessage = response.data.message ?? "Password changed successfully."
  setPopupOptions({type:'success',visible:true,title:'Error',message:successMessage})

  setFormData(prev => ({
    ...prev,
    password: "",
  }));

  setNewPassword({
    password: "",
    confirmPassword: "",
  });
};

const handleEditProfileByUser = async (
  e: React.SubmitEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const currentPassword = formData.password.trim();
  const changedPassword = newPassword.password.trim();
  const confirmPassword = newPassword.confirmPassword.trim();

  const hasPasswordInput =
    currentPassword !== "" ||
    changedPassword !== "" ||
    confirmPassword !== "";

  const shouldChangePassword =
    currentPassword !== "" &&
    changedPassword !== "" &&
    confirmPassword !== "" &&
    changedPassword === confirmPassword;

  // Password validation
  if (hasPasswordInput && !shouldChangePassword) {
    setPopupOptions({
      type: "failure",
      visible: true,
      title: "Invalid Password Fields",
      message: "Please check your password fields.",
    });
    return;
  }

  // Nothing changed
  if (!profileFieldsEdited && !shouldChangePassword) {
    setPopupOptions({
      type: "failure",
      visible: true,
      title: "No Changes",
      message: "No changes detected.",
    });
    return;
  }

  try {
    setSubmitLoading(true);

    // Update profile only when profile fields changed
    if (profileFieldsEdited) {
      await updateProfile("/auth/updateProfile");
    }

    // Change password only when all password fields are valid
    if (shouldChangePassword) {
      await updatePassword("/auth/changePassword", {
        password: currentPassword,
        newPassword: changedPassword,
      });
    }

    // One success popup after everything succeeds
    setPopupOptions({
      type: "success",
      visible: true,
      title: "Success",
      message:
        profileFieldsEdited && shouldChangePassword
          ? "Profile and password updated successfully."
          : shouldChangePassword
          ? "Password updated successfully."
          : "Profile updated successfully.",
    });

    // Clear password fields after successful update
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));

    setNewPassword({
      password: "",
      confirmPassword: "",
    });
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ?? "Request failed.";

      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Update Failed",
        message: errorMessage,
      });
    } else {
      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Error",
        message: "An unexpected error occurred.",
      });
    }
  } finally {
    setSubmitLoading(false);
    setProfileFieldsEdited(false);
    setPasswordEdited(false);
  }
};
const handleEditProfileByAdmin = async (
  e: React.SubmitEvent<HTMLFormElement>
) => {
  e.preventDefault();

  const newPassword = formData.password.trim();
  const shouldChangePassword = passwordEdited && newPassword !== "";

  // Nothing changed
  if (!profileFieldsEdited && !shouldChangePassword) {
    setPopupOptions({
      type: "failure",
      visible: true,
      title: "No Changes",
      message: "No changes detected.",
    });
    return;
  }

  try {
    setSubmitLoading(true);

    // Update profile only if profile fields were changed
    if (profileFieldsEdited) {
      await updateProfile(`/admin/users/${userId}`);
    }

    // Update password only if password was changed
    if (shouldChangePassword) {
      await updatePassword(`/admin/users/${userId}/password`, {
        newPassword,
      });
    }

    // One final success popup
    setPopupOptions({
      type: "success",
      visible: true,
      title: "Success",
      message:
        profileFieldsEdited && shouldChangePassword
          ? "Profile and password updated successfully."
          : shouldChangePassword
          ? "Password updated successfully."
          : "Profile updated successfully.",
    });

    // Clear password after successful update
    if (shouldChangePassword) {
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));
    }
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ?? "Request failed.";

      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Update Failed",
        message: errorMessage,
      });
    } else {
      setPopupOptions({
        type: "failure",
        visible: true,
        title: "Error",
        message: "An unexpected error occurred.",
      });
    }
  } finally {
    setSubmitLoading(false);
    setProfileFieldsEdited(false);
    setPasswordEdited(false);
  }
};
const {logout} = useAuth();
const { password, confirmPassword } = newPassword;

const passwordsDontMatch =
  password &&
  confirmPassword &&
  password !== confirmPassword;

useEffect(() => {
  if(!isEditable) return;
  
  const setUserData = (body: {
    name: string;
    email: string;
    role: UserRole;
  }) => {
    const { name, email, role } = body;

    setFormData((prev) => ({
      ...prev,
      name,
      email,
      role,
    }));
  };

  const fetchProfile = async () => {
    try {
      setpageLoading(true);
      const url = isOwnProfile
        ? "/auth/profile"
        : `/admin/users/${userId}`;

      const response = await api.get(url);

      setUserData(response.data.user);
      setImage(response.data.user.profile_picture)
      console.log(response.data);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message ??
          "Request failed.";
      setPopupOptions({type:'success',visible:true,title:'Success',message:errorMessage});


      } else {

      setPopupOptions({type:'success',visible:true,title:'Success',message:"An unexpected error occurred."});

      }
    }
    finally{
      setpageLoading(false);
    }
  };

  fetchProfile();
}, [userId, isOwnProfile,isEditable]);
function formHandler(e : React.SubmitEvent<HTMLFormElement>){
  if(isEditable){
    if(isOwnProfile){
      handleEditProfileByUser(e);
    }
    else{
      handleEditProfileByAdmin(e);
    }
    return;
  }
  else{
    handleCreateUserByAdmin(e);
  }
}
if(pageLoading){
  return <Loader/>
}
  return (
    <div className="min-h-screen bg-white p-8 text-black flex items-center">

      <div className="mx-auto max-w-5xl flex-1">

        <form onSubmit={(e) => formHandler(e)} className="rounded-3xl  bg-white shadow-xl overflow-x-hidden">

          {/* Header */}


          <div className="p-8">

            {/* Avatar */}

            <div className="flex flex-col items-center">

              <div className="relative">
                    <div className="w-36 h-36 rounded-full border-4 border-blue-600 overflow-x-hidden">
                    {image ? (
                        <img
                        src={image}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-white flex items-center justify-center text-6xl font-bold text-black">
                        {/* Initials or icon */}
                        </div>
                    )}
                    </div>

                <Label className="absolute bottom-1 right-1 bg-lime-500 p-2 rounded-full cursor-pointer hover:scale-105 transition">
                  <Camera size={18} className="text-black" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImage}
                  />
                </Label>

              </div>

             
            </div>

            {/* Personal Information */}

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div>

               <Label text="Full Name">
                 <UserInput
                    element="input"
                    placeholder="Enter Full Name"
                    icon={<User/>}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    />
               </Label>
              </div>

              <div>

                <Label text="User Email">
                    <UserInput
                    element="input"
                    type="email"
                    name="email"
                    value={formData.email}
                    icon={<Mail/>}
                    placeholder="Enter Email"
                    onChange={handleChange}
                    />
                </Label>
 

              </div>

                    <div>
                        <Label text="Password">
                            <UserInput
                            element="input"
                            type="password"
                            name="password"
                            readOnly
                            onFocus={e => e.target.removeAttribute("readonly")}
                            value={formData.password}
                            icon={<Eye/>}
                            placeholder="Enter Password"
                            onChange={handleChange}
                            />
                        </Label>
                        </div>
                        <div>
                <Label text="Role">
                    <Select
                    name="role"
                    value={formData.role}
                    options={canManageRoles?roleOptions:roleOptions.filter(role => role.value === userRole)}
                    onChange={handleChange}
                    disabled={!canManageRoles}
                    />
                </Label>
                 

              </div>
                    </div>
              {isEditable && (
                <div
                  className={`flex items-center gap-3 mt-6 rounded-r-md border-l-4 p-3 text-xs ${
                    isPasswordBeingChanged
                      ? "border-blue-500/80 bg-blue-500/10 text-blue-200/90"
                      : "border-amber-500/80 bg-amber-500/10 text-amber-200/90"
                  }`}
                >
                  <Info
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isPasswordBeingChanged
                        ? "text-blue-400"
                        : "text-amber-400"
                    }`}
                  />

                  <p className="leading-relaxed">
                    {isPasswordBeingChanged
                      ? "Your password is being edited. If you don't want to change, keep it empty."
                      : canResetOtherPassword
                      ? "Leave this field empty if you don't want to change the user's password."
                      : "Please enter your current password to confirm if you want to change your password or leave it empty if you don't wish to."}
                  </p>
                </div>
              )}
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
              
                    {canChangeOwnPassword && <>
                    <div>
                        <Label text="Enter New Password">
                            <UserInput
                            element="input"
                            type="password"
                            icon={<Eye/>}
                            placeholder="Enter New Password"
                            value={newPassword.password}
                            onChange={e => { 
                              setPasswordEdited(true);
                              setNewPassword(prev => ({...prev,password:e.target.value}));
                            }}
                            />
                        </Label>
                    </div>
                    <div>
                        <Label text="Confirm New Password">
                            <UserInput
                            element="input"
                            type="password"
                            icon={<Eye/>}
                            placeholder="Confirm New Password"
                            value={newPassword.confirmPassword}
                            onChange={e => setNewPassword(prev => ({...prev,confirmPassword:e.target.value}))}
                            />
                        </Label>
                        
                    </div>
                    
                    </>
                    }
                   
            </div>
            {
                          passwordsDontMatch && 
                          <div className="flex items-center gap-3 mt-6 rounded-r-md border-l-4 border-red-500/80 bg-red-500/10 p-3 text-xs text-red-200/90">
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <p className="leading-relaxed">
                          Passwords don't match.
                            </p>
                          </div>
                        }

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <Button
              type="submit"
              label="Save Profile"
              icon={<Save/>}
              loading={submitLoading}
              />
              <Button
              type="button"
              label="Logout"
              onClick={logout}
              className="bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-black"
              icon={<LogOut/>}
              />


            </div>

          </div>

        </form>
      <Popup
      type={popupOptions.type}
      title={popupOptions.title}
      message={popupOptions.message}
      visible={popupOptions.visible}
      onCancel={closePopup}
      />
      </div>

    </div>
  );
}