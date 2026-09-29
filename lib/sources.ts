/*
 * Per-post sources and review dates, shown at the bottom of each post and used for dateModified in JSON-LD.
 * Prefer primary sources: the agency, statute, code body, or court opinion.
 */

export type Source = { label: string; url: string };
export type PostSources = { reviewed: string; sources: Source[] };

const REVIEWED = "2026-09-29";

const CPSC_GFCI = { label: "CPSC — GFCI fact sheet", url: "https://www.cpsc.gov/safety-education/safety-guides/electronics-and-electrical-home/gfci-fact-sheet" };
const CPSC_CORDS = { label: "CPSC — Extension cord safety", url: "https://www.cpsc.gov/Safety-Education/Safety-Guides/Electronics-and-Electrical/Safety-at-Home-Extension-Cords" };
const NFPA_ELECTRICAL = { label: "NFPA — Electrical fire safety", url: "https://www.nfpa.org/education-and-research/home-fire-safety/electrical-safety-in-the-home" };
const NFPA_70 = { label: "NFPA 70: National Electrical Code", url: "https://www.nfpa.org/codes-and-standards/nfpa-70-standard-development/70" };
const OSHA_ELECTRICAL = { label: "OSHA — Electrical safety", url: "https://www.osha.gov/electrical" };
const HUD_TENANT = { label: "HUD — Tenant rights, laws and protections", url: "https://www.hud.gov/topics/rental_assistance/tenantrights" };
const FTC_WARRANTIES = { label: "FTC — Auto warranties and auto service contracts", url: "https://consumer.ftc.gov/articles/auto-warranties-and-auto-service-contracts" };
const NO_SURPRISES = { label: "CMS — No Surprises Act: your rights", url: "https://www.cms.gov/nosurprises" };
const ACLU_STOPPED = { label: "ACLU — Know your rights: stopped by police", url: "https://www.aclu.org/know-your-rights/stopped-by-police" };
const III_RENTERS = { label: "Insurance Information Institute — Renters insurance", url: "https://www.iii.org/article/renters-insurance" };

