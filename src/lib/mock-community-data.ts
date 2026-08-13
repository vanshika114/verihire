export type PostTag = 'Scam Alert' | 'Positive Experience' | 'Question' | 'Advice';

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorRole: string;
  company: string;
  tag: PostTag;
  title: string;
  excerpt: string;
  content: string[];
  createdAt: string;
  upvotes: number;
  comments: CommunityComment[];
}

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-001',
    author: 'Anika P.',
    authorRole: 'Computer Science Student',
    company: 'BrightWave Tech',
    tag: 'Scam Alert',
    title: '"BrightWave Tech" asked for a refundable laptop deposit before onboarding',
    excerpt:
      'Got an offer letter within an hour of applying, then was asked to pay ₹8,000 for a "company laptop deposit." Ran it through VeriHire and the domain was registered two weeks ago.',
    content: [
      'I applied for a remote data-entry internship through a link shared in a placement WhatsApp group. Within an hour I had an offer letter with a company logo, a signature, and a joining date.',
      'The recruiter then asked for a refundable ₹8,000 "laptop deposit" to be paid before onboarding, promising it would be returned in the first payslip. That felt off, so I ran the offer letter and the sender domain through VeriHire AI.',
      'The trust report flagged the domain as registered two weeks earlier, no verifiable company address, and the salary offered was well above market rate for the role. I did not pay, and blocked the recruiter.',
      'Posting here so others in campus groups can recognize the pattern: fast offers, upfront "deposits," and salaries that sound too good.',
    ],
    createdAt: '2026-08-10T09:15:00Z',
    upvotes: 142,
    comments: [
      {
        id: 'post-001-c1',
        author: 'Rahul M.',
        content: 'Same thing happened to a friend at my college last semester. Glad you caught it early.',
        createdAt: '2026-08-10T10:02:00Z',
      },
      {
        id: 'post-001-c2',
        author: 'Mina L.',
        content: 'Forwarding this to our placement cell so we can warn the batch.',
        createdAt: '2026-08-10T11:40:00Z',
      },
    ],
  },
  {
    id: 'post-002',
    author: 'Devansh K.',
    authorRole: 'Final Year, ECE',
    company: 'Nimbus Cloud Systems',
    tag: 'Positive Experience',
    title: 'Verified offer from Nimbus Cloud Systems — legit and process was smooth',
    excerpt:
      'Wanted to share a good experience for once. Nimbus checked out clean on VeriHire, HR was responsive, and the offer letter matched everything on their careers page.',
    content: [
      'After a few close calls with sketchy "urgent hiring" messages, I wanted to share a positive one. Nimbus Cloud Systems reached out after I applied through their actual careers page.',
      'I ran the offer letter and recruiter email through VeriHire AI before responding to anything. The trust score came back high — verified domain history, consistent LinkedIn presence, and a salary band in line with market data.',
      'HR scheduled two structured interviews, sent a formal offer letter on branded letterhead, and never asked for any payment at any stage. Joining next month.',
      'Sharing mainly so people know it is not all scams — a bit of verification just helps you tell the difference quickly.',
    ],
    createdAt: '2026-08-09T14:20:00Z',
    upvotes: 96,
    comments: [
      {
        id: 'post-002-c1',
        author: 'Priya S.',
        content: 'This is reassuring, thank you for posting. Congrats on the offer!',
        createdAt: '2026-08-09T15:05:00Z',
      },
    ],
  },
  {
    id: 'post-003',
    author: 'Karan V.',
    authorRole: 'MBA Candidate',
    company: 'Unknown recruiter',
    tag: 'Question',
    title: 'Recruiter is only communicating over WhatsApp — red flag?',
    excerpt:
      'No company email, no video call, just a WhatsApp number and a PDF offer. Is this normal for smaller startups or should I be worried?',
    content: [
      'A recruiter messaged me on WhatsApp claiming to represent a fintech startup and sent a PDF "internship confirmation" with no interview at all.',
      'Every conversation has been over WhatsApp — no official email address, no call, no video interview. They say the founder is "too busy" to hop on a call this week.',
      'Is this just how small startups sometimes operate, or is this a pattern I should be cautious about? Wanted to hear from people who have dealt with early-stage companies before.',
    ],
    createdAt: '2026-08-08T18:45:00Z',
    upvotes: 54,
    comments: [
      {
        id: 'post-003-c1',
        author: 'Sneha P.',
        content:
          'Legit small startups usually still have a company email and at least one call. This sounds like a scam pattern — run it through the verifier before replying further.',
        createdAt: '2026-08-08T19:10:00Z',
      },
      {
        id: 'post-003-c2',
        author: 'Arjun S.',
        content: 'Ask for the company registration details or GST number. A real founder will have these on hand.',
        createdAt: '2026-08-08T20:02:00Z',
      },
    ],
  },
  {
    id: 'post-004',
    author: 'Ishita N.',
    authorRole: 'Placement Cell Volunteer',
    company: 'General advice',
    tag: 'Advice',
    title: '5 things I check before forwarding any "urgent hiring" post to our batch',
    excerpt:
      'After two scam reports from our college this year, our placement cell now runs every opportunity through a quick checklist before sharing it in the group.',
    content: [
      'Our placement cell had two scam reports from students last semester, so we now run every "urgent hiring" post through a quick checklist before forwarding it to the batch WhatsApp group.',
      '1. Does the domain match the company\u2019s real website, and how old is it? 2. Is the salary realistic for the role and experience level? 3. Does the recruiter have a verifiable LinkedIn with mutual connections? 4. Is any payment, deposit, or "training fee" requested at any stage? 5. Is there an actual interview, or does the offer arrive instantly?',
      'We now also run the offer letter or job post through VeriHire AI as a first pass — it catches most of the obvious red flags in under two minutes, which is fast enough to do for every post before sharing it.',
    ],
    createdAt: '2026-08-06T11:00:00Z',
    upvotes: 210,
    comments: [
      {
        id: 'post-004-c1',
        author: 'Devansh K.',
        content: 'Saving this checklist. Wish every college placement cell did this.',
        createdAt: '2026-08-06T12:30:00Z',
      },
    ],
  },
  {
    id: 'post-005',
    author: 'Priya S.',
    authorRole: 'Marketing Intern',
    company: 'Skyline Retail Co.',
    tag: 'Scam Alert',
    title: 'Fake "Skyline Retail" internship collecting personal documents upfront',
    excerpt:
      'Offer letter looked professional but the process asked for Aadhaar and bank details before any interview. Verified the domain was only 10 days old.',
    content: [
      'Saw a "work from home" marketing internship post shared in a student Discord server, claiming to be from Skyline Retail Co.',
      'The application form asked for Aadhaar number, a photo of a bank passbook, and a passport photo — all before any interview or written test. That is not normal for a real internship process.',
      'VeriHire AI flagged the sender domain as 10 days old, no matching company on any business registry, and the offer letter template matched patterns reported in other scam cases.',
      'Reported the post to the Discord mods. Please don\u2019t share personal documents before a company is verified.',
    ],
    createdAt: '2026-08-05T08:30:00Z',
    upvotes: 178,
    comments: [],
  },
  {
    id: 'post-006',
    author: 'Rahul M.',
    authorRole: 'Marketing Intern',
    company: 'General advice',
    tag: 'Question',
    title: 'How much should I push back on a salary that feels too high?',
    excerpt:
      'Got offered nearly double the average intern stipend for my field. Company checks out on VeriHire so far, but the number still feels suspicious.',
    content: [
      'A logistics startup offered me an internship stipend that is almost double what similar roles pay according to a few salary surveys I found.',
      'I ran the company and offer letter through VeriHire and the domain/registration checks came back clean, which surprised me. No obvious scam signals.',
      'Should an unusually high salary still be treated as a red flag even if everything else checks out, or does that happen with well-funded startups trying to compete for talent?',
    ],
    createdAt: '2026-08-04T16:10:00Z',
    upvotes: 39,
    comments: [
      {
        id: 'post-006-c1',
        author: 'Mina L.',
        content:
          'If the company + domain checks out and you have had a real interview, it can just be a well-funded startup. Ask for the offer in writing with clear terms either way.',
        createdAt: '2026-08-04T17:00:00Z',
      },
    ],
  },
];

export function getMockCommunityPosts(): CommunityPost[] {
  return mockCommunityPosts;
}

export function getCommunityPostById(id: string): CommunityPost | undefined {
  return mockCommunityPosts.find((post) => post.id === id);
}

export function getTagBadgeClasses(tag: PostTag): string {
  switch (tag) {
    case 'Scam Alert':
      return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
    case 'Positive Experience':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
    case 'Advice':
      return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300';
    case 'Question':
    default:
      return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400';
  }
}

export const postTags: PostTag[] = ['Scam Alert', 'Positive Experience', 'Question', 'Advice'];

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.round(diffDays / 30);
  return `${diffMonths}mo ago`;
}
