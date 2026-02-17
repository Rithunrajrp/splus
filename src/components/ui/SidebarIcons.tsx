import type React from 'react';

/**
 * SidebarIcons – Bold, semi-filled duotone SVG icon system.
 *
 * Three tiers:
 *  1. Cluster icons  – 6 large duotone glyphs (one per workspace group)
 *  2. FolderIcon     – semi-filled folder used on every section row
 *  3. ItemIcon       – 11-px semantic mini-glyph inferred from item label
 *
 * All shapes use `currentColor` so the parent's CSS `color` drives the fill.
 * Item icon colours are managed via `getItemColor()`, which returns a fixed
 * semantic hex — intentionally theme-independent (colour = meaning, not state).
 */

// ─── Shared prop type ────────────────────────────────────────────────────────

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ═══════════════════════════════════════════════════════════════════════════
// 1. CLUSTER-LEVEL ICONS  (large, duotone, semi-filled)
// ═══════════════════════════════════════════════════════════════════════════

/** Core – 2 × 2 modular tile grid */
export function CoreIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <rect x="2"  y="2"  width="7" height="7" rx="2" fill="currentColor" fillOpacity="1" />
      <rect x="11" y="2"  width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.55" />
      <rect x="2"  y="11" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.55" />
      <rect x="11" y="11" width="7" height="7" rx="2" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

/** People & HR – Two person silhouettes */
export function PeopleIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <circle cx="13.5" cy="7"   r="2.5" fill="currentColor" fillOpacity="0.55" />
      <path d="M8 18c0-2.76 2.24-5 5.5-5s5.5 2.24 5.5 5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.65" />
      <circle cx="7.5"  cy="7.5" r="3"   fill="currentColor" fillOpacity="1" />
      <path d="M1 18c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Operations – Three stacked diamond layers */
export function OperationsIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <path d="M10 15.5L2 11L10 6.5L18 11L10 15.5Z"
        fill="currentColor" fillOpacity="0.45" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2 8.5L10 4L18 8.5L10 13L2 8.5Z"
        fill="currentColor" fillOpacity="0.75" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2 12L10 16.5L18 12"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" />
    </svg>
  );
}

/** Finance & Resources – Ascending bar chart with trend arrow */
export function FinanceIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <rect x="2"   y="13" width="3.5" height="5.5" rx="1" fill="currentColor" fillOpacity="0.5" />
      <rect x="7.5" y="9"  width="3.5" height="9.5" rx="1" fill="currentColor" fillOpacity="0.72" />
      <rect x="13"  y="5"  width="3.5" height="13.5" rx="1" fill="currentColor" fillOpacity="1" />
      <path d="M3.5 11.5L8 8L13 4L16.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 2L16.5 2L16.5 5"    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Insights & CRM – Orbital target rings with center dot */
export function InsightsIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeOpacity="0.55" />
      <circle cx="10" cy="10" r="5"   stroke="currentColor" strokeWidth="1.6" fill="currentColor" fillOpacity="0.35" />
      <path d="M10 1.5C14.4 1.5 17.5 5.1 17.5 10"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" strokeOpacity="0.9" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" fillOpacity="1" />
    </svg>
  );
}

/** Employees – Person with ID badge */
export function EmployeesIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <circle cx="10" cy="6.5" r="3.5" fill="currentColor" fillOpacity="0.9" />
      <path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      {/* ID badge */}
      <rect x="7.5" y="3.5" width="5" height="3" rx="0.8"
        fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

/** Billing & Accounting – Receipt with ledger lines */
export function BillingAccIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      {/* Receipt body */}
      <path d="M4 2.5H16V17L14 15.5L12 17L10 15.5L8 17L6 15.5L4 17V2.5Z"
        fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Lines */}
      <line x1="7" y1="7"  x2="13" y2="7"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.85" />
      <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="7" y1="13" x2="10" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

