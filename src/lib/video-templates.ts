// Public-safe allowlist: never accept prompts, product IDs or redirect paths from a client.
export const DEFAULT_TEMPLATE = "fancy-cafe-ai";
export type PhotoRange = { min:number; max:number };
type TemplateShape = {
  id:string; productId:string; path:string; promptVersion:string; durationSeconds:number; photoCount:PhotoRange;
  title:string; overline:string; heading:string; emphasis:string; intro:string;
  roles:readonly string[]; roleDescriptions:readonly string[]|null;
  instructions:string; purchase:string; previewHeading:string; previewTitle:string; hasDemo:boolean;
};
export const VIDEO_TEMPLATES = {
  "fancy-cafe-ai": {
    id: "fancy-cafe-ai", productId: "fancy-cafe-ai", path: "/", promptVersion: "fancy-cafe-v1", durationSeconds: 15, photoCount: { min: 1, max: 2 },
    title: "Your First Time in a Fancy Cafe AI Video Generator", overline: "YOUR MOMENT. THE WRONG SEAT.",
    heading: "Your photo.", emphasis: "That awkward moment.", intro: "Turn one or two consenting adult portraits into a cafe comedy video.",
    roles: ["Protagonist", "Cafe regular"], roleDescriptions: ["Mistakes the small round table for a seat.", "Sits on the bench and reveals the mistake."],
    instructions: "Photo 1: protagonist, required. Photo 2: cafe regular, optional. One consenting adult per image.",
    purchase: "One 15-second cafe video in your chosen format. AI likeness and motion can vary.",
    previewHeading: "THE WRONG-SEAT MOMENT", previewTitle: "Preview the studio", hasDemo: true,
  },
  "zombie-couple": {
    id: "zombie-couple", productId: "zombie-couple", path: "/", promptVersion: "zombie-v1", durationSeconds: 8, photoCount: { min: 2, max: 2 },
    title: "Zombie couple video generator", overline: "THE STORY BEGINS HERE",
    heading: "Make your moment", emphasis: "unforgettable.",
    intro: "Two adult portraits. One fictional zombie love video. No account needed.",
    roles: ["The infected", "The rescuer"],
    roleDescriptions: null,
    instructions: "Photo 1: infected person. Photo 2: rescuer. Upload in that order; we automatically adapt the story to your photos.",
    purchase: "One 8-second zombie love story using your two approved portraits.",
    previewHeading: "THE NIGHTFALL STORY", previewTitle: "Preview your zombie love story",
    hasDemo: true,
  },
  // New purchases use the proven silent V2 prompt; retain V3/V4 for existing order snapshots.
  "tiptoeing-in-my-jordans": {
    id: "tiptoeing-in-my-jordans", productId: "tiptoeing-in-my-jordans", path: "/video/tiptoeing-in-my-jordans", promptVersion: "tiptoeing-v2", durationSeconds: 15, photoCount: { min: 2, max: 2 },
    title: "Tiptoeing In My Jordans AI video generator", overline: "TWO PHOTOS. ONE PLAYFUL MOMENT.",
    heading: "Choose who dances", emphasis: "and who watches.",
    intro: "Make your own version of the Tiptoeing In My Jordans meme. Our ready-made template guides the scene, reactions and footwork; no prompt writing needed.",
    roles: ["The dancer", "Seated observer"],
    roleDescriptions: [
      "This person performs the shushing gesture, cheeky smile and tiptoe dance.",
      "This person stays seated, watches the dancer and reacts with surprise.",
    ],
    instructions: "Photo 1: dancer. Photo 2: seated observer. Roles follow upload order, not gender. Use clear photos with one person in each.",
    purchase: "One 15-second, reference-guided tiptoeing video using your two approved portraits.",
    previewHeading: "YOUR TIPTOE MOMENT", previewTitle: "Watch the reference or a real result",
    hasDemo: false,
  },
  "tiny-desk-ai": {
    id: "tiny-desk-ai", productId: "tiny-desk-ai", path: "/", promptVersion: "tiny-desk-v4", durationSeconds: 15, photoCount: { min: 1, max: 5 },
    title: "First Time in a Fancy Cafe AI Video Generator", overline: "YOUR MOMENT BEHIND THE MIC",
    heading: "Your photo.", emphasis: "Center stage.",
    intro: "Five adult portraits. One 15-second concert-inspired AI video with a soundtrack. No account needed.",
    roles: ["Back left", "Back right", "Front center", "Lead", "Sax"],
    roleDescriptions: ["Back-left backing performer.", "Back-right backing performer.", "Front-left keyboardist, smiling and performing with eyes open.", "Solo lead singer in the close-up.", "Saxophone player in the final shot."],
    instructions: "Upload one to five portraits in this order: back left, back right, keyboard, lead, sax. One consenting adult per photo.",
    purchase: "One 15-second, reference-guided concert video using five approved portraits and the supplied soundtrack.",
    previewHeading: "THE DESK-SIDE SESSION", previewTitle: "Preview your Tiny Desk moment",
    hasDemo: true,
  },
} as const satisfies Record<string, TemplateShape>;
export type TemplateId = keyof typeof VIDEO_TEMPLATES;
export function parseTemplate(value: unknown): TemplateId | null {
  if (value === null || value === undefined) return DEFAULT_TEMPLATE;
  return value === "fancy-cafe-ai" ? value : null;
}
export function videoTemplate(id: TemplateId = DEFAULT_TEMPLATE) { return VIDEO_TEMPLATES[id]; }
export function templatePhotoCount(id: TemplateId = DEFAULT_TEMPLATE, version?: string): PhotoRange {
  if (id === "tiny-desk-ai" && version === "tiny-desk-v1") return { min: 1, max: 5 };
  return videoTemplate(id).photoCount;
}
export type PromptContext = { templateId: TemplateId; promptVersion: string; photoSlots?: string[]; databasePrompt?: string };
export const TINY_DESK_SLOTS = ["back-left", "back-right", "keys", "lead", "sax"] as const;
export function needsComposition(context?: { templateId: string; promptVersion: string }) {
  return (context?.templateId === "fancy-cafe-ai" && context.promptVersion === "fancy-cafe-v1") || context?.templateId === "tiny-desk-ai" && ["tiny-desk-v2", "tiny-desk-v3", "tiny-desk-v4"].includes(context.promptVersion);
}
export function validateTinyDeskSlots(slots: string[]) {
  // One to five portraits are allowed; slots must be known, unique and in canonical order.
  if (slots.length < 1 || slots.length > TINY_DESK_SLOTS.length) throw new Error("Upload one to five portraits: back-left, back-right, keys, lead, sax.");
  let last = -1;
  for (const slot of slots) {
    const index = TINY_DESK_SLOTS.indexOf(slot as typeof TINY_DESK_SLOTS[number]);
    if (index < 0 || index <= last) throw new Error("Upload one to five portraits: back-left, back-right, keys, lead, sax.");
    last = index;
  }
}

