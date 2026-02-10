import React, { useState, useEffect } from 'react';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Menu,
  X,
  BookOpen,
  Award,
  Sparkles,
  BrainCircuit,
  Loader2,
  AlertTriangle,
  Flame,
} from 'lucide-react';

/**
 * UTILITY: Load Tailwind CSS automatically for the user
 * This ensures the design works instantly in CodeSandbox/StackBlitz without configuration.
 */
const useTailwindLoader = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://cdn.tailwindcss.com"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);
};

/**
 * COURSE CONTENT: GNS 205 - Introduction to Entrepreneurial Studies
 * COMPREHENSIVE QUESTION BANK (100 QUESTIONS)
 */
const QUESTION_BANK = [
  // --- CONCEPT OF ENTREPRENEURSHIP (1-10) ---
  {
    id: 1,
    question:
      "Which of the following best distinguishes an 'Entrepreneur' from a 'Small Business Owner'?",
    options: [
      'The amount of capital invested in the business.',
      'The focus on innovation, growth, and seizing new opportunities.',
      'The number of employees hired within the first year.',
      'The legal structure of the business entity.',
    ],
    answer: 1,
  },
  {
    id: 2,
    question:
      "The process of 'Creative Destruction', where new innovative products replace outdated ones, was coined by which economist?",
    options: [
      'Adam Smith',
      'Joseph Schumpeter',
      'David Ricardo',
      'Peter Drucker',
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "An 'Intrapreneur' is accurately defined as:",
    options: [
      'An individual who leaves a corporate job to start a competitor company.',
      'A consultant hired to restructure a failing business.',
      'An employee who acts as an entrepreneur within a large organization.',
      'An investor who funds startups in exchange for equity.',
    ],
    answer: 2,
  },
  {
    id: 4,
    question:
      'Which of the following is NOT typically considered a psychological characteristic of successful entrepreneurs?',
    options: [
      'High need for achievement',
      'Internal locus of control',
      'Extreme risk aversion',
      'Tolerance for ambiguity',
    ],
    answer: 2,
  },
  {
    id: 5,
    question:
      "The theory that entrepreneurs are 'born not made' is known as the:",
    options: [
      'Economic Theory',
      'Sociological Theory',
      'Trait Theory',
      'Resource-Based Theory',
    ],
    answer: 2,
  },
  {
    id: 6,
    question:
      'Which term describes the specific mindset that allows entrepreneurs to identify opportunities where others see chaos?',
    options: [
      'Managerial Thinking',
      'Entrepreneurial Alertness',
      'Strategic Planning',
      'Risk Calculation',
    ],
    answer: 1,
  },
  {
    id: 7,
    question: 'Pull factors in entrepreneurship refer to:',
    options: [
      'Factors that force a person into business due to lack of options (e.g., poverty).',
      'Factors that attract a person to business due to opportunity (e.g., market gap).',
      'Government regulations that restrict business.',
      'Tax incentives for large corporations.',
    ],
    answer: 1,
  },
  {
    id: 8,
    question:
      'Innovation that creates a new market and value network and eventually disrupts an existing market is called:',
    options: [
      'Incremental Innovation',
      'Disruptive Innovation',
      'Process Innovation',
      'Service Innovation',
    ],
    answer: 1,
  },
  {
    id: 9,
    question:
      "Which of the following is an example of 'Social Entrepreneurship'?",
    options: [
      'Starting a tech company to become a billionaire.',
      'Opening a micro-finance bank to alleviate poverty in rural areas.',
      'Buying shares in a multinational oil company.',
      'Running a family grocery store.',
    ],
    answer: 1,
  },
  {
    id: 10,
    question:
      "The 'Locus of Control' theory suggests that successful entrepreneurs believe:",
    options: [
      'Success is determined by luck or fate.',
      'They can control their own outcomes through their actions.',
      'Powerful others control their destiny.',
      'Market forces are entirely unpredictable.',
    ],
    answer: 1,
  },

  // --- BUSINESS LAW: CONTRACTS (11-25) ---
  {
    id: 11,
    question:
      "For a contract to be legally binding, which essential element represents the 'price' paid for a promise?",
    options: ['Consensus ad idem', 'Consideration', 'Capacity', 'Legality'],
    answer: 1,
  },
  {
    id: 12,
    question: "A contract is classified as 'Voidable' if:",
    options: [
      'It lacks one of the essential elements of a valid contract.',
      'It is illegal from the very beginning.',
      'It is valid but can be set aside by one party due to defects like misrepresentation.',
      'It is unenforceable by law due to time lapse.',
    ],
    answer: 2,
  },
  {
    id: 13,
    question:
      "In the context of 'Capacity to Contract', which of the following contracts is generally enforceable against an Infant (Minor)?",
    options: [
      'Contracts for the repayment of money lent.',
      'Contracts for goods supplied (other than necessaries).',
      "Contracts for 'Necessaries' suited to their condition in life.",
      'Trading contracts involving substantial capital.',
    ],
    answer: 2,
  },
  {
    id: 14,
    question: "The legal principle 'Consensus ad idem' refers to:",
    options: [
      'The exchange of value between parties.',
      'The meeting of minds where parties agree on the same thing in the same sense.',
      'The written documentation of the agreement.',
      'The capacity of parties to sue.',
    ],
    answer: 1,
  },
  {
    id: 15,
    question:
      "Which of the following constitutes a valid 'Offer' in contract law?",
    options: [
      'A definite promise made with the intention to be bound.',
      'An invitation to treat (e.g., displaying goods in a shop window).',
      'A mere statement of intention to sell in the future.',
      'A request for information regarding price.',
    ],
    answer: 0,
  },
  {
    id: 16,
    question:
      "The 'Postal Rule' states that acceptance by post is effective when:",
    options: [
      'The letter is received by the offeror.',
      'The letter is read by the offeror.',
      'The letter is posted (stamped and addressed correctly).',
      'The offeror acknowledges receipt.',
    ],
    answer: 2,
  },
  {
    id: 17,
    question: 'A counter-offer has the legal effect of:',
    options: [
      'Accepting the original offer.',
      'Destroying/Killing the original offer.',
      'Pausing the negotiation indefinitely.',
      'Creating a binding contract immediately.',
    ],
    answer: 1,
  },
  {
    id: 18,
    question:
      'Which of the following is NOT a method of discharging a contract?',
    options: ['Performance', 'Agreement', 'Frustration', 'Inflation'],
    answer: 3,
  },
  {
    id: 19,
    question: 'Consideration in a contract must move from the:',
    options: ['Promisee', 'Promisor', 'Third party', 'Court'],
    answer: 0,
  },
  {
    id: 20,
    question:
      'If a contract involves the commission of a crime, it is considered:',
    options: [
      'Valid but voidable.',
      'Void ab initio (Illegal).',
      'Enforceable if written.',
      'Binding on the offeror only.',
    ],
    answer: 1,
  },
  {
    id: 21,
    question:
      'Specific Performance is an equitable remedy where the court orders:',
    options: [
      'The payment of damages.',
      'The party to carry out their contractual obligations.',
      'The cancellation of the contract.',
      'The imprisonment of the defaulter.',
    ],
    answer: 1,
  },
  {
    id: 22,
    question: "A 'Unilateral Contract' is one where:",
    options: [
      'Both parties make promises to each other.',
      'Only one party makes a promise (e.g., reward for lost item).',
      'The contract is written in one language.',
      'There is only one witness.',
    ],
    answer: 1,
  },
  {
    id: 23,
    question:
      'Which case established the principle of invitation to treat regarding goods on display?',
    options: [
      'Carlill v Carbolic Smoke Ball Co.',
      'Pharmaceutical Society of Great Britain v Boots Cash Chemists.',
      'Hyde v Wrench.',
      'Felthouse v Bindley.',
    ],
    answer: 1,
  },
  {
    id: 24,
    question: 'Duress in contract law refers to:',
    options: [
      'Entering a contract under the influence of alcohol.',
      'Entering a contract due to actual or threatened violence.',
      'Entering a contract due to a mistake.',
      'Entering a contract with a minor.',
    ],
    answer: 1,
  },
  {
    id: 25,
    question: 'Undue Influence presumes that one party:',
    options: [
      'Physically forced the other.',
      'Abused a position of trust or authority over the other.',
      'Bribed the other.',
      'Lied about the goods.',
    ],
    answer: 1,
  },

  // --- BUSINESS OWNERSHIP & STRUCTURES (26-40) ---
  {
    id: 26,
    question:
      'A key disadvantage of a General Partnership compared to a Limited Liability Company is:',
    options: [
      'Double taxation of profits.',
      'Excessive government regulation and filing requirements.',
      'Unlimited joint and several liability of partners.',
      'Inability to combine skills and expertise.',
    ],
    answer: 2,
  },
  {
    id: 27,
    question:
      'The document that regulates the internal management and proceedings of a company is the:',
    options: [
      'Memorandum of Association',
      'Articles of Association',
      'Certificate of Incorporation',
      'Prospectus',
    ],
    answer: 1,
  },
  {
    id: 28,
    question:
      'In a Public Limited Company (PLC), the ownership is separated from control. Who owns the company?',
    options: [
      'The Board of Directors',
      'The Managing Director',
      'The Shareholders',
      'The Debenture holders',
    ],
    answer: 2,
  },
  {
    id: 29,
    question:
      'Which acronym represents the government agency responsible for business registration in Nigeria?',
    options: [
      'NAFDAC',
      'CAC (Corporate Affairs Commission)',
      'SON (Standards Organization of Nigeria)',
      'EFCC',
    ],
    answer: 1,
  },
  {
    id: 30,
    question:
      'Which document defines the relationship between a company and the outside world (Name, Object, Capital)?',
    options: [
      'Articles of Association',
      'Memorandum of Association',
      'Shareholders Agreement',
      'Internal Audit Report',
    ],
    answer: 1,
  },
  {
    id: 31,
    question: "The concept of 'Limited Liability' protects shareholders by:",
    options: [
      'Guaranteeing a return on investment.',
      'Limiting their losses to the amount unpaid on their shares.',
      'Allowing them to manage the daily affairs of the company.',
      'Exempting them from paying personal income tax.',
    ],
    answer: 1,
  },
  {
    id: 32,
    question: "Which business entity has a 'perpetual succession'?",
    options: [
      'Sole Proprietorship',
      'General Partnership',
      'Limited Liability Company',
      'Joint Venture',
    ],
    answer: 2,
  },
  {
    id: 33,
    question:
      "The principle of 'Separate Legal Personality' was established in the case of:",
    options: [
      'Carlill v Carbolic Smoke Ball Co.',
      'Salomon v Salomon & Co Ltd.',
      'Donoghue v Stevenson.',
      'Balfour v Balfour.',
    ],
    answer: 1,
  },
  {
    id: 34,
    question: 'Which is a valid ground for the dissolution of a partnership?',
    options: [
      'Bankruptcy of a partner.',
      'A partner taking a vacation.',
      'Disagreement on lunch choices.',
      'Hiring a new employee.',
    ],
    answer: 0,
  },
  {
    id: 35,
    question: "The 'Doctrine of Ultra Vires' refers to:",
    options: [
      'Acts committed by a company beyond its legal powers/objects.',
      'The unlimited power of the directors.',
      'The rights of shareholders to vote.',
      'The dissolution of a partnership.',
    ],
    answer: 0,
  },
  {
    id: 36,
    question: 'A Cooperative Society is primarily formed to:',
    options: [
      'Maximize profit for shareholders.',
      'Promote the economic interest of its members.',
      'Evade taxes.',
      'Control the market price of goods.',
    ],
    answer: 1,
  },
  {
    id: 37,
    question:
      'The minimum number of persons required to form a private limited company in Nigeria is:',
    options: [
      'One (1) - under current CAMA 2020',
      'Seven (7)',
      'Fifty (50)',
      'Two (2) - under old law',
    ],
    answer: 0,
  },
  {
    id: 38,
    question: 'A Franchise is best described as:',
    options: [
      'A government grant to operate in a specific area.',
      "A licensing arrangement to use a firm's business model and brand.",
      'A merger between two large companies.',
      'A type of illegal pyramid scheme.',
    ],
    answer: 1,
  },
  {
    id: 39,
    question:
      'Which of the following is NOT required for business registration with CAC?',
    options: [
      'Proposed Company Name',
      'Names of Directors',
      'Passport of the President of Nigeria',
      'Share Capital details',
    ],
    answer: 2,
  },
  {
    id: 40,
    question: 'The highest decision-making body in a Cooperative Society is:',
    options: [
      'The Management Committee',
      'The Annual General Meeting (AGM)',
      'The President',
      'The Treasurer',
    ],
    answer: 1,
  },

  // --- MANAGEMENT PRINCIPLES (41-55) ---
  {
    id: 41,
    question:
      "SWOT Analysis is a strategic planning tool. Which two components are considered 'Internal' factors?",
    options: [
      'Opportunities and Threats',
      'Strengths and Weaknesses',
      'Strengths and Opportunities',
      'Weaknesses and Threats',
    ],
    answer: 1,
  },
  {
    id: 42,
    question:
      'The management function that involves monitoring performance and correcting deviations from standards is:',
    options: ['Planning', 'Organizing', 'Leading', 'Controlling'],
    answer: 3,
  },
  {
    id: 43,
    question:
      'Which level of management is primarily responsible for strategic, long-term decision making?',
    options: [
      'Top-level Management',
      'Middle-level Management',
      'First-line Management',
      'Operational Staff',
    ],
    answer: 0,
  },
  {
    id: 44,
    question: 'Efficiency in management is best described as:',
    options: [
      'Doing the right things (achieving goals).',
      'Doing things right (minimizing waste and resources).',
      'Maximizing market share regardless of cost.',
      'Increasing employee turnover.',
    ],
    answer: 1,
  },
  {
    id: 45,
    question: 'The hierarchy of needs theory was proposed by:',
    options: [
      'Frederick Taylor',
      'Abraham Maslow',
      'Henri Fayol',
      'Douglas McGregor',
    ],
    answer: 1,
  },
  {
    id: 46,
    question: 'Delegation of authority involves:',
    options: [
      'Transferring responsibility and authority to subordinates.',
      'The manager doing all the work.',
      'Removing all authority from lower levels.',
      'Firing employees.',
    ],
    answer: 0,
  },
  {
    id: 47,
    question: 'Corporate Governance refers to:',
    options: [
      "The government's control of a company.",
      'The system of rules, practices, and processes by which a firm is directed and controlled.',
      'The marketing strategy of a corporation.',
      'The recruitment of staff.',
    ],
    answer: 1,
  },
  {
    id: 48,
    question: 'Conflict resolution in a workplace is best achieved through:',
    options: [
      'Immediate dismissal of involved parties.',
      'Collective bargaining and negotiation.',
      'Ignoring the issue until it fades.',
      'Strict authoritarian rule.',
    ],
    answer: 1,
  },
  {
    id: 49,
    question: 'Theory X managers assume that employees:',
    options: [
      'Enjoy work and seek responsibility.',
      'Are creative and self-motivated.',
      'Dislike work and need to be coerced/controlled.',
      'Are driven only by social needs.',
    ],
    answer: 2,
  },
  {
    id: 50,
    question: "The 'Span of Control' refers to:",
    options: [
      'The number of subordinates a manager can effectively supervise.',
      'The geographical area a manager controls.',
      'The number of hours a manager works.',
      'The budget limit for a department.',
    ],
    answer: 0,
  },
  {
    id: 51,
    question:
      'Which management function involves grouping activities and resources to achieve objectives?',
    options: ['Planning', 'Organizing', 'Motivating', 'Controlling'],
    answer: 1,
  },
  {
    id: 52,
    question: 'SMART goals stands for:',
    options: [
      'Specific, Measurable, Achievable, Relevant, Time-bound',
      'Strategic, Money, Action, Risk, Team',
      'Simple, Meaningful, Actionable, Real, Tested',
      'Speed, Motion, Accuracy, Result, Time',
    ],
    answer: 0,
  },
  {
    id: 53,
    question:
      'Scientific Management, focusing on workflow efficiency, is associated with:',
    options: ['Elton Mayo', 'Frederick Taylor', 'Max Weber', 'Peter Senge'],
    answer: 1,
  },
  {
    id: 54,
    question:
      'Communication that flows from subordinates to superiors is called:',
    options: [
      'Downward Communication',
      'Upward Communication',
      'Horizontal Communication',
      'Diagonal Communication',
    ],
    answer: 1,
  },
  {
    id: 55,
    question:
      'The process of attracting, selecting, and training employees is known as:',
    options: ['Marketing', 'Production', 'Staffing / HRM', 'Logistics'],
    answer: 2,
  },

  // --- MARKETING & FEASIBILITY (56-70) ---
  {
    id: 56,
    question: "In the Marketing Mix (4Ps), 'Place' refers to:",
    options: [
      "The physical location of the CEO's office.",
      'Distribution channels and logistics to reach the customer.',
      'The placement of advertisements on billboards.',
      'The market share of the competitor.',
    ],
    answer: 1,
  },
  {
    id: 57,
    question:
      "Market Segmentation based on 'Psychographics' analyzes consumers based on:",
    options: [
      'Age, gender, and income levels.',
      'Geographic location and climate.',
      'Lifestyle, values, personality, and interests.',
      'Usage rate and brand loyalty.',
    ],
    answer: 2,
  },
  {
    id: 58,
    question: 'A Feasibility Study is primarily conducted to:',
    options: [
      'Secure immediate bank loans before having an idea.',
      'Assess the viability and potential success of a business idea.',
      'Design the company logo and brand colors.',
      'Recruit the initial staff members.',
    ],
    answer: 1,
  },
  {
    id: 59,
    question:
      'Which pricing strategy involves setting a low initial price to gain market share quickly?',
    options: [
      'Price Skimming',
      'Penetration Pricing',
      'Premium Pricing',
      'Psychological Pricing',
    ],
    answer: 1,
  },
  {
    id: 60,
    question: "Which of these is a 'Demographic' segmentation variable?",
    options: [
      'Personality',
      'Social Class',
      'Education Level',
      'Brand Loyalty',
    ],
    answer: 2,
  },
  {
    id: 61,
    question: 'A unique selling proposition (USP) is:',
    options: [
      'The lowest price in the market.',
      'A factor that differentiates a product from its competitors.',
      'A government license to sell.',
      'A marketing budget.',
    ],
    answer: 1,
  },
  {
    id: 62,
    question:
      'Which marketing concept holds that consumers favor products that offer the most quality, performance, and features?',
    options: [
      'Production Concept',
      'Product Concept',
      'Selling Concept',
      'Marketing Concept',
    ],
    answer: 1,
  },
  {
    id: 63,
    question: "The 'Executive Summary' of a business plan should be written:",
    options: [
      'First, before anything else.',
      'Last, after the entire plan is written.',
      'In the middle of the financial section.',
      'It is optional.',
    ],
    answer: 1,
  },
  {
    id: 64,
    question: 'Primary Data in market research refers to:',
    options: [
      'Data already collected by others (e.g., government reports).',
      'Data collected directly by the entrepreneur for a specific purpose (e.g., surveys).',
      'Data from the internet.',
      'Data from textbooks.',
    ],
    answer: 1,
  },
  {
    id: 65,
    question:
      'Which stage of the Product Life Cycle typically sees the highest profits?',
    options: ['Introduction', 'Growth', 'Maturity', 'Decline'],
    answer: 2,
  },
  {
    id: 66,
    question: 'A niche market is:',
    options: [
      'A very large market with many competitors.',
      'A small, specialized segment of the market.',
      'A market regulated by the government.',
      'An international market.',
    ],
    answer: 1,
  },
  {
    id: 67,
    question: 'Brand Equity refers to:',
    options: [
      'The cost of the logo.',
      'The commercial value derived from consumer perception of the brand name.',
      'The salary of the marketing manager.',
      'The number of products sold.',
    ],
    answer: 1,
  },
  {
    id: 68,
    question:
      'Which component of the business plan details the production process and location?',
    options: [
      'Marketing Plan',
      'Operational/Technical Plan',
      'Financial Plan',
      'Organizational Plan',
    ],
    answer: 1,
  },
  {
    id: 69,
    question: 'Promotion in the Marketing Mix includes:',
    options: [
      'Product design.',
      'Advertising, Sales Promotion, and Public Relations.',
      'Distribution channels.',
      'Pricing strategies.',
    ],
    answer: 1,
  },
  {
    id: 70,
    question: 'Guerilla Marketing relies on:',
    options: [
      'Huge budgets and TV ads.',
      'Unconventional, low-cost tactics to gain attention.',
      'Government support.',
      'Strict corporate rules.',
    ],
    answer: 1,
  },

  // --- FINANCE & ACCOUNTING (71-85) ---
  {
    id: 71,
    question:
      'Which of the following is considered an internal source of equity capital?',
    options: [
      'Bank Overdraft',
      'Trade Credit',
      'Retained Earnings',
      'Debentures',
    ],
    answer: 2,
  },
  {
    id: 72,
    question: 'Break-Even Point is the level of production where:',
    options: [
      'Total Revenue exceeds Total Costs.',
      'Total Costs exceed Total Revenue.',
      'Total Revenue equals Total Costs (No profit, no loss).',
      'Variable costs are zero.',
    ],
    answer: 2,
  },
  {
    id: 73,
    question: 'Working Capital Management focuses on:',
    options: [
      'Managing long-term assets like buildings.',
      'Managing current assets and current liabilities.',
      "Structuring the company's long-term debt.",
      'Calculating income tax.',
    ],
    answer: 1,
  },
  {
    id: 74,
    question:
      "Which financial statement shows a company's financial position (Assets = Liabilities + Equity) at a specific point in time?",
    options: [
      'Income Statement (Profit & Loss)',
      'Cash Flow Statement',
      'Balance Sheet',
      'Statement of Retained Earnings',
    ],
    answer: 2,
  },
  {
    id: 75,
    question: 'Bootstrap financing refers to:',
    options: [
      'Raising millions from the stock market.',
      'Starting a business with little capital, using personal finances and revenue.',
      'Getting a large loan from the World Bank.',
      'Buying a franchise.',
    ],
    answer: 1,
  },
  {
    id: 76,
    question: "An 'Angel Investor' is typically:",
    options: [
      'A wealthy individual investing personal funds into a startup.',
      'A government grant officer.',
      'A bank loan officer.',
      'A corporate entity buying a competitor.',
    ],
    answer: 0,
  },
  {
    id: 77,
    question: 'Which of these is a Fixed Asset?',
    options: ['Inventory', 'Accounts Receivable', 'Machinery', 'Cash'],
    answer: 2,
  },
  {
    id: 78,
    question: 'Depreciation is defined as:',
    options: [
      'The increase in value of land.',
      'The allocation of the cost of a tangible asset over its useful life.',
      'The profit made from sales.',
      'The cash in the bank.',
    ],
    answer: 1,
  },
  {
    id: 79,
    question: "A 'Cash Flow Statement' tracks:",
    options: [
      'Accrued expenses only.',
      'The actual inflow and outflow of cash in the business.',
      'Projected profits for next year.',
      'Employee salaries.',
    ],
    answer: 1,
  },
  {
    id: 80,
    question: 'Liquidity ratios measure:',
    options: [
      'Long-term solvency.',
      "A company's ability to pay off short-term debts.",
      'Profitability relative to sales.',
      'Return on investment.',
    ],
    answer: 1,
  },
  {
    id: 81,
    question: 'Venture Capitalists typically invest in:',
    options: [
      'Low-risk, low-return established companies.',
      'High-growth potential startups in exchange for equity.',
      'Government bonds only.',
      'Non-profit organizations.',
    ],
    answer: 1,
  },
  {
    id: 82,
    question: 'Collateral is:',
    options: [
      'An asset pledged by a borrower to secure a loan.',
      'A partner in the business.',
      'A type of bank account.',
      'Interest paid on savings.',
    ],
    answer: 0,
  },
  {
    id: 83,
    question: 'Which of these is a Variable Cost?',
    options: [
      'Rent of the factory.',
      'Insurance premiums.',
      'Raw materials.',
      "Manager's fixed salary.",
    ],
    answer: 2,
  },
  {
    id: 84,
    question: 'ROI stands for:',
    options: [
      'Rate of Inflation',
      'Return on Investment',
      'Risk of Investment',
      'Revenue on Interest',
    ],
    answer: 1,
  },
  {
    id: 85,
    question: 'Debt Financing involves:',
    options: [
      'Selling shares of ownership.',
      'Borrowing money that must be repaid with interest.',
      'Using personal savings.',
      'Reinvesting profits.',
    ],
    answer: 1,
  },

  // --- AGENCY, INDUSTRIAL LAW & ETHICS (86-100) ---
  {
    id: 86,
    question: "The primary purpose of a 'Trade Union' is to:",
    options: [
      'Maximize shareholder profits.',
      'Regulate the relationship between employers and the government.',
      'Protect and advance the interests of workers regarding wages and conditions.',
      'Provide legal defense for criminal acts of employees.',
    ],
    answer: 2,
  },
  {
    id: 87,
    question: 'Vicarious Liability in industrial law implies that:',
    options: [
      "An employee is liable for the employer's debts.",
      'An employer can be held liable for torts committed by employees in the course of employment.',
      'Trade unions are liable for the actions of the government.',
      'Employees are immune from all legal prosecution.',
    ],
    answer: 1,
  },
  {
    id: 88,
    question: "In the context of agency law, a 'Del Credere' agent:",
    options: [
      'Has no authority to sign contracts.',
      'Guarantees the solvency of the third party to the principal for an extra commission.',
      'Only introduces parties but does not negotiate.',
      'Acts on behalf of the government.',
    ],
    answer: 1,
  },
  {
    id: 89,
    question: "A 'Patent' grants the holder protection for:",
    options: [
      'Artistic and literary works.',
      'Brand names and logos.',
      'New inventions and industrial processes.',
      'Trade secrets only.',
    ],
    answer: 2,
  },
  {
    id: 90,
    question: "Under the Sale of Goods Act, 'Caveat Emptor' means:",
    options: [
      'Let the seller beware',
      'Let the buyer beware',
      'Goods must match the sample',
      'Ownership passes on delivery',
    ],
    answer: 1,
  },
  {
    id: 91,
    question: "A 'Copyright' protects:",
    options: [
      'Logos and Slogans.',
      'Original literary, dramatic, musical, and artistic works.',
      'Mechanical inventions.',
      'Business ideas in the head.',
    ],
    answer: 1,
  },
  {
    id: 92,
    question: 'Ethical behavior in business includes:',
    options: [
      'Insider trading.',
      'False advertising.',
      'Transparency, fairness, and compliance with laws.',
      'Exploiting loopholes.',
    ],
    answer: 2,
  },
  {
    id: 93,
    question: 'An agency relationship can be created by:',
    options: [
      'Estoppel/Holding out.',
      'Ratification.',
      'Express agreement.',
      'All of the above.',
    ],
    answer: 3,
  },
  {
    id: 94,
    question: 'Collective Bargaining is a process between:',
    options: [
      'Competitors in the market.',
      'Employers and Employee representatives (Unions).',
      'Government and foreign investors.',
      'Buyers and Sellers.',
    ],
    answer: 1,
  },
  {
    id: 95,
    question: 'The duty of an Agent to his Principal includes:',
    options: [
      'Making secret profits.',
      'Delegating duties without permission.',
      'Acting in good faith and avoiding conflict of interest.',
      'Competing with the principal.',
    ],
    answer: 2,
  },
  {
    id: 96,
    question:
      'Which of the following acts protects consumers from dangerous products in Nigeria?',
    options: [
      'CAMA 2020',
      'Consumer Protection Council Act (now FCCPC).',
      'Land Use Act.',
      'Labour Act.',
    ],
    answer: 1,
  },
  {
    id: 97,
    question:
      'Corporate Social Responsibility (CSR) argues that businesses should:',
    options: [
      'Focus only on profit.',
      'Contribute to the well-being of the society and environment.',
      'Ignore laws if they reduce profit.',
      'Only pay taxes.',
    ],
    answer: 1,
  },
  {
    id: 98,
    question: "A 'Trademark' is used to:",
    options: [
      'Protect an invention.',
      'Protect a brand name, logo, or slogan.',
      'Protect a book.',
      'Protect a secret recipe.',
    ],
    answer: 1,
  },
  {
    id: 99,
    question:
      "The termination of an agency by the 'Operation of Law' occurs upon:",
    options: [
      'Death or Insanity of either party.',
      'Mutual agreement.',
      'Completion of the task.',
      'Revocation by the Principal.',
    ],
    answer: 0,
  },
  {
    id: 100,
    question:
      'Which document contains the rules for the internal running of a Trade Union?',
    options: [
      'The Constitution/Rule Book',
      'The Memorandum of Association',
      'The Business Plan',
      'The Company Act',
    ],
    answer: 0,
  },
];

// Configuration
const EXAM_DURATION_MINUTES = 20;
const QUESTIONS_PER_SESSION = 35;
const COURSE_TITLE = 'GNS 205: Intro to Entrepreneurial Studies';
const apiKey = ''; // API Key injected by environment

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

const StartScreen = ({
  studentName,
  setStudentName,
  regNumber,
  setRegNumber,
  onStart,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8 border-t-4 border-blue-600 my-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 text-blue-600 shadow-sm">
            <BookOpen size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{COURSE_TITLE}</h1>
          <p className="text-slate-500 mt-2">CBT Assessment Simulation</p>
        </div>

        <form onSubmit={onStart} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Registration Number
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm"
              placeholder="e.g. 2024/GNS/001"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 space-y-2 border border-blue-100 shadow-sm">
            <p className="font-semibold flex items-center gap-2">
              <Clock size={16} /> Duration: {EXAM_DURATION_MINUTES} Minutes
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle size={16} /> Questions: {QUESTIONS_PER_SESSION}{' '}
              (Randomized)
            </p>
            <p className="text-xs mt-2 opacity-80">
              * Standard Marking: +2 Correct, -1 Wrong
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg transform active:scale-[0.98]"
          >
            Proceed to Exam
          </button>
        </form>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ studentName, onProceed }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans animate-in fade-in duration-500">
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-md p-8 text-center border-t-4 border-blue-600">
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full text-blue-600 mb-4 animate-bounce shadow-md">
          <Flame size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome, {studentName}!
        </h1>
        <p className="text-xl text-slate-600 font-medium italic">
          "Fire on 🔥"
        </p>
      </div>

      <div className="bg-blue-50 p-5 rounded-lg text-sm text-blue-800 space-y-3 mb-6 text-left border border-blue-100 shadow-inner">
        <p className="font-bold text-blue-900 border-b border-blue-200 pb-2 mb-2 text-base">
          Assessment Rules:
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 bg-white p-2 rounded border border-blue-100">
            <div className="bg-green-100 p-1 rounded-full text-green-600">
              <CheckCircle size={16} />
            </div>
            <span>
              <strong>+2 Points</strong> for every correct answer.
            </span>
          </li>
          <li className="flex items-center gap-3 bg-white p-2 rounded border border-blue-100">
            <div className="bg-red-100 p-1 rounded-full text-red-500">
              <AlertTriangle size={16} />
            </div>
            <span>
              <strong>-1 Point</strong> for every wrong answer.
            </span>
          </li>
          <li className="flex items-center gap-3 bg-white p-2 rounded border border-blue-100">
            <div className="bg-blue-100 p-1 rounded-full text-blue-600">
              <Clock size={16} />
            </div>
            <span>
              <strong>{EXAM_DURATION_MINUTES} minutes</strong> for{' '}
              {QUESTIONS_PER_SESSION} questions.
            </span>
          </li>
        </ul>
      </div>

      <button
        onClick={onProceed}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition shadow-lg transform active:scale-[0.98] flex items-center justify-center gap-2 text-lg"
      >
        Start Now <ChevronRight size={20} />
      </button>
    </div>
  </div>
);

const ResultScreen = ({ studentName, answers, questions, onRestart }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
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
    const question = questions.find((q) => q.id === questionId);
    const userAnsIndex = answers[questionId];
    const correctAnsIndex = question.answer;

    if (!question) return;

    setLoadingExplanations((prev) => ({ ...prev, [questionId]: true }));

    try {
      const prompt = `
              You are a concise academic tutor for the course GNS 205 (Entrepreneurship). 
              Question: "${question.question}"
              Correct Answer: "${question.options[correctAnsIndex]}"
              Student's Answer: "${
                userAnsIndex !== undefined
                  ? question.options[userAnsIndex]
                  : 'No answer provided'
              }"
              
              Explain in 2 sentences why the correct answer is right.
          `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const explanationText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Unable to generate explanation.';

      setExplanations((prev) => ({ ...prev, [questionId]: explanationText }));
    } catch (error) {
      console.error('AI Error:', error);
      setExplanations((prev) => ({
        ...prev,
        [questionId]: 'Error connecting to AI tutor.',
      }));
    } finally {
      setLoadingExplanations((prev) => ({ ...prev, [questionId]: false }));
    }
  };

  const generateStudyPlan = async () => {
    setLoadingStudyPlan(true);
    try {
      const missedQuestions = questions.filter(
        (q) => answers[q.id] !== q.answer
      );
      const missedTopics = missedQuestions
        .slice(0, 5)
        .map((q) => q.question)
        .join('; ');

      const prompt = `
              You are a strict but encouraging academic mentor. 
              The student took a test on "GNS 205: Entrepreneurial Studies" and scored ${score}/${maxPossibleScore}.
              They struggled with these questions: ${
                missedTopics || 'None, perfect score'
              }.
              
              Generate a 3-point bulleted study plan (HTML formatted using <li> tags) specific to Entrepreneurship principles.
              Keep it concise.
          `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const planText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Unable to generate plan.';
      setStudyPlan(planText);
    } catch (error) {
      setStudyPlan('Could not generate study plan at this time.');
    } finally {
      setLoadingStudyPlan(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans overflow-y-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-200">
        <div
          className={`${
            passed ? 'bg-green-600' : 'bg-red-600'
          } text-white p-8 text-center relative overflow-hidden`}
        >
          <div className="relative z-10">
            <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-lg">
              <Award size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Assessment Completed</h2>
            <p className="opacity-90">
              Thank you for participating, {studentName}
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <span className="block text-slate-500 text-sm uppercase tracking-wide font-semibold">
                Total Score
              </span>
              <span
                className={`block text-4xl font-bold mt-2 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {score}{' '}
                <span className="text-lg text-slate-400">
                  / {maxPossibleScore}
                </span>
              </span>
              <span className="block text-xs text-slate-400 mt-1">
                (+2 correct, -1 wrong)
              </span>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <span className="block text-slate-500 text-sm uppercase tracking-wide font-semibold">
                Percentage
              </span>
              <span
                className={`block text-4xl font-bold mt-2 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {percentage}%
              </span>
            </div>
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
              <span className="block text-slate-500 text-sm uppercase tracking-wide font-semibold">
                Status
              </span>
              <span
                className={`block text-4xl font-bold mt-2 ${
                  passed ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {passed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>

          {/* AI Study Plan Section */}
          <div className="mb-10 bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                  <BrainCircuit size={20} className="text-indigo-600" />
                  AI Performance Coach
                </h3>
                <p className="text-indigo-700 text-sm mt-1">
                  Get a personalized study plan based on your mistakes.
                </p>
              </div>
              {!studyPlan && (
                <button
                  onClick={generateStudyPlan}
                  disabled={loadingStudyPlan}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loadingStudyPlan ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  {loadingStudyPlan
                    ? 'Analyzing Results...'
                    : 'Generate Study Plan ✨'}
                </button>
              )}
            </div>

            {studyPlan && (
              <div className="mt-4 pt-4 border-t border-indigo-200 animate-in fade-in slide-in-from-top-4 duration-500">
                <h4 className="text-sm font-bold text-indigo-800 uppercase tracking-wider mb-3">
                  Your Personalized Strategy:
                </h4>
                <div className="text-indigo-900 text-sm leading-relaxed space-y-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: studyPlan
                        .replace(/\n/g, '<br/>')
                        .replace(/- /g, '• '),
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 border-b pb-2">
              Review Answers
            </h3>
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.answer;
              const isUnanswered = userAnswer === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? 'border-green-200 bg-green-50'
                      : isUnanswered
                      ? 'border-slate-200 bg-slate-50'
                      : 'border-red-200 bg-red-50'
                  } shadow-sm transition hover:shadow-md`}
                >
                  <div className="flex gap-3">
                    <span className="font-bold text-slate-700">{idx + 1}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 mb-3">
                        {q.question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {q.options.map((opt, optIdx) => {
                          let optionClass =
                            'p-3 rounded-lg text-sm border transition-all duration-200 ';
                          if (optIdx === q.answer) {
                            optionClass +=
                              'bg-green-100 border-green-300 text-green-800 font-bold shadow-sm';
                          } else if (optIdx === userAnswer && !isCorrect) {
                            optionClass +=
                              'bg-red-100 border-red-300 text-red-800 font-medium';
                          } else {
                            optionClass +=
                              'bg-white border-slate-200 text-slate-500';
                          }

                          return (
                            <div key={optIdx} className={optionClass}>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </div>
                          );
                        })}
                      </div>

                      {/* Score Indicator */}
                      <div className="text-xs font-bold mb-2">
                        {isCorrect && (
                          <span className="text-green-700 bg-green-100 px-2 py-1 rounded">
                            +2 Points
                          </span>
                        )}
                        {!isCorrect && !isUnanswered && (
                          <span className="text-red-600 bg-red-100 px-2 py-1 rounded">
                            -1 Point
                          </span>
                        )}
                        {isUnanswered && (
                          <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            0 Points (Skipped)
                          </span>
                        )}
                      </div>

                      {!explanations[q.id] && (
                        <button
                          onClick={() => generateExplanation(q.id)}
                          disabled={loadingExplanations[q.id]}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-2 transition"
                        >
                          {loadingExplanations[q.id] ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <Sparkles size={14} />
                          )}
                          {loadingExplanations[q.id]
                            ? 'Thinking...'
                            : 'Explain Answer with AI ✨'}
                        </button>
                      )}

                      {explanations[q.id] && (
                        <div className="mt-3 bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-sm text-indigo-900 animate-in fade-in duration-300 shadow-inner">
                          <strong className="block text-indigo-700 text-xs uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Sparkles size={10} /> AI Explanation
                          </strong>
                          {explanations[q.id]}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition shadow-lg transform active:scale-[0.98]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizScreen = ({
  studentName,
  regNumber,
  timeLeft,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  setAnswers,
  onSubmit,
  isSidebarOpen,
  setIsSidebarOpen,
  formatTime,
  questions,
}) => {
  const currentQ = questions[currentQuestionIndex];
  const isAnswered = (qId) => answers[qId] !== undefined;

  // New state for custom modal
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQ.id]: optionIndex,
    });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm z-10 px-4 py-3 flex items-center justify-between border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
            {studentName.charAt(0)}
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-slate-800 text-sm leading-tight">
              {studentName}
            </h1>
            <p className="text-xs text-slate-500">{regNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold shadow-inner ${
              timeLeft < 60
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Clock size={18} />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative bg-slate-50">
        {/* Question Area - Added better scrolling support */}
        <div className="flex-1 overflow-y-auto h-full p-4 md:p-8 pb-32">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 min-h-[400px] border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-medium border border-blue-100">
                  Single Choice
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-8 leading-relaxed">
                {currentQ.question}
              </h2>

              <div className="space-y-3">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                      answers[currentQ.id] === idx
                        ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-md transform scale-[1.01]'
                        : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-600 hover:shadow-sm'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        answers[currentQ.id] === idx
                          ? 'border-blue-600'
                          : 'border-slate-300 group-hover:border-blue-400'
                      }`}
                    >
                      {answers[currentQ.id] === idx && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-lg">{option}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sidebar (Question Palette) */}
        <div
          className={`
          fixed inset-y-0 right-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 z-20 flex flex-col
          md:relative md:transform-none md:shadow-none md:border-l md:border-slate-200 md:w-80
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : 'translate-x-full md:translate-x-0'
          }
        `}
        >
          <div className="p-4 border-b border-slate-100 flex justify-between items-center md:hidden">
            <h3 className="font-bold text-slate-700">Question Palette</h3>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="text-slate-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            <div className="grid grid-cols-4 gap-3">
              {questions.map((q, idx) => {
                const isActive = currentQuestionIndex === idx;
                const isDone = isAnswered(q.id);
                let btnClass =
                  'h-10 w-10 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center border shadow-sm ';

                if (isActive) {
                  btnClass +=
                    'bg-blue-600 text-white border-blue-600 shadow-lg scale-110 ring-2 ring-blue-200';
                } else if (isDone) {
                  btnClass +=
                    'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
                } else {
                  btnClass +=
                    'bg-white text-slate-500 border-slate-200 hover:bg-slate-100';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      setIsSidebarOpen(false); // Close on mobile when clicked
                    }}
                    className={btnClass}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 space-y-3 bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>{' '}
                Answered
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-3 h-3 bg-blue-600 rounded"></div> Current
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="w-3 h-3 bg-white border border-slate-200 rounded"></div>{' '}
                Not Answered
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white">
            <button
              onClick={() => setSubmitModalOpen(true)}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl transition shadow-lg flex items-center justify-center gap-2 transform active:scale-[0.98]"
            >
              Submit Exam <CheckCircle size={18} />
            </button>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full animate-in fade-in zoom-in duration-200 border-t-4 border-amber-500">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <AlertTriangle size={24} />
                <h3 className="text-xl font-bold text-slate-800">
                  Submit Assessment?
                </h3>
              </div>
              <p className="text-slate-600 mb-6">
                Are you sure you want to finish? You will not be able to change
                your answers after submitting.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSubmitModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSubmitModalOpen(false);
                    onSubmit();
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-sm"
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-slate-200 p-4 absolute bottom-0 w-full md:w-[calc(100%-20rem)] z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            onClick={() =>
              setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
            }
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition hover:shadow-sm"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          <button
            onClick={() =>
              setCurrentQuestionIndex((prev) =>
                Math.min(questions.length - 1, prev + 1)
              )
            }
            disabled={currentQuestionIndex === questions.length - 1}
            className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 disabled:bg-slate-300 flex items-center gap-2 transition shadow-md transform active:scale-[0.98]"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  useTailwindLoader(); // Automatically loads styling

  const [gameState, setGameState] = useState('start'); // start, welcome, quiz, result
  const [studentName, setStudentName] = useState('');
  const [regNumber, setRegNumber] = useState('');

  // Question State
  const [questions, setQuestions] = useState([]);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_MINUTES * 60);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSubmit = () => {
    setGameState('result');
  };

  // Timer Logic
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
      // 1. Shuffle the bank
      const shuffledBank = shuffleArray(QUESTION_BANK);
      // 2. Slice the required number
      const selectedQuestions = shuffledBank.slice(0, QUESTIONS_PER_SESSION);

      setQuestions(selectedQuestions);
      // 3. Go to Welcome screen instead of quiz immediately
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
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <>
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
        <WelcomeScreen studentName={studentName} onProceed={startQuiz} />
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