/** Home – House silhouette */
export function HomeIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <path d="M3 9.5L10 3L17 9.5V17H13V13H7V17H3V9.5Z"
        fill="currentColor" fillOpacity="0.55" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7 17V13H13V17" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" fillOpacity="1" />
      <path d="M10 3L17 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
    </svg>
  );
}

/** ICC – Radio tower / broadcast */
export function ICCIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <line x1="10" y1="8" x2="10" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6.5 11.5C6.5 9.57 8.07 8 10 8S13.5 9.57 13.5 11.5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.8" />
      <path d="M3.5 8.5C3.5 5.46 6.46 3 10 3S16.5 5.46 16.5 8.5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" strokeOpacity="0.45" />
      <circle cx="10" cy="8" r="1.8" fill="currentColor" fillOpacity="1" />
    </svg>
  );
}

/** Attendance – Clock face */
export function AttendanceIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
      <line x1="10" y1="10" x2="10" y2="5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="10" x2="13.5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.8" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" fillOpacity="1" />
    </svg>
  );
}

/** Projects – Clipboard with checkmark */
export function ProjectsIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <rect x="3" y="4" width="14" height="14" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 3.5H13C13 2.67 12.33 2 11.5 2H8.5C7.67 2 7 2.67 7 3.5Z"
        fill="currentColor" fillOpacity="1" />
      <line x1="7" y1="9"  x2="13" y2="9"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
      <line x1="7" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M7 15L8.5 16.5L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Inventory – Box/package */
export function InventoryIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <path d="M2 7L10 3L18 7V14L10 18L2 14V7Z"
        fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 3L10 18" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.5" />
      <path d="M2 7L10 11L18 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeOpacity="0.85" />
      <line x1="6" y1="5" x2="14" y2="9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.55" />
    </svg>
  );
}

/** System – Three-slider equaliser */
export function SystemIcon({ size = 18, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden>
      <line x1="2" y1="5"  x2="18" y2="5"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.75" />
      <line x1="2" y1="15" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.55" />
      <circle cx="7"  cy="5"  r="2.5" fill="currentColor" fillOpacity="1" />
      <circle cx="13" cy="10" r="2.5" fill="currentColor" fillOpacity="0.8" />
      <circle cx="7"  cy="15" r="2.5" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. FOLDER ICON  (used on every section row)
// ═══════════════════════════════════════════════════════════════════════════

/** Semi-filled folder — duotone tab + body */
export function FolderIcon({ size = 14, className = '', style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 17" fill="none" className={className} style={style} aria-hidden>
      {/* Whole folder outline (tab + body) */}
      <path
        d="M0.5 4C0.5 3.17 1.17 2.5 2 2.5H8.5L10.5 4.5H18C18.83 4.5 19.5 5.17 19.5 6V14C19.5 14.83 18.83 15.5 18 15.5H2C1.17 15.5 0.5 14.83 0.5 14V4Z"
        fill="currentColor" fillOpacity="0.25"
      />
      {/* Body overlay (gives the lower two-thirds deeper fill) */}
      <path
        d="M0.5 7H19.5V14C19.5 14.83 18.83 15.5 18 15.5H2C1.17 15.5 0.5 14.83 0.5 14V7Z"
        fill="currentColor" fillOpacity="0.45"
      />
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. ITEM-LEVEL MINI ICONS  (11 × 11, semantic glyphs)
// ═══════════════════════════════════════════════════════════════════════════

function GridMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <rect x="1"   y="1"   width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.75" />
      <rect x="6"   y="1"   width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.38" />
      <rect x="1"   y="6"   width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.38" />
      <rect x="6"   y="6"   width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

function ListMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <line x1="2" y1="3"    x2="9"   y2="3"   stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="2" y1="5.5"  x2="9"   y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.65" />
      <line x1="2" y1="8"    x2="6.5" y2="8"   stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

function PlusMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5.5" cy="5.5" r="4.5" fill="currentColor" fillOpacity="0.2" />
      <line x1="5.5" y1="2.5" x2="5.5" y2="8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="2.5" y1="5.5" x2="8.5" y2="5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ChartMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <rect x="1"   y="7"   width="2.2" height="3.5" rx="0.6" fill="currentColor" fillOpacity="0.4" />
      <rect x="4.4" y="5"   width="2.2" height="5.5" rx="0.6" fill="currentColor" fillOpacity="0.62" />
      <rect x="7.8" y="2.5" width="2.2" height="8"   rx="0.6" fill="currentColor" fillOpacity="0.85" />
    </svg>
  );
}

function ConfigMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <line x1="1" y1="3.5" x2="10" y2="3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="4"   cy="3.5" r="1.6" fill="currentColor" fillOpacity="0.75" />
      <line x1="1" y1="7.5" x2="10" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="7.5" cy="7.5" r="1.6" fill="currentColor" fillOpacity="0.75" />
    </svg>
  );
}

function ApprovalMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5.5" cy="5.5" r="4.5" fill="currentColor" fillOpacity="0.2" />
      <path d="M3.2 5.5L4.8 7.2L7.8 3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FormMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <rect x="2" y="1" width="7" height="9" rx="1.2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <line x1="3.8" y1="4"   x2="7.2" y2="4"   stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="3.8" y1="5.8" x2="7.2" y2="5.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.65" />
      <line x1="3.8" y1="7.5" x2="6"   y2="7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.4" />
    </svg>
  );
}

function ShieldMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <path d="M5.5 1L9.5 2.8V5.8C9.5 8 7.7 9.8 5.5 10.5C3.3 9.8 1.5 8 1.5 5.8V2.8L5.5 1Z"
        fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function PersonMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="5.5" cy="4" r="2.5" fill="currentColor" fillOpacity="0.55" />
      <path d="M1.5 10.5C1.5 8.3 3.3 6.5 5.5 6.5S9.5 8.3 9.5 10.5"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function CalendarMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <rect x="1"   y="2.5" width="9"   height="8"   rx="1.2" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
      <line x1="1"   y1="5"   x2="10"  y2="5"   stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="3.5" y1="1"   x2="3.5" y2="4"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="7.5" y1="1"   x2="7.5" y2="4"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function KeyMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
      <circle cx="3.5" cy="4.5" r="2.5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M5.5 6L9.5 10M8 8.5L9.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DotMini() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden>
      <circle cx="3" cy="3" r="2" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
}

// ─── Icon type inference ─────────────────────────────────────────────────────

type MiniIconType =
  | 'grid' | 'list' | 'plus' | 'chart' | 'config'
  | 'approval' | 'form' | 'shield' | 'person' | 'calendar' | 'key' | 'dot';

function inferItemIconType(label: string): MiniIconType {
  const l = label.toLowerCase();
  if (l === 'dashboard' || l.endsWith(' dashboard') || l === 'data analytics') return 'grid';
  if (l.startsWith('new ') || l.startsWith('create ') || l === 'lead') return 'plus';
  if (l.includes('report') || l.includes('analytics') || l.includes('balance') ||
      l.includes('profit') || l.includes('ledger') || l.includes('trial') || l.includes('aging'))
    return 'chart';
  if (l.includes('config') || l.includes('settings') || l.includes('template') ||
      l.includes('master') || l.includes('module') || l.includes('import') || l.includes('permission'))
    return 'config';
  if (l.includes('approval') || l.includes('checklist')) return 'approval';
  if (l.includes('form') || l.includes('circular') || l.includes('handbook') ||
      l.includes('sop') || l.includes('letter') || l.includes('invoice') ||
      l.includes('quotation') || l.includes('journal') || l.includes('order') ||
      l.includes('note') || l.includes('requisition'))
    return 'form';
  if (l.includes('roster') || l.includes('schedule') || l.includes('duty') ||
      l.includes('e-learning') || l.includes('calendar'))
    return 'calendar';
  if (l.includes('employee') || l.includes('recruitment') || l.includes('applicat') ||
      l.includes('pre-employ'))
    return 'person';
  if (l.includes('patrol') || l.includes('incident') || l.includes('defect') ||
      l.includes('risk') || l.includes('exercise') || l.includes('kpi'))
    return 'shield';
  if (l.includes('key')) return 'key';
  if (l.startsWith('all ') || l.endsWith(' list') || l.includes('history') ||
      l.includes(' log') || l.includes('broadcast') || l.includes('monitoring'))
    return 'list';
  return 'dot';
}

