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
    <div className="min-h-full bg-slate-50 text-slate-900">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="bg-white shadow-sm shadow-slate-200/60">
        <div className="px-6 py-6 lg:px-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 shadow-sm transition hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between gap-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                <HelpCircle className="h-7 w-7" />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  Enterprise Support
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  Help & Support
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  We're here to help you get the most from CRM Portal.
                </p>
              </div>

            </div>

            {/* Online Status */}
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 sm:flex shadow-inner">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />

              <span className="text-xs font-medium text-slate-600">
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
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-white p-7 shadow-xl shadow-slate-200/60">

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />

                <span className="text-xs font-medium text-slate-600">
                  Dedicated Customer Assistance
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-slate-900 lg:text-3xl">
                How can we help you today?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Whether you need help managing leads, products,
                users, or your account, our support team is ready
                to assist you.
              </p>

            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-md shadow-blue-500/10">
              <MessageCircle className="h-9 w-9" />
            </div>

          </div>
        </section>

        {/* =====================================================
            CONTACT SUPPORT
        ===================================================== */}
        <section className="mb-9">

          <div className="mb-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-600 shadow-sm">
              Direct Assistance
            </p>

            <h2 className="mt-1.5 text-xl font-semibold text-slate-900">
              Contact Support
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Connect with our support team using your preferred method.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* PHONE */}
            <div className="group rounded-3xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/60 hover:shadow-xl hover:shadow-blue-500/10">

              <div className="flex items-start justify-between gap-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                    <Phone className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Phone Support
                    </p>

                    <a
                      href={`tel:${supportPhone.replace(/\s/g, "")}`}
                      className="mt-1 block text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600"
                    >
                      {supportPhone}
                    </a>

                    <p className="mt-1 text-xs text-slate-500">
                      Tap the number to call our support team
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(supportPhone, "phone")
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900 shadow-sm"
                  title="Copy phone number"
                >
                  {copied === "phone" ? (
                    <Check className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />

                  <span className="text-xs text-slate-500">
                    Available during business hours
                  </span>
                </div>

                <a
                  href={`tel:${supportPhone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 shadow-md shadow-blue-600/20"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Call Support
                </a>

              </div>

            </div>

            {/* EMAIL */}
            <div className="group rounded-3xl bg-white p-5 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-200/60 hover:shadow-xl hover:shadow-blue-500/10">

              <div className="flex items-start justify-between gap-5">

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                    <Mail className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Email Support
                    </p>

                    <a
                      href={`mailto:${supportEmail}`}
                      className="mt-1 block break-all text-lg font-semibold text-slate-900 transition-colors hover:text-blue-600"
                    >
                      {supportEmail}
                    </a>

                    <p className="mt-1 text-xs text-slate-500">
                      Send your query directly to our support team
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(supportEmail, "email")
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900 shadow-sm"
                  title="Copy email address"
                >
                  {copied === "email" ? (
                    <Check className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>

              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />

                  <span className="text-xs text-slate-500">
                    Response through email
                  </span>
                </div>

                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 shadow-md shadow-slate-900/20"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Send Email
                </a>

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            SUPPORT INFORMATION
        ===================================================== */}
        <section className="mb-9 grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/60">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                <Clock3 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Support Availability
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Monday – Friday · Business Hours
                </p>
              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-white p-5 shadow-lg shadow-slate-200/60">

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>

              <div>
                <p className="font-medium text-slate-900">
                  Customer Assistance
                </p>

                <p className="mt-1 text-sm text-slate-500">
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
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Knowledge Base
            </p>

            <h2 className="mt-1.5 text-xl font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick answers to common CRM questions.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">

            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border-b border-slate-100 last:border-b-0"
              >

                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-sm font-semibold text-slate-800">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <div className="rounded-2xl bg-slate-50 p-4 shadow-inner">
                      <p className="text-sm leading-6 text-slate-600">
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