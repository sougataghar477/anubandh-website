
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
    const [image, setImage] = useState<string | null>(null);
    const canManageRoles = isAdmin && !isOwnProfile;
    const canChangeOwnPassword = isOwnProfile;
    const canResetOtherPassword = isAdmin && !isOwnProfile;
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

   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // try {
    //   const response = await api.post("/auth/register",formData);
    //   const successMessage = response.data.message;
    //   toast.success(successMessage);
    //   handleReset();
    // } catch (error) {
    //   if(axios.isAxiosError(error)){
    //     const errorMessage = (error.response && error.response.data.message) || "Failed to Create User";
    //     toast.error(errorMessage)
    //   }
      
    // }
  };


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

 
  const logout = () => {
     
    navigate("/login");
  };
const { password, confirmPassword } = newPassword;

const passwordsDontMatch =
  password &&
  confirmPassword &&
  password.length === confirmPassword.length &&
  password !== confirmPassword;
useEffect(() => {
  const setUserData = (body:{name:string,email:string,role:UserRole}) => {
    const {name,email,role} = body;
    setFormData(prev => ({...prev,name,role,email}));
  }
  const fetchUserProfileForAdmin = async () => {
    try {
      const response = await api.get(`/admin/users/${userId}`);
      setUserData(response.data.user);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  const fetchUserOwnProfile = async () => {
    try {
      const response = await api.get("/auth/profile");
      setUserData(response.data.user)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message ?? "Failed to fetch profile."
    );
  } else {
    toast.error("An unexpected error occurred.");
  } 
    }
  }
  if(!isOwnProfile){
    fetchUserProfileForAdmin();
  }
  else{
    fetchUserOwnProfile();
  }
},[userId,isOwnProfile])  
  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white flex items-center">

      <div className="mx-auto max-w-5xl flex-1">

        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#2b2b2b] bg-[#181818] shadow-xl overflow-hidden">

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
                            value={formData.password}
                            icon={<Eye/>}
                            placeholder="Enter Password"
                            onChange={handleChange}
                            />
                        </Label>
                        {
                          isEditable && 
                          <div className="flex items-center gap-3 mt-6 rounded-r-md border-l-4 border-amber-500/80 bg-amber-500/10 p-3 text-xs text-amber-200/90">
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                            <p className="leading-relaxed">
                          {
                              canResetOtherPassword ?
                              "Leave this field empty if you don't want to change the user's password."
                              :
                              "Please enter your current password to confirm if you want to change your password or leave it empty if you don't wish to."
                          }
                            </p>
                          </div>
                        }
                        
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
                    {passwordsDontMatch && (
                    <p className="mt-2 flex items-center gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                        <span className="text-base">⚠️</span>
                        Passwords don't match.
                    </p>
                    )}
                    </>
                    }
            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">

              <Button
              type="submit"
              label="Save Profile"
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