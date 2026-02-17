import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import React, { createContext, useContext, useRef } from 'react';
import './Dock.css';

// ─── Context: share mouseX MotionValue without prop cloning ───────────────────

const DockContext = createContext<MotionValue<number> | null>(null);

// ─── Config ───────────────────────────────────────────────────────────────────

const DEFAULT_MAGNIFICATION = 56;
const DEFAULT_DISTANCE = 130;

// ─── Dock ─────────────────────────────────────────────────────────────────────

export interface DockProps {
  children: React.ReactNode;
  magnification?: number;
  distance?: number;
  className?: string;
}

export function Dock({
  children,
  magnification: _magnification = DEFAULT_MAGNIFICATION,
  distance: _distance = DEFAULT_DISTANCE,
  className = '',
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={mouseX}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`dock-container ${className}`}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

// ─── DockItem ─────────────────────────────────────────────────────────────────

export interface DockItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
  magnification?: number;
  distance?: number;
  className?: string;
}

export function DockItem({
  children,
  onClick,
  isActive = false,
  label,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  className = '',
}: DockItemProps) {
  const mouseX = useContext(DockContext)!;
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, () => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return mouseX.get() - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40],
  );

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="dock-item-wrapper">
      <motion.div
        ref={ref}
        style={{ width }}
        onClick={onClick}
        className={`dock-item${isActive ? ' dock-item--active' : ''} ${className}`}
      >
        {children}
      </motion.div>
      {/* Tooltip */}
      {label && <div className="dock-label">{label}</div>}
    </div>
  );
}

// ─── DockIcon ─────────────────────────────────────────────────────────────────

export function DockIcon({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

// ─── DockSeparator ────────────────────────────────────────────────────────────

export function DockSeparator() {
  return <div className="dock-separator" />;
}
