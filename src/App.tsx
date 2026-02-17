import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import { Dashboard } from './modules/home/Dashboard';
import { EmployeesPage } from './modules/people/EmployeesPage';
import { ProjectsPage } from './modules/operations/ProjectsPage';
import { BillingPage } from './modules/finance/BillingPage';
import { AnalyticsPage } from './modules/insights/AnalyticsPage';
import { SettingsPage } from './modules/settings/SettingsPage';
import { ModulePage } from './modules/shared/ModulePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout />}>
          {/* ── Home / Dashboard ────────────────────────────────── */}
          <Route index element={<Dashboard />} />
          <Route path="notifications" element={<ModulePage />} />
          <Route path="analytics/data" element={<ModulePage />} />
          <Route path="support/tickets" element={<ModulePage />} />
          <Route path="support/cases" element={<ModulePage />} />

          {/* ── Visitors ────────────────────────────────────────── */}
          <Route path="visitors/dashboard" element={<ModulePage />} />
          <Route path="visitors/log" element={<ModulePage />} />
          <Route path="visitors/resident" element={<ModulePage />} />
          <Route path="visitors/pass" element={<ModulePage />} />
          <Route path="visitors/settings" element={<ModulePage />} />

          {/* ── ICC ─────────────────────────────────────────────── */}
          <Route path="icc/dashboard" element={<ModulePage />} />
          <Route path="icc/deployment" element={<ModulePage />} />
          <Route path="icc/eoccurrence" element={<ModulePage />} />
          <Route path="icc/attendance" element={<ModulePage />} />
          <Route path="icc/config" element={<ModulePage />} />
          <Route path="icc/task" element={<ModulePage />} />
          <Route path="icc/call-log" element={<ModulePage />} />
          <Route path="marketing/dashboard" element={<ModulePage />} />
          <Route path="marketing/broadcast" element={<ModulePage />} />
          <Route path="marketing/recruitment" element={<ModulePage />} />
          <Route path="marketing/checklist" element={<ModulePage />} />
          <Route path="icc/monitoring" element={<ModulePage />} />

          {/* ── PLRD ────────────────────────────────────────────── */}
          <Route path="monitoring/grading-form" element={<ModulePage />} />

          {/* ── E-Form ──────────────────────────────────────────── */}
          <Route path="monitoring/lost-found" element={<ModulePage />} />
          <Route path="monitoring/service-report" element={<ModulePage />} />
          <Route path="monitoring/delivery-report" element={<ModulePage />} />
          <Route path="monitoring/site-item-issue" element={<ModulePage />} />
          <Route path="monitoring/tech-service" element={<ModulePage />} />
          <Route path="monitoring/installation" element={<ModulePage />} />

          {/* ── People & HR ─────────────────────────────────────── */}
          <Route path="employee/dashboard" element={<ModulePage />} />
          <Route path="employee/new" element={<ModulePage />} />
          <Route path="employee/all" element={<EmployeesPage />} />
          <Route path="employee/pre-employment" element={<ModulePage />} />
          <Route path="employee/reconciliation" element={<ModulePage />} />
          <Route path="employee/circular" element={<ModulePage />} />
          <Route path="employee/kpi-form" element={<ModulePage />} />
          <Route path="employee/letter-request" element={<ModulePage />} />
          <Route path="employee/ref-list" element={<ModulePage />} />
          <Route path="employee/grievance" element={<ModulePage />} />
          <Route path="employee/suggestions" element={<ModulePage />} />
          <Route path="attendance/dashboard" element={<ModulePage />} />
          <Route path="attendance/daily" element={<ModulePage />} />
          <Route path="attendance/client" element={<ModulePage />} />
          <Route path="attendance/all" element={<ModulePage />} />
          <Route path="leave/new" element={<ModulePage />} />
          <Route path="leave/all" element={<ModulePage />} />
          <Route path="leave/approval" element={<ModulePage />} />
          <Route path="leave/request" element={<ModulePage />} />
          <Route path="leave/encashment" element={<ModulePage />} />
          <Route path="roster/employee" element={<ModulePage />} />
          <Route path="roster/supervisor" element={<ModulePage />} />
          <Route path="roster/icc" element={<ModulePage />} />
          <Route path="roster/ojt" element={<ModulePage />} />
          <Route path="roster/site-check" element={<ModulePage />} />
          <Route path="roster/duty" element={<ModulePage />} />
          <Route path="recruitment/new" element={<ModulePage />} />
          <Route path="recruitment/list" element={<ModulePage />} />
          <Route path="training/schedule" element={<ModulePage />} />
          <Route path="training/history" element={<ModulePage />} />
          <Route path="training/elearning" element={<ModulePage />} />
          <Route path="training/exam-result" element={<ModulePage />} />
          <Route path="training/courses" element={<ModulePage />} />
          <Route path="training/report" element={<ModulePage />} />
          <Route path="training/video" element={<ModulePage />} />
          <Route path="training/sop" element={<ModulePage />} />
          <Route path="training/handbook" element={<ModulePage />} />
          <Route path="training/aar" element={<ModulePage />} />
          <Route path="training/news" element={<ModulePage />} />

          {/* ── Operations ──────────────────────────────────────── */}
          <Route path="project/new" element={<ModulePage />} />
          <Route path="project/all" element={<ProjectsPage />} />
          <Route path="project/contracts" element={<ModulePage />} />
          <Route path="project/analytics" element={<ModulePage />} />
          <Route path="task/dashboard" element={<ModulePage />} />
          <Route path="task/all" element={<ModulePage />} />
          <Route path="site/kpi" element={<ModulePage />} />
          <Route path="site/all" element={<ModulePage />} />
          <Route path="site/client-meeting" element={<ModulePage />} />
          <Route path="site/client-feedback" element={<ModulePage />} />
          <Route path="site/risk-survey" element={<ModulePage />} />
          <Route path="site/exercise/new" element={<ModulePage />} />
          <Route path="site/exercise/list" element={<ModulePage />} />
          <Route path="patrol/virtual" element={<ModulePage />} />
          <Route path="patrol/daily" element={<ModulePage />} />
          <Route path="patrol/all" element={<ModulePage />} />
          <Route path="patrol/config" element={<ModulePage />} />
          <Route path="patrol/checklist" element={<ModulePage />} />
          <Route path="incident/new" element={<ModulePage />} />
          <Route path="incident/all" element={<ModulePage />} />
          <Route path="defect/new" element={<ModulePage />} />
          <Route path="defect/all" element={<ModulePage />} />
          <Route path="defect/eoccurrence" element={<ModulePage />} />

          {/* ── Finance & Resources ─────────────────────────────── */}
          <Route path="billing/dashboard" element={<BillingPage />} />
          <Route path="billing/invoice/new" element={<ModulePage />} />
          <Route path="billing/invoice/all" element={<BillingPage />} />
          <Route path="billing/payment" element={<ModulePage />} />
          <Route path="billing/aging" element={<ModulePage />} />
          <Route path="billing/credit-note" element={<ModulePage />} />
          <Route path="billing/debit-note" element={<ModulePage />} />
          <Route path="billing/delivery-order" element={<ModulePage />} />
          <Route path="billing/other-income" element={<ModulePage />} />
          <Route path="expense/new" element={<ModulePage />} />
          <Route path="expense/all" element={<ModulePage />} />
          <Route path="expense/approval" element={<ModulePage />} />
          <Route path="expense/recipient" element={<ModulePage />} />
          <Route path="expense/cheque-book" element={<ModulePage />} />
          <Route path="payroll/monthly" element={<ModulePage />} />
          <Route path="payroll/daily" element={<ModulePage />} />
          <Route path="payroll/weekly" element={<ModulePage />} />
          <Route path="payroll/recurring" element={<ModulePage />} />
          <Route path="payroll/loan" element={<ModulePage />} />
          <Route path="payroll/liquidity" element={<ModulePage />} />
          <Route path="payroll/cash" element={<ModulePage />} />
          <Route path="payroll/report" element={<ModulePage />} />
          <Route path="payroll/tax" element={<ModulePage />} />
          <Route path="accounting/chart" element={<ModulePage />} />
          <Route path="accounting/dashboard" element={<ModulePage />} />
          <Route path="accounting/expense" element={<ModulePage />} />
          <Route path="accounting/journal/new" element={<ModulePage />} />
          <Route path="accounting/journal/all" element={<ModulePage />} />
          <Route path="accounting/ledgers" element={<ModulePage />} />
          <Route path="accounting/trial-balance" element={<ModulePage />} />
          <Route path="accounting/profit-loss" element={<ModulePage />} />
          <Route path="accounting/balance-sheet" element={<ModulePage />} />
          <Route path="accounting/bank-rec" element={<ModulePage />} />
          <Route path="accounting/receivable" element={<ModulePage />} />
          <Route path="procurement/requisition" element={<ModulePage />} />
          <Route path="procurement/order" element={<ModulePage />} />
          <Route path="inventory/dashboard" element={<ModulePage />} />
          <Route path="inventory/assign/new" element={<ModulePage />} />
          <Route path="inventory/config" element={<ModulePage />} />
          <Route path="inventory/assign/list" element={<ModulePage />} />
          <Route path="inventory/outward/new" element={<ModulePage />} />
          <Route path="inventory/outward/list" element={<ModulePage />} />
          <Route path="inventory/outward/history" element={<ModulePage />} />
          <Route path="inventory/stock" element={<ModulePage />} />
          <Route path="inventory/handover" element={<ModulePage />} />
          <Route path="inventory/takeover" element={<ModulePage />} />
          <Route path="inventory/approval" element={<ModulePage />} />
          <Route path="inventory/keys" element={<ModulePage />} />
          <Route path="inventory/key-log" element={<ModulePage />} />

          {/* ── Insights & CRM ──────────────────────────────────── */}
          <Route path="crm/quotation/new" element={<ModulePage />} />
          <Route path="crm/quotation/all" element={<ModulePage />} />
          <Route path="crm/lead" element={<ModulePage />} />
          <Route path="analytics/billing" element={<ModulePage />} />
          <Route path="analytics/profit" element={<ModulePage />} />
          <Route path="analytics/profit-v2" element={<ModulePage />} />
          <Route path="analytics/attendance" element={<ModulePage />} />
          <Route path="analytics/employee" element={<AnalyticsPage />} />
          <Route path="analytics/payroll" element={<ModulePage />} />
          <Route path="analytics/site" element={<ModulePage />} />
          <Route path="analytics/deployment" element={<ModulePage />} />

          {/* ── Settings ────────────────────────────────────────── */}
          <Route path="settings/company" element={<SettingsPage />} />
          <Route path="settings/leave" element={<SettingsPage />} />
          <Route path="settings/billing" element={<SettingsPage />} />
          <Route path="settings/payroll" element={<SettingsPage />} />
          <Route path="settings/app" element={<SettingsPage />} />
          <Route path="settings/project" element={<SettingsPage />} />
          <Route path="settings/master" element={<SettingsPage />} />
          <Route path="settings/templates" element={<SettingsPage />} />
          <Route path="settings/operation" element={<SettingsPage />} />
          <Route path="settings/modules" element={<SettingsPage />} />
          <Route path="settings/permissions" element={<SettingsPage />} />
          <Route path="settings/import" element={<SettingsPage />} />
          <Route path="settings/notifications" element={<SettingsPage />} />
          <Route path="settings/log" element={<SettingsPage />} />
          <Route path="settings/ojt" element={<SettingsPage />} />
          <Route path="settings/reports" element={<SettingsPage />} />
          <Route path="settings/company-config" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
