import { Users, UserPlus, Clock, TrendingUp } from 'lucide-react';

const employees = [
  { id: 1, name: 'Ahmad bin Razali', role: 'Security Officer', site: 'KLCC Tower', status: 'Active', joined: '01 Jan 2023' },
  { id: 2, name: 'Nur Hidayah Othman', role: 'Supervisor', site: 'Pavilion KL', status: 'Active', joined: '15 Mar 2022' },
  { id: 3, name: 'Ravi Krishnan', role: 'Senior Officer', site: 'Mid Valley', status: 'On Leave', joined: '10 Jun 2021' },
  { id: 4, name: 'Siti Rahmah Yusof', role: 'Security Officer', site: 'Sunway Pyramid', status: 'Active', joined: '22 Sep 2023' },
  { id: 5, name: 'Lee Wei Liang', role: 'Control Room Op.', site: 'KLCC Tower', status: 'Active', joined: '05 Feb 2022' },
];

const statusColor: Record<string, string> = {
  Active: 'enterprise-badge-success',
  'On Leave': 'enterprise-badge-warning',
  Inactive: 'enterprise-badge-danger',
};

export function EmployeesPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          People & HR › Employees
        </p>
        <h1 className="text-2xl font-bold text-gray-900">All Employees</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Employees', value: '1,245', icon: Users, color: '#3b82f6' },
          { label: 'New This Month', value: '18', icon: UserPlus, color: '#10b981' },
          { label: 'On Leave Today', value: '23', icon: Clock, color: '#f59e0b' },
          { label: 'Retention Rate', value: '94.2%', icon: TrendingUp, color: '#8b5cf6' },
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

      {/* Table */}
      <div className="enterprise-card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[13px] font-semibold text-gray-700">Employee Directory</h2>
          <button className="enterprise-button-primary text-[12px] px-3 py-1.5 flex items-center gap-1.5">
            <UserPlus size={13} /> Add Employee
          </button>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-gray-100">
              {['Name', 'Role', 'Site', 'Joined', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id} className="enterprise-table-row border-b border-gray-50">
                <td className="px-5 py-3 font-medium text-gray-800">{emp.name}</td>
                <td className="px-5 py-3 text-gray-500">{emp.role}</td>
                <td className="px-5 py-3 text-gray-500">{emp.site}</td>
                <td className="px-5 py-3 text-gray-400">{emp.joined}</td>
                <td className="px-5 py-3">
                  <span className={statusColor[emp.status]}>{emp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
