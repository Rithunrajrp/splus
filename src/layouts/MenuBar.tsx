import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { CLUSTERS, findCluster, findSection } from '@/lib/navigation';
import { useNavStore } from '@/store/navStore';

// ─── Recent paths ─────────────────────────────────────────────────────────────

function recordRecentPath(path: string) {
  if (!path || path === '/') return;
  try {
    const prev: string[] = JSON.parse(localStorage.getItem('splus_recent_nav') ?? '[]');
    const next = [path, ...prev.filter(p => p !== path)].slice(0, 8);
    localStorage.setItem('splus_recent_nav', JSON.stringify(next));
  } catch {}
}

// ─── MenuBar ──────────────────────────────────────────────────────────────────

export function MenuBar() {
  const { activeClusterId, openMenuId, setOpenMenuId, setActiveCluster } = useNavStore();
  const navigate = useNavigate();
  const location = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  const activeCluster = findCluster(location.pathname) ?? CLUSTERS.find(c => c.id === activeClusterId);
  const activeSection = findSection(location.pathname);

  // Sync store from URL
  useEffect(() => {
    if (activeCluster) setActiveCluster(activeCluster.id);
  }, [activeCluster, setActiveCluster]);

  // Close dropdown on click outside
  useEffect(() => {
    function onPointer(e: PointerEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [setOpenMenuId]);

  // Close dropdown on route change
  useEffect(() => { setOpenMenuId(null); }, [location.pathname, setOpenMenuId]);

  function handleItemClick(path: string) {
    recordRecentPath(path);
    navigate(path);
    setOpenMenuId(null);
  }

  // Settings cluster uses a dedicated left sidebar — show nothing in the menu bar
  const isSettings = activeCluster?.id === 'system';

  const openSection = activeCluster?.sections.find(s => s.id === openMenuId);

  return (
    <div
      ref={barRef}
      style={{ position: 'fixed', top: 56, left: 0, right: 0, zIndex: 55 }}
    >
      {/* ── Menu bar strip ──────────────────────────────────────────────── */}
      <nav
        className="h-10 flex items-center px-4 gap-0.5"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        }}
      >
        {isSettings ? (
          /* Settings cluster — breadcrumb label only */
          <span className="text-[13px] font-semibold" style={{ color: 'var(--primary-brand)' }}>
            Settings
          </span>
        ) : (
          /* All other clusters — show their sections as menu items */
          activeCluster?.sections.map(section => {
            const isSectionActive = section.id === activeSection?.section.id;
            const isOpen = openMenuId === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setOpenMenuId(isOpen ? null : section.id)}
                className="relative flex items-center gap-1 px-3 h-8 rounded-md text-[13px] font-medium select-none transition-colors"
                style={{
                  color: isSectionActive ? 'var(--primary-brand)' : '#374151',
                  background: isOpen ? 'rgba(0,0,0,0.06)' : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!isOpen) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.04)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = isOpen ? 'rgba(0,0,0,0.06)' : 'transparent';
                }}
              >
                {section.label}
                <ChevronDown
                  size={11}
                  style={{
                    opacity: 0.5,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.18s ease',
                  }}
                />
                {/* Active underline */}
                {isSectionActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 1,
                      left: 8,
                      right: 8,
                      height: 2,
                      borderRadius: 1,
                      background: 'var(--primary-brand)',
                      opacity: 0.7,
                    }}
                  />
                )}
              </button>
            );
          })
        )}
      </nav>

      {/* ── Section dropdown ────────────────────────────────────────────── */}
      <AnimatePresence>
        {openSection && (
          <motion.div
            key={openSection.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              minWidth: 200,
              background: '#ffffff',
              border: '1px solid #e5e7eb',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
              boxShadow: '0 8px 24px -4px rgba(0,0,0,0.12)',
              zIndex: 54,
            }}
          >
            <SectionDropdown
              section={openSection}
              activePath={location.pathname}
              onItemClick={handleItemClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SectionDropdown ─────────────────────────────────────────────────────────

function SectionDropdown({
  section,
  activePath,
  onItemClick,
}: {
  section: typeof CLUSTERS[number]['sections'][number];
  activePath: string;
  onItemClick: (path: string) => void;
}) {
  return (
    <div className="py-1.5 px-1.5">
      {section.items.map(item => {
        const isActive =
          item.path === activePath ||
          (item.path !== '/' && activePath.startsWith(item.path + '/'));

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick(item.path)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors"
            style={{
              background: isActive ? 'var(--primary-brand)' : 'transparent',
            }}
            onMouseEnter={e => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = isActive
                ? 'var(--primary-brand)'
                : 'transparent';
            }}
          >
            <ArrowUpRight
              size={13}
              style={{
                flexShrink: 0,
                color: isActive ? 'rgba(255,255,255,0.7)' : '#9ca3af',
              }}
            />
            <span
              className="text-[13px] whitespace-nowrap"
              style={{
                color: isActive ? '#ffffff' : '#374151',
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
