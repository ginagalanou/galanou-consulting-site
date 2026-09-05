# Website launch review

Feature branch: `codex/website-launch-update`, based on remote `master` at `a6eefc7`.

Local preview: http://127.0.0.1:8080/ (serve `site/` with the README command). All five public routes are preserved. Production is unchanged; this branch is for review only.

## Implementation

- Applied the supplied hero, biography, service, leadership, closing-invitation and contact copy. Retained the unspecified existing text.
- Replaced the homepage domain band and carousel with three permanently visible proof panels; removed the old rotation script and corresponding styles.
- Preserved the original portrait and the attached speaking file, creating responsive WebP derivatives. Portrait captions sit below the complete image at all widths. The speaking image is cropped from 1050 × 490 to 1050 × 435, removing only the bottom 55 pixels; the supplied original remains intact.
- Added comfortable service lists, a reading-width About biography, two-column leadership examples on tablet/desktop, and single-column phone layouts. Reordered publications while preserving their exact titles, authorship, dates, descriptions and links. Secondary collections retain keyboard scrolling and visible cues.
- Updated all specified metadata and canonical/social metadata. Reused the branded social preview. Removed empty tag/category URLs from the sitemap and marked their pages noindex. Replaced references to the missing favicon with the existing GC SVG.
- Added inactive GA4 configuration, basic consent and persistent preference controls. No accounts, DNS, Calendly configuration, or production tracking changed.

## Verification

Rendered and visually inspected Home, Services, About, Experience and Contact at 390, 768, 1024 and 1440 pixels. Full-page captures are in `screenshots/`; `browser-results.json` records all 20 combinations. No page overflow, missing images, or page JavaScript errors were found. The Services lazy-loaded image was scrolled into view and decoded before capturing.

Verified mobile menu opening, focus moving to the first menu link, Escape closing and restoring the toggle, and keyboard scrolling of the publication rail. Verified that the AI anchor appears below the sticky header. All three proof panels remain visible with JavaScript disabled. Reduced-motion rules disable transitions/animation without hiding menu or proof content.

Static checks compared all five metadata sets to the supplied brief, checked local href/src targets and anchors, and confirmed retained publication/advisory/association/media cards and their destinations against the starting branch. Core service domains, engagement formats and speaking topics were also compared. JavaScript syntax checks pass.

Analytics results are in `analytics-results.json`. These include offline simulated production tests; no data was sent to a real Google Analytics account. See the setup handout for the exact limits of this verification and pending production checks.

## Review notes and pending configuration

No unresolved material factual conflict was identified. The old homepage displayed “1,600+”; the brief and retained Experience entry use “1,600 registrants”, which is now used consistently. Dates and role labels on retained entries have not been independently re-certified.

A real GA4 measurement ID, account-owner configuration choices, Enhanced measurement review, finalized analytics privacy disclosure and separate production activation authorization remain outstanding. Search Console ownership verification and sitemap submission remain for the account owner. No bookings or email messages were sent as part of testing.

## Representative screenshots

- [Home desktop](screenshots/home-1440.png)
- [Home phone](screenshots/home-390.png)
- [Services desktop](screenshots/services-1440.png)
- [Services phone](screenshots/services-390.png)
- [About tablet](screenshots/about-768.png)
- [Experience desktop](screenshots/experience-1440.png)
- [Contact phone](screenshots/contact-390.png)
- [Consent interface](screenshots/consent-mobile.png)

External availability check: the digital/telehealth framework DOI resolved to the expected Oxford Academic article. Automated web retrieval could not complete the Calendly page or several other DOI destinations, so live availability of every external endpoint is not certified. Their original destinations are preserved exactly. Email was checked as a `mailto:` destination, without sending a message.

Follow-up: removed the ASHP marks on the lectern and slide and the left microphone at the user’s request. The page uses localized texture edits from the original photograph; the speaker’s face is unchanged. See `speaking-image-edit.md` for pixel-verification details. The Services screenshots have been refreshed.
