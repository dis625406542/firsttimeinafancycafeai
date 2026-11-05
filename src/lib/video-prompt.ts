import { readFileSync } from "node:fs";
import { join } from "node:path";

export type PortraitAppearance = "female" | "male" | "unknown";
export type PromptScenario = "female_infected" | "male_infected" | "gender_neutral";

// Appearance is only a visual storytelling hint, not a claim about gender identity.
// Never swap references to force a pair into one of the two gendered templates.
export function selectPromptScenario(portraits: readonly { appearance: PortraitAppearance }[]): PromptScenario {
  if (portraits.length !== 2) throw new Error("Two portrait assessments are required.");
  const [infected, rescuer] = portraits;
  if (infected.appearance === "female" && rescuer.appearance === "male") return "female_infected";
  if (infected.appearance === "male" && rescuer.appearance === "female") return "male_infected";
  return "gender_neutral";
}

function englishTemplate(section: "1" | "2"): string {
  const source = readFileSync(join(process.cwd(), "public", "Prompt"), "utf8");
  const headers = [...source.matchAll(/^english([12]):[ \t]*\r?$/gim)];
  const index = headers.findIndex(header => header[1] === section);
  if (index < 0) throw new Error(`English${section} video prompt is missing from public/Prompt.`);
  const header = headers[index];
  const text = source.slice(header.index! + header[0].length, headers[index + 1]?.index ?? source.length).trim();
  if (!text) throw new Error(`English${section} video prompt is empty in public/Prompt.`);
  return text;
}

// When appearance is unclear or the photos do not match either pair, use explicit
// upload roles rather than guessing, swapping people, or blocking a safe portrait.
const neutralTemplate = `Create an 8-second, vertical 9:16, photorealistic live-action cinematic short film about love saving an infected partner.
Reference Image 1 is the infected partner. Reference Image 2 is the healthy rescuer.
SHOT 1 (0-2 seconds): On a smoky post-apocalyptic street, the infected partner from Image 1 emerges with subtle gray pallor and a stiff posture. Retain the exact original face, hair and clothing.
SHOT 2 (2-3.5 seconds): The rescuer from Image 2 recognizes the infected partner, cries and drops a flashlight naturally to the ground. Show the rescuer's emotional face clearly.
SHOT 3 (3.5-5.5 seconds): The rescuer actively approaches and initiates a gentle, mutual embrace. No attack or knockdown. The infected partner relaxes and returns the embrace; gray pallor fades into healthy skin while facial identity remains unchanged.
SHOT 4 (5.5-8 seconds): Match cut from the same embrace to a warm golden field. Tight close-up of both recognizable faces, shoulders and upper bodies. Both partners smile through tears and gently touch foreheads. Keep the same original outfits and accessories.
Use realistic skin texture, natural tears, anatomically correct hands, smooth camera movement, cold blue-gray opening light and warm golden ending light. No extra people, no identity or role swaps, no outfit replacements, no deformed anatomy, no obscured faces, no distant ending, no subtitles, logos or watermarks.`;

const tinyDeskRoles: Record<string, string> = {
  "Back left": "a backing singer standing at the left of the room",
  "Back right": "a backing singer standing at the right of the room",
  Keys: "the keyboard player sitting at the keyboard",
  Lead: "the lead vocalist at the front microphone",
  Sax: "the saxophone player wearing headphones",
};

function tinyDeskTemplate(aspectRatio: "9:16" | "16:9", references: string[], slots: string[]): string {
  const count = references.length;
  const cast = references.map((reference, index) => {
    const label = slots[index];
    const role = label && tinyDeskRoles[label] ? tinyDeskRoles[label] : "an ensemble performer";
    return `${reference} is ${role}`;
  }).join("; ");
  const identities = count === 1
    ? `${cast}. Preserve that person's exact facial identity, facial features, hairstyle, hair color, skin tone, body proportions and original clothing from the uploaded photo in every shot.`
    : `${cast}. Treat every reference image as a different, consenting performer. Preserve each person's own facial identity, hair, skin tone, body proportions and original clothing in every shot. Never merge, swap or duplicate people.`;
  const scene = count === 1
    ? "A warm, cozy studio corner with wooden shelves of books and records, warm practical lamps, a condenser microphone on a stand and spare instruments within arm's reach. The performer stands close to the microphone and performs with natural, subtle movement."
    : "A warm, cozy studio corner with wooden shelves of books and records, warm practical lamps, condenser microphones on stands and instruments within arm's reach. The performers play and sing together as a small live band, close to each other, with natural, subtle movement and friendly interaction.";
  return `Create one coherent 8-second, photorealistic, cinematic short video of an intimate small-room live session.
REFERENCE IDENTITY LOCK: ${identities} No extra people beyond the reference images.
SCENE: ${scene}
SHOT FLOW: 0-2s a medium shot establishes the room and the performers; 2-5s a gentle push-in on the group with natural gestures and breathing; 5-8s close framing with soft warm light, ending on calm, confident expressions. Keep every performer's face clearly visible at least once.
STYLE: realistic skin texture, natural motion, shallow depth of field, warm golden practical lighting, smooth camera movement, 35mm cinematic look.
SAFETY: consenting adults only, fully clothed, non-sexual and non-violent. No nudity, sexual content, violence, gore, self-harm, hateful or harassing content, or impersonation of a public figure. No text, subtitles, logos or watermarks.
OUTPUT: exactly 8 seconds, ${aspectRatio === "16:9" ? "horizontal 16:9" : "vertical 9:16"}.`;
}

export function buildTinyDeskPrompt(aspectRatio: "9:16" | "16:9", taggedReferences = false, slots: string[] = []): string {
  if (aspectRatio !== "9:16" && aspectRatio !== "16:9") throw new Error("Unsupported aspect ratio.");
  if (slots.length > 5) throw new Error("Too many performers.");
  const count = Math.max(1, slots.length);
  const references = Array.from({ length: count }, (_, index) => taggedReferences ? `@Image${index + 1}` : `Image ${index + 1}`);
  return tinyDeskTemplate(aspectRatio, references, slots);
}

export function buildVideoPrompt(scenario: PromptScenario, aspectRatio: "9:16" | "16:9", taggedReferences = false): string {
  if (!["female_infected", "male_infected", "gender_neutral"].includes(scenario)) throw new Error("Unsupported prompt scenario.");
  if (aspectRatio !== "9:16" && aspectRatio !== "16:9") throw new Error("Unsupported aspect ratio.");
  const template = scenario === "gender_neutral" ? neutralTemplate : englishTemplate(scenario === "female_infected" ? "1" : "2");
  // The source templates are portrait. Replace, rather than contradict, their framing.
  const story = template.replace(/vertical\s+9:16/gi, aspectRatio === "16:9" ? "horizontal 16:9" : "vertical 9:16");
  const first = taggedReferences ? "@Image1" : "Image 1";
  const second = taggedReferences ? "@Image2" : "Image 2";
  return `REFERENCE AND ROLE LOCK: The first reference image (${first}) is the infected person. The second reference image (${second}) is the healthy rescuer. Never swap their reference order, identities, infection status or story roles.
IDENTITY AND WARDROBE LOCK: Preserve each person's distinct facial identity, facial features, hairstyle, hair color, body proportions, original clothing, garment colors and patterns, jewelry and visible accessories from their own uploaded photo in every shot, including the final scene. Only infection makeup, expression and movement may change. Do not invent replacement outfits or transfer features between people.
SAFETY: Consenting adults only. Fictional, non-graphic, non-sexual romance. No nudity, sexual content, gore, graphic injuries, attacks, hateful content or self-harm.
OUTPUT: Exactly 8 seconds, ${aspectRatio === "16:9" ? "horizontal 16:9" : "vertical 9:16"}. Keep both faces clearly visible in the final close-up.

${story}`;
}
