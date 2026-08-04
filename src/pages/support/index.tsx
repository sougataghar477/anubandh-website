import {
  Phone,
  Mail,
  Copy,
  ExternalLink,
  Headphones,
} from "lucide-react";
const supportOptions = [
  {
    icon: Phone,
    title: "+91 9239501980",
    subtitle: "Tap to call",
    value: "+919239501980",
    type: "phone",
    color: "text-green-400",
  },
  {
    icon: Mail,
    title: "saikat.das@indiantechco.com",
    subtitle: "Tap to send email",
    value: "saikat.das@indiantechco.com",
    type: "email",
    color: "text-blue-400",
  },
];

export default function SupportPage() {
  return (
   <div className="min-h-screen bg-[#111111] p-6 text-white">

  <div className="mx-auto max-w-4xl">

    <div className="mb-10">

      <div className="inline-flex items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/20 px-3 py-1.5 text-[11px] font-medium tracking-[0.25em] text-lime-400">
        <Headphones size={14} />
        Support
      </div>

      <h1 className="mt-5 text-4xl lg:text-5xl font-semibold">
        Help & Support
      </h1>

      <p className="mt-3 text-gray-400">
        Need assistance? Contact our support team anytime.
      </p>

    </div>

    <div className="space-y-6">

      {supportOptions.map((item, index) => {

        const Icon = item.icon;

        return (

          <div
            key={index}
            className="rounded-3xl border border-[#2B2B2B] bg-[#181818] p-6 transition hover:border-lime-400/30 hover:-translate-y-1"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#222]">
                  <Icon className={item.color} size={28} />
                </div>

                <div>

                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-gray-400">
                    {item.subtitle}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => navigator.clipboard.writeText(item.value)}
                  className="rounded-xl bg-[#222] p-3 hover:bg-[#2d2d2d]"
                >
                  <Copy size={18} />
                </button>

                {item.type === "phone" ? (
                  <a
                    href={`tel:${item.value}`}
                    className="rounded-xl bg-lime-500 px-5 py-3 font-semibold text-black hover:opacity-90"
                  >
                    Call
                  </a>
                ) : (
                  <a
                    href={`mailto:${item.value}`}
                    className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    Email
                  </a>
                )}

              </div>

            </div>

          </div>

        );

      })}

    </div>

    <div className="mt-10 rounded-3xl border border-lime-500/20 bg-gradient-to-r from-lime-500/10 to-blue-500/10 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Need Immediate Help?
          </h2>

          <p className="mt-2 text-gray-300">
            Our support team is available during business hours to assist you.
          </p>

        </div>

        <ExternalLink className="text-lime-400" size={34} />

      </div>

    </div>

  </div>

</div>
  );
}
