import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary:
        'bg-slate-950 text-white shadow-[0_18px_45px_-24px_rgba(15,23,42,0.5)] hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_24px_55px_-20px_rgba(6,182,212,0.5)] dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400',
      secondary:
        'border border-slate-200 bg-white/80 text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-cyan-400/50 dark:hover:bg-slate-800',
      ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950',
          variants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';
