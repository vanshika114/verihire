'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Loader2, PenLine } from 'lucide-react';
import { postTags, type PostTag } from 'src/lib/mock-community-data';

interface CreatePostFormValues {
  title: string;
  company: string;
  tag: PostTag | '';
  content: string;
}

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white';

export default function CommunityCreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    defaultValues: { title: '', company: '', tag: '', content: '' },
  });

  const onSubmit = async (values: CreatePostFormValues) => {
    setIsSubmitting(true);
    // Simulated submit — posts aren't persisted in this demo build.
    console.log('New community post', values);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      router.push('/community');
    }, 1200);
  };

  return (
    <main className="section-shell overflow-x-hidden py-16 sm:py-20">
      <Link
        href="/community"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-300"
      >
        <ArrowLeft size={16} />
        Back to community
      </Link>

      <div className="mx-auto mt-8 max-w-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-2 text-white">
            <PenLine size={18} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Share your experience</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your report helps other students spot the same pattern.
            </p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="glass-card p-8 text-center">
            <p className="text-base font-semibold text-slate-900 dark:text-white">Thanks for sharing!</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Taking you back to the community feed…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-4 p-6 sm:p-8">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Title
              </label>
              <input
                type="text"
                placeholder="e.g. Fake internship asked for a deposit before onboarding"
                className={inputClasses}
                {...register('title', { required: 'Give your post a clear title' })}
              />
              {errors.title ? <p className="mt-1 text-xs text-red-500">{errors.title.message}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Company or recruiter name
              </label>
              <input
                type="text"
                placeholder="e.g. BrightWave Tech"
                className={inputClasses}
                {...register('company', { required: 'Company or recruiter name is required' })}
              />
              {errors.company ? <p className="mt-1 text-xs text-red-500">{errors.company.message}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select className={inputClasses} {...register('tag', { required: 'Select a category' })}>
                <option value="">Select a category</option>
                {postTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              {errors.tag ? <p className="mt-1 text-xs text-red-500">{errors.tag.message}</p> : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                What happened?
              </label>
              <textarea
                rows={6}
                placeholder="Share what happened, what you noticed, and anything that helped you verify it…"
                className={inputClasses}
                {...register('content', {
                  required: 'Tell the community what happened',
                  minLength: { value: 30, message: 'Add a bit more detail (30+ characters) so it\u2019s useful to others' },
                })}
              />
              {errors.content ? <p className="mt-1 text-xs text-red-500">{errors.content.message}</p> : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {isSubmitting ? 'Posting…' : 'Post to community'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
