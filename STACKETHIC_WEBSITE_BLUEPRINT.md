STACKETHIC — Reference Website Reverse-Engineering Blueprint
0. Purpose and fidelity target
This document records the visible structure and motion behavior in the supplied reference video and turns it into an implementation/QA brief for Codex.

Target: reproduce the reference as closely as the available evidence and assets allow. Treat the reference as the source of truth. Do not redesign, simplify, reinterpret, or add visual effects that are not supported by the reference.

Important fidelity distinction: the recording is a 25.37-second, 720×540, 30 fps screen capture. It shows a website being scrolled through inside a browser-like frame, with a soft green blurred surround. It is not a clean source export of the website and does not expose source CSS, DOM, original assets, exact viewport dimensions, or all interaction states. The timestamps below are approximate observations from sampled frames. Exact easing curves, CSS values, and hover/click behavior must be measured from a higher-quality/live reference if available; they must not be fabricated and described as exact.
1. Source-video facts
- Duration: 25.37 seconds
- Frame size: 720 × 540
- Frame rate: 30 fps
- Total frames: 761
- Visual capture: website viewport centered inside a soft, blurred green background; a thin browser/header-like strip is visible above the page in most frames.
- The page itself uses a restrained fintech/SaaS visual language:
  - warm white / ivory surfaces
  - very dark olive-green panels and text
  - bright lime / chartreuse accent
  - pale blue-lavender feature card
  - muted green gradients
  - rounded cards and pill controls
  - editorial photography and compact UI/dashboard mockups
  - restrained, clean sans-serif typography with large editorial headlines
2. Page structure and observed sequence
The page appears to contain these sections in this order:
1. Hero
2. Payment / partner proof and product feature section
3. Growth capital feature cards
4. Fee calculator
5. FAQ
6. Customer testimonial
7. Latest articles
8. Financing-experts CTA
9. Footer
2.1 Hero — approximately 00:00–00:03
Visual composition
- Dark photographic hero surface.
- Large portrait of a smiling woman positioned toward the center/right.
- Main heading on the left/lower-left: “Build for fast moving business” (visible wording).
- Small supporting copy below the heading.
- Bright lime pill-shaped primary CTA.
- Floating white product/dashboard card toward the lower-right.
- Minimal top navigation: small brand mark centered, navigation links on the left, account/action controls on the right.
- The hero is framed by a soft green blurred outer surround in this recording.
Observed behavior
- Hero remains largely stable through the opening seconds.
- Around 2.5–3.0s, the hero moves upward/out of the viewport as the next white section enters from below.
- This looks like page scrolling/section progression in the capture. Do not assume a bespoke horizontal hero transition without further evidence.
Implementation requirements
- Preserve the dark image-led composition and text hierarchy.
- Treat portrait, heading, CTA, and floating dashboard as separate layers so their responsive positions can be tuned independently.
- Recreate the top navigation only if it belongs to the reference page being implemented; do not accidentally duplicate a shared site header.
2.2 Payment / partner proof section — approximately 00:03–00:07
Visual composition
- White / warm-white background.
- Narrow centered pill or eyebrow near the top.
- Horizontal partner/payment brand logo row.
- Large left-aligned heading: “Build for your next gen of payment” (visible wording).
- Small supporting paragraph and compact pill CTA on the left.
- Right side contains product UI cards:
  - pale blue rectangular card
  - dark olive rounded rectangular card with small payment/dashboard imagery
  - small floating interface details.
Observed behavior
- Partner logo row is visible across the upper area.
- Heading text reveals progressively: early frames show only part of the heading, then the full two-line heading becomes visible.
- Product cards appear to move/reveal into their final positions while the section settles.
- The logo row appears to shift horizontally between sampled frames, suggesting a marquee/continuous logo track; confirm loop direction and speed from source if possible.
Implementation requirements
- Keep logo row, copy block, and product-card cluster as independent elements.
- If implementing a marquee, make it seamless with duplicated track content and no visible jump.
- Reveal heading by line or word only if it matches the reference; avoid generic fade-on-scroll applied to everything.
2.3 Growth capital feature cards — approximately 00:06.5–00:11
Visual composition
- White background with a large heading: “Access the growth capital you need, fast”.
- Small outlined/pill action near the top-right.
- Three side-by-side feature cards:
  1. Green-toned card with UI/offer content.
  2. Pale lavender card with financial/performance content.
  3. Photo-led card with a woman using a device and white overlay text.
