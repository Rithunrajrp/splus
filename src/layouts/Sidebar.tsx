import React, { useState, useEffect } from 'react';
import { Link, useLocation }          from 'react-router-dom';
import { cn }                         from '@/lib/utils';
import { CLUSTERS, findCluster, findSection } from '@/lib/navigation';
import {
  CoreIcon, PeopleIcon, OperationsIcon,
  FinanceIcon, InsightsIcon, SystemIcon,
  FolderIcon, ItemIcon, getItemColor,
} from '@/components/ui/SidebarIcons';

// ─── Cluster icon map ─────────────────────────────────────────────────────────

type ClusterIconCmp = React.ComponentType<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

const CLUSTER_ICONS: Record<string, ClusterIconCmp> = {
  core:       CoreIcon,
  people:     PeopleIcon,
  operations: OperationsIcon,
  finance:    FinanceIcon,
  insights:   InsightsIcon,
  system:     SystemIcon,
};

// ─── Recently-used hook ───────────────────────────────────────────────────────

const RECENT_KEY = 'splus_recent_nav';
const MAX_RECENT = 8;

function useRecentlyUsed(path: string): string[] {
  const [recent, setRecent] = useState<string[]>(() => {
    try   { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]') as string[]; }
    catch { return []; }
  });

  useEffect(() => {
    if (!path || path === '/') return;
    setRecent(prev => {
      const next = [path, ...prev.filter(p => p !== path)].slice(0, MAX_RECENT);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* noop */ }
      return next;
    });
  }, [path]);

  return recent;
}

// ─── Chevron ─────────────────────────────────────────────────────────────────

function Chevron({ open, size = 10 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 10 10" fill="none"
      aria-hidden
      style={{
        flexShrink:  0,
        opacity:     0.45,
        transition:  'transform 0.22s cubic-bezier(0.16,1,0.3,1)',
        transform:   open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar() {
  const location     = useLocation();
  const activeCl     = findCluster(location.pathname);
  const activeSec    = findSection(location.pathname);
  const recentlyUsed = useRecentlyUsed(location.pathname);

  /* Clusters default: only the active cluster starts open */
  const [openClusters, setOpenClusters] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CLUSTERS.map(c => [c.id, c.id === activeCl?.id]))
  );

  /* Sections default: only the active section starts open */
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      CLUSTERS.flatMap(c => c.sections.map(s => [s.id, s.id === activeSec?.section.id]))
    )
  );

  /* Auto-expand on route change */
  useEffect(() => {
    if (activeCl)  setOpenClusters(prev => ({ ...prev, [activeCl.id]: true }));
    if (activeSec) setOpenSections(prev => ({ ...prev, [activeSec.section.id]: true }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCl?.id, activeSec?.section.id]);

  const toggleCluster = (id: string) =>
    setOpenClusters(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (id: string) =>
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  // ─── render ──────────────────────────────────────────────────────────────

  return (
    <aside
      className="flex flex-col flex-shrink-0 h-full overflow-hidden"
      style={{
        width:           '260px',
        backgroundColor: 'var(--sidebar-bg)',
        borderRight:     '1px solid rgba(255,255,255,0.07)',
        transition:      'background-color 0.3s ease',
      }}
    >

      {/* ════════════════════════════════════════════════════════
          BRAND MARK
      ════════════════════════════════════════════════════════ */}
      <div
        className="h-[58px] flex items-center gap-3 px-4 flex-shrink-0"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background:   'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
        }}
      >
        {/* Logo pill */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            background:     'rgba(255,255,255,0.1)',
            border:         '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <img
            src="/logo.png" alt="SPlus"
            className="w-[22px] h-[22px] object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <div className="min-w-0">
          <p className="text-[13px] font-bold leading-none"
            style={{ color: 'rgba(255,255,255,0.92)' }}>
            SPlus
          </p>
          <p className="text-[9px] mt-[5px] leading-none font-semibold uppercase tracking-[0.18em]"
            style={{ color: 'rgba(255,255,255,0.32)' }}>
            Enterprise
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          NAVIGATION
      ════════════════════════════════════════════════════════ */}
      <nav
        className="flex-1 overflow-y-auto custom-scrollbar"
        style={{ padding: '10px 0 16px' }}
        role="navigation"
        aria-label="Main navigation"
      >
        {CLUSTERS.map((cluster, clIdx) => {
          const Icon       = CLUSTER_ICONS[cluster.id];
          const isClOpen   = openClusters[cluster.id] ?? false;
          const isClActive = activeCl?.id === cluster.id;

          return (
            <div key={cluster.id} style={{ marginTop: clIdx > 0 ? 2 : 0 }}>

              {/* ────────────────────────────────────────────────
                  LEVEL 1 – CLUSTER HEADER
                  Styled as a workspace label: icon + bold text
                  + right chevron. Active = icon glows + text
                  brightens. Think: "CRM Teamspace" from image.
              ──────────────────────────────────────────────── */}
              <button
                onClick={() => toggleCluster(cluster.id)}
                aria-expanded={isClOpen}
                className={cn(
                  'relative w-full flex items-center gap-2.5 text-left',
                  'rounded-md mx-2 transition-colors duration-150',
                  isClActive
                    ? 'text-white'
                    : 'hover:bg-white/[0.04]',
                )}
                style={{
                  padding:    '8px 10px 8px 10px',
                  width:      'calc(100% - 16px)',
                  color:      isClActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.58)',
                  transition: 'color 0.15s, background 0.15s',
                }}
              >
                {/* Active cluster glow bar */}
                {isClActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r"
                    style={{
                      width:           '2.5px',
                      height:          '18px',
                      backgroundColor: 'var(--primary-brand)',
                      boxShadow:       '0 0 8px var(--primary-brand)',
                    }}
                  />
                )}

                {/* Cluster icon */}
                {Icon && (
                  <Icon
                    size={16}
                    style={{
                      flexShrink: 0,
                      color:      isClActive ? 'var(--primary-brand)' : 'currentColor',
                      filter:     isClActive ? 'drop-shadow(0 0 4px var(--primary-brand))' : 'none',
                      transition: 'color 0.15s, filter 0.15s',
                    }}
                  />
                )}

                {/* Cluster label */}
                <span
                  className="flex-1 truncate"
                  style={{
                    fontSize:      '11.5px',
                    fontWeight:    700,
                    letterSpacing: '0.01em',
                    lineHeight:    1,
                  }}
                >
                  {cluster.label}
                </span>

                <Chevron open={isClOpen} size={10} />
              </button>

              {/* ────────────────────────────────────────────────
                  LEVELS 2 + 3 — SECTIONS + ITEMS
              ──────────────────────────────────────────────── */}
              <div className={cn('sidebar-collapsible', isClOpen && 'sidebar-collapsible-open')}>
                <div className="sidebar-collapsible-inner">
                  <div style={{ paddingBottom: 4 }}>

                    {cluster.sections.map(section => {
                      const isSecOpen   = openSections[section.id] ?? false;
                      const isSecActive = isClActive && activeSec?.section.id === section.id;

                      return (
                        <div key={section.id} style={{ marginTop: 1 }}>

                          {/* ──────────────────────────────────────
                              LEVEL 2 – SECTION FOLDER ROW
                              Folder icon + bold label + right
                              chevron. Mirrors the "Sales ▾" rows
                              in the reference image exactly.
                          ────────────────────────────────────── */}
                          <button
                            onClick={() => toggleSection(section.id)}
                            aria-expanded={isSecOpen}
                            className="w-full flex items-center gap-2 text-left rounded-md transition-colors duration-150"
                            style={{
                              padding:    '6px 10px 6px 20px',
                              color:      isSecActive
                                ? 'rgba(255,255,255,0.95)'
                                : 'rgba(255,255,255,0.72)',
                              background: isSecOpen && !isSecActive
                                ? 'rgba(255,255,255,0.03)'
                                : 'transparent',
                              transition: 'color 0.12s, background 0.12s',
                            }}
                            onMouseEnter={e => {
                              if (!isSecActive)
                                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={e => {
                              if (!isSecActive)
                                (e.currentTarget as HTMLButtonElement).style.background =
                                  isSecOpen ? 'rgba(255,255,255,0.03)' : 'transparent';
                            }}
                          >
                            {/* Folder icon – primary-brand colour, dimmed when inactive */}
                            <span
                              style={{
                                flexShrink: 0,
                                color:      'var(--primary-brand)',
                                opacity:    isSecActive ? 1 : 0.65,
                                transition: 'opacity 0.12s',
                                display:    'flex',
                                alignItems: 'center',
                              }}
                            >
                              <FolderIcon size={13} />
                            </span>

                            {/* Section label */}
                            <span
                              className="flex-1 truncate"
                              style={{
                                fontSize:   '12px',
                                fontWeight: isSecActive ? 700 : 600,
                                lineHeight: 1,
                              }}
                            >
                              {section.label}
                            </span>

                            {/* Active indicator dot */}
                            {isSecActive && (
                              <span
                                className="rounded-full flex-shrink-0"
                                style={{
                                  width:           5,
                                  height:          5,
                                  backgroundColor: 'var(--primary-brand)',
                                  opacity:         0.8,
                                  marginRight:     4,
                                  boxShadow:       '0 0 4px var(--primary-brand)',
                                }}
                              />
                            )}

                            <Chevron open={isSecOpen} size={9} />
                          </button>

                          {/* ──────────────────────────────────────
                              LEVEL 3 – NAV ITEMS
                              Colored icon + readable label.
                              Active = frosted glass pill + left bar.
                              Recently used = white shimmer ring.
                          ────────────────────────────────────── */}
                          <div className={cn('sidebar-collapsible', isSecOpen && 'sidebar-collapsible-open')}>
                            <div className="sidebar-collapsible-inner">
                              <div style={{ paddingBottom: 2 }}>
                                {section.items.map(item => {
                                  const isActive =
                                    location.pathname === item.path ||
                                    (item.path !== '/' && location.pathname.startsWith(item.path + '/'));
                                  const isRecent = !isActive && recentlyUsed.includes(item.path);
                                  const iconColor = getItemColor(item.label, cluster.id);

                                  return (
                                    <Link
                                      key={item.id}
                                      to={item.path}
                                      className={cn(
                                        'sidebar-nav-item',
                                        'relative flex items-center gap-2 rounded-lg',
                                        isRecent && 'sidebar-item-recent',
                                      )}
                                      style={{
                                        padding:             '6px 10px 6px 34px',
                                        margin:              '1px 6px',
                                        fontSize:            '12px',
                                        fontWeight:          isActive ? 600 : 400,
                                        color:               isActive
                                          ? 'rgba(255,255,255,0.97)'
                                          : 'rgba(255,255,255,0.68)',
                                        background:          isActive
                                          ? 'rgba(255,255,255,0.1)'
                                          : isRecent
                                          ? 'rgba(255,255,255,0.04)'
                                          : 'transparent',
                                        backdropFilter:      isActive ? 'blur(6px)' : 'none',
                                        WebkitBackdropFilter:isActive ? 'blur(6px)' : 'none',
                                        border:              isActive
                                          ? '1px solid rgba(255,255,255,0.09)'
                                          : '1px solid transparent',
                                        lineHeight:          1.2,
                                        transition:          'color 0.12s, background 0.12s',
                                        textDecoration:      'none',
                                      }}
                                      onMouseEnter={e => {
                                        if (!isActive) {
                                          const el = e.currentTarget as HTMLAnchorElement;
                                          el.style.color      = 'rgba(255,255,255,0.92)';
                                          el.style.background = 'rgba(255,255,255,0.06)';
                                        }
                                      }}
                                      onMouseLeave={e => {
                                        if (!isActive) {
                                          const el = e.currentTarget as HTMLAnchorElement;
                                          el.style.color      = 'rgba(255,255,255,0.68)';
                                          el.style.background = isRecent ? 'rgba(255,255,255,0.04)' : 'transparent';
                                        }
                                      }}
                                    >
                                      {/* Active left accent bar */}
                                      {isActive && (
                                        <span
                                          className="absolute top-1/2 -translate-y-1/2 rounded-r"
                                          style={{
                                            left:            '-1px',
                                            width:           '2.5px',
                                            height:          '14px',
                                            backgroundColor: 'var(--primary-brand)',
                                            boxShadow:       '0 0 5px var(--primary-brand)',
                                          }}
                                        />
                                      )}

                                      {/* Semantic-colored item icon */}
                                      <span
                                        style={{
                                          flexShrink: 0,
                                          color:      iconColor,
                                          opacity:    isActive ? 0.95 : 0.72,
                                          display:    'flex',
                                          alignItems: 'center',
                                        }}
                                      >
                                        <ItemIcon label={item.label} />
                                      </span>

                                      {/* Label */}
                                      <span className="truncate">{item.label}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                        </div>
                      );
                    })}

                  </div>
                </div>
              </div>

              {/* Cluster divider */}
              {clIdx < CLUSTERS.length - 1 && (
                <div
                  style={{
                    height:     '1px',
                    background: 'rgba(255,255,255,0.06)',
                    margin:     '6px 12px',
                  }}
                />
              )}

            </div>
          );
        })}
      </nav>

      {/* ════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════ */}
      <div
        className="flex-shrink-0 px-4 py-[10px]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p
          style={{
            fontSize:      9,
            fontWeight:    600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'rgba(255,255,255,0.2)',
          }}
        >
          SPlus v2.0
        </p>
      </div>

    </aside>
  );
}
