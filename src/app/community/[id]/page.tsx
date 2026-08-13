import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowBigUp, ArrowLeft } from 'lucide-react';
import { getCommunityPostById, getTagBadgeClasses, formatRelativeTime } from '@/lib/mock-community-data';
import { PostComments } from '@/components/community/post-comments';

interface CommunityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { id } = await params;
  const post = getCommunityPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="section-shell overflow-x-hidden py-16 sm:py-20">
      <Link
        href="/community"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
      >
        <ArrowLeft size={16} />
        Back to community
      </Link>

      <article className="glass-card mx-auto mt-8 max-w-3xl p-8 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getTagBadgeClasses(post.tag)}`}>
            {post.tag}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{formatRelativeTime(post.createdAt)}</span>
        </div>

        <h1 className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-slate-950 sm:text-3xl dark:text-white">
          {post.title}
        </h1>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-semibold text-white">
            {post.author.charAt(0)}
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{post.author}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {post.authorRole} · {post.company}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-slate-600 dark:text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <ArrowBigUp size={18} className="text-cyan-500" />
          {post.upvotes} students found this helpful
        </div>
      </article>

      <div className="mx-auto mt-10 max-w-3xl">
        <PostComments initialComments={post.comments} />
      </div>
    </main>
  );
}
