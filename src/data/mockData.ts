import { Track, DayTask, StudentProfile, EdgeCaseType } from '../types';

export const MOCK_TRACKS: Track[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Web Engineering',
    tagline: 'React, Node.js, Express, REST APIs & Cloud Deployments',
    description: 'Master full-stack web engineering by building production-grade web applications, interactive dashboards, and scalable backend services.',
    techStack: ['React', 'Node.js', 'Express', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    enrolledStudents: 1420
  },
  {
    id: 'aiml',
    name: 'AI / ML & Data Engineering',
    tagline: 'Python, PyTorch, LLM Agents & Vector DBs',
    description: 'Build real-world AI applications, custom Gemini agent workflows, retrieval-augmented generation (RAG), and data pipelines.',
    techStack: ['Python', 'PyTorch', 'Gemini API', 'ChromaDB', 'FastAPI'],
    enrolledStudents: 980
  },
  {
    id: 'backend',
    name: 'Backend Systems & Architecture',
    tagline: 'Distributed Systems, Redis, Docker & Microservices',
    description: 'Focus on high-throughput backend services, rate limiters, memory management, caching, and database query optimization.',
    techStack: ['Go / Node', 'Docker', 'Redis', 'PostgreSQL', 'gRPC'],
    enrolledStudents: 750
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    tagline: 'React Native, Expo & Cross-Platform UI',
    description: 'Build fluid iOS and Android apps with native device capabilities, offline persistence, and smooth animations.',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'AsyncStorage'],
    enrolledStudents: 610
  }
];

export const MOCK_TASKS: Record<number, DayTask> = {
  1: {
    dayNumber: 1,
    title: 'Hello World & Environment Setup',
    trackId: 'fullstack',
    summary: 'Set up Node.js, Git, GitHub SSH keys, and initialize your first repository.',
    description: 'Welcome to Day 1 of the ABTalks 60-Day Challenge! Today is all about laying a solid foundation. You will configure your local development environment, set up Git credentials, write a simple CLI hello app, and publish your repository to GitHub.',
    learningObjectives: [
      'Configure Git with username & SSH key authentication',
      'Initialize a clean Node.js / TypeScript repository',
      'Create a comprehensive README.md with project badges',
      'Make your first verified GitHub commit and post your Day 1 milestone on LinkedIn'
    ],
    starterCode: `// day1.js\nconsole.log("Day 1/60 ABTalks Challenge Started!");\nconsole.log("Building in public for 60 consecutive days.");`,
    hints: [
      'Ensure your repository visibility is public so recruiters can review your code.',
      'Tag #ABTalks #60DaysOfCode #BuildInPublic in your LinkedIn post.'
    ],
    estimatedMinutes: 45,
    difficulty: 'Beginner',
    recruiterSkillTag: 'Git & Version Control'
  },
  11: {
    dayNumber: 11,
    title: 'Express Middleware & Async Request Validation',
    trackId: 'fullstack',
    summary: 'Build custom middleware to sanitize inputs, handle async errors, and log HTTP activity.',
    description: 'On Day 11, you take backend development a step further by writing custom Express middleware. You will implement request logger middleware, body validation using Zod/Joi, and a centralized error handling pipeline.',
    learningObjectives: [
      'Understand Express request-response middleware stack',
      'Implement custom request logging with timestamps',
      'Write input validation schema middleware',
      'Handle async errors without crashing Node.js runtime'
    ],
    starterCode: `import express from 'express';\nconst app = express();\n\n// TODO: Implement custom logger middleware\napp.use((req, res, next) => {\n  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);\n  next();\n});`,
    hints: [
      'Always call next() inside custom middleware unless ending the request.',
      'Test invalid payload submissions with Postman or cURL.'
    ],
    estimatedMinutes: 60,
    difficulty: 'Intermediate',
    recruiterSkillTag: 'Backend Middleware & Error Handling'
  },
  12: {
    dayNumber: 12,
    title: 'REST API Rate Limiter & Token Bucket Algorithm',
    trackId: 'fullstack',
    summary: 'Protect your Express API routes from DDoS and abuse using custom sliding-window rate limiting.',
    description: 'Day 12 Challenge: APIs in production face malicious spam and excessive requests. Today you will build a custom rate limiter middleware for Express using the sliding window or token bucket algorithm. You will return HTTP 429 Too Many Requests with header information (`X-RateLimit-Limit`, `X-RateLimit-Remaining`).',
    learningObjectives: [
      'Understand API rate limiting & sliding window algorithm',
      'Store IP request counts in memory with expiration timers',
      'Set custom HTTP response headers (`X-RateLimit-Reset`)',
      'Write automated test cases simulating 20 rapid requests per second'
    ],
    starterCode: `// Day 12: Express Rate Limiter Middleware
import express from 'express';

const app = express();
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const rateLimiter = (limit: number, windowMs: number) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const clientIp = req.ip || '127.0.0.1';
    const now = Date.now();
    const record = requestCounts.get(clientIp);

    if (!record || now > record.resetTime) {
      requestCounts.set(clientIp, { count: 1, resetTime: now + windowMs });
      res.setHeader('X-RateLimit-Remaining', limit - 1);
      return next();
    }

    if (record.count >= limit) {
      return res.status(429).json({
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Try again in ' + Math.ceil((record.resetTime - now)/1000) + 's'
      });
    }

    record.count++;
    res.setHeader('X-RateLimit-Remaining', limit - record.count);
    next();
  };
};

app.use('/api/', rateLimiter(10, 60000));`,
    hints: [
      'Make sure to calculate time remaining correctly in seconds.',
      'Document your rate limiting logic in your README.md with cURL example commands.'
    ],
    estimatedMinutes: 75,
    difficulty: 'Intermediate',
    recruiterSkillTag: 'REST API Security & Rate Limiting'
  },
  13: {
    dayNumber: 13,
    title: 'JWT Authentication & Bearer Token Middleware',
    trackId: 'fullstack',
    summary: 'Secure route handlers with JSON Web Tokens (JWT), token signing, and refresh logic.',
    description: 'Day 13 preview: Move from open API endpoints to protected authentication routes. You will implement password hashing with bcrypt, JWT access token generation, and authorization middleware.',
    learningObjectives: [
      'Hash user passwords securely with bcrypt',
      'Sign and verify JWT tokens with expiration claims',
      'Extract Bearer tokens from authorization headers'
    ],
    starterCode: `// Day 13 Preview Code...`,
    hints: ['Store JWT secrets in environment variables (.env).'],
    estimatedMinutes: 90,
    difficulty: 'Advanced',
    recruiterSkillTag: 'OAuth & Web Security'
  }
};

