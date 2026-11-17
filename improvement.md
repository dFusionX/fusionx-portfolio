I'll start by auditing the actual live site. Let me look at the real content rather than working from assumptions.

Let me read the actual site content.

List the exact headline, subheadline, button labels, and section headings in order as they appear. Also note any contact details, phone number, location, team names, or client logos shown.

I've read every section of the live site and the underlying code. Here's the audit.

---

# A. Overall assessment

This is a **well-above-average site for a two-person company**. The writing is disciplined, mostly free of agency fluff, and the positioning instinct is right. Whoever wrote it already understood the brief — the existing-software angle is present, the "you may not need a rewrite" honesty is there, and the tone is calm.

So the problem is not tone or taste. The problems are **structural, and they are conversion problems, not copy problems**:

1. **The site says the same thing five times.** The Build/Improve/Modernize/Migrate/Maintain pentad appears in the hero eyebrow, the hero HUD, the Problem section, the Services spine, and the footer — and then a *second, competing* pentad (Diagnose/Optimize/Modernize/Migrate/Rebuild) appears in the Existing Software section. A visitor scrolls through five screens that deliver escalating detail on one idea.
2. **Every CTA lands in the same generic box.** Six differently-labelled buttons, one destination, one form with three fields. "Get a Technical Assessment" resolves to "What are you trying to build, fix, or improve?" — the promise breaks on arrival.
3. **The company is anonymous.** No names, no faces, no location, no LinkedIn (the link is literally `href="#"`), no phone, no visible email (Cloudflare-obfuscated). You are asking a business owner to let two strangers near their production database, and the site does not tell them who the two strangers are. This is the biggest single conversion loss on the page, and it is the cheapest to fix.
4. **The strongest proof is anonymous and the weakest-fit proof is the most prominent.** The rebuild-and-migrate story — the best asset FusionX has — is an unattributed grey card. The VOH card next to it says "coming soon." Meanwhile the most clickable item is a nursery website with a photo gallery.
5. **There is no analytics or conversion tracking of any kind.** I grepped: no GA4, no GTM, no Plausible, no Meta pixel, nothing. Running paid traffic to this site today means spending money with no ability to know which keyword produced which lead.

**Verdict: do not redesign. Restructure, de-duplicate, and add the three things that are missing (identity, packaged assessment, qualification).** Roughly 70% of the existing copy is keepable.

---

# B. What is already strong — keep this

| Element | Why it works |
|---|---|
| **Hero lede** — "We build new applications, fix what's breaking, modernize what's outdated, and migrate what you can't afford to lose — without disrupting the business that depends on it." | The best sentence on the site. Concrete, covers both directions, and "without disrupting the business that depends on it" is the exact fear the buyer has. **Do not touch this.** |
| **"Talk to an Engineer"** as a CTA label | Genuinely differentiating. It signals you won't get a salesperson. This should be the *primary* CTA, not the secondary one. |
| **"You don't necessarily need to start over."** | The single most persuasive headline on the site for the target buyer. It reduces perceived risk and demonstrates honesty in the same breath. |
| **"Understand what you're rebuilding, before you rebuild it."** | Excellent framing for the assessment. Keep verbatim. |
| **The Assessment section's two-column "We look at / You receive"** | The best-*conceived* section on the site. It's the skeleton of a real productised offer. It just isn't finished. |
| **"We don't add complexity because it's fashionable"** and "Technology should serve the problem" | Real engineering opinions. Opinions build trust for small firms; generic competence claims don't. |
| **The 6-step How We Work timeline** | Clear, honest, no jargon. Minor tightening only. |
| **Restraint on fake proof** | No fake logos, no invented statistics, no fabricated testimonials, and the JSON-LD explicitly avoids inventing an address. This is rarer than it should be and it's the right instinct. |
| **Technical hygiene** | SSR'd HTML, real metadata, canonical, OG image, robots.txt, sitemap.xml, honeypot on the form. Foundations are sound. |

---

# C. Biggest weaknesses

### C1. The redundancy problem (the #1 structural issue) — **P0**
Six restatements of one framework. The cost isn't aesthetic — it's that a visitor who has *already understood you by the end of the hero* must scroll past four more sections telling them the same thing before reaching any proof, any human, or any reason to trust you. Under paid traffic, most of them won't.

Worse, the two pentads **contradict each other**:
- Services: Build / Improve / Modernize / Migrate / **Maintain**
- Existing Software: Diagnose / Optimize / Modernize / Migrate / **Rebuild**

