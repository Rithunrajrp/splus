import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useNavStore } from '@/store/navStore';
import { CLUSTERS } from '@/lib/navigation';
import { SystemIcon } from '@/components/ui/SidebarIcons';

export const SETTINGS_SIDEBAR_W = 240;

export function SettingsSidebar() {
  const { activeClusterId } = useNavStore();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isVisible = activeClusterId === 'system';
  const settingsCluster = CLUSTERS.find(c => c.id === 'system')!;
  // Settings has one section — render its items flat
  const items = settingsCluster.sections[0].items;

  function handleClick(path: string) {
    try {
      const prev: string[] = JSON.parse(localStorage.getItem('splus_recent_nav') ?? '[]');
      const next = [path, ...prev.filter(p => p !== path)].slice(0, 8);
      localStorage.setItem('splus_recent_nav', JSON.stringify(next));
    } catch {}
    navigate(path);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          key="settings-sidebar"
          initial={{ x: -SETTINGS_SIDEBAR_W, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -SETTINGS_SIDEBAR_W, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }}
          style={{
            position: 'fixed',
            top: 96,          // below topbar (56) + menubar (40)
            bottom: 0,
            left: 0,
            width: SETTINGS_SIDEBAR_W,
            zIndex: 50,
            backgroundColor: 'var(--sidebar-bg)',
            borderRight: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
          className="custom-scrollbar"
        >
          {/* Header */}
          <div
            className="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <span style={{ color: 'var(--primary-brand)', opacity: 0.9 }}>
              <SystemIcon size={16} />
            </span>
            <span
              className="text-[13px] font-bold tracking-wide"
              style={{ color: 'rgba(255,255,255,0.92)' }}
            >
              Settings
            </span>
          </div>

          {/* Items */}
          <div className="flex-1 px-2 py-2">
            {items.map(item => {
              const isActive =
                item.path === pathname ||
                (item.path !== '/' && pathname.startsWith(item.path + '/'));

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleClick(item.path)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left sidebar-nav-item"
                  style={{
                    position: 'relative',
                    ...(isActive
                      ? {
                          background: 'rgba(255,255,255,0.10)',
                          backdropFilter: 'blur(6px)',
                          border: '1px solid rgba(255,255,255,0.09)',
                        }
                      : {}),
                  }}
                >
                  {/* Left accent bar */}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '20%',
                        height: '60%',
                        width: '2.5px',
                        borderRadius: 2,
                        background: 'var(--primary-brand)',
                      }}
                    />
                  )}

                  {/* Icon */}
                  <ArrowUpRight
                    size={13}
                    style={{
                      flexShrink: 0,
                      color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.28)',
                    }}
                  />

                  {/* Label */}
                  <span
                    className="flex-1 text-[12.5px] truncate"
                    style={{
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
