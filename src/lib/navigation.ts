import type { LucideIcon } from 'lucide-react';
import {
  // Layout / Dashboard
  LayoutDashboard, Bell, BarChart2, Tag, FolderOpen,
  // Clipboard / Forms
  ClipboardList, ClipboardCheck, FileText, FilePlus, FileCheck, FileMinus,
  // Building / Location
  Building, Building2, MapPin, Map,
  // Users
  Users, UserPlus, UserCheck,
  // Calendar / Time
  Calendar, CalendarDays, CalendarCheck, CalendarX, Clock, History,
  // Communication
  Mail, MessageCircle, MessageSquare, PhoneCall, Megaphone, Rss, Send,
  // Documents / Books
  BookOpen, BookMarked, Library, Newspaper,
  // Finance
  CreditCard, DollarSign, Banknote, Receipt, Landmark, Scale,
  ShoppingCart, ShoppingBag, TrendingUp, TrendingDown,
  // Operations / Technical
  Wrench, Truck, AlertTriangle, AlertCircle, Cpu, Hammer,
  Activity, Target, Monitor, Radio,
  // Media / Education
  PlayCircle, Award, GraduationCap, Lightbulb,
  // Inventory / Package
  Package, PackageOpen, PackageCheck, Boxes, Key,
  // Settings / Config
  Settings2, SlidersHorizontal, Cog, ShieldCheck, ShieldAlert,
  Upload, Download, Database, LayoutGrid,
  // Misc
  BadgeCheck, CheckCircle, FolderKanban, FolderPlus, Layers,
  ListChecks, Dumbbell, Bug, RefreshCcw, RefreshCw,
  LineChart, Search, ScrollText, Plus,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: LucideIcon;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

export interface Cluster {
  id: string;
  label: string;
  emoji: string;
  sections: NavSection[];
}

// ─── Navigation Data ──────────────────────────────────────────────────────────

export const CLUSTERS: Cluster[] = [
  // ── HOME ─────────────────────────────────────────────────────────────────
  {
    id: 'home',
    label: 'Home',
    emoji: '🏠',
    sections: [
      {
        id: 'home-main',
        label: 'Home',
        items: [
          { id: 'dashboard',      label: 'Dashboard',      path: '/',                  icon: LayoutDashboard },
          { id: 'notifications',  label: 'Notifications',  path: '/notifications',     icon: Bell },
          { id: 'data-analytics', label: 'Data Analytics', path: '/analytics/data',    icon: BarChart2 },
          { id: 'home-tickets',   label: 'Tickets',        path: '/support/tickets',   icon: Tag },
          { id: 'home-cases',     label: 'Cases',          path: '/support/cases',     icon: FolderOpen },
        ],
      },
    ],
  },

  // ── CORE ─────────────────────────────────────────────────────────────────
  {
    id: 'core',
    label: 'Core',
    emoji: '🔰',
    sections: [
      {
        id: 'visitors',
        label: 'Visitors',
        items: [
          { id: 'visitor-dashboard', label: 'Dashboard',     path: '/visitors/dashboard', icon: LayoutDashboard },
          { id: 'visitor-log',       label: 'Visitor Log',   path: '/visitors/log',       icon: ClipboardList },
          { id: 'site-resident',     label: 'Site Resident', path: '/visitors/resident',  icon: Building2 },
          { id: 'visitor-pass',      label: 'Visitor Pass',  path: '/visitors/pass',      icon: BadgeCheck },
          { id: 'visitor-settings',  label: 'Settings',      path: '/visitors/settings',  icon: SlidersHorizontal },
        ],
      },
      {
        id: 'plrd',
        label: 'PLRD',
        items: [
          { id: 'grading-form', label: 'Grading Form', path: '/monitoring/grading-form', icon: ClipboardCheck },
        ],
      },
      {
        id: 'eform',
        label: 'E-Form',
        items: [
          { id: 'lost-found',      label: 'Lost & Found',        path: '/monitoring/lost-found',       icon: Search },
          { id: 'service-report',  label: 'Service Report',      path: '/monitoring/service-report',   icon: Wrench },
          { id: 'delivery-report', label: 'Delivery Report',     path: '/monitoring/delivery-report',  icon: Truck },
          { id: 'site-item-issue', label: 'Site Item Issue',     path: '/monitoring/site-item-issue',  icon: AlertTriangle },
          { id: 'tech-service',    label: 'Tech Service Report', path: '/monitoring/tech-service',     icon: Cpu },
          { id: 'installation',    label: 'Installation Report', path: '/monitoring/installation',     icon: Hammer },
        ],
      },
    ],
  },

   // ── BILLING & ACCOUNTING ─────────────────────────────────────────────────
  {
    id: 'billing-acc',
    label: 'Billing & Accounting',
    emoji: '🧾',
    sections: [
      {
        id: 'billing',
        label: 'Billing',
        items: [
          { id: 'billing-dash',   label: 'Dashboard',      path: '/billing/dashboard',      icon: LayoutDashboard },
          { id: 'new-invoice',    label: 'New Invoice',    path: '/billing/invoice/new',    icon: FilePlus },
          { id: 'all-invoice',    label: 'All Invoice',    path: '/billing/invoice/all',    icon: FileText },
          { id: 'payment',        label: 'Payment',        path: '/billing/payment',        icon: CreditCard },
          { id: 'invoice-aging',  label: 'Invoice Aging',  path: '/billing/aging',          icon: Clock },
          { id: 'credit-note',    label: 'Credit Note',    path: '/billing/credit-note',    icon: FileCheck },
          { id: 'debit-note',     label: 'Debit Note',     path: '/billing/debit-note',     icon: FileMinus },
          { id: 'delivery-order', label: 'Delivery Order', path: '/billing/delivery-order', icon: Truck },
          { id: 'other-income',   label: 'Other Income',   path: '/billing/other-income',   icon: DollarSign },
        ],
      },
      {
        id: 'accounting',
        label: 'Accounting',
        items: [
          { id: 'chart-accounts',    label: 'Chart of Accounts',         path: '/accounting/chart',          icon: Layers },
          { id: 'acc-dashboard',     label: 'Dashboard',                 path: '/accounting/dashboard',      icon: LayoutDashboard },
          { id: 'acc-expense',       label: 'Expense',                   path: '/accounting/expense',        icon: Receipt },
          { id: 'new-journal',       label: 'New Journal',               path: '/accounting/journal/new',    icon: BookOpen },
          { id: 'all-journal',       label: 'All Journal',               path: '/accounting/journal/all',    icon: BookMarked },
          { id: 'ledgers',           label: 'Ledgers',                   path: '/accounting/ledgers',        icon: FileText },
          { id: 'trial-balance',     label: 'Trial Balance',             path: '/accounting/trial-balance',  icon: Scale },
          { id: 'profit-loss',       label: 'Profit & Loss',             path: '/accounting/profit-loss',    icon: TrendingUp },
          { id: 'balance-sheet',     label: 'Balance Sheet',             path: '/accounting/balance-sheet',  icon: BarChart2 },
          { id: 'bank-rec',          label: 'Bank Reconciliation',       path: '/accounting/bank-rec',       icon: Landmark },
          { id: 'receivable-report', label: 'Receivable Invoice Report', path: '/accounting/receivable',     icon: ClipboardList },
        ],
      },
    ],
  },

  // ── ICC ───────────────────────────────────────────────────────────────────
  {
    id: 'icc',
    label: 'ICC',
    emoji: '📡',
    sections: [
      {
        id: 'icc-main',
        label: 'ICC',
        items: [
          { id: 'icc-dashboard',   label: 'Dashboard',        path: '/icc/dashboard',   icon: LayoutDashboard },
          { id: 'icc-deployment',  label: 'Deployment',       path: '/icc/deployment',  icon: Radio },
          { id: 'icc-eoccurrence', label: 'ICC E-Occurrence', path: '/icc/eoccurrence', icon: AlertCircle },
          { id: 'icc-attendance',  label: 'ICC Attendance',   path: '/icc/attendance',  icon: UserCheck },
          { id: 'icc-config',      label: 'ICC Config',       path: '/icc/config',      icon: Settings2 },
          { id: 'icc-task',        label: 'ICC Task',         path: '/icc/task',        icon: CheckCircle },
          { id: 'call-log',        label: 'Call Log',         path: '/icc/call-log',    icon: PhoneCall },
          { id: 'icc-monitoring',  label: 'Monitoring',       path: '/icc/monitoring',  icon: Activity },
        ],
      },
      {
        id: 'icc-marketing',
        label: 'Marketing',
        items: [
          { id: 'icc-mkt-dash',    label: 'Marketing',   path: '/marketing/dashboard',  icon: Megaphone },
          { id: 'broadcast',       label: 'Broadcast',   path: '/marketing/broadcast',  icon: Rss },
          { id: 'mkt-recruitment', label: 'Recruitment', path: '/marketing/recruitment', icon: UserPlus },
          { id: 'checklist',       label: 'Checklist',   path: '/marketing/checklist',  icon: ListChecks },
        ],
      },
    ],
  },

  // ── EMPLOYEES ────────────────────────────────────────────────────────────
  {
    id: 'employees',
    label: 'Employees',
    emoji: '🪪',
    sections: [
      {
        id: 'employees-main',
        label: 'Employees',
        items: [
          { id: 'emp-dashboard',    label: 'Dashboard',         path: '/employee/dashboard',       icon: LayoutDashboard },
          { id: 'new-employee',     label: 'New Employee',      path: '/employee/new',             icon: UserPlus },
          { id: 'all-employee',     label: 'All Employee',      path: '/employee/all',             icon: Users },
          { id: 'pre-employment',   label: 'Pre-Employment',    path: '/employee/pre-employment',  icon: UserCheck },
          { id: 'reconciliation',   label: 'Reconciliation',    path: '/employee/reconciliation',  icon: RefreshCcw },
          { id: 'emp-circular',     label: 'Employee Circular', path: '/employee/circular',        icon: Newspaper },
          { id: 'kpi-form',         label: 'KPI Form',          path: '/employee/kpi-form',        icon: Target },
          { id: 'letter-request',   label: 'Letter Request',    path: '/employee/letter-request',  icon: Mail },
          { id: 'emp-ref-list',     label: 'Employee Ref List', path: '/employee/ref-list',        icon: BookOpen },
          { id: 'grievance-list',   label: 'Grievance List',    path: '/employee/grievance',       icon: MessageCircle },
          { id: 'suggestions-list', label: 'Suggestions List',  path: '/employee/suggestions',     icon: Lightbulb },
        ],
      },
    ],
  },

  // ── PEOPLE & HR ───────────────────────────────────────────────────────────
  {
    id: 'people',
    label: 'People & HR',
    emoji: '👥',
    sections: [
      {
        id: 'roster',
        label: 'Roster',
        items: [
          { id: 'emp-roster',  label: 'Employee Roster',   path: '/roster/employee',   icon: CalendarDays },
          { id: 'sup-roster',  label: 'Supervisor Roster', path: '/roster/supervisor', icon: CalendarCheck },
          { id: 'icc-roster',  label: 'ICC Roster',        path: '/roster/icc',        icon: Calendar },
          { id: 'ojt-report',  label: 'OJT Report List',   path: '/roster/ojt',        icon: BarChart2 },
          { id: 'site-check',  label: 'Site Check Visit',  path: '/roster/site-check', icon: MapPin },
          { id: 'duty-roster', label: 'Duty Roster',       path: '/roster/duty',       icon: Clock },
        ],
      },
      {
        id: 'recruitment',
        label: 'Recruitment',
        items: [
          { id: 'new-job-app',  label: 'New Job Application',  path: '/recruitment/new',  icon: FilePlus },
          { id: 'job-app-list', label: 'Job Application List', path: '/recruitment/list', icon: FileText },
        ],
      },
      {
        id: 'training',
        label: 'Training',
        items: [
          { id: 'training-schedule', label: 'Training Schedule',    path: '/training/schedule',    icon: CalendarDays },
          { id: 'training-history',  label: 'Training History',     path: '/training/history',     icon: History },
          { id: 'elearning',         label: 'E-Learning Dashboard', path: '/training/elearning',   icon: GraduationCap },
          { id: 'exam-result',       label: 'Exam Result',          path: '/training/exam-result', icon: Award },
          { id: 'course-list',       label: 'Course List',          path: '/training/courses',     icon: BookOpen },
          { id: 'training-report',   label: 'Report',               path: '/training/report',      icon: BarChart2 },
          { id: 'sl-video',          label: 'Video',                path: '/training/video',       icon: PlayCircle },
          { id: 'sop',               label: 'SOP',                  path: '/training/sop',         icon: BookMarked },
          { id: 'handbook',          label: 'Handbook',             path: '/training/handbook',    icon: Library },
          { id: 'aar',               label: 'AAR',                  path: '/training/aar',         icon: ClipboardList },
          { id: 'news-events',       label: 'News & Events List',   path: '/training/news',        icon: Newspaper },
        ],
      },
    ],
  },

  // ── ATTENDANCE ────────────────────────────────────────────────────────────
  {
    id: 'attendance',
    label: 'Attendance',
    emoji: '🕐',
    sections: [
      {
        id: 'attendance-main',
        label: 'Attendance',
        items: [
          { id: 'att-dashboard', label: 'Attendance Dashboard', path: '/attendance/dashboard', icon: LayoutDashboard },
          { id: 'daily-att',     label: 'Daily Attendance',     path: '/attendance/daily',     icon: CalendarCheck },
          { id: 'client-att',    label: 'Client Attendance',    path: '/attendance/client',    icon: Building2 },
          { id: 'all-att',       label: 'All Attendance',       path: '/attendance/all',       icon: Clock },
        ],
      },
      {
        id: 'leave',
        label: 'Leave',
        items: [
          { id: 'new-leave',        label: 'New Leave',        path: '/leave/new',        icon: FilePlus },
          { id: 'all-leave',        label: 'All Leave',        path: '/leave/all',        icon: FileText },
          { id: 'leave-approval',   label: 'Leave Approval',   path: '/leave/approval',   icon: FileCheck },
          { id: 'leave-request',    label: 'Leave Request',    path: '/leave/request',    icon: Send },
          { id: 'leave-encashment', label: 'Leave Encashment', path: '/leave/encashment', icon: DollarSign },
        ],
      },
    ],
  },

  // ── OPERATIONS ────────────────────────────────────────────────────────────
  {
    id: 'operations',
    label: 'Operations',
    emoji: '🗂',
    sections: [
      {
        id: 'sites',
        label: 'Sites',
        items: [
          { id: 'site-kpi',        label: 'KPI',             path: '/site/kpi',              icon: Target },
          { id: 'all-site',        label: 'All Sites',       path: '/site/all',              icon: Building2 },
          { id: 'client-meeting',  label: 'Client Meeting',  path: '/site/client-meeting',   icon: Users },
          { id: 'client-feedback', label: 'Client Feedback', path: '/site/client-feedback',  icon: MessageSquare },
          { id: 'risk-survey',     label: 'Risk Survey',     path: '/site/risk-survey',      icon: ShieldAlert },
          { id: 'new-exercise',    label: 'New Exercise',    path: '/site/exercise/new',     icon: Plus },
          { id: 'exercise-list',   label: 'Exercise List',   path: '/site/exercise/list',    icon: Dumbbell },
        ],
      },
      {
        id: 'patrol',
        label: 'Patrol',
        items: [
          { id: 'virtual-patrol',   label: 'Virtual Patrol Config', path: '/patrol/virtual',   icon: Monitor },
          { id: 'daily-patrol',     label: 'Daily Patrol',          path: '/patrol/daily',     icon: MapPin },
          { id: 'all-patrol',       label: 'All Patrol',            path: '/patrol/all',       icon: Map },
          { id: 'patrol-config',    label: 'Patrol Config',         path: '/patrol/config',    icon: Settings2 },
          { id: 'patrol-checklist', label: 'Patrol Checklist',      path: '/patrol/checklist', icon: ClipboardCheck },
        ],
      },
      {
        id: 'incident',
        label: 'Incident',
        items: [
          { id: 'new-incident', label: 'New Incident', path: '/incident/new', icon: AlertTriangle },
          { id: 'all-incident', label: 'All Incident', path: '/incident/all', icon: AlertCircle },
        ],
      },
      {
        id: 'defect',
        label: 'Defect',
        items: [
          { id: 'new-defect',  label: 'New Defect',   path: '/defect/new',        icon: Bug },
          { id: 'all-defect',  label: 'All Defect',   path: '/defect/all',        icon: Layers },
          { id: 'eoccurrence', label: 'E-Occurrence', path: '/defect/eoccurrence', icon: RefreshCcw },
        ],
      },
    ],
  },

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  {
    id: 'projects',
    label: 'Projects',
    emoji: '📋',
    sections: [
      {
        id: 'projects-main',
        label: 'Projects',
        items: [
          { id: 'new-project',    label: 'New Project',              path: '/project/new',        icon: FolderPlus },
          { id: 'all-project',    label: 'All Projects',             path: '/project/all',        icon: FolderKanban },
          { id: 'all-contracts',  label: 'All Contracts',            path: '/project/contracts',  icon: FileText },
          { id: 'proj-analytics', label: 'Project Analytics Report', path: '/project/analytics',  icon: BarChart2 },
        ],
      },
      {
        id: 'task',
        label: 'Tasks',
        items: [
          { id: 'task-dashboard', label: 'Task Dashboard', path: '/task/dashboard', icon: LayoutDashboard },
          { id: 'all-task',       label: 'All Tasks',      path: '/task/all',       icon: CheckCircle },
        ],
      },
    ],
  },

  // ── FINANCE & RESOURCES ───────────────────────────────────────────────────
  {
    id: 'finance',
    label: 'Finance & Resources',
    emoji: '💰',
    sections: [
      {
        id: 'expenses',
        label: 'Expenses',
        items: [
          { id: 'new-expense',      label: 'New Expense',      path: '/expense/new',        icon: FilePlus },
          { id: 'all-expense',      label: 'All Expense',      path: '/expense/all',        icon: FileText },
          { id: 'expense-approval', label: 'Expense Approval', path: '/expense/approval',   icon: FileCheck },
          { id: 'recipient',        label: 'Recipient',        path: '/expense/recipient',  icon: Send },
          { id: 'cheque-book',      label: 'Cheque Book',      path: '/expense/cheque-book', icon: BookOpen },
        ],
      },
      {
        id: 'payroll',
        label: 'Payroll',
        items: [
          { id: 'monthly-pay',       label: 'Monthly Pay',           path: '/payroll/monthly',   icon: CalendarDays },
          { id: 'daily-pay',         label: 'Daily Pay',             path: '/payroll/daily',     icon: CalendarCheck },
          { id: 'weekly-pay',        label: 'Weekly Pay',            path: '/payroll/weekly',    icon: Calendar },
          { id: 'recurring-advance', label: 'Recurring Advance Pay', path: '/payroll/recurring', icon: RefreshCw },
          { id: 'loan',              label: 'Loan',                  path: '/payroll/loan',      icon: Landmark },
          { id: 'liquidity-damage',  label: 'Liquidity Damage',      path: '/payroll/liquidity', icon: TrendingDown },
          { id: 'cash-pay',          label: 'Cash Pay',              path: '/payroll/cash',      icon: Banknote },
          { id: 'pay-report',        label: 'Pay Report',            path: '/payroll/report',    icon: BarChart2 },
          { id: 'tax-report',        label: 'Employee Tax Report',   path: '/payroll/tax',       icon: Receipt },
        ],
      },
      {
        id: 'procurement',
        label: 'Procurement',
        items: [
          { id: 'purchase-req',   label: 'Purchase Requisition', path: '/procurement/requisition', icon: ShoppingCart },
          { id: 'purchase-order', label: 'Purchase Order',       path: '/procurement/order',        icon: ShoppingBag },
        ],
      },
    ],
  },

  // ── INVENTORY ─────────────────────────────────────────────────────────────
  {
    id: 'inventory',
    label: 'Inventory',
    emoji: '📦',
    sections: [
      {
        id: 'inventory-main',
        label: 'Inventory',
        items: [
          { id: 'inv-dashboard',   label: 'Dashboard',             path: '/inventory/dashboard',      icon: LayoutDashboard },
          { id: 'new-inv-assign',  label: 'New Assign',            path: '/inventory/assign/new',     icon: Plus },
          { id: 'inv-config',      label: 'Config',                path: '/inventory/config',         icon: Settings2 },
          { id: 'assign-inv',      label: 'Assign Inventory',      path: '/inventory/assign/list',    icon: Package },
          { id: 'new-outward',     label: 'New Outward Entry',     path: '/inventory/outward/new',    icon: PackageOpen },
          { id: 'outward-list',    label: 'Assigned Outward List', path: '/inventory/outward/list',   icon: PackageCheck },
          { id: 'outward-history', label: 'Outward History',       path: '/inventory/outward/history', icon: History },
          { id: 'stock-list',      label: 'Stock List',            path: '/inventory/stock',          icon: Boxes },
          { id: 'inv-handover',    label: 'Handover',              path: '/inventory/handover',       icon: Upload },
          { id: 'inv-takeover',    label: 'Takeover',              path: '/inventory/takeover',       icon: Download },
          { id: 'inv-approval',    label: 'Approval',              path: '/inventory/approval',       icon: CheckCircle },
        ],
      },
      {
        id: 'keys',
        label: 'Keys',
        items: [
          { id: 'keys',    label: 'Keys',            path: '/inventory/keys',    icon: Key },
          { id: 'key-log', label: 'Key Log Session', path: '/inventory/key-log', icon: ScrollText },
        ],
      },
    ],
  },

  // ── INSIGHTS & CRM ────────────────────────────────────────────────────────
  {
    id: 'insights',
    label: 'Insights & CRM',
    emoji: '📊',
    sections: [
      {
        id: 'crm',
        label: 'CRM',
        items: [
          { id: 'new-quotation', label: 'New Quotation', path: '/crm/quotation/new', icon: FilePlus },
          { id: 'all-quotation', label: 'All Quotation', path: '/crm/quotation/all', icon: FileText },
          { id: 'lead',          label: 'Lead',          path: '/crm/lead',          icon: Target },
        ],
      },
      {
        id: 'analytics',
        label: 'Analytics',
        items: [
          { id: 'billing-analytics', label: 'Billing Analytics',     path: '/analytics/billing',     icon: Receipt },
          { id: 'profit-project',    label: 'Profit per Project',    path: '/analytics/profit',      icon: TrendingUp },
          { id: 'profit-project-v2', label: 'Profit per Project V2', path: '/analytics/profit-v2',   icon: LineChart },
          { id: 'att-analytics',     label: 'Attendance Analytics',  path: '/analytics/attendance',  icon: Clock },
          { id: 'emp-analytics',     label: 'Employee Analytics',    path: '/analytics/employee',    icon: Users },
          { id: 'payroll-analytics', label: 'Payroll Analytics',     path: '/analytics/payroll',     icon: Banknote },
          { id: 'site-analytics',    label: 'Site Analytics',        path: '/analytics/site',        icon: Building2 },
          { id: 'deploy-analytics',  label: 'Deployment Analytics',  path: '/analytics/deployment',  icon: Radio },
          { id: 'data-analytics2',   label: 'Data Analytics',        path: '/analytics/data',        icon: Database },
        ],
      },
    ],
  },

  // ── SETTINGS ──────────────────────────────────────────────────────────────
  {
    id: 'system',
    label: 'Settings',
    emoji: '⚙️',
    sections: [
      {
        id: 'settings',
        label: 'Settings',
        items: [
          { id: 'company-info',       label: 'Company Info',       path: '/settings/company',        icon: Building2 },
          { id: 'leave-settings',     label: 'Leave Settings',     path: '/settings/leave',          icon: CalendarX },
          { id: 'billing-settings',   label: 'Billing',            path: '/settings/billing',        icon: CreditCard },
          { id: 'payroll-settings',   label: 'Payroll',            path: '/settings/payroll',        icon: DollarSign },
          { id: 'app-config',         label: 'App Config',         path: '/settings/app',            icon: Cog },
          { id: 'project-settings',   label: 'Project',            path: '/settings/project',        icon: FolderKanban },
          { id: 'master',             label: 'Master',             path: '/settings/master',         icon: Database },
          { id: 'template-settings',  label: 'Template Settings',  path: '/settings/templates',      icon: LayoutGrid },
          { id: 'operation-settings', label: 'Operation',          path: '/settings/operation',      icon: Settings2 },
          { id: 'module-config',      label: 'Module Config',      path: '/settings/modules',        icon: Layers },
          { id: 'user-permission',    label: 'User Permission',    path: '/settings/permissions',    icon: ShieldCheck },
          { id: 'data-import',        label: 'Data Import',        path: '/settings/import',         icon: Upload },
          { id: 'notification-group', label: 'Notification Group', path: '/settings/notifications',  icon: Bell },
          { id: 'system-log',         label: 'System Log',         path: '/settings/log',            icon: ScrollText },
          { id: 'ojt-report-setting', label: 'OJT Report',         path: '/settings/ojt',            icon: BarChart2 },
          { id: 'report-config',      label: 'Report Config',      path: '/settings/reports',        icon: SlidersHorizontal },
          { id: 'company-config',     label: 'Company Config',     path: '/settings/company-config', icon: Building },
        ],
      },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function findCluster(pathname: string): Cluster | undefined {
  return CLUSTERS.find(c =>
    c.sections.some(s =>
      s.items.some(item =>
        item.path === pathname ||
        (item.path !== '/' && pathname.startsWith(item.path + '/'))
      )
    )
  );
}

export function findSection(
  pathname: string
): { cluster: Cluster; section: NavSection; item: NavItem } | undefined {
  for (const cluster of CLUSTERS) {
    for (const section of cluster.sections) {
      const item = section.items.find(
        i => i.path === pathname || (i.path !== '/' && pathname.startsWith(i.path + '/'))
      );
      if (item) return { cluster, section, item };
    }
  }
  return undefined;
}
