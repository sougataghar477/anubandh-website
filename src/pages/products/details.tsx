import { ArrowLeft, Box, Sparkles, ShieldCheck, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const products = [
  {
    id: 'enterprise-crm-suite',
    name: 'Enterprise CRM Suite',
    category: 'Automation',
    status: 'Popular',
    description:
      'A complete workspace for lead tracking, onboarding, and team collaboration across the full customer lifecycle.',
    highlight:
      'Trusted by revenue teams for forecasting, follow-up orchestration, and cross-functional visibility.',
    audience: 'Sales, RevOps, and Customer Success teams',
    value: 'Boosts team productivity by 38%',
  },
  {
    id: 'insight-analytics-pro',
    name: 'Insight Analytics Pro',
    category: 'Reporting',
    status: 'New',
    description:
      'Real-time dashboards and forecasting tools for revenue and account health with live executive reporting.',
    highlight:
      'Turn raw data into decision-ready insights with configurable views and AI-assisted summaries.',
    audience: 'Leadership, Finance, and Ops teams',
    value: 'Improves decision speed across weekly reviews',
  },
  {
    id: 'client-portal-plus',
    name: 'Client Portal+',
    category: 'Experience',
    status: 'Stable',
    description:
      'A branded customer portal to share updates, files, and follow-ups securely in one place.',
    highlight:
      'Creates a premium client experience while keeping every engagement visible inside your workspace.',
    audience: 'Customer Success and External Stakeholders',
    value: 'Reduces missed handoffs and support churn',
  },
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#2B2B2B] bg-[#181818] p-8 text-center">
          <h1 className="text-2xl font-serif text-white">Product not found</h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">This product is not available right now.</p>
          <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-lime-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10 font-sans">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Link to="/products" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#C9C9C9] transition-colors hover:text-lime-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>

        <div className="rounded-2xl border border-[#2B2B2B] bg-[#181818] p-6 shadow-2xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">{product.category}</p>
              <h1 className="mt-2 text-3xl font-serif text-white">{product.name}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A0A0A0]">{product.description}</p>
            </div>
            <span className="rounded-full border border-lime-primary/30 bg-lime-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-lime-primary">
              {product.status}
            </span>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-[#2B2B2B] bg-[#121212] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-primary/10 text-lime-primary">
                <Box className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-white">Core value</h2>
              <p className="mt-2 text-sm text-[#A0A0A0]">{product.highlight}</p>
            </div>

            <div className="rounded-xl border border-[#2B2B2B] bg-[#121212] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-primary/10 text-lime-primary">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-white">Best for</h2>
              <p className="mt-2 text-sm text-[#A0A0A0]">{product.audience}</p>
            </div>

            <div className="rounded-xl border border-[#2B2B2B] bg-[#121212] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime-primary/10 text-lime-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-white">Outcome</h2>
              <p className="mt-2 text-sm text-[#A0A0A0]">{product.value}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666]">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Product experience ready</span>
        </div>
      </div>
    </div>
  );
}