const sourceMap: Record<string, Source[]> = {
  "hot-neutral-ground": [OSHA_ELECTRICAL, NFPA_ELECTRICAL, NFPA_70],
  "breaker-box-basics": [NFPA_ELECTRICAL, OSHA_ELECTRICAL],
  "gfci-afci-outlets": [NFPA_70, CPSC_GFCI, NFPA_ELECTRICAL],
  "extension-cord-gauge": [CPSC_CORDS, { label: "CPSC — Extension cords FAQ", url: "https://www.cpsc.gov/FAQ/Extension-Cords" }, NFPA_ELECTRICAL],
  "outlet-replacement": [NFPA_70, OSHA_ELECTRICAL, CPSC_GFCI],
  "smoke-co-detector-placement": [
    { label: "NFPA — Smoke alarms", url: "https://www.nfpa.org/education-and-research/home-fire-safety/smoke-alarms" },
    { label: "NFPA — Carbon monoxide safety", url: "https://www.nfpa.org/education-and-research/home-fire-safety/carbon-monoxide" },
    { label: "CDC — Carbon monoxide poisoning", url: "https://www.cdc.gov/carbon-monoxide/" },
  ],
  "surge-protector-vs-power-strip": [NFPA_ELECTRICAL, CPSC_CORDS],
  "amperage-vs-wattage": [NFPA_ELECTRICAL, NFPA_70],
  "space-heater-safety": [
    { label: "NFPA — Home heating fires report", url: "https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/heating-equipment" },
    { label: "NFPA — Heating safety", url: "https://www.nfpa.org/education-and-research/home-fire-safety/heating" },
    { label: "U.S. Fire Administration — Heating fire safety", url: "https://www.usfa.fema.gov/prevention/home-fires/prevent-fires/heating/" },
  ],
  "water-shutoff-locations": [{ label: "EPA WaterSense — Fix a leak", url: "https://www.epa.gov/watersense/fix-leak-week" }],

  "right-to-remain-silent": [
    ACLU_STOPPED,
    { label: "Berghuis v. Thompkins (2010)", url: "https://www.law.cornell.edu/supremecourt/text/08-1470" },
  ],
  "recording-police": [
    { label: "ACLU — Recording and documenting police", url: "https://www.aclu.org/know-your-rights/recording-and-documenting-police-and-federal-agents" },
    { label: "Glik v. Cunniffe (1st Cir. 2011) — opinion PDF", url: "https://media.ca1.uscourts.gov/pdf.opinions/10-1764P-01A.pdf" },
  ],
  "small-claims-court": [
    { label: "USA.gov — Find your state and local courts", url: "https://www.usa.gov/courts" },
    { label: "California Courts — Small claims", url: "https://selfhelp.courts.ca.gov/small-claims-california" },
  ],
  "probable-cause": [
    { label: "Cornell LII — Probable cause", url: "https://www.law.cornell.edu/wex/probable_cause" },
    { label: "Terry v. Ohio (1968)", url: "https://www.law.cornell.edu/supremecourt/text/392/1" },
    { label: "Mapp v. Ohio (1961)", url: "https://www.law.cornell.edu/supremecourt/text/367/643" },
  ],
  "non-compete-agreements": [
    { label: "FTC — Noncompete rule status", url: "https://www.ftc.gov/legal-library/browse/rules/noncompete-rule" },
    { label: "Cornell LII — Covenant not to compete", url: "https://www.law.cornell.edu/wex/covenant_not_to_compete" },
  ],
  "miranda-rights-when": [
    { label: "Cornell LII — Miranda warning", url: "https://www.law.cornell.edu/wex/miranda_warning" },
    { label: "Miranda v. Arizona (1966)", url: "https://www.law.cornell.edu/supremecourt/text/384/436" },
  ],
  "statute-of-limitations-basics": [
    { label: "CFPB — Statute of limitations on a debt", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-statute-of-limitations-on-a-debt-en-1389/" },
    { label: "FTC — Debt collection FAQs", url: "https://consumer.ftc.gov/articles/debt-collection-faqs" },
  ],

  "er-vs-urgent-care": [
    { label: "CMS — EMTALA", url: "https://www.cms.gov/medicare/regulations-guidance/legislation/emergency-medical-treatment-labor-act" },
    NO_SURPRISES,
    { label: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org/" },
  ],
  "generic-vs-brand-drugs": [
    { label: "FDA — Generic drug facts", url: "https://www.fda.gov/drugs/generic-drugs/generic-drug-facts" },
    { label: "FDA — Generic drugs: questions & answers", url: "https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers" },
  ],
  "insurance-terms-decoded": [
    { label: "HealthCare.gov — Deductible", url: "https://www.healthcare.gov/glossary/deductible/" },
    { label: "HealthCare.gov — Out-of-pocket maximum", url: "https://www.healthcare.gov/glossary/out-of-pocket-maximum-limit/" },
    NO_SURPRISES,
  ],
  "prescription-cash-prices": [
    { label: "Patient Right to Know Drug Prices Act (2018)", url: "https://www.congress.gov/bill/115th-congress/senate-bill/2554" },
    { label: "Know the Lowest Price Act (2018)", url: "https://www.congress.gov/bill/115th-congress/senate-bill/2553" },
    { label: "Mark Cuban Cost Plus Drug Co.", url: "https://www.costplusdrugs.com/" },
  ],
  "reading-lab-results": [
    { label: "HHS — Your right to access your health records", url: "https://www.hhs.gov/hipaa/for-individuals/right-to-access/index.html" },
    { label: "MedlinePlus — Lab tests", url: "https://medlineplus.gov/lab-tests/" },
    { label: "American Diabetes Association — Diagnosis", url: "https://diabetes.org/about-diabetes/diagnosis" },
  ],
  "epipen-cost-alternatives": [
    { label: "FDA — First nasal spray for anaphylaxis approved (2024)", url: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-nasal-spray-treatment-anaphylaxis" },
  ],
  "telehealth-vs-urgent-care": [
    { label: "HHS — Telehealth for patients", url: "https://telehealth.hhs.gov/patients" },
    { label: "CMS — EMTALA", url: "https://www.cms.gov/medicare/regulations-guidance/legislation/emergency-medical-treatment-labor-act" },
  ],

  "landlord-rights": [HUD_TENANT, { label: "HUD — Fair housing rights", url: "https://www.hud.gov/program_offices/fair_housing_equal_opp" }],
  "lease-clauses": [HUD_TENANT, { label: "CFPB — Renting a home", url: "https://www.consumerfinance.gov/renthelp/" }],
  "mold-habitability": [
    { label: "CDC — Mold and your health", url: "https://www.cdc.gov/mold-health/" },
    { label: "EPA — Mold", url: "https://www.epa.gov/mold" },
    HUD_TENANT,
  ],
  "renters-insurance": [III_RENTERS, { label: "Insurance Information Institute — Home inventory", url: "https://www.iii.org/article/how-to-create-a-home-inventory" }],
  "home-inventory-for-insurance": [
    { label: "Insurance Information Institute — Home inventory", url: "https://www.iii.org/article/how-to-create-a-home-inventory" },
    III_RENTERS,
  ],

  "how-interest-works": [
    { label: "CFPB — Credit cards: understanding interest", url: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" },
    { label: "Federal Reserve — Consumer credit (G.19) rates", url: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  ],
  "credit-score-factors": [
    { label: "myFICO — What's in your credit score", url: "https://www.myfico.com/credit-education/whats-in-your-credit-score" },
    { label: "CFPB — Credit reports and scores", url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" },
  ],
  "medical-bill-negotiation": [
    { label: "IRS — Financial assistance policies for nonprofit hospitals (501(r))", url: "https://www.irs.gov/charities-non-profits/financial-assistance-policies-faps" },
    NO_SURPRISES,
    { label: "CFPB — Medical bills sent to collections", url: "https://www.consumerfinance.gov/ask-cfpb/what-should-i-know-about-debt-collection-and-credit-reporting-if-my-medical-bill-was-sent-to-collections-en-2122/" },
  ],
  "401k-employer-match": [
    { label: "IRS — 2026 401(k) and IRA limits", url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
    { label: "IRS — Retirement topics: vesting", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-vesting" },
  ],
  "pay-stub-decoded": [
    { label: "SSA — 2026 COLA fact sheet (wage base)", url: "https://www.ssa.gov/news/en/cola/factsheets/2026.html" },
    { label: "IRS — Tax withholding estimator", url: "https://www.irs.gov/individuals/tax-withholding-estimator" },
    { label: "IRS — Form W-4", url: "https://www.irs.gov/forms-pubs/about-form-w-4" },
  ],
  "salary-negotiation": [
    { label: "BLS — Occupational Outlook Handbook (pay by job)", url: "https://www.bls.gov/ooh/" },
    { label: "BLS — Occupational Employment and Wage Statistics", url: "https://www.bls.gov/oes/" },
  ],
  "emergency-fund-basics": [
    { label: "CFPB — Building an emergency fund", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" },
    { label: "FDIC — Deposit insurance", url: "https://www.fdic.gov/resources/deposit-insurance" },
  ],
  "credit-freeze-vs-lock": [
    { label: "FTC — Credit freezes and fraud alerts", url: "https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts" },
    { label: "CFPB — Security freezes", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-freeze-or-security-freeze-on-my-credit-report-en-1341/" },
  ],

  "tire-tread-penny-test": [{ label: "NHTSA — Tire safety", url: "https://www.nhtsa.gov/equipment/tires" }],
  "check-engine-light-codes": [{ label: "FTC — Auto repair basics", url: "https://consumer.ftc.gov/articles/auto-repair-basics" }],
  "extended-warranties-scam": [FTC_WARRANTIES, { label: "FTC — Robocalls", url: "https://consumer.ftc.gov/articles/robocalls" }],
  "lemon-law-basics": [FTC_WARRANTIES, { label: "NHTSA — Recalls lookup", url: "https://www.nhtsa.gov/recalls" }],

  "password-manager-2fa": [
    { label: "CISA — Use strong passwords", url: "https://www.cisa.gov/secure-our-world/use-strong-passwords" },
    { label: "CISA — Multifactor authentication", url: "https://www.cisa.gov/MFA" },
  ],
  "phishing-red-flags": [
    { label: "FTC — How to recognize and avoid phishing scams", url: "https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams" },
    { label: "CISA — Recognize and report phishing", url: "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing" },
  ],
  "data-broker-opt-out": [
    { label: "California Privacy Protection Agency — DROP", url: "https://privacy.ca.gov/drop/" },
    { label: "OptOutPrescreen.com (official)", url: "https://www.optoutprescreen.com/" },
    { label: "FTC — Unsolicited credit and insurance offers", url: "https://consumer.ftc.gov/articles/prescreened-credit-insurance-offers" },
  ],
  "public-wifi-vpn-myths": [
    { label: "FTC — Are public Wi-Fi networks safe?", url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know" },
  ],

  "credit-card-chargebacks": [
    { label: "FTC — Lost or stolen credit, ATM, and debit cards", url: "https://consumer.ftc.gov/articles/lost-or-stolen-credit-atm-and-debit-cards" },
    { label: "FTC — Using credit cards and disputing charges", url: "https://consumer.ftc.gov/articles/using-credit-cards-and-disputing-charges" },
  ],
  "return-policy-tricks": [{ label: "FTC — The Cooling-Off Rule", url: "https://consumer.ftc.gov/articles/buyers-remorse-ftcs-cooling-rule-may-help" }],
  "warranty-vs-insurance": [
    { label: "FTC — Businessperson's guide to federal warranty law", url: "https://www.ftc.gov/business-guidance/resources/businesspersons-guide-federal-warranty-law" },
  ],
  "subscription-cancellation-rights": [
    { label: "FTC — Negative option (click-to-cancel) rule", url: "https://www.ftc.gov/legal-library/browse/rules/negative-option-rule" },
    { label: "FTC — Report fraud", url: "https://reportfraud.ftc.gov/" },
  ],

  "got-scammed-what-now": [
    { label: "FTC — What to do if you were scammed", url: "https://consumer.ftc.gov/articles/what-do-if-you-were-scammed" },
    { label: "IdentityTheft.gov", url: "https://www.identitytheft.gov/" },
    { label: "FBI Internet Crime Complaint Center (IC3)", url: "https://www.ic3.gov/" },
  ],
  "sim-swap-protection": [
    { label: "FCC — SIM swapping and port-out fraud rules", url: "https://www.fcc.gov/consumer-governmental-affairs/fcc-announces-effective-date-sim-swapping-item" },
    { label: "FTC — SIM swap scams", url: "https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself" },
  ],
  "back-up-your-phone": [
    { label: "Apple — Back up your iPhone", url: "https://support.apple.com/en-us/108771" },
    { label: "Google — Back up or restore data on your Android device", url: "https://support.google.com/android/answer/2819582" },
    { label: "CISA — Multifactor authentication", url: "https://www.cisa.gov/MFA" },
  ],
  "jump-start-a-car": [
    { label: "NHTSA — Vehicle safety and maintenance", url: "https://www.nhtsa.gov/vehicle-safety" },
  ],
  "after-a-car-accident": [
    { label: "Insurance Information Institute — What to do at the scene of an accident", url: "https://www.iii.org/article/what-to-do-at-the-scene-of-an-accident" },
    { label: "NHTSA — Vehicle safety", url: "https://www.nhtsa.gov/vehicle-safety" },
  ],
  "correct-tire-pressure": [
    { label: "NHTSA — Tire safety", url: "https://www.nhtsa.gov/equipment/tires" },
  ],
  "dispute-credit-report-errors": [
    { label: "FTC — Disputing errors on your credit reports", url: "https://consumer.ftc.gov/articles/disputing-errors-your-credit-reports" },
    { label: "FTC — Permanent free weekly credit reports", url: "https://consumer.ftc.gov/consumer-alerts/2023/10/you-now-have-permanent-access-free-weekly-credit-reports" },
    { label: "AnnualCreditReport.com (official)", url: "https://www.annualcreditreport.com/" },
    { label: "CFPB — Submit a complaint", url: "https://www.consumerfinance.gov/complaint/" },
  ],
  "debt-collector-rules": [
    { label: "CFPB — When and how often can a debt collector call?", url: "https://www.consumerfinance.gov/ask-cfpb/when-and-how-often-can-a-debt-collector-call-me-on-the-phone-en-2110/" },
    { label: "FTC — Debt collection FAQs", url: "https://consumer.ftc.gov/articles/debt-collection-faqs" },
    { label: "CFPB — Regulation F, harassing conduct (§ 1006.14)", url: "https://www.consumerfinance.gov/rules-policy/regulations/1006/14/" },
  ],
  "at-will-employment": [
    { label: "EEOC — Prohibited employment practices", url: "https://www.eeoc.gov/prohibited-employment-policiespractices" },
    { label: "EEOC — Time limits for filing a charge", url: "https://www.eeoc.gov/time-limits-filing-charge" },
    { label: "NLRB — Your right to discuss wages", url: "https://www.nlrb.gov/about-nlrb/rights-we-protect/your-rights/your-rights-to-discuss-wages" },
  ],
  "w2-vs-1099": [
    { label: "IRS — Self-employment tax", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
    { label: "IRS — Estimated taxes", url: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
    { label: "IRS — Independent contractor or employee?", url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
  ],
  "health-insurance-after-job-loss": [
    { label: "HealthCare.gov — If you lose job-based coverage", url: "https://www.healthcare.gov/have-job-based-coverage/if-you-lose-job-based-coverage/" },
    { label: "HealthCare.gov — COBRA coverage when you're unemployed", url: "https://www.healthcare.gov/unemployed/cobra-coverage/" },
    { label: "Dept. of Labor — COBRA FAQs", url: "https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/faqs/cobra-continuation-health-coverage-workers" },
  ],
  "frozen-pipes": [
    { label: "American Red Cross — Frozen pipes", url: "https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm/frozen-pipes.html" },
    { label: "Insurance Information Institute — Severe cold weather survival guide", url: "https://www.iii.org/article/the-homeowners-severe-cold-weather-survival-guide" },
  ],
};

/* Public correction notes for substantive fixes (the About page promises these). */
const corrections: Record<string, string[]> = {
  "how-interest-works": ["Sept. 2026: Corrected the minimum-payment examples, which understated the time and interest involved — a 2% minimum at 24% APR never pays the balance down. Rate ranges updated."],
  "non-compete-agreements": ["Sept. 2026: Updated the FTC rule's status — a court set it aside in 2024, and the FTC dropped its appeal in 2025."],
  "space-heater-safety": ["Sept. 2026: Headline corrected. Space heaters cause most home heating fire deaths, not the most house fires overall."],
  "prescription-cash-prices": ["Sept. 2026: Pharmacy gag clauses have been banned since 2018 — the post previously implied they were still allowed. Cost Plus Drugs pricing updated."],
  "generic-vs-brand-drugs": ["Sept. 2026: Corrected the explanation of FDA bioequivalence (it doesn't mean generics can be 20% weaker) and the cost comparison in the summary."],
  "gfci-afci-outlets": ["Sept. 2026: Updated where GFCI protection is required under the 2020 and 2023 electrical codes."],
  "extension-cord-gauge": ["Sept. 2026: Removed advice suggesting a space heater could run on a heavy extension cord — it shouldn't use one at all."],
  "probable-cause": ["Sept. 2026: Clarified the standard for a frisk and updated the marijuana-odor rule in states with legal cannabis."],
  "small-claims-court": ["Sept. 2026: Corrected which states bar lawyers in small claims (a handful, not most) and updated dollar limits."],
  "recording-police": ["Sept. 2026: Narrowed \"every circuit agrees\" to the appeals courts that have actually ruled, and added cases."],
  "401k-employer-match": ["Sept. 2026: Contribution limits updated to 2026."],
  "pay-stub-decoded": ["Sept. 2026: Social Security wage base updated to 2026; New Hampshire and Tennessee no longer tax any income."],
};

export function sourcesForPost(slug: string): PostSources & { corrections: string[] } {
  return { reviewed: REVIEWED, sources: sourceMap[slug] ?? [], corrections: corrections[slug] ?? [] };
}

export const allSourceUrls = (): string[] => [...new Set(Object.values(sourceMap).flat().map(s => s.url))];