// Resolve immutable order snapshots, not the latest template, when retrying a paid video.
export function videoSpec(context?: PromptContext) {
  const template = videoTemplate(context?.templateId ?? DEFAULT_TEMPLATE);
  if (template.id === "fancy-cafe-ai" && (!context || context.promptVersion === "fancy-cafe-v1")) return { durationSeconds: 15, referenceVideo: true, generateAudio: false } as const;
  const version = context?.promptVersion ?? template.promptVersion;
  if (template.id === "tiny-desk-ai" && (version === "tiny-desk-v2" || version === "tiny-desk-v3" || version === "tiny-desk-v4")) return { durationSeconds: 15, referenceVideo: true, generateAudio: false } as const;
  if (template.id === "tiny-desk-ai" && version === "tiny-desk-v1") return { durationSeconds: 8, referenceVideo: false, generateAudio: false } as const;
  if (template.id === "zombie-couple" && version === "zombie-v1") return { durationSeconds: 8, referenceVideo: false, generateAudio: false } as const;
  if (template.id === "tiptoeing-in-my-jordans" && version === "tiptoeing-v1") return { durationSeconds: 8, referenceVideo: false, generateAudio: false } as const;
  if (template.id === "tiptoeing-in-my-jordans" && version === "tiptoeing-v2") return { durationSeconds: 15, referenceVideo: true, generateAudio: false } as const;
  if (template.id === "tiptoeing-in-my-jordans" && (version === "tiptoeing-v3" || version === "tiptoeing-v4")) return { durationSeconds: 15, referenceVideo: true, generateAudio: true } as const;
  throw new Error("This purchase uses an unavailable prompt version. Contact support; do not pay again.");
}

export function validateCafeSlots(slots: string[]) {
  if (!(slots.length === 1 && slots[0] === "protagonist" || slots.length === 2 && slots[0] === "protagonist" && slots[1] === "regular")) {
    throw new Error("Upload the protagonist first, followed by an optional cafe regular.");
  }
}
