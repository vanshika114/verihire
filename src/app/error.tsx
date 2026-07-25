'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Something went wrong.</h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
        An unexpected issue occurred while rendering the page. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
      >
        Try again
      </button>
    </div>
  );
}
