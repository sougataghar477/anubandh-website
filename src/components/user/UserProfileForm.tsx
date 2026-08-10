
import React,{  useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
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
import { toast } from "react-toastify";
import axios from "axios";
import api from "../../utils/api";
import Button from "../common/Button";
import { useAuth } from "../../auth/useAuth";
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

export default function UserProfile({ isOwnProfile,isEditable }:UserProfileProps) {
    const {userId} = useParams();
    console.log(userId)
    const roleOptions = [{label:"Admin",value:"admin"},{label:"Marketing",value:"marketing"}];
    const navigate = useNavigate();
    const {user} = useAuth();
    const userRole = user && user.role.toLowerCase();
    const isAdmin : boolean = user ? userRole === "admin" : false;
    const [formData, setFormData] = useState<UserFormData>(initialFormData);
    const [newPassword,setNewPassword] = useState({password:'',confirmPassword:''})
    const [image, setImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<{
      profilePicture?: string;
    }>({});
    const canManageRoles = isAdmin && !isOwnProfile;
    const canChangeOwnPassword = isOwnProfile;
    const canResetOtherPassword = isAdmin && !isOwnProfile;
    const isPasswordBeingChanged : boolean = formData.password.trim() !== ""; 
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please select an image smaller than 5 MB.");
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
    
  };

  const handleReset = (): void => {
    setFormData(initialFormData);
  };

   const handleCreateUserByAdmin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    try {
      const response = await api.post("/auth/register",formData);
      const successMessage = response.data.message;
      toast.success(successMessage);
      handleReset();
    } catch (error) {
      if(axios.isAxiosError(error)){
        const errorMessage = (error.response && error.response.data.message) || "Failed to Create User";
        toast.error(errorMessage)
      }
      
    }
  };

 const updateProfile = async (url: string) => {
  const response = await api.post(url, {
    name: formData.name.trim(),
    email: formData.email,
    ...(selectedFile.profilePicture && {
      profilePicture: selectedFile.profilePicture,
    }),
  });

  toast.success(
    response.data.message ?? "Profile updated successfully."
  );
};

const updatePassword = async (
  url: string,
  payload: object
) => {
  const response = await api.post(url, payload);

  toast.success(
    response.data.message ?? "Password changed successfully."
  );

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

  const { password: changedPassword, confirmPassword } = newPassword;

  const currentPassword = formData.password;

  const shouldChangePassword =
    currentPassword.trim() !== "" &&
    changedPassword &&
    confirmPassword &&
    changedPassword === confirmPassword;

  if (
    (currentPassword || changedPassword || confirmPassword) &&
    !shouldChangePassword
  ) {
    toast.error("Please check your password fields.");
    return;
  }

  try {
    await updateProfile("/auth/updateProfile");

    if (shouldChangePassword) {
      await updatePassword("/auth/changePassword", {
        password: currentPassword,
        newPassword: changedPassword,
      });
    }
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Request failed."
      );
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};

const handleEditProfileByAdmin = async (
  e: React.SubmitEvent<HTMLFormElement>
) => {
  e.preventDefault();

  try {
    await updateProfile(`/admin/users/${userId}`);

    if (formData.password.trim()) {
      await updatePassword(
        `/admin/users/${userId}/password`,
        {
          newPassword: formData.password.trim(),
        }
      );
    }
  } catch (error) {
    console.error(error);

    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Request failed."
      );
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
};
  const logout = () => {
     
    navigate("/login");
  };
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
        toast.error(
          error.response?.data?.message ?? "Failed to fetch profile."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
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
  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white flex items-center">

      <div className="mx-auto max-w-5xl flex-1">

        <form onSubmit={(e) => formHandler(e)} className="rounded-3xl border border-[#2b2b2b] bg-[#181818] shadow-xl overflow-hidden">

          {/* Header */}


          <div className="p-8">

            {/* Avatar */}

            <div className="flex flex-col items-center">

              <div className="relative">
                    <div className="w-36 h-36 rounded-full border-4 border-lime-400 overflow-hidden">
                    {image ? (
                        <img
                        src={image}
                        className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center text-6xl font-bold text-black">
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
                            onChange={e => setNewPassword(prev => ({...prev,password:e.target.value}))}
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
              />
              <Button
              label="Logout"
              onClick={logout}
              className="bg-transparent border border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              icon={<LogOut/>}
              />


            </div>

          </div>

        </form>

      </div>

    </div>
  );
}