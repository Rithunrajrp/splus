import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  Radio,
  UserCheck,
  Users,
  Clock,
  Briefcase,
  FolderKanban,
  Calculator,
  TrendingUp,
  Package,
  BarChart2,
  Settings2,
} from 'lucide-react';
import { CLUSTERS, findCluster } from '@/lib/navigation';
import { useNavStore } from '@/store/navStore';
import type React from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_W = 180;
const MAX_W = 420;

// Easing matching the StaggeredMenu example
const SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

type ClusterIconCmp = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const CLUSTER_ICONS: Record<string, ClusterIconCmp> = {
  home:          Home,
  core:          LayoutGrid,
  icc:           Radio,
  employees:     UserCheck,
  people:        Users,
  attendance:    Clock,
  operations:    Briefcase,
  projects:      FolderKanban,
  'billing-acc': Calculator,
  finance:       TrendingUp,
  inventory:     Package,
  insights:      BarChart2,
  system:        Settings2,
};

// ─── LeftSidebar ─────────────────────────────────────────────────────────────

export function LeftSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeClusterId, setActiveCluster,
    leftSidebarWidth, setLeftSidebarWidth,
    leftSidebarCollapsed, setLeftSidebarCollapsed,
  } = useNavStore();

  useEffect(() => {
    const matched = findCluster(location.pathname);
    if (matched && matched.id !== activeClusterId) setActiveCluster(matched.id);
  }, [location.pathname, activeClusterId, setActiveCluster]);

  const activeCluster = CLUSTERS.find(c => c.id === activeClusterId);

  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  // Auto-expand the section that contains the active route
  useEffect(() => {
    if (!activeCluster) return;
    for (const section of activeCluster.sections) {
      const hasActive = section.items.some(
        i => i.path === location.pathname ||
          (i.path !== '/' && location.pathname.startsWith(i.path + '/'))
      );
      if (hasActive) {
        setCollapsedSections(prev => {
          if (!prev.has(section.id)) return prev;
          const next = new Set(prev);
          next.delete(section.id);
          return next;
        });
      }
    }
  }, [location.pathname, activeCluster]);

  function toggleSection(id: string) {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleItemClick(path: string) {
    try {
      const prev: string[] = JSON.parse(localStorage.getItem('splus_recent_nav') ?? '[]');
      const next = [path, ...prev.filter(p => p !== path)].slice(0, 8);
      localStorage.setItem('splus_recent_nav', JSON.stringify(next));
    } catch {}
    navigate(path);
  }

  // ── Drag-to-resize ──────────────────────────────────────────────────────────
  const isDragging  = useRef(false);
  const dragStartX  = useRef(0);
  const dragStartW  = useRef(0);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const newW = Math.min(MAX_W, Math.max(MIN_W, dragStartW.current + (e.clientX - dragStartX.current)));
    setLeftSidebarWidth(newW);
  }, [setLeftSidebarWidth]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  function startDrag(e: React.MouseEvent) {
    isDragging.current  = true;
    dragStartX.current  = e.clientX;
    dragStartW.current  = leftSidebarWidth;
    document.body.style.cursor     = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // Increment a counter each time the sidebar expands so animation re-fires
  const [expandCount, setExpandCount] = useState(0);
  const prevCollapsed = useRef(leftSidebarCollapsed);
  useEffect(() => {
    if (prevCollapsed.current && !leftSidebarCollapsed) {
      setExpandCount(c => c + 1);
    }
    prevCollapsed.current = leftSidebarCollapsed;
  }, [leftSidebarCollapsed]);

  // Combine cluster + expand count so either change triggers animation
  const animKey = useMemo(
    () => `${activeClusterId}-${expandCount}`,
    [activeClusterId, expandCount],
  );

  const ClusterIcon = CLUSTER_ICONS[activeClusterId] ?? LayoutGrid;
  const multiSection = (activeCluster?.sections.length ?? 0) > 1;

  // Build a flat list of renderable rows to compute stagger indices
  type Row =
    | { type: 'section'; sectionId: string; label: string; isOpen: boolean; isActive: boolean }
    | { type: 'item'; itemId: string; label: string; isActive: boolean; sectionId: string };

  const rows: Row[] = [];
  activeCluster?.sections.forEach(section => {
    const isCollapsed = collapsedSections.has(section.id);
    const hasActiveItem = section.items.some(item => {
      const p = location.pathname;
      return item.path === p || (item.path !== '/' && p.startsWith(item.path + '/'));
    });
    if (multiSection) {
      rows.push({ type: 'section', sectionId: section.id, label: section.label, isOpen: !isCollapsed, isActive: hasActiveItem });
    }
    if (!isCollapsed) {
      section.items.forEach(item => {
        const p = location.pathname;
        const isActive = item.path === p || (item.path !== '/' && p.startsWith(item.path + '/'));
        rows.push({ type: 'item', itemId: item.id, label: item.label, isActive, sectionId: section.id });
      });
    }
  });

  return (
    <>
    {/* ── Floating collapse toggle ──────────────────────────────────────── */}
    <button
      type="button"
      onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
      title={leftSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      style={{
        position: 'fixed',
        top: 68,
        left: leftSidebarCollapsed ? 8 : leftSidebarWidth - 13,
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: 'var(--sidebar-bg)',
        border: '1px solid var(--sidebar-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 60,
        color: 'var(--sidebar-text)',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        transition: 'left 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {leftSidebarCollapsed
        ? <ChevronRight size={13} />
        : <ChevronLeft size={13} />}
    </button>

    <aside
      style={{
        position: 'fixed',
        top: 56,
        bottom: 0,
        left: 0,
        width: leftSidebarCollapsed ? 0 : leftSidebarWidth,
        zIndex: 50,
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: leftSidebarCollapsed ? 'none' : '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.22s cubic-bezier(0.16,1,0.3,1)',
      }}
    >

      {/* ── Cluster header ───────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`header-${animKey}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.45, ease: SPRING, delay: 0.22 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 16px 12px',
            borderBottom: '1px solid var(--sidebar-border)',
            flexShrink: 0,
          }}
        >
          <span style={{ color: 'var(--primary-brand)', flexShrink: 0 }}>
            <ClusterIcon size={15} />
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--sidebar-text)',
              letterSpacing: '0.01em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {activeCluster?.label ?? '—'}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Nav list ─────────────────────────────────────────────────────── */}
      <div
        className="custom-scrollbar"
        style={{ flex: 1, overflowY: 'auto', paddingBottom: 12, position: 'relative', zIndex: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div key={animKey}>
            {activeCluster?.sections.map(section => {
              const isCollapsed = collapsedSections.has(section.id);
              const hasActiveItem = section.items.some(item => {
                const p = location.pathname;
                return item.path === p || (item.path !== '/' && p.startsWith(item.path + '/'));
              });

              // Compute stagger base for this section
              const sectionRowIdx = rows.findIndex(
                r => r.type === 'section' && r.sectionId === section.id
              );

              return (
                <div key={section.id} style={{ padding: multiSection ? '3px 10px 2px' : 0 }}>

                  {/* Section header — only when multiple sections */}
                  {multiSection && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        ease: SPRING,
                        delay: 0.32 + (sectionRowIdx >= 0 ? sectionRowIdx : 0) * 0.08,
                      }}
                    >
                      <SectionHeader
                        label={section.label}
                        isOpen={!isCollapsed}
                        isActive={hasActiveItem}
                        onClick={() => toggleSection(section.id)}
                      />
                    </motion.div>
                  )}

                  {/* Items — grouped card when multiSection, plain list otherwise */}
                  {!isCollapsed && (
                    <div
                      style={multiSection ? {
                        border: '1px solid var(--sidebar-border)',
                        borderRadius: 10,
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        marginBottom: 4,
                      } : undefined}
                    >
                      {section.items.map((item, itemIdx) => {
                        const p = location.pathname;
                        const isActive =
                          item.path === p ||
                          (item.path !== '/' && p.startsWith(item.path + '/'));
                        const isLast = itemIdx === section.items.length - 1;

                        const itemRowIdx = rows.findIndex(
                          r => r.type === 'item' && r.itemId === item.id
                        );

                        return (
                          // Clip container — hides item until it rises into view
                          <div key={item.id} style={{ overflow: 'hidden' }}>
                            <motion.div
                              initial={{ y: '105%', rotate: 6, opacity: 0 }}
                              animate={{ y: '0%', rotate: 0, opacity: 1 }}
                              transition={{
                                duration: 0.72,
                                ease: SPRING,
                                delay: 0.32 + (itemRowIdx >= 0 ? itemRowIdx : 0) * 0.07,
                                opacity: { duration: 0.38, ease: 'easeOut' },
                              }}
                              style={{ transformOrigin: '50% 100%' }}
                            >
                              <NavItem
                                label={item.label}
                                icon={item.icon}
                                isActive={isActive}
                                indent={false}
                                grouped={multiSection}
                                showDivider={multiSection && !isLast}
                                onClick={() => handleItemClick(item.path)}
                              />
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Resize handle ────────────────────────────────────────────────── */}
      <div
        onMouseDown={startDrag}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 4,
          cursor: 'col-resize',
          zIndex: 10,
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'var(--primary-brand)';
          (e.currentTarget as HTMLDivElement).style.opacity = '0.4';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.background = 'transparent';
          (e.currentTarget as HTMLDivElement).style.opacity = '1';
        }}
      />
    </aside>
    </>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  isOpen,
  isActive,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        padding: '8px 4px 4px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          flex: 1,
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--sidebar-text)',
          opacity: isActive ? 0.75 : 0.45,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <ChevronDown
        size={11}
        style={{
          flexShrink: 0,
          color: 'var(--sidebar-text)',
          opacity: 0.4,
          transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
          transition: 'transform 0.18s ease',
        }}
      />
    </button>
  );
}

// ─── NavItem ──────────────────────────────────────────────────────────────────

function NavItem({
  label,
  icon: Icon,
  isActive,
  indent: _indent,
  grouped = false,
  showDivider = false,
  onClick,
}: {
  label: string;
  icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  isActive: boolean;
  indent: boolean;
  grouped?: boolean;
  showDivider?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  if (grouped) {
    return (
      <div>
        <button
          type="button"
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            width: '100%',
            padding: '8px 12px',
            border: 'none',
            background: hovered && !isActive ? 'var(--sidebar-hover)' : 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          {/* Icon */}
          {Icon ? (
            <Icon
              size={14}
              style={{
                flexShrink: 0,
                color: isActive ? 'var(--primary-brand)' : 'var(--sidebar-text)',
                opacity: isActive ? 1 : 0.45,
                transition: 'color 0.15s ease, opacity 0.15s ease',
              }}
            />
          ) : (
            <span
              style={{
                flexShrink: 0,
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: isActive ? 'var(--primary-brand)' : 'var(--sidebar-text)',
                opacity: isActive ? 1 : 0.25,
              }}
            />
          )}
          <span
            style={{
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--primary-brand)' : 'var(--sidebar-text)',
              opacity: isActive ? 1 : 0.85,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s ease',
            }}
          >
            {label}
          </span>
        </button>
        {showDivider && (
          <div style={{ height: 1, background: 'var(--sidebar-border)', opacity: 0.6, margin: '0 10px' }} />
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        padding: '8px 16px',
        border: 'none',
        borderRadius: 0,
        background: hovered && !isActive ? 'var(--sidebar-hover)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      {/* Active left accent bar */}
      {isActive && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--primary-brand)',
          }}
        />
      )}
      {Icon && (
        <Icon
          size={14}
          style={{
            flexShrink: 0,
            color: isActive ? 'var(--primary-brand)' : 'var(--sidebar-text)',
            opacity: isActive ? 1 : 0.45,
            transition: 'color 0.15s ease, opacity 0.15s ease',
          }}
        />
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? 'var(--primary-brand)' : 'var(--sidebar-text)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.15s ease',
        }}
      >
        {label}
      </span>
    </button>
  );
}
