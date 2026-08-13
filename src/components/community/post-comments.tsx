'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import type { CommunityComment } from 'src/lib/mock-community-data';
import { formatRelativeTime } from 'src/lib/mock-community-data';

interface PostCommentsProps {
  initialComments: CommunityComment[];
}

export function PostComments({ initialComments }: PostCommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;

    setComments((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        author: 'You',
        content: trimmed,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Comments ({comments.length})
      </h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="glass-card flex gap-3 p-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-semibold text-white">
              {comment.author.charAt(0)}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{comment.author}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {formatRelativeTime(comment.createdAt)}
                </p>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass-card flex items-center gap-2 p-2 pl-4">
        <input
          type="text"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Add a comment for other students…"
          className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          aria-label="Post comment"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