// Generate fallback placeholder tasks for days 1 to 60 if requested
for (let i = 1; i <= 60; i++) {
  if (!MOCK_TASKS[i]) {
    MOCK_TASKS[i] = {
      dayNumber: i,
      title: `Day ${i}: Advanced Engineering Milestone`,
      trackId: 'fullstack',
      summary: `Day ${i} task description and building hands-on coding solution.`,
      description: `In Day ${i} of the ABTalks challenge, you will deepen your software development skills by creating a verified module, testing it locally, and publishing your daily GitHub commit and LinkedIn post.`,
      learningObjectives: [
        'Master core software architecture principles',
        'Write clean modular code with TypeScript',
        'Maintain public learning consistency'
      ],
      hints: ['Review yesterday\'s code before starting.'],
      estimatedMinutes: 60,
      difficulty: i < 20 ? 'Beginner' : i < 40 ? 'Intermediate' : 'Advanced',
      recruiterSkillTag: 'Software Craftsmanship'
    };
  }
}

// Student Profiles matching Edge Cases
export const MOCK_PROFILES: Record<EdgeCaseType, StudentProfile> = {
  normal_day12: {
    id: 'std_01',
    name: 'Niharika',
    githubUsername: 'niharika-codes-dev',
    linkedinHandle: 'niharika-tech',
    college: 'IIT Delhi (Computer Science & Engineering)',
    yearOfStudy: '3rd Year B.Tech',
    trackId: 'fullstack',
    currentStreak: 12,
    highestStreak: 12,
    totalCompletedDays: 11,
    graceTokensRemaining: 2,
    isMissedDayWarning: false,
    joinedDate: '2026-07-28',
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    submissions: {
      11: {
        dayNumber: 11,
        githubUrl: 'https://github.com/rahul-codes-dev/abtalks-60days/commit/a8f2c01',
        linkedinUrl: 'https://linkedin.com/posts/rahulsharma-tech/day11-abtalks-express-middleware-activity-71829',
        reflectionText: 'Built custom Express request logger & Zod validator today. Learned how async middleware error handling works in Node.js runtime!',
        submittedAt: '2026-08-07T23:14:00Z',
        verified: true
      }
    },
    badges: [
      { id: 'b1', title: '7-Day Streak Warrior', description: 'Maintained 7 consecutive daily GitHub commits & LinkedIn posts', unlocked: true, unlockedAtDay: 7, iconName: 'Flame' },
      { id: 'b2', title: 'Git Machine', description: 'Pushed 10+ clean verified commits to GitHub', unlocked: true, unlockedAtDay: 10, iconName: 'GitCommit' },
      { id: 'b3', title: 'LinkedIn Legend', description: 'Shared 10 public proof-of-work updates with recruiters', unlocked: true, unlockedAtDay: 10, iconName: 'Share2' },
      { id: 'b4', title: 'Halfway Hero (30 Days)', description: 'Complete 30 days of the ABTalks challenge', unlocked: false, iconName: 'Award' },
      { id: 'b5', title: '60-Day ABTalks Legend', description: 'Finish the entire 60-day challenge and unlock Recruiter Direct Connect', unlocked: false, iconName: 'Trophy' }
    ]
  },
  day1_fresh: {
    id: 'std_02',
    name: 'Ananya Roy',
    githubUsername: 'ananya-roy',
    linkedinHandle: 'ananyaroy-dev',
    college: 'NIT Trichy (Information Technology)',
    yearOfStudy: '2nd Year B.Tech',
    trackId: 'fullstack',
    currentStreak: 0,
    highestStreak: 0,
    totalCompletedDays: 0,
    graceTokensRemaining: 2,
    isMissedDayWarning: false,
    joinedDate: '2026-08-08',
    completedDays: [],
    submissions: {},
    badges: [
      { id: 'b1', title: '7-Day Streak Warrior', description: 'Maintained 7 consecutive daily GitHub commits & LinkedIn posts', unlocked: false, iconName: 'Flame' },
      { id: 'b2', title: 'Git Machine', description: 'Pushed 10+ clean verified commits to GitHub', unlocked: false, iconName: 'GitCommit' },
      { id: 'b3', title: 'LinkedIn Legend', description: 'Shared 10 public proof-of-work updates with recruiters', unlocked: false, iconName: 'Share2' },
      { id: 'b4', title: 'Halfway Hero (30 Days)', description: 'Complete 30 days of the ABTalks challenge', unlocked: false, iconName: 'Award' },
      { id: 'b5', title: '60-Day ABTalks Legend', description: 'Finish the entire 60-day challenge and unlock Recruiter Direct Connect', unlocked: false, iconName: 'Trophy' }
    ]
  },
  missed_day: {
    id: 'std_03',
    name: 'Vikram Patel',
    githubUsername: 'vikram-p',
    linkedinHandle: 'vikrampatel-code',
    college: 'BITS Pilani (Electronics & Computer Science)',
    yearOfStudy: '3rd Year B.Tech',
    trackId: 'fullstack',
    currentStreak: 0,
    highestStreak: 11,
    totalCompletedDays: 11,
    graceTokensRemaining: 1,
    isMissedDayWarning: true, // Missed Day alert active!
    joinedDate: '2026-07-28',
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    submissions: {},
    badges: [
      { id: 'b1', title: '7-Day Streak Warrior', description: 'Maintained 7 consecutive daily GitHub commits & LinkedIn posts', unlocked: true, unlockedAtDay: 7, iconName: 'Flame' },
      { id: 'b2', title: 'Git Machine', description: 'Pushed 10+ clean verified commits to GitHub', unlocked: true, unlockedAtDay: 10, iconName: 'GitCommit' },
      { id: 'b3', title: 'LinkedIn Legend', description: 'Shared 10 public proof-of-work updates with recruiters', unlocked: true, unlockedAtDay: 10, iconName: 'Share2' },
      { id: 'b4', title: 'Halfway Hero (30 Days)', description: 'Complete 30 days of the ABTalks challenge', unlocked: false, iconName: 'Award' },
      { id: 'b5', title: '60-Day ABTalks Legend', description: 'Finish the entire 60-day challenge and unlock Recruiter Direct Connect', unlocked: false, iconName: 'Trophy' }
    ]
  },
  empty_profile: {
    id: 'std_04',
    name: 'New Student',
    githubUsername: '',
    linkedinHandle: '',
    college: 'Not specified yet',
    yearOfStudy: '1st Year',
    trackId: 'fullstack',
    currentStreak: 0,
    highestStreak: 0,
    totalCompletedDays: 0,
    graceTokensRemaining: 2,
    isMissedDayWarning: false,
    joinedDate: '2026-08-08',
    completedDays: [],
    submissions: {},
    badges: [
      { id: 'b1', title: '7-Day Streak Warrior', description: 'Maintained 7 consecutive daily GitHub commits & LinkedIn posts', unlocked: false, iconName: 'Flame' },
      { id: 'b2', title: 'Git Machine', description: 'Pushed 10+ clean verified commits to GitHub', unlocked: false, iconName: 'GitCommit' },
      { id: 'b3', title: 'LinkedIn Legend', description: 'Shared 10 public proof-of-work updates with recruiters', unlocked: false, iconName: 'Share2' }
    ]
  }
};

export const MOCK_RECRUITERS = [
  'Swiggy Engineering',
  'Razorpay Tech',
  'Flipkart Core',
  'PhonePe Systems',
  'CRED Platform',
  'Zomato AI'
];

export const MOCK_FAQS = [
  {
    q: 'How much time does the daily challenge require?',
    a: 'Around 45 to 90 minutes every night after college. Tasks are modular, hands-on, and designed for realistic learning.'
  },
  {
    q: 'What if I miss a day due to college exams or emergency?',
    a: 'Every student gets 2 Late-Night Grace Tokens per month. You can use a Grace Token within 24 hours to recover your broken streak.'
  },
  {
    q: 'Why GitHub Commit AND LinkedIn Post?',
    a: 'GitHub proves your actual code works and builds your developer portfolio. LinkedIn post builds public proof of work, making you visible to tech recruiters searching for consistent builders.'
  },
  {
    q: 'Is ABTalks completely free for Indian college students?',
    a: 'Yes, 100% free. ABTalks is built to empower college students across Tier 1, Tier 2, and Tier 3 engineering colleges in India.'
  }
];
