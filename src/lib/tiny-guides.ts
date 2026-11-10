export type GuideImage = { src: string; alt: string; caption: string; width: number; height: number };
export type GuideSection = { heading: string; paragraphs: string[]; steps?: string[]; bullets?: string[]; table?: { caption: string; headers: string[]; rows: string[][] }; image?: GuideImage; links?: { href: string; label: string }[] };
export type TinyGuide = { slug: string; title: string; description: string; answer: string; date: string; publishedAt: string; updatedAt: string; category: string; minutes: string; image: string; imageClass: string; imageBadge: string; imageAlt: string; sections: GuideSection[]; related: string[]; sources?: { label: string; href: string; note?: string }[]; faqs?: { question: string; answer: string }[] };

const UPDATED = "2026-11-10";
const DATE = "November 10, 2026";

export const allTinyGuides: TinyGuide[] = [
  {
    slug: "what-is-the-i-love-the-smiths-meme",
    title: "What is the I Love the Smiths meme?",
    description: "The I Love the Smiths meme explained: the elevator meet-cute, the headphones, the line and how the two-photo AI video trend works.",
    answer: "The I Love the Smiths meme is the elevator meet-cute from (500) Days of Summer: one person wears headphones, the other recognizes the song and says “I love the Smiths.” AI versions cast two new people in a newly generated version of that scene.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "The meme & music", minutes: "6 min read",
    image: "/love-the-smiths/beat-3.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: the line in the elevator",
    sections: [
      {
        heading: "What is the I Love the Smiths meme?",
        paragraphs: [
          "The I Love the Smiths meme is a small romantic scene: two people share an elevator. One is wearing headphones and listening to The Smiths. The other recognizes the song, turns, and says “I love the Smiths.” That recognition is the whole joke and the whole meet-cute.",
          "The current AI trend keeps the elevator, the headphones, the sideways glance and the line, then lets creators put new faces into the scene. The result is usually a short video made from two uploaded portraits, one for each role."
        ],
        bullets: [
          "The listener: the person wearing headphones.",
          "The fan: the person who turns, smiles and says the line.",
          "The beat: recognition becomes connection in a few seconds."
        ]
      },
      {
        heading: "Where does the scene come from?",
        paragraphs: [
          "The scene comes from (500) Days of Summer (2009), on a day the film labels Day 4. Tom, played by Joseph Gordon-Levitt, is in an elevator listening to The Smiths. Summer, played by Zooey Deschanel, enters, recognizes the song and says “I love the Smiths.”",
          "The track referenced in the scene is “There Is a Light That Never Goes Out” by The Smiths. The scene is part of the film, not a social-media original. This site is independent commentary, not an official film or band product."
        ],
        links: [
          { href: "/blog/is-i-love-the-smiths-from-500-days-of-summer", label: "Is the scene from (500) Days of Summer?" },
          { href: "/blog/i-love-the-smiths-ai-music-and-lyrics", label: "Music and lyrics rights" }
        ]
      },
      {
        heading: "What are the two roles in the AI version?",
        paragraphs: [
          "The AI version uses two portrait slots. Photo 1 is the headphone listener. Photo 2 is the person who turns, smiles and delivers the line. Upload order sets the roles; it is not about gender.",
          "You can use two portraits for a full recast, or leave Photo 2 empty and let the configured reference guide that character. An exact face and likeness are not guaranteed either way."
        ],
        bullets: [
          "Photo 1: headphone listener, required in this build.",
          "Photo 2: the person who says the line, optional.",
          "One consenting adult per photo; clear face and even light."
        ],
        links: [
          { href: "/blog/i-love-the-smiths-ai-two-photo-roles", label: "See the two-photo roles" },
          { href: "/#studio", label: "Open the two-photo studio" }
        ]
      },
      {
        heading: "Why does the line work as a meet-cute?",
        paragraphs: [
          "Music taste is specific and personal. Recognizing someone’s song is a shortcut to curiosity: the line says, “I notice what you like,” without asking a direct question. That is why the scene reads as romantic rather than like a music quiz.",
          "The meme works because the line is short enough to remember and visual enough to recreate. The headphones, the glance and the smile do most of the storytelling."
        ]
      },
      {
        heading: "How is the AI video different from the film?",
        paragraphs: [
          "The AI generator creates new frames around your uploaded portraits. It is not an edit of the film clip and not a frame-for-frame face swap. Faces, clothing, movement and timing can change between orders.",
          "The scene is designed to follow the four beats: headphones, glance, line, shared smile. Treat the output as a new AI-generated meet-cute inspired by the meme, not as an official or exact recreation."
        ],
        links: [
          { href: "/blog/i-love-the-smiths-ai-vs-capcut-template", label: "AI generator vs a CapCut template" },
          { href: "/blog/i-love-the-smiths-ai-video-length-and-format", label: "Length and format" }
        ]
      }
    ],
    related: ["is-i-love-the-smiths-from-500-days-of-summer", "i-love-the-smiths-ai-two-photo-roles", "i-love-the-smiths-ai-music-and-lyrics", "i-love-the-smiths-ai-video-generator-explained"],
    sources: [
      { label: "(500) Days of Summer — IMDb quotes", href: "https://www.imdb.com/title/tt1022603/quotes/", note: "Scene dialogue and character names." },
      { label: "Vice — the elevator scene revisited", href: "https://www.vice.com/en/article/evyenw/why-the-elevator-scene-in-500-days-of-summer-still-pisses-people-off-10-years-later", note: "Commentary on the scene and the song." },
      { label: "Bustle — Zooey Deschanel on the elevator scene", href: "https://www.bustle.com/entertainment/zooey-deschanel-500-days-of-summer-elevator-scene-mistake", note: "Actor recollection; useful context, not an official product statement." },
      { label: "Media.io — I Love The Smiths AI effect", href: "https://www.media.io/ai/zh/explore/zone/i-love-the-smiths-ai", note: "Reference effect page for the two-photo trend; not an endorsement." }
    ],
    faqs: [
      { question: "Is I Love the Smiths a song?", answer: "No. “I love the Smiths” is a line from the elevator scene in (500) Days of Summer. The song referenced in the scene is “There Is a Light That Never Goes Out” by The Smiths." },
      { question: "Do I need both photos?", answer: "Photo 1 is required; Photo 2 is optional in this build. Add both for a full two-person recast." },
      { question: "Is the AI video official?", answer: "No. This is an independent, unofficial tool and is not affiliated with the film, its actors or rights holders, or The Smiths." }
    ]
  },
  {
    slug: "is-i-love-the-smiths-from-500-days-of-summer",
    title: "Is I Love the Smiths from (500) Days of Summer?",
    description: "Yes: the I Love the Smiths line comes from the Day 4 elevator scene in (500) Days of Summer. Here is who says it, what song is playing and what the AI trend changes.",
    answer: "Yes. The “I love the Smiths” line is from the Day 4 elevator scene in (500) Days of Summer (2009). Tom, played by Joseph Gordon-Levitt, is wearing headphones; Summer, played by Zooey Deschanel, recognizes the song and says the line.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "The meme & music", minutes: "5 min read",
    image: "/love-the-smiths/beat-1.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: the headphone listener",
    sections: [
      {
        heading: "Is I Love the Smiths from (500) Days of Summer?",
        paragraphs: [
          "Yes. The line is from (500) Days of Summer (2009). The film structures its story around numbered days, and the elevator moment happens on Day 4.",
          "Tom is listening to The Smiths through headphones when Summer enters. She recognizes the music and says “I love the Smiths.” The line is the beginning of their connection, not a song title."
        ]
      },
      {
        heading: "Who says the line?",
        paragraphs: [
          "Summer, played by Zooey Deschanel, says it. Tom, played by Joseph Gordon-Levitt, is the listener wearing headphones. She says it more than once because he cannot hear her the first time.",
          "The scene is short, but it carries a lot: curiosity, taste, a small joke and a door opening between two people. That compact structure is why it works as a meme template."
        ]
      },
      {
        heading: "What song is referenced?",
        paragraphs: [
          "The scene references “There Is a Light That Never Goes Out” by The Smiths. We mention the song title for context and do not reproduce the lyrics.",
          "The AI video should not be marketed as an official music video or as a licensed use of the commercial recording. Audio rights are separate from the video-generation service."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-music-and-lyrics", label: "Read the music and lyrics guide" }]
      },
      {
        heading: "Is the AI video official?",
        paragraphs: [
          "No. The AI trend borrows the scene idea for commentary and creative remixing. This site is independent and unofficial; it is not affiliated with the film, its actors, the studio or The Smiths.",
          "We do not publish film stills, actor likenesses, band logos or album art. The illustrations on this site are original and labeled as illustrations."
        ]
      },
      {
        heading: "What does the AI version change?",
        paragraphs: [
          "The AI version changes the cast. You upload two portraits, choose who listens and who says the line, and generate a new scene around those faces.",
          "It is not a face swap on the original footage. The scene, expressions, clothing and timing are generated, so results vary. The recognizable beats stay: headphones, glance, line and smile."
        ],
        links: [
          { href: "/blog/what-is-the-i-love-the-smiths-meme", label: "What is the meme?" },
          { href: "/#studio", label: "Make your own version" }
        ]
      }
    ],
    related: ["what-is-the-i-love-the-smiths-meme", "i-love-the-smiths-ai-music-and-lyrics", "i-love-the-smiths-ai-vs-capcut-template"],
    sources: [
      { label: "(500) Days of Summer — IMDb quotes", href: "https://www.imdb.com/title/tt1022603/quotes/" },
      { label: "Bustle — Zooey Deschanel on the scene", href: "https://www.bustle.com/entertainment/zooey-deschanel-500-days-of-summer-elevator-scene-mistake" },
      { label: "Vice — the elevator scene revisited", href: "https://www.vice.com/en/article/evyenw/why-the-elevator-scene-in-500-days-of-summer-still-pisses-people-off-10-years-later" }
    ],
    faqs: [
      { question: "Is the film called 500 Days of Summer or (500) Days of Summer?", answer: "The film is commonly written as (500) Days of Summer. Both forms appear in informal references." },
      { question: "Does the site use the original actors?", answer: "No. The AI video uses your uploaded adult portraits and generates a new scene. It does not use actor likenesses or original footage." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-music-and-lyrics",
    title: "I Love the Smiths AI music and lyrics: what can you use?",
    description: "What song is in the elevator scene, whether the AI video includes the original recording, and how to share the result without overstepping music or portrait rights.",
    answer: "The scene references The Smiths’ “There Is a Light That Never Goes Out,” but this generator does not claim to include or license the original commercial recording. No separate music license is included; use the result for personal, non-commercial sharing and respect platform rules.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "The meme & music", minutes: "6 min read",
    image: "/love-the-smiths/beat-4.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: a shared smile",
    sections: [
      {
        heading: "What song is in the scene?",
        paragraphs: [
          "The (500) Days of Summer elevator scene references “There Is a Light That Never Goes Out” by The Smiths. The song is part of the film’s storytelling; the line “I love the Smiths” is about recognizing that music.",
          "This guide mentions the title for context. It does not reproduce the lyrics, and the generator does not add lyrics to your video."
        ]
      },
      {
        heading: "Does the generator include the original recording?",
        paragraphs: [
          "Do not assume so. The current pipeline merges a configured reference soundtrack, and the commercial recording is not automatically licensed for your order. The public copy should not promise the original song.",
          "If you need a specific track for a commercial project, obtain the rights yourself. A video-generation purchase is not a music license."
        ]
      },
      {
        heading: "Can I use the audio commercially?",
        paragraphs: [
          "No commercial-use license is included with this studio. The product is for personal entertainment and non-commercial social sharing.",
          "That means no advertising, sponsored posts, client work, resale or paid promotion using the output as-is. If you want commercial use, clear the music, the portraits and any other rights with the appropriate rights holders."
        ],
        links: [{ href: "/terms", label: "Read the personal-use terms" }]
      },
      {
        heading: "Why should the video avoid lyrics?",
        paragraphs: [
          "Lyrics are protected by copyright and are not needed to make the meme work. The scene’s power comes from the line “I love the Smiths,” the headphones and the glance, not from a full lyric sheet.",
          "Keeping lyrics out of the video also makes the result easier to share without turning a fun meet-cute into a music-licensing problem."
        ]
      },
      {
        heading: "How do I share the video responsibly?",
        paragraphs: [
          "Share it for personal, non-commercial purposes. Keep the people in the video informed, and do not present the result as an official film scene or an endorsement by the actors or the band.",
          "Platforms can mute, remove or flag a video for audio rights. If that happens, treat it as a platform decision and do not repost the same audio repeatedly."
        ],
        bullets: [
          "Use personal, non-commercial captions.",
          "Credit the meme and the film context honestly.",
          "Do not claim official affiliation or a licensed original recording.",
          "Respect the privacy and likeness of everyone in the photo."
        ]
      }
    ],
    related: ["what-is-the-i-love-the-smiths-meme", "i-love-the-smiths-ai-price-and-free-options", "i-love-the-smiths-ai-vs-capcut-template"],
    sources: [
      { label: "Vice — the elevator scene and the song", href: "https://www.vice.com/en/article/evyenw/why-the-elevator-scene-in-500-days-of-summer-still-pisses-people-off-10-years-later" },
      { label: "(500) Days of Summer — IMDb quotes", href: "https://www.imdb.com/title/tt1022603/quotes/" }
    ],
    faqs: [
      { question: "Will my video include the original Smiths song?", answer: "Do not assume so. The pipeline uses a configured reference soundtrack, and no separate license to the commercial recording is included." },
      { question: "Can I add my own music?", answer: "Use your own editor after downloading the MP4, and make sure you have the rights to any track you add." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-video-generator-explained",
    title: "I Love The Smiths AI video generator explained",
    description: "What the two-photo generator does, what you need before starting, what you receive and what the AI result is not.",
    answer: "I Love The Smiths AI turns two adult portraits into a short elevator meet-cute video. You add Photo 1 for the headphone listener, optionally add Photo 2 for the person who says the line, choose a format and pay once. It is a new AI-generated scene, not a face swap or official film clip.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Getting started", minutes: "6 min read",
    image: "/love-the-smiths/beat-2.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: a sideways glance",
    sections: [
      {
        heading: "What does the generator do?",
        paragraphs: [
          "The generator takes one or two adult portraits and builds a short scene around the elevator meet-cute. Photo 1 is the headphone listener; Photo 2 is the person who turns, smiles and says the line.",
          "It is designed for people who want the meme without writing a prompt, editing footage or installing an app. You choose the photos and the format; the template guides the scene."
        ]
      },
      {
        heading: "What do you need before starting?",
        paragraphs: [
          "You need one clear portrait for Photo 1 and, if you want a full two-person recast, a second portrait for Photo 2. Each image should show one consenting adult, with the face visible and even light.",
          "You also need a browser and a way to pay for the one-time order. No subscription is required. Keep the same browser and cookies so you can return to the order and download the result."
        ],
        bullets: [
          "Photo 1: headphone listener, required.",
          "Photo 2: the Smiths fan, optional.",
          "One adult per photo, JPG/PNG/WebP, up to 10 MB.",
          "A 9:16 or 16:9 format choice."
        ]
      },
      {
        heading: "What do you receive?",
        paragraphs: [
          "After verified payment and successful generation, you receive a private MP4 for the original browser. The selected resolution is 480p or 720p, and the selected aspect ratio is 9:16 or 16:9.",
          "The finished MP4 is 24 seconds. The checkout and delivery copy show the current duration."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-video-length-and-format", label: "Length and format details" }]
      },
      {
        heading: "What the result is not",
        paragraphs: [
          "It is not a frame-for-frame face swap of the film, not an official film or band product, and not a guarantee of an exact likeness. Reference-guided generation can change faces, hands, clothing and timing.",
          "It is also not a commercial license. The studio is for personal entertainment and non-commercial social sharing; audio and portrait rights still apply."
        ]
      },
      {
        heading: "How do I check price and availability?",
        paragraphs: [
          "Open the studio, add your photos, choose a quality and format, and review the final price before checkout. The live catalog is authoritative; listed prices are $6.99 for 480p and $9.99 for 720p.",
          "If checkout is temporarily unavailable, the site does not start a new paid order. Try again later or check an existing order in the same browser."
        ],
        links: [
          { href: "/#studio", label: "Open the studio" },
          { href: "/blog/i-love-the-smiths-ai-price-and-free-options", label: "Pricing and free options" }
        ]
      }
    ],
    related: ["how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-two-photo-roles", "i-love-the-smiths-ai-price-and-free-options"],
    faqs: [
      { question: "Do I need an account?", answer: "No account is required. The order is linked to the browser and its essential cookie." },
      { question: "Can I generate more than one video?", answer: "Each successful payment buys one video in the selected format. Start a new order to make another." }
    ]
  },
  {
    slug: "how-to-make-i-love-the-smiths-ai-video",
    title: "How to make an I Love The Smiths AI video",
    description: "A step-by-step guide to the two-photo elevator meet-cute video: choose the listener and the fan, pick a format, pay once and download.",
    answer: "To make an I Love The Smiths AI video, upload a clear adult portrait to Photo 1 for the headphone listener, optionally add Photo 2 for the person who says the line, choose 480p or 720p and 9:16 or 16:9, review the price and complete checkout.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Getting started", minutes: "7 min read",
    image: "/love-the-smiths/guide-cover-1.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Two reference frames from the demo videos: listener and shared smile",
    sections: [
      {
        heading: "Step by step",
        paragraphs: [
          "The flow is short by design. You do not write a prompt or install an app; the template handles the scene. Keep the same browser open through checkout and generation."
        ],
        steps: [
          "Open the studio and choose Photo 1: a clear adult portrait of the headphone listener.",
          "Optionally add Photo 2: a clear adult portrait of the person who says “I love the Smiths.”",
          "Choose 480p or 720p, then choose 9:16 vertical or 16:9 horizontal.",
          "Confirm that you have permission to use both photos and that everyone is an adult.",
          "Review the one-time price and complete secure checkout.",
          "Return in the same browser to check progress and download the MP4 within 30 days."
        ]
      },
      {
        heading: "Choose the right photos",
        paragraphs: [
          "Use one person per photo. Faces should be visible, with head and shoulders in frame, even light and no sunglasses. Avoid group photos, heavy shadows, screenshots and images where the face is very small.",
          "Photo 1 and Photo 2 are roles, not genders. Upload order matters: the first photo becomes the listener."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-photo-tips", label: "Read the photo tips" }]
      },
      {
        heading: "Choose the format",
        paragraphs: [
          "Use 9:16 for TikTok, Reels and Shorts; use 16:9 for YouTube and wider edits. 480p is the Standard option at $6.99; 720p is HD at $9.99.",
          "The finished MP4 is 24 seconds. Resolution changes sharpness, not the story or the likeness. Pick the frame first, then the resolution that fits where you plan to share."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-video-length-and-format", label: "Compare length and format" }]
      },
      {
        heading: "Checkout and generation",
        paragraphs: [
          "Generation starts only after verified payment. There is no fixed completion time; the queue and provider affect the wait. Do not pay again while an order is processing.",
          "If checkout is unavailable, no payment is taken. If you cancel a checkout and return, keep the same options to reuse the saved photos or start a fresh order."
        ]
      },
      {
        heading: "Download and share",
        paragraphs: [
          "Your completed video appears in Generated videos in the original browser. Download the MP4 within 30 days of completion; the service is not a permanent archive.",
          "Optional email delivery is available only when configured. If you add an email, the private link still expires, so download your own copy."
        ],
        links: [{ href: "/blog/download-and-share-i-love-the-smiths-ai-video", label: "Download and share details" }]
      }
    ],
    related: ["i-love-the-smiths-ai-video-generator-explained", "i-love-the-smiths-ai-two-photo-roles", "i-love-the-smiths-ai-photo-tips", "download-and-share-i-love-the-smiths-ai-video"],
    faqs: [
      { question: "How long does it take?", answer: "There is no fixed completion time. The wait depends on the queue, video generation and soundtrack assembly." },
      { question: "What if I close the browser?", answer: "Return in the same browser and keep its cookies. If you cannot access the order, contact support with your video code." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-two-photo-roles",
    title: "I Love The Smiths AI two-photo roles: who goes first?",
    description: "Photo 1 is the headphone listener; Photo 2 is the person who says the line. Understand upload order, one-photo orders and how to cast couples or friends.",
    answer: "Upload the headphone listener as Photo 1 and the person who turns, smiles and says “I love the Smiths” as Photo 2. Upload order sets the roles; the roles are not about gender. Photo 1 is required and Photo 2 is optional in this build.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Getting started", minutes: "5 min read",
    image: "/love-the-smiths/guide-cover-2.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Two reference frames from the demo videos: headphone listener and Smiths fan",
    sections: [
      {
        heading: "Photo 1: the headphone listener",
        paragraphs: [
          "Photo 1 is the person standing in the elevator wearing headphones. In the story, this person is absorbed in the music and does not hear the line the first time.",
          "Choose a clear portrait with the face visible. The template supplies the headphones; your photo supplies the person."
        ]
      },
      {
        heading: "Photo 2: the Smiths fan",
        paragraphs: [
          "Photo 2 is the person who notices the music, turns, smiles and says “I love the Smiths.” This is the line that turns the scene into a meet-cute.",
          "Photo 2 is optional in this build. If you leave it empty, the configured reference can guide that character; an exact face is not guaranteed. Add both photos for a full two-person recast."
        ]
      },
      {
        heading: "Upload order matters",
        paragraphs: [
          "The first uploaded photo is the listener; the second is the fan. Reversing the order swaps the roles, even if the photos are the same two people.",
          "If you are casting a couple or two friends, decide who listens and who speaks before uploading. The roles describe actions, not gender."
        ]
      },
      {
        heading: "Can I use one photo?",
        paragraphs: [
          "Yes. Photo 1 is required and Photo 2 is optional. A one-photo order still has two characters in the scene: your personalized listener and a reference-guided second character.",
          "If you specifically want both faces to match your photos, upload both. A one-photo result is not a promise that the second character will resemble anyone in particular."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-photo-tips", label: "Photo requirements" }]
      },
      {
        heading: "Consent and adult-only uploads",
        paragraphs: [
          "Only upload photos of yourself or consenting adults who have given permission. Each photo should show one person. This is two roles, not a group photo: do not upload children, non-consenting people or group photos that make the role ambiguous.",
          "The order includes a confirmation that everyone shown is an adult and that you have permission to use the photos. Automated screening cannot establish consent for you."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-photo-privacy-and-consent", label: "Privacy and consent" }]
      }
    ],
    related: ["i-love-the-smiths-ai-photo-tips", "how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-photo-privacy-and-consent"],
    faqs: [
      { question: "Does Photo 1 have to be a man?", answer: "No. The roles describe actions, not gender. Photo 1 is the listener; Photo 2 is the person who says the line." },
      { question: "Can my partner and I swap roles?", answer: "Yes. Swap the upload order to swap who listens and who speaks." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-photo-tips",
    title: "I Love The Smiths AI photo tips",
    description: "How to choose portraits that work for the two-photo elevator video: one adult per image, clear face, even light, correct file type and consent.",
    answer: "Use one consenting adult per JPG, PNG or WebP image, up to 10 MB. Choose a clear face with head and shoulders in frame, even light and no sunglasses. Avoid group photos, heavy shadows and blurry screenshots.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Getting started", minutes: "5 min read",
    image: "/love-the-smiths/beat-1.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: the Photo 1 headphone listener",
    sections: [
      {
        heading: "One adult per photo",
        paragraphs: [
          "Each upload should show exactly one consenting adult. Group photos make the role ambiguous: the system cannot reliably know which face belongs in the scene.",
          "Do not upload photos of children or anyone who has not agreed to have their likeness used for this purpose."
        ]
      },
      {
        heading: "Make the face easy to read",
        paragraphs: [
          "Use a portrait where the face is clearly visible, with head and shoulders in frame. A straightforward front-facing or slight three-quarter view usually works better than a distant full-body shot.",
          "Avoid sunglasses, heavy shadows, masks and filters that hide the face. Blurry screenshots and low-resolution crops give the generator less to work with."
        ]
      },
      {
        heading: "Light and background",
        paragraphs: [
          "Even, soft light is more reliable than a strong backlight or a single harsh lamp. The elevator scene is stylized, so the background of your photo does not need to be an elevator.",
          "A clean, uncluttered background can help, but the face and head are the priority. Do not spend time recreating the film set in your upload."
        ]
      },
      {
        heading: "File types and size",
        paragraphs: [
          "Use JPG, PNG or WebP, up to 10 MB per image. The studio optimizes the long edge and file size before upload; the original file on your device is not changed.",
          "If a photo is rejected, choose a clearer image rather than repeatedly retrying the same file. Face-visible, single-adult portraits have the best chance of passing the safety check."
        ]
      },
      {
        heading: "Consent and privacy",
        paragraphs: [
          "Upload only photos you have the right to use. If you appear in the photo, you still need to agree to the personal-use terms. If someone else appears, you need their permission.",
          "Portraits are stored privately for the order and become eligible for cleanup after generation or input expiry, normally three days after order creation; removal depends on the cleanup worker."
        ],
        links: [
          { href: "/blog/i-love-the-smiths-ai-photo-privacy-and-consent", label: "Read the privacy and consent guide" },
          { href: "/#studio", label: "Open the studio" }
        ]
      }
    ],
    related: ["i-love-the-smiths-ai-two-photo-roles", "how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-photo-privacy-and-consent"],
    faqs: [
      { question: "Can I upload a group photo?", answer: "No. Use one adult per photo so the role is unambiguous." },
      { question: "What size should the photo be?", answer: "Up to 10 MB, in JPG, PNG or WebP. A clear head-and-shoulders portrait is more important than a huge file." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-video-length-and-format",
    title: "I Love The Smiths AI video length and format",
    description: "The 24-second video, the format choices, and how to choose between 9:16 and 16:9 and 480p and 720p.",
    answer: "The video is 24 seconds. You can choose 480p or 720p and 9:16 vertical or 16:9 horizontal before checkout.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Making & saving", minutes: "6 min read",
    image: "/love-the-smiths/comparison-after.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Four reference frames from the demo videos: headphones, glance, line and smile",
    sections: [
      {
        heading: "The 24-second video",
        paragraphs: [
          "The public product concept is a 24-second elevator meet-cute: enough time for the headphones, the glance, the line and the shared smile without stretching the joke.",
          "A 24-second target is a design goal, not a promise that every result will land on the exact frame. AI generation and composition can shift timing."
        ]
      },
      {
        heading: "The 24-second delivery",
        paragraphs: [
          "The provider request and composition path deliver a 24-second MP4. The checkout and delivery copy show the current duration so you know what you are buying today.",
          "The 24-second version requires a coordinated prompt, provider-spec, composition and catalog update. Until that update ships, do not describe the paid output as 24 seconds."
        ],
        bullets: [
          "Marketing: 24-second template target.",
          "Delivery: 24-second MP4.",
          "Checkout and legal: 24-second delivery.",
          "After the template update: re-check the listed duration."
        ]
      },
      {
        heading: "9:16 or 16:9?",
        paragraphs: [
          "Choose 9:16 for TikTok, Reels and Shorts. The vertical frame gives the two characters more screen presence on a phone.",
          "Choose 16:9 for YouTube, a widescreen edit or a more cinematic crop. The elevator scene reads well in both, but the framing changes how close the characters feel."
        ]
      },
      {
        heading: "480p or 720p?",
        paragraphs: [
          "480p is the Standard option at $6.99. 720p is HD at $9.99. Resolution changes sharpness, not the story, likeness or timing.",
          "If you are testing the meme with friends, 480p is the lower-cost option. If you plan to keep or post the result, 720p gives you more detail."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-price-and-free-options", label: "See the pricing guide" }]
      },
      {
        heading: "What to check before paying",
        paragraphs: [
          "Confirm the selected resolution, aspect ratio and final price on the checkout page. Check that both photos show the right roles and that everyone is an adult with permission.",
          "Remember the delivery window: the finished MP4 is available for up to 30 days from completion. Download your own copy instead of treating the browser history as a permanent archive."
        ]
      }
    ],
    related: ["i-love-the-smiths-ai-price-and-free-options", "how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels", "download-and-share-i-love-the-smiths-ai-video"],
    faqs: [
      { question: "How long is the video?", answer: "The video is 24 seconds." },
      { question: "Can I change the format after paying?", answer: "The format is selected before checkout. Start a new order to choose a different format." }
    ]
  },
  {
    slug: "how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels",
    title: "How to make an I Love The Smiths AI video for TikTok or Reels",
    description: "A practical vertical-video workflow: choose 9:16, upload the two roles, pay once, download the MP4 and add your own caption before posting.",
    answer: "Choose a 9:16 vertical frame, upload the headphone listener as Photo 1 and optionally the person who says the line as Photo 2, complete checkout, download the MP4 and add your caption in your own editor. The site does not post to social accounts.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Making & saving", minutes: "6 min read",
    image: "/love-the-smiths/beat-4.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: a shared smile",
    sections: [
      {
        heading: "Choose the vertical frame",
        paragraphs: [
          "Select 9:16 before checkout. The tall frame is built for TikTok, Instagram Reels and YouTube Shorts, and it keeps both characters visible on a phone.",
          "If you later want a widescreen version, start a separate order with 16:9. The format is not changed after payment."
        ]
      },
      {
        heading: "Upload the two roles",
        paragraphs: [
          "Photo 1 is the headphone listener; Photo 2 is the person who turns and says the line. Use one consenting adult per photo and upload in the intended order.",
          "A clear head-and-shoulders portrait works better than a full-body shot or a group photo. If you only have one good photo, Photo 1 is the required slot."
        ]
      },
      {
        heading: "Checkout and download",
        paragraphs: [
          "Review the one-time price and complete checkout. Generation starts after verified payment and may take time; the queue and provider affect the wait.",
          "When the video is ready, open Generated videos in the same browser and download the MP4 within 30 days. Optional email delivery depends on configuration."
        ],
        steps: [
          "Choose 9:16 before checkout.",
          "Upload Photo 1 for the headphone listener.",
          "Add Photo 2 if you want to cast the person who says the line.",
          "Review the one-time price and complete secure checkout.",
          "Download the finished MP4 within 30 days and add your caption in the platform."
        ]
      },
      {
        heading: "Add your caption",
        paragraphs: [
          "The site does not add a POV caption or post for you. Add your own text in TikTok, Instagram or an editor. Keep the caption honest: it is an AI-generated scene inspired by the meme, not official film footage.",
          "A simple caption such as “POV: you meet someone who loves the Smiths” works because it points to the line without pretending the scene is real."
        ],
        bullets: [
          "Keep the caption short and personal.",
          "Do not claim official affiliation.",
          "Do not present the AI scene as a real event.",
          "Respect the people in the photos and any music rights."
        ]
      },
      {
        heading: "Share responsibly",
        paragraphs: [
          "Personal, non-commercial sharing only. The purchase does not include a commercial-use license or a separate music license.",
          "If a platform flags the audio, do not repost the same track repeatedly. Replace the audio in your editor or share the video privately."
        ],
        links: [{ href: "/blog/i-love-the-smiths-ai-music-and-lyrics", label: "Music and lyrics rights" }]
      }
    ],
    related: ["i-love-the-smiths-ai-video-length-and-format", "download-and-share-i-love-the-smiths-ai-video", "how-to-make-i-love-the-smiths-ai-video"],
    faqs: [
      { question: "Does the site post to TikTok?", answer: "No. You download the MP4 and upload it yourself." },
      { question: "Can I add a POV caption?", answer: "Yes, in your own editor or in the platform. Keep it honest and do not claim the scene is official footage." }
    ]
  },
  {
    slug: "download-and-share-i-love-the-smiths-ai-video",
    title: "Download and share your I Love The Smiths AI video",
    description: "Where completed videos appear, how the 30-day download window works, what optional email delivery does and how to share the MP4 responsibly.",
    answer: "Completed videos appear in Generated videos for the original browser. Download the MP4 within 30 days of completion. Optional email delivery sends a private link when configured. Keep the file yourself; the service is not a permanent archive.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Making & saving", minutes: "5 min read",
    image: "/love-the-smiths/beat-2.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: a sideways glance",
    sections: [
      {
        heading: "Where the video appears",
        paragraphs: [
          "Completed videos appear in the Generated videos area in the original browser. The order is linked to an essential cookie; clearing cookies or switching devices can remove ordinary browser access.",
          "Keep the same browser open through checkout and generation. If you return later, the browser can show the order and the finished video while access is still valid."
        ]
      },
      {
        heading: "The 30-day window",
        paragraphs: [
          "Download your MP4 within 30 days of completion. The service is not a permanent cloud archive, and expired output files are cleaned up.",
          "Download a copy to your own device as soon as the video is ready. Browser history is not a file backup."
        ]
      },
      {
        heading: "Optional email delivery",
        paragraphs: [
          "When email delivery is configured, you can add an address before checkout and receive a private download link when the video is ready. The link still expires, so download promptly.",
          "Anyone with the private link can access the result until the access period ends. Do not forward it publicly."
        ]
      },
      {
        heading: "Sharing the MP4",
        paragraphs: [
          "Share the file or a private link for personal, non-commercial purposes. The purchase does not include a commercial-use license, and the audio is not separately licensed to you.",
          "If you post it, keep the context honest: it is an AI-generated meet-cute inspired by the meme, not official film footage or an endorsement."
        ]
      },
      {
        heading: "If you cannot access the video",
        paragraphs: [
          "If payment succeeded but delivery failed, contact support with your video code and payment reference. Do not pay again while an order is pending.",
          "Verified technical or delivery failures may qualify for redelivery or a discretionary refund. Subjective dissatisfaction after successful delivery does not automatically qualify. Your statutory rights remain unaffected."
        ],
        links: [{ href: "/refund-policy", label: "Read the refund and delivery policy" }]
      }
    ],
    related: ["how-to-make-i-love-the-smiths-ai-video-for-tiktok-reels", "i-love-the-smiths-ai-video-length-and-format", "i-love-the-smiths-ai-photo-privacy-and-consent"],
    faqs: [
      { question: "How long can I download the video?", answer: "Up to 30 days from completion. Download your own copy before the window ends." },
      { question: "Can I recover a video on another device?", answer: "Ordinary access is tied to the original browser and its cookie. Contact support with your video code if you have lost access." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-vs-capcut-template",
    title: "I Love The Smiths AI vs a CapCut template",
    description: "An AI video generator creates new frames from your photos; an editing template edits footage you already have. Compare the workflow, likeness and rights.",
    answer: "A CapCut-style template edits footage or photos you already have. I Love The Smiths AI generates new frames from your two uploaded portraits. The AI result is not a face swap on the original clip; faces, motion and timing can vary.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Questions & answers", minutes: "6 min read",
    image: "/love-the-smiths/comparison-after.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Four reference frames from the demo videos: headphones, glance, line and smile",
    sections: [
      {
        heading: "Two different workflows",
        paragraphs: [
          "An editing template is a set of cuts, text, transitions and timing applied to media you already have. You need usable footage or a photo edit that fits the template.",
          "An AI video generator uses your portraits as references and generates new frames. You do not need existing footage, but you cannot expect frame-accurate control over every movement."
        ]
      },
      {
        heading: "What a CapCut template needs",
        paragraphs: [
          "A template usually needs source footage or photos that match the template’s slots. The result is an edit of that material, not a newly drawn scene.",
          "If the template is based on a copyrighted film clip, using the clip can raise separate copyright and audio questions. A template is not a license to the underlying footage or music."
        ]
      },
      {
        heading: "What the AI generator does",
        paragraphs: [
          "The generator uses Photo 1 for the headphone listener and Photo 2 for the person who says the line. It then creates a new AI-generated version of the elevator meet-cute.",
          "The output is designed around the four beats, but it is not a frame-for-frame recreation. Likeness, clothing, hands and timing can differ. The product is designed around a 24-second template; the current delivered MP4 is 24 seconds until the template update ships. Listed prices are $6.99 for 480p and $9.99 for 720p."
        ]
      },
      {
        heading: "Face swap or new scene?",
        paragraphs: [
          "It is a new scene, not a face swap on the original clip. A face swap typically edits an existing video; this workflow generates new visual material around your photos.",
          "That distinction matters for expectations. You get a personal AI meet-cute, not a shot-for-shot replica of the film."
        ]
      },
      {
        heading: "Which should you choose?",
        paragraphs: [
          "Choose an editing template if you already have footage that fits and you want manual control. Choose the AI generator if you want to start from two portraits and let the template build the scene.",
          "Either way, clear the rights for the footage, music and portraits you use. A purchase does not grant rights to someone else’s film or recording."
        ],
        links: [
          { href: "/blog/how-to-make-i-love-the-smiths-ai-video", label: "How the AI workflow works" },
          { href: "/blog/i-love-the-smiths-ai-music-and-lyrics", label: "Music and lyrics rights" },
          { href: "/#studio", label: "Try the two-photo studio" }
        ]
      }
    ],
    related: ["what-is-the-i-love-the-smiths-meme", "how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-video-generator-explained", "i-love-the-smiths-ai-music-and-lyrics"],
    faqs: [
      { question: "Is this a CapCut template?", answer: "No. This is an independent AI video generator, not a CapCut template." },
      { question: "Does it replace faces in the original clip?", answer: "No. It generates a new scene from your portraits; it is not an edit of the original footage." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-price-and-free-options",
    title: "I Love The Smiths AI price and free options",
    description: "One-time pricing for the two-photo elevator video, what is included, what free guides and illustrations are available, and how delivery works.",
    answer: "One video is listed at $6.99 for 480p or $9.99 for 720p, one-time. There is no subscription or credit pack. Guides and illustrations are free to read; personalized generation is paid. Confirm the final price and availability at checkout.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Questions & answers", minutes: "5 min read",
    image: "/love-the-smiths/beat-3.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Reference frame from the demo video: the line in the elevator",
    sections: [
      {
        heading: "What it costs",
        paragraphs: [
          "The listed prices are $6.99 for Standard 480p and $9.99 for HD 720p. Each successful payment buys one video in the selected format and resolution.",
          "There is no subscription, no stored credit balance and no automatic renewal. Confirm the final amount and any applicable tax on the secure checkout page before paying."
        ],
        table: {
          caption: "Current listed options",
          headers: ["Option", "Resolution", "Price"],
          rows: [
            ["Standard", "480p", "$6.99"],
            ["HD", "720p", "$9.99"],
            ["Vertical frame", "9:16", "Included"],
            ["Widescreen frame", "16:9", "Included"],
            ["Subscription", "None", "None"]
          ]
        }
      },
      {
        heading: "Does the video add a watermark?",
        paragraphs: [
          "The studio does not add its own branding watermark during final audio and video assembly. This does not guarantee that an upstream AI result can never contain a mark or unwanted text.",
          "Check the delivered MP4 before sharing. If you see an unexpected mark, report it with your video code rather than assuming the studio added it."
        ]
      },
      {
        heading: "Can I download the video in HD?",
        paragraphs: [
          "Yes. Choose 720p before checkout for the HD MP4 in your selected 9:16 or 16:9 frame. Standard is 480p. HD adds resolution, not a guarantee of better likeness, expression or timing.",
          "Download the MP4 within 30 days of completion. The service is not a permanent archive, so keep your own copy."
        ]
      },
      {
        heading: "What is included",
        paragraphs: [
          "One two-photo elevator meet-cute order includes the selected resolution, the selected aspect ratio and a private 24-second MP4 delivery. Photo 1 is required; Photo 2 is optional.",
          "A configured reference soundtrack is merged by the pipeline. No separate music license is included, and the original commercial recording should not be assumed."
        ]
      },
      {
        heading: "Is there a free version?",
        paragraphs: [
          "Guides and demo videos on this site are free to view. Personalized generation is paid. There is no free personalized render or free trial in this build.",
          "Other sites may offer credits, free trials or different pricing. Compare the deliverable, format, privacy terms and rights before choosing a tool."
        ]
      },
      {
        heading: "Delivery and refunds",
        paragraphs: [
          "Download access lasts up to 30 days from completion. Optional email delivery is available only when configured.",
          "For a technical or delivery failure, contact support with your video code. We may offer redelivery or a discretionary refund. Subjective dissatisfaction after successful delivery does not automatically qualify; statutory rights remain unaffected."
        ],
        links: [
          { href: "/refund-policy", label: "Refund and delivery policy" },
          { href: "/#studio", label: "Check live availability" }
        ]
      },
      {
        heading: "How to compare without hype",
        paragraphs: [
          "Do not choose a tool based only on a count of happy customers or a claim that it is the cheapest. Check what you actually receive, how long access lasts, whether both photos are used and what rights are included.",
          "This site does not publish measured search-volume or competitor-traffic claims. The guides describe the product and the meme; the checkout shows the current price."
        ]
      }
    ],
    related: ["i-love-the-smiths-ai-video-length-and-format", "how-to-make-i-love-the-smiths-ai-video", "i-love-the-smiths-ai-video-generator-explained"],
    faqs: [
      { question: "Is there a subscription?", answer: "No. Each purchase is one video; there is no subscription or credit pack." },
      { question: "Are the guides free?", answer: "Yes. The guides and illustrations are free; personalized video generation is paid." }
    ]
  },
  {
    slug: "i-love-the-smiths-ai-photo-privacy-and-consent",
    title: "I Love The Smiths AI photo privacy and consent",
    description: "Who can appear in the photos, how portraits and generated videos are stored, the cleanup window and how to make a privacy request.",
    answer: "Upload only consenting adults and only photos you have the right to use. Portraits are stored privately for the order and become eligible for cleanup after generation or input expiry, normally three days after order creation. Finished videos have a separate 30-day download window.",
    date: DATE, publishedAt: UPDATED, updatedAt: UPDATED, category: "Questions & answers", minutes: "6 min read",
    image: "/love-the-smiths/guide-cover-3.webp", imageClass: "", imageBadge: "REFERENCE FRAME",
    imageAlt: "Two reference frames from the demo videos: the second cast",
    sections: [
      {
        heading: "Adults and consent only",
        paragraphs: [
          "Every person in every uploaded photo must be an adult who has agreed to have their likeness used for this purpose. A checkbox or automated screen cannot establish consent for you.",
          "Do not upload children, non-consenting people, or photos you do not have permission to use. If you are unsure, do not upload the photo."
        ]
      },
      {
        heading: "What happens to the portraits",
        paragraphs: [
          "Optimized copies are sent to the AI safety service when selected and stored privately for checkout and paid retries. After verified payment, the images and reference material are sent to the video-generation provider.",
          "Portraits become eligible for cleanup after a completed generation or when the temporary input window expires, normally three days after order creation. Actual removal depends on the cleanup worker; third-party providers may apply their own retention policies."
        ]
      },
      {
        heading: "The generated video",
        paragraphs: [
          "The finished MP4 is stored privately and linked to the original browser. Download access lasts up to 30 days from completion; expired output files are cleaned up.",
          "Optional email delivery, when configured, sends a private link. Anyone with that link can access the result until the access period ends, so keep it private."
        ]
      },
      {
        heading: "Cookies and analytics",
        paragraphs: [
          "An essential cookie connects your orders and videos to the browser. Clearing cookies or switching devices can remove ordinary access to the history.",
          "Optional analytics cookies are disabled until you accept them. Declining analytics does not affect your video order."
        ]
      },
      {
        heading: "Privacy requests",
        paragraphs: [
          "For an access, correction or deletion request, contact support with enough information to locate the order without attaching portraits or payment card details. Support may need to verify your identity first.",
          "Order and payment records may be kept longer for refunds, fraud prevention, accounting or legal requirements. See the Privacy Policy for the full disclosure."
        ],
        links: [
          { href: "/privacy", label: "Read the privacy policy" },
          { href: "/contact", label: "Contact support" },
          { href: "/blog/i-love-the-smiths-ai-photo-tips", label: "Photo tips" }
        ]
      }
    ],
    related: ["i-love-the-smiths-ai-photo-tips", "i-love-the-smiths-ai-two-photo-roles", "download-and-share-i-love-the-smiths-ai-video"],
    faqs: [
      { question: "How long are my photos kept?", answer: "They become eligible for cleanup after generation or input expiry, normally three days after order creation; removal depends on the cleanup worker." },
      { question: "Can I request deletion?", answer: "Yes. Contact support with enough information to locate the order; do not email the portrait itself." }
    ]
  }
];

export const tinyGuides = allTinyGuides;
const featuredGuideSlugs = [
  "what-is-the-i-love-the-smiths-meme",
  "how-to-make-i-love-the-smiths-ai-video",
  "i-love-the-smiths-ai-two-photo-roles",
  "i-love-the-smiths-ai-photo-tips",
  "i-love-the-smiths-ai-vs-capcut-template",
  "i-love-the-smiths-ai-music-and-lyrics",
];
export const featuredTinyGuides = featuredGuideSlugs.map(slug => allTinyGuides.find(guide => guide.slug === slug)!);
