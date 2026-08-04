import { Clock3, FolderKanban, Sparkles, Users } from 'lucide-react';

const projects = [
  {
    title: 'Northwind Expansion',
    status: 'In progress',
    description: 'Drive a multi-region onboarding rollout with cross-functional execution.',
    timeline: '2 weeks left',
  },
  {
    title: 'Executive Insights',
    status: 'Planning',
    description: 'Build a live reporting layer for leadership decision-making.',
    timeline: 'Kickoff next week',
  },
  {
    title: 'Client Success Hub',
    status: 'Live',
    description: 'Launch a branded client experience with shared updates and follow-through.',
    timeline: 'Stable and active',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#181818] shadow-2xl">
          <div className="h-24 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.18),_transparent_40%),linear-gradient(135deg,_#202020_0%,_#121212_100%)]" />
          <div className="p-6 md:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">Workspace</p>
            <h1 className="mt-2 text-3xl font-serif text-white">Active workstreams</h1>
            <p className="mt-2 text-sm text-[#A0A0A0]">Keep momentum across your current initiatives and shared goals.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-sm text-[#C9C9C9]">
                <span className="font-semibold text-white">3</span> active initiatives
              </div>
              <div className="rounded-2xl border border-[#2B2B2B] bg-[#121212] px-4 py-3 text-sm text-[#C9C9C9]">
                <span className="font-semibold text-white">8</span> cross-team contributors
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="rounded-2xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime-primary/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#2B2B2B] bg-[#121212] text-lime-primary">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{project.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#C9C9C9]">{project.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-[#8A8A92]">
                <span className="rounded-full border border-lime-primary/30 bg-lime-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-primary">
                  {project.status}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  8 team
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#2B2B2B] bg-[#121212] px-3 py-2 text-sm text-[#A0A0A0]">
                <Clock3 className="h-4 w-4 text-lime-primary" />
                {project.timeline}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#666666]">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Momentum tracked</span>
        </div>
      </div>
    </div>
  );
}
