'use client';

import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type TabsContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue>({});

interface TabsProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className }: TabsProps) {
  const contextValue = useMemo(() => ({ value, onValueChange }), [value, onValueChange]);

  return <TabsContext.Provider value={contextValue}><div className={className}>{children}</div></TabsContext.Provider>;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return <div className={cn('flex flex-wrap items-center gap-2', className)}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const { value: activeValue, onValueChange } = useContext(TabsContext);
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => onValueChange?.(value)}
      className={cn(
        'rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-cyan-300 hover:text-slate-900 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:text-white',
        isActive && 'border-cyan-400 bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
        className,
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { value: activeValue } = useContext(TabsContext);
  if (activeValue !== value) return null;

  return <div className={className}>{children}</div>;
}
