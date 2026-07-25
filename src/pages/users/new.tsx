import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ChevronDown, ShieldCheck, Activity } from 'lucide-react';

// Form Data Interface
interface UserFormData {
  fullName: string;
  email: string;
  userRole: 'Administrator' | 'Manager' | 'Standard User';
  assignedTerritory: 'North America' | 'Europe' | 'Asia Pacific' | 'Latin America';
  accountStatus: boolean;
}

const initialFormData: UserFormData = {
  fullName: '',
  email: '',
  userRole: 'Administrator',
  assignedTerritory: 'North America',
  accountStatus: true,
};

export default function CreateUserForm(): React.JSX.Element {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleReset = (): void => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="relative min-h-screen bg-[#111111] text-[#E0E0E0] flex flex-col justify-between p-6 overflow-hidden font-sans">
      
      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -right-10 text-[140px] md:text-[200px] font-serif font-black text-[#171717] select-none pointer-events-none tracking-wider">
        USER
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-3xl mx-auto my-auto z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-[#F3A47C] tracking-wide mb-2">
            Create New User
          </h1>
          <p className="text-sm text-[#A0A0A0] tracking-wide">
            Provision a new identity within the enterprise ecosystem
          </p>
          <div className="w-12 h-[1px] bg-[#E08A60] mx-auto mt-4"></div>
        </div>

        {/* Card Form Container */}
        <form 
          onSubmit={handleSubmit}
          className="w-full bg-[#181818] border border-[#2B2B2B] rounded-lg p-6 sm:p-10 shadow-2xl"
        >
          {/* 2-Column Grid for Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            
            {/* Full Name */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block text-xs uppercase tracking-wider font-semibold text-[#F3A47C] mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Julian Vane"
                className="w-full bg-[#121212] border border-[#2B2B2B] rounded px-4 py-3 text-sm text-[#E0E0E0] placeholder-[#4A4A4A] focus:outline-none focus:border-[#F3A47C] transition-colors"
              />
            </div>

            {/* Email Address */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-xs uppercase tracking-wider font-semibold text-[#F3A47C] mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="julian@enterprise.com"
                className="w-full bg-[#121212] border border-[#2B2B2B] rounded px-4 py-3 text-sm text-[#E0E0E0] placeholder-[#4A4A4A] focus:outline-none focus:border-[#F3A47C] transition-colors"
              />
            </div>

            {/* User Role Dropdown */}
            <div>
              <label 
                htmlFor="userRole" 
                className="block text-xs uppercase tracking-wider font-semibold text-[#F3A47C] mb-2"
              >
                User Role
              </label>
              <div className="relative">
                <select
                  id="userRole"
                  name="userRole"
                  value={formData.userRole}
                  onChange={handleChange}
                  className="w-full bg-[#121212] border border-[#2B2B2B] rounded px-4 py-3 text-sm text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#F3A47C] transition-colors pr-10 cursor-pointer"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Standard User">Standard User</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
              </div>
            </div>

            {/* Assigned Territory Dropdown */}
            <div>
              <label 
                htmlFor="assignedTerritory" 
                className="block text-xs uppercase tracking-wider font-semibold text-[#F3A47C] mb-2"
              >
                Assigned Territory
              </label>
              <div className="relative">
                <select
                  id="assignedTerritory"
                  name="assignedTerritory"
                  value={formData.assignedTerritory}
                  onChange={handleChange}
                  className="w-full bg-[#121212] border border-[#2B2B2B] rounded px-4 py-3 text-sm text-[#E0E0E0] appearance-none focus:outline-none focus:border-[#F3A47C] transition-colors pr-10 cursor-pointer"
                >
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia Pacific">Asia Pacific</option>
                  <option value="Latin America">Latin America</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888] pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Toggle Switch Section */}
          <div className="bg-[#121212] border border-[#2B2B2B] rounded p-4 mb-8 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-[#E0E0E0]">Account Status</h4>
              <p className="text-xs text-[#71717A] mt-0.5">
                Immediate access to portal functions upon creation
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="accountStatus"
                checked={formData.accountStatus}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#27272A] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E08A60]"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-6">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm text-[#E0E0E0] hover:text-white transition-colors"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-[#F3A47C] hover:bg-[#E08A60] text-[#111111] font-semibold text-sm px-6 py-3 rounded transition-colors"
            >
              Create User Identity
            </button>
          </div>

        </form>

      </div>

      {/* Footer System Status Bar */}
      <div className="z-10 text-center text-[10px] md:text-xs text-[#666666] uppercase tracking-widest flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-[#555555]" />
        <span>Security Protocol 2.4.1 Active</span>
        <span className="text-[#333333]">•</span>
        <Activity className="w-3.5 h-3.5 text-[#555555]" />
        <span>Audit Logs Enabled</span>
      </div>

    </div>
  );
}