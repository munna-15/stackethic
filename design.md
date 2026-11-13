StackEthic — Reference Website Design & Layout Specification
Document type: Visual design + page architecture + interaction blueprint
Brand: StackEthic
Positioning: Digital Engineering Studio
Reference asset: User-supplied 25.37-second website walkthrough (720 × 540, 30 fps)
Status: Visual analysis based on the supplied recording; details not clearly visible are explicitly marked as assumptions or implementation decisions.
0. How to use this document
This document is the primary design specification for recreating the supplied reference website for StackEthic.
Non-negotiable rules
1. Reproduce the reference's visual language and layout logic. Do not invent a generic software-agency template.
2. Preserve the sequence and character of the sections described below.
3. Adapt the original finance-product content into credible StackEthic digital-engineering content. Do not copy the original company's name, logo, wording, product UI, or proprietary assets.
4. Keep the visual system coherent across the entire page: warm pale background, dark olive/near-black sections, chartreuse/lime accents, restrained rounded corners, large clean typography, and photography/product imagery.
5. Do not make every section a card. The reference deliberately alternates open editorial layouts, image-led sections, floating cards, and a full-width dark FAQ section.
6. Do not add gradients, glows, abstract 3D objects, code rain, circuit graphics, or decorative technology illustrations unless they are genuinely visible in the reference. They are not the visual direction of this reference.
7. If a detail cannot be established from the video, do not claim it is exact. Use the implementation guidance in this document and keep the choice restrained.
Reference interpretation note
The recording shows a website inside a browser-like frame, with a soft green blurred area outside the browser viewport. Treat the browser chrome and the outside blurred green background as recording/presentation framing—not as part of the website itself. Recreate the actual website viewport, not the surrounding video background.
1. Overall visual direction
1.1 Design character
The website should feel:
- Contemporary, confident, calm, and premium.
- Editorial rather than dashboard-like.
- Human and image-led, balanced with clear product/technology evidence.
- Spacious, with generous negative space and large typographic statements.
- Distinctive through composition, color blocking, photography, and restrained motion—not through excessive effects.
1.2 Core visual ingredients
- Warm white / ivory page surfaces.
- Very deep olive / almost black-green for high-contrast sections.
- Bright soft chartreuse/lime for emphasis and calls to action.
- Pale sage, muted blue, and lavender as occasional supporting visual surfaces.
- Large, clean sans-serif typography with tight line-height.
- Rounded image panels and product mockup panels; mostly moderate corner radii.
- Capsule/pill navigation and CTA controls.
- Full-bleed human photography in selected sections.
- Simple, thin separators and low-contrast borders.
- Minimal icon use.
1.3 What to avoid
- Generic dark SaaS hero with a grid of feature cards.
- Neon green on a black background as the dominant visual treatment.
- Large floating code editor or terminal mockups as the hero's main visual.
- Random abstract SVG network illustrations.
- Excessive glassmorphism.
- Too many pills, badges, outlines, and rounded containers.
- Repeating the same three-card layout in every section.
- Dense copy and long paragraphs.
- Unnecessary statistics, client logos, or claims that StackEthic cannot substantiate.
2. Brand adaptation for StackEthic
2.1 Brand identity
Name: StackEthic
Descriptor: Digital Engineering Studio

Core message: StackEthic designs and builds reliable digital products, custom software, and automation systems that help businesses move forward.
Services to communicate
- Web Development
- Custom Software
- AI Automation
- Cloud & Server
Use these as the service vocabulary across the site. Do not force all four services into every section.
2.2 Voice and copy style
- Direct, intelligent, confident, and human.
- Short headlines with a clear benefit or point of view.
- Avoid exaggerated phrases such as “revolutionary”, “world-class”, “cutting-edge solutions”, and “transform your business” unless supported by specific proof.
- Prefer “we design”, “we engineer”, “we build”, “we make complex work simpler”.
- Keep paragraphs short—ideally 1–3 sentences.
- CTA labels should be concise and action-oriented.
2.3 Logo
Use the existing StackEthic wordmark component. Do not redraw the logo or invent a symbol. Ensure the wordmark color changes appropriately between dark and light backgrounds.
3. Color system
The reference is primarily warm-white and deep olive, with bright lime accents. The existing project tokens already provide a suitable foundation.
Role	Existing token / suggested value	Usage
Main page background	--ivory: #F7F7F0	Main light sections
Deep brand surface	--olive: #252B0B	Header capsules, FAQ, footer, dark panels
Primary accent	--lime-soft: #DDF46A	Primary CTA, highlighted words, small emphasis
Pale supporting surface	--sage: #E5EBCB	Soft panels, card backgrounds
Muted text	--olive-muted: #858873	Secondary text on light surfaces
White	#FFFFFF	Cards, text on dark surfaces
Pale blue	Approx. #D8E8E9	Optional supporting card surface
Pale lavender	Approx. #E3E4F7	Optional supporting card surface
Fine border	Low-opacity olive	Separators and subtle outlines


Color rules
- Use the existing CSS variables rather than scattering hex values throughout components.
- Deep olive should read as nearly black-green, not bright forest green.
- Lime is an accent, not a page background.
- Keep text contrast accessible.
- Do not introduce gold, electric blue, magenta, or a new dominant accent color.
- Pale blue/lavender are supporting card colors only; use sparingly and only where they help match the reference's varied card composition.
4. Typography
The reference uses a clean modern sans-serif with compact, confident headings. Use the project's existing fonts:
- Heading: Space Grotesk (--font-heading / the project's heading font variable).
- Body: DM Sans (--font-sans-next / the project's body font variable).
Typography behavior
- Hero heading: large, light-to-medium weight, tight line-height, short line lengths.
- Section headings: large but smaller than the hero, usually one or two lines.
- Body copy: readable, calm, muted; avoid tiny text.
- Navigation: compact, medium weight.
- Buttons: small-to-medium text, medium weight.
- Highlight selected words with lime or muted tone, not bolding every word.
Responsive sizing guidance
Use fluid sizing (clamp) where appropriate. Suggested starting ranges, to be visually tuned against the reference:
Element	Desktop	Mobile
Hero heading	52–72 px	38–48 px
Main section heading	38–54 px	30–40 px
Card heading	20–28 px	18–22 px
Body	15–18 px	14–16 px
Navigation	12–14 px	14–16 px
Button	13–15 px	13–15 px


These are implementation ranges, not measurements guaranteed by the recording.
5. Layout system and spacing
5.1 Page frame
- Use a centered content container with a consistent maximum width.
- Desktop content should have generous horizontal gutters.
- Sections should have substantial vertical spacing.
- Maintain a clear rhythm between full-width sections and contained content sections.
- The reference's content area is predominantly white/ivory and does not use a persistent visible sidebar.
Suggested starting values:
- Max content width: 1280–1440 px.
- Desktop horizontal padding: 48–72 px.
- Tablet horizontal padding: 28–36 px.
- Mobile horizontal padding: 20–24 px.
- Large section vertical padding: 96–144 px desktop; 64–88 px mobile.
- Card gaps: 16–24 px.
- Text measure: keep long copy around 45–65 characters per line.
5.2 Shape language
- Navigation and buttons: capsule / fully rounded.
- Large image and feature cards: moderate rounded corners, approximately 12–20 px.
- Avoid rounding every section or putting the whole page inside a giant rounded card.
- Use subtle borders and very restrained shadows.
5.3 Grid behavior
- Use asymmetrical layouts where the reference does: headline and copy on one side, visual cards or imagery on the other.
- Use 3-column feature layouts for the relevant card section.
- On mobile, stack content in a clear reading order; avoid horizontal overflow.
6. Header / navigation
Reference observation: At the beginning of the video, the header overlays the dark hero photograph. It is a compact, transparent navigation row with left-aligned links, centered brand mark, and right-side account/CTA controls.
6.1 Desktop structure
Use a three-zone header:
1. Left: compact dark translucent capsule containing three navigation links.
2. Center: centered white brand mark.
3. Right: small text link, white pill CTA, and a minimal menu icon.
Reference labels are finance-specific and must be adapted. Suggested StackEthic navigation:
- Work
- Services
- About
Right-side actions:
- Optional “Contact” or “Login” is not appropriate for this agency site; use a concise “Let’s talk” or “Start a project” pill.
- Keep a minimal menu icon if it is part of the reference composition.
6.2 Appearance
- Position over the hero, not inside a separate solid header bar.
- Transparent or subtly tinted dark capsules over the dark hero image.
- White navigation and logo text on the dark hero.
- Small capsule radii / fully rounded controls.
- Compact type and generous horizontal spacing.
- Avoid a thick bottom border.
6.3 Behavior
- Header should remain legible over the hero image.
- On scroll, use a restrained behavior only if needed for usability; do not introduce a visually heavy sticky bar that conflicts with the reference.
- Mobile navigation should open accessibly and close on Escape, close action, and navigation.
- Respect focus management and restore focus to the trigger.
- If the reference's menu animation cannot be established, use a simple short fade/slide rather than a complex invented interaction.
6.4 Mobile
- Keep the logo visible.
- Replace desktop links with a menu trigger.
- Keep the CTA reachable without crowding the header.
- Menu panel should use the same olive/ivory/lime system and typography.
- Prevent background scroll while the menu is open.
7. Homepage section order
The recording shows the following sequence. Preserve this order unless later reference footage provides evidence of a different full-page structure.
1. Image-led hero with overlay navigation.
2. Light introduction / trust strip with partner-style logos.
3. Productized capability / service introduction with two visual panels.
4. Three-card benefit / proof section.
5. Transparent process / pricing-style editorial section.
6. Dark FAQ section.
7. Full-bleed human testimonial section.
8. Latest articles / insights.
9. Final contact CTA.
10. Dark footer.
The source video is a short walkthrough, so some section transitions are only partially visible. Use this as the page architecture, not as proof of exact copy or exact pixel dimensions.
8. Section 01 — Hero
Reference timestamp: approximately 0–3 seconds.
8.1 Composition
- Full-width, image-led hero.
- Dark photographic background with a person as the main subject.
- Image fills the hero; use a carefully chosen crop with the person positioned around the center/right.
- Apply a dark overlay/gradient so white copy remains readable.
- Header overlays the image at the top.
- Large headline and short supporting paragraph sit toward the lower-left.
- Primary lime capsule CTA sits below the copy.
- A compact white product/dashboard-style visual card floats on the right side.
8.2 StackEthic adaptation
Use a real, high-quality, human-centered photograph that communicates thoughtful work, collaboration, or product building. Do not use a random stock image of a person staring at a laptop if a more editorial, authentic image is available.

Possible hero headline directions (choose one, do not display all):
- “Build what moves your business forward.”
- “Digital products, engineered for what’s next.”
- “From complex ideas to dependable software.”
Supporting copy should mention the studio's focus on web products, custom software, automation, and dependable engineering in one concise sentence.

CTA:
- Primary: “Start a project” / “Let’s talk”
- Optional secondary link only if the reference clearly supports one.
8.3 Right-side visual
Replace the original finance dashboard card with a genuine StackEthic project/product visual:
- a refined website or product interface preview,
- a small responsive UI composition,
- or a carefully art-directed project screenshot.
It should look like a real interface, not a floating generic illustration. Keep it secondary to the headline and photograph.
8.4 Hero implementation details
- Height should feel immersive, approximately 80–100svh on desktop depending on the actual image crop.
- Use background-size: cover or an optimized image with object-fit: cover.
- Add a dark overlay with a stronger gradient behind text.
- Keep text width controlled; avoid overly long lines.
- On mobile, keep the subject visible, place copy in the lower half, and reposition or simplify the floating UI preview so it does not cover the text.
- Ensure CTA and header remain accessible over the image.
- Respect reduced-motion preferences.
9. Section 02 — Trust / partner strip
Reference timestamp: approximately 3–4 seconds.
9.1 Composition
- Light background.
- Small centered trust statement above a horizontal row of logos.
- Logos are evenly distributed and visually quiet.
- Large whitespace separates this strip from the next headline.
9.2 StackEthic adaptation
Do not invent client logos or imply partnerships that do not exist.

Use one of these honest alternatives:
- A small line such as “Built with teams ready to move forward” and a row of actual technologies used by the studio.
- A restrained technology/tool strip using only technologies StackEthic genuinely works with.
- If there are no suitable logos yet, omit the logo row and preserve the whitespace and editorial transition.
Possible technology labels (only if genuinely used): Next.js, React, TypeScript, Node.js, Python, PostgreSQL, AWS. Do not display a tool just for decoration.
10. Section 03 — Capability / service introduction
Reference timestamp: approximately 4–6 seconds.
10.1 Composition
- White/ivory background.
- Small centered eyebrow or proof statement near the top.
- Main content arranged in two columns.
- Left: large two-line headline, short description, and two compact pill actions.
- Right: two adjacent visual panels/cards of different colors and content.
- The cards are asymmetrical but balanced; one is pale blue and the other deep olive in the reference.
- Keep significant open space around the content.
10.2 StackEthic adaptation
Headline direction:
“Build for your next stage of growth” or “Engineering that makes ambitious ideas real.”

Copy should introduce StackEthic as a digital engineering studio and briefly describe the way it turns business needs into useful digital products.

Actions:
- Primary: “Explore services”
- Secondary: “See our work”
Visual panels can represent two complementary capabilities, for example:
- “Digital products that feel effortless” — a light interface/product preview.
- “Systems built to scale” — a dark interface preview with a restrained lime highlight.
Avoid using finance-specific labels, amounts, or mock payment UI.
11. Section 04 — Three-card benefits / proof
Reference timestamp: approximately 7–10 seconds.
11.1 Composition
- Light background.
- Large headline aligned toward the top-left.
- Small secondary link near the top-right.
- Three large cards in one row:
  1. Green/photographic or gradient-like visual card with a white inset panel.
  2. Pale lavender/blue card with a concise product/benefit statement.
  3. Human photography card with overlaid copy.
- Cards are large and visually distinct, with rounded corners.
- The card row is the main focus; copy is minimal.
11.2 StackEthic adaptation
Section headline direction:
“Good engineering creates room to grow.”

Use three cards that communicate real agency strengths, such as:
1. Thoughtful product design — clear, usable interfaces and considered user journeys.
2. Reliable engineering — maintainable software and dependable architecture.
3. Practical automation — remove repetitive work and connect systems intelligently.
Use a mixture of interface imagery, soft color surfaces, and one authentic human/work image. Avoid generic icon-only cards.

Do not invent performance metrics or client outcomes.
12. Section 05 — Transparent approach / value section
Reference timestamp: approximately 11–13 seconds.
12.1 Composition
- A mostly open light section with generous whitespace.
- Left side: large headline, short explanatory paragraph, and a small CTA.
- Right side: a prominent bright lime panel with rounded corners.
- The right panel contains a small heading and several large, structured information rows/figures.
- A dark olive horizontal band or next-section transition is visible near the bottom.
12.2 StackEthic adaptation
Do not imitate the original financial pricing calculator or copy its numbers.

Use the same composition to explain StackEthic's working approach:

Headline direction:
“Clear thinking. No unnecessary complexity.”

Supporting copy:
Explain that each engagement is scoped around the actual business problem, with clear deliverables and practical communication.

Lime panel could contain:
- “A clear path from idea to launch”
- Discover
- Design
- Build
- Improve
Or a concise engagement summary such as:
- Defined scope
- Visible progress
- Maintainable handover
Use real process commitments, not fabricated guarantees.
13. Section 06 — FAQ
Reference timestamp: approximately 14–16 seconds.
13.1 Composition
- Full-width deep olive section.
- Large heading on the left.
- Small supporting line beneath the heading.
- FAQ list on the right.
- Each question sits on a horizontal row with subtle divider.
- Plus icon at the far right.
- Lime/soft yellow text is used against the dark surface.
- Spacious layout; no white accordion cards.
13.2 StackEthic FAQ suggestions
Use questions relevant to prospective clients:
- What kind of projects does StackEthic take on?
- How does a typical project begin?
- Can you work with an existing product or codebase?
- Do you provide ongoing support after launch?
- How do you estimate project scope and timelines?
Answers should be concise, truthful, and not promise unconfirmed service levels.
13.3 Interaction
- Clicking a question expands its answer.
- Plus icon can rotate or change to a minus.
- Keep animation subtle and fast.
- Ensure keyboard access and aria-expanded / aria-controls.
- On mobile, stack heading above the accordion list.
14. Section 07 — Testimonial / human story
Reference timestamp: approximately 17–19 seconds.
14.1 Composition
- Large full-width photographic section.
- Human subject is prominent, framed close-up.
- Image has a dark or tinted overlay for text contrast.
- Small lime eyebrow/label near the lower-left.
- Large quote or testimonial copy near the lower-left.
- Minimal pagination/navigation controls near the lower-right.
- This section is visually immersive and breaks the page's light/dark rhythm.
14.2 StackEthic adaptation
Do not fabricate a client quote, customer identity, company logo, or endorsement.

Until real testimonials exist, use this section as an engineering philosophy / studio point-of-view panel:
- Use a real team/work image or suitable human-centered photograph.
- Label it “Our approach” or “Built around the people using it”.
- Use original StackEthic copy rather than a fake testimonial.
- When real permissioned testimonials become available, replace the editorial copy with the actual quote and attribution.
Keep the image dominant and text legible.
15. Section 08 — Latest articles / insights
Reference timestamp: approximately 20–22 seconds.
15.1 Composition
- Light background.
- Section heading at the top-left.
- Small “View all” style link at the top-right.
- Three horizontal article cards in a row.
- Each card uses a landscape image with a short title overlay or adjacent title treatment.
- Rounded corners and consistent image treatment.
- The section is visually lighter and more editorial than the feature cards.
15.2 StackEthic adaptation
Use genuine articles or useful insight topics, for example:
- Designing a website that supports real business goals.
- When custom software is worth building.
- Practical AI automation for everyday operations.
Do not display fake publication dates, authors, reading times, or articles that do not exist. If no articles are published, use clearly labeled editorial previews or omit the section until content is ready.
15.3 Responsive behavior
- Three columns on desktop.
- Two columns on tablet if space permits.
- One column or a controlled horizontal scroll pattern on mobile; avoid tiny unreadable cards.
16. Section 09 — Final contact CTA
Reference timestamp: approximately 22–24 seconds.
16.1 Composition
- Light/ivory section.
- Centered heading and short supporting copy.
- Small social/contact proof row or compact icon row if real links exist.
- Prominent dark olive capsule CTA.
- A large dark footer surface begins immediately beneath or after this CTA.
- Strong whitespace and a simple centered composition.
16.2 StackEthic adaptation
Headline direction:
“Have something worth building?”

Supporting copy:
Invite visitors to share their idea, challenge, or project.

CTA:
“Start a conversation” / “Start a project”

Only show real social links. Do not add decorative social icons that do not link anywhere.
17. Section 10 — Footer
Reference timestamp: approximately 24–25 seconds.
17.1 Composition
- Large deep olive footer panel.
- Brand mark and a short brand statement on the left.
- Multiple compact navigation/link columns on the right.
- Small legal/copyright row near the bottom.
- Social icons grouped near the lower-left.
- Lime or white text accents; muted secondary text.
- Footer has a generous internal padding and clear hierarchy.
17.2 StackEthic footer content
Suggested groups:

Studio
- About
- Work
- Services
Services
- Web Development
- Custom Software
- AI Automation
- Cloud & Server
Connect
- Contact
- Email
- Genuine social profiles
Bottom row:
- Copyright
- Privacy Policy (only if page exists)
- Terms (only if page exists)
Do not invent addresses, phone numbers, social handles, or legal pages.
18. Motion and interaction system
The recording suggests a polished, smooth website experience, but the short video does not reveal every interaction or animation trigger. Keep motion restrained.
18.1 Appropriate motion
- Soft fade/translate entrance for section content.
- Small image scale on hover.
- Gentle card reveal or stagger when entering the viewport.
- Short accordion expand/collapse.
- Subtle button hover/focus transitions.
- Smooth scrolling only where it does not interfere with accessibility.
18.2 Motion rules
- Do not animate every element.
- Avoid large bouncing, elastic, or overshooting effects.
- Avoid scroll hijacking and forced horizontal scroll.
- Keep motion short and elegant.
- Respect prefers-reduced-motion.
- Use the project's already-installed animation libraries only when they materially help; do not add dependencies.
18.3 Interactions that must work
- Navigation links navigate to valid destinations.
- CTA links navigate to a real contact route or a valid contact anchor.
- Mobile menu opens and closes.
- FAQ rows expand and collapse.
- Article cards navigate only if the article destination exists.
- Buttons must never be decorative dead ends.
19. Responsive behavior
The video is primarily a desktop presentation. Mobile behavior is not fully observable; the following is a careful responsive adaptation rather than a claim about exact reference mobile behavior.
Desktop (≥ 1024 px)
- Full three-zone header.
- Hero text left, visual/product preview right, image background.
- Two-column capability section.
- Three-card feature row.
- Two-column FAQ.
- Three article cards.
- Multi-column footer.
Tablet (768–1023 px)
- Reduce page gutters and section spacing.
- Preserve hierarchy and text size.
- Hero may keep image background but reduce or reposition the floating preview.
- Cards can become two columns or a carefully balanced row.
- FAQ can remain two columns only if comfortable; otherwise stack.
Mobile (< 768 px)
- Compact header with logo and menu.
- Hero headline and copy in a single column.
- Keep the human subject visible and ensure text contrast.
- Hide, simplify, or reposition the floating UI preview if it competes with the hero copy.
- Stack capability content and visual panels.
- Stack feature cards vertically.
- Stack the approach panel beneath its copy.
- FAQ heading above questions.
- Testimonial text should remain readable over the image; consider a stronger overlay.
- Articles stack vertically or use a deliberate horizontal carousel with accessible controls.
- Centered final CTA.
- Footer columns stack with clear spacing.
- No horizontal page overflow at 320 px width.
20. Accessibility and quality requirements
- Semantic header, nav, main, section, and footer.
- One primary h1 only.
- Correct heading order.
- Keyboard-accessible navigation, menu, FAQ, and carousel controls.
- Visible focus styles.
- Useful alt text for meaningful images; empty alt for decorative images.
- Sufficient contrast for all text and controls.
- Do not communicate meaning by color alone.
- Respect reduced motion.
- Avoid layout shifts; reserve image dimensions/aspect ratios.
- Optimize images and use Next.js image handling where appropriate.
- Ensure all links and buttons have meaningful labels.
- No console errors, hydration warnings, or broken routes.
21. Technical implementation guidance
Project stack currently includes:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS 4
- Space Grotesk and DM Sans via next/font
- GSAP / @gsap/react
- Framer Motion
- Lucide React
Implementation rules
1. Reuse the existing global CSS variables and Tailwind theme tokens.
2. Do not redefine Next.js font variables or create circular CSS variable references.
3. Use the existing Wordmark component.
4. Keep sections as reusable components where that fits the current project structure.
5. Keep page content and layout concerns separate from complex interaction logic.
6. Do not install packages.
7. Do not create an admin dashboard or unrelated pages.
8. Do not change the project's brand name, font system, or established palette without approval.
9. Do not add fabricated client logos, metrics, testimonials, awards, or case studies.
10. Use real assets supplied by the user or carefully selected licensed/available assets. Do not reference imaginary local image paths without providing the assets or documenting what is required.
Suggested component organization
Adapt to the current repository rather than blindly creating duplicate files.
src/
  app/
    page.tsx
    globals.css
    layout.tsx
  components/
    brand/
      wordmark.tsx
    layout/
      site-header.tsx
      site-footer.tsx
    sections/
      hero.tsx
      trust-strip.tsx
      capabilities.tsx
      feature-cards.tsx
      approach.tsx
      faq.tsx
      testimonial-or-philosophy.tsx
      insights.tsx
      contact-cta.tsx
This is a suggested organization, not a requirement to create every file if the project already has equivalent components.
22. Asset direction
Hero image
- Human-centered editorial photography.
- Natural lighting, authentic expression, thoughtful composition.
- Dark enough or easily overlayed for white text.
- Landscape / wide crop.
- Avoid visibly generic corporate stock imagery.
Feature imagery
- Use a mix of actual product UI screenshots, interface mockups, and human-centered photography.
- Use consistent image quality and crop treatment.
- Do not use unrelated abstract images just to fill card space.
UI mockups
- Should look like plausible, polished software interfaces.
- Use StackEthic's palette and typography.
- Avoid fake charts/metrics unless clearly illustrative and not presented as actual client data.
- Ensure any small text in a mockup is not essential to understanding the page.
Asset inventory to prepare
- 1 hero photograph.
- 1–2 project/product interface previews.
- 1 human/work photograph for feature cards.
- 1 large portrait/editorial photograph for the philosophy/testimonial section.
- 3 article thumbnails if the insights section is populated.
- Existing StackEthic wordmark.
23. Content integrity
The original reference appears to be a finance-related website. StackEthic is a software agency, so adapt the content—not the original product claims.

Never reuse:
- Original company name or logo.
- Finance-specific product claims.
- Fake partner logos.
- Fake client results or metrics.
- Fake testimonials or named customer identities.
- Original company's pricing or financial figures.
Use honest studio messaging and only publish real work, services, and contact details.
24. Build sequence
To reduce rework, implement in this order:
1. Establish global visual tokens and font usage.
2. Build the header over the hero.
3. Build the hero composition and test the first viewport.
4. Implement the trust strip and capability introduction.
5. Implement the three-card feature section.
6. Implement the approach/value section.
7. Implement FAQ and keyboard behavior.
8. Implement the full-width editorial image section.
9. Implement insights/articles.
10. Implement final CTA and footer.
11. Complete responsive behavior.
12. Review the entire page at desktop, tablet, and mobile widths.
13. Compare the result with the reference section by section.
Do not build every section before checking the hero/header composition. The first viewport establishes the visual language for the rest of the site.
25. Reference comparison checklist
Use this checklist during implementation and final review.
Global
- [ ] Does the page feel editorial, spacious, human, and premium?
- [ ] Are warm light surfaces and deep olive sections balanced?
- [ ] Is lime used as a restrained accent?
- [ ] Are typography and spacing consistent?
- [ ] Are rounded corners used selectively?
Header
- [ ] Does the header overlay the hero?
- [ ] Are left navigation, centered wordmark, and right CTA/menu balanced?
- [ ] Is the header legible against the hero image?
- [ ] Does the mobile menu work with keyboard and touch?
Hero
- [ ] Is the hero image the dominant visual?
- [ ] Is the heading positioned toward the lower-left?
- [ ] Is the text readable over the image?
- [ ] Is there a compact right-side product/interface visual on desktop?
- [ ] Does the mobile composition avoid overlap?
Content sections
- [ ] Is there a light trust/technology strip?
- [ ] Does the capability section use a two-column editorial composition?
- [ ] Are the three feature cards visually distinct?
- [ ] Does the approach section use open space and a lime information panel?
- [ ] Is FAQ a full-width dark olive section?
- [ ] Is the editorial/testimonial section image-led?
- [ ] Are insights shown in a clean three-card row on desktop?
- [ ] Is the final CTA centered above the dark footer?
Quality
- [ ] No invented client proof or fake metrics.
- [ ] No dead links or decorative nonfunctional buttons.
- [ ] No horizontal overflow.
- [ ] No accessibility or console errors.
- [ ] Reduced-motion preference is respected.
- [ ] All images load and have appropriate dimensions.
26. Known limitations of the reference analysis
The supplied clip is approximately 25.37 seconds and 720 × 540 pixels. It shows a browser-framed desktop walkthrough and only brief moments of each section.

Therefore:
- Exact CSS values, font files, breakpoint values, and source assets cannot be recovered from the video alone.
- Some text is too small or blurred to transcribe reliably.
- Mobile layouts are not demonstrated clearly.
- Some animation triggers and hover states are not visible.
- The website's exact navigation behavior during scroll is not fully established.
Treat the structure, composition, color relationships, imagery direction, and section sequence as the reliable visual evidence. Treat the numeric sizing ranges and responsive behavior in this document as implementation guidance to be tuned during browser review.
27. Final instruction to the implementing AI
Build StackEthic's homepage according to this specification and the supplied reference video.

Do not produce a generic agency landing page. The defining features are the image-led dark hero, overlaid capsule navigation, spacious light editorial sections, asymmetrical product/visual panels, varied three-card composition, bright lime information panel, full-width deep olive FAQ, human-centered photographic section, clean article row, centered CTA, and dark multi-column footer.

First implement the header and hero together and verify that the first viewport matches the reference's composition. Then continue through the remaining sections in the documented order.

When a visual detail is uncertain, preserve the reference's simplicity and spacing instead of inventing decorative complexity.