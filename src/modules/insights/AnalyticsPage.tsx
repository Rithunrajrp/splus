import { TrendingUp, TrendingDown, BarChart2, Users } from 'lucide-react';

const metrics = [
  { label: 'Billing Revenue', value: 'RM 2.84M', change: '+8.2%', up: true },
  { label: 'Manpower Deployed', value: '1,118', change: '+3.1%', up: true },
  { label: 'Attendance Rate', value: '97.4%', change: '-0.6%', up: false },
  { label: 'Client Satisfaction', value: '4.7/5', change: '+0.2', up: true },
];

const analyticsItems = [
  { name: 'Billing Analytics', desc: 'Revenue trends, collection rates & aging breakdown', color: '#3b82f6' },
  { name: 'Attendance Analytics', desc: 'Daily/monthly attendance patterns across all sites', color: '#10b981' },
  { name: 'Employee Analytics', desc: 'Headcount, turnover, department distribution', color: '#f59e0b' },
  { name: 'Payroll Analytics', desc: 'Salary costs, overtime analysis, variance reports', color: '#8b5cf6' },
  { name: 'Site Analytics', desc: 'Per-site KPIs, performance benchmarks', color: '#ef4444' },
  { name: 'Deployment Analytics', desc: 'Manpower coverage, shift efficiency metrics', color: '#0ea5e9' },
];

export function AnalyticsPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          Insights & CRM › Analytics
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="enterprise-card p-4">
            <p className="text-[11px] text-gray-400 font-medium mb-1">{m.label}</p>
            <p className="text-2xl font-bold text-gray-800">{m.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {m.up
                ? <TrendingUp size={12} className="text-emerald-500" />
                : <TrendingDown size={12} className="text-red-400" />}
              <span className={`text-[11px] font-medium ${m.up ? 'text-emerald-600' : 'text-red-500'}`}>{m.change}</span>
              <span className="text-[11px] text-gray-300">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics modules */}
      <div>
        <h2 className="text-[13px] font-semibold text-gray-700 mb-3">Analytics Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {analyticsItems.map(item => (
            <button
              key={item.name}
              type="button"
              className="enterprise-card p-4 text-left hover:border-gray-300 transition-colors group"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: item.color + '18' }}>
                  <BarChart2 size={16} style={{ color: item.color }} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{item.name}</p>
                  <p className="text-[11.5px] text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CRM teaser */}
      <div className="enterprise-card p-5">
        <div className="flex items-center gap-3 mb-3">
          <Users size={18} className="text-violet-500" />
          <h2 className="text-[13px] font-semibold text-gray-700">CRM Pipeline</h2>
          <span className="enterprise-badge-primary">3 active leads</span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {['New Quotation', 'All Quotation', 'Lead Management'].map(label => (
            <div key={label} className="rounded-lg py-3 px-4" style={{ background: '#f8fafc' }}>
              <p className="text-[12px] font-medium text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
