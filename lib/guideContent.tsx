/* Step-by-step content for the situation guides. Each step links back to the posts that explain it in full. */

export type GuideStep = {
  title: string;
  body: React.ReactNode;
  links?: { href: string; label: string }[];
};

export type GuideSection = { label: string; steps: GuideStep[] };

export const guideContent: Record<string, GuideSection[]> = {
  "pulled-over": [
    {
      label: "DURING THE STOP",
      steps: [
        {
          title: "Pull over safely and keep your hands visible",
          body: (
            <>
              Signal, pull to the right somewhere well lit if you can, turn the engine off, and put the window down. At night,
              turn on the dome light. Keep your hands on the wheel until the officer arrives, and{" "}
              <strong>tell them where your documents are before reaching for them</strong>.
            </>
          ),
        },
        {
          title: "Hand over license, registration, and insurance",
          body: (
            <>
              If you&apos;re driving, that&apos;s what you&apos;re required to provide. Passengers generally don&apos;t have to answer
              questions — though in some states anyone must give their name if police have reasonable suspicion of a crime.
              If you&apos;re ordered out of the car, comply: that&apos;s legal during a traffic stop.
            </>
          ),
          links: [{ href: "/blog/right-to-remain-silent", label: "WHAT YOU MUST PROVIDE" }],
        },
        {
          title: "You don't have to answer questions",
          body: (
            <>
              &ldquo;Do you know why I stopped you?&rdquo; &ldquo;Where are you headed?&rdquo; &ldquo;Have you had anything to drink?&rdquo; — you
              can decline, politely:
              <div className="script">&ldquo;I don&apos;t answer questions, officer. Here are my documents.&rdquo;</div>
              Anything you say can be used against you — and explaining yourself rarely talks you out of a ticket.
            </>
          ),
          links: [{ href: "/blog/right-to-remain-silent", label: "WHY SILENCE WORKS" }],
        },
        {
          title: "If they ask to search: say no, out loud",
          body: (
            <>
              <div className="script">&ldquo;I do not consent to searches.&rdquo;</div>
              Saying no isn&apos;t evidence of guilt. If they search anyway — because they claim probable cause or have a
              warrant — don&apos;t physically resist. Your refusal matters later, in court.
            </>
          ),
          links: [{ href: "/blog/probable-cause", label: "WHAT PROBABLE CAUSE MEANS" }],
        },
        {
          title: "Ask if you're free to go",
          body: (
            <>
              <div className="script">&ldquo;Officer, am I free to go?&rdquo;</div>
              If yes, leave calmly. If no, you&apos;re being detained — stay calm and stay quiet.
            </>
          ),
        },
        {
          title: "You can record — just don't reach suddenly",
          body: (
            <>
              Filming police doing their job in public is protected by the First Amendment. Say that you&apos;re recording,
              keep the phone visible, and don&apos;t let it become a reason for the stop to escalate.
            </>
          ),
          links: [{ href: "/blog/recording-police", label: "RECORDING POLICE" }],
        },
      ],
    },
    {
      label: "IF IT GOES FURTHER",
      steps: [
        {
          title: "If you're arrested, say the words — then stop talking",
          body: (
            <>
              Staying silent isn&apos;t enough on its own. You have to say it:
              <div className="script">&ldquo;I am invoking my right to remain silent. I want a lawyer.&rdquo;</div>
              Then say nothing else until you have one. Police don&apos;t have to read you Miranda rights just because you&apos;re
              arrested — only before a custodial interrogation.
            </>
          ),
          links: [
            { href: "/blog/miranda-rights-when", label: "WHEN MIRANDA APPLIES" },
            { href: "/printables/know-your-rights-card", label: "WALLET CARD" },
          ],
        },
        {
          title: "Getting a ticket: sign it, fight it later",
          body: (
            <>
              In most states signing a ticket isn&apos;t admitting guilt — it acknowledges you received it, and refusing to sign
              can get you arrested in some. The place to contest it is court, not the roadside.
            </>
          ),
        },
        {
          title: "Afterward: write it all down",
          body: (
            <ul>
              <li>Officer&apos;s name, badge number, and car number</li>
              <li>Time, exact location, and what was said</li>
              <li>Any witnesses, and your own recording</li>
              <li>If you believe the stop or search was unlawful, a lawyer can request bodycam and dashcam footage</li>
            </ul>
          ),
        },
      ],
    },
  ],

  "first-apartment": [
    {
      label: "BEFORE YOU SIGN",
      steps: [
        {
          title: "Read the lease clauses that cost people money",
          body: (
            <>
              Look for: <strong>automatic renewal</strong> (and the notice deadline to leave), <strong>joint and several
              liability</strong> (you owe your roommate&apos;s share if they bail), <strong>early termination fees</strong>,
              attorney&apos;s fees clauses, and how much notice the landlord gives before entering.
            </>
          ),
          links: [{ href: "/blog/lease-clauses", label: "LEASE CLAUSES TO WATCH" }],
        },
        {
          title: "Get every promise in writing",
          body: <>&ldquo;We&apos;ll repaint before you move in,&rdquo; pet permission, parking, who pays which utilities — if it isn&apos;t in the lease or an email, it doesn&apos;t exist.</>,
        },
        {
          title: "Know your state's deposit rules",
          body: <>Many states cap how much a landlord can charge as a deposit and set a deadline for returning it with an itemized list of deductions. Search &ldquo;[your state] security deposit law&rdquo; now, not at move-out.</>,
          links: [{ href: "/tools/deadline-checker", label: "DEPOSIT DEADLINE CHECKER" }],
        },
        {
          title: "Get renters insurance",
          body: <>Around $12–20 a month. Your landlord&apos;s insurance covers the building, not your stuff — or you, if someone gets hurt in your place. Some leases require it anyway.</>,
          links: [{ href: "/blog/renters-insurance", label: "WHAT RENTERS INSURANCE COVERS" }],
        },
      ],
    },
    {
      label: "MOVE-IN DAY — BEFORE YOU UNPACK",
      steps: [
        {
          title: "Document everything",
          body: (
            <>
              Walk every room with the move-in checklist and take date-stamped photos and video of every wall, floor, appliance,
              and existing scratch. Email them to yourself <em>and</em> the landlord the same day — that timestamp is what wins
              deposit disputes.
            </>
          ),
          links: [{ href: "/printables/move-in-inspection", label: "PRINT THE CHECKLIST" }],
        },
        {
          title: "Find the shutoffs",
          body: (
            <>
              The main water shutoff, the valves under each toilet and sink, the breaker panel, and the gas shutoff if there is
              one. A burst pipe gives you seconds. Fill in the home emergency sheet and stick it on the fridge.
            </>
          ),
          links: [
            { href: "/blog/water-shutoff-locations", label: "WATER SHUTOFFS" },
            { href: "/printables/home-emergency-sheet", label: "EMERGENCY SHEET" },
          ],
        },
        {
          title: "Test the smoke and CO detectors",
          body: <>Press the test button on each one. Missing, dead, or beeping detectors are the landlord&apos;s job in most places — report them in writing.</>,
          links: [{ href: "/blog/smoke-co-detector-placement", label: "WHERE DETECTORS GO" }],
        },
        {
          title: "Learn the breaker panel",
          body: <>Figure out which breaker controls which room, and label it if it isn&apos;t. When something trips at 11pm, you&apos;ll know exactly where to go.</>,
          links: [{ href: "/blog/breaker-box-basics", label: "BREAKER BOX BASICS" }, { href: "/tools/circuit-load-calculator", label: "CIRCUIT LOAD TOOL" }],
        },
      ],
    },
    {
      label: "THE FIRST FEW WEEKS",
      steps: [
        {
          title: "Put every repair request in writing",
          body: <>Email or text, never just a phone call. Written requests start the clock on the landlord&apos;s duty to repair and protect you if they retaliate later.</>,
          links: [{ href: "/tools/can-my-landlord-do-that", label: "CAN MY LANDLORD DO THAT?" }],
        },
        {
          title: "Pay rent in a way that leaves a record",
          body: <>Bank transfer, check, or a portal with receipts. If you ever pay cash, get a signed, dated receipt every time.</>,
        },
        {
          title: "Know the entry rules",
          body: <>In most states the landlord has to give 24–48 hours notice before coming in, except for real emergencies.</>,
          links: [{ href: "/blog/landlord-rights", label: "WHAT LANDLORDS CAN'T DO" }],
        },
      ],
    },
  ],

  "huge-medical-bill": [
    {
      label: "FIRST 48 HOURS",
      steps: [
        {
          title: "Don't pay it yet — and don't put it on a credit card",
          body: (
            <>
              The first number is rarely the final number. Paying with a credit card turns medical debt (which has extra
              protections and often no interest) into 20%+ APR card debt. Call the billing office, tell them you&apos;re reviewing
              the bill, and ask them to note the account — that keeps it from going to collections while you work on it.
            </>
          ),
        },
        {
          title: "Match it against your insurance paperwork",
          body: (
            <>
              If you have insurance, find the <strong>Explanation of Benefits</strong> (EOB) for this visit in your insurer&apos;s app.
              Check that the claim was actually submitted, what insurance paid, and what it says you owe. If a claim was denied,
              you have the right to appeal — for most plans the deadline is 180 days.
            </>
          ),
          links: [{ href: "/blog/insurance-terms-decoded", label: "DEDUCTIBLE, COPAY, OUT-OF-POCKET MAX" }],
        },
        {
          title: "Surprise out-of-network bill? That may be illegal",
          body: (
            <>
              The federal No Surprises Act generally blocks surprise out-of-network bills for emergency care and for
              out-of-network doctors at an in-network hospital. If you&apos;re billed more than your in-network cost-sharing for
              those, dispute it with the provider and file a complaint (search &ldquo;No Surprises Act complaint&rdquo;).
            </>
          ),
          links: [{ href: "/blog/er-vs-urgent-care", label: "INSURANCE AND THE ER" }],
        },
      ],
    },
    {
      label: "CUTTING IT DOWN",
      steps: [
        {
          title: "Request the itemized bill",
          body: <>Line by line, with billing codes. Look for duplicate charges, things you never received, and upcoding (billed for a bigger version of what was done). Errors are common.</>,
          links: [{ href: "/blog/medical-bill-negotiation", label: "HOW TO NEGOTIATE" }],
        },
        {
          title: "Apply for financial assistance — even if you think you won't qualify",
          body: (
            <>
              Nonprofit hospitals are required to have charity care programs, and many cover people well into the middle class
              (often up to 200–400% of the federal poverty level). Ask:
              <div className="script">&ldquo;Do you have a financial assistance program? How do I apply?&rdquo;</div>
              Apply before paying anything. Approval can wipe out the bill entirely.
            </>
          ),
        },
        {
          title: "Negotiate what's left",
          body: (
            <>
              Look up what Medicare pays for the same billing codes and use it as your benchmark. Offer a lump sum:
              <div className="script">&ldquo;I can pay $[amount] today as payment in full. Can you accept that?&rdquo;</div>
              Hospitals often settle for a fraction of the billed amount, especially for uninsured patients.
            </>
          ),
        },
        {
          title: "Get it in writing before you pay",
          body: <>The agreement should say &ldquo;paid in full&rdquo; or &ldquo;settled in full.&rdquo; No written agreement, no payment.</>,
        },
        {
          title: "Can't pay a lump sum? Ask for an interest-free plan",
          body: <>Most hospitals offer them. Avoid medical credit cards offered at the front desk — many use deferred interest that hits you with every dollar of back interest if you&apos;re a day late.</>,
          links: [{ href: "/tools/debt-payoff-calculator", label: "WHAT CARD INTEREST COSTS" }],
        },
      ],
    },
    {
      label: "IF IT HITS COLLECTIONS",
      steps: [
        {
          title: "Dispute in writing within 30 days",
          body: <>When a collector first contacts you, they have to send a validation notice. Dispute in writing within 30 days of getting it and they must stop collecting until they prove the debt.</>,
          links: [{ href: "/tools/deadline-checker", label: "DEADLINE CHECKER" }],
        },
        {
          title: "Know how credit reporting treats medical debt",
          body: <>The three credit bureaus currently remove paid medical collections and don&apos;t report medical collections under $500. On old debt, don&apos;t make a &ldquo;good faith&rdquo; payment before checking the statute of limitations — it can restart the clock.</>,
          links: [{ href: "/blog/statute-of-limitations-basics", label: "OLD DEBT & THE CLOCK" }],
        },
      ],
    },
  ],

  "buying-a-used-car": [
    {
      label: "BEFORE YOU SHOP",
      steps: [
        {
          title: "Budget the whole cost, not the monthly payment",
          body: <>Price plus tax, title, registration, and the insurance quote for that specific car. Dealers steer you toward the monthly payment because it hides the total.</>,
        },
        {
          title: "Get your own financing first",
          body: <>A pre-approval from your bank or a credit union gives you a rate to beat. If the dealer offers better, great — but now you&apos;ll know.</>,
          links: [{ href: "/blog/how-interest-works", label: "HOW INTEREST WORKS" }],
        },
      ],
    },
    {
      label: "CHECKING THE CAR",
      steps: [
        {
          title: "Run the VIN",
          body: (
            <ul>
              <li><strong>NICB VINCheck</strong> — free; flags cars reported stolen or totaled</li>
              <li><strong>NHTSA recall lookup</strong> — free; shows open safety recalls</li>
              <li>A paid history report (Carfax, AutoCheck) shows accidents, title brands, and odometer readings</li>
            </ul>
          ),
        },
        {
          title: "Read the Buyers Guide sticker",
          body: (
            <>
              Dealers are required by the FTC to post a Buyers Guide on every used car. It says whether the car is sold{" "}
              <strong>&ldquo;As Is&rdquo;</strong> or with a warranty — and it overrides anything in the contract that says otherwise.
              Take a photo of it. Private sellers don&apos;t have to provide one.
            </>
          ),
        },
        {
          title: "Look it over yourself",
          body: (
            <ul>
              <li>Tires: do the quarter test, and check the tread is even across the tire (uneven wear can mean alignment or suspension problems)</li>
              <li>Dash lights should come on at start-up, then go out. A check engine light that&apos;s off <em>and never lights at start-up</em> is a red flag</li>
              <li>Mismatched paint, uneven panel gaps, musty smell or damp carpet (flood damage)</li>
            </ul>
          ),
          links: [
            { href: "/blog/tire-tread-penny-test", label: "TIRE TREAD TEST" },
            { href: "/blog/check-engine-light-codes", label: "CHECK ENGINE CODES" },
          ],
        },
        {
          title: "Test drive it properly",
          body: <>Start it cold if you can. Drive at highway speed, brake hard once, go over bumps, and turn the wheel fully both ways. Listen with the radio off.</>,
        },
        {
          title: "Pay for an independent inspection",
          body: <>A pre-purchase inspection from a mechanic <em>you</em> choose runs about $100–200 and routinely finds thousands in problems. If the seller won&apos;t allow one, walk away.</>,
        },
      ],
    },
    {
      label: "AT THE TABLE",
      steps: [
        {
          title: "Negotiate the out-the-door price",
          body: (
            <>
              <div className="script">&ldquo;What&apos;s the total out-the-door price, with every tax and fee?&rdquo;</div>
              Negotiate that one number. Don&apos;t discuss monthly payments or your trade-in until the price is settled.
            </>
          ),
        },
        {
          title: "Refuse the add-ons you didn't ask for",
          body: (
            <>
              Extended service contracts, VIN etching, fabric protection, and paint sealant are high-margin extras. Gap insurance can
              be worth having on a loan, but is usually cheaper through your own insurer or credit union. You can say no to all of it.
            </>
          ),
          links: [{ href: "/blog/extended-warranties-scam", label: "SERVICE CONTRACTS VS WARRANTIES" }],
        },
        {
          title: "Know there's usually no take-backs",
          body: <>There&apos;s no federal cooling-off period for car purchases, and only a few states offer one. Once you sign, it&apos;s yours — which is why the inspection comes first. Lemon laws mostly cover new cars; used-car protection is weaker and varies by state.</>,
          links: [{ href: "/blog/lemon-law-basics", label: "LEMON LAWS" }],
        },
      ],
    },
  ],
};
