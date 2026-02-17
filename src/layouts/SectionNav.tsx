import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { findCluster, findSection } from '@/lib/navigation';

export function SectionNav() {
  const location = useLocation();
  const cluster  = findCluster(location.pathname);
  const active   = findSection(location.pathname);

  if (!cluster) return null;

  return (
    <div
      className="flex-shrink-0 flex items-center px-5"
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        minHeight: '44px',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Cluster breadcrumb */}
      <span
        className="text-[10px] font-semibold uppercase tracking-widest mr-3 flex-shrink-0 select-none"
        style={{ color: 'rgba(255,255,255,0.30)' }}
      >
        {cluster.emoji}&nbsp;{cluster.label}
      </span>

      {/* Separator */}
      <span
        className="flex-shrink-0 mr-3"
        style={{ width: '1px', height: '16px', backgroundColor: 'rgba(255,255,255,0.10)' }}
      />

      {/* Section pills — horizontally scrollable, hidden scrollbar */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar flex-1">
        {cluster.sections.map(section => {
          const isActive = active?.section.id === section.id;
          const dest     = section.items[0]?.path ?? '#';

          return (
            <Link
              key={section.id}
              to={dest}
              className={cn(
                'flex-shrink-0 px-3 py-1 rounded-full text-[11.5px] font-medium',
                'whitespace-nowrap transition-all duration-150',
                isActive
                  ? 'text-white'
                  : 'text-white/38 hover:text-white/75 hover:bg-white/[0.07]'
              )}
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--primary-brand)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }
                  : undefined
              }
            >
              {section.label}
            </Link>
          );
        })}
      </div>

      {/* View All */}
      <Link
        to={cluster.sections[0]?.items[0]?.path ?? '#'}
        className="flex-shrink-0 pl-4 text-[11px] font-medium transition-colors duration-150"
        style={{ color: 'rgba(255,255,255,0.28)' }}
        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
      >
        View All
      </Link>
    </div>
  );
}
