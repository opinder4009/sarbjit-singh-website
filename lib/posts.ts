export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string };

export type Source = { href: string; text: string };
export type FaqItem = { question: string; answer: string };

export type Post = {
  slug: string;
  tag: string;
  badge?: string;
  title: string;
  excerpt: string;
  metaDescription?: string;
  dateLabel: string;
  date: string;
  readTime: string;
  body: ArticleBlock[];
  sources?: Source[];
  faq?: FaqItem[];
};

function p(text: string): ArticleBlock {
  return { type: 'p', text };
}

export const posts: Post[] = [
  {
    slug: 'inside-the-first-file-back',
    tag: 'Behind The Deal',
    badge: 'New',
    title: 'Inside the First File Back',
    excerpt:
      'A walk through the eleven days between pre-approval and close on the deal that marked the return — and what nearly went wrong on day nine.',
    dateLabel: 'October 2026',
    date: '2026-10-12',
    readTime: '4 min read',
    body: [
      p(
        "The first file back wasn't supposed to be a big one. A favor for a former client, a straightforward pre-approval, nothing that should have tested a process I hadn't run in five years. It tested it anyway."
      ),
      p(
        "Day nine is where it nearly came apart — a financing condition that should have been routine, caught late, with a closing date that wasn't moving. The old instincts were still there; what had changed was how calmly I trusted them."
      ),
      p(
        "Eleven days later, the file closed clean. Not because nothing went wrong, but because something did, and the process held. That's the only kind of comeback story worth telling."
      ),
    ],
  },
  {
    slug: 'fixed-vs-variable-the-conversation-on-repeat',
    tag: 'Market Notes',
    title: 'Fixed vs. Variable: The Conversation on Repeat',
    excerpt:
      'Why so many GTA buyers are asking the same question this fall, and the honest, unglamorous answer most of them actually need to hear.',
    dateLabel: 'October 2026',
    date: '2026-10-05',
    readTime: '6 min read',
    body: [
      p(
        "Almost every call this fall opens with some version of the same question: fixed or variable? It's a reasonable thing to ask, and it's usually the wrong first question."
      ),
      p(
        'The right first question is how long you plan to hold the mortgage, and how much a rate move either way would actually change your monthly comfort — not your qualification, your comfort. That answer points to fixed or variable far more reliably than anything in the headlines.'
      ),
      p(
        "I'm not going to pretend I know where rates land next year. What I can do is run both scenarios against your real numbers and let you make the call with your eyes open."
      ),
    ],
  },
  {
    slug: 'what-five-years-off-the-board-taught-me-about-trust',
    tag: 'The Comeback',
    title: 'What Five Years Off the Board Taught Me About Trust',
    excerpt:
      'On watching the industry from the outside, and what it revealed about which habits were actually worth keeping.',
    dateLabel: 'September 2026',
    date: '2026-09-18',
    readTime: '5 min read',
    body: [
      p(
        'Watching this industry from the sidelines for half a decade is a strange education. You see which relationships were built on service, and which ones only survived because someone was still picking up the phone.'
      ),
      p(
        "Mine mostly survived. Clients I hadn't spoken to in years called the day I came back on the desk — not because I'd marketed to them, but because the file I closed for them in 2019 is still the mortgage they're living with."
      ),
      p(
        "That's the habit I kept: close it right the first time, and trust takes care of itself. Everything else about the business, I was happy to rebuild."
      ),
    ],
  },
  {
    slug: 'eighteen-holes-before-a-9am-closing-call',
    tag: 'Lifestyle',
    title: 'Eighteen Holes Before a 9AM Closing Call',
    excerpt:
      "How a Saturday golf game with the Indo-Canadian Golf Association turned into this year's biggest referral — and why the relationship always comes first.",
    dateLabel: 'September 2026',
    date: '2026-09-02',
    readTime: '3 min read',
    body: [
      p(
        "Nobody closes a deal on the back nine. What happens instead is quieter — four hours with people who aren't thinking about rates, which is exactly when the real conversations happen."
      ),
      p(
        "This year's biggest file came out of exactly that kind of Saturday, weeks before anyone mentioned a mortgage. By the time the question came up, it wasn't a pitch. It was just the natural next thing to ask a friend."
      ),
      p(
        'That’s the whole philosophy, on or off the course: be useful to people before you need anything from them. The business follows.'
      ),
    ],
  },

  // --- Mortgage Guide: evergreen reference articles ---
  {
    slug: 'mortgage-stress-test-explained',
    tag: 'Qualification',
    title: 'The Canadian Mortgage Stress Test, Explained',
    excerpt:
      "Every federally regulated mortgage in Canada is qualified at a higher \"stress test\" rate than the rate you'll actually pay. Here's how that rate is set and what it means for your budget.",
    metaDescription:
      'How the OSFI mortgage stress test works, who it applies to, why lenders use a higher qualifying rate, and how it affects how much home you can afford in Canada.',
    dateLabel: 'September 2026',
    date: '2026-09-15',
    readTime: '7 min read',
    body: [
      p(
        "If you've started shopping for a mortgage in Canada, you've probably heard the phrase \"stress test\" and wondered why it applies to you when you're not the one under stress — your finances are. The mortgage stress test isn't a medical exam or a pass/fail credit check. It's a qualification rule that requires federally regulated lenders to confirm you could still afford your payments if interest rates were higher than the rate you're actually being offered. It sounds like a technicality, but it can meaningfully change how much you're approved to borrow, so it's worth understanding before you start house hunting."
      ),
      { type: 'h2', text: 'What the stress test actually is' },
      p(
        "The stress test is a minimum qualifying rate set by the Office of the Superintendent of Financial Institutions (OSFI), the federal regulator that oversees banks and federally regulated lenders in Canada. Instead of qualifying you at the interest rate on your actual mortgage contract, your lender must test whether you could afford your payments at a higher rate. If you can't comfortably qualify at that higher rate, the lender will reduce the amount you're approved to borrow, even if you could technically make payments at your real, lower contract rate."
      ),
      p(
        "The idea behind the rule is straightforward: interest rates move over time, and a household that can only barely afford payments at today's rate could be in real trouble if rates rise before their next renewal. By testing affordability at a higher rate up front, the stress test is meant to build in a cushion so borrowers aren't stretched to their absolute limit from day one."
      ),
      { type: 'h2', text: 'How the qualifying rate is calculated' },
      p(
        "For an uninsured mortgage (generally, one with a down payment of 20% or more), OSFI's minimum qualifying rate is the higher of two numbers: your actual contract rate plus 2 percentage points, or a fixed floor rate. That floor has historically sat at 5.25%, though it's a policy figure OSFI can adjust, so it's worth confirming the current number with your broker or lender rather than assuming it never changes."
      ),
      p(
        'In practice, that means if your lender offers you a contract rate of 4.5%, your stress test rate would be the higher of 6.5% (4.5% + 2%) or the floor. Insured mortgages (those with mortgage loan insurance because the down payment is under 20%) are also stress tested, generally using a similar approach set by the insurer and regulator rules that apply to insured lending.'
      ),
      { type: 'h3', text: 'A simplified example' },
      p(
        'Say a lender offers you a 5-year fixed rate of 4.75%. Your stress test rate would be calculated as 4.75% + 2% = 6.75%. Since that’s higher than the 5.25% floor, 6.75% becomes the rate your lender uses to calculate your Gross Debt Service (GDS) and Total Debt Service (TDS) ratios — the two affordability ratios that determine how much you can borrow — not the 4.75% you’ll actually pay.'
      ),
      { type: 'h2', text: 'Who the stress test applies to' },
      p(
        "The stress test applies to mortgages from federally regulated lenders, which includes most major banks and many other institutions. It generally applies to purchases, refinances, and switches between lenders at renewal (since a lender switch is treated as a new mortgage application). It typically does not apply if you simply renew with your existing lender without changing the loan amount, since that's treated as a continuation of your existing mortgage rather than a new qualification."
      ),
      p(
        'Some credit unions and provincially regulated lenders are not required to follow OSFI’s federal stress test rules, though many choose to apply a similar affordability buffer of their own. Private and alternative lenders often use their own qualification approach entirely, which is one reason working with a broker who has access to multiple lender types can matter for borderline files.'
      ),
      { type: 'h2', text: 'How the stress test affects how much you can afford' },
      p(
        'Because the stress test uses a higher rate to calculate your GDS and TDS ratios, it directly reduces the maximum mortgage amount many borrowers qualify for compared to what they could technically afford at their real contract rate. For some buyers, especially those with tight debt-service ratios or significant existing debt, this can mean qualifying for a smaller home than they expected, or needing a larger down payment to bring the mortgage amount back within the lender’s limits.'
      ),
      {
        type: 'ul',
        items: [
          'It does not change the interest rate you actually pay, only the rate used to test affordability.',
          'It applies at initial qualification (purchase, refinance, or lender switch), not to every monthly payment going forward.',
          'It can reduce your maximum approved mortgage amount even if your income and credit are strong.',
          "Working with a broker who compares multiple lenders can help identify options if one lender's stress-tested number doesn't work for your file.",
        ],
      },
      { type: 'h2', text: 'Practical ways to plan around it' },
      p(
        'The most useful thing you can do is get a real pre-approval, not just an online calculator estimate, before you start shopping seriously. A pre-approval from a licensed mortgage professional will apply the actual stress test math to your real income, debts, and credit profile, so the number you’re working with reflects what a lender would actually approve rather than a rough guess.'
      ),
      p(
        "If your stress-tested number comes in lower than you hoped, a few common adjustments can help: paying down existing debt to improve your TDS ratio, increasing your down payment to lower the mortgage amount you need to qualify for, adding a co-signer or co-borrower to combine income, or, in some cases, looking at lenders with different qualification approaches. I can walk through which of these actually moves the number for your specific situation instead of guessing."
      ),
    ],
    sources: [
      { href: 'https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages', text: 'OSFI — Minimum qualifying rate for uninsured mortgages' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/mortgage-stress-test.html', text: 'Canada.ca — Mortgage stress test' },
      { href: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance', text: 'CMHC — Mortgage loan insurance' },
    ],
    faq: [
      {
        question: 'Does the stress test apply when I renew my mortgage?',
        answer:
          "If you renew with your existing lender without changing the loan amount, the stress test generally does not apply since it's treated as a continuation of your existing mortgage. If you switch to a new lender at renewal, it's typically treated as a new application and the stress test applies.",
      },
      {
        question: "Is the stress test rate the rate I'll actually pay?",
        answer:
          'No. The stress test rate is only used to test affordability during qualification. You pay your actual contract rate, which is usually lower than the stress test rate.',
      },
      {
        question: "Can a mortgage broker help if I don't pass the stress test with my bank?",
        answer:
          'Often, yes. I can compare multiple lenders, including credit unions and alternative lenders that may use different qualification approaches, to find an option that fits your file.',
      },
    ],
  },

  {
    slug: 'cmhc-mortgage-loan-insurance-explained',
    tag: 'Down Payment',
    title: 'CMHC Mortgage Loan Insurance: How Default Insurance Works',
    excerpt:
      "If your down payment is under 20%, your mortgage almost certainly needs default insurance. Here's what CMHC and other approved insurers actually do, and how the premium affects your loan.",
    metaDescription:
      "How CMHC mortgage loan insurance works in Canada: when it's required, who provides it, how the premium is calculated, and how it affects your mortgage.",
    dateLabel: 'August 2026',
    date: '2026-08-20',
    readTime: '7 min read',
    body: [
      p(
        "When you hear the word 'insurance' attached to your mortgage, it's natural to assume it's there to protect you if something goes wrong. Mortgage loan insurance in Canada works differently: it protects the lender, not the borrower, and it exists specifically to make certain low-down-payment mortgages possible in the first place. If your down payment is below 20% of the purchase price, understanding how this insurance works, who provides it, what it costs, and what it actually covers is one of the more useful pieces of financial literacy for a Canadian home buyer, and it's a topic that comes up in almost every high-ratio purchase conversation I have with clients."
      ),
      { type: 'h2', text: 'What mortgage loan insurance actually is' },
      p(
        "Mortgage loan insurance, often called mortgage default insurance, is a policy that a lender arranges (and the borrower ultimately pays for) to protect the lender against the risk that a borrower stops making payments and the eventual sale of the property doesn't fully recover the outstanding loan balance. Without this insurance, most federally regulated lenders would require a down payment of at least 20% before approving a mortgage, because a smaller down payment leaves less of a cushion if the lender ever needs to sell the property after a default. Insurance closes that gap by shifting the extra risk from the lender to the insurer, which is precisely what allows lenders to responsibly offer mortgages with down payments as low as 5%."
      ),
      p(
        "It's worth being clear about the direction this protection runs, because it's the single most misunderstood part of the product. If a borrower defaults and the lender has to pursue foreclosure or power of sale on the property, the insurer compensates the lender for its loss, not the homeowner. In many cases the insurer can still pursue the borrower for any shortfall between what the property sold for and what was owed. Mortgage loan insurance is a tool that expands who can qualify for a mortgage with a smaller down payment; it is not a safety net for the borrower's own finances, and it shouldn't be confused with mortgage life or disability insurance, which is a separate, optional product that does protect you personally."
      ),
      { type: 'h2', text: 'When mortgage loan insurance is required' },
      p(
        "In Canada, mortgage loan insurance is generally required whenever your down payment is less than 20% of the purchase price, a situation commonly described as a 'high-ratio' mortgage. This rule applies broadly across the country and connects directly to the minimum down payment tiers that determine how much you need to put down in the first place."
      ),
      {
        type: 'ul',
        items: [
          'On a purchase price of $500,000 or less, the minimum down payment is 5% of the price.',
          'On the portion of the price between $500,000 and $999,999, the minimum down payment is 10% of that portion, in addition to the 5% required on the first $500,000.',
          'On a purchase price of $1,000,000 or more, the minimum down payment is 20% of the price, which generally means the mortgage is arranged as an uninsured mortgage rather than an insured one.',
        ],
      },
      p(
        'The practical takeaway is that insurance eligibility is tied directly to price and down payment size, not simply to a borrower’s personal preference. A buyer putting 10% down on a $650,000 home will need mortgage loan insurance; a buyer putting 25% down on that same home will not, and will instead have an uninsured mortgage with a different qualification process.'
      ),
      { type: 'h2', text: 'Who actually provides the insurance' },
      p(
        'In Canada, mortgage loan insurance is provided by CMHC, the Canada Mortgage and Housing Corporation, which is a federal Crown corporation, as well as by other approved private mortgage insurers that operate under similar federal oversight. You typically won’t shop for mortgage insurance the way you shop for a lender or a rate; your broker or lender selects the insurer as part of structuring the deal, based on which one is the best fit for your specific file.'
      ),
      { type: 'h2', text: 'How the premium is calculated' },
      p(
        'The premium for mortgage loan insurance is calculated as a percentage of the total mortgage amount, and that percentage is tiered based on your loan-to-value ratio — simply your mortgage amount divided by the property’s value. The lower your down payment (and therefore the higher your loan-to-value ratio), the higher the percentage applied to your premium. Because these percentage tiers can be adjusted by insurers over time, it’s best to confirm the current premium schedule with me rather than relying on a figure you saw somewhere that may already be out of date.'
      ),
      { type: 'h3', text: 'How the premium is usually paid' },
      p(
        "Rather than requiring you to pay the premium out of pocket on closing day, most insured mortgages allow the premium to be added directly to the mortgage principal and amortized along with the rest of the loan. This is convenient because it avoids an extra lump-sum cost when you're already covering land transfer tax, legal fees, and other closing costs, but it does mean you're borrowing more than simply the price of the home minus your down payment, and you'll pay interest on that premium amount over the full life of the mortgage. Provincial sales tax on the premium, where applicable, generally cannot be added to the loan and must be paid separately at closing."
      ),
      { type: 'h2', text: "What the insurance protects, and what it doesn't" },
      p(
        "It bears repeating because it's the most commonly misunderstood part of this product: mortgage loan insurance protects the lender's financial interest in the loan, not your equity, your credit, or your ability to keep your home if your personal circumstances change. It does not pause or reduce your payments if you lose your job or face a medical issue, and it does not forgive any shortfall between what the property eventually sells for and what you owe if you default. If you want protection for yourself and your family, that is an entirely separate, optional product usually called mortgage life or disability insurance."
      ),
      { type: 'quote', text: "Mortgage loan insurance makes low-down-payment homeownership possible. It doesn't replace the need for your own financial cushion." },
      { type: 'h2', text: 'Amortization limits on insured mortgages' },
      p(
        'Insured mortgages are also subject to a maximum amortization period set by insurer and regulatory rules, which has generally been shorter than what’s sometimes available on uninsured mortgages. A shorter maximum amortization on an insured mortgage typically means your payments will be somewhat higher than they might be on an equivalent uninsured loan with a longer amortization schedule.'
      ),
      { type: 'h2', text: 'Putting it together for your own purchase' },
      p(
        "If you're planning a purchase with less than 20% down, the practical next step isn't to memorize premium tables, it's to have your file reviewed against the current tiers and rules so you know your real numbers before you start touring homes. I can show you what happens to your payment if you adjust your down payment even slightly, since crossing certain thresholds, like $500,000 or the 20% mark, can change both your insurance premium and your qualifying calculations at the same time."
      ),
    ],
    sources: [
      { href: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance', text: 'CMHC — Mortgage loan insurance' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html', text: 'Canada.ca — Down payment requirements' },
      { href: 'https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages', text: 'OSFI — Minimum qualifying rate for uninsured mortgages' },
    ],
    faq: [
      {
        question: 'Does mortgage loan insurance protect me if I lose my job?',
        answer:
          'No. Mortgage loan insurance protects the lender if you default; it does not pause your payments or forgive your debt. Personal protection against job loss, disability, or death comes from separate, optional insurance products.',
      },
      {
        question: 'Can I avoid mortgage loan insurance entirely?',
        answer:
          'Yes, by putting down 20% or more of the purchase price, your mortgage is generally considered uninsured and default insurance is not required, though lenders may apply different qualification criteria for uninsured mortgages.',
      },
      {
        question: 'Does the insurance premium get added to my mortgage automatically?',
        answer:
          'In most cases, yes, the premium can be added to your mortgage principal and paid off over your amortization. Provincial sales tax on the premium, where it applies, is usually a separate closing cost paid up front.',
      },
    ],
  },

  {
    slug: 'first-time-home-buyer-programs-canada',
    tag: 'First-Time Buyers',
    title: 'First-Time Home Buyer Programs and Incentives in Canada',
    excerpt:
      "From the RRSP Home Buyers' Plan to the First Home Savings Account and land transfer tax rebates, first-time buyers have several tools available. Here's how they fit together.",
    metaDescription:
      "A plain-language guide to the RRSP Home Buyers' Plan, the FHSA, land transfer tax rebates, and other tools first-time buyers in Canada can use to get into a home.",
    dateLabel: 'August 2026',
    date: '2026-08-27',
    readTime: '7 min read',
    body: [
      p(
        'Buying your first home in Canada usually means learning a new vocabulary almost overnight: down payment tiers, stress tests, closing costs, and a handful of government programs with acronyms that sound more complicated than they actually are. The good news is that several of the tools designed specifically for first-time buyers can meaningfully reduce how much cash you need up front or how much tax you pay along the way.'
      ),
      { type: 'h2', text: "The RRSP Home Buyers' Plan" },
      p(
        "The Home Buyers' Plan, commonly shortened to the HBP, allows eligible first-time buyers to withdraw funds from their Registered Retirement Savings Plan to put toward a down payment without paying tax on that withdrawal at the time. The catch, and it's an important one, is that the withdrawal isn't free money: it has to be repaid back into your RRSP over a set number of years, and if you miss a scheduled repayment, the missed portion is added to your taxable income for that year instead."
      ),
      p(
        "To use the HBP, you generally need to be considered a first-time buyer under the program's definition, which typically means you (and, in many cases, your spouse or common-law partner) haven't owned and lived in a home as your principal residence within a specific recent period."
      ),
      { type: 'h2', text: 'The First Home Savings Account' },
      p(
        'The First Home Savings Account, or FHSA, is a newer registered account designed specifically to help first-time buyers save for a home. It combines features of both an RRSP and a Tax-Free Savings Account: contributions are generally tax-deductible the way RRSP contributions are, but qualifying withdrawals used toward a first home purchase, along with any growth on your investments inside the account, come out completely tax-free. Unlike the Home Buyers’ Plan, funds withdrawn from an FHSA for a qualifying purchase don’t need to be repaid.'
      ),
      p(
        'Because the FHSA has its own annual and lifetime contribution limits, and because it can potentially be used together with the Home Buyers’ Plan on the same purchase, first-time buyers who are still a few years out from buying often benefit from opening an FHSA early and contributing steadily, even in small amounts.'
      ),
      { type: 'h2', text: 'Land transfer tax rebates' },
      p(
        'Land transfer tax is a provincial tax paid on closing when you take ownership of a property, and in Ontario it applies to most residential purchases. First-time buyers in Ontario may be eligible for a provincial land transfer tax rebate that reduces or eliminates the tax owed, up to a set maximum amount. On top of the provincial rebate, some municipalities layer on their own municipal land transfer tax with a separate first-time buyer rebate of its own; Toronto is the most well-known example.'
      ),
      p(
        "Because these rebates are usually applied directly at closing by your real estate lawyer rather than claimed later, it's important that your lawyer knows you intend to claim first-time buyer status well before your closing date."
      ),
      { type: 'h2', text: 'Extended amortization for eligible first-time and new-build purchases' },
      p(
        'From time to time, federal housing policy has extended eligibility for longer amortization periods, beyond the standard maximum typically available on insured mortgages, to specific groups such as first-time buyers or buyers of newly constructed homes. A longer amortization spreads your mortgage principal over more years, which lowers your monthly payment, though it also means paying more interest in total over the life of the loan.'
      ),
      { type: 'h2', text: 'Practical qualification tips for first-time buyers' },
      p(
        "Beyond the specific programs, first-time buyers tend to benefit from a handful of practical habits well before they apply for a mortgage. Building or strengthening a credit history matters, since lenders want to see a track record of on-time payments across a credit card or two. If part of your down payment is coming from family, a signed gift letter confirming the funds are a true gift and not a loan is something most lenders will require."
      ),
      p(
        'Getting a real pre-approval, rather than relying on an online calculator, is arguably the single most useful step a first-time buyer can take before they start touring homes seriously.'
      ),
      {
        type: 'ul',
        items: [
          'Open an FHSA as early as possible, even with modest contributions, to build tax-advantaged room ahead of your purchase.',
          'Confirm HBP eligibility and repayment obligations with a tax professional before withdrawing RRSP funds.',
          'Ask your lawyer to confirm first-time buyer land transfer tax rebate eligibility well before your closing date.',
          'Start building a credit history months, not weeks, before you plan to apply for a mortgage.',
          'Get a documented pre-approval instead of relying on an online affordability estimate.',
        ],
      },
      { type: 'h3', text: 'A note on rules outside Ontario' },
      p(
        'Land transfer tax rules, first-time buyer rebates, and any municipal add-on taxes vary by province and by municipality, so a buyer purchasing outside Ontario should confirm the local rules that apply to their own transaction. The federal programs, such as the Home Buyers’ Plan and the FHSA, apply consistently across Canada, but the provincial and municipal layer is where the details genuinely change depending on where you’re buying.'
      ),
      { type: 'h2', text: 'Bringing the pieces together' },
      p(
        'None of these programs are mutually exclusive, and for many first-time buyers the real opportunity is in combining them thoughtfully: using an FHSA and the Home Buyers’ Plan together to boost a down payment, timing a purchase to make the most of available land transfer tax rebates, and building a clean, well-documented file so a pre-approval reflects your strongest possible position.'
      ),
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html', text: 'Canada.ca — Preparing to get a mortgage' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html', text: 'Canada.ca — Down payment requirements' },
      { href: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance', text: 'CMHC — Mortgage loan insurance' },
      { href: 'https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional', text: 'FSRA — Working with a mortgage professional in Ontario' },
    ],
    faq: [
      {
        question: "Can I use the Home Buyers' Plan and the FHSA on the same purchase?",
        answer:
          'In general, both can be used toward the same qualifying first home purchase, though each has its own rules, limits, and eligibility conditions. Confirm the current rules with a tax professional before relying on both.',
      },
      {
        question: 'Do I have to repay money I withdraw from an FHSA?',
        answer:
          'No. Unlike the RRSP Home Buyers’ Plan, a qualifying withdrawal from a First Home Savings Account for a first home purchase does not need to be repaid.',
      },
      {
        question: 'Does every municipality offer a land transfer tax rebate for first-time buyers?',
        answer:
          'No. Ontario offers a provincial rebate for eligible first-time buyers, and some municipalities, such as Toronto, add their own municipal land transfer tax with a separate rebate. Most municipalities do not levy an additional municipal tax at all.',
      },
    ],
  },

  {
    slug: 'mortgage-renewal-guide',
    tag: 'Renewal & Refinance',
    title: 'Mortgage Renewal: How to Avoid Overpaying When Your Term Ends',
    excerpt:
      "The rate on your renewal letter is a starting point, not a final offer. Here's how to shop your renewal properly and avoid quietly overpaying for years.",
    metaDescription:
      "Your mortgage renewal letter isn't the final offer. Learn how to shop your renewal, compare switching costs, and avoid overpaying when your term matures.",
    dateLabel: 'September 2026',
    date: '2026-09-03',
    readTime: '7 min read',
    body: [
      p(
        "Every mortgage term eventually comes to an end, and when it does, your lender will send you a renewal letter with a proposed new rate and term. For a lot of homeowners, that letter feels like the final word: sign it, and move on with life. In reality, it's just an opening offer, and treating it as the only option available to you is one of the most common and most expensive mistakes Canadian homeowners make."
      ),
      { type: 'h2', text: 'What actually happens at renewal' },
      p(
        'When your mortgage term matures, usually after a period of one to five years depending on what you originally chose, your existing agreement ends and you need a new one, either with your current lender or a different one. A straightforward renewal with your existing lender, where the loan amount and property don’t change, is generally not subject to the same full stress test that applies to a new purchase or a lender switch.'
      ),
      { type: 'h2', text: "Why the first offer isn't necessarily the best one" },
      p(
        'Lenders count on inertia. Many homeowners simply sign whatever renewal rate shows up in the mail or their online banking portal because it feels easier than shopping around. The rate offered to an existing customer at renewal is not automatically the lowest rate that lender is willing to give, and it’s often noticeably higher than the rate a new customer might get walking in the door, or the rate you could get by asking your existing lender to match a competing offer.'
      ),
      { type: 'h2', text: 'How far ahead to start shopping' },
      p(
        'A good rule of thumb is to start actively comparing options three to four months before your maturity date. Most lenders allow you to lock in a renewal rate in advance, and many will also honour a rate drop if rates fall further before your actual renewal date, so locking in early rarely costs you the ability to benefit from a better rate later.'
      ),
      { type: 'h2', text: 'Switching lenders versus renewing in place' },
      p(
        'Switching your mortgage to a new lender at renewal is a legitimate, and sometimes very worthwhile, option, but it’s not without cost or friction. A lender switch is typically treated as a new mortgage application, which usually means it is subject to the stress test, updated income and credit verification, and a new set of lender conditions.'
      ),
      { type: 'h3', text: 'Costs that can come with switching' },
      p(
        'Switching lenders can involve discharge fees from your current lender, legal fees to register the new mortgage, and sometimes an appraisal fee. Some lenders offer to cover certain switch-related costs as an incentive to win your business, but it’s important to compare the full picture rather than just the advertised rate.'
      ),
      { type: 'h2', text: 'How to actually compare renewal offers' },
      p(
        'Rate is the number everyone focuses on first, but it’s only one piece of what makes a mortgage offer good or bad for your situation. Prepayment privileges, portability, and the penalty structure itself are all worth understanding up front rather than discovering them only when you actually need them.'
      ),
      {
        type: 'ul',
        items: [
          'Compare the actual rate, not just the discount being advertised off a posted rate.',
          'Check prepayment privileges: how much extra principal can you pay down annually without penalty.',
          "Confirm portability if there's any chance you'll move before the new term ends.",
          'Understand the penalty calculation method before you need it, not after.',
          'Ask whether the new lender or your existing lender will cover any switching costs.',
        ],
      },
      { type: 'h2', text: 'What changes if your situation has changed' },
      p(
        'A renewal is also a natural moment to reassess your broader mortgage strategy, not just the rate. If your income has grown, you may want to explore shortening your amortization to pay off the mortgage faster, or increasing your payment frequency to save on interest over time.'
      ),
      { type: 'h3', text: 'Blend-and-extend as an alternative to waiting' },
      p(
        'If rates have dropped since you arranged your current mortgage but your term isn’t up yet, some lenders will offer a blend-and-extend option instead of making you wait until maturity or pay a full penalty to break your term. This typically combines your existing rate with the lender’s current rate, weighted by how much time is left on your term versus the new term being added.'
      ),
      { type: 'h2', text: 'Making the most of your renewal window' },
      p(
        'The single most effective thing you can do at renewal is simply not treat the letter from your existing lender as your only option. Getting a comparison from me costs you nothing and takes a fraction of the time it took to originally buy your home, and it puts you in a position to either confirm your current lender’s offer is genuinely competitive or find something better.'
      ),
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/renew-mortgage.html', text: 'Canada.ca — Renewing your mortgage' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html', text: 'Canada.ca — Choosing a mortgage' },
      { href: 'https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages', text: 'OSFI — Minimum qualifying rate for uninsured mortgages' },
    ],
    faq: [
      {
        question: 'Does the stress test apply when I renew my mortgage?',
        answer:
          "If you renew with your existing lender without changing the loan amount, the stress test generally does not apply. If you switch to a new lender at renewal, it's typically treated as a new application and the stress test usually applies.",
      },
      {
        question: 'How early should I start comparing renewal offers?',
        answer:
          'Around three to four months before your maturity date is a reasonable window. It gives you time to compare lenders, lock in a rate, and still benefit if rates drop further before your term actually matures.',
      },
      {
        question: 'Is switching lenders at renewal always worth the fees?',
        answer:
          'Not always. It depends on the rate difference, any fees involved, and whether the new lender covers switching costs. Comparing total cost over the term, not just the headline rate, is the right way to decide.',
      },
    ],
  },

  {
    slug: 'fixed-vs-variable-mortgage-rates',
    tag: 'Rate Strategy',
    title: 'Fixed vs. Variable Mortgage Rates: How to Choose',
    excerpt:
      'Fixed and variable rates solve different problems: one buys certainty, the other bets on the future cost of borrowing. Here’s a framework for deciding which fits you.',
    metaDescription:
      "Fixed or variable mortgage rate? Here's how each works, how the Bank of Canada policy rate affects variable rates, and a framework for choosing.",
    dateLabel: 'September 2026',
    date: '2026-09-10',
    readTime: '6 min read',
    body: [
      p(
        "Of all the decisions you'll make when arranging a mortgage, choosing between a fixed and a variable rate tends to generate the most debate, and for good reason: it's a genuine trade-off between certainty and flexibility, with real money on either side depending on how rates move over your term."
      ),
      { type: 'h2', text: 'How a fixed rate works' },
      p(
        'With a fixed-rate mortgage, your interest rate is locked in for the entire term, whether that’s one year or five, and your regular payment amount stays the same for that whole period. The trade-off is that if rates fall significantly after you lock in, you don’t benefit from that decrease until your term ends and you renew, unless you’re willing to break your mortgage early and pay a penalty to do so.'
      ),
      { type: 'h2', text: 'How a variable rate works' },
      p(
        'A variable-rate mortgage has an interest rate that moves in line with the lender’s prime rate, which itself generally moves in response to changes in the Bank of Canada’s overnight policy rate. Depending on the specific product, a change in the underlying rate can show up in one of two ways: either your payment amount itself changes, or your payment stays fixed while the portion going toward interest versus principal shifts.'
      ),
      { type: 'h3', text: 'The historical trade-off in plain terms' },
      p(
        'Over long stretches of history, variable rates have often, though not always, worked out to be less expensive over the life of a mortgage than locking into a fixed rate at the same point in time. That said, this is a general historical pattern, not a guarantee, and anyone considering a variable rate should plan around the possibility of an increase, not just the possibility of savings.'
      ),
      { type: 'h2', text: "How the Bank of Canada's policy rate fits in" },
      p(
        'The Bank of Canada sets a policy interest rate, often called the overnight rate, as part of its mandate to manage inflation and support the broader economy. When the Bank of Canada raises or lowers this rate, commercial lenders generally adjust their own prime rate in the same direction within a short period, and since variable mortgage rates are set relative to prime, this is the mechanism that ultimately moves your variable rate.'
      ),
      { type: 'h2', text: 'Who tends to prefer which option' },
      p(
        'Homeowners who value predictability above all else, or who are on a tight household budget with little room to absorb a higher payment, often lean toward fixed-rate mortgages. Borrowers with more flexibility in their budget, a longer time horizon, or a higher tolerance for uncertainty sometimes lean toward variable rates. Neither group is right or wrong; they’re simply weighing the same trade-off differently.'
      ),
      { type: 'h2', text: 'Hybrid and combination options' },
      p(
        'Some lenders offer hybrid or combination mortgages that split your loan into two portions, one at a fixed rate and one at a variable rate, each amortized separately but paid together. These products add a layer of complexity, so it’s worth having me walk through exactly how the split works before deciding a hybrid structure is the right fit.'
      ),
      { type: 'h3', text: 'Breaking a mortgage early: penalty differences' },
      p(
        'Variable-rate mortgages generally use a simpler penalty calculation, commonly a set number of months of interest. Fixed-rate mortgages typically use the greater of that same months-of-interest calculation or an interest rate differential (IRD), which can produce a significantly larger penalty, particularly if rates have dropped since you signed your fixed-rate contract.'
      ),
      { type: 'h2', text: 'A framework for making the decision' },
      p(
        'Rather than trying to predict where interest rates are headed, it’s more productive to base your decision on your own risk tolerance and financial situation. Start by asking how your monthly budget would handle a meaningful increase in your payment; if the honest answer is "not well," that’s a strong signal toward a fixed rate regardless of what rates might do.'
      ),
      {
        type: 'ul',
        items: [
          'If a higher payment would strain your budget, a fixed rate removes that risk entirely.',
          'If you have flexibility to absorb a payment increase, a variable rate keeps more options open.',
          'A shorter expected time horizon in the home reduces your exposure either way.',
          'A hybrid or combination mortgage can split the difference, at the cost of added complexity.',
          "Neither option is inherently 'smarter'; the right one depends on your own numbers and comfort level.",
        ],
      },
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html', text: 'Canada.ca — Choosing a mortgage' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html', text: 'Canada.ca — Preparing to get a mortgage' },
      { href: 'https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages', text: 'OSFI — Minimum qualifying rate for uninsured mortgages' },
    ],
    faq: [
      {
        question: 'Is a variable rate always cheaper than a fixed rate?',
        answer:
          'Not always, though it has often worked out that way historically over full mortgage terms. Variable rates can move higher during your term, so the outcome depends on how rates actually behave.',
      },
      {
        question: 'Does the Bank of Canada set my mortgage rate directly?',
        answer:
          'No. The Bank of Canada sets a policy rate that influences lenders’ prime rate, which in turn affects variable mortgage rates. Fixed rates are influenced more by bond market conditions.',
      },
      {
        question: 'Can I switch from variable to fixed partway through my term?',
        answer:
          'Many variable-rate mortgages allow you to convert to a fixed rate during the term, though the rate you’d get and any conditions depend on your lender and product.',
      },
    ],
  },

  {
    slug: 'heloc-vs-refinance',
    tag: 'Home Equity',
    title: 'HELOC vs. Refinance: Which Is Right for Accessing Home Equity',
    excerpt:
      'A HELOC and a refinance both unlock equity in your home, but they work very differently. Here’s how to decide which one actually fits your goal.',
    metaDescription:
      'HELOC or refinance to access home equity? Compare how each works, qualification differences, and which fits renovations, debt consolidation, or investing.',
    dateLabel: 'September 2026',
    date: '2026-09-17',
    readTime: '6 min read',
    body: [
      p(
        "If you've built up equity in your home, you have options for putting that equity to work, whether that's funding a renovation, consolidating higher-interest debt, or covering a major expense. Two of the most common tools are a home equity line of credit (HELOC) and a refinance that includes an equity takeout."
      ),
      { type: 'h2', text: 'How a HELOC works' },
      p(
        'A home equity line of credit is a revolving credit facility secured against your home, similar in structure to a credit card but with a much larger limit and a much lower interest rate. Interest is generally charged only on the amount you’ve actually drawn, and many HELOCs allow interest-only payments.'
      ),
      p(
        'HELOC rates are typically variable, moving with the lender’s prime rate. Because a HELOC is a line of credit rather than a fixed loan, it’s particularly well suited to expenses that happen in stages, like a renovation with a rolling series of contractor payments.'
      ),
      { type: 'h2', text: 'How a refinance with equity takeout works' },
      p(
        'A refinance, by contrast, replaces your existing mortgage entirely with a new one, and can include taking out additional funds beyond what you currently owe. Unlike a HELOC, a refinance gives you the additional funds as a single lump sum at closing, repaid through fixed principal-and-interest payments over your amortization period.'
      ),
      { type: 'h2', text: 'Comparing the two for common goals' },
      { type: 'h3', text: 'Renovations' },
      p(
        'For renovations, a HELOC’s draw-as-needed structure is often a natural fit. That said, if you have a clearly defined renovation budget and prefer the predictability of fixed payments, folding the funds into a refinance at a fixed rate is a completely reasonable alternative.'
      ),
      { type: 'h3', text: 'Debt consolidation' },
      p(
        'Using home equity to pay off higher-interest debt can meaningfully reduce your total interest costs. A refinance is often preferred here because it converts the consolidated debt into a fixed, amortizing payment with a clear payoff date.'
      ),
      { type: 'h3', text: 'Investment purposes' },
      p(
        'Some homeowners use home equity to fund an investment property down payment, and here the flexibility of a HELOC is often valuable. This use case carries more risk, so it deserves a more careful conversation about your risk tolerance before proceeding.'
      ),
      { type: 'h2', text: 'Readvanceable mortgages: combining the two' },
      p(
        'Some lenders offer a readvanceable mortgage, which pairs a standard amortizing mortgage with a HELOC on the same property, structured so that as you pay down the mortgage principal, the available credit limit on the attached HELOC automatically increases by roughly the same amount.'
      ),
      { type: 'h2', text: 'Qualification differences' },
      p(
        'Both a HELOC and a refinance require you to qualify, including passing the relevant stress test at federally regulated lenders. HELOCs are typically capped at a lower percentage of your home’s value than a full refinance can reach.'
      ),
      {
        type: 'ul',
        items: [
          'Choose a HELOC when your expense happens in stages or is hard to predict, and you want to pay interest only on what you draw.',
          'Choose a refinance when you want a lump sum, fixed payments, and a clear payoff timeline.',
          "For debt consolidation, a refinance's fixed structure often supports better follow-through than revolving credit.",
          "For investment purposes, a HELOC's standing availability can be valuable, but carries added risk worth discussing carefully.",
        ],
      },
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/choose-mortgage.html', text: 'Canada.ca — Choosing a mortgage' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html', text: 'Canada.ca — Down payment requirements' },
      { href: 'https://www.osfi-bsif.gc.ca/en/supervision/financial-institutions/banks/minimum-qualifying-rate-uninsured-mortgages', text: 'OSFI — Minimum qualifying rate for uninsured mortgages' },
    ],
    faq: [
      {
        question: 'Do I need to requalify every time I draw on a HELOC?',
        answer:
          'No. Once a HELOC is approved and set up, you can generally draw and repay funds up to your credit limit without requalifying each time, unlike a refinance.',
      },
      {
        question: 'Is a HELOC riskier than a refinance?',
        answer:
          'Not inherently riskier, but it works differently: HELOC rates are typically variable and interest-only payments are often allowed, so it requires more discipline to actually pay down the balance.',
      },
      {
        question: 'Can I have both a mortgage and a HELOC on the same property?',
        answer:
          'Yes, many homeowners hold a traditional mortgage and a HELOC secured against the same property at the same time, provided their combined borrowing stays within the lender’s maximum loan-to-value limits.',
      },
    ],
  },

  {
    slug: 'self-employed-mortgage-guide',
    tag: 'Self-Employed',
    title: 'Self-Employed Mortgage Guide: How to Qualify in Canada',
    excerpt:
      'Self-employed income is real income, but lenders assess it differently. Here’s how qualification actually works, and how to put your strongest file forward.',
    metaDescription:
      'How self-employed borrowers qualify for a mortgage in Canada: income averaging, add-backs, stated-income options, required documents, and tips to qualify.',
    dateLabel: 'September 2026',
    date: '2026-09-22',
    readTime: '6 min read',
    body: [
      p(
        "Being self-employed shouldn't disqualify you from getting a competitive mortgage, but it does change how a lender evaluates your income. Employees typically show a lender a T4 and a couple of pay stubs and the income conversation is largely settled. Self-employed borrowers generally need to demonstrate income in a way that accounts for the fact that their reported taxable income and their actual cash flow don't always match."
      ),
      { type: 'h2', text: 'How lenders typically assess self-employed income' },
      p(
        'Most traditional lenders look at your line 150 income, or net income, from your two most recent years of Notices of Assessment, and typically average the two years together to arrive at a qualifying income figure.'
      ),
      { type: 'h2', text: 'Add-backs and why they matter' },
      p(
        'Because self-employed individuals often deduct legitimate business expenses that reduce their taxable income without reducing their actual cash available to service a mortgage, some lenders allow certain non-cash or one-time deductions to be added back to your reported income. Add-back policies vary significantly from lender to lender, which is one of the clearest reasons shopping a self-employed file across multiple lenders can make a meaningful difference.'
      ),
      { type: 'h2', text: 'Stated-income and alternative lender programs' },
      p(
        'For business owners who are newer to self-employment, or whose tax filings make traditional income verification difficult, some lenders offer stated-income or alternative documentation programs, relying on business bank statements, GST filings, or an accountant’s letter instead.'
      ),
      { type: 'h2', text: 'The down payment and rate trade-off' },
      p(
        'It’s common for self-employed borrowers to face a choice between a larger down payment to access better rates, or a somewhat higher rate in exchange for more flexible income documentation. Neither path is universally better; it depends on your situation.'
      ),
      { type: 'h2', text: 'Documentation checklist for self-employed borrowers' },
      p('A well-prepared self-employed file typically includes:'),
      {
        type: 'ul',
        items: [
          'Two years of Notices of Assessment (and proof of any amounts owing paid in full).',
          'Complete T1 General tax returns for the past two years, all pages.',
          'Business financial statements, or a letter from your accountant, for incorporated businesses.',
          'Recent GST/HST filing confirmations showing the business is registered and in good standing.',
          'Business and personal bank statements covering a recent period, typically several months.',
          'Articles of incorporation or business licence, and confirmation of your ownership percentage.',
        ],
      },
      { type: 'h2', text: 'Tips to strengthen a self-employed mortgage file' },
      p(
        'Keeping business and personal finances clearly separated, ideally through a dedicated business bank account, makes it much easier to demonstrate consistent income patterns. Keeping GST or HST filings and any business debts current also matters more than many self-employed borrowers expect.'
      ),
      { type: 'h2', text: 'Corporations versus sole proprietorships' },
      p(
        'A sole proprietor’s business income flows directly onto their personal tax return, which is generally more straightforward for a lender to review. An incorporated business owner may need a lender to look beyond the personal Notice of Assessment to the corporation’s own financial statements.'
      ),
      { type: 'h3', text: 'If your most recent year was weaker' },
      p(
        'Because most traditional lenders average two years of income, a weaker recent year is partially offset by a stronger prior year in the calculation. If you can reasonably explain a weaker year, I can sometimes present that context to a lender or identify one whose add-back policy fits your situation.'
      ),
      { type: 'h2', text: 'Working with a broker on a self-employed file' },
      p(
        'Because self-employed income assessment varies so much from one lender to the next, working with a broker who regularly places self-employed files is often the single biggest advantage available to you.'
      ),
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html', text: 'Canada.ca — Preparing to get a mortgage' },
      { href: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance', text: 'CMHC — Mortgage loan insurance' },
      { href: 'https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional', text: 'FSRA — Working with a mortgage professional in Ontario' },
    ],
    faq: [
      {
        question: 'How do lenders calculate income for self-employed borrowers?',
        answer:
          'Most lenders average your net income (line 150) from your two most recent Notices of Assessment. Some lenders allow certain add-backs for non-cash or one-time business deductions, which can increase your qualifying income.',
      },
      {
        question: "Can I get a mortgage if I've only been self-employed for one year?",
        answer:
          'It’s possible through stated-income or alternative lender programs, though these often require a larger down payment and may come with a higher rate than a fully documented, traditionally qualified mortgage.',
      },
      {
        question: 'Does keeping GST filings current really affect my mortgage approval?',
        answer:
          'Yes, it can. Outstanding tax balances or a lapsed GST/HST filing status can raise questions during underwriting and delay or complicate your approval, even when your income otherwise supports the mortgage.',
      },
    ],
  },

  {
    slug: 'newcomer-mortgage-guide-canada',
    tag: 'Newcomers',
    title: 'New to Canada? A Newcomer’s Guide to Getting a Mortgage',
    excerpt:
      'Limited Canadian credit history doesn’t mean you can’t get a mortgage. Here’s how newcomer programs work, what documentation helps, and what to expect.',
    metaDescription:
      'How newcomers to Canada can qualify for a mortgage with limited Canadian credit history, typical down payment expectations, and how a broker can help.',
    dateLabel: 'September 2026',
    date: '2026-09-25',
    readTime: '6 min read',
    body: [
      p(
        'Moving to a new country is a significant undertaking on its own, and figuring out how to buy a home once you’ve arrived adds another layer of complexity, particularly because Canadian lenders rely heavily on Canadian credit history to assess risk — exactly the thing a newcomer usually doesn’t have yet.'
      ),
      { type: 'h2', text: 'Why Canadian credit history matters so much' },
      p(
        'Canadian lenders typically rely on a credit score and credit history from Canadian credit bureaus to gauge how reliably a borrower repays debt. A newcomer who has never held a Canadian credit card, loan, or line of credit simply won’t have a score yet, through no fault of their own. Newcomer mortgage programs exist precisely to help lenders tell the difference between that and a genuinely weak credit history.'
      ),
      { type: 'h2', text: 'How newcomer mortgage programs work' },
      p(
        'A number of lenders in Canada offer newcomer or "new to Canada" mortgage programs designed to qualify borrowers using alternative evidence of creditworthiness. These programs generally look at how recently you arrived, and lean more heavily on stable, verifiable employment income and a solid down payment.'
      ),
      { type: 'h2', text: 'Alternative credit history documentation' },
      p(
        'Lenders participating in newcomer programs often accept an international credit report or reference letter from a bank in your country of origin, a consistent record of on-time rent payments, and a track record of on-time utility bill payments as evidence of financial reliability.'
      ),
      p(
        'Building at least some Canadian credit history as early as possible is still worth doing in parallel. Opening a Canadian bank account and obtaining a secured or newcomer-specific credit card can start to establish a track record that broadens your lender options.'
      ),
      { type: 'h2', text: 'Typical down payment expectations for newcomers' },
      p(
        'Down payment requirements for newcomers generally follow the same tiered rules that apply to any Canadian buyer, though newcomer programs sometimes expect a somewhat larger down payment than the bare minimum, particularly with limited Canadian credit history.'
      ),
      { type: 'h3', text: 'What credit unions and alternative lenders can offer' },
      p(
        'Beyond the major banks, some credit unions and alternative lenders are also worth considering, since they sometimes apply more flexible underwriting to borrowers with a strong income and down payment but a thin Canadian credit history.'
      ),
      { type: 'h2', text: 'Permanent residents versus work permit holders' },
      p(
        'Permanent residents are generally treated most similarly to Canadian citizens for mortgage purposes. Non-permanent residents on a valid work permit can often still qualify, but typically face a more limited set of lenders and may need a larger down payment.'
      ),
      {
        type: 'ul',
        items: [
          'Confirm how recently you landed in Canada, since most newcomer programs have an eligibility window.',
          'Gather international credit references or bank letters from your country of origin if available.',
          'Document rent and utility payment history through bank statements or a landlord letter.',
          'Open a Canadian bank account and start building local credit history as early as possible.',
          'Clarify how your immigration status (permanent resident vs. work permit) affects your lender options.',
        ],
      },
      { type: 'h2', text: 'Getting pre-approved before you start house hunting' },
      p(
        'For newcomers even more than most buyers, a real pre-approval before you start touring homes is worth the extra effort, because it tells you up front which lenders are actually willing to work with your specific status and documentation.'
      ),
      { type: 'h2', text: 'Using a co-signer or family support' },
      p(
        'Some newcomers strengthen their application by adding a co-signer, often a family member who is already a Canadian citizen or permanent resident with an established credit history. A co-signer takes on full legal responsibility for the mortgage, so it’s a decision that should be made carefully, ideally with independent advice on both sides.'
      ),
      { type: 'h2', text: 'How a broker helps newcomers compare lenders' },
      p(
        'Not every lender offers a newcomer program, and the specific rules around eligibility windows, documentation, and pricing vary considerably. I can quickly identify which lenders are actually a fit for your specific status, arrival date, income situation, and down payment.'
      ),
    ],
    sources: [
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/preparing-mortgage.html', text: 'Canada.ca — Preparing to get a mortgage' },
      { href: 'https://www.canada.ca/en/financial-consumer-agency/services/mortgages/down-payment.html', text: 'Canada.ca — Down payment requirements' },
      { href: 'https://www.cmhc-schl.gc.ca/consumers/home-buying/mortgage-loan-insurance-for-consumers/what-is-mortgage-loan-insurance', text: 'CMHC — Mortgage loan insurance' },
      { href: 'https://www.fsrao.ca/consumers/mortgage-brokering/working-mortgage-professional', text: 'FSRA — Working with a mortgage professional in Ontario' },
    ],
    faq: [
      {
        question: 'Can I get a mortgage in Canada with no Canadian credit history?',
        answer:
          'Yes, through newcomer-specific mortgage programs that many lenders offer. These programs typically rely on alternative documentation, such as international credit references, rent history, and stable income.',
      },
      {
        question: 'Do newcomers need a bigger down payment?',
        answer:
          'Standard down payment tiers apply based on purchase price, but newcomer programs sometimes expect a somewhat larger down payment than the bare minimum, particularly with limited Canadian credit history.',
      },
      {
        question: 'Does my immigration status affect which lenders I can use?',
        answer:
          'Yes. Permanent residents generally have access to the broadest range of lenders and programs. Work permit holders can often still qualify, but typically with a more limited set of lenders.',
      },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function sortedPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
