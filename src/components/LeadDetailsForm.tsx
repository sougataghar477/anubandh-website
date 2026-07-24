import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Package, 
  ChevronDown, 
  Lock, 
  SlidersHorizontal 
} from 'lucide-react';
import Button from './common/Button';
import UserInput from './common/UserInput';
import Label from './common/Label';
import Select from './common/Select';

export default function LeadDetailsForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    product: '',
    description: '',
  });
const PRODUCT_OPTIONS = [
  { label: "Enterprise Suite", value: "enterprise-suite" },
  { label: "CRM Pro", value: "crm-pro" },
  { label: "Analytics Module", value: "analytics-module" },
];
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <main className="flex-1 bg-[#121214] text-[#E1E1E6] min-h-screen p-8 flex flex-col justify-between font-sans">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header & Action Buttons */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <nav className="text-xs font-bold text-lime-primary tracking-wider uppercase mb-1">
              LEADS &gt; <span className="text-lime-primary">NEW LEAD</span>
            </nav>
            <h1 className="text-3xl font-serif text-white tracking-wide">
              Create New Lead
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button 
            type="button"
            label="Save Lead"
            />
          </div>
        </div>

        {/* Lead Details Card */}
        <form 
          onSubmit={handleSubmit}
          className="bg-[#18181C] border border-[#2A2A30] rounded-xl p-8 space-y-6 shadow-xl"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-[#2A2A30]">
            <SlidersHorizontal className="w-5 h-5 text-lime-primary" />
            <h2 className="text-xl font-serif italic font-medium text-white">
              Lead Details
            </h2>
          </div>

          {/* Customer Name & Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label text="Customer Name"/>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="customerName"
                  placeholder="e.g. John Wick"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full bg-[#121214] border border-[#2A2A30] text-gray-200 placeholder-gray-600 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#F5A986] transition-colors"
                />
              </div>
            </div>

            <div>
              <Label text="Phone Number"/>
              <UserInput
              element="input"
              icon={<Phone/>}
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              />
            </div>
          </div>

          {/* Product Selection */}
          <div>
            <Label text="Product Selection"/>
            {/* <div className="relative">
              <Package className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full bg-[#121214] border border-[#2A2A30] text-gray-200 rounded-lg pl-10 pr-10 py-3 text-sm appearance-none focus:outline-none focus:border-[#F5A986] transition-colors cursor-pointer"
              >
                <option value="" disabled>Select a Product</option>
                <option value="enterprise-suite">Enterprise Suite</option>
                <option value="crm-pro">CRM Pro</option>
                <option value="analytics-module">Analytics Module</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div> */}
            <Select
      name="product"
      value={formData.product}
      onChange={handleChange}
      options={PRODUCT_OPTIONS}
      placeholder="Select a Product"
      icon={<Package/>}
    />
          </div>

          {/* Description */}
          <div>
            <Label text="Description"/>
            <UserInput
              element="textarea"
              name="description"
              rows={6}
              placeholder="Provide context or specific requirements for this lead..."
              value={formData.description}
              onChange={handleChange}
              />
          </div>
        </form>
      </div>

      {/* Footer Security Note */}
      <footer className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-widest text-gray-500 uppercase mt-12">
        <Lock className="w-3.5 h-3.5" />
        <span>SAHARA SECURE LAYER</span>
        <span>•</span>
        <span>LAST SYNCED 2M AGO</span>
      </footer>
    </main>
  );
}