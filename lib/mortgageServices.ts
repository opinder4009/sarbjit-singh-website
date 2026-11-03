export type MortgageService = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  intro: string;
  points: string[];
};

export const mortgageServices: MortgageService[] = [
  {
    slug: 'home-mortgage',
    label: 'Home Mortgage',
    title: 'Home Mortgage',
    summary: 'Purchasing a home — new build, resale, or your next move.',
    intro:
      "Whether this is your first purchase or your fifth, a home mortgage starts with the same question: what can you actually afford, comfortably, once rates, taxes and insurance are factored in? I compare lenders so you walk into an offer with a number you can trust.",
    points: [
      'Affordability review based on income, debts and credit',
      'Pre-approval and rate hold before you start viewing homes',
      'Comparison across banks, credit unions and alternative lenders',
      'Coordination with your realtor and lawyer through to closing',
    ],
  },
  {
    slug: 'first-time-home-buyer',
    label: 'First-Time Home Buyer',
    title: 'First-Time Home Buyer',
    summary: 'Your first purchase — down payment, pre-approval and the programs built for you.',
    intro:
      "Buying for the first time means navigating down payment sources, credit history and programs most people have never heard of until they need them. I walk you through what you qualify for before you fall for a listing you can't close on.",
    points: [
      "FHSA and RRSP Home Buyers' Plan withdrawal strategy",
      'Land transfer tax rebate eligibility',
      'Minimum down payment and default insurance explained',
      'Pre-approval with a rate held for 60–120 days',
    ],
  },
  {
    slug: 'refinancing-equity',
    label: 'Refinancing & Equity',
    title: 'Refinancing & Equity',
    summary: 'Switch lenders, pull equity, or restructure before your term is up.',
    intro:
      "Refinancing isn't just for renewal day. If your rate, your lender, or your needs have changed, a refinance can lower your payment, consolidate debt, or unlock equity for a renovation — often for less than people expect.",
    points: [
      'Break-fee vs. savings comparison, done honestly',
      'Equity takeout for renovations, investment or debt payoff',
      'Switching lenders at maturity without leaving money on the table',
      'HELOC and second mortgage options where they make sense',
    ],
  },
  {
    slug: 'mortgage-pre-approval',
    label: 'Mortgage Pre-Approval',
    title: 'Mortgage Pre-Approval',
    summary: 'A verified number you can shop with, held for 60–120 days.',
    intro:
      "A pre-approval isn't a quick online estimate — it's a lender actually verifying your income, credit and debts, then holding a rate while you shop. It's the difference between guessing your budget and knowing it.",
    points: [
      'Full income, credit and debt verification',
      'Rate held for 60–120 days depending on lender',
      'A clear number before you make an offer',
      'No cost or obligation to proceed',
    ],
  },
  {
    slug: 'debt-consolidation',
    label: 'Debt Consolidation',
    title: 'Debt Consolidation',
    summary: 'Roll high-interest debt into one manageable mortgage payment.',
    intro:
      "Credit cards, lines of credit and loans at double-digit interest add up fast. Rolling that debt into your mortgage, at a mortgage rate, can meaningfully lower what you pay every month — if the math actually works in your favour.",
    points: [
      'Full picture of current debts and their real interest cost',
      'Refinance or HELOC options to consolidate',
      'Break-even analysis before you commit',
      'A payment plan that actually fits your budget',
    ],
  },
  {
    slug: 'line-of-credit',
    label: 'Line of Credit',
    title: 'Home Equity Line of Credit',
    summary: "Flexible access to your home's equity, drawn as you need it.",
    intro:
      'A home equity line of credit gives you access to funds as you need them, rather than a lump sum you pay interest on immediately. Useful for renovations, emergencies or investment opportunities that come up on their own timeline.',
    points: [
      'HELOC vs. refinance — which fits your situation',
      'Variable rate structure and how draws work',
      'Combined loan-to-value limits explained',
      'Set up alongside your existing mortgage where possible',
    ],
  },
  {
    slug: 'commercial-mortgages',
    label: 'Commercial Mortgages',
    title: 'Commercial Mortgages',
    summary: 'Office, retail, mixed-use and multi-unit investment financing.',
    intro:
      'Commercial and investment financing runs on different rules than a residential purchase — different lenders, different qualification, different timelines. I work with investors and business owners on single and multi-unit rentals, office, retail and mixed-use properties.',
    points: [
      'Single and multi-unit rental property financing',
      'Office, retail and mixed-use purchases',
      'Land and construction financing',
      'Access to private and alternative lenders for complex files',
    ],
  },
  {
    slug: 'construction-financing',
    label: 'Construction Financing',
    title: 'Construction Financing',
    summary: 'Progress-draw financing for builds and major renovations.',
    intro:
      'Financing a build or a major renovation works differently than a standard mortgage — funds are released in draws as work is completed, and lenders want to see a clear budget and timeline before they commit. I structure that financing so your draws line up with your build schedule.',
    points: [
      'Progress-draw structure explained before you break ground',
      'Builder and contractor documentation lenders will ask for',
      'Conversion to a standard mortgage once construction completes',
      'Purchase-plus-improvements for renovation-ready purchases',
    ],
  },
];

export function getMortgageServiceBySlug(slug: string) {
  return mortgageServices.find((s) => s.slug === slug);
}
