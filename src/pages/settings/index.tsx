const settingsSections = [
  {
    title: 'Workspace Preferences',
    items: ['Default dashboard', 'Theme mode', 'Notification sound'],
  },
  {
    title: 'Security',
    items: ['Two-factor authentication', 'Session timeout', 'API access keys'],
  },
  {
    title: 'Integrations',
    items: ['Slack', 'Google Calendar', 'Mailchimp'],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] p-6 md:p-10 font-sans">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-lime-primary">Settings</p>
          <h1 className="mt-2 text-3xl font-serif text-white">Manage your workspace</h1>
          <p className="mt-2 text-sm text-[#A0A0A0]">
            Configure the essentials for your team and keep everything running smoothly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {settingsSections.map((section) => (
            <div key={section.title} className="rounded-xl border border-[#2B2B2B] bg-[#181818] p-5">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#C9C9C9]">
                {section.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-lime-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