// ─── Semantic colour per item (fixed, meaning-based, not state-based) ────────

/**
 * Returns a fixed semantic hex colour for a nav item's icon.
 * Colour signals MEANING (create = green, report = purple, etc.) not UI state.
 */
export function getItemColor(label: string, clusterId: string): string {
  const l = label.toLowerCase();

  // Universal semantic overrides
  if (l === 'dashboard' || l.endsWith(' dashboard') || l === 'data analytics')
    return '#818cf8'; // indigo-400 – overview / grid
  if (l.startsWith('new ') || l.startsWith('create ') || l === 'lead')
    return '#4ade80'; // green-400  – create
  if (l.includes('report') || l.includes('analytics') || l.includes('profit') ||
      l.includes('balance') || l.includes('ledger') || l.includes('trial') || l.includes('aging'))
    return '#c084fc'; // purple-400 – data insight
  if (l.includes('config') || l.includes('settings') || l.includes('module') ||
      l.includes('permission') || l.includes('template') || l.includes('master'))
    return '#94a3b8'; // slate-400  – system/config
  if (l.includes('approval') || l.includes('checklist'))
    return '#34d399'; // emerald-400 – validated
  if (l.includes('invoice') || l.includes('billing') || l.includes('pay ') ||
      l.includes('payment') || l.includes('payroll') || l.includes('loan') ||
      l.includes('cash') || l.includes('cheque'))
    return '#34d399'; // emerald-400 – money
  if (l.includes('form') || l.includes('journal') || l.includes('order') ||
      l.includes('quotation') || l.includes('note') || l.includes('document'))
    return '#60a5fa'; // blue-400   – document
  if (l.includes('patrol') || l.includes('incident') || l.includes('defect') ||
      l.includes('risk') || l.includes('exercise'))
    return '#f87171'; // red-400    – alert/safety
  if (l.includes('key'))
    return '#fbbf24'; // amber-400  – access
  if (l.startsWith('all ') || l.endsWith(' list') || l.includes('history') ||
      l.includes(' log'))
    return '#94a3b8'; // slate-400  – list/archive

  // Cluster-level fallbacks
  switch (clusterId) {
    case 'people':     return '#fb923c'; // orange-400
    case 'finance':    return '#34d399'; // emerald-400
    case 'operations': return '#f87171'; // red-400
    case 'insights':   return '#a78bfa'; // violet-400
    case 'system':     return '#94a3b8'; // slate-400
    default:           return '#93c5fd'; // blue-300
  }
}

// ─── Public ItemIcon component ───────────────────────────────────────────────

/** Renders the correct 11 × 11 mini-glyph for a nav item label. */
export function ItemIcon({ label }: { label: string }) {
  const type = inferItemIconType(label);
  switch (type) {
    case 'grid':     return <GridMini />;
    case 'list':     return <ListMini />;
    case 'plus':     return <PlusMini />;
    case 'chart':    return <ChartMini />;
    case 'config':   return <ConfigMini />;
    case 'approval': return <ApprovalMini />;
    case 'form':     return <FormMini />;
    case 'shield':   return <ShieldMini />;
    case 'person':   return <PersonMini />;
    case 'calendar': return <CalendarMini />;
    case 'key':      return <KeyMini />;
    default:         return <DotMini />;
  }
}
