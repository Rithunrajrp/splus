import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { Dock, DockItem, DockIcon } from '@/components/ui/Dock';
import { CLUSTERS, findCluster } from '@/lib/navigation';
import { useNavStore } from '@/store/navStore';

const MIN_MAG = 32;
const MAX_MAG = 80;
import {
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
import type React from 'react';

type IconCmp = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const CLUSTER_ICONS: Record<string, IconCmp> = {
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

export function AppDock() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeClusterId, setActiveCluster, setOpenMenuId, dockMagnification, setDockMagnification } = useNavStore();

  useEffect(() => {
    const matched = findCluster(location.pathname);
    if (matched && matched.id !== activeClusterId) {
      setActiveCluster(matched.id);
    }
  }, [location.pathname, activeClusterId, setActiveCluster]);

  function handleDockClick(clusterId: string) {
    setOpenMenuId(null);
    setActiveCluster(clusterId);
    const cluster = CLUSTERS.find(c => c.id === clusterId);
    if (cluster) {
      const firstItem = cluster.sections[0]?.items[0];
      if (firstItem) navigate(firstItem.path);
    }
  }

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? -2 : 2;
    setDockMagnification(Math.min(MAX_MAG, Math.max(MIN_MAG, dockMagnification + delta)));
  }, [dockMagnification, setDockMagnification]);

  // Icon base size scales proportionally with magnification
  const iconSize = Math.round(dockMagnification * 0.39);

  return (
    <div onWheel={handleWheel} style={{ display: 'inline-block' }}>
      <Dock magnification={dockMagnification} distance={130}>
        {CLUSTERS.map(cluster => {
          const IconCmp = CLUSTER_ICONS[cluster.id] ?? LayoutGrid;
          const isActive = cluster.id === activeClusterId;

          return (
            <DockItem
              key={cluster.id}
              isActive={isActive}
              label={cluster.label}
              onClick={() => handleDockClick(cluster.id)}
            >
              <DockIcon>
                <IconCmp
                  size={iconSize}
                  style={{
                    color: isActive ? 'var(--primary-brand)' : '#1e293b',
                    transition: 'color 0.2s ease',
                  }}
                />
              </DockIcon>
            </DockItem>
          );
        })}
      </Dock>
    </div>
  );
}
