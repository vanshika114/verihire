# VeriHire

**AI-powered hiring transparency platform for India.**

VeriHire brings authenticity verification and company credibility analysis to India's hiring landscape. In a market where misinformation costs candidates time and trust, we're building the infrastructure to surface what matters: which companies are real, which hiring promises hold weight, and whether this role is worth your attention.

## The Problem

Job seekers in India navigate an opaque hiring ecosystem. Fake companies clutter job boards. Inflated salary claims disappear after the offer. Company backgrounds are hard to verify. Without transparent information, candidates waste weeks on dead-end applications and make career decisions on incomplete data.

The hiring market needs a trust layer—automated verification that lets candidates cut through noise and employers prove legitimacy.

## What We're Building

VeriHire is a full-stack hiring intelligence platform with three core components:

**Frontend** – A premium dark UI with glassmorphism aesthetics. Clean, considered design that prioritizes readability and makes complex hiring data feel navigable. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

**Backend** – Robust TypeScript services powering the analysis engine. PDF parsing, OCR, URL/email verification, and multi-agent AI systems that assess company authenticity and legitimacy with weighted scoring.

**Python Services** – Specialized analysis agents using the Anthropic SDK for sophisticated verification workflows. These agents extract, validate, and synthesize hiring data from multiple sources into actionable insights.

The platform works by analyzing hiring posts, company websites, and public records through AI agents that assign authenticity scores. Candidates see verified information before applying. Employers prove their credentials upfront.

## Tech Stack

### Frontend
- **Next.js 15** – Full-stack React framework with App Router
- **React 19** – Latest component model with hooks
- **TypeScript** – Type-safe development across the stack
- **Tailwind CSS** – Utility-first styling with dark mode support
- **Framer Motion** – Smooth animations and micro-interactions
- **React Hook Form** – Lightweight, performant form handling
- **Recharts** – Data visualization for hiring trends and analytics
- **Lucide React** – Clean, consistent icon system
- **React Dropzone** – File upload integration for resume/document handling

### Backend
- **TypeScript** – End-to-end type safety
- **PDF Parsing** – Extract structured data from hiring documents
- **OCR** – Read and validate scanned documents
- **URL/Email Parsing** – Verify company contact authenticity
- **Multi-Agent AI** – Anthropic SDK-powered analysis agents

### Python Services
- **Anthropic SDK** – AI-powered verification and analysis
- **Custom Agents** – Authenticity verification, company credibility analysis
- **Data Processing** – Structured extraction and validation

## Project Structure

```
verihire/
├── src/                    # Next.js frontend (React components, pages)
├── backend/                # TypeScript backend services
├── python/                 # Python verification agents
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS theme
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18+ (for Next.js 15)
- npm or yarn
- Python 3.10+ (for verification agents)
- Anthropic API key (for AI verification)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vanshika114/verihire.git
   cd verihire
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend runs on `http://localhost:3000`

### Backend Setup

Navigate to the `backend/` directory and follow its README for TypeScript services setup.

### Python Services Setup

Navigate to the `python/` directory and follow its README for verification agent setup.

## Development Rules

We maintain strict code quality standards:

- **No code deletion** – Version history is sacred. Refactor, don't remove.
- **TypeScript everywhere** – Full type safety across the stack.
- **Complete files only** – Partial implementations break the build. Deliver complete, working modules.

These rules keep the codebase stable, auditable, and collaborative.

## Key Features

### Company Verification
- Automated company legitimacy scoring
- Website authenticity analysis
- Contact information validation
- Business registration verification

### Hiring Post Analysis
- Salary range authenticity checks
- Job description pattern analysis
- Role comparison across companies
- Red flag detection for suspicious postings

### Candidate Intelligence
- Verified company profiles
- Historical salary data
- Company growth and stability metrics
- Role-specific hiring patterns

### Analytics Dashboard
- Hiring trends in India's tech market
- Company credibility rankings
- Role availability heatmaps
- Salary benchmarks by experience level

## Design Philosophy

VeriHire's interface reflects a premium dark aesthetic with subtle glassmorphism effects. The design prioritizes:

- **Information hierarchy** – Critical data surfaces first
- **Visual clarity** – Dark backgrounds reduce eye strain
- **Smooth transitions** – Micro-interactions make navigation feel intentional
- **Responsive design** – Seamless experience across devices

The frontend is built for candidates researching opportunities and employers building trust.

## Roadmap

**Current Focus**
- Core verification agent implementation
- Frontend dashboard development
- PDF and OCR pipeline refinement

**Next Phase**
- Real-time salary verification
- Historical hiring pattern analysis
- Integration with major Indian job boards

**Future Vision**
- Mobile app for candidate research
- Employer dashboard for credential management
- Community-driven company ratings and reviews
- API for third-party integrations


## The Vision

Hiring transparency isn't a feature; it's a foundation. Every candidate deserves to know what they're walking into. Every employer benefits from proving their legitimacy upfront. By automating verification and centralizing trust signals, VeriHire helps both sides make better decisions faster.

We're building the infrastructure that India's hiring market needs.

---