- Rounded corners and tight spacing.
- The three cards have intentionally different surface treatments and content density.
Observed behavior
- Heading is visible before all card details fully settle.
- Cards become populated/revealed over the following seconds.
- The center card includes a changing financial value in subsequent frames; the value appears to count/change rather than remain static.
- The section remains on screen until the next section enters.
Implementation requirements
- Use a three-column layout at desktop, but do not force three columns on narrow mobile.
- Keep each card's background, radius, internal padding, and content hierarchy distinct.
- Reproduce any count-up values as animated values only where confirmed; use deterministic final values and respect reduced-motion.
- Do not make all three cards identical components if their internal visual behavior differs.
2.4 Fee calculator — approximately 00:10.5–00:14
Visual composition
- White background.
- Left side headline: “One transparent fee. No hidden costs.”
- Small explanatory copy and a compact dark/olive pill CTA below.
- Right side bright lime/chartreuse calculator card.
- Calculator card contains:
  - small label/title
  - prominent monetary amount
  - horizontal slider/scale-like control
  - lower range/value information
- A dark olive horizontal band is visible at the bottom edge of the section.
Observed behavior
- Section enters from below while the prior feature cards move upward/out.
- Calculator amount visibly changes across sampled frames (for example, a low/zero state followed by larger currency values). This is a count-up or live calculator animation.
- Supporting values/range appear below the main amount.
- The panel remains stable before the FAQ section takes over.
Implementation requirements
- Build the calculator as a real accessible interactive component if the original interaction is intended to be functional; otherwise reproduce the visual animation with clearly separated data/state.
- Match the bright lime panel dimensions and typography hierarchy.
- Animate numerical values with a controlled count-up, not random values.
- If the slider is interactive, the displayed output must derive from its value.
- Provide keyboard-accessible controls and a reduced-motion fallback.
2.5 FAQ — approximately 00:13.5–00:17
Visual composition
- Full dark olive/near-black-green section.
- Lime/chartreuse heading on the left: “Frequently Asked Questions”.
- Small intro sentence below.
- Right side contains a vertical list of questions.
- Each question row has a small plus icon at the far right.
- Fine horizontal separators / low-contrast row boundaries.
- Spacious two-column composition.
Observed behavior
- FAQ section rises into view as the calculator section moves away.
- The question list is visible in a compact stacked layout.
- The video does not clearly demonstrate a question being clicked or expanded; accordion open-state behavior is therefore not verified.
Implementation requirements
- Preserve dark olive surface and high-contrast lime heading.
- Use semantic buttons for question rows.
- Implement accordion behavior only as expected for a functioning FAQ, but do not claim its exact open animation is copied from this video.
- Keep plus/minus or icon state synchronized with expanded state.
- Ensure focus states remain visible on the dark background.
2.6 Testimonial — approximately 00:16.5–00:20
Visual composition
- Large photographic panel featuring a woman with glasses, centered/right, surrounded by soft greenery.
- Image fills most or all of the section.
- Text sits in the lower-left over the image:
  - small customer/name/company line
  - larger lime/yellow testimonial quote
- Small circular/utility controls are visible near the lower-right edge.
Observed behavior
- Portrait image enters from below as the FAQ moves upward/out.
- The photo then remains stable for several seconds while testimonial copy appears/settles.
- The quote occupies multiple lines and is positioned over the darker lower part of the image for readability.
Implementation requirements
- Use a real high-resolution image with the same crop/composition if available.
- Use a controlled dark/green overlay or gradient only as needed to match the text contrast in the reference.
- Keep image crop, quote width, and bottom-left positioning independently responsive.
- Do not substitute an unrelated stock portrait if the original asset can be obtained.
2.7 Latest articles — approximately 00:19.5–00:22
Visual composition
- White background.
- Heading at top-left: “Our latest Articles”.
- Small “Show all” style link/action at top-right.
- Three horizontal editorial cards with rounded corners:
  - close-up work/desk or business image
  - person in a meeting/consultation
  - portrait/person in a green-toned setting
- Each card has a darkened lower region or image overlay with compact white article title.
Observed behavior
- Article section enters as the testimonial moves upward.
- Cards become fully visible and settle in a three-column row.
- The capture does not show hover states or card navigation.
Implementation requirements
- Keep image-led card treatment and consistent card heights.
- Use object-fit cover with individually tuned focal positions.
- Ensure article titles remain legible over images.
- Make each card a real link if article destinations exist.
2.8 CTA — approximately 00:21.5–00:24.5
Visual composition
- Pale lime/cream gradient-like surface.
- Three small article/feature cards appear near the top edge, likely carried from or adjacent to the preceding section.
- Centered headline: “Speak to our financing experts”.
- Short centered supporting copy.
- Small social-proof/avatars row.
- Dark pill CTA.
- Large dark olive rounded footer surface begins below.
Observed behavior
- CTA enters after article cards.
- The heading and supporting content are centered.
- Footer surface rises into view from the bottom during the last seconds.
Implementation requirements
- Match the calm centered composition and large negative space.
- Keep the CTA surface visually distinct from the dark footer.
- Preserve the transition from pale section to dark footer; do not abruptly cut between them.
2.9 Footer — approximately 00:23.5–00:25.37
Visual composition
- Large dark olive rounded rectangular footer panel.
- Brand mark and short description on the left.
- Multiple navigation/link columns on the right.
- Social icons grouped near the lower-left.
- Small legal/copyright text near the bottom.
Observed behavior
- Footer panel progressively occupies more of the lower viewport as the page reaches the end.
- Final frames show most of the footer panel and CTA area above it.
Implementation requirements
- Build a responsive multi-column footer that collapses cleanly on mobile.
- Match dark olive surface, rounded upper corners, spacing, and low-contrast supporting text.
- Do not invent menu labels or destinations; use the agency's actual information.
3. Motion and transition inventory
The recording primarily demonstrates a vertical page journey. The following are visible or strongly suggested:
Approx. time	Motion / event	Confidence
00:00–00:02.5	Hero remains stable; subtle visual movement may exist in image/UI	Medium
00:02.5–00:03.2	Hero scrolls upward; next white section enters	High
00:03–00:04.5	Partner/logo row and heading progressively reveal; product cards settle	Medium
00:06.5–00:08	Growth-capital section enters; feature cards reveal	High
00:08–00:10.5	Financial number/card content changes/counts	High
00:10.5–00:11.5	Growth section scrolls away; calculator section enters	High
00:11.5–00:13.5	Calculator amount animates through values	High
00:13.5–00:14.5	Dark FAQ section enters from below	High
00:16.5–00:17.5	FAQ moves away; portrait testimonial enters	High
00:17.5–00:19.5	Testimonial text becomes/continues visible over portrait	Medium
00:19.5–00:20.5	Testimonial scrolls away; articles section enters	High
00:21.5–00:22.5	Pale CTA section enters; centered content settles	High
00:23.5–00:25.3	Dark footer rises into view	High


Motion values that must be measured, not guessed
The 720×540 recording is insufficient to confidently extract exact values for:
- easing curve names / cubic-bezier control points
- scroll trigger start/end positions
- animation duration of individual child elements
- exact stagger intervals
- parallax travel distance
- image scale and focal-point movement
- sticky/pinned behavior versus ordinary scroll
- whether transitions are driven by GSAP, CSS, native scroll, or a smooth-scroll library
Codex must not invent exact numbers and label them “reference-exact”. It should use measured values from frame analysis where possible and clearly mark any remaining approximation.
4. Visual design system to infer and verify
Palette (qualitative only)
- Primary dark: deep olive / near-black green.
- Accent: bright lime / chartreuse.
- Base: warm white / ivory.
- Secondary card: pale blue / lavender.
- Supporting tones: muted sage, soft green gradient, warm neutral photography.
Do not hardcode guessed hex values as exact. Sample from the highest-quality source or original website if available.
Typography
- Large, editorial, compact headlines.
- Mostly sans-serif appearance.
- Strong contrast between large headings and small supporting labels.
- Buttons and metadata use compact type.
- Exact font family is not identifiable with certainty from this compressed recording. Inspect original site assets or font files before choosing a substitute.
Shape language
- Rounded cards, moderate-to-large corner radii.
- Small pill-shaped buttons and labels.
- Clean rectangular panels with occasional rounded corners.
- Generous white space and carefully controlled content density.
5. StackEthic adaptation rules
The reference appears to be a fintech/finance brand. StackEthic is a software agency, so preserve the visual and motion language, not the reference company's literal business copy, logo, customer names, product claims, or proprietary imagery.

Recommended mapping:
- Hero: StackEthic positioning statement + real agency work / abstract product visual.
- Partner proof: client logos, technology stack, or trusted-by strip (only real names/logos).
- Feature cards: services such as product engineering, web platforms, AI automation, cloud/software architecture.
- Calculator section: a useful agency-specific interactive tool or a similarly composed capability/value section; do not force a fake financial calculator if it makes no sense.
- FAQ: agency process, engagement, timelines, support, ownership.
- Testimonial: genuine client testimonial only; do not fabricate a person or quote.
- Articles: actual insights/case studies.
- CTA: “Talk to our team” / project consultation.
- Footer: actual StackEthic links and contact information.
If the user's priority is strict visual matching, keep the same section order, proportions, color rhythm, card compositions, and motion choreography while replacing only brand-specific content/assets.
6. Codex implementation instructions
Non-negotiable rules
1. Inspect the existing repository before editing.
2. Identify the current framework, routing, styling system, animation libraries, font setup, and reusable components.
3. Do not replace the project architecture just to imitate the reference.
4. Do not edit unrelated routes, shared shell, header, footer, or global styles unless the reference implementation genuinely requires it and the user approves.
5. Keep each section modular and maintainable.
6. Use real StackEthic copy, images, project screenshots, logos, and contact details supplied by the user.
7. Do not fabricate client logos, testimonials, metrics, or business claims.
8. Preserve accessibility, responsive behavior, and reduced-motion support.
9. Do not add a library before checking whether the project already has an appropriate dependency.
10. After each implementation pass, run lint, typecheck, and production build where available.
Suggested technical approach
- Use the repository's existing framework and conventions.
- Use GSAP + ScrollTrigger only if already present or approved; otherwise use the existing animation approach.
- If smooth scrolling is part of the reference and the project supports it, integrate it carefully with ScrollTrigger refresh/update behavior.
- Animate transform and opacity where possible; avoid layout-thrashing properties.
- Use will-change sparingly and remove it after animation where practical.
- Use image dimensions/aspect ratios to avoid layout shift.
- Use semantic sections, headings, buttons, links, and accessible accordion controls.
- Respect prefers-reduced-motion.
- Ensure all scroll-triggered content remains visible if JavaScript fails or reduced motion is enabled.
Build sequence
1. Repository audit and asset inventory.
2. Establish exact page/section structure.
3. Match desktop static layout before adding complex motion.
4. Match section transitions and scroll choreography.
5. Add individual card, heading, image, and number animations.
6. Match tablet and mobile layouts.
7. Compare against reference at the same viewport and scroll positions.
8. Fix visual mismatches before adding optional polish.
7. Visual QA checklist
For every section, compare:
- section height and vertical start/end
- content max-width and horizontal alignment
- heading line breaks and width
- font size, weight, line-height, letter spacing
- card dimensions, gaps, radii, and padding
- image crop and focal point
- color and contrast
- element entrance/exit direction
- timing and stagger
- overlap and clipping
- scroll position at which each section enters/leaves
- behavior at desktop, tablet, and mobile widths
Required test viewports
Use the original video's visible page proportions as a starting point, then validate at:
- 1440×900 desktop
- 1280×800 laptop
- 1024×768 tablet landscape
- 768×1024 tablet portrait
- 390×844 mobile
- 360×800 small mobile
The source capture is 720×540 and includes surrounding framing, so do not blindly treat 720×540 as the actual browser viewport.
Reduced-motion QA
- Disable non-essential parallax and long travel animations.
- Keep all content readable and in its final layout.
- Avoid hiding content behind scroll triggers.
- Keep interactive controls functional.
8. Evidence gaps and next inputs needed for true near-identical matching
To move from a strong visual reconstruction to a genuinely close reproduction, collect:
- a direct URL to the reference website, if public
- a clean screen recording without the outer blurred frame/browser overlay
- full-resolution recording or screenshots at known viewport dimensions
- a recording of the complete scroll from top to bottom at a consistent speed
- hover/click recordings for navigation, cards, CTA, FAQ, calculator, and any sliders
- original fonts and image assets, if available
- target StackEthic content, logo, color preference, case studies, and real testimonials
9. Final acceptance criteria
The implementation is accepted only when:
- every visible section exists in the correct order;
- the desktop composition closely matches the reference at equivalent scroll positions;
- the same major movement patterns and reveal order are reproduced;
- no content clips, overlaps incorrectly, or flashes during transitions;
- animated numbers reach deterministic correct values;
- all controls work and are keyboard accessible;
- mobile layout is intentionally adapted rather than merely compressed;
- reduced-motion mode remains complete and usable;
- lint, typecheck, and production build pass, or pre-existing failures are documented separately.
Honesty rule: never report “pixel-perfect” or “same-to-same verified” based only on code inspection. That claim requires side-by-side visual comparison at matching viewport sizes and scroll positions, plus motion review.