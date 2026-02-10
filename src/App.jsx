import React, { useState, useEffect } from 'react';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, Menu, X, BookOpen, Award, Sparkles, BrainCircuit, Loader2, AlertTriangle, Flame } from 'lucide-react';
// import { Analytics } from '@vercel/analytics/react'; // UNCOMMENT THIS LINE WHEN DEPLOYING TO VERCEL

/**
 * UNIVERSITY THEME CSS
 * Embedded directly to ensure it loads in all environments without file linking issues.
 */
const appStyles = `
/* --- VARIABLES --- */
:root {
  --primary-color: #1e40af; /* Deep University Blue */
  --primary-hover: #1e3a8a;
  --accent-color: #f59e0b;  /* Gold/Amber */
  --bg-gradient-start: #eff6ff;
  --bg-gradient-end: #dbeafe;
  --surface-color: rgba(255, 255, 255, 0.95);
  --text-dark: #1f2937;
  --text-medium: #6b7280;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --border-radius: 16px;
  --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* --- GLOBAL RESETS --- */
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-end) 100%);
  color: var(--text-dark);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

/* --- LAYOUT UTILITIES --- */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem;
  overflow: hidden;
}
.center-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

/* --- CARDS --- */
.card {
  background: var(--surface-color);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  border-top: 4px solid var(--primary-color);
  animation: slideUp 0.5s ease-out;
}
.quiz-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  margin: 0 auto;
  max-width: 800px;
  min-height: 400px;
}

/* --- TYPOGRAPHY --- */
h1 { font-size: 1.5rem; font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem; margin-top: 0; }
p { color: var(--text-medium); line-height: 1.5; margin: 0 0 1rem 0; }
.text-center { text-align: center; }
.text-bold { font-weight: 700; }
.text-primary { color: var(--primary-color); }

/* --- FORMS --- */
.form-group { margin-bottom: 1.5rem; }
.form-label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-dark); }
.form-input {
  width: 100%; padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; transition: all 0.2s;
}
.form-input:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.2); }

/* --- BUTTONS --- */
.btn {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.875rem;
  border: none; border-radius: 8px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: transform 0.1s, box-shadow 0.2s;
}
.btn:active { transform: scale(0.98); }
.btn-primary {
  background: linear-gradient(to right, var(--primary-color), var(--primary-hover));
  color: white; box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.4);
}
.btn-primary:hover { background: var(--primary-hover); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-nav {
  background: white; border: 1px solid #e5e7eb; color: var(--text-dark); width: auto; padding: 0.5rem 1.25rem;
}
.btn-nav:hover { background: #f9fafb; }
.btn-nav:disabled { opacity: 0.5; cursor: not-allowed; }

/* --- QUIZ UI --- */
.header {
  background: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 10;
}
.timer-badge {
  background: #eff6ff; color: var(--primary-color); padding: 0.5rem 1rem; border-radius: 999px;
  font-family: monospace; font-weight: bold; display: flex; align-items: center; gap: 0.5rem;
}
.timer-warning { background: #fef2f2; color: var(--danger-color); animation: pulse 1s infinite; }

.option-btn {
  width: 100%; text-align: left; padding: 1rem; margin-bottom: 0.75rem; border: 2px solid #e5e7eb;
  border-radius: 12px; background: white; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: all 0.2s;
}
.option-btn:hover { border-color: #bfdbfe; background: #eff6ff; }
.option-btn.selected {
  border-color: var(--primary-color); background: #eff6ff; box-shadow: 0 2px 4px rgba(30, 64, 175, 0.1);
}
.option-circle {
  width: 24px; height: 24px; border-radius: 50%; border: 2px solid #d1d5db; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.option-btn.selected .option-circle { border-color: var(--primary-color); }
.selected-dot { width: 12px; height: 12px; background: var(--primary-color); border-radius: 50%; }

/* --- SIDEBAR --- */
.quiz-layout { display: flex; height: 100vh; flex-direction: column; }
.sidebar {
  position: fixed; right: 0; top: 0; bottom: 0; width: 300px; background: white;
  box-shadow: -5px 0 15px rgba(0,0,0,0.05); z-index: 50; display: flex; flex-direction: column;
  transform: translateX(100%); transition: transform 0.3s ease;
}
.sidebar.open { transform: translateX(0); }
.main-content { flex: 1; overflow-y: auto; padding: 1rem; padding-bottom: 80px; }

@media (min-width: 768px) {
  .quiz-layout { padding-top: 0; flex-direction: row; }
  .header { position: relative; width: 100%; }
  .app-container { padding: 0; }
  .sidebar { position: relative; transform: none; width: 320px; border-left: 1px solid #e5e7eb; box-shadow: none; }
  .main-content { padding: 2rem; }
}

.palette-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; padding: 1.5rem; overflow-y: auto; }
.palette-btn {
  height: 40px; width: 100%; border-radius: 8px; border: 1px solid #e5e7eb; background: white; font-weight: 600; cursor: pointer;
}
.palette-btn.active { background: var(--primary-color); color: white; border-color: var(--primary-color); transform: scale(1.1); }
.palette-btn.answered { background: #d1fae5; color: #065f46; border-color: #10b981; }

/* --- RESULTS --- */
.score-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2rem; }
@media (min-width: 768px) { .score-grid { grid-template-columns: 1fr 1fr 1fr; } }
.score-box { background: white; padding: 1.5rem; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb; }
.score-value { display: block; font-size: 2rem; font-weight: 800; margin-top: 0.5rem; }
.pass { color: var(--success-color); }
.fail { color: var(--danger-color); }

/* --- ANIMATIONS --- */
@keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.fade-in { animation: fadeIn 0.5s ease-out; }
`;

/**
 * COURSE CONTENT: GNS 205 - Introduction to Entrepreneurial Studies
 * COMPREHENSIVE QUESTION BANK (100 QUESTIONS)
 */
