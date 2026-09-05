# Setting up website measurement


Google Search Console shows how people find Galanou Consulting through Google. Google Analytics shows how measured visitors use the website, including the pages they visit and the links they select.

Both accounts should be created under a Google account you control. You do not need to share your password with the person implementing the website.

## Connect Google Search Console

1. Open https://search.google.com/search-console/ and sign in.
2. Add a Domain property for galanouconsulting.com.
3. Copy the DNS verification record Google provides.
4. Open the account that manages the domain’s DNS and add the record exactly as provided. Keep existing DNS records in place.
5. Return to Search Console and select Verify. DNS changes may take time to become visible.
6. Once verified, open Sitemaps and submit https://galanouconsulting.com/sitemap.xml.
7. Use URL Inspection to check Home, About, Services, Experience, and Contact.

Search Console data will build over time. Verification and sitemap submission do not guarantee immediate indexing.

## Create Google Analytics

1. Open https://analytics.google.com/ and sign in.
2. Create an Analytics account named Galanou Consulting.
3. Create a GA4 property for the website.
4. Choose the reporting timezone and currency you want to use consistently.
5. Create a Web data stream for https://galanouconsulting.com/.
6. Copy the measurement ID beginning with G-.
7. Supply that ID to the website implementer. Keep your Google password private.

## Enable measurement

Before activation, review the analytics consent interface and complete the privacy disclosure for the actual configuration.

The website integration is prepared to remain inactive until configuration is complete. Once enabled, it should load Google Analytics only after a visitor accepts analytics.

Visitors who reject analytics can still use the website. Their activity will not appear in the same way in your Analytics reports. Browser blockers can also limit measurement.

## Check that it works

1. Open the live website and reject analytics. Confirm that no Google Analytics requests are sent.
2. Open Analytics preferences and accept analytics.
3. Visit several pages and select a contact button.
4. Check Google Analytics Realtime and, during implementation testing, DebugView.
5. Confirm that each page visit and selected action is counted once.
6. Change your preference back to rejected and confirm that further analytics collection stops.

The implementer should perform the technical request checks and document the results.

## What to review

Start with:

- Which pages visitors arrive on.
- Whether visitors come from LinkedIn, Google, or other sources.
- Which pages they visit before Contact.
- Which contact buttons they select.
- Whether they open Calendly or choose email.
- Which publications they explore.

Use Path exploration to examine journeys beginning at Home or working backward from Contact or a contact-intent event.

A Calendly-link click is not a booked meeting. An email-link click is not a received inquiry. Compare these signals with actual conversations and inquiries.

At launch, use the data to identify patterns and questions. Avoid drawing conclusions from a handful of visits.

## Official references

Search Console:
https://support.google.com/webmasters/answer/10267942?hl=en

GA4 path exploration:
https://support.google.com/analytics/answer/9317498?hl=en

Outbound-link measurement:
https://support.google.com/analytics/answer/13566436?hl=en

Consent mode:
https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=en

---

## Technical configuration and verification — 5 September 2026

The supplied setup instructions above are unchanged. Official documentation confirms the account → property → Web data stream sequence and Domain-property DNS verification. The GA4 setup wizard also asks for business category, business size, objectives, data-sharing choices, and acceptance of its terms. These are account-owner choices; they have not been invented or selected here. See [GA4 setup](https://support.google.com/analytics/answer/9304153?hl=en) and [ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en).

Configuration is in `site/js/analytics-config.js`. It ships with an empty `measurementId`, `productionEnabled: false`, and `enhancedMeasurementDisabled: false`. All three gates must be configured explicitly before activation. HTTPS and the two exact production hostnames are also required. Localhost and preview domains are blocked even if the other settings are supplied.

Before setting `enhancedMeasurementDisabled: true`, disable the Web stream's Enhanced measurement features, including automatic page/history and outbound events. The code sets `send_page_view: false` and sends one explicit page view; each eligible link has one custom click handler. Do not add a second tag through hosting settings, Tag Manager, or other tools. Google documents the automatic collection in [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en).

`site/js/analytics.js` uses basic consent: Google code is inserted only after acceptance and only when all production gates pass. Rejection blocks loading, withdrawal sets the GA disable flag, clears GA cookies, and reloads to remove vendor timers and listeners. Preference changes synchronize across tabs of the same origin. The local preference is stored as `galanou-analytics-consent-v1`; it contains only accepted/rejected. No advertisement consent is granted, Google signals and ad personalization are disabled, and no advertising account is connected by this implementation. See [basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=en).

Custom event parameters are `page_path`, `placement`, and `destination_label`, each restricted to an explicit allowlist. Page location omits query strings and fragments; external referrers retain only their origin. No arbitrary page text, link URL, email address, form contents, or visitor-provided text is included in custom events. Page titles use the controlled route value. The publication labels `publication_1` through `publication_5` follow the visible order of the five linked publications; the in-progress chapter has no outbound link.

Browser checks found zero Google Analytics or Google tag requests on the local review host before consent, after rejection, and after acceptance with inactive configuration. Offline simulated-production tests intercepted every request and substituted an empty Google script: disabled configuration, missing ID, preview host, and rejected consent produced zero vendor loads; accepted consent produced one requested script, one page view and one contact CTA event. Re-saving acceptance did not duplicate the page view; withdrawal prevented further loading. This validates the integration's logic, not delivery to a real GA4 account. Real Realtime/DebugView, automatic-event settings, cookie behavior with Google's real script, and live withdrawal collection checks remain required after separate activation authorization.

## Information needed for the final analytics privacy disclosure

Supply or confirm the business/controller identity and privacy contact; the actual GA account/property owner and Google processing terms; processing purposes and applicable legal basis; data categories and identifiers collected by the chosen GA configuration; cookie names and lifetimes; property data-retention and deletion settings; recipients, hosting/processing locations and applicable international-transfer arrangements; access and data-sharing settings; any linked products; how visitors exercise privacy rights and withdraw consent; and the applicable supervisory-authority and complaint information. Confirm the preference-storage duration as well. No new privacy policy has been published, and the consent interface alone does not complete the disclosure or other privacy requirements.
