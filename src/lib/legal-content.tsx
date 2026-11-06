import type { ReactNode } from "react";

import { CONTACT_EMAIL } from "@/lib/site";
export { CONTACT_EMAIL } from "@/lib/site";
export const LEGAL_UPDATED = "November 6, 2026";

export const legalLinks = [
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact & support" },
  { slug: "privacy", label: "Privacy policy" },
  { slug: "terms", label: "Terms of service" },
  { slug: "acceptable-use", label: "Acceptable use" },
  { slug: "refund-policy", label: "Refund & delivery" },
  { slug: "security", label: "Security" },
] as const;

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };
type LegalDocument = { eyebrow: string; title: string; description: string; sections: Section[] };
export const legalContent: Record<(typeof legalLinks)[number]["slug"], LegalDocument> = {
  "about": {
    eyebrow: "BEHIND THE STUDIO", title: "About Fancy Cafe AI",
    description: "An independent AI cafe-meme video studio with photo-to-video creation.",
    sections: [
      { heading: "What this site is", paragraphs: ["Fancy Cafe AI recreates the wrong-seat cafe joke: a visitor mistakes a small table for a stool, notices a regular using the bench, and quietly changes seats. The studio accepts one required protagonist portrait and one optional cafe-regular portrait, both of consenting adults. The selected format produces a 20-second video after successful checkout and generation. The example gallery contains one labeled AI-generated result and two reference clips; individual results may vary.", "The sample is illustrative only. We do not promise that a future result will match the sample, reproduce any song, use a particular voice, or portray a real event."] },
      { heading: "Independent project", paragraphs: ["Fancy Cafe AI is an independent, unofficial concept. We are not affiliated with TikTok, CapCut, Media.io or the meme creators, and we do not claim their endorsement, sponsorship, footage, music or trademarks. Names are used to identify the creative trend, not to imply a partnership."] },
      { heading: "Plans and pricing", paragraphs: ["The listed one-time prices are $6.99 USD for Standard (480p) and $9.99 USD for HD (720p). These are one-time purchases, subject to the final amount shown at checkout. No subscription is required."] },
      { heading: "Questions or concerns", paragraphs: ["Use our Contact & support page for questions about rights, safety, privacy or availability. Do not email portraits or payment card details."] },
    ],
  },
  "contact": {
    eyebrow: "GET IN TOUCH", title: "Contact & support",
    description: "Questions about an order, a rights concern or a privacy request? Reach us by email.",
    sections: [
      { heading: "Support email", paragraphs: [`Email ${CONTACT_EMAIL} for help with Fancy Cafe AI at firsttimeinafancycafeai.org. Please include a short description of your question and, for an order issue, your video code or payment reference.`, "We do not provide live chat or a guaranteed response time. Do not email photographs, passwords, API keys, sensitive personal data or full card numbers."] },
      { heading: "What to include", paragraphs: ["For a general question, describe the page and the issue. For a privacy or rights request, use the subject “Fancy Cafe AI — Privacy request” or “Fancy Cafe AI — Rights report” and provide enough information to locate the matter without sending the image itself. For a security concern use “Fancy Cafe AI — Security report”."] },
      { heading: "Payments and generation", paragraphs: ["If a payment or generation fails, contact us with your order video code, date and amount; do not pay twice or send a full card number."] },
    ],
  },
  "privacy": {
    eyebrow: "YOUR DATA", title: "Privacy policy",
    description: "How orders, portraits, generated videos and optional email delivery work.",
    sections: [
      { heading: "Controller and contact", paragraphs: [`This policy covers firsttimeinafancycafeai.org. For privacy requests email ${CONTACT_EMAIL} with Fancy Cafe AI in the subject. Do not send portraits or payment card numbers by email.`] },
      { heading: "Portraits and video generation", paragraphs: ["You choose one or two consenting-adult portraits. Optimized copies are sent to our AI safety service when selected and saved in private object storage for checkout and paid retries. After verified payment the images and the reference material are sent to our video-generation provider. For supported orders, silent generated output is combined with the configured audio and stored in private R2 object storage. If checkout or generation is temporarily unavailable, the studio does not create a new paid order. AI screening cannot verify consent or guarantee a likeness or an exact match.", "Input portraits are deleted after a completed generation or when the temporary retry window expires (normally three days after order creation); third-party providers may apply their own retention policies."] },
      { heading: "Payment, history and email", paragraphs: ["Stripe processes checkout and card details; we store order, payment status, video format and transaction identifiers, not full card numbers. A signed browser cookie connects your browser to order and video history. Browser session storage can also hold small previews of uploaded faces for the checkout return. Clearing cookies or changing devices can remove ordinary browser access.", "If you enter an email in the pre-checkout dialog, we store it with your order and use Resend to send one completion message containing a private download link. Anyone with that link can access the result until the video's access period ends; keep it private. Leave the email blank to use original-browser delivery only. Delivery failures never erase a paid order."] },
      { heading: "Retention and your choices", paragraphs: ["Generated video download access lasts up to 30 days from completion; our worker deletes expired output files. Bucket lifecycle settings must not remove them sooner. Order and payment records may be kept longer for refunds, fraud prevention, accounting or legal requirements. Infrastructure, payment and email providers may retain logs under their own policies.", "You may download your result before it expires, omit the optional email, clear browser preview storage, or request access/correction/deletion where applicable. Some records must be retained for lawful obligations. Contact the support address above; we may verify your identity before releasing order information."] },
      { heading: "Analytics and cookies", paragraphs: ["An essential cookie links your orders and finished videos to this browser; it is required for video history, and clearing cookies or changing devices removes that access. When a site-specific analytics ID is configured, the Google Analytics tag loads on pages with analytics storage denied by default. Analytics cookies and full measurement are enabled only after you accept in the on-site banner; your choice is stored in this browser and can be changed from the footer's Cookie settings link. When accepted, GA4 helps us understand aggregate traffic such as page views, referrer, approximate region and device type. GA4 sets cookies and receives your IP address and the page you visited; Google processes that data under its own policies. You can also block cookies in your browser or use Google's Analytics opt-out add-on. Declining analytics does not affect your videos, and we do not use analytics data to identify individual visitors or build advertising profiles."] },
      { heading: "Service providers and security", paragraphs: ["Hosting, Stripe, our AI safety and generation providers, Cloudflare R2 and, if you opt in, Resend may process the data needed to deliver the service. Server-side credentials and private storage are not exposed in the page. No online system is guaranteed risk free; contact us if you suspect unauthorized access."] },
    ],
  },
  "terms": {
    eyebrow: "THE DETAILS", title: "Terms of service",
    description: "Rules for using our independent AI cafe-video studio.",
    sections: [
      { heading: "Eligibility and independent status", paragraphs: ["You must be at least 18, and each person in a portrait must be an adult who has given permission for AI video creation. This is an unofficial independent website and is not affiliated with TikTok, CapCut, Media.io or the meme creators."] },
      { heading: "Personal entertainment and sharing", paragraphs: ["Made for personal entertainment and non-commercial social sharing. No commercial-use license is included. Use the studio to make playful cafe-meme videos for yourself or to share non-commercially with friends. The purchase does not authorize advertising, sponsored posts, client work, resale or other commercial use.", "The included reference music does not come with a separate music license. Personal sharing must still respect music and portrait rights and the destination platform's rules; non-commercial use is not automatic permission to use copyrighted material."] },
      { heading: "Your uploads and generated videos", paragraphs: ["You retain the rights you have in your uploaded photos. You authorize us and our safety, storage and video-generation providers to process the submitted images to fulfill your order. Do not upload photographs, likenesses, music or other content without the needed permission. Generated results can vary and may not perfectly match a reference or synchronize every movement to the included reference soundtrack. Inclusion of music does not grant a separate license for commercial use or redistribution. Do not portray them as real events or official content."] },
      { heading: "Purchases and delivery", paragraphs: ["Each successful payment buys one generation at the resolution and aspect ratio selected before checkout, not a subscription. Keep the original browser's cookie to view delivery status. Download access lasts up to 30 days from completion; optional email delivery, when available, sends a private link. See Refund & delivery for technical failures and duplicate charges. Applicable statutory rights remain unaffected."] },
      { heading: "Use and changes", paragraphs: ["Follow our Acceptable Use Policy and all applicable laws. We may suspend abusive use, update these terms, or temporarily interrupt service for safety or maintenance; we do not exclude liabilities that cannot lawfully be excluded."] },
    ],
  },
  "acceptable-use": {
    eyebrow: "KEEP IT RESPECTFUL", title: "Acceptable use policy",
    description: "Rules for uploads and generated AI videos.",
    sections: [
      { heading: "Adults and consent only", paragraphs: ["Only choose photos you have the right to use, showing adults who have consented to their likeness being used for this purpose. Do not use a child or someone who cannot consent. A checkbox or automated system cannot establish someone's age or permission for you."] },
      { heading: "Prohibited content", paragraphs: ["Do not use or attempt to create material that involves child sexual abuse or exploitation; nudity or sexually explicit material; non-consensual intimate imagery; hateful abuse or harassment; threats; real-world graphic violence; self-harm promotion; fraud; deceptive impersonation; or infringement of a person's privacy, image, publicity, copyright or other rights.", "Do not pass off a fabricated scene as real, official content, or an endorsement by a public figure. The cafe-meme theme is not permission to use copyrighted audio, footage, branding or anyone else's identity."] },
      { heading: "Site integrity", paragraphs: ["Do not attack the site, introduce malware, circumvent access or safety checks, scrape in a harmful way, or attempt to access another visitor's data. We may restrict access or remove material when available and appropriate, subject to applicable law."] },
      { heading: "Reporting", paragraphs: [`If you see a rights or safety problem, email ${CONTACT_EMAIL} with “Fancy Cafe AI — Rights report” in the subject and a description or page URL. Do not send harmful material or private photographs by email. The studio accepts one required and one optional adult portrait when generation is enabled. Only upload portraits you have the right and permission to use.`] },
    ],
  },
  "refund-policy": {
    eyebrow: "ORDERS & DELIVERY", title: "Refund & delivery policy",
    description: "One-time purchases, private 30-day delivery, and help for failed orders.",
    sections: [
      { heading: "Prices and checkout", paragraphs: ["Standard 480p is listed at $6.99 USD and HD 720p at $9.99 USD as one-time purchases; confirm the final amount and any applicable tax on the Stripe checkout page before paying. There is no subscription or stored credit balance."] },
      { heading: "Delivery", paragraphs: ["After verified payment, a successful order starts one 20-second cafe video featuring your uploaded protagonist and optional regular, at the selected resolution and aspect ratio. The completed MP4 includes the original music from the Fancy Cafe reference video, merged after silent visual generation. Made for personal entertainment and non-commercial social sharing. No commercial-use license is included. The music is not separately licensed to you; personal sharing must still respect music and portrait rights and platform rules. An approved completed result appears in the original browser and can be downloaded for up to 30 days from completion. Optionally add an email so we can send a private download link. Download it promptly; the service is not a permanent archive. Result quality, facial likeness and motion and delivery time can vary."] },
      { heading: "Problems and refunds", paragraphs: [`If payment was taken but generation is delayed, do not pay again: return in the original browser and keep your video code. For persistent technical failure, inaccessible delivery, duplicate charges, or a refund request, contact ${CONTACT_EMAIL} with the video code and payment reference but not your card number. For verified technical failures or inaccessible delivery, we may offer redelivery or a discretionary refund to the original payment method. After successful generation and delivery, subjective dissatisfaction alone does not guarantee a refund; this includes personal preferences about AI appearance, expression, motion or comic timing. Report concrete delivery defects for review rather than assuming all completed orders are excluded. Your statutory consumer rights are not limited by this policy.`] },
    ],
  },
  "security": {
    eyebrow: "TRUST & SAFETY", title: "Security & safety",
    description: "How we screen uploads and protect paid video deliveries.",
    sections: [
      { heading: "Portrait screening and storage", paragraphs: ["The studio checks file format and size, sends optimized portraits for automated safety review and keeps private copies for paid retries. AI screening cannot independently verify identity or consent. Do not select sensitive material or photos of people who have not consented."] },
      { heading: "Video and infrastructure", paragraphs: ["The reference sample is served through our site from object storage. Hosting and storage providers may process technical request data to serve content. We do not offer a security certification or guarantee that internet services are completely free of risk. Checkout runs through Stripe and videos are generated by a third-party AI provider."] },
      { heading: "Report an issue", paragraphs: [`For a security vulnerability or abuse concern, write to ${CONTACT_EMAIL} with “Fancy Cafe AI — Security report” in the subject. Include a safe description, affected URL and steps to reproduce; do not send passwords, card data, other people's photos or exploit data. Please do not access other people's data, disrupt service or publish sensitive details before we can review them.`] },
      { heading: "Changes to these disclosures", paragraphs: ["We review security and privacy disclosures as services change."] },
    ],
  },
};

// Shared policy pages keep public disclosures synchronized with the current studio state.
export function LegalBody({ sections }: { sections: Section[] }): ReactNode {
  return sections.map((section) => <section className="tiny-legal-section" key={section.heading}>
    <h2>{section.heading}</h2>
    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
  </section>);
}
