import { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Palette, Check, RotateCcw, Pipette } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  THEMES,
  DEFAULT_THEME_ID,
  CUSTOM_THEME_ID,
  loadSavedThemeId,
  saveThemeId,
  clearSavedTheme,
  applyTheme,
  saveCustomTheme,
  loadCustomTheme,
  isLightColor,
  type Theme,
} from '@/lib/themes';

// ─── ThemePicker ─────────────────────────────────────────────────────────────

export function ThemePicker() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_THEME_ID);
  const [open, setOpen]         = useState(false);
  const [tab, setTab]           = useState<'presets' | 'custom'>('presets');

  // Custom colour state
  const [customPrimary, setCustomPrimary] = useState('#2563eb');
  const [customSidebar, setCustomSidebar] = useState('#0d1b2e');
  const [customCanvas,  setCustomCanvas]  = useState('#f0f4f8');

  useEffect(() => {
    const id = loadSavedThemeId();
    setActiveId(id);
    if (id === CUSTOM_THEME_ID) {
      const saved = loadCustomTheme();
      if (saved) {
        setCustomPrimary(saved.primary);
        setCustomSidebar(saved.sidebar);
        setCustomCanvas(saved.canvas);
      }
    }
  }, []);

  function select(id: string) {
    const theme = THEMES.find(t => t.id === id)!;
    applyTheme(theme);
    saveThemeId(id);
    setActiveId(id);
    setOpen(false);
  }

  function applyCustom() {
    const light  = isLightColor(customSidebar);
    const border = light
      ? adjustBrightness(customCanvas, -12)
      : adjustBrightness(customSidebar, +20);

    const theme: Theme = {
      id:       CUSTOM_THEME_ID,
      name:     'Custom',
      sidebar:  customSidebar,
      primary:  customPrimary,
      secondary: adjustBrightness(customPrimary, +40),
      canvas:   customCanvas,
      border,
      sidebarText: light ? '#1e293b' : undefined,
    };
    applyTheme(theme);
    saveCustomTheme(theme);
    saveThemeId(CUSTOM_THEME_ID);
    setActiveId(CUSTOM_THEME_ID);
    setOpen(false);
  }

  function reset(e: React.MouseEvent) {
    e.stopPropagation();
    const def = THEMES.find(t => t.id === DEFAULT_THEME_ID)!;
    applyTheme(def);
    clearSavedTheme();
    setActiveId(DEFAULT_THEME_ID);
  }

  const isDefault = activeId === DEFAULT_THEME_ID;
  const activeTheme =
    activeId === CUSTOM_THEME_ID
      ? (loadCustomTheme() ?? THEMES[0])
      : (THEMES.find(t => t.id === activeId) ?? THEMES[0]);

  const darkThemes  = THEMES.slice(0, 10);
  const lightThemes = THEMES.slice(10);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          title="Change colour theme"
          className={cn(
            'relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150',
            open ? 'bg-gray-100' : 'hover:bg-gray-100'
          )}
        >
          <Palette className="w-[18px] h-[18px] text-gray-500" />
          <span
            className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white"
            style={{ backgroundColor: activeTheme.primary }}
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={10}
          align="end"
          className="z-[300] animate-in fade-in-0 zoom-in-95 duration-150"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            borderRadius: 16,
            border: '1px solid #e5e7eb',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            width: 320,
            padding: 16,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-[13px] font-semibold text-gray-800">Colour Theme</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {activeTheme.name}{isDefault && ' · Default'}
              </p>
            </div>
            {!isDefault && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-150"
              >
                <RotateCcw size={12} /> Reset
              </button>
            )}
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 mb-3 bg-gray-100 rounded-lg p-0.5">
            {(['presets', 'custom'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  'flex-1 text-[11.5px] font-medium py-1.5 rounded-md transition-all',
                  tab === t ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {t === 'presets' ? 'Presets' : 'Custom'}
              </button>
            ))}
          </div>

          {tab === 'presets' ? (
            <>
              {/* Dark themes */}
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 px-0.5">Dark</p>
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {darkThemes.map(theme => <ThemeSwatch key={theme.id} theme={theme} isActive={activeId === theme.id} onSelect={select} />)}
              </div>

              {/* Light themes */}
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 px-0.5">Light</p>
              <div className="grid grid-cols-2 gap-1.5">
                {lightThemes.map(theme => <ThemeSwatch key={theme.id} theme={theme} isActive={activeId === theme.id} onSelect={select} />)}
              </div>
            </>
          ) : (
            /* Custom colour builder */
            <div className="space-y-3">
              <ColorRow label="Primary / Accent" value={customPrimary} onChange={setCustomPrimary} />
              <ColorRow label="Sidebar"           value={customSidebar} onChange={setCustomSidebar} />
              <ColorRow label="Canvas / Background" value={customCanvas} onChange={setCustomCanvas} />

              {/* Live preview swatch */}
              <div className="flex items-center gap-3 pt-1">
                <div
                  className="rounded-xl overflow-hidden flex-shrink-0"
                  style={{ width: 52, height: 36, boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
                >
                  <div className="flex h-full">
                    <div className="w-1/2 h-full" style={{ backgroundColor: customSidebar }} />
                    <div className="w-1/2 h-full" style={{ backgroundColor: customPrimary }} />
                  </div>
                </div>
                <div className="flex-1 text-[11px] text-gray-500 leading-tight">
                  Live preview of sidebar + accent colour.
                </div>
              </div>

              <button
                onClick={applyCustom}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[12.5px] font-semibold text-white transition-all"
                style={{ background: customPrimary }}
              >
                <Pipette size={13} />
                Apply Custom Theme
              </button>

              {activeId === CUSTOM_THEME_ID && (
                <p className="text-[10.5px] text-center text-emerald-600 font-medium">Custom theme is active</p>
              )}
            </div>
          )}

          <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed">
            Theme is saved in your browser.{' '}
            {!isDefault && (
              <button onClick={reset} className="underline hover:text-gray-600 transition-colors">
                Delete saved preference
              </button>
            )}
          </p>

          <Popover.Arrow className="drop-shadow-sm" style={{ fill: 'white' }} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// ─── ThemeSwatch ─────────────────────────────────────────────────────────────

function ThemeSwatch({
  theme,
  isActive,
  onSelect,
}: {
  theme: Theme;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(theme.id)}
      className={cn(
        'group relative flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all duration-150',
        isActive ? 'bg-gray-100 ring-1 ring-inset ring-gray-300' : 'hover:bg-gray-50'
      )}
    >
      <div
        className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }}
      >
        <div className="flex h-full">
          <div className="w-1/2 h-full" style={{ backgroundColor: theme.sidebar }} />
          <div className="w-1/2 h-full" style={{ backgroundColor: theme.primary }} />
        </div>
      </div>
      <span className="flex-1 text-[11.5px] font-medium text-gray-700 leading-tight truncate">
        {theme.name}
      </span>
      {isActive && <Check size={12} className="flex-shrink-0" style={{ color: theme.primary }} />}
    </button>
  );
}

// ─── ColorRow ─────────────────────────────────────────────────────────────────

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <label className="text-[12px] text-gray-600 flex-1 leading-none">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-7 h-7 rounded-lg cursor-pointer border border-gray-200"
          style={{ padding: 2 }}
        />
        <input
          type="text"
          value={value}
          onChange={e => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
          }}
          className="w-20 text-[11px] font-mono text-gray-700 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gray-400"
        />
      </div>
    </div>
  );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function adjustBrightness(hex: string, amount: number): string {
  const c = hex.replace('#', '');
  const r = Math.min(255, Math.max(0, parseInt(c.substring(0, 2), 16) + amount));
  const g = Math.min(255, Math.max(0, parseInt(c.substring(2, 4), 16) + amount));
  const b = Math.min(255, Math.max(0, parseInt(c.substring(4, 6), 16) + amount));
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
