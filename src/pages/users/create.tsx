// import React, { useState } from 'react';
// import type { ChangeEvent } from 'react';
// import { ShieldCheck, Activity, UserPlus } from 'lucide-react';
// import Button from '../../components/common/Button';
// import Label from '../../components/common/Label';
// import UserInput from '../../components/common/UserInput';
// import Select from '../../components/common/Select';
// import api from '../../utils/api';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// // Form Data Interface
// interface UserFormData {
//   name: string;
//   email: string;
//   role: 'admin' | 'marketing';
//   password:string;
// }


// const initialFormData: UserFormData = {
//   name: '',
//   email: '',
//   role: 'marketing',
//   password:''
// };

// export default function CreateUser() {
//   const [formData, setFormData] = useState<UserFormData>(initialFormData);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ): void => {
//     const { name, value } = e.target;

//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
    
//   };

//   const handleReset = (): void => {
//     setFormData(initialFormData);
//   };

//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData);
//     try {
//       const response = await api.post("/auth/register",formData);
//       const successMessage = response.data.message;
//       toast.success(successMessage);
//       handleReset();
//     } catch (error) {
//       if(axios.isAxiosError(error)){
//         const errorMessage = (error.response && error.response.data.message) || "Failed to Create User";
//         toast.error(errorMessage)
//       }
      
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-[#111111] text-[#E0E0E0] flex flex-col justify-between p-6 overflow-hidden font-sans">
      

//       {/* Main Content Area */}
//       <div className="w-full max-w-3xl mx-auto my-auto z-10 flex flex-col items-center">
        
//         {/* Header Section */}


//         {/* Card Form Container */}
//         <form 
//           onSubmit={handleSubmit}
//           className="w-full bg-[#181818] border border-[#2B2B2B] rounded-lg p-6 sm:p-10 shadow-2xl"
//         >
//           <div className="mb-6 pb-4 border-b border-zinc-800">
//       <div className="flex items-center gap-3">
//         {/* Icon Container */}
//         <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800/70 border border-zinc-700/50 text-zinc-200 shrink-0">
//           <UserPlus className="w-5 h-5 text-zinc-300" />
//         </div>

//         {/* Title & Description */}
//         <div>
//           <h2 className="text-xl font-semibold text-zinc-100 tracking-tight">
//             Create New User
//           </h2>
//           <p className="text-xs text-zinc-400 mt-0.5">
//             Assign credentials and set access permissions for the new account.
//           </p>
//         </div>
//       </div>
//     </div>
//           {/* 2-Column Grid for Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            
//             {/* Full Name */}
//             <div>
//               <Label text="Full Name"/>
//               <UserInput
//               element='input'
//               name='name'
//               value={formData.name}
//               onChange={handleChange}
//               placeholder='Enter Name'

//               />
//             </div>

//             {/* Email Address */}
//             <div>
//               <Label text="Email Address" />

//               <UserInput
//                 element="input"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="julian@enterprise.com"
//               />
//             </div>

//             {/* User Role Dropdown */}
//             <div>
//             <Label text="User Role" />

//             <Select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               options={[
//                 { label: "Admin", value: "admin" },
//                 { label: "Marketing", value: "marketing" },
//               ]}
//             />
//             </div>
//             <div>
//               <Label text="User Password" />
//               <UserInput
//                 element="input"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="julian@enterprise.com"
//               />
//             </div>



//           </div>

//           {/* Toggle Switch Section */}


//           {/* Action Buttons */}
//           <div className="flex items-center justify-end gap-6">
//             <Button type="button" onClick={handleReset} label="Discard" className='bg-red-600 hover:bg-red-500'/>
//             <Button type="submit" label="Create User Identity" />
//           </div>

//         </form>

//       </div>

//       {/* Footer System Status Bar */}
//       <div className="z-10 text-center text-[10px] md:text-xs text-[#666666] uppercase tracking-widest flex items-center justify-center gap-2">
//         <ShieldCheck className="w-3.5 h-3.5 text-[#555555]" />
//         <span>Security Protocol 2.4.1 Active</span>
//         <span className="text-[#333333]">•</span>
//         <Activity className="w-3.5 h-3.5 text-[#555555]" />
//         <span>Audit Logs Enabled</span>
//       </div>

//     </div>
//   );
// }
import UserProfile from "../../components/user/UserProfile";

export default function CreateUser(){
  return <UserProfile isEditable={false} isOwnProfile={false}/>
}