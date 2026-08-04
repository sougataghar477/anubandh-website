import React, { useEffect, useState } from 'react';
import { 
  User, 
  Phone, 
  Package, 
  Lock, 
  SlidersHorizontal 
} from 'lucide-react';
import Button from './common/Button';
import UserInput from './common/UserInput';
import Label from './common/Label';
import Select from './common/Select';
import { useParams } from 'react-router';
interface LeadDetailsFormProps {
  isEditable?: boolean;
}
type LeadStatus = "NEW" | "IN_PROGRESS" | "QUALIFIED" | "LOST";

interface HistoryItem {
id: string;
previous_status?: LeadStatus;
new_status?: LeadStatus;
comment?: string;
createdAt: string;
updatedBy: string;
}
export default function LeadDetailsForm({
  isEditable = false,
}: LeadDetailsFormProps) {
const { leadId } = useParams<{ leadId: string }>();
// 2. Dummy Data Array
const mockHistory: HistoryItem[] = [
  {
    id: "3",
    previous_status: "IN_PROGRESS",
    new_status: "QUALIFIED",
    comment: "Client agreed to the proposed pricing and scope.",
    createdAt: "2026-08-03T10:30:00.000Z",
    updatedBy: "Sohan Dastidar",
  },
  {
    id: "2",
    previous_status: "NEW",
    new_status: "IN_PROGRESS",
    comment: "Scheduled initial discovery call for next Tuesday.",
    createdAt: "2026-08-02T14:15:00.000Z",
    updatedBy: "Sarah Jenkins",
  },
  {
    id: "1",
    previous_status: undefined,
    new_status: "NEW",
    createdAt: "2026-08-01T09:00:00.000Z",
    updatedBy: "System Import",
  },
];

// Helper metadata for status colors
const STATUS_META: Record<LeadStatus, { label: string; color: string }> = {
  NEW: { label: "New Lead", color: "#3B82F6" },         // Blue
  IN_PROGRESS: { label: "In Progress", color: "#F59E0B" },// Amber
  QUALIFIED: { label: "Qualified", color: "#10B981" },  // Emerald
  LOST: { label: "Lost", color: "#EF4444" },           // Red
};

const formatStatus = (status?: LeadStatus) => 
  status ? STATUS_META[status]?.label || status : "";

const formatDateTime = (dateStr: string) => 
  new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    product: '',
    description: '',
    comment:'',
    status:''
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
useEffect(()=>{
  if(!leadId)return;
  console.log("Lead Id ",leadId)
},[leadId])
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
                <UserInput
                  type="text"
                  name="customerName"
                  placeholder="e.g. John Wick"
                  value={formData.customerName}
                  onChange={handleChange}
/>
              </div>
            </div>

            <div>
              <Label text="Phone Number"/>
              <UserInput
              element="input"
              icon={<Phone/>}
              type="tel"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className='flex  gap-4'>
          <div className='flex-1'>
            <Label text="Product Selection"/>
            <Select
      name="product"
      value={formData.product}
      onChange={handleChange}
      options={PRODUCT_OPTIONS}
      placeholder="Select a Product"
      icon={<Package/>}
    />
          </div>
          <div className='flex-1'>
            <Label text="Lead Status"/>

            <Select
      name="status"
      value={formData.status}
      onChange={handleChange}
      options={PRODUCT_OPTIONS}
      placeholder="Select a Status"
      icon={<Package/>}
    />
          </div>
          </div>

          {/* Description */}
          <div className='flex gap-4'>
          <div className='flex-1'>
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

          {isEditable && <div className='flex-1'>
            <Label text="Comment"/>
            <UserInput
              element="textarea"
              name="comment"
              rows={6}
              placeholder="Provide context or specific requirements for this lead..."
              value={formData.comment}
              onChange={handleChange}
              />
          </div>}
          
          </div>
          <Button 
            type="submit"
            label="Save Lead"
            />
{isEditable && <div>
  <h2 className="text-xl font-bold text-white mb-4">Lead History</h2>
  <ul className="space-y-6">
    {mockHistory.map((h, index) => {
      const isLast = index === history.length - 1;

      return (
        <li key={h.id} className="relative pb-4 border-b border-slate-800">
          {/* Timeline Dot */}

          {/* Content */}
          <div>
            {/* Action Title */}
            {!h.previous_status && h.new_status ? (
              <h3 className="text-white text-base font-bold">
                New Lead Created
              </h3>
            ) : h.previous_status !== h.new_status ? (
              <h3 className="text-white text-base font-bold">
                Lead Status Updated From{" "}
                <span
                >
                  {formatStatus(h.previous_status)}
                </span>{" "}
                to{" "}
                <span
                  style={{
                    color:
                      STATUS_META[h.new_status as LeadStatus]?.color || "#fff",
                  }}
                >
                  {formatStatus(h.new_status)}
                </span>
              </h3>
            ) : (
              <h3 className="text-white text-base font-bold">
                New Comment Made
              </h3>
            )}

            {/* Comment Section */}
            {!!h.comment && (
              <div className="mt-3">
                <span className="text-slate-500 text-xs uppercase font-medium block">
                  Comment
                </span>
                <p className="text-slate-200 mt-1 text-sm">{h.comment}</p>
              </div>
            )}

            {/* Activity Time */}
            <div className="mt-3">
              <span className="text-slate-500 text-xs uppercase font-medium block">
                Activity Time
              </span>
              <p className="text-slate-300 mt-1 text-sm">
                {formatDateTime(h.createdAt)}
              </p>
            </div>

            {/* Updated / Created By */}
            <div className="mt-3">
              <span className="text-slate-500 text-xs uppercase font-medium block">
                {isLast ? "Created By" : "Updated By"}
              </span>
              <p className="text-slate-300 mt-1 text-sm">{h.updatedBy}</p>
            </div>
          </div>
        </li>
      );
    })}
  </ul>
</div>}
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