import { TIPTOEING_STORYBOARD_V2, TIPTOEING_STORYBOARD_V3, TIPTOEING_STORYBOARD_V4 } from "./tiptoeing-storyboard";
import { buildTinyDeskPrompt, buildVideoPrompt, type PromptScenario } from "./video-prompt";
import { DEFAULT_TEMPLATE, validateCafeSlots, needsComposition, videoSpec, videoTemplate, type PromptContext } from "./video-templates";

// Keep old prompt versions executable for paid-order retries. Do not silently upgrade snapshots.
export function templatePrompt(scenario: PromptScenario, aspectRatio: "9:16" | "16:9", tagged = false, context?: PromptContext): string {
  const template = videoTemplate(context?.templateId ?? DEFAULT_TEMPLATE);
  const version = context?.promptVersion ?? template.promptVersion;
  videoSpec(context);
  if (template.id === "fancy-cafe-ai") {
    if (!context?.databasePrompt?.trim()) throw new Error("The versioned cafe database prompt is unavailable. No video was submitted.");
    const slots = context.photoSlots ?? [];
    validateCafeSlots(slots);
    const identity = "Image 1 is the protagonist who sits on the table. " + (slots.length === 2
      ? "Image 2 is the cafe regular who sits correctly on the bench. Preserve each uploaded adult identity independently."
      : "The cafe regular is a distinct fictional adult, not a duplicate of Image 1 and not the reference actor.");
    const femaleCharacter = slots.length === 2
      ? "Use the SECOND uploaded portrait as the identity of the woman in the reference. Preserve her recognizable face, facial structure, eyes, hairstyle and skin tone in every shot. Keep the reference woman's black blazer, black inner top and dark trousers. Recreate her entrance, sitting down on the concrete platform, coffee-holding, upward glance and eye-roll directed at the man."
      : "No second portrait is provided. Create a distinct fictional adult woman with a similar style to the reference woman, not a copy of the reference actor or the first uploaded portrait. Keep her black blazer, black inner top and dark trousers. Recreate her entrance, sitting down on the concrete platform, coffee-holding, upward glance and eye-roll directed at the man.";
    return context.databasePrompt
      .replaceAll("{{ASPECT_RATIO}}", aspectRatio === "16:9" ? "horizontal 16:9" : "vertical 9:16")
      .replaceAll("{{IDENTITY_MAP}}", identity)
      .replaceAll("{{FEMALE_CHARACTER}}", femaleCharacter)
      .replaceAll("{{FEMALE_IDENTITY}}", slots.length === 2
        ? "Use the SECOND uploaded portrait as the identity of the woman; preserve her face in every shot."
        : "No second portrait is provided. Generate a distinct fictional adult woman styled after the reference; never copy the reference actor��s identity or duplicate Image 1.");
  }
  if (needsComposition(context)) {
    if (!context?.databasePrompt?.trim()) throw new Error("The versioned Tiny Desk database prompt is unavailable. No video was submitted.");
    return context.databasePrompt.replaceAll("{{ASPECT_RATIO}}", aspectRatio);
  }
  if (template.id === "tiny-desk-ai") return buildTinyDeskPrompt(aspectRatio, tagged, context?.photoSlots ?? []);
  if (template.id === "zombie-couple") return buildVideoPrompt(scenario, aspectRatio, tagged);
  const first = tagged ? "@Image1" : "Image 1";
  const second = tagged ? "@Image2" : "Image 2";
  if (version === "tiptoeing-v2" || version === "tiptoeing-v3" || version === "tiptoeing-v4") {
    const video = tagged ? "@Video1" : "the attached reference video";
    const withAudio = version !== "tiptoeing-v2";
    const versionedStoryboard = version === "tiptoeing-v4" ? TIPTOEING_STORYBOARD_V4 : version === "tiptoeing-v3" ? TIPTOEING_STORYBOARD_V3 : TIPTOEING_STORYBOARD_V2;
    const storyboard = versionedStoryboard.replaceAll("Image 1", first).replaceAll("Image 2", second);
    return `${storyboard}

ATTACHED REFERENCES: ${first} is the dancer; ${second} is the seated observer; ${video} guides movement and shot timing, NOT the identity or clothing of either uploaded person. Never copy the reference video's actors' faces or outfits.
OUTPUT: exactly 15 seconds, ${aspectRatio === "16:9" ? "16:9 landscape" : "9:16 portrait"}. Adapt framing to this aspect ratio while keeping both feet visible during the full-body dance shots. Keep the observer seated beside the dancer and show the dedicated footwork close-up.
SAFETY: exactly two consenting, fully clothed adults. Nonsexual, nonviolent entertainment only. No minors, nudity, sexualized poses, gore, injury, threats, dangerous stunts or hateful content. Do not add brand logos, text or watermarks. ${withAudio ? "Include model-generated instrumental music guided by the reference audio; never copy the original recording, melody, lyrics or vocals." : "Silent video; no soundtrack."}
Generation fidelity is guided by the attached references; prioritize the ordered storyboard and identity consistency.`;
  }
  return `Create one coherent 8-second, photorealistic, playful dance-interaction video inspired by the Tiptoeing In My Jordans trend, with exactly two consenting adult characters.
REFERENCE IDENTITY LOCK: ${first} is the tiptoeing performer throughout. ${second} is the reaction character throughout. Never swap their roles based on gender. Preserve each person's own facial identity, hairstyle, skin tone, body proportions and original clothing from their respective uploaded photo. Do not invent branded shoes, add brand logos or change their outfits. No face swapping, duplicate people, extra characters or text overlays.
0-2 seconds: establish both characters in the same softly lit, uncluttered setting, feet visible. The performer begins small, rhythmic steps on the balls of their feet; the reaction character notices.
2-5 seconds: the performer continues a light, controlled tiptoe shuffle with alternating short steps, relaxed knees and natural arm movement. The reaction character turns toward them with a friendly surprised smile. Keep both identities stable and the footwork readable.
5-8 seconds: the performer takes a few final playful steps toward the reaction character, who responds with an amused nod. End on a shared friendly smile, with a stable, natural pose. Keep camera motion smooth and avoid abrupt cuts or impossible movement.
FRAME: ${aspectRatio === "16:9" ? "16:9 landscape, compose both people side by side with enough floor space" : "9:16 portrait, vertically compose both people with enough floor space"}. Show the performer's head and feet in the dancing shots. Natural anatomy, consistent hands and legs, realistic shadows, fluid temporal continuity.
SAFETY: fully clothed adults, nonsexual, nonviolent entertainment only. No minors, nudity, sexualized poses, gore, injury, threats, harassment, dangerous stunts or hateful content. No zombies, infection, rescue scene, flashlight or horror imagery. Do not reproduce a copyrighted music track, lyrics or an exact choreography. No requested soundtrack; visual storytelling only.`;
}
