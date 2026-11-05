import { ArrowRight, Check, Mic2, ShieldCheck } from "lucide-react";
import { SampleReels } from "@/components/sample-reels";
import { TinyStudio } from "@/components/tiny-studio";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { TinyGuides } from "@/components/tiny-guides";
import { JsonLd } from "@/components/json-ld";

const scenes = [
  {
    "number": "01",
    "title": "The opening group",
    "detail": "Back left and Back right support the front Keys role. These are three separate photo positions.",
    "image": "/tiny-band/scenes/beat-01.webp",
    "alt": "Three dog performers in the opening reference group",
    "className": "tiny-scene-role"
  },
  {
    "number": "02",
    "title": "Keys is not Lead",
    "detail": "The front performer uses the Keys upload. Choose Lead instead if you want the singer close-up.",
    "image": "/tiny-band/scenes/beat-02.webp",
    "alt": "Front dog performer and two backing performers",
    "className": "tiny-scene-role"
  },
  {
    "number": "03",
    "title": "A separate Sax role",
    "detail": "Add a friend to Sax if you want to personalize this additional band member.",
    "image": "/tiny-band/slots/band-sax.webp",
    "alt": "Dog reference for the separate Sax role",
    "className": "tiny-scene-role"
  },
  {
    "number": "04",
    "title": "The Lead close-up",
    "detail": "Use Lead for the featured singer. AI framing and expressions can differ from this reference.",
    "image": "/tiny-band/scenes/beat-04.webp",
    "alt": "Dog Lead close-up with a red cap",
    "className": "tiny-scene-role"
  }
];

