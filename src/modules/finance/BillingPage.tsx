import { DollarSign, FileText, Clock, CheckCircle } from 'lucide-react';

const invoices = [
  { id: 'INV-2401', client: 'KLCC Holdings', amount: 'RM 48,200', due: '28 Feb 2026', status: 'Paid' },
  { id: 'INV-2402', client: 'Pavilion REIT', amount: 'RM 36,500', due: '05 Mar 2026', status: 'Pending' },
  { id: 'INV-2403', client: 'IGB Berhad', amount: 'RM 22,800', due: '10 Mar 2026', status: 'Overdue' },
  { id: 'INV-2404', client: 'Sunway Group', amount: 'RM 61,400', due: '15 Mar 2026', status: 'Paid' },
  { id: 'INV-2405', client: 'Lendlease', amount: 'RM 18,750', due: '20 Mar 2026', status: 'Pending' },
];

const statusBadge: Record<string, string> = {
  Paid: 'enterprise-badge-success',
  Pending: 'enterprise-badge-warning',
  Overdue: 'enterprise-badge-danger',
};

export function BillingPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          Finance & Resources › Billing
        </p>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Invoiced', value: 'RM 284.5K', icon: DollarSign, color: '#10b981' },
          { label: 'Outstanding', value: 'RM 55.2K', icon: Clock, color: '#f59e0b' },
          { label: 'Overdue', value: 'RM 22.8K', icon: FileText, color: '#ef4444' },
          { label: 'Collected', value: '82.4%', icon: CheckCircle, color: '#3b82f6' },
        ].map(stat => (
          <div key={stat.label} className="enterprise-card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: stat.color + '18' }}>
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-[11px] text-gray-400 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Invoice table */}
      <div className="enterprise-card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-gray-700">Recent Invoices</h2>
          <button className="enterprise-button-primary text-[12px] px-3 py-1.5">+ New Invoice</button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100">
              {['Invoice #', 'Client', 'Amount', 'Due Date', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="enterprise-table-row border-b border-gray-50">
                <td className="px-5 py-3 font-mono text-[12px] font-medium text-gray-700">{inv.id}</td>
                <td className="px-5 py-3 text-gray-700">{inv.client}</td>
                <td className="px-5 py-3 font-semibold text-gray-800">{inv.amount}</td>
                <td className="px-5 py-3 text-gray-400">{inv.due}</td>
                <td className="px-5 py-3">
                  <span className={statusBadge[inv.status]}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
