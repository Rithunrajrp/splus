import { Briefcase, Plus, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const projects = [
  { id: 1, name: 'KLCC Security Contract', client: 'KLCC Holdings', value: 'RM 2.4M', status: 'Active', progress: 68 },
  { id: 2, name: 'Pavilion Integrated Security', client: 'Pavilion REIT', value: 'RM 1.8M', status: 'Active', progress: 45 },
  { id: 3, name: 'Mid Valley Night Ops', client: 'IGB Berhad', value: 'RM 960K', status: 'Pending', progress: 10 },
  { id: 4, name: 'Sunway Surveillance Upgrade', client: 'Sunway Group', value: 'RM 3.1M', status: 'Active', progress: 82 },
  { id: 5, name: 'TRX Perimeter Guard', client: 'Lendlease', value: 'RM 1.2M', status: 'Completed', progress: 100 },
];

const statusStyle: Record<string, { badge: string; icon: typeof CheckCircle2 }> = {
  Active: { badge: 'enterprise-badge-success', icon: TrendingUp },
  Pending: { badge: 'enterprise-badge-warning', icon: AlertCircle },
  Completed: { badge: 'enterprise-badge-primary', icon: CheckCircle2 },
};

export function ProjectsPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          Operations › Projects
        </p>
        <h1 className="text-2xl font-bold text-gray-900">All Projects</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects', value: '47', color: '#3b82f6' },
          { label: 'Active Contracts', value: '31', color: '#10b981' },
          { label: 'Pending Approval', value: '9', color: '#f59e0b' },
          { label: 'Total Value', value: 'RM 28M', color: '#8b5cf6' },
        ].map(s => (
          <div key={s.label} className="enterprise-card p-4">
            <p className="text-[11px] text-gray-400 font-medium mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Project list */}
      <div className="enterprise-card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase size={15} className="text-gray-400" />
            <h2 className="text-[13px] font-semibold text-gray-700">Project Portfolio</h2>
          </div>
          <button className="enterprise-button-primary text-[12px] px-3 py-1.5 flex items-center gap-1.5">
            <Plus size={13} /> New Project
          </button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100">
              {['Project', 'Client', 'Contract Value', 'Progress', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => {
              const s = statusStyle[p.status];
              return (
                <tr key={p.id} className="enterprise-table-row border-b border-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-5 py-3 text-gray-500">{p.client}</td>
                  <td className="px-5 py-3 font-semibold text-gray-700">{p.value}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'var(--primary-brand)' }} />
                      </div>
                      <span className="text-[11px] text-gray-400 w-8 text-right">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={s.badge}>{p.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
