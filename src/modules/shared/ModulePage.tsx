import { useLocation } from 'react-router-dom';
import { findSection } from '@/lib/navigation';

/**
 * Generic module page — renders a branded placeholder for any route.
 * Shows the cluster, section, and item name derived from the current URL.
 */
export function ModulePage() {
  const location = useLocation();
  const match = findSection(location.pathname);

  const cluster = match?.cluster.label ?? 'Module';
  const section = match?.section.label ?? '';
  const item = match?.item.label ?? location.pathname;

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Page header */}
      <div className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          {cluster}{section ? ` › ${section}` : ''}
        </p>
        <h1 className="text-2xl font-bold text-gray-900">{item}</h1>
      </div>

      {/* Placeholder content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Records', value: '—' },
          { label: 'Active', value: '—' },
          { label: 'Pending', value: '—' },
        ].map(stat => (
          <div key={stat.label} className="enterprise-card p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-700">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder table */}
      <div className="enterprise-card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-gray-700">{item} List</h2>
          <span className="enterprise-badge-primary">0 items</span>
        </div>
        <div className="p-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-[13px] text-gray-400">No data yet. This module is ready to be configured.</p>
        </div>
      </div>
    </div>
  );
}