const QUESTION_BANK = [
  // --- CONCEPT OF ENTREPRENEURSHIP (1-10) ---
  {
    id: 1,
    question: "Which of the following best distinguishes an 'Entrepreneur' from a 'Small Business Owner'?",
    options: [
      "The amount of capital invested in the business.",
      "The focus on innovation, growth, and seizing new opportunities.",
      "The number of employees hired within the first year.",
      "The legal structure of the business entity."
    ],
    answer: 1
  },
  {
    id: 2,
    question: "The process of 'Creative Destruction', where new innovative products replace outdated ones, was coined by which economist?",
    options: [
      "Adam Smith",
      "Joseph Schumpeter",
      "David Ricardo",
      "Peter Drucker"
    ],
    answer: 1
  },
  {
    id: 3,
    question: "An 'Intrapreneur' is accurately defined as:",
    options: [
      "An individual who leaves a corporate job to start a competitor company.",
      "A consultant hired to restructure a failing business.",
      "An employee who acts as an entrepreneur within a large organization.",
      "An investor who funds startups in exchange for equity."
    ],
    answer: 2
  },
  {
    id: 4,
    question: "Which of the following is NOT typically considered a psychological characteristic of successful entrepreneurs?",
    options: [
      "High need for achievement",
      "Internal locus of control",
      "Extreme risk aversion",
      "Tolerance for ambiguity"
    ],
    answer: 2
  },
  {
    id: 5,
    question: "The theory that entrepreneurs are 'born not made' is known as the:",
    options: [
      "Economic Theory",
      "Sociological Theory",
      "Trait Theory",
      "Resource-Based Theory"
    ],
    answer: 2
  },
  {
    id: 6,
    question: "Which term describes the specific mindset that allows entrepreneurs to identify opportunities where others see chaos?",
    options: [
      "Managerial Thinking",
      "Entrepreneurial Alertness",
      "Strategic Planning",
      "Risk Calculation"
    ],
    answer: 1
  },
  {
    id: 7,
    question: "Pull factors in entrepreneurship refer to:",
    options: [
      "Factors that force a person into business due to lack of options (e.g., poverty).",
      "Factors that attract a person to business due to opportunity (e.g., market gap).",
      "Government regulations that restrict business.",
      "Tax incentives for large corporations."
    ],
    answer: 1
  },
  {
    id: 8,
    question: "Innovation that creates a new market and value network and eventually disrupts an existing market is called:",
    options: [
      "Incremental Innovation",
      "Disruptive Innovation",
      "Process Innovation",
      "Service Innovation"
    ],
    answer: 1
  },
  {
    id: 9,
    question: "Which of the following is an example of 'Social Entrepreneurship'?",
    options: [
      "Starting a tech company to become a billionaire.",
      "Opening a micro-finance bank to alleviate poverty in rural areas.",
      "Buying shares in a multinational oil company.",
      "Running a family grocery store."
    ],
    answer: 1
  },
  {
    id: 10,
    question: "The 'Locus of Control' theory suggests that successful entrepreneurs believe:",
    options: [
      "Success is determined by luck or fate.",
      "They can control their own outcomes through their actions.",
      "Powerful others control their destiny.",
      "Market forces are entirely unpredictable."
    ],
    answer: 1
  },

  // --- BUSINESS LAW: CONTRACTS (11-25) ---
  {
    id: 11,
    question: "For a contract to be legally binding, which essential element represents the 'price' paid for a promise?",
    options: [
      "Consensus ad idem",
      "Consideration",
      "Capacity",
      "Legality"
    ],
    answer: 1
  },
  {
    id: 12,
    question: "A contract is classified as 'Voidable' if:",
    options: [
      "It lacks one of the essential elements of a valid contract.",
      "It is illegal from the very beginning.",
      "It is valid but can be set aside by one party due to defects like misrepresentation.",
      "It is unenforceable by law due to time lapse."
    ],
    answer: 2
  },
  {
    id: 13,
    question: "In the context of 'Capacity to Contract', which of the following contracts is generally enforceable against an Infant (Minor)?",
    options: [
      "Contracts for the repayment of money lent.",
      "Contracts for goods supplied (other than necessaries).",
      "Contracts for 'Necessaries' suited to their condition in life.",
      "Trading contracts involving substantial capital."
    ],
    answer: 2
  },
  {
    id: 14,
    question: "The legal principle 'Consensus ad idem' refers to:",
    options: [
      "The exchange of value between parties.",
      "The meeting of minds where parties agree on the same thing in the same sense.",
      "The written documentation of the agreement.",
      "The capacity of parties to sue."
    ],
    answer: 1
  },
  {
    id: 15,
    question: "Which of the following constitutes a valid 'Offer' in contract law?",
    options: [
      "A definite promise made with the intention to be bound.",
      "An invitation to treat (e.g., displaying goods in a shop window).",
      "A mere statement of intention to sell in the future.",
      "A request for information regarding price."
    ],
    answer: 0
  },
  {
    id: 16,
    question: "The 'Postal Rule' states that acceptance by post is effective when:",
    options: [
      "The letter is received by the offeror.",
      "The letter is read by the offeror.",
      "The letter is posted (stamped and addressed correctly).",
      "The offeror acknowledges receipt."
    ],
    answer: 2
  },
  {
    id: 17,
    question: "A counter-offer has the legal effect of:",
    options: [
      "Accepting the original offer.",
      "Destroying/Killing the original offer.",
      "Pausing the negotiation indefinitely.",
      "Creating a binding contract immediately."
    ],
    answer: 1
  },
  {
    id: 18,
    question: "Which of the following is NOT a method of discharging a contract?",
    options: [
      "Performance",
      "Agreement",
      "Frustration",
      "Inflation"
    ],
    answer: 3
  },
  {
    id: 19,
    question: "Consideration in a contract must move from the:",
    options: [
      "Promisee",
      "Promisor",
      "Third party",
      "Court"
    ],
    answer: 0
  },
  {
    id: 20,
    question: "If a contract involves the commission of a crime, it is considered:",
    options: [
      "Valid but voidable.",
      "Void ab initio (Illegal).",
      "Enforceable if written.",
      "Binding on the offeror only."
    ],
    answer: 1
  },
  {
    id: 21,
    question: "Specific Performance is an equitable remedy where the court orders:",
    options: [
      "The payment of damages.",
      "The party to carry out their contractual obligations.",
      "The cancellation of the contract.",
      "The imprisonment of the defaulter."
    ],
    answer: 1
  },
  {
    id: 22,
    question: "A 'Unilateral Contract' is one where:",
    options: [
      "Both parties make promises to each other.",
      "Only one party makes a promise (e.g., reward for lost item).",
      "The contract is written in one language.",
      "There is only one witness."
    ],
    answer: 1
  },
  {
    id: 23,
    question: "Which case established the principle of invitation to treat regarding goods on display?",
    options: [
      "Carlill v Carbolic Smoke Ball Co.",
      "Pharmaceutical Society of Great Britain v Boots Cash Chemists.",
      "Hyde v Wrench.",
      "Felthouse v Bindley."
    ],
    answer: 1
  },
  {
    id: 24,
    question: "Duress in contract law refers to:",
    options: [
      "Entering a contract under the influence of alcohol.",
      "Entering a contract due to actual or threatened violence.",
      "Entering a contract due to a mistake.",
      "Entering a contract with a minor."
    ],
    answer: 1
  },
  {
    id: 25,
    question: "Undue Influence presumes that one party:",
    options: [
      "Physically forced the other.",
      "Abused a position of trust or authority over the other.",
      "Bribed the other.",
      "Lied about the goods."
    ],
    answer: 1
  },

  // --- BUSINESS OWNERSHIP & STRUCTURES (26-40) ---
  {
    id: 26,
    question: "A key disadvantage of a General Partnership compared to a Limited Liability Company is:",
    options: [
      "Double taxation of profits.",
      "Excessive government regulation and filing requirements.",
      "Unlimited joint and several liability of partners.",
      "Inability to combine skills and expertise."
    ],
    answer: 2
  },
  {
    id: 27,
    question: "The document that regulates the internal management and proceedings of a company is the:",
    options: [
      "Memorandum of Association",
      "Articles of Association",
      "Certificate of Incorporation",
      "Prospectus"
    ],
    answer: 1
  },
  {
    id: 28,
    question: "In a Public Limited Company (PLC), the ownership is separated from control. Who owns the company?",
    options: [
      "The Board of Directors",
      "The Managing Director",
      "The Shareholders",
      "The Debenture holders"
    ],
    answer: 2
  },
  {
    id: 29,
    question: "Which acronym represents the government agency responsible for business registration in Nigeria?",
    options: [
      "NAFDAC",
      "CAC (Corporate Affairs Commission)",
      "SON (Standards Organization of Nigeria)",
      "EFCC"
    ],
    answer: 1
  },
  {
    id: 30,
    question: "Which document defines the relationship between a company and the outside world (Name, Object, Capital)?",
    options: [
      "Articles of Association",
      "Memorandum of Association",
      "Shareholders Agreement",
      "Internal Audit Report"
    ],
    answer: 1
  },
  {
    id: 31,
    question: "The concept of 'Limited Liability' protects shareholders by:",
    options: [
      "Guaranteeing a return on investment.",
      "Limiting their losses to the amount unpaid on their shares.",
      "Allowing them to manage the daily affairs of the company.",
      "Exempting them from paying personal income tax."
    ],
    answer: 1
  },
  {
    id: 32,
    question: "Which business entity has a 'perpetual succession'?",
    options: [
      "Sole Proprietorship",
      "General Partnership",
      "Limited Liability Company",
      "Joint Venture"
    ],
    answer: 2
  },
  {
    id: 33,
    question: "The principle of 'Separate Legal Personality' was established in the case of:",
    options: [
      "Carlill v Carbolic Smoke Ball Co.",
      "Salomon v Salomon & Co Ltd.",
      "Donoghue v Stevenson.",
      "Balfour v Balfour."
    ],
    answer: 1
  },
  {
    id: 34,
    question: "Which is a valid ground for the dissolution of a partnership?",
    options: [
      "Bankruptcy of a partner.",
      "A partner taking a vacation.",
      "Disagreement on lunch choices.",
      "Hiring a new employee."
    ],
    answer: 0
  },
  {
    id: 35,
    question: "The 'Doctrine of Ultra Vires' refers to:",
    options: [
      "Acts committed by a company beyond its legal powers/objects.",
      "The unlimited power of the directors.",
      "The rights of shareholders to vote.",
      "The dissolution of a partnership."
    ],
    answer: 0
  },
  {
    id: 36,
    question: "A Cooperative Society is primarily formed to:",
    options: [
      "Maximize profit for shareholders.",
      "Promote the economic interest of its members.",
      "Evade taxes.",
      "Control the market price of goods."
    ],
    answer: 1
  },
  {
    id: 37,
    question: "The minimum number of persons required to form a private limited company in Nigeria is:",
    options: [
      "One (1) - under current CAMA 2020",
      "Seven (7)",
      "Fifty (50)",
      "Two (2) - under old law"
    ],
    answer: 0
  },
  {
    id: 38,
    question: "A Franchise is best described as:",
    options: [
      "A government grant to operate in a specific area.",
      "A licensing arrangement to use a firm's business model and brand.",
      "A merger between two large companies.",
      "A type of illegal pyramid scheme."
    ],
    answer: 1
  },
  {
    id: 39,
    question: "Which of the following is NOT required for business registration with CAC?",
    options: [
      "Proposed Company Name",
      "Names of Directors",
      "Passport of the President of Nigeria",
      "Share Capital details"
    ],
    answer: 2
  },
  {
    id: 40,
    question: "The highest decision-making body in a Cooperative Society is:",
    options: [
      "The Management Committee",
      "The Annual General Meeting (AGM)",
      "The President",
      "The Treasurer"
    ],
    answer: 1
  },

  // --- MANAGEMENT PRINCIPLES (41-55) ---
  {
    id: 41,
    question: "SWOT Analysis is a strategic planning tool. Which two components are considered 'Internal' factors?",
    options: [
      "Opportunities and Threats",
      "Strengths and Weaknesses",
      "Strengths and Opportunities",
      "Weaknesses and Threats"
    ],
    answer: 1
  },
  {
    id: 42,
    question: "The management function that involves monitoring performance and correcting deviations from standards is:",
    options: [
      "Planning",
      "Organizing",
      "Leading",
      "Controlling"
    ],
    answer: 3
  },
  {
    id: 43,
    question: "Which level of management is primarily responsible for strategic, long-term decision making?",
    options: [
      "Top-level Management",
      "Middle-level Management",
      "First-line Management",
      "Operational Staff"
    ],
    answer: 0
  },
  {
    id: 44,
    question: "Efficiency in management is best described as:",
    options: [
      "Doing the right things (achieving goals).",
      "Doing things right (minimizing waste and resources).",
      "Maximizing market share regardless of cost.",
      "Increasing employee turnover."
    ],
    answer: 1
  },
  {
    id: 45,
    question: "The hierarchy of needs theory was proposed by:",
    options: [
      "Frederick Taylor",
      "Abraham Maslow",
      "Henri Fayol",
      "Douglas McGregor"
    ],
    answer: 1
  },
  {
    id: 46,
    question: "Delegation of authority involves:",
    options: [
      "Transferring responsibility and authority to subordinates.",
      "The manager doing all the work.",
      "Removing all authority from lower levels.",
      "Firing employees."
    ],
    answer: 0
  },
  {
    id: 47,
    question: "Corporate Governance refers to:",
    options: [
      "The government's control of a company.",
      "The system of rules, practices, and processes by which a firm is directed and controlled.",
      "The marketing strategy of a corporation.",
      "The recruitment of staff."
    ],
    answer: 1
  },
  {
    id: 48,
    question: "Conflict resolution in a workplace is best achieved through:",
    options: [
      "Immediate dismissal of involved parties.",
      "Collective bargaining and negotiation.",
      "Ignoring the issue until it fades.",
      "Strict authoritarian rule."
    ],
    answer: 1
  },
  {
    id: 49,
    question: "Theory X managers assume that employees:",
    options: [
      "Enjoy work and seek responsibility.",
      "Are creative and self-motivated.",
      "Dislike work and need to be coerced/controlled.",
      "Are driven only by social needs."
    ],
    answer: 2
  },
  {
    id: 50,
    question: "The 'Span of Control' refers to:",
    options: [
      "The number of subordinates a manager can effectively supervise.",
      "The geographical area a manager controls.",
      "The number of hours a manager works.",
      "The budget limit for a department."
    ],
    answer: 0
  },
  {
    id: 51,
    question: "Which management function involves grouping activities and resources to achieve objectives?",
    options: [
      "Planning",
      "Organizing",
      "Motivating",
      "Controlling"
    ],
    answer: 1
  },
  {
    id: 52,
    question: "SMART goals stands for:",
    options: [
      "Specific, Measurable, Achievable, Relevant, Time-bound",
      "Strategic, Money, Action, Risk, Team",
      "Simple, Meaningful, Actionable, Real, Tested",
      "Speed, Motion, Accuracy, Result, Time"
    ],
    answer: 0
  },
  {
    id: 53,
    question: "Scientific Management, focusing on workflow efficiency, is associated with:",
    options: [
      "Elton Mayo",
      "Frederick Taylor",
      "Max Weber",
      "Peter Senge"
    ],
    answer: 1
  },
  {
    id: 54,
    question: "Communication that flows from subordinates to superiors is called:",
    options: [
      "Downward Communication",
      "Upward Communication",
      "Horizontal Communication",
      "Diagonal Communication"
    ],
    answer: 1
  },
  {
    id: 55,
    question: "The process of attracting, selecting, and training employees is known as:",
    options: [
      "Marketing",
      "Production",
      "Staffing / HRM",
      "Logistics"
    ],
    answer: 2
  },

  // --- MARKETING & FEASIBILITY (56-70) ---
  {
    id: 56,
    question: "In the Marketing Mix (4Ps), 'Place' refers to:",
    options: [
      "The physical location of the CEO's office.",
      "Distribution channels and logistics to reach the customer.",
      "The placement of advertisements on billboards.",
      "The market share of the competitor."
    ],
    answer: 1
  },
  {
    id: 57,
    question: "Market Segmentation based on 'Psychographics' analyzes consumers based on:",
    options: [
      "Age, gender, and income levels.",
      "Geographic location and climate.",
      "Lifestyle, values, personality, and interests.",
      "Usage rate and brand loyalty."
    ],
    answer: 2
  },
  {
    id: 58,
    question: "A Feasibility Study is primarily conducted to:",
    options: [
      "Secure immediate bank loans before having an idea.",
      "Assess the viability and potential success of a business idea.",
      "Design the company logo and brand colors.",
      "Recruit the initial staff members."
    ],
    answer: 1
  },
  {
    id: 59,
    question: "Which pricing strategy involves setting a low initial price to gain market share quickly?",
    options: [
      "Price Skimming",
      "Penetration Pricing",
      "Premium Pricing",
      "Psychological Pricing"
    ],
    answer: 1
  },
  {
    id: 60,
    question: "Which of these is a 'Demographic' segmentation variable?",
    options: [
      "Personality",
      "Social Class",
      "Education Level",
      "Brand Loyalty"
    ],
    answer: 2
  },
  {
    id: 61,
    question: "A unique selling proposition (USP) is:",
    options: [
      "The lowest price in the market.",
      "A factor that differentiates a product from its competitors.",
      "A government license to sell.",
      "A marketing budget."
    ],
    answer: 1
  },
  {
    id: 62,
    question: "Which marketing concept holds that consumers favor products that offer the most quality, performance, and features?",
    options: [
      "Production Concept",
      "Product Concept",
      "Selling Concept",
      "Marketing Concept"
    ],
    answer: 1
  },
  {
    id: 63,
    question: "The 'Executive Summary' of a business plan should be written:",
    options: [
      "First, before anything else.",
      "Last, after the entire plan is written.",
      "In the middle of the financial section.",
      "It is optional."
    ],
    answer: 1
  },
  {
    id: 64,
    question: "Primary Data in market research refers to:",
    options: [
      "Data already collected by others (e.g., government reports).",
      "Data collected directly by the entrepreneur for a specific purpose (e.g., surveys).",
      "Data from the internet.",
      "Data from textbooks."
    ],
    answer: 1
  },
  {
    id: 65,
    question: "Which stage of the Product Life Cycle typically sees the highest profits?",
    options: [
      "Introduction",
      "Growth",
      "Maturity",
      "Decline"
    ],
    answer: 2
  },
  {
    id: 66,
    question: "A niche market is:",
    options: [
      "A very large market with many competitors.",
      "A small, specialized segment of the market.",
      "A market regulated by the government.",
      "An international market."
    ],
    answer: 1
  },
  {
    id: 67,
    question: "Brand Equity refers to:",
    options: [
      "The cost of the logo.",
      "The commercial value derived from consumer perception of the brand name.",
      "The salary of the marketing manager.",
      "The number of products sold."
    ],
    answer: 1
  },
  {
    id: 68,
    question: "Which component of the business plan details the production process and location?",
    options: [
      "Marketing Plan",
      "Operational/Technical Plan",
      "Financial Plan",
      "Organizational Plan"
    ],
    answer: 1
  },
  {
    id: 69,
    question: "Promotion in the Marketing Mix includes:",
    options: [
      "Product design.",
      "Advertising, Sales Promotion, and Public Relations.",
      "Distribution channels.",
      "Pricing strategies."
    ],
    answer: 1
  },
  {
    id: 70,
    question: "Guerilla Marketing relies on:",
    options: [
      "Huge budgets and TV ads.",
      "Unconventional, low-cost tactics to gain attention.",
      "Government support.",
      "Strict corporate rules."
    ],
    answer: 1
  },

  // --- FINANCE & ACCOUNTING (71-85) ---
  {
    id: 71,
    question: "Which of the following is considered an internal source of equity capital?",
    options: [
      "Bank Overdraft",
      "Trade Credit",
      "Retained Earnings",
      "Debentures"
    ],
    answer: 2
  },
  {
    id: 72,
    question: "Break-Even Point is the level of production where:",
    options: [
      "Total Revenue exceeds Total Costs.",
      "Total Costs exceed Total Revenue.",
      "Total Revenue equals Total Costs (No profit, no loss).",
      "Variable costs are zero."
    ],
    answer: 2
  },
  {
    id: 73,
    question: "Working Capital Management focuses on:",
    options: [
      "Managing long-term assets like buildings.",
      "Managing current assets and current liabilities.",
      "Structuring the company's long-term debt.",
      "Calculating income tax."
    ],
    answer: 1
  },
  {
    id: 74,
    question: "Which financial statement shows a company's financial position (Assets = Liabilities + Equity) at a specific point in time?",
    options: [
      "Income Statement (Profit & Loss)",
      "Cash Flow Statement",
      "Balance Sheet",
      "Statement of Retained Earnings"
    ],
    answer: 2
  },
  {
    id: 75,
    question: "Bootstrap financing refers to:",
    options: [
      "Raising millions from the stock market.",
      "Starting a business with little capital, using personal finances and revenue.",
      "Getting a large loan from the World Bank.",
      "Buying a franchise."
    ],
    answer: 1
  },
  {
    id: 76,
    question: "An 'Angel Investor' is typically:",
    options: [
      "A wealthy individual investing personal funds into a startup.",
      "A government grant officer.",
      "A bank loan officer.",
      "A corporate entity buying a competitor."
    ],
    answer: 0
  },
  {
    id: 77,
    question: "Which of these is a Fixed Asset?",
    options: [
      "Inventory",
      "Accounts Receivable",
      "Machinery",
      "Cash"
    ],
    answer: 2
  },
  {
    id: 78,
    question: "Depreciation is defined as:",
    options: [
      "The increase in value of land.",
      "The allocation of the cost of a tangible asset over its useful life.",
      "The profit made from sales.",
      "The cash in the bank."
    ],
    answer: 1
  },
  {
    id: 79,
    question: "A 'Cash Flow Statement' tracks:",
    options: [
      "Accrued expenses only.",
      "The actual inflow and outflow of cash in the business.",
      "Projected profits for next year.",
      "Employee salaries."
    ],
    answer: 1
  },
  {
    id: 80,
    question: "Liquidity ratios measure:",
    options: [
      "Long-term solvency.",
      "A company's ability to pay off short-term debts.",
      "Profitability relative to sales.",
      "Return on investment."
    ],
    answer: 1
  },
  {
    id: 81,
    question: "Venture Capitalists typically invest in:",
    options: [
      "Low-risk, low-return established companies.",
      "High-growth potential startups in exchange for equity.",
      "Government bonds only.",
      "Non-profit organizations."
    ],
    answer: 1
  },
  {
    id: 82,
    question: "Collateral is:",
    options: [
      "An asset pledged by a borrower to secure a loan.",
      "A partner in the business.",
      "A type of bank account.",
      "Interest paid on savings."
    ],
    answer: 0
  },
  {
    id: 83,
    question: "Which of these is a Variable Cost?",
    options: [
      "Rent of the factory.",
      "Insurance premiums.",
      "Raw materials.",
      "Manager's fixed salary."
    ],
    answer: 2
  },
  {
    id: 84,
    question: "ROI stands for:",
    options: [
      "Rate of Inflation",
      "Return on Investment",
      "Risk of Investment",
      "Revenue on Interest"
    ],
    answer: 1
  },
  {
    id: 85,
    question: "Debt Financing involves:",
    options: [
      "Selling shares of ownership.",
      "Borrowing money that must be repaid with interest.",
      "Using personal savings.",
      "Reinvesting profits."
    ],
    answer: 1
  },

  // --- AGENCY, INDUSTRIAL LAW & ETHICS (86-100) ---
  {
    id: 86,
    question: "The primary purpose of a 'Trade Union' is to:",
    options: [
      "Maximize shareholder profits.",
      "Regulate the relationship between employers and the government.",
      "Protect and advance the interests of workers regarding wages and conditions.",
      "Provide legal defense for criminal acts of employees."
    ],
    answer: 2
  },
  {
    id: 87,
    question: "Vicarious Liability in industrial law implies that:",
    options: [
      "An employee is liable for the employer's debts.",
      "An employer can be held liable for torts committed by employees in the course of employment.",
      "Trade unions are liable for the actions of the government.",
      "Employees are immune from all legal prosecution."
    ],
    answer: 1
  },
  {
    id: 88,
    question: "In the context of agency law, a 'Del Credere' agent:",
    options: [
      "Has no authority to sign contracts.",
      "Guarantees the solvency of the third party to the principal for an extra commission.",
      "Only introduces parties but does not negotiate.",
      "Acts on behalf of the government."
    ],
    answer: 1
  },
  {
    id: 89,
    question: "A 'Patent' grants the holder protection for:",
    options: [
      "Artistic and literary works.",
      "Brand names and logos.",
      "New inventions and industrial processes.",
      "Trade secrets only."
    ],
    answer: 2
  },
  {
    id: 90,
    question: "Under the Sale of Goods Act, 'Caveat Emptor' means:",
    options: [
      "Let the seller beware",
      "Let the buyer beware",
      "Goods must match the sample",
      "Ownership passes on delivery"
    ],
    answer: 1
  },
  {
    id: 91,
    question: "A 'Copyright' protects:",
    options: [
      "Logos and Slogans.",
      "Original literary, dramatic, musical, and artistic works.",
      "Mechanical inventions.",
      "Business ideas in the head."
    ],
    answer: 1
  },
  {
    id: 92,
    question: "Ethical behavior in business includes:",
    options: [
      "Insider trading.",
      "False advertising.",
      "Transparency, fairness, and compliance with laws.",
      "Exploiting loopholes."
    ],
    answer: 2
  },
  {
    id: 93,
    question: "An agency relationship can be created by:",
    options: [
      "Estoppel/Holding out.",
      "Ratification.",
      "Express agreement.",
      "All of the above."
    ],
    answer: 3
  },
  {
    id: 94,
    question: "Collective Bargaining is a process between:",
    options: [
      "Competitors in the market.",
      "Employers and Employee representatives (Unions).",
      "Government and foreign investors.",
      "Buyers and Sellers."
    ],
    answer: 1
  },
  {
    id: 95,
    question: "The duty of an Agent to his Principal includes:",
    options: [
      "Making secret profits.",
      "Delegating duties without permission.",
      "Acting in good faith and avoiding conflict of interest.",
      "Competing with the principal."
    ],
    answer: 2
  },
  {
    id: 96,
    question: "Which of the following acts protects consumers from dangerous products in Nigeria?",
    options: [
      "CAMA 2020",
      "Consumer Protection Council Act (now FCCPC).",
      "Land Use Act.",
      "Labour Act."
    ],
    answer: 1
  },
  {
    id: 97,
    question: "Corporate Social Responsibility (CSR) argues that businesses should:",
    options: [
      "Focus only on profit.",
      "Contribute to the well-being of the society and environment.",
      "Ignore laws if they reduce profit.",
      "Only pay taxes."
    ],
    answer: 1
  },
  {
    id: 98,
    question: "A 'Trademark' is used to:",
    options: [
      "Protect an invention.",
      "Protect a brand name, logo, or slogan.",
      "Protect a book.",
      "Protect a secret recipe."
    ],
    answer: 1
  },
  {
    id: 99,
    question: "The termination of an agency by the 'Operation of Law' occurs upon:",
    options: [
      "Death or Insanity of either party.",
      "Mutual agreement.",
      "Completion of the task.",
      "Revocation by the Principal."
    ],
    answer: 0
  },
  {
    id: 100,
    question: "Which document contains the rules for the internal running of a Trade Union?",
    options: [
      "The Constitution/Rule Book",
      "The Memorandum of Association",
      "The Business Plan",
      "The Company Act"
    ],
    answer: 0
  }
];

// Configuration
const EXAM_DURATION_MINUTES = 20;
const QUESTIONS_PER_SESSION = 35;
const COURSE_TITLE = "GNS 205: Intro to Entrepreneurial Studies";
const apiKey = ""; // API Key injected by environment

// --- UTILS ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- STANDALONE COMPONENTS ---

const StartScreen = ({ studentName, setStudentName, regNumber, setRegNumber, onStart }) => {
  return (
    <div className="center-screen fade-in">
      <div className="card">
        <div className="text-center" style={{marginBottom: '2rem'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
            width: '64px', height: '64px', background: '#eff6ff', borderRadius: '50%', 
            marginBottom: '1rem', color: 'var(--primary-color)'
          }}>
            <BookOpen size={32} />
          </div>
          <h1>{COURSE_TITLE}</h1>
          <p>CBT Assessment Simulation</p>
        </div>

        <form onSubmit={onStart}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              required
              type="text" 
              className="form-input"
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Registration Number</label>
            <input 
              required
              type="text" 
              className="form-input"
              placeholder="e.g. 2024/GNS/001"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </div>

          <div style={{
            background: '#eff6ff', padding: '1rem', borderRadius: '8px', 
            fontSize: '0.875rem', color: 'var(--primary-color)', marginBottom: '1.5rem',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{marginBottom: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Clock size={16}/> Duration: {EXAM_DURATION_MINUTES} Minutes
            </p>
            <p style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <CheckCircle size={16}/> Questions: {QUESTIONS_PER_SESSION} (Randomized)
            </p>
            <p style={{fontSize: '0.75rem', opacity: 0.8}}>
              * Standard Marking: +2 Correct, -1 Wrong
            </p>
          </div>

          <button type="submit" className="btn btn-primary">
            Proceed to Exam
          </button>
        </form>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ studentName, onProceed }) => (
  <div className="center-screen fade-in">
    <div className="card text-center">
      <div style={{marginBottom: '1.5rem'}}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', 
          width: '80px', height: '80px', background: '#eff6ff', borderRadius: '50%', 
          marginBottom: '1rem', color: 'var(--primary-color)', animation: 'pulse 2s infinite'
        }}>
          <Flame size={40} />
        </div>
        <h1 style={{fontSize: '2rem'}}>Welcome, {studentName}!</h1>
        <p style={{fontSize: '1.25rem', fontStyle: 'italic', fontWeight: 500}}>
          "Fire on 🔥"
        </p>
      </div>
      
      <div style={{
        background: '#eff6ff', padding: '1.5rem', borderRadius: '12px', 
        textAlign: 'left', marginBottom: '1.5rem', border: '1px solid #bfdbfe'
      }}>
        <p className="text-bold text-primary" style={{borderBottom: '1px solid #bfdbfe', paddingBottom: '0.5rem', marginBottom: '1rem'}}>
          Assessment Rules:
        </p>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <CheckCircle size={18} color="var(--success-color)" /> 
            <span><strong>+2 Points</strong> for every correct answer.</span>
          </li>
          <li style={{marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <AlertTriangle size={18} color="var(--danger-color)" />
            <span><strong>-1 Point</strong> for every wrong answer.</span>
          </li>
          <li style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <Clock size={18} color="var(--primary-color)" />
            <span><strong>{EXAM_DURATION_MINUTES} minutes</strong> for {QUESTIONS_PER_SESSION} questions.</span>
          </li>
        </ul>
      </div>

      <button onClick={onProceed} className="btn btn-primary" style={{padding: '1rem'}}>
        Start Now <ChevronRight size={20} />
      </button>
    </div>
  </div>
);

const ResultScreen = ({ studentName, answers, questions, onRestart }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      const userAns = answers[q.id];
      if (userAns !== undefined) {
         if (userAns === q.answer) {
           score += 2; // Correct
         } else {
           score -= 1; // Wrong (Negative marking)
         }
      }
      // Unanswered questions get 0 change
    });
    return score;
  };

  const score = calculateScore();
  const maxPossibleScore = questions.length * 2;
  const percentage = Math.round((Math.max(0, score) / maxPossibleScore) * 100);
  const passed = percentage >= 50;

  // AI State
  const [explanations, setExplanations] = useState({});
  const [loadingExplanations, setLoadingExplanations] = useState({});
  const [studyPlan, setStudyPlan] = useState(null);
  const [loadingStudyPlan, setLoadingStudyPlan] = useState(false);

  const generateExplanation = async (questionId) => {
      const question = questions.find(q => q.id === questionId);
      const userAnsIndex = answers[questionId];
      const correctAnsIndex = question.answer;
      
      if (!question) return;

      setLoadingExplanations(prev => ({...prev, [questionId]: true}));
      
      try {
          const prompt = `
              You are a concise academic tutor for the course GNS 205 (Entrepreneurship). 
              Question: "${question.question}"
              Correct Answer: "${question.options[correctAnsIndex]}"
              Student's Answer: "${userAnsIndex !== undefined ? question.options[userAnsIndex] : "No answer provided"}"
              
              Explain in 2 sentences why the correct answer is right.
          `;

          const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      contents: [{ parts: [{ text: prompt }] }]
                  })
              }
          );

          const data = await response.json();
          const explanationText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate explanation.";
          
          setExplanations(prev => ({...prev, [questionId]: explanationText}));

      } catch (error) {
          console.error("AI Error:", error);
          setExplanations(prev => ({...prev, [questionId]: "Error connecting to AI tutor."}));
      } finally {
          setLoadingExplanations(prev => ({...prev, [questionId]: false}));
      }
  };

  const generateStudyPlan = async () => {
      setLoadingStudyPlan(true);
      try {
          const missedQuestions = questions.filter(q => answers[q.id] !== q.answer);
          const missedTopics = missedQuestions.slice(0, 5).map(q => q.question).join("; ");
          
          const prompt = `
              You are a strict but encouraging academic mentor. 
              The student took a test on "GNS 205: Entrepreneurial Studies" and scored ${score}/${maxPossibleScore}.
              They struggled with these questions: ${missedTopics || "None, perfect score"}.
              
              Generate a 3-point bulleted study plan (HTML formatted using <li> tags) specific to Entrepreneurship principles.
              Keep it concise.
          `;

            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
              {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      contents: [{ parts: [{ text: prompt }] }]
                  })
              }
          );
          
          const data = await response.json();
          const planText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate plan.";
          setStudyPlan(planText);

      } catch (error) {
          setStudyPlan("Could not generate study plan at this time.");
      } finally {
          setLoadingStudyPlan(false);
      }
  };

  return (
    <div className="app-container fade-in" style={{overflowY: 'auto'}}>
      <div className="card" style={{maxWidth: '900px', margin: '2rem auto', padding: '0'}}>
        <div style={{
          background: passed ? 'var(--success-color)' : 'var(--danger-color)', 
          color: 'white', padding: '2rem', textAlign: 'center',
          borderTopLeftRadius: 'var(--border-radius)', borderTopRightRadius: 'var(--border-radius)'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)', width: '80px', height: '80px', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <Award size={40} />
          </div>
          <h2 style={{fontSize: '2rem', margin: '0 0 0.5rem 0'}}>Assessment Completed</h2>
          <p style={{color: 'rgba(255,255,255,0.9)'}}>Thank you for participating, {studentName}</p>
        </div>

        <div style={{padding: '2rem'}}>
          <div className="score-grid">
            <div className="score-box">
              <span>Total Score</span>
              <span className={`score-value ${passed ? 'pass' : 'fail'}`}>
                {score} <span style={{fontSize: '1rem', color: '#9ca3af'}}>/ {maxPossibleScore}</span>
              </span>
              <span className="block text-xs text-gray-400 mt-1">
                (+2 correct, -1 wrong)
              </span>
            </div>
            <div className="score-box">
              <span>Percentage</span>
              <span className={`score-value ${passed ? 'pass' : 'fail'}`}>{percentage}%</span>
            </div>
            <div className="score-box">
              <span>Status</span>
              <span className={`score-value ${passed ? 'pass' : 'fail'}`}>
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>

          {/* AI Study Plan Section */}
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem'
          }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
                  <div>
                      <h3 style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e3a8a', margin: 0}}>
                          <BrainCircuit size={20}/> AI Performance Coach
                      </h3>
                      <p style={{margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#1e40af'}}>
                        Get a personalized study plan based on your mistakes.
                      </p>
                  </div>
                  {!studyPlan && (
                      <button 
                          onClick={generateStudyPlan}
                          disabled={loadingStudyPlan}
                          className="btn btn-primary"
                          style={{width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem'}}
                      >
                          {loadingStudyPlan ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                          {loadingStudyPlan ? 'Analyzing...' : 'Generate Plan ✨'}
                      </button>
                  )}
              </div>

              {studyPlan && (
                  <div style={{marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #bfdbfe'}}>
                        <h4 style={{fontSize: '0.875rem', textTransform: 'uppercase', color: '#1e40af', marginBottom: '0.5rem'}}>Your Strategy:</h4>
                        <div style={{color: '#1e3a8a', lineHeight: '1.6'}} dangerouslySetInnerHTML={{ __html: studyPlan.replace(/\n/g, '<br/>').replace(/- /g, '• ') }} />
                  </div>
              )}
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <h3 style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem'}}>Review Answers</h3>
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer;
              const isUnanswered = userAnswer === undefined;
              
              let borderColor = isCorrect ? 'var(--success-color)' : (isUnanswered ? '#e5e7eb' : 'var(--danger-color)');
              let bgTint = isCorrect ? '#ecfdf5' : (isUnanswered ? '#f9fafb' : '#fef2f2');

              return (
                <div key={q.id} style={{
                  border: `1px solid ${borderColor}`, background: bgTint, borderRadius: '12px', padding: '1.5rem'
                }}>
                  <div style={{display: 'flex', gap: '1rem'}}>
                    <span style={{fontWeight: 700, color: '#4b5563'}}>{idx + 1}.</span>
                    <div style={{flex: 1}}>
                      <p style={{fontWeight: 600, color: '#111827', marginBottom: '1rem'}}>{q.question}</p>
                      
                      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
                        {q.options.map((opt, optIdx) => {
                          let style = { padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white', fontSize: '0.875rem' };
                          
                          if (optIdx === q.answer) {
                            style.background = '#d1fae5'; style.borderColor = '#34d399'; style.color = '#065f46'; style.fontWeight = 'bold';
                          } else if (optIdx === userAnswer && !isCorrect) {
                            style.background = '#fee2e2'; style.borderColor = '#f87171'; style.color = '#991b1b';
                          }
                          
                          return <div key={optIdx} style={style}>{opt}</div>;
                        })}
                      </div>
                      
                      <div style={{marginTop: '0.75rem', fontSize: '0.75rem', fontWeight: 'bold'}}>
                         {isCorrect && <span style={{color: 'var(--success-color)'}}>+2 Points</span>}
                         {!isCorrect && !isUnanswered && <span style={{color: 'var(--danger-color)'}}>-1 Point</span>}
                         {isUnanswered && <span style={{color: '#6b7280'}}>0 Points (Skipped)</span>}
                      </div>

                      {!explanations[q.id] && (
                          <button 
                              onClick={() => generateExplanation(q.id)}
                              disabled={loadingExplanations[q.id]}
                              style={{
                                background: 'none', border: 'none', color: 'var(--primary-color)', 
                                fontWeight: 600, fontSize: '0.75rem', marginTop: '0.5rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.25rem'
                              }}
                          >
                              {loadingExplanations[q.id] ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />}
                              {loadingExplanations[q.id] ? "Thinking..." : "Explain Answer ✨"}
                          </button>
                      )}

                      {explanations[q.id] && (
                          <div style={{
                            marginTop: '0.75rem', background: '#eff6ff', padding: '0.75rem', 
                            borderRadius: '8px', fontSize: '0.875rem', color: '#1e3a8a', border: '1px solid #bfdbfe'
                          }}>
                              <strong style={{fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                                  <Sparkles size={10} /> AI Explanation
                              </strong>
                              {explanations[q.id]}
                          </div>
                      )}

                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{marginTop: '2rem', textAlign: 'center'}}>
            <button onClick={onRestart} className="btn btn-primary" style={{width: 'auto', padding: '0.75rem 2rem'}}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizScreen = ({ 
  studentName, regNumber, timeLeft, currentQuestionIndex, setCurrentQuestionIndex, 
  answers, setAnswers, onSubmit, isSidebarOpen, setIsSidebarOpen, formatTime, questions
}) => {
  const currentQ = questions[currentQuestionIndex];
  const isAnswered = (qId) => answers[qId] !== undefined;
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentQ.id]: optionIndex });
  };

  return (
    <div className="app-container" style={{padding: 0, background: '#f3f4f6'}}>
      {/* Header */}
      <header className="header">
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <div style={{
            width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '50%', 
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
          }}>
            {studentName.charAt(0)}
          </div>
          <div className="hidden-mobile">
            <div style={{fontWeight: 'bold', fontSize: '0.875rem'}}>{studentName}</div>
            <div style={{fontSize: '0.75rem', color: '#6b7280'}}>{regNumber}</div>
          </div>
        </div>
        
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div className={`timer-badge ${timeLeft < 60 ? 'timer-warning' : ''}`}>
              <Clock size={18} />
              <span>{formatTime(timeLeft)}</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn btn-nav"
              style={{display: 'block', padding: '0.5rem'}} // Show menu button on all screens for simplicity if needed
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="quiz-layout">
        <main className="main-content">
          <div className="quiz-card">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem'}}>
              <span style={{fontSize: '0.875rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase'}}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span style={{background: '#eff6ff', color: 'var(--primary-color)', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600}}>
                Single Choice
              </span>
            </div>
            
            <h2 style={{fontSize: '1.25rem', fontWeight: 600, color: '#111827', marginBottom: '2rem', lineHeight: 1.5}}>
              {currentQ.question}
            </h2>

            <div>
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`option-btn ${answers[currentQ.id] === idx ? 'selected' : ''}`}
                >
                  <div className="option-circle">
                    {answers[currentQ.id] === idx && <div className="selected-dot" />}
                  </div>
                  <span style={{fontSize: '1rem', fontWeight: 500}}>{option}</span>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div style={{padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{margin: 0, fontSize: '1rem'}}>Question Palette</h3>
            <button onClick={() => setIsSidebarOpen(false)} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
              <X size={20} color="#9ca3af"/>
            </button>
          </div>
          
          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isActive = currentQuestionIndex === idx;
              const isDone = isAnswered(q.id);
              let btnClass = "palette-btn";
              if (isActive) btnClass += " active";
              else if (isDone) btnClass += " answered";

              return (
                <button 
                  key={q.id} 
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setIsSidebarOpen(false);
                  }}
                  className={btnClass}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <div style={{padding: '1rem', borderTop: '1px solid #e5e7eb', marginTop: 'auto'}}>
            <button 
              onClick={() => setSubmitModalOpen(true)}
              className="btn btn-primary"
            >
              Submit Exam <CheckCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <footer style={{
        background: 'white', padding: '1rem', borderTop: '1px solid #e5e7eb', 
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between'}}>
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="btn btn-nav"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="btn btn-primary"
            style={{width: 'auto', padding: '0.5rem 1.5rem'}}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </footer>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', 
          backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
          <div className="card fade-in" style={{borderTop: '4px solid var(--accent-color)'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--accent-color)'}}>
               <AlertTriangle size={28} />
               <h3 style={{margin: 0, fontSize: '1.25rem'}}>Submit Assessment?</h3>
            </div>
            <p style={{marginBottom: '1.5rem', color: '#4b5563'}}>
              Are you sure you want to finish? You cannot change answers after submitting.
            </p>
            <div style={{display: 'flex', gap: '1rem'}}>
              <button onClick={() => setSubmitModalOpen(false)} className="btn btn-nav">
                Cancel
              </button>
              <button onClick={() => { setSubmitModalOpen(false); onSubmit(); }} className="btn btn-primary">
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [gameState, setGameState] = useState('start'); // start, welcome, quiz, result
  const [studentName, setStudentName] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = () => setGameState('result');

  useEffect(() => {
    let timer;
    if (gameState === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStart = (e) => {
    e.preventDefault();
    if (studentName.trim() && regNumber.trim()) {
      const shuffledBank = shuffleArray(QUESTION_BANK);
      const selectedQuestions = shuffledBank.slice(0, QUESTIONS_PER_SESSION);
      setQuestions(selectedQuestions);
      setGameState('welcome');
    }
  };

  const startQuiz = () => {
    setGameState('quiz');
    setTimeLeft(EXAM_DURATION_MINUTES * 60);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style>{appStyles}</style> {/* Inject CSS directly */}
      {/* <Analytics /> */} {/* UNCOMMENT THIS LINE WHEN DEPLOYING TO VERCEL */}
      {gameState === 'start' && (
        <StartScreen 
          studentName={studentName}
          setStudentName={setStudentName}
          regNumber={regNumber}
          setRegNumber={setRegNumber}
          onStart={handleStart}
        />
      )}
      {gameState === 'welcome' && (
        <WelcomeScreen 
          studentName={studentName}
          onProceed={startQuiz}
        />
      )}
      {gameState === 'quiz' && (
        <QuizScreen 
          studentName={studentName}
          regNumber={regNumber}
          timeLeft={timeLeft}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          answers={answers}
          setAnswers={setAnswers}
          onSubmit={handleSubmit}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          formatTime={formatTime}
          questions={questions}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen 
          studentName={studentName}
          answers={answers}
          questions={questions}
          onRestart={() => setGameState('start')}
        />
      )}
    </>
  );
}