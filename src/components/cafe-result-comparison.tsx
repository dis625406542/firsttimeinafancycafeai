import { ArrowRight } from "lucide-react";

/** Reference frames from the demo videos, not customer media. */
export function CafeResultComparison() {
  return <div className="tiny-cafe-comparison" aria-labelledby="tiny-cafe-comparison-title">
    <div className="tiny-cafe-comparison-heading">
      <span className="tiny-kicker">SEE THE TWO-ROLE STORY</span>
      <h3 id="tiny-cafe-comparison-title">From two photos to <em>your elevator moment.</em></h3>
      <p>Photo 1 is the headphone listener. Photo 2 is the person who turns, smiles and says the line. The result is a new AI-generated scene, not an edit of the film clip.</p>
    </div>
    <div className="tiny-cafe-comparison-grid">
      <figure className="tiny-cafe-comparison-card">
        <figcaption><span className="tiny-cafe-comparison-step">01</span><div><strong>Before: choose two photos</strong><small>One consenting adult per photo; upload order sets the roles.</small></div></figcaption>
        <div className="tiny-cafe-comparison-media">
          <img src="/love-the-smiths/comparison-before.webp" width="900" height="1100" loading="lazy" decoding="async" alt="Reference frames from the demo videos: Photo 1 headphone listener and Photo 2 the Smiths fan" />
        </div>
      </figure>
      <span className="tiny-cafe-comparison-arrow" aria-hidden="true"><ArrowRight size={20} /></span>
      <figure className="tiny-cafe-comparison-card">
        <figcaption><span className="tiny-cafe-comparison-step">02</span><div><strong>After: watch the four beats</strong><small>Headphones, a glance, the line and a shared smile.</small></div></figcaption>
        <div className="tiny-cafe-comparison-media">
          <img src="/love-the-smiths/comparison-after.webp" width="1200" height="675" loading="lazy" decoding="async" alt="Four reference frames from the demo videos: headphones, a sideways glance, I love the Smiths, and a shared smile" />
        </div>
      </figure>
    </div>
    <p className="tiny-illustration-note">Reference frames from our demo videos, not customer photos or generated results. The current template is in transition; your delivered AI output can differ in faces, motion and timing.</p>
  </div>;
}
