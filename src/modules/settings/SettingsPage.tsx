import { useLocation } from 'react-router-dom';
import { findSection } from '@/lib/navigation';
import {
  Building2, Calendar, Receipt, Wallet, Settings, Briefcase, Database,
  FileText, Wrench, LayoutGrid, Shield, Upload, Bell, ScrollText, BookOpen, BarChart2, Building,
} from 'lucide-react';

const settingsSections = [
  { id: 'company-info',       label: 'Company Info',       desc: 'Organisation details, logo and contact info',            icon: Building2,    path: '/settings/company' },
  { id: 'leave-settings',     label: 'Leave Settings',     desc: 'Leave types, balances and entitlement rules',            icon: Calendar,     path: '/settings/leave' },
  { id: 'billing-settings',   label: 'Billing',            desc: 'Invoice templates, payment terms and tax settings',      icon: Receipt,      path: '/settings/billing' },
  { id: 'payroll-settings',   label: 'Payroll',            desc: 'Pay periods, EPF/SOCSO rates and deduction rules',       icon: Wallet,       path: '/settings/payroll' },
  { id: 'app-config',         label: 'App Config',         desc: 'System-wide preferences and feature toggles',            icon: Settings,     path: '/settings/app' },
  { id: 'project-settings',   label: 'Project',            desc: 'Project categories, statuses and pipeline stages',       icon: Briefcase,    path: '/settings/project' },
  { id: 'master',             label: 'Master Data',        desc: 'Lookup tables, reference codes and system enumerations', icon: Database,     path: '/settings/master' },
  { id: 'template-settings',  label: 'Template Settings',  desc: 'Email, SMS and document template management',            icon: FileText,     path: '/settings/templates' },
  { id: 'operation-settings', label: 'Operation',          desc: 'Site operation defaults, shift patterns and rules',      icon: Wrench,       path: '/settings/operation' },
  { id: 'module-config',      label: 'Module Config',      desc: 'Enable or disable modules per client configuration',     icon: LayoutGrid,   path: '/settings/modules' },
  { id: 'user-permission',    label: 'User Permission',    desc: 'Role-based access control and user group management',    icon: Shield,       path: '/settings/permissions' },
  { id: 'data-import',        label: 'Data Import',        desc: 'Bulk import employees, sites and historical data',       icon: Upload,       path: '/settings/import' },
  { id: 'notification-group', label: 'Notification Group', desc: 'Alert routing, escalation chains and distribution lists',icon: Bell,         path: '/settings/notifications' },
  { id: 'system-log',         label: 'System Log',         desc: 'Audit trail, error logs and activity monitoring',        icon: ScrollText,   path: '/settings/log' },
  { id: 'ojt-report-setting', label: 'OJT Report',         desc: 'On-the-job training report templates and grading',       icon: BookOpen,     path: '/settings/ojt' },
  { id: 'report-config',      label: 'Report Config',      desc: 'Report builder, scheduling and export options',          icon: BarChart2,    path: '/settings/reports' },
  { id: 'company-config',     label: 'Company Config',     desc: 'Multi-company setup, subsidiary and branch management',  icon: Building,     path: '/settings/company-config' },
];

export function SettingsPage() {
  const location = useLocation();

  // If we are on a specific settings sub-path, highlight it
  const match = findSection(location.pathname);
  const currentPath = location.pathname;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--primary-brand)' }}>
          Settings
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          {match ? match.item.label : 'System Settings'}
        </h1>
        {!match && (
          <p className="text-[13px] text-gray-400 mt-1">
            Configure your application preferences and system parameters.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {settingsSections.map(item => {
          const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
          return (
            <div
              key={item.id}
              className="enterprise-card p-4 cursor-pointer group transition-all duration-150"
              style={{
                borderColor: isActive ? 'var(--primary-brand)' : undefined,
                background: isActive ? 'rgba(37,99,235,0.03)' : undefined,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: isActive ? 'var(--primary-brand)' : '#f1f5f9',
                  }}
                >
                  <item.icon
                    size={15}
                    style={{ color: isActive ? '#fff' : '#64748b' }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                    {item.label}
                  </p>
                  <p className="text-[11.5px] text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
