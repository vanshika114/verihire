'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessagesSquare, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/landing/section-heading';
import { PostCard } from 'src/components/community/post-card';
import { getMockCommunityPosts, postTags, type PostTag } from 'src/lib/mock-community-data';

type TagFilter = 'all' | PostTag;

export default function CommunityPage() {
  const [activeTag, setActiveTag] = useState<TagFilter>('all');
  const posts = useMemo(() => getMockCommunityPosts(), []);

  const filteredPosts = useMemo(() => {
    if (activeTag === 'all') return posts;
    return posts.filter((post) => post.tag === activeTag);
  }, [posts, activeTag]);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="section-shell relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(59,130,246,0.14),transparent_45%)]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-cyan-50/80 px-3 py-2 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
            <MessagesSquare size={16} />
            Community reports
          </div>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
            Real experiences from students like you.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Scam alerts, verified good experiences, and honest questions — shared by students so the next person
            doesn't have to find out the hard way.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/community/create">
              <Button variant="primary" className="gap-2 px-6">
                Share your experience <PenLine size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Filters + feed */}
      <section className="section-shell pb-20 sm:pb-24">
        <SectionHeading
          eyebrow="Latest posts"
          title="Browse by what other students are reporting."
          description="Filter the feed, or open a post to read the full story and join the discussion."
        />

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTag('all')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              activeTag === 'all'
                ? 'border-slate-950 bg-slate-950 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-slate-950'
                : 'border-slate-200 bg-white/80 text-slate-600 hover:border-cyan-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300'
            }`}
          >
            All posts
          </button>
          {postTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeTag === tag
                  ? 'border-slate-950 bg-slate-950 text-white dark:border-cyan-500 dark:bg-cyan-500 dark:text-slate-950'
                  : 'border-slate-200 bg-white/80 text-slate-600 hover:border-cyan-300 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
          {filteredPosts.length === 0 ? (
            <p className="col-span-full text-center text-sm text-slate-500 dark:text-slate-400">
              No posts in this category yet.
            </p>
          ) : (
            filteredPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} />)
          )}
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/community/create">
            <Button variant="secondary" className="gap-2 px-6">
              Post your own experience <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