"Rebuild" is arguably the most important service FusionX offers (it's what the VOH story is about) and it is *absent from the five official pillars*. That's a positioning inconsistency, not just a wording one.

### C2. Anonymity — **P0**
Two-person company + zero named humans + no phone + dead LinkedIn link = worst-case trust profile. The buyer's actual unspoken question is *"if I hand these people my ERP, will they still exist in six months, and can I reach them?"* The site answers neither.

### C3. The contact form cannot qualify anyone — **P0**
Three fields: name, email, message. No phone, no company, no "existing system or new build", no scale/budget signal. The prompt's stated goal is *qualified conversations, not lead volume* — and the form is optimised for the opposite. Every ₹5,000-website enquiry and every serious ERP rebuild arrives through the identical funnel with identical information.

### C4. The Technical Assessment is an idea, not an offer — **P0**
Missing: how long it takes, what format the deliverable is, what it costs (or that it's free), what access you need from the client, and what happens after. Nobody buys an unbounded engagement from strangers. This is the highest-leverage fix on the entire site.

### C5. Proof is inverted — **P0**
- Strongest asset (rebuild + data migration) → anonymous grey card, disconnected from the VOH card two positions earlier.
- Weakest-fit asset (nursery website + gallery) → most prominent live link, and it actively signals "we build brochure sites," inviting exactly the leads you don't want.
- Most relevant asset (VOH: e-commerce + POS + backend) → "Case study — coming soon," a dead end.
- Also: **Fuse API Hub is your own product but is presented in the same grid as client work.** A careful reader will notice; an ad-traffic skimmer will assume it's a client and then feel misled if they find out. Label it honestly — it's *better* proof when framed as "we built and run this ourselves."

### C6. No objection handling anywhere — **P1**
Not one line addresses: *Will you sign an NDA? Can you work with undocumented code? Our developers left with no handover — can you take over? Who owns the code? What if you decide we shouldn't rebuild? What if you two get overloaded?* These are the actual reasons people close the tab.

### C7. No engagement-model signal — **P0 for ads**
Not pricing — *shape*. No indication of minimum engagement, retainer vs project, or typical timeline. This one omission will generate more unqualified enquiries under paid traffic than every other issue combined.

### C8. Zero analytics or conversion tracking — **P0 for ads, blocking**
Verified absent. Non-negotiable before spending a rupee on ads.

### C9. Generic filler sections — **P1**
- **Technology section**: "Monoliths · Modular Systems · Distributed Systems · SOA" is a list of architecture nouns with no information content, and *SOA* dates the site. Meanwhile the site never names a single real technology. That's the "avoid jargon" rule over-applied: the business owner forwards your site to their existing IT person, and that person is looking for "PostgreSQL, .NET, Node, AWS." Naming the real stack builds *more* trust than abstractions, and costs no clarity if kept to one line.
- **Problem section**: `[NEW] [BUG] [AGE] [MIG] [OPS]` tags add decoration, not meaning. "Have an idea? **We can build it.**" reads glib and low-status for a firm asking to touch production systems.
- **InternalSystems** and **WhyFusionX** are both fine in isolation but are the 7th and 9th restatements of capability. Fold them.

### C10. The hero HUD burns the most valuable real estate on decoration — **P1**
"System Map / FX / 01" plus a chain of the five pillars. It's a sci-fi ornament that duplicates the eyebrow *and* the Services section. That space is the single best place on the site for proof or a qualifying line.

### C11. Credibility bugs — fix today, ~1 hour total — **P0**
| Bug | Impact |
|---|---|
| `<a href="#">LinkedIn</a>` in the footer | A dead social link is worse than no link — it reads as an unfinished site. |
| Email obfuscated by Cloudflare, no plain contact address anywhere | Some visitors see nothing clickable; you lose the people who'd rather email than fill a form. |
| "Case study — coming soon" | A visible unkept promise on your most relevant client. |
| `washingtonianurseryqa.com` | The `qa` reads as a QA/staging domain to anyone technical. Is this the production URL? If not, don't link it. |

### C12. **Silent lead loss in the honeypot** — **P0 technical**
`src/components/Contact.tsx:63` uses `name="company"` as the honeypot, and `app/api/contact/route.ts:12-14` returns `{ ok: true }` when it's non-empty. Password managers and browser autofill routinely populate organisation/company fields — `autoComplete="off"` is unreliable for this. When it happens, the visitor sees **"Sent — we'll get back to you shortly."** and the message is silently discarded. Worst possible failure mode: the lead believes they contacted you.
**Fix:** rename the field to something no autofiller recognises (`fx_ref`), and add a submit-timing check instead of relying on the field alone.

### C13. Performance risk under paid mobile traffic — **P1**
Three.js + GSAP on a lead-gen page. On mid-range Android over 4G this is an LCP liability, and Google Ads charges you for clicks that bounce before paint. Worth measuring before ads, not assuming.

---

# D. Positioning recommendation

**Keep both directions, but stop presenting them as five equal options.** Five equal doors is choice paralysis; the buyer needs to self-identify in about two seconds.

**Recommended positioning:**

> **FusionX is the engineering partner for businesses that already run on software — whether that software needs to be built, or has stopped working the way the business needs.**

Then **two doors, not five:**

| Door | Buyer's self-description | Contains |
|---|---|---|
| **You have software that isn't working** | "It's slow / unstable / nobody can maintain it / our developers left / we've outgrown it" | Diagnose → Optimise → Modernise → Migrate → Rebuild |
| **You need software that doesn't exist yet** | "Spreadsheets aren't enough / off-the-shelf doesn't fit our process / we need an internal system" | Custom applications, internal systems, APIs, e-commerce, MVPs |

Maintain sits under both as the ongoing relationship, not as a fifth peer.

**Verdict on Build · Improve · Modernize · Migrate · Maintain: keep it, but demote it.** It is a genuinely good *service taxonomy* and a bad *page architecture*. Use it in exactly one place — the Services section — plus the footer. Remove it from the hero eyebrow, the hero HUD, and the Problem section. And resolve the contradiction: either **Rebuild** becomes the fifth pillar (with Maintain framed as the ongoing layer), or the Existing Software section adopts the same five verbs. Two competing pentads is strictly worse than one.

Lead with the existing-software door, because it converts better: pain outranks aspiration, it's less price-shopped, most small agencies refuse that work, and it's the one direction where you have real proof.

---

# E. Hero recommendation — **P0**

Current H1 — *"Software that keeps your business moving."* — could sit on any of ten thousand agency sites. It names no audience, no problem, and no differentiator. It's the largest text on the page doing the least work, while the eyebrow and lede carry everything.

**A hero must answer five questions above the fold. Current scorecard:**

| Question | Currently answered? |
|---|---|
| What does FusionX do? | Partly — by the eyebrow and lede, not the H1 |
| Who is it for? | **No.** "Your business" is not an audience |
| What problem does it solve? | Yes, in the lede |
| Why should I care? | **No.** No proof, no differentiator, no urgency |
| What do I do next? | Yes, but "Start a Project" is the wrong ask |

### Three options

**Option 1 — Lead with the situation (recommended)**
> **The software your business runs on shouldn't be the thing holding it back.**
>
> *(keep the existing lede verbatim)*

Broad enough for both doors, specific about the buyer's felt experience, and "the software your business runs on" implicitly qualifies out anyone shopping for a brochure site.

**Option 2 — Lead with the differentiator (highest conversion for the existing-software wedge, narrower)**
> **We work on the software you already have — not just the software you're about to build.**

Sharpest and most memorable. Risk: slightly de-emphasises custom development, which the brief says must stay major. Best used as the H1 of the dedicated *Existing Software* landing page rather than the homepage.

**Option 3 — Lead with the audience**
> **Custom software and engineering help for businesses that depend on it to operate.**

Clearest, most literal, most ad-compatible — and the most forgettable. Safe fallback.

**Take Option 1 for the homepage, Option 2 for the modernisation landing page.**

### Also change in the hero
- **Add a qualifying line under the CTAs** — the cheapest bad-lead filter that exists:
  *"We work with small and mid-sized businesses that run on software. We're not the right fit for brochure websites or one-week projects."*
  Saying who you're *not* for raises credibility with the people you *are* for.
- **Fix the CTAs.** "Start a Project" excludes your best leads — nobody with a failing ERP thinks of themselves as starting a project. Primary: **"Talk to an Engineer"** with a time-box ("30 minutes, no cost"). Secondary: **"See how we assess an existing system."** "See Our Work" is a weak secondary that currently sends people to a nursery gallery.
- **Replace the HUD** with something load-bearing: a three-line proof strip (what you've actually worked on: e-commerce + POS + internal business software; a rebuild with full data migration; ongoing engineering) or the two-doors selector. Keep the visual language — just make the content mean something.
- **Fix the eyebrow.** Drop the pentad. Use: *"Custom software · Existing systems · Data migration"* or a plain audience line.

---

# F. CTA / conversion recommendation

### F1. One label per intent, and each must land somewhere that matches — **P0**
Today: six labels, one destination, one generic form. Collapse to **two paths**, each with a real destination:

| Intent | Label | Destination |
|---|---|---|
| Existing system problem | **Get a Technical Assessment** | Assessment page/section with its own pre-qualified form |
| New build | **Talk to an Engineer** | Contact form with build-specific fields |

Retire "Start a Project" and "Start a Conversation" — bland, and the first actively mis-filters.

### F2. Rebuild the form to qualify — **P0**
Add, in this order of value:
1. **Which best describes your situation?** (radio) — existing system that needs work / new system to build / not sure yet, need an assessment / ongoing engineering support
2. **Phone or WhatsApp** (optional but present) — SMB owners want to talk; a form-only channel loses your highest-intent leads
3. **Company name** (real field — and rename the honeypot, see C12)
4. **Rough scale of what you're planning** — deliberately vague bands, no prices invented. Even *"exploring / have budget approved / urgent"* filters hard.
5. **Privacy line:** *"We'll only use this to reply. We don't share it, and we'll sign an NDA if you need one."*

Roughly 5 fields, one screen. Slightly lower volume, materially higher quality — which is the stated goal.

### F3. Add a non-form channel — **P0**
Phone or WhatsApp, visible, with hours/timezone. For SMB decision-makers this is often the *only* channel they'll use.

### F4. Set a response expectation — **P1**
*"We reply within one business day — you'll be talking to the person who'd do the work."* Turns "two people" from a liability into the actual benefit.

### F5. Instrument everything — **P0, blocking for ads**
GA4 or Plausible + conversion events on form submit, phone tap, and email click. Without this, ad spend is untraceable.

---

# G. Technical Assessment recommendation

**Yes — make this

the primary conversion mechanism for the existing-software half.** It's the strongest idea in the current site and the most under-built. It converts because it's a *small, bounded, low-risk first step* toward a decision the buyer is already anxious about, and it inverts the sales dynamic: you're not pitching a rebuild, you're offering to find out whether one is needed.

### What it needs — **P0**
Right now it lists inputs and outputs but no shape. Add:

1. **Duration** — "Typically one to two weeks, depending on system size."
2. **Deliverable format** — "A written report plus a walkthrough call." Currently a visitor can't tell whether they get a document or a conversation.
3. **What you need from them** — read access to the codebase and database, a conversation with whoever knows the system, sample data. *State this plainly.* It signals you've done it before, and it pre-empts the "what will they demand from me?" hesitation.
4. **Explicit no-obligation clause** — **"The report is yours. If it says you don't need a rebuild, it says that, and you can take it to any developer."** This single sentence is the most trust-generating line available to a two-person firm. It also converts people who suspect the assessment is a rebuild sales pitch — which, on every competitor's site, it is.
5. **What it does *not* include** — not a full security audit, not a fixed-price quote for the rebuild. Bounded scope reads as professional.

### Paid or free? — **recommend paid, with one exception**

**Charge for it.** Free assessments attract tyre-kickers, get treated as disposable, and are the fastest way for two people with limited hours to drown in unpaid pre-sales work. A paid assessment is itself a qualification filter — anyone who won't pay for a diagnosis certainly won't fund a rebuild.

**Exception:** a free, genuinely short first call (30 minutes) *before* the paid assessment. That's the low-friction top of funnel; the paid assessment is step two.

**Recommended model — credit it back:** *"If you go ahead with the work, the assessment fee comes off the first invoice."* Removes the "am I paying twice?" objection while keeping the filter intact.

**Decisions you need to make (I am deliberately not inventing numbers):**
- The assessment fee, and whether it's flat or banded by system size
- Whether it's credited against subsequent work — and if so, fully or partially
- Maximum system size you'll assess at the flat fee, and what triggers custom scoping
- Turnaround you can *actually* commit to with two people and existing clients
- Whether you'll publish the fee on the site or quote it after the free call

**My recommendation: publish it.** A published fee is the single strongest unqualified-lead filter available to you, and it converts serious buyers faster because they don't have to ask. If you're not ready, use *"Assessments are a fixed fee, quoted after a 30-minute call"* — never leave it blank.

### Own page or section? — **both, in this order**
1. **Now (P0):** strengthen the homepage section with the five items above.
2. **Before ads (P0):** a dedicated `/technical-assessment` page. This is your highest-intent ad destination — it's what someone searching *"is my software worth rebuilding"* or *"legacy system assessment"* actually wants, and it's the page most likely to convert cold traffic.

---

# H. Case study / proof recommendation

### H1. Merge the VOH card and the anonymous rebuild card — **P0**
They're the same story, told twice, in two places, with the connection hidden. Right now the strongest narrative on the site has no client attached and the named client has no narrative. Combine them into one anchor case study and drop "coming soon."

If VOH permits naming: name them. If not, "a multi-location optical retail business" is far stronger than "a business application" — it lets the target buyer recognise themselves.

### H2. The story to tell — restructured for the buyer's decision path
The current version buries the most valuable element (the judgement call). Structure it as:

1. **The situation** — years of continuous feature additions on a system that started smaller
2. **What that produced** — a database structure and architecture that made every new change slower and riskier than the last
3. **What was tried first** — incremental optimisation, honestly reported as having reached diminishing returns *(this is the credibility beat: it proves you don't reach for a rebuild first)*
4. **The judgement** — what you assessed, and why rebuilding became the practical answer rather than the default one
5. **The hard part** — years of business data and operational history that could not be treated as disposable
6. **What happened** — a new foundation, with existing data carried across in a controlled, validated process
7. **The outcome, stated honestly** — the business moved forward on what it had already built rather than starting from zero

**No fabricated metrics.** No percentages, no speed multiples, no time-saved. If you have no measured numbers, say so — and consider adding one honest, non-quantified line such as *"We don't publish performance numbers we didn't measure."* That reads as more credible than a suspiciously round "3× faster," and it's consistent with the rest of your voice.

**If you can obtain even one measured fact** from VOH — a real query timing, a real deployment frequency, a real count of records migrated — get it. Records-migrated is usually the easiest to obtain and the most reassuring to this buyer.

### H3. Fix the other two cards — **P1**
- **Fuse API Hub** — relabel from "Product · API Infrastructure" to something explicit like *"Our own product — built and operated by us."* It becomes stronger proof (you run production software, not just deliver it) *and* removes the risk of a reader feeling misled.
- **Washingtonia Nursery** — **demote or remove from the homepage.** It's the most clickable item and it says "we build websites with photo galleries," which contradicts the positioning and attracts precisely the leads you're trying to filter out. Also confirm `washingtonianurseryqa.com` is really the production domain — the `qa` reads as staging. Keep it on a full work page if you want; don't lead with it.

### H4. Add one honest scale statement — **P1**
Something like *"Two engineers. We take on a small number of clients at a time, and you work directly with the people writing the code."* Positions small as deliberate rather than as a limitation you're hiding.

### H5. Ask VOH for a testimonial — **P1**
You have an ongoing relationship. One real sentence from a real named client outperforms every word of copy on this page. Do not write it yourself; do not invent it while waiting.

---

# I. Paid-traffic readiness

**Current state: not ready. Do not start yet.** Blocking items:

| # | Blocker | Severity |
|---|---|---|
| 1 | No analytics or conversion tracking at all | **P0 — absolute blocker** |
| 2 | Single page, so no message-match for any keyword and no per-campaign measurement | **P0** |
| 3 | Form cannot qualify — you'll pay for clicks and learn nothing about lead quality | **P0** |
| 4 | No trust signals — cold paid traffic has zero prior context, so anonymity hurts far more here than on referral traffic | **P0** |
| 5 | No engagement-model signal — guarantees paying for ₹5,000-website enquiries | **P0** |
| 6 | Three.js/GSAP LCP risk on mobile — you pay for clicks that bounce before paint | **P1, measure first** |
| 7 | Nursery-website card is the most prominent link and mis-signals your market | **P1** |

### Pushback on the channel strategy

**Google Search Ads for "custom software development" is one of the worst possible starting points for you.** That keyword set is saturated by large consultancies and offshore development farms with budgets you cannot match, CPCs are high, and intent is dominated by price-shoppers. You'd be buying the most expensive, least qualified clicks available.

**The winnable terms are the problem-specific, low-competition ones** — which happen to be exactly where your differentiation lives:
- "legacy system modernization" / "modernize old software"
- "database migration services" / "migrate data to new system"
- "software is slow" / "application performance problems"
- "take over existing software project" / "original developer left"
- "custom ERP for [industry]" / "outgrown [specific off-the-shelf tool]"

Low volume, high intent, far cheaper, and almost nobody credible is bidding on them.

**On Meta Ads: I'd skip them entirely for now.** Nobody scrolling Instagram is in-market for an ERP rebuild. There's no meaningful intent signal, and for a two-person firm the spend is better used elsewhere. The one defensible use is retargeting site visitors later — not cold prospecting.

**Blunt assessment: for an unknown two-person firm with limited budget, paid search is probably not your best first channel at all.** Referrals, your existing VOH relationship, industry-specific outbound to businesses running visibly aging systems, and a LinkedIn presence with real technical writing will almost certainly return more per rupee than cold search ads. Fix the site for *all* traffic first; treat ads as a small, tightly-scoped experiment on problem-specific keywords once tracking exists — not as the growth plan.

---

# J. Recommended website structure

**Keep the navigation nearly as-is. It's good.** Small company, simple nav — correct instinct. One addition:

```
Services   Work   Approach   About   Contact
```
→
```
Services   Work   Approach   About   [Technical Assessment]   Contact
```

Adding Assessment to the nav promotes your best conversion mechanism to top-level. If five items plus a button feels crowded, drop **Approach** from the nav (keep the section; it's a scroll destination, not a search destination).

**Add "Free 30-min call" as a subtitle under the nav button** — reduces perceived commitment at the highest-visibility CTA.

### Pages

**Now — 3 pages (P0):**

| Page | Purpose |
|---|---|
| `/` | Homepage — both doors, leading with existing software |
| `/technical-assessment` | The conversion page. Highest-intent ad destination |
| `/existing-software` (or `/software-modernization`) | The wedge. Covers diagnose/optimise/modernise/migrate/rebuild |

**Next — 2 more (P1), once ads data justifies them:**

| Page | Purpose |
|---|---|
| `/custom-software` | The build door |
| `/data-migration` | Highest-intent, narrowest, cheapest keyword set |

**Pushback on the five-page plan in the brief: don't build all five up front.** Two people cannot maintain five converting landing pages while delivering client work, and with a limited budget you won't have enough traffic per page to know which are working. **Start with three. Add pages only when a keyword group proves it deserves one.** Specifically: fold *Software Optimization* into the Existing Software page — the search intent overlaps almost completely, and splitting them dilutes both.

### Page-by-page specification

**`/existing-software`** — the wedge page
- **Search intent:** "legacy software modernization," "modernize old software," "software is slow," "developer left, need someone to take over," "rebuild old system"
- **Customer:** owner/ops lead with an aging custom system they depend on daily
- **Core pain:** *"Every change breaks something else, and I don't know whether to keep patching or start over — and I'm afraid of losing my data."*
- **Message:** "Your software may not need a rewrite. We find out what's actually wrong first." (Hero Option 2)
- **CTA:** Get a Technical Assessment
- **Proof required:** the VOH rebuild-and-migrate story; a plain statement of what you inspect
- **Objections to handle:** Will you push a rebuild I don't need? Can you work with undocumented code? Can you take over from developers who are gone? Will we lose data? Can you work on it without taking the business offline?

**`/custom-software`**
- **Search intent:** "custom business software," "custom ERP software," "custom inventory/POS system," "internal business software development"
- **Customer:** business that has outgrown spreadsheets or off-the-shelf tools
- **Core pain:** *"No product on the market matches how we actually work, and our spreadsheets have become the system."*
- **Message:** "Software built around how your business actually operates — not around what a generic product assumes."
- **CTA:** Talk to an Engineer
- **Proof required:** internal-systems experience (POS, inventory, workflow, e-commerce); the How We Work process; Fuse API Hub as evidence you operate production software
- **Objections:** What if requirements change? What if you disappear mid-project — who owns the code? How do I know you understand my industry? What does this cost, roughly? Will I be locked in to you?

**`/technical-assessment`**
- **Search intent:** "software audit," "legacy system assessment," "should we rebuild or refactor," "technical due diligence"
- **Customer:** someone facing a rebuild decision they don't feel equipped to make
- **Core pain:** *"I've been quoted for a rebuild and I have no way to judge whether I need one."*
- **Message:** "Get an engineering assessment before committing to a rebuild."
- **CTA:** Book the assessment (fee stated, or "fixed fee, quoted after a 30-minute call")
- **Proof required:** the concrete deliverable, the process, the "the report is yours even if the answer is no" guarantee
- **Objections:** Is this a sales pitch for a rebuild? What access do you need? How long? What if you tell me nothing's wrong — did I waste the money? Can I take the report to another developer?

**`/data-migration`** (P1, later)
- **Search intent:** "data migration services," "database migration," "migrate to new system without losing data"
- **Core pain:** *"Fifteen years of business data is in this system and I can't lose any of it."*
- **Message:** "We can move years of business data into a healthier system without treating your existing data as disposable."
- **CTA:** Talk to an Engineer
- **Proof:** the VOH migration; your validation process
- **Objections:** How do you verify nothing was lost? How much downtime? What if the old data is inconsistent or dirty? Can we roll back?

---

# K. Priority changes

### P0 — Critical before any paid advertising

| # | Change | Effort |
|---|---|---|
| 1 | **Fix the honeypot lead-loss bug** (`Contact.tsx:63`, `route.ts:12`) — rename field, add timing check | 15 min |
| 2 | **Fix credibility bugs** — dead LinkedIn link, plain-text email, remove "coming soon," verify the nursery domain | 1 hr |
| 3 | **Install analytics + conversion events** (GA4 or Plausible) | 1 hr |
| 4 | **Add identity** — founder names, roles, photos, real LinkedIn profiles, location/timezone | half day |
| 5 | **Add a phone/WhatsApp channel** with hours | 30 min |
| 6 | **Rewrite the hero** — new H1, keep the lede, fix CTAs, add the qualifying line, replace the HUD | half day |
| 7 | **De-duplicate** — remove the pentad from hero eyebrow, HUD, and Problem section; resolve the two-pentad contradiction | half day |
| 8 | **Package the Technical Assessment** — duration, deliverable, access needed, no-obligation clause, fee decision | 1 day + a pricing decision |
| 9 | **Rebuild the contact form** to qualify (situation, phone, company, scale band, privacy line) | half day |
| 10 | **Merge VOH + the anonymous rebuild card** into one real case study | half day |
| 11 | **Add an engagement-model line** — minimum scope / how you work / "we're not a fit for X" | 1 hr |
| 12 | **Build `/technical-assessment` and `/existing-software`** | 2–3 days |

### P1 — High value

| # | Change |
|---|---|
| 13 | Add an FAQ / objections section, including *"When we'll tell you not to rebuild"* — the strongest idea in the brief |
| 14 | Add a response-time promise and reframe "two engineers" as deliberate |
| 15 | Demote the nursery card; relabel Fuse API Hub as your own product |
| 16 | Fold InternalSystems + WhyFusionX + About into one Who-We-Are section |
| 17 | Replace the Technology section's abstractions with your actual stack, one line |
| 18 | Measure mobile LCP; consider disabling the Three.js scene below a viewport/connection threshold |
| 19 | Request a testimonial and one measured migration fact from VOH |
| 20 | Build `/custom-software` |

### P2 — Nice to have

| # | Change |
|---|---|
| 21 | Build `/data-migration` |
| 22 | Two or three genuine technical write-ups (organic search + proof of depth in one move) |
| 23 | Tighten the How We Work timeline from 6 steps to 4 |
| 24 | Add `Service` / `FAQPage` JSON-LD once those pages exist |
| 25 | Remove the `[NEW] [BUG] [AGE]` bracket tags |

---

# Proposed homepage structure

| # | Section | Status | Purpose |
|---|---|---|---|
| 1 | **Hero** — new H1, existing lede, dual CTA, qualifying line, proof strip replacing the HUD | Rewrite | Answer all five hero questions |
| 2 | **Two doors** — "software that isn't working" / "software that doesn't exist yet" | Replaces Problem | Self-identification in 2 seconds |
| 3 | **Existing software** — "You don't necessarily need to start over" | Keep, strengthen | The differentiating wedge |
| 4 | **Technical Assessment** — packaged: duration, deliverable, access, no-obligation, fee | Keep, complete | Primary conversion mechanism |
| 5 | **Services** — the five verbs, condensed, **the only place they appear** | Keep, condense | Full capability, once |
| 6 | **Case study** — VOH + rebuild/migration, merged and named | Merge | Anchor proof |
| 7 | **Other work** — Fuse API Hub (labelled as own product), nursery demoted | Restructure | Breadth without mis-signalling |
| 8 | **How we work** — 6 steps, tightened | Keep | Process = risk reduction |
| 9 | **Who we are** — named founders, photos, honest scale, real stack, engineering philosophy | **New** — absorbs About / WhyFusionX / InternalSystems / Technology | Largest trust gain available |
| 10 | **Questions people ask** — objections, incl. "when we'll tell you not to rebuild" | **New** | Removes exit reasons |
| 11 | **Contact** — qualifying form, phone/WhatsApp, email, response promise, privacy line | Rewrite | Qualified conversations |

Twelve sections become eleven, with roughly a third less scroll length, one framework instead of two, and the two highest-value missing pieces added.

---

---

# Revised copy — highest-priority sections only

Everything below uses only facts present on the current site or in your brief. **`[BRACKETED]` items are things I don't know and you must supply — do not ship them as-is.**

## 1. Hero — P0

> **Eyebrow:** Custom software · Existing systems · Data migration
>
> # The software your business runs on shouldn't be the thing holding it back.
>
> We build new applications, fix what's breaking, modernize what's outdated, and migrate what you can't afford to lose — without disrupting the business that depends on it.
>
> **[ Talk to an Engineer ]** — 30 minutes, no cost
> **[ See how we assess an existing system → ]**
>
> We work with small and mid-sized businesses that run on software. We're not the right fit for brochure websites or one-week projects.

**Proof strip replacing the HUD:**

> **What we work on**
> E-commerce, POS, and internal business systems — in production, in daily use.
> A business application rebuilt on a new foundation, with years of existing data migrated across.
> Ongoing engineering for systems the business can't afford to have go down.

---

## 2. Two doors — P0 *(replaces the Problem section)*

> **Eyebrow:** Where things stand
>
> ## Two kinds of software problem.
>
> Most businesses that come to us are in one of two situations. Both are normal.

> ### You already have software, and it's not working the way it needs to
>
> It's slower than it used to be. Changes take longer and break more. The database has grown messy after years of additions. The people who originally built it may be gone. You're not sure whether it needs fixing, modernizing, or replacing.
>
> **We start by finding out which — before recommending anything.**
>
> **[ Get a Technical Assessment → ]**

> ### You need software that doesn't exist yet
>
> Your process doesn't fit any product on the market. Spreadsheets have quietly become the system. Off-the-shelf software covers 60% of what you do and fights you on the rest. You know what the business needs; you need someone to build it properly.
>
> **We build around how your business actually operates.**
>
> **[ Talk to an Engineer → ]**

---

## 3. Technical Assessment — P0

> **Eyebrow:** Before you rebuild
>
> ## Understand what you're rebuilding, before you rebuild it.
>
> Not every slow or unstable application needs to be rewritten. Not every aging system can be saved with another patch. We assess your existing software, find the underlying problems, and tell you which of those two situations you're actually in.

> **We look at**
> Architecture · Database design · Backend · APIs · Infrastructure · Performance · Security · Scalability · Technical debt · Deployment · Dependencies

> **You receive a written report covering**
> **Current state** — what exists today, described plainly
> **Problems** — what's holding the system back
> **Root causes** — why those problems exist, not just where they show up
> **Recommendations** — what should change, and what shouldn't
> **Roadmap** — what to do first, second, and later
>
> Plus a walkthrough call to go through it with you and answer questions.

> **How it works**
> **Takes** `[1–2 WEEKS — CONFIRM]`, depending on the size of the system.
> **We'll need** read access to the code and database, some sample data, and a conversation with whoever knows the system best.
> **Cost** — `[DECIDE: publish a fixed fee, or "a fixed fee, quoted after a 30-minute call." Do not leave blank.]` `[RECOMMENDED: If you go ahead with the work, the assessment fee comes off your first invoice.]`
> **Not included** — a full security audit, or a fixed-price quote for the rebuild itself. Those come after, if you want them.

> **The report is yours.**
> If the assessment says your system doesn't need rebuilding, that's what it will say — and you can take the report to any developer you like. We'd rather tell you the truth than sell you a rebuild you don't need.
>
> **[ Book a Technical Assessment ]**

---

## 4. Case study — P0 *(replaces both the VOH card and the anonymous card)*

> **Eyebrow:** Case study
>
> ## When software outgrows its foundation
>
> **`[VOH Opticians — CONFIRM PERMISSION TO NAME; otherwise: "A multi-location optical retail business"]`**
> *E-commerce · POS · internal business systems*

> **The situation**
> A business application had been running and growing for years. Features were added continuously as the business changed — each one reasonable on its own. Over time, the original database structure and architecture stopped matching what the system had become.
>
> **What that meant day to day**
> Changes took longer than they should have. Each new addition carried more risk than the last. The parts of the system that worked well were increasingly held back by the parts underneath them.
>
> **What we tried first**
> Optimization, before replacement. Some of it helped. But we reached the point where each further improvement cost more and returned less — the constraint wasn't the code we were fixing, it was the foundation beneath it.
>
> **The decision**
> We assessed the system and concluded that the next version needed a healthier database and architecture. That wasn't the starting assumption; it was the conclusion after finding out where the problems actually came from.
>
> **The hard part**
> Years of business data and operational history. None of it disposable. A rebuild that lost it would have cost the business more than the problems it was meant to solve.
>
> **What we did**
> Designed the next version on a sound foundation, and migrated the existing data across in a controlled, validated process.
>
> **Where it landed**
> The business didn't start from zero. It moved forward on everything it had already built.
>
> *We don't publish performance figures we didn't measure. If you want to know how we'd approach a system like yours, ask us.*

---

## 5. Who we are — P0 *(new; absorbs About / WhyFusionX)*

> **Eyebrow:** Who you'll be working with
>
> ## Two engineers. You'll work with the people writing the code.
>
> **`[FOUNDER NAME]`** — `[ROLE]`
> `[ONE OR TWO SENTENCES: what they focus on, relevant background. Real facts only.]`
> `[LINKEDIN URL]`
>
> **`[FOUNDER NAME]`** — `[ROLE]`
> `[ONE OR TWO SENTENCES]`
> `[LINKEDIN URL]`
>
> Based in `[CITY, COUNTRY]`. We work `[TIMEZONE / HOURS]`.

> FusionX is deliberately small. We take on a limited number of clients at a time, which means there's no account manager between you and the person who understands your system. When you ask why something is slow, you're asking the person who looked at it.
>
> We work across the whole lifecycle of a system — from the first idea through production, maintenance, modernization, and migration — and beyond the interface: databases, backend systems, architecture, infrastructure, and data.
>
> **What we actually work with:** `[LIST YOUR REAL STACK — e.g. languages, databases, cloud. One line. Your client's existing IT person will look for this.]`
>
> Good engineering isn't about using the most complicated technology available. It's about understanding the problem, choosing the solution that fits, and building something that still supports the business next year.
>
> *Build what matters. Improve what exists. Prepare for what's ne**x**t.*

---

## 6. Questions people ask — P1 *(new)*

> ## Questions people ask
>
> **Will you tell me I need a rebuild when I don't?**
> No. Rebuilds are expensive and risky, and recommending one that isn't necessary would be the fastest way to lose your trust. Plenty of systems we look at need targeted fixes, not replacement. If that's yours, that's what the assessment will say.
>
> **Our original developers are gone and there's no documentation. Can you still help?**
> Yes — this is one of the most common situations we're called into. Reading an unfamiliar system and working out how it actually behaves is part of the job.
>
> **Will we lose data in a migration?**
> Not if it's done properly. Migration is a controlled, validated process: we move the data, verify it against the original, and confirm the results before anything is switched over. `[ADD YOUR ACTUAL ROLLBACK/VERIFICATION APPROACH IN ONE SENTENCE.]`
>
> **Can you work on our system without taking the business offline?**
> That's usually the requirement, and we plan for it from the start. `[ONE SENTENCE ON HOW — staging environments, phased cutover, out-of-hours switchover. Only what you actually do.]`
>
> **Who owns the code?**
> You do. `[CONFIRM AND STATE YOUR ACTUAL TERMS — including repository access and handover if the relationship ends.]`
>
> **Will you sign an NDA?**
> Yes, before you share anything about your system.
>
> **You're only two people. What if you get busy — or disappear?**
> A fair question, and it's why we take on a limited number of clients rather than as many as possible. `[ADD WHAT YOU ACTUALLY DO: documented handover, client-owned repositories, code and infrastructure access always in your client's name. Answer this honestly — a straight answer here builds more trust than avoiding the question.]`
>
> **What don't you do?**
> Brochure websites, one-week projects, and work where the budget doesn't match the problem. If we're not the right fit, we'll say so on the first call rather than after you've paid for something.

---

## 7. Contact — P0

> **Eyebrow:** Get in touch
>
> ## Tell us what you're dealing with.
>
> Whether you're starting something new, working with a system that's become a problem, or planning a migration — the first step is understanding what's actually going on. The first call is 30 minutes and costs nothing, and you'll be talking to an engineer, not a salesperson.
>
> **We reply within one business day.**
>
> **Call or WhatsApp:** `[NUMBER]` · `[HOURS, TIMEZONE]`
> **Email:** hello@fusionx.tech *(as plain, clickable text — not Cloudflare-obfuscated)*

> **Form**
> Name *
> Email *
> Phone or WhatsApp *(optional — often faster)*
> Company
>
> **Which best describes your situation?** *
> ○ We have software that needs fixing, improving, or replacing
> ○ We need software built that doesn't exist yet
> ○ We need to migrate to a new system without losing our data
> ○ We need someone to take over and maintain an existing system
> ○ Not sure yet — we'd like an assessment first
>
> **Where are you in the process?** *
> ○ Just exploring
> ○ Planning, with budget to allocate
> ○ Urgent — something is broken now
>
> **What's going on?** *
> *(textarea)*
>
> **[ Send ]**
>
> We'll only use this to reply. We don't share it, and we'll sign an NDA before you tell us anything about your system.

---

## What I'd do this week

1. Fix the honeypot bug, the dead LinkedIn link, the obfuscated email, and "coming soon" — a couple of hours, and #1 may be silently costing you real leads right now.
2. Install analytics. Everything else is guesswork without it.
3. Add the founder section. Biggest trust gain per hour of work on the entire site.
4. Decide the assessment fee and model. This is a business decision only you can make, and it blocks the most valuable page on the site.
5. Ship the hero rewrite and the de-duplication pass.

Then build `/technical-assessment` and `/existing-software`, and only then consider a small, tightly-scoped ad test on problem-specific keywords — not on "custom software development."