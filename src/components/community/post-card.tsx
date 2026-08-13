'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowBigUp, MessageCircle } from 'lucide-react';
import type { CommunityPost } from 'src/lib/mock-community-data';
import { getTagBadgeClasses, formatRelativeTime } from 'src/lib/mock-community-data';

interface PostCardProps {
  post: CommunityPost;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/community/${post.id}`} className="glass-card block p-6">
        <div className="flex items-start justify-between gap-4">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTagBadgeClasses(post.tag)}`}
          >
            {post.tag}
          </span>
          <span className="whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-semibold text-white">
              {post.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{post.author}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{post.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ArrowBigUp size={16} className="text-cyan-500" />
              {post.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} />
              {post.comments.length}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
