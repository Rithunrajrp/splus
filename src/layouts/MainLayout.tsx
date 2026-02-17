import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Topbar } from './Topbar';
import { LeftSidebar } from './LeftSidebar';
import { AISidebar } from './AISidebar';
import { AppDock } from './AppDock';
import { useNavStore } from '@/store/navStore';
import { CLUSTERS } from '@/lib/navigation';

// Topbar = 56px
const TOP_OFFSET = 56;

function findPageLabel(pathname: string): string {
  for (const cluster of CLUSTERS) {
    for (const section of cluster.sections) {
      for (const item of section.items) {
        if (item.path === pathname) return item.label;
      }
    }
  }
  return '';
}

export function MainLayout() {
  const { aiPanelOpen, leftSidebarWidth, leftSidebarCollapsed, rightSidebarWidth } = useNavStore();
  const location = useLocation();

  useEffect(() => {
    const label = findPageLabel(location.pathname);
    document.title = label ? `${label} - Splus` : 'Splus';
  }, [location.pathname]);

  const marginRight = aiPanelOpen ? rightSidebarWidth : 0;

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundColor: 'var(--app-canvas)' }}
    >
      {/* Fixed topbar  z-60 */}
      <Topbar />

      {/* Left sidebar — always visible, shows active cluster's sub-topics */}
      <LeftSidebar />

      {/* AI right sidebar */}
      <AISidebar />

      {/* Page content */}
      <main
        className="flex-1 overflow-y-auto custom-scrollbar"
        style={{
          paddingTop: TOP_OFFSET,
          paddingBottom: 88,
          marginLeft: leftSidebarCollapsed ? 0 : leftSidebarWidth,
          marginRight,
          transition: 'margin-left 0.22s cubic-bezier(0.16,1,0.3,1), margin-right 0.22s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="container mx-auto p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* macOS dock  z-200 */}
      <AppDock />
    </div>
  );
}
