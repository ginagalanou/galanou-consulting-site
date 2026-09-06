# LinkedIn preview update

The five main pages now reference `site/images/social/galanou-consulting-linkedin-v2.png`: a 1200 × 630 opaque RGB PNG, 58,647 bytes, with the current headline and forest/cream palette. The editable SVG sits beside it. The previous image is retained.

Open Graph includes the absolute HTTPS image URL, secure URL, MIME type, width, height, alt text and site name. Twitter metadata uses the same image. Existing page titles, descriptions, visible content and analytics settings are unchanged. A fresh image filename avoids reuse of the old image asset's cached contents.

Before this change, both the homepage and original PNG returned HTTP 200 to a request using `LinkedInBot/1.0`; the image returned `image/png`. No broken root-domain image URL was found. This emulation does not prove that requests from LinkedIn's actual servers will be allowed. The `www.galanouconsulting.com` hostname failed to resolve during the check; use the working canonical address `https://galanouconsulting.com/`. DNS has not been changed.

Verified one image metadata set per main page, consistent Open Graph/Twitter URLs, actual PNG dimensions and file size. LinkedIn's published guidance requests Open Graph tags, images at least 1200 × 627, approximately 1.91:1, and files below 5 MB: [Make your website shareable](https://www.linkedin.com/help/linkedin/answer/a521928).

After deployment, submit the canonical site URL to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and inspect its result to refresh LinkedIn's cached preview. LinkedIn explains that previously cached previews can persist and existing posts are not retroactively updated: [Use Post Inspector to refresh URL](https://www.linkedin.com/help/linkedin/answer/a6269011). The actual Featured-item rendering must be confirmed in the signed-in LinkedIn interface. This task does not edit or post to the user's LinkedIn profile.