const faqs: { question: string; answer: string; guide?: string; group?: string }[] = [
  {
    "question": "What is the Tiny Desk AI video trend?",
    "answer": "The Tiny Desk AI trend replaces performers in a desk-side band scene with AI-generated likenesses. The Outstanding version refers to The Gap Band’s song and Charlie Wilson’s Tiny Desk performance. Tiny Desk AI Videos makes separate 15-second AI clips with a fixed soundtrack. The service is independent and not affiliated with NPR or Tiny Desk Concerts.",
    "guide": "tiny-desk-ai-trend-explained"
  },
  {
    "question": "How do I make a Tiny Desk AI video from a photo?",
    "answer": "Open Tiny Desk AI Videos and upload 1–5 portraits of consenting adults. Choose Lead for the singer and optionally fill the other roles. Select quality and aspect ratio, then review the one-time price before paying. Return in the same browser to watch and download the completed 15-second MP4.",
    "guide": "tiny-desk-ai-video-guide"
  },
  {
    "question": "Can I use just one photo, and which person becomes the lead?",
    "answer": "Yes. In Tiny Desk AI Videos, upload one portrait to Lead at the top for the intended singer. Keys is the front performer in the opening group, not the Lead close-up. Other roles can be left empty, but their appearance is not guaranteed because no portrait was supplied for them.",
    "guide": "multiple-photos-tiny-desk-concert-video"
  },
  {
    "question": "What kind of photo works best?",
    "answer": "Use one clear portrait of a consenting adult per role, with visible eyes and even light. Tiny Desk AI Videos accepts JPG, PNG and WebP files up to 10 MB per photo. Avoid group photos, sunglasses and blurry enlarged screenshots. The dogs illustrate the roles; upload adult portraits, not pets.",
    "guide": "tiny-desk-ai-photo-tips"
  },
  {
    "question": "Do I need to write a prompt or install an app?",
    "answer": "No. Tiny Desk AI Videos runs in a browser and supplies a fixed reference-guided prompt. You choose portraits, roles, resolution and format. There is no custom scene, song or shot editor.",
    "guide": "tiny-desk-ai-prompt-ideas"
  },
  {
    "question": "Does the video have music or accurate lip sync?",
    "answer": "Tiny Desk AI Videos includes a fixed soundtrack in the delivered MP4. The service generates silent AI footage, then adds the audio. Adding audio does not align every mouth movement to the words. Exact lip sync is not guaranteed.",
    "guide": "tiny-desk-ai-music-lip-sync"
  },
  {
    "question": "How much does it cost, and is there a free version?",
    "answer": "Tiny Desk AI Videos costs $5.99 per 480p video or $8.99 per 720p video. Each payment covers one 15-second render in the selected aspect ratio. There are no credits or subscriptions. The example video is free to watch; personal generation is paid. Confirm the final amount at checkout.",
    "guide": "tiny-desk-ai-filter-pricing"
  },
  {
    "question": "Should I choose 9:16 or 16:9?",
    "answer": "Choose 9:16 for a tall frame and 16:9 for a wide frame in Tiny Desk AI Videos before paying. Each order covers one format, not both. Both formats request 15 seconds. Choosing 720p changes resolution, not lip-sync accuracy or the soundtrack.",
    "guide": "tiny-desk-ai-video-formats"
  },
  {
    "question": "Can I make the video on my phone without an account?",
    "answer": "Yes. Open tinydeskaivideos.com in your phone browser. No account or app installation is required. Use a browser you can return to and keep its order cookies after checkout.",
    "guide": "how-to-make-tiny-desk-ai-video-on-phone"
  },
  {
    "question": "How long does generation take, and why does progress pause?",
    "answer": "Generation and audio composition take time, and the displayed progress is an estimate. A pause does not itself mean failure. Recheck the order in the original browser; do not pay again simply because it is still processing.",
    "guide": "download-tiny-desk-ai-video"
  },
  {
    "question": "Can I download my video after closing the page?",
    "answer": "Yes, return to Tiny Desk AI Videos in the same browser with its order cookie intact. Select your completed video and choose Download. The file is stored privately on the server, not permanently in browser storage. Download access lasts up to 30 days from completion, so save the MP4 promptly.",
    "guide": "download-tiny-desk-ai-video"
  },
  {
    "question": "Will I receive the video by email?",
    "answer": "When email delivery is enabled, Tiny Desk AI Videos offers an optional email field before checkout. The service attempts to send a private link after completion. Check your spam folder if the message is missing, and use the original browser to retrieve the video. A delivery email does not extend retention.",
    "guide": "download-tiny-desk-ai-video"
  },
  {
    "question": "Will every face and camera shot match the example?",
    "answer": "No. AI can change faces, expressions, hands and framing. Reference images and videos are examples, not customer results or a promise of exact likeness. Higher resolution alone does not remove these limitations.",
    "guide": "tiny-desk-ai-photo-tips"
  },
  {
    "question": "How long are photos kept, and can I upload someone else?",
    "answer": "Only upload yourself or consenting adults to Tiny Desk AI Videos. Input portraits are normally removed after a completed generation or the temporary retry window; provider retention may differ. Generated-video access lasts up to 30 days from completion. See the privacy policy for details."
  },
  { question: "What song is in the Outstanding meme?", answer: "The song is Outstanding by The Gap Band, associated with the Charlie Wilson Tiny Desk performance. Social edits can use different recordings or timing. Listen to our fixed demo before ordering.", guide: "what-song-is-in-the-tiny-desk-ai-meme", group: "Understand the meme" },
  { question: "Where is the original Tiny Desk performance?", answer: "Look for Charlie Wilson: Tiny Desk Concert on NPR Music. The original is separate from AI remakes, and you do not need to buy anything here to watch it.", guide: "outstanding-tiny-desk-original-video", group: "Understand the meme" },
  { question: "What should I do if payment succeeds but generation fails?", answer: "Return in the same browser and check your existing order first. Do not pay again to retry a pending order. For a failed or missing delivery, contact support with the order reference and follow the refund policy; never send card details.", group: "Delivery and privacy" }
];

