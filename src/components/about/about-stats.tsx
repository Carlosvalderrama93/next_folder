export interface StatItem {
  value: string;
  label: string;
}

interface AboutStatsProps {
  stats: StatItem[];
}

export default function AboutStats({ stats }: AboutStatsProps) {
  return (
    <section className="bg-surface dark:bg-surface border-y border-border">
      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-8 px-6 text-center"
          >
            <span className="text-5xl font-extrabold text-brand mb-2 tabular-nums">{stat.value}</span>
            <span className="text-sm font-medium text-muted-fg">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
