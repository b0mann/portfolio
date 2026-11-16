/**
 * Skills & Stack. Plain lists, no skill bars.
 * These are starting values for a Linux admin who codes: edit them to match what you actually run.
 */
export interface StackGroup {
  title: string;
  rows: { area: string; items: string[] }[];
}

export const stack: StackGroup[] = [
  {
    title: 'On the servers',
    rows: [
      { area: 'Linux', items: ['Debian', 'Ubuntu', 'systemd'] },
      { area: 'Infrastructure', items: ['Nginx', 'Caddy', 'Docker'] },
      { area: 'Networking', items: ['DNS', 'WireGuard', 'nftables'] },
      { area: 'Operations', items: ['Ansible', 'Prometheus', 'restic'] },
    ],
  },
  {
    title: 'In the editor',
    rows: [
      { area: 'Scripting', items: ['Bash', 'Python', 'awk'] },
      { area: 'Languages', items: ['Go', 'TypeScript', 'SQL'] },
      { area: 'Web', items: ['Astro', 'Tailwind', 'SQLite'] },
      { area: 'Workflow', items: ['Git', 'Actions', 'Make'] },
    ],
  },
];

/** "Now": what the current focus is. Keep `updated` honest when you edit the list. */
export const now = {
  updated: '2026-11-16',
  items: [
    { title: 'Config as code', line: 'The last hand-edited servers go into Ansible.' },
    { title: 'Go, properly', line: 'Old Bash tools become static binaries.' },
    { title: 'This site', line: 'Real projects replace the samples.' },
  ],
};
