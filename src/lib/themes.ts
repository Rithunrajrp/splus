export interface Theme {
  id: string;
  name: string;
  /** Sidebar background */
  sidebar: string;
  /** Primary brand / accent colour */
  primary: string;
  /** Secondary brand / accent colour */
  secondary: string;
  /** Main content canvas background */
  canvas: string;
  /** Subtle border colour */
  border: string;
  /** Text colour on the sidebar (defaults to white for dark sidebars) */
  sidebarText?: string;
}

// ─── Dark Themes ─────────────────────────────────────────────────────────────

export const THEMES: Theme[] = [
  {
    id: 'navy',
    name: 'Navy Blue',
    sidebar: '#0d1b2e',
    primary: '#2563eb',
    secondary: '#60a5fa',
    canvas: '#f0f4f8',
    border: '#e1e7ef',
  },
  {
    id: 'forest',
    name: 'Forest',
    sidebar: '#0f2318',
    primary: '#16a34a',
    secondary: '#4ade80',
    canvas: '#f0fdf4',
    border: '#d1fae5',
  },
  {
    id: 'violet',
    name: 'Violet',
    sidebar: '#1e1b4b',
    primary: '#7c3aed',
    secondary: '#a78bfa',
    canvas: '#faf5ff',
    border: '#ede9fe',
  },
  {
    id: 'carbon',
    name: 'Carbon',
    sidebar: '#1c2127',
    primary: '#6366f1',
    secondary: '#818cf8',
    canvas: '#f8fafc',
    border: '#e2e8f0',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    sidebar: '#072035',
    primary: '#0ea5e9',
    secondary: '#38bdf8',
    canvas: '#f0f9ff',
    border: '#e0f2fe',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    sidebar: '#1c0808',
    primary: '#dc2626',
    secondary: '#f87171',
    canvas: '#fff5f5',
    border: '#fee2e2',
  },
  {
    id: 'amber',
    name: 'Amber',
    sidebar: '#1c1207',
    primary: '#d97706',
    secondary: '#fbbf24',
    canvas: '#fffbeb',
    border: '#fef3c7',
  },
  {
    id: 'teal',
    name: 'Teal',
    sidebar: '#042f2e',
    primary: '#0d9488',
    secondary: '#2dd4bf',
    canvas: '#f0fdfa',
    border: '#ccfbf1',
  },
  {
    id: 'rose',
    name: 'Rose',
    sidebar: '#1a0c0f',
    primary: '#e11d48',
    secondary: '#fb7185',
    canvas: '#fff1f2',
    border: '#ffe4e6',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    sidebar: '#0f172a',
    primary: '#8b5cf6',
    secondary: '#c4b5fd',
    canvas: '#f8fafc',
    border: '#e2e8f0',
  },

  // ─── Light Themes ───────────────────────────────────────────────────────────

  {
    id: 'linen',
    name: 'Linen',
    sidebar: '#ede8e0',
    primary: '#b45309',
    secondary: '#f59e0b',
    canvas: '#faf7f4',
    border: '#e5ddd5',
    sidebarText: '#1e293b',
  },
  {
    id: 'glacier',
    name: 'Glacier',
    sidebar: '#dde8f0',
    primary: '#0369a1',
    secondary: '#38bdf8',
    canvas: '#f0f6fa',
    border: '#bcd9ea',
    sidebarText: '#1e293b',
  },
  {
    id: 'mint',
    name: 'Mint',
    sidebar: '#ddf0e6',
    primary: '#15803d',
    secondary: '#4ade80',
    canvas: '#f0faf3',
    border: '#bbdec9',
    sidebarText: '#1e293b',
  },
  {
    id: 'blush',
    name: 'Blush',
    sidebar: '#f0dde7',
    primary: '#be185d',
    secondary: '#f472b6',
    canvas: '#fdf4f7',
    border: '#e8bbcf',
    sidebarText: '#1e293b',
  },
  {
    id: 'pearl',
    name: 'Pearl',
    sidebar: '#eaeaf2',
    primary: '#4f46e5',
    secondary: '#818cf8',
    canvas: '#f8f8ff',
    border: '#d5d5ec',
    sidebarText: '#1e293b',
  },
];

export const DEFAULT_THEME_ID = 'navy';
export const CUSTOM_THEME_ID  = 'custom';

// ─── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY        = 'splus_theme';
const CUSTOM_STORAGE_KEY = 'splus_custom_theme';

export function loadSavedThemeId(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME_ID;
  } catch {
    return DEFAULT_THEME_ID;
  }
}

export function saveThemeId(id: string) {
  localStorage.setItem(STORAGE_KEY, id);
}

export function clearSavedTheme() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveCustomTheme(theme: Theme) {
  localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(theme));
}

export function loadCustomTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(CUSTOM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Returns true if the hex colour is perceived as light. */
export function isLightColor(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  // Perceived brightness (ITU-R BT.601)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

// ─── Apply ─────────────────────────────────────────────────────────────────────

/** Writes the theme's colours into CSS custom properties on :root. */
export function applyTheme(theme: Theme) {
  const r = document.documentElement;
  r.style.setProperty('--primary-brand',      theme.primary);
  r.style.setProperty('--secondary-brand',    theme.secondary);
  r.style.setProperty('--sidebar-bg',         theme.sidebar);
  r.style.setProperty('--app-canvas',         theme.canvas);
  r.style.setProperty('--border-subtle',      theme.border);

  const light = isLightColor(theme.sidebar);
  const sidebarText = theme.sidebarText ?? (light ? '#1e293b' : 'rgba(255,255,255,0.92)');
  const sidebarTextMuted = light ? 'rgba(30,41,59,0.52)' : 'rgba(255,255,255,0.44)';
  const sidebarBorder    = light ? 'rgba(0,0,0,0.08)'    : 'rgba(255,255,255,0.07)';
  const sidebarHover     = light ? 'rgba(0,0,0,0.06)'    : 'rgba(255,255,255,0.08)';
  const sidebarActive    = light ? 'rgba(0,0,0,0.10)'    : 'rgba(255,255,255,0.11)';
  const dockBg           = light
    ? 'rgba(240,240,250,0.92)'
    : 'rgba(10,20,36,0.85)';
  const dockIconColor    = light ? '#111827' : '#ffffff';

  r.style.setProperty('--sidebar-text',       sidebarText);
  r.style.setProperty('--sidebar-text-muted', sidebarTextMuted);
  r.style.setProperty('--sidebar-border',     sidebarBorder);
  r.style.setProperty('--sidebar-hover',      sidebarHover);
  r.style.setProperty('--sidebar-active',     sidebarActive);
  r.style.setProperty('--dock-bg',            dockBg);
  r.style.setProperty('--dock-icon-color',    dockIconColor);
}

/** Convenience: load the saved theme (or default) and apply it immediately. */
export function bootTheme() {
  const id = loadSavedThemeId();
  if (id === CUSTOM_THEME_ID) {
    const custom = loadCustomTheme();
    if (custom) { applyTheme(custom); return; }
  }
  const theme = THEMES.find(t => t.id === id) ?? THEMES[0];
  applyTheme(theme);
}