export default function HomePage() {
  return (
    <div className="tiny-site">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
      <SiteHeader />
      <main>
        <section id="studio" className="tiny-hero" aria-labelledby="tiny-title">
          <div className="tiny-hero-copy">
            <p className="tiny-pill"><span className="tiny-bars" aria-hidden="true">▂▅▇</span> YOUR MOMENT BEHIND THE MIC</p>
            <h1 id="tiny-title" aria-label="Tiny Desk AI Video Generator">Tiny Desk <span><em>AI</em> Videos</span><small>AI Video Generator</small></h1>
            <span className="tiny-underline" aria-hidden="true" />
            <p className="tiny-hero-description">Turn 1–5 portraits into a 15-second Outstanding-style AI band video with a fixed soundtrack. Start with your portrait as the lead singer, or add up to four consenting adult friends. Choose your format and pay once — no account, prompt writing or credits needed.</p>
            <ul className="tiny-highlights"><li>✦ One photo is enough</li><li>✦ 15 seconds with music</li><li>✦ One-time pricing</li><li>✦ No credits needed</li></ul>
          </div>
          <TinyStudio />
        </section>

        <SampleReels />

        <section className="tiny-section tiny-moment" aria-labelledby="moment-title">
          <div className="tiny-story-intro"><h2 id="moment-title">What happens in your <em>Tiny Desk AI video?</em></h2><p>Choose the singer, not just the first upload circle: Lead and the opening front performer are different roles. These four stills come from the <strong>reference sample video.</strong></p></div>
          <div className="tiny-scene-grid">{scenes.map(scene => <article className="tiny-scene" key={scene.number}><div className={`tiny-scene-image ${scene.className}`}><img src={scene.image} alt={scene.alt} /><span>SAMPLE · {scene.number}</span></div><div className="tiny-scene-copy"><span>BEAT {scene.number}</span><h3>{scene.title}</h3><p>{scene.detail}</p></div></article>)}</div>
          <p className="tiny-art-note">Stills from the reference sample video. Your generated result uses your own photos and may differ.</p>
        </section>

        <section className="tiny-section tiny-trend" aria-labelledby="meme-title"><div className="tiny-trend-panel"><div><span className="tiny-gold-label">THE OUTSTANDING TINY DESK MEME</span><h2 id="meme-title">Know the song. <em>Choose your role.</em></h2></div><div className="tiny-trend-copy"><p>The Outstanding Tiny Desk meme reimagines the desk-side band performance associated with Charlie Wilson and The Gap Band song <strong>Outstanding</strong>. The original NPR Music concert is different from the dog-band, coaches and AI remakes.</p><p>Here, start with yourself as Lead and optionally add friends. The template supplies the scene and fixed soundtrack; you choose the faces, format and resolution. This is an independent, unofficial tool, not an NPR production.</p><a href="/blog/outstanding-tiny-desk-original-video">Find the original performance <ArrowRight size={16}/></a><a href="/blog/what-song-is-in-the-tiny-desk-ai-meme">What song is in the meme? <ArrowRight size={16}/></a></div></div></section>

        <section id="how-it-works" className="tiny-section tiny-how" aria-labelledby="how-title"><div className="tiny-how-heading"><h2 id="how-title">How to make a <em>Tiny Desk AI video</em></h2><p>Three steps to your 15-second AI Tiny Desk video. Availability is shown in the studio before checkout.</p></div><div className="tiny-how-layout"><div className="tiny-how-steps"><article><span className="tiny-how-number">1</span><div><h3>Add your photo</h3><p>Start with one clear portrait in Lead for the singer. Optionally add friends in the other four roles at the same resolution price.</p></div></article><article><span className="tiny-how-number">2</span><div><h3>Pick your quality</h3><p>Choose Standard 480p at $5.99 or HD 720p at $8.99, plus vertical or horizontal format; confirm the total at checkout.</p></div></article><article><span className="tiny-how-number">3</span><div><h3>Create, then download</h3><p>After payment, watch the estimated progress and return to this browser for your finished 15-second video with a fixed soundtrack. Download it within 30 days.</p></div></article></div><aside className="tiny-photo-checklist"><h3>Photos that work best</h3><ul><li>One adult per photo, with their consent.</li><li>Face visible, with head and shoulders in frame.</li><li>Even light; avoid sunglasses or heavy shadows.</li><li>JPG, PNG or WebP, up to 10 MB per image.</li><li>No celebrities, minors or unauthorized likenesses.</li></ul><a href="/blog/tiny-desk-ai-photo-tips">See the photo guide <ArrowRight size={16}/></a></aside></div></section>

        <section id="pricing" className="tiny-section tiny-pricing" aria-labelledby="pricing-title"><div className="tiny-section-intro"><span className="tiny-kicker">SIMPLE PRICING</span><h2 id="pricing-title">Pay per video. <em>That&apos;s it.</em></h2><p>No credits to count. No subscription to cancel. One-time prices for each video; the final amount is shown at checkout.</p></div><div className="tiny-price-grid"><article className="tiny-price-card"><span className="tiny-price-name">Standard</span><strong>$5.99</strong><p>One concert-inspired AI video in 480p.</p><a href="#studio">Explore the studio <ArrowRight size={17} /></a><ul><li><Check size={17} /> One-time payment</li><li><Check size={17} /> Standard 480p quality</li><li><Check size={17} /> No subscription or credits</li></ul></article><article className="tiny-price-card featured"><span className="tiny-popular">HIGHER QUALITY</span><span className="tiny-price-name">HD</span><strong>$8.99</strong><p>One concert-inspired AI video in 720p.</p><a href="#studio">Explore the studio <ArrowRight size={17} /></a><ul><li><Check size={17} /> One-time payment</li><li><Check size={17} /> Crisp 720p quality</li><li><Check size={17} /> No subscription or credits</li></ul></article></div><p className="tiny-price-note"><ShieldCheck size={15} /> The studio confirms whether checkout is available before accepting an order.</p></section>

        <section className="tiny-section tiny-sound-section" aria-labelledby="sound-title"><div className="tiny-sound-intro"><h2 id="sound-title">The mood behind the <em>microphone.</em></h2><p>Books, bandmates and a close-up camera make this concert-inspired look instantly recognizable. See what the fixed template includes and what AI cannot guarantee.</p></div><div className="tiny-sound-grid"><div className="tiny-sound-facts"><div><span>LOOK</span><strong>Warm, desk-side concert atmosphere</strong></div><div><span>INPUT</span><strong>One to five consented adult portraits</strong></div><div><span>FORMAT</span><strong>480p / 720p · 9:16 / 16:9</strong></div><div><span>STATUS</span><strong>Check live availability in the studio</strong></div></div><div className="tiny-sound-names"><h3>Good to know</h3><ul><li><strong>Tiny Desk AI trend</strong> · a visual idea, not an official series</li><li><strong>Reference frames</strong> · stills from the sample video, not your result</li><li><strong>Soundtrack &amp; lip sync</strong> · fixed soundtrack; exact lip sync is not guaranteed</li><li><strong>One-time pricing</strong> · see studio for availability</li></ul><div className="tiny-sound-links"><a href="/blog/tiny-desk-ai-trend-explained">What the trend is <ArrowRight size={16}/></a><a href="/blog/tiny-desk-ai-video-guide">How to prepare <ArrowRight size={16}/></a></div></div></div></section>

        <TinyGuides compact />

        <section id="faq" className="tiny-section tiny-faq" aria-labelledby="faq-title"><div className="tiny-faq-layout"><div className="tiny-faq-intro"><span className="tiny-kicker">GOOD TO KNOW</span><h2 id="faq-title">Tiny Desk AI <em>FAQ.</em></h2><p>Answers about the trend, portrait upload, photo safety, pricing and video delivery.</p></div><div className="tiny-faq-list">{["Understand the meme", "Before checkout", "Delivery and privacy"].map((group) => <section className="tiny-faq-group" key={group}><h3>{group}</h3>{faqs.filter((faq, index) => (faq.group || (index === 0 ? "Understand the meme" : index < 9 ? "Before checkout" : "Delivery and privacy")) === group).map(({ question, answer, guide }) => <details key={question}><summary>{question}<span aria-hidden="true">⌄</span></summary><p>{answer}</p>{guide ? <a href={"/blog/" + guide}>Read the full guide →</a> : <a href={question.includes("payment") ? "/refund-policy" : "/privacy"}>Read the policy →</a>}</details>)}</section>)}</div></div></section>

        <section className="tiny-final"><span className="tiny-kicker">YOUR TURN IN THE SPOTLIGHT</span><h2>A little desk. <em>A big moment.</em></h2><p>Explore the new Tiny Desk AI Videos studio. Upload one to five portraits and create your own 15-second band video.</p><a href="#studio">Explore the studio <ArrowRight size={18} /></a></section>
      </main>
      <SiteFooter />
    </div>
  );
}
