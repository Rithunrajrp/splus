# Splus ERP - React Migration

Modern, enterprise-grade workforce and security management platform built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This is a complete rewrite of the Splus ERP system from vanilla JavaScript to React with modern best practices, enterprise-grade UI/UX, and a scalable architecture.

### Migration Stats

- **Original Codebase**: 272 pages across 39 modules (Vanilla JS)
- **Target**: Modern React + TypeScript application
- **Total Modules**: 39
- **Total Pages to Migrate**: 272
- **Current Status**: Foundation Complete ✅

## 🏗️ Architecture

### Technology Stack

- ⚡ **Vite** - Lightning-fast build tool
- ⚛️ **React 18** - UI library
- 📘 **TypeScript** - Type safety
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Reusable component library
- 📊 **TanStack Table** - Powerful data tables
- 🔄 **TanStack Query** - Server state management
- 🎯 **React Hook Form + Zod** - Form handling and validation
- 🗺️ **React Router** - Client-side routing
- 🐻 **Zustand** - State management

### Folder Structure

```
react-ui/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components (Button, Card, Input, Badge, etc.)
│   ├── layouts/
│   │   ├── MainLayout.tsx    # Main app layout
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   └── Topbar.tsx        # Top navigation bar
│   ├── modules/          # Feature modules (organized by domain)
│   │   ├── home/
│   │   ├── employee/
│   │   ├── attendance/
│   │   ├── accounting/
│   │   └── ...
│   ├── lib/              # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Global state management
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Root component
├── public/               # Static assets
└── index.html           # Entry HTML
```

## 🎨 Design System

### Enterprise Blue + White Theme

- **Primary Color**: Blue (#2563eb, #1d4ed8, #1e40af)
- **Background**: White (#ffffff) and Slate-50 (#f8fafc)
- **Typography**: Inter, Open Sans system fonts
- **Components**: Modern, clean, and professional

### Custom Utility Classes

```css
.enterprise-card         /* White card with border and shadow */
.enterprise-sidebar      /* Blue-900 sidebar */
.enterprise-topbar       /* White topbar with border */
.enterprise-badge-*      /* Status badges (primary, success, warning, danger) */
.custom-scrollbar        /* Custom styled scrollbar */
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd react-ui
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

Build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📋 Migration Process

### Migration Workspace

All migration tracking is done in the `migrate/` folder:

- **`todo.json`** - Tracks all 272 pages and their migration status
- **`module-map.json`** - Maps vanilla files to React components
- **`migration-log.md`** - Detailed migration history and logs

### Migration Workflow

1. **Pick a Module** - Choose from the 39 modules in `migrate/todo.json`
2. **Mark In Progress** - Update status to `in-progress`
3. **Analyze Vanilla Code** - Review HTML and JS files in `ui/src/`
4. **Build React Component** - Create modern React component in `react-ui/src/modules/`
5. **Improve UX** - Upgrade with modern UI patterns
6. **Test** - Ensure feature parity
7. **Mark Complete** - Update `todo.json` and `migration-log.md`

### Module Priority

**High Priority:**
- Home/Dashboard
- Employee Management
- Attendance
- Site Management

**Medium Priority:**
- Accounting
- Payroll
- Billing
- Leave Management

**Low Priority:**
- Settings
- Reports
- Analytics

## 📦 Available Modules (39 Total)

1. **accounting** (27 pages) - Financial management
2. **analytic** (5 pages) - Data analytics
3. **article** (5 pages) - Knowledge base
4. **attendance** (5 pages) - Time tracking
5. **billing** (4 pages) - Invoicing
6. **client** (21 pages) - Client portal
7. **crm** (1 page) - Customer relationship
8. **dataAnalytics** (1 page) - Advanced analytics
9. **defect** (2 pages) - Defect tracking
10. **deliveryOrder** (2 pages) - Delivery management
11. **eform** (11 pages) - Digital forms
12. **eLearning** (6 pages) - Training platform
13. **employee** (15 pages) - HR management
14. **exercise** (2 pages) - Drills and exercises
15. **expense** (6 pages) - Expense tracking
16. **home** (9 pages) - Dashboard and home
17. **icc** (14 pages) - Command center
18. **ifmAnalytic** (1 page) - Facility analytics
19. **ifmFacility** (4 pages) - Facility management
20. **ifmMDM** (3 pages) - Master data
21. **ifmRealtimeAlert** (1 page) - Real-time alerts
22. **incident** (2 pages) - Incident management
23. **inventory** (12 pages) - Stock management
24. **invoice** (6 pages) - Invoice management
25. **key** (2 pages) - Key management
26. **leave** (10 pages) - Leave management
27. **operation** (1 page) - Operations
28. **patrol** (5 pages) - Patrol management
29. **payroll** (11 pages) - Payroll processing
30. **project** (15 pages) - Project management
31. **purchaseOrder** (2 pages) - Purchase orders
32. **quotation** (2 pages) - Quotations
33. **roster** (6 pages) - Shift scheduling
34. **setting** (24 pages) - System settings
35. **site** (13 pages) - Site management
36. **support** (5 pages) - Support tickets
37. **timer** (2 pages) - Timer management
38. **training** (4 pages) - Training programs
39. **visitor** (5 pages) - Visitor management

## 🎯 UI/UX Improvements

### Modern Patterns Implemented

✅ **Sidebar Navigation** - Collapsible, hierarchical menu
✅ **Card-based Layouts** - Clean, organized content
✅ **Status Badges** - Color-coded visual indicators
✅ **Loading States** - Skeleton loaders
✅ **Empty States** - Helpful placeholder content
✅ **Responsive Design** - Mobile-first approach
✅ **Toast Notifications** - Non-intrusive feedback
✅ **Modern Data Tables** - Sortable, filterable, paginated
✅ **Form Validation** - Real-time feedback
✅ **Modal Dialogs** - Focused user actions

### Design Principles

- **Clarity** - Clear hierarchy and information architecture
- **Consistency** - Unified design language across all modules
- **Efficiency** - Optimized workflows and minimal clicks
- **Accessibility** - WCAG 2.1 AA compliance
- **Performance** - Fast load times and smooth interactions

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run build (validates all TypeScript)
npm run build
```

## 📝 Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Functional components with hooks
- **State Management**: Zustand for global, React Hook Form for forms
- **API Calls**: TanStack Query for server state

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=https://api.splus.one
VITE_REPORT_URL=https://report.splus.one
VITE_APP_NAME=Splus ERP
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Table](https://tanstack.com/table/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 🤝 Contributing

1. Pick a module from `migrate/todo.json`
2. Create a feature branch: `git checkout -b feature/module-name`
3. Implement the module following the architecture
4. Update migration tracking files
5. Submit a pull request

## 📄 License

Proprietary - Splus ERP © 2026

## 🙋 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Claude Code**
