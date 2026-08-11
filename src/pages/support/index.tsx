import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  BarChart3,
  Package,
} from "lucide-react";
import { Link } from "react-router";

type FAQ = {
  question: string;
  answer: string;
};

type CopyType = "phone" | "email" | "";

const supportPhone = "+91 9239501980";
const supportEmail = "saikat.das@indiantechco.com";

const faqs: FAQ[] = [
  {
    question: "How can I create a new lead?",
    answer:
      "Go to the Leads section from the sidebar and select New Lead to create and manage a new customer lead.",
  },
  {
    question: "How can I update my profile?",
    answer:
      "Open Settings from the sidebar to access your profile and update your account information.",
  },
  {
    question: "How can I manage users?",
    answer:
      "Users with Administration access can create, update and manage users from the Administration section.",
  },
  {
    question: "What should I do if I face a technical issue?",
    answer:
      "Contact our support team using the phone number or email provided below. Please include the relevant details of the issue.",
  },
];

export default function SupportPage() {
  const [copied, setCopied] = useState<CopyType>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleCopy = async (
    value: string,
    type: "phone" | "email"
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq((previous) =>
      previous === index ? null : index
    );
  };

  return (
    <div className="min-h-full bg-[#0F0F12] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="border-b border-[#29292F] bg-[#121214]">
        <div className="px-6 py-6 lg:px-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/20 px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-lime-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-primary/20 bg-lime-primary/10 shadow-[0_0_30px_rgba(180,255,0,0.05)]">
                <HelpCircle className="h-7 w-7 text-lime-primary" />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-primary">
                  Enterprise Support
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Help & Support
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  We're here to help you get the most from CRM Portal.
                </p>
              </div>

            </div>

            {/* Online Status */}
            <div className="hidden items-center gap-2 rounded-full border border-[#2A2A30] bg-[#1A1A1F] px-4 py-2 sm:flex">
              <span className="h-2 w-2 rounded-full bg-lime-primary shadow-[0_0_8px_rgba(180,255,0,0.8)]" />

              <span className="text-xs font-medium text-gray-300">
                Support Available
              </span>
            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="px-6 py-8 lg:px-8">

        {/* =====================================================
            WELCOME BANNER
        ===================================================== */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#2A2A30] bg-gradient-to-br from-[#1B1B21] via-[#16161A] to-[#121214] p-7">

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-lime-primary/5 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#303038] bg-[#202026] px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-lime-primary" />

                <span className="text-xs font-medium text-gray-400">
                  Dedicated Customer Assistance
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white lg:text-3xl">
                How can we help you today?
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Whether you need help managing leads, products,
                users, or your account, our support team is ready
                to assist you.
              </p>

            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-lime-primary/10 bg-lime-primary/5">
              <MessageCircle className="h-9 w-9 text-lime-primary" />
            </div>

          </div>
        </section>

        {/* =====================================================
            CONTACT SUPPORT
        ===================================================== */}
        <section className="mb-9">

          <div className="mb-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/20 px-4 py-2  mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-lime-400">
              Direct Assistance
            </p>

            <h2 className="mt-1.5 text-xl font-semibold text-white">
              Contact Support
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Connect with our support team using your preferred method.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* =================================================
                PHONE
            ================================================= */}
            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">

              <div className="flex items-start justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-lime-primary/10 bg-lime-primary/10">
                    <Phone className="h-6 w-6 text-lime-primary" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Phone Support
                    </p>

                    <a
                      href={`tel:${supportPhone.replace(/\s/g, "")}`}
                      className="mt-1 block text-lg font-semibold text-white transition-colors hover:text-lime-primary"
                    >
                      {supportPhone}
                    </a>

                    <p className="mt-1 text-xs text-gray-500">
                      Tap the number to call our support team
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(supportPhone, "phone")
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A2A30] text-gray-500 transition-all hover:border-[#44444C] hover:bg-[#25252B] hover:text-white"
                  title="Copy phone number"
                >
                  {copied === "phone" ? (
                    <Check className="h-4 w-4 text-lime-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#29292F] pt-4">

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-lime-primary" />

                  <span className="text-xs text-gray-500">
                    Available during business hours
                  </span>
                </div>

                <a
                  href={`tel:${supportPhone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-lime-primary px-4 py-2 text-xs font-semibold text-[#111113] transition-colors hover:bg-lime-hover"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Support
                </a>

              </div>

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}
            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">

              <div className="flex items-start justify-between gap-5">

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-500/10 bg-blue-500/10">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email Support
                    </p>

                    <a
                      href={`mailto:${supportEmail}`}
                      className="mt-1 block break-all text-lg font-semibold text-white transition-colors hover:text-blue-400"
                    >
                      {supportEmail}
                    </a>

                    <p className="mt-1 text-xs text-gray-500">
                      Send your query directly to our support team
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(supportEmail, "email")
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#2A2A30] text-gray-500 transition-all hover:border-[#44444C] hover:bg-[#25252B] hover:text-white"
                  title="Copy email address"
                >
                  {copied === "email" ? (
                    <Check className="h-4 w-4 text-lime-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#29292F] pt-4">

                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-600" />

                  <span className="text-xs text-gray-500">
                    Response through email
                  </span>
                </div>

                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#35353C] bg-[#25252B] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#303037]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Send Email
                </a>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            SUPPORT AREAS
        ===================================================== */}
        {/* <section className="mb-9">

          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-primary">
              Assistance Areas
            </p>

            <h2 className="mt-1.5 text-xl font-semibold text-white">
              What can we help with?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-lime-primary/10">
                <BarChart3 className="h-5 w-5 text-lime-primary" />
              </div>

              <h3 className="font-semibold text-white">
                Lead Management
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Leads, status, ownership and pipeline assistance.
              </p>
            </div>

            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Package className="h-5 w-5 text-blue-400" />
              </div>

              <h3 className="font-semibold text-white">
                Products
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Product information and CRM product management.
              </p>
            </div>

            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
                <Users className="h-5 w-5 text-purple-400" />
              </div>

              <h3 className="font-semibold text-white">
                User Management
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                User accounts, access and administration support.
              </p>
            </div>

            <div className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <ShieldCheck className="h-5 w-5 text-orange-400" />
              </div>

              <h3 className="font-semibold text-white">
                Account & Access
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Profile, permissions and account-related assistance.
              </p>
            </div>

          </div>
        </section> */}

        {/* =====================================================
            SUPPORT INFORMATION
        ===================================================== */}
        <section className="mb-9 grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-[#2A2A30] bg-[#17171B] p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-primary/10">
                <Clock3 className="h-5 w-5 text-lime-primary" />
              </div>

              <div>
                <p className="font-medium text-white">
                  Support Availability
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Monday – Friday · Business Hours
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-[#2A2A30] bg-[#17171B] p-5">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <MessageCircle className="h-5 w-5 text-blue-400" />
              </div>

              <div>
                <p className="font-medium text-white">
                  Customer Assistance
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Dedicated support for your CRM workspace
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            FAQ
        ===================================================== */}
        <section>

          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-primary">
              Knowledge Base
            </p>

            <h2 className="mt-1.5 text-xl font-semibold text-white">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Quick answers to common CRM questions.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#181818]">

            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-b border-[#29292F] last:border-b-0"
              >

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-[#1D1D22]"
                >
                  <span className="text-sm font-medium text-gray-200">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-lime-primary" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <div className="rounded-xl bg-[#202025] px-4 py-3">
                      <p className="text-sm leading-6 text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            ))}

          </div>

        </section>

      </main>
    </div>
  );
}