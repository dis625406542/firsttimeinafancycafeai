export type GuideImage = { src: string; alt: string; caption: string; width: number; height: number };
export type GuideSection = { heading: string; paragraphs: string[]; steps?: string[]; bullets?: string[]; table?: { caption: string; headers: string[]; rows: string[][] }; image?: GuideImage; links?: { href: string; label: string }[] };
export type TinyGuide = { slug: string; title: string; description: string; answer: string; date: string; publishedAt: string; updatedAt: string; category: string; minutes: string; image: string; imageClass: string; imageBadge: string; imageAlt: string; sections: GuideSection[]; related: string[]; sources?: { label: string; href: string; note?: string }[]; faqs?: { question: string; answer: string }[] };

export const tinyGuides: TinyGuide[] = [
  {
    slug: "tiny-desk-ai-video-guide",
    title: "How to make a Tiny Desk AI video from your photos",
    description: "Create a 15-second Tiny Desk AI video from 1–5 portraits: choose band roles, format and quality, pay once, then watch and download.",
    date: "October 29, 2026",
    minutes: "2 min read",
    image: "/tiny-band/guides/guide-01.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three tilted stills from the Tiny Desk AI sample band video",
    sections: [
      {
        heading: "Which photos do I need before starting?",
        paragraphs: [
          "Use a clear JPG, PNG or WebP image, up to 10 MB per photo. Each image should show one adult who has agreed to appear. A group photograph is not a shortcut for filling all five roles: choose a separate portrait for each person instead. The dog pictures explain the roles; upload adult portraits, not pets.",
          "One portrait is enough to submit an order. If you want to appear as the singer, select Lead at the top, rather than a backing role. Adding more photos controls more roles, but does not guarantee that every performer is visible in every shot."
        ],
        links: [
          {
            href: "/blog/multiple-photos-tiny-desk-concert-video",
            label: "See the role and upload-order guide"
          }
        ]
      },
      {
        heading: "How do I create a Tiny Desk AI video step by step?",
        image: {
          src: "/tiny-band/guides/steps/studio-mobile.webp",
          alt: "Actual studio upload roles, 480p and 720p options, and vertical or horizontal format controls",
          caption: "Studio interface on a phone, November 4, 2026. The dog reference panels mark upload roles; no customer portraits are shown.",
          width: 344,
          height: 1308
        },
        paragraphs: [
          "Open Tiny Desk AI Videos in your browser. The scene, reference guidance and soundtrack are preset. You choose portraits, band roles, quality and aspect ratio. There is no scene selector or editable prompt field."
        ],
        steps: [
          "Open the studio, select a labeled role and upload a portrait. Wait for its photo check to finish.",
          "Repeat for other roles if wanted, up to five portraits. Check each preview is in the intended position.",
          "Choose Standard 480p ($5.99) or HD 720p ($8.99), then 9:16 vertical or 16:9 horizontal.",
          "Confirm consent and select the generation button. Review the dialog and optionally add a delivery email when offered.",
          "Continue to Stripe checkout and verify the final amount before paying. Return to the same browser.",
          "Wait for the finished video, play it with sound, then Download before the 30-day access window ends."
        ]
      },
      {
        heading: "Will my video match the reference exactly?",
        paragraphs: [
          "No. The Tiny Desk AI Videos reference guides the setting and performance framing, but does not guarantee identical shots. The sample is not footage of your uploaded subjects. AI can alter eyes, expressions, hands or facial details.",
          "The frame below comes from our public dog-band example. Your submitted portraits guide generation, rather than being literally pasted into this still. Exact shot matching and word-by-word lip sync are not guaranteed."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-lead.webp",
          alt: "Dog lead performer in a red cap, seen in close-up",
          caption: "Reference sample at 6.5 seconds, not a customer result. This illustrates framing, not a guaranteed shot or likeness.",
          width: 960,
          height: 1706
        }
      },
      {
        heading: "How do I check progress and save my finished video?",
        paragraphs: [
          "The progress indicator is an estimate while generation and audio composition run. Do not buy a second video just because it pauses. Keep the original browser and its cookies, then return to check the order. When email delivery is enabled and you provide an address, the service attempts to send a link after completion.",
          "Files are stored privately on the server; browser order history is not a downloaded backup. Save the MP4 within 30 days of completion. If an order fails after payment, contact support with the order reference rather than repeatedly paying."
        ],
        links: [
          {
            href: "/blog/download-tiny-desk-ai-video",
            label: "Download, delivery and recovery"
          },
          {
            href: "/blog/tiny-desk-ai-music-lip-sync",
            label: "Understand music and lip-sync limits"
          }
        ]
      }
    ],
    answer: "To make a video with Tiny Desk AI Videos, upload 1–5 portraits of consenting adults. Choose Lead for the singer, then select resolution and aspect ratio before checkout. The result is a 15-second AI band video with a fixed soundtrack. No prompt writing or app installation is needed.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-11-05",
    category: "Getting started",
    related: [
      "multiple-photos-tiny-desk-concert-video",
      "how-to-make-tiny-desk-ai-video-on-phone",
      "download-tiny-desk-ai-video"
    ]
  },
  {
    "slug": "tiny-desk-ai-trend-explained",
    "title": "What is the Tiny Desk AI trend? The Outstanding meme explained",
    "description": "Understand the Outstanding Tiny Desk meme, the original performance, the band roles and how to put yourself in a 15-second version.",
    "answer": "The Tiny Desk AI trend turns a desk-side band performance into a personalized video meme. In the Outstanding version, recognizable faces appear in a concert-style scene associated with Charlie Wilson’s performance of The Gap Band’s “Outstanding.” An AI remake is different from the original NPR Music concert.",
    "date": "November 4, 2026",
    "publishedAt": "2026-10-29",
    "updatedAt": "2026-11-04",
    "category": "Getting started",
    "minutes": "5 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "Tiny Desk, Outstanding and AI: three different things",
        "paragraphs": [
          "Tiny Desk refers to the intimate concert format associated with NPR Music. Outstanding is the song associated with this particular meme. AI describes the method used to reinterpret the performers. Keeping those ideas separate helps you find the original performance instead of mistaking an edited social clip for a real concert.",
          "The name Tiny Desk AI is also used broadly for other concert-style images and videos. A tool using that name does not necessarily use this song, this cast or this camera sequence. Watch its example before paying rather than assuming every Tiny Desk generator makes the same clip."
        ]
      },
      {
        "heading": "What is the All-Loss version?",
        "paragraphs": [
          "All-Loss is a label used for a version of the meme featuring football coaches. It is not the name of the song or a separate NPR concert. If that is the clip you saw, you may be looking for the same musical joke rather than a general-purpose AI concert editor.",
          "This guide does not establish the first uploader or the exact date that version began circulating. We do not offer celebrity or coach impersonations: use yourself and adults who have agreed to appear."
        ],
        "links": [
          {
            "href": "/blog/outstanding-tiny-desk-original-video",
            "label": "Find the original performance, not an AI repost"
          }
        ]
      },
      {
        "heading": "Why the role and close-up matter",
        "paragraphs": [
          "The fun is recognizing a familiar person in a performance. A group shot explains the band, but a close-up gives one face a much stronger presence. That is why choosing the Lead slot matters more than filling every available upload circle.",
          "Our dog reference labels five separate identities: back left, back right, keys, lead and sax. Lead is the singer role; Keys is the front performer in the opening group. You can choose one role or supply up to five portraits. Unfilled roles have no supplied identity, and their appearance may vary."
        ],
        "image": {
          "src": "/tiny-band/guides/steps/reference-lead.webp",
          "alt": "Lead dog in the reference close-up",
          "caption": "Reference sample at 6.5 seconds: an illustration of the Lead role, not a guaranteed generated shot.",
          "width": 960,
          "height": 1706
        }
      },
      {
        "heading": "How to make your own version",
        "paragraphs": [
          "Start with a clear portrait of the person you want to feature. Open the studio and choose Lead for the singer, then optionally add friends to the other labeled positions. You do not need to write a prompt or find five people before trying the tool.",
          "Here the output is a 15-second MP4 with a fixed soundtrack. Choose 480p for $5.99 or 720p for $8.99, and select 9:16 or 16:9 before payment. It is a one-time purchase, not a subscription. The reference guides the scene; exact likeness, framing and word-by-word lip sync are not guaranteed."
        ],
        "links": [
          {
            "href": "/blog/tiny-desk-ai-video-guide",
            "label": "Follow the illustrated creation steps"
          },
          {
            "href": "/#studio",
            "label": "Choose your main character"
          }
        ]
      }
    ],
    "related": [
      "tiny-desk-outstanding",
      "outstanding-tiny-desk-original-video",
      "multiple-photos-tiny-desk-concert-video"
    ],
    "sources": [
      {
        "label": "NPR Music — Charlie Wilson: Tiny Desk Concert",
        "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
        "note": "Original performance reference, not an endorsement of this studio."
      }
    ],
    "faqs": [
      {
        "question": "Is Tiny Desk AI an official NPR tool?",
        "answer": "No. This studio is independent. An AI video is not a real appearance on NPR’s Tiny Desk Concerts."
      },
      {
        "question": "Is All-Loss the song title?",
        "answer": "No. The song associated with the Outstanding meme is “Outstanding.” All-Loss labels a coach-themed version, not the original recording."
      }
    ]
  },
  {
    slug: "tiny-desk-ai-photo-tips",
    title: "Photo tips for a concert-style AI video",
    description: "Tiny Desk AI Videos accepts JPG, PNG and WebP portraits up to 10 MB each. Check lighting, face visibility, cropping and adult consent before uploading.",
    date: "October 29, 2026",
    minutes: "2 min read",
    image: "/tiny-band/guides/guide-03.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Four stills from an NFL-style Tiny Desk sample video",
    sections: [
      {
        heading: "What makes a portrait suitable for the AI video?",
        paragraphs: [
          "Choose a portrait with the face in focus and both eyes visible. Soft, even lighting makes facial features easier to inspect than a strong overhead light or deep shadow. Avoid sunglasses, hands across the face and heavy beauty filters. You do not need a professional headshot; you do need to see the person clearly.",
          "Zoom into the original photo before selecting it. If the face already looks blurry or blocky, try a different source rather than enlarging a tiny screenshot. A larger file does not automatically mean a sharper face."
        ],
        table: {
          caption: "Portrait preparation checklist — recommendations, not a likeness guarantee",
          headers: [
            "Prefer",
            "Avoid",
            "Why it matters"
          ],
          rows: [
            [
              "Open eyes and visible features",
              "Sunglasses or hair across eyes",
              "Facial detail is visible"
            ],
            [
              "Even light",
              "Deep shadow or backlight",
              "Less missing detail"
            ],
            [
              "One adult per image",
              "A group photo",
              "Each upload maps to a role"
            ],
            [
              "Sharp original image",
              "Enlarged blurry screenshot",
              "More pixels cannot restore lost detail"
            ],
            [
              "Head and shoulders with margin",
              "Very tight face crop",
              "Allows room for composition"
            ]
          ]
        }
      },
      {
        heading: "How should I crop the portrait?",
        paragraphs: [
          "A head-and-shoulders or waist-up portrait gives you a useful composition to work from. Leave a small margin above the head and around the shoulders. Avoid cropping through the chin. Keep to one person so there is no ambiguity about who should be the performer."
        ]
      },
      {
        heading: "Which photo formats and file sizes are accepted?",
        paragraphs: [
          "Tiny Desk AI Videos accepts JPG, PNG and WebP files up to 10 MB per photo. If your phone saves another format, export a copy in an accepted format instead of changing the filename extension. Use one unobstructed face against a simple background. These preparation tips are not output guarantees."
        ]
      },
      {
        heading: "Can I upload a photo of someone else?",
        paragraphs: [
          "Only upload your own portrait or a photo of an adult who has agreed to the intended use. Do not use a celebrity, a minor or an unauthorized likeness. Avoid including private information visible in the background.",
          "The studio screens each selected portrait with an automated safety check. At checkout, approved portraits are uploaded and stored privately with the order; they are sent to the video provider only after payment is verified. These tips cannot guarantee exact facial likeness in the result."
        ]
      },
      {
        heading: "Why does my face look different in the result?",
        paragraphs: [
          "A clearer portrait reduces ambiguity but cannot lock every feature across moving frames. The model invents expressions and movement, so eyes, teeth, hands and face shape may change. Do not treat a reference close-up as a promise of identical likeness.",
          "Review the whole video before sharing, not just the poster frame. A higher-resolution purchase alone will not correct identity or expression errors. If the source is blurred or obscured, choose a clearer portrait for a future order."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-lead.webp",
          alt: "Dog lead performer in a red cap, seen in close-up",
          caption: "Reference sample at 6.5 seconds, not a customer result. This illustrates framing, not a guaranteed shot or likeness.",
          width: 960,
          height: 1706
        },
        links: [
          {
            href: "/blog/multiple-photos-tiny-desk-concert-video",
            label: "Match portraits to the right roles"
          }
        ]
      }
    ],
    answer: "Tiny Desk AI Videos accepts JPG, PNG and WebP portraits up to 10 MB per photo. Choose one consenting adult per image, with a sharp face, visible eyes and even lighting. Leave space around the head and shoulders. Clear photos help define the intended person but do not guarantee exact likeness.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-11-05",
    category: "Getting started",
    related: [
      "tiny-desk-ai-video-guide",
      "how-to-create-tiny-desk-ai-concert-from-one-photo",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    slug: "tiny-desk-ai-prompt-ideas",
    title: "Tiny Desk AI prompts: what the fixed template controls",
    description: "Tiny Desk AI Videos supplies a fixed prompt. Choose portraits, roles, quality and format; custom prompts, scenes and songs are not supported.",
    date: "October 29, 2026",
    minutes: "2 min read",
    image: "/tiny-band/guides/guide-04.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three stills of the dog band from the Tiny Desk sample video",
    sections: [
      {
        heading: "Do I need to write a Tiny Desk AI prompt?",
        paragraphs: [
          "No. Tiny Desk AI Videos supplies the scene instructions and reference material. Upload portraits into the labeled roles, choose the supported options and review checkout. The optional email field is for delivery, not scene instructions.",
          "This is a focused video creator rather than a general editor. You cannot direct every cut, select another room, assign custom instruments or replace the soundtrack."
        ],
        table: {
          caption: "Editable choices versus fixed behavior",
          headers: [
            "You choose",
            "The studio fixes"
          ],
          rows: [
            [
              "Portraits and roles",
              "Reference-guided scene prompt"
            ],
            [
              "480p or 720p",
              "15-second duration"
            ],
            [
              "9:16 or 16:9",
              "Included soundtrack"
            ],
            [
              "Optional delivery email",
              "Generation and audio workflow"
            ]
          ]
        }
      },
      {
        heading: "What does a general concert prompt describe?",
        paragraphs: [
          "In an editor that accepts prompts, describe subject, room, performance and camera separately. For example: a fictional adult singer at a microphone in a warm room with bookshelves, a close camera and softly blurred background musicians. Keep identity references separate from scene details when possible.",
          "This is writing guidance, not the production database prompt or an available template here. A descriptive prompt cannot guarantee identity preservation, safe content or audio synchronization."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-lead.webp",
          alt: "Dog lead performer in a red cap, seen in close-up",
          caption: "Reference sample at 6.5 seconds, not a customer result. This illustrates framing, not a guaranteed shot or likeness.",
          width: 960,
          height: 1706
        }
      },
      {
        heading: "Why do close-ups and group shots differ?",
        paragraphs: [
          "A close-up emphasizes the lead while a wider frame shows the band. Asking for everyone to stay large and visible in every shot conflicts with an isolated singer close-up. Establish a clear subject instead of stacking incompatible camera instructions.",
          "The example illustrates a reference close-up, not proof that every generation follows the same camera path. Expect variation in background visibility, expression and depth of field."
        ]
      },
      {
        heading: "What can I improve without editing the prompt?",
        paragraphs: [
          "In Tiny Desk AI Videos, you can improve the input portraits and check the assigned roles before paying. Use clear, separate portraits and select the intended output orientation. The delivery email field cannot change the scene.",
          "If you need a custom shot list, another song, a longer film or exact lip sync, evaluate a tool that explicitly offers those capabilities. This studio focuses on a short, fixed-template concert-inspired clip."
        ],
        links: [
          {
            href: "/blog/tiny-desk-ai-photo-tips",
            label: "Improve your source portraits"
          },
          {
            href: "/blog/tiny-desk-ai-music-lip-sync",
            label: "Understand the audio workflow"
          }
        ]
      }
    ],
    answer: "Tiny Desk AI Videos uses a fixed reference-guided prompt, so you do not need to write one. You choose portraits, band roles, resolution and aspect ratio. There is no editable shot list, song selector or prompt box. The general prompt examples below are educational, not selectable templates.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-11-05",
    category: "Getting started",
    related: [
      "tiny-desk-ai-video-guide",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    slug: "tiny-desk-ai-music-lip-sync",
    title: "Tiny Desk AI music and lip sync: what to check",
    description: "Tiny Desk AI Videos adds a fixed soundtrack to silent AI footage. Learn how delivery works and why exact word-by-word lip sync is not guaranteed.",
    date: "October 29, 2026",
    minutes: "2 min read",
    image: "/tiny-band/guides/guide-05.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Four stills of the human Tiny Desk sample band",
    sections: [
      {
        heading: "Does the video come with music?",
        paragraphs: [
          "The completed MP4 includes a fixed soundtrack. The video-generation request asks for silent footage first; audio is added afterward. The player may start muted, so enable sound before concluding that the finished file has no audio.",
          "You do not need to upload a song, record your voice or use an external editor for the included track. There is no custom song selector, vocal recording field or voice-cloning feature in this studio."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-lead.webp",
          alt: "Dog lead performer in a red cap, seen in close-up",
          caption: "Reference sample at 6.5 seconds, not a customer result. This illustrates framing, not a guaranteed shot or likeness.",
          width: 960,
          height: 1706
        }
      },
      {
        heading: "Why can the mouth and music be out of sync?",
        paragraphs: [
          "Reference-guided instructions can request singing expressions and similar performance timing, but adding audio does not itself align mouth movements to phonemes. Small timing differences are especially noticeable in a close-up. This workflow does not promise word-by-word synchronization.",
          "Changing from 480p to 720p changes output resolution, not the synchronization method. Neither better source portraits nor higher resolution guarantees correct mouth movements, consistent expressions or identical camera cuts."
        ]
      },
      {
        heading: "What should I check before sharing?",
        paragraphs: [
          "Watch with sound, then focus on the mouth, eyes and hands. Check the beginning and ending as well as the lead close-up. Decide whether the result works as a playful AI interpretation rather than presenting it as a real performance."
        ],
        bullets: [
          "Verify audio in the downloaded MP4, not just the browser preview.",
          "Look for timing mismatches and unexpected facial changes.",
          "Label the clip as AI-created where viewers might mistake it for real footage."
        ]
      },
      {
        heading: "Can I choose another song or use it commercially?",
        paragraphs: [
          "This studio uses a fixed track and does not offer soundtrack replacement at checkout. If you need custom music, another duration or precise lip sync, this workflow may not fit your project. Do not assume different tools have the same features.",
          "A purchase is not evidence that third-party music or likeness rights are cleared for every use. Read the terms and ask support about your intended use before commercial publication; this guide makes no blanket licensing claim."
        ],
        links: [
          {
            href: "/terms",
            label: "Terms of service"
          },
          {
            href: "/blog/download-tiny-desk-ai-video",
            label: "Download and playback help"
          }
        ]
      }
    ],
    answer: "Tiny Desk AI Videos delivers a 15-second video with a fixed soundtrack. The service generates silent AI footage, then combines the footage with preset audio. Adding the audio does not align each mouth movement to a syllable. Exact lip sync is not guaranteed, and the service does not clone your voice.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-11-05",
    category: "Getting started",
    related: [
      "tiny-desk-ai-video-guide",
      "how-to-make-tiny-desk-ai-video-with-music",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    slug: "tiny-desk-ai-filter-pricing",
    title: "Tiny Desk AI filter, app or website? Pricing explained",
    description: "Tiny Desk AI Videos costs $5.99 for 480p or $8.99 for 720p per 15-second video. No subscription or credits. The demo is free; personalized generation is paid.",
    date: "October 29, 2026",
    minutes: "2 min read",
    image: "/tiny-band/guides/guide-06.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three stills from an NFL-style Tiny Desk sample video",
    sections: [
      {
        heading: "How much does one Tiny Desk AI video cost?",
        paragraphs: [
          "Tiny Desk AI Videos costs $5.99 for one 480p video or $8.99 for one 720p video. Each payment covers one 15-second render in the selected aspect ratio. There are no subscriptions or credit bundles. Review the final amount at checkout before paying.",
          "Resolution describes the output size; it is not a promise of perfect facial detail or motion."
        ],
        table: {
          caption: "480p vs 720p: resolution, not a different workflow",
          headers: [
            "Option",
            "Listed price",
            "What changes"
          ],
          rows: [
            [
              "Standard 480p",
              "$5.99 per video",
              "Lower output resolution"
            ],
            [
              "HD 720p",
              "$8.99 per video",
              "Higher output resolution"
            ],
            [
              "Both",
              "One-time payment",
              "15 seconds, preset soundtrack, 9:16 or 16:9"
            ]
          ]
        }
      },
      {
        heading: "What can I try for free?",
        paragraphs: [
          "You can read the guides and watch the Tiny Desk AI Videos reference example for free. A personalized 15-second video is a separate paid render. The fixed example shows the intended style, not your uploaded face or a guaranteed result."
        ]
      },
      {
        heading: "Is Tiny Desk AI Videos an app or a social-camera filter?",
        paragraphs: [
          "Tiny Desk AI Videos is a browser-based website, not a downloadable app or an official TikTok or Instagram filter. No app installation is needed. Personalized generation starts through the website’s paid checkout.",
          "A similar trend name does not mean that another app or filter offers the same workflow. Check each tool’s inputs, price and delivery terms before choosing."
        ]
      },
      {
        heading: "How will I receive the video, and how long can I download it?",
        paragraphs: [
          "Return to Tiny Desk AI Videos in the same browser used at checkout, with its order cookies intact. Completed videos are stored privately on the server and remain available for up to 30 days from completion. Download the MP4 rather than relying on browser history as a backup.",
          "Selected portraits are screened and uploaded privately for checkout. Tiny Desk AI Videos sends portraits to the video provider only after payment. When email delivery is enabled, you can optionally provide an address for a private download link. Email delivery does not extend the retention period."
        ]
      }
    ],
    answer: "Tiny Desk AI Videos costs $5.99 per 480p video or $8.99 per 720p video. Each payment covers one 15-second render in your selected aspect ratio. There is no subscription or credit bundle. Watching the example is free; personalized generation is paid. Confirm the final amount at checkout.",
    publishedAt: "2026-10-29",
    updatedAt: "2026-11-05",
    category: "Getting started",
    related: [
      "tiny-desk-ai-video-guide",
      "tiny-desk-ai-video-formats"
    ]
  }
];

export const tinyLandingPages: TinyGuide[] = [
  {
    "slug": "best-tiny-desk-ai-video-generator",
    "title": "Which Tiny Desk AI video generator should you use?",
    "description": "Compare a fixed-template Tiny Desk studio, a reference-driven AI workflow and a video editor before spending money.",
    "answer": "For a one-photo Outstanding-style video with minimal setup, a fixed-template studio is the simplest route. Use a reference-driven generator if you need more control, or an editor if you already have footage. Tiny Desk AI Videos, Higgsfield and CapCut serve different jobs; this is a first-party workflow comparison, not an independent quality ranking.",
    "date": "November 4, 2026",
    "publishedAt": "2026-10-30",
    "updatedAt": "2026-11-04",
    "category": "Questions & answers",
    "minutes": "6 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "Compare the job, not just the tool name",
        "paragraphs": [
          "There are three separate tasks: generating a new performance from portraits, directing a performance using references, and editing an existing video. A tool that is excellent for one task may not handle another. A CapCut edit should not automatically be treated as evidence that five new faces will be generated consistently.",
          "This guide is written by the team behind Tiny Desk AI Videos. Our specifications come from our studio. The other product links are starting points for evaluating their workflows, not claims that we tested equivalent renders or verified a particular Outstanding preset."
        ]
      },
      {
        "heading": "Three routes to a Tiny Desk-style video",
        "paragraphs": [
          "Use this table to decide which workflow to investigate. Third-party prices, model access and exports can change; we deliberately do not present an unverified price or a made-up performance score."
        ],
        "table": {
          "caption": "Workflow comparison — November 4, 2026; third-party renders not independently tested",
          "headers": [
            "Route",
            "Useful when",
            "What you provide",
            "Before paying"
          ],
          "rows": [
            [
              "Tiny Desk AI Videos",
              "A fixed 15-second band template without writing prompts",
              "1–5 adult portraits; role, quality and format choices",
              "$5.99 480p / $8.99 720p; fixed soundtrack; no precise lip-sync guarantee"
            ],
            [
              "Higgsfield / reference-driven AI workflow",
              "Investigating more control over generated movement and shots",
              "Authorized portraits and references, plus setup for the selected model",
              "Check current inputs, duration, sound and price; an identical Tiny Desk result is not verified"
            ],
            [
              "CapCut / editing workflow",
              "You already have a clip to trim, caption or arrange",
              "Existing footage and music you are allowed to use",
              "Editing differs from generating five new identities; check export and paid-feature conditions"
            ]
          ]
        },
        "links": [
          {
            "href": "/blog/multiple-photos-tiny-desk-concert-video",
            "label": "See this studio’s actual role mapping"
          }
        ]
      },
      {
        "heading": "When this studio is the simpler choice",
        "paragraphs": [
          "Choose our fixed template if your goal is to put yourself or consenting friends into a short band video, not design a scene from scratch. Lead is the singer reference; other roles are optional. The output is 15 seconds with a fixed soundtrack, in 9:16 or 16:9.",
          "You do not need an account or a bundle of credits. Choose the one-time resolution price and complete checkout. Keep the original browser to recover the result and download within 30 days. If you need custom music, an editable prompt, a specific motion-control setting or an exact lip-sync guarantee, this studio is not promising those controls."
        ]
      },
      {
        "heading": "How to evaluate a demo fairly",
        "paragraphs": [
          "Look at whether the example is a real output or just a reference. Check face consistency, eyes, hands, cut timing and mouth movements with sound enabled. Ask whether the shown settings match the tier you intend to purchase; higher resolution alone does not prove better lip sync.",
          "Do not spend money merely because a page calls itself the best. First verify portrait consent, the output specification, total charge, delivery and failure policy. If you test multiple tools, use authorized inputs and comparable settings, and judge the downloaded file rather than only a polished marketing reel."
        ],
        "bullets": [
          "Need a simple personalized template? Start with the studio demo.",
          "Need custom shots or references? Evaluate a generator workflow.",
          "Already have footage? An editor may be sufficient.",
          "Need a specific song or public posting rights? Resolve that before buying."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Watch the demo and choose a role"
          },
          {
            "href": "/refund-policy",
            "label": "Read our delivery and refund policy"
          }
        ]
      }
    ],
    "related": [
      "tiny-desk-ai-video-guide",
      "tiny-desk-outstanding",
      "tiny-desk-ai-video-formats"
    ],
    "sources": [
      {
        "label": "Higgsfield — official product site",
        "href": "https://higgsfield.ai/",
        "note": "Explore reference-driven generation options; a specific Tiny Desk preset, price or result is not verified here."
      },
      {
        "label": "CapCut — online video editor",
        "href": "https://www.capcut.com/tools/online-video-editor",
        "note": "Product reference, not a hands-on test of an Outstanding template. Check current export and plan conditions."
      }
    ],
    "faqs": [
      {
        "question": "Is this an independent ranking?",
        "answer": "No. It is published by Tiny Desk AI Videos. We compare workflows, disclose our own product and do not claim to have benchmarked third-party generation quality."
      },
      {
        "question": "Will an editor automatically recreate the band with five new faces?",
        "answer": "Do not assume that. Editing footage and generating consistent identities are different tasks; check the specific feature before paying."
      }
    ]
  },
  {
    slug: "put-yourself-in-the-tiny-desk-meme",
    title: "How can I put myself into the Tiny Desk meme?",
    description: "Choose an adult portrait, pick a band role, pay once and get a 15-second Tiny Desk AI video in your browser. No account needed.",
    date: "October 30, 2026",
    minutes: "3 min read",
    image: "/tiny-band/guides/guide-02.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three stills of the dog band from the Tiny Desk sample video",
    sections: [
      {
        heading: "Which photo should I use to put myself in the meme?",
        paragraphs: [
          "Use a clear, well-lit photo of yourself or an adult who has agreed to appear. One person per photo, with the face visible and some room around the head and shoulders. JPG, PNG and WebP files up to 10 MB are accepted. Avoid group shots, heavy filters and photos of people who have not consented."
        ]
      },
      {
        heading: "Which upload role makes me the lead singer?",
        paragraphs: [
          "Choose Lead in Tiny Desk AI Videos for the singer’s close-up. Keys is the front performer in the opening group, not a promise of a keyboard shot. Back left, Back right and Sax are the other roles. Upload 1–5 portraits; unfilled roles have no guaranteed identity. At a given resolution, the price does not change with the number of portraits."
        ]
      },
      {
        heading: "What do I select before paying?",
        paragraphs: [
          "Select 480p at $5.99 or 720p at $8.99, then choose 9:16 or 16:9 before checkout. Once payment is verified, Tiny Desk AI Videos generates a 15-second video with a fixed soundtrack. Return in the same browser with its cookies intact to watch and download the result. Access lasts up to 30 days from completion. The optional email field appears only when delivery is enabled."
        ]
      },
      {
        heading: "Is the result a real concert performance?",
        paragraphs: [
          "The output is an AI-created, unofficial interpretation, not a real concert appearance and not affiliated with NPR or Tiny Desk Concerts. Exact facial likeness, mouth synchronization and motion can vary between generations."
        ]
      }
    ],
    answer: "To put yourself in the Tiny Desk AI meme, open Tiny Desk AI Videos and upload your portrait to Lead for the singer role. One photo is enough. You can optionally add portraits of consenting adults to the other roles. Choose quality and format before paying for a 15-second video with a fixed scene and soundtrack.",
    publishedAt: "2026-10-30",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    related: [
      "tiny-desk-ai-video-guide",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    slug: "outstanding-meme-with-friends",
    title: "What AI tool lets me make the Outstanding meme with my friends?",
    description: "The Outstanding Tiny Desk meme with friends: upload one to five adult portraits, assign band roles and generate a 15-second clip for one price.",
    date: "October 30, 2026",
    minutes: "3 min read",
    image: "/tiny-band/guides/guide-04.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three stills of the dog band from the Tiny Desk sample video",
    sections: [
      {
        heading: "What the Outstanding Tiny Desk meme is",
        paragraphs: [
          "If you are searching for an Outstanding-style Tiny Desk video with friends, this studio offers a short concert-inspired band template. Portraits guide the performers. It is not a custom dance editor, an official music video or a documented history of the meme."
        ]
      },
      {
        heading: "Use your friends’ portraits safely",
        paragraphs: [
          "Every identifiable person must be an adult who has agreed to appear. Ask before uploading a friend’s photo, avoid celebrities and minors, and do not use images from social media without permission. The studio runs an automated safety check, but it cannot verify consent or identity for you."
        ]
      },
      {
        heading: "How the group version works here",
        paragraphs: [
          "Upload one to five portraits and assign each to a band role. A group order still produces one 15-second Tiny Desk AI video and costs the same one-time price: $5.99 for 480p or $8.99 for 720p. Choose 9:16 for sharing or 16:9 for a wider frame, then pay through Stripe and wait for the result in this browser."
        ]
      },
      {
        heading: "What to expect from the result",
        paragraphs: [
          "The soundtrack and prompt are fixed. Silent footage is generated first and the preset audio is added afterwards; you cannot select a different song or ask the model to sing your words. Exact lip sync is not guaranteed. This unofficial AI-created scene is not a real event, and a purchase does not grant blanket music rights."
        ],
        links: [{ href: "/blog/how-to-make-the-outstanding-meme", label: "See the complete upload and checkout steps" }]
      }
    ],
    answer: "To make an Outstanding-inspired band clip with friends, upload up to five separate portraits to Tiny Desk AI Videos. Each pictured adult must consent. Choose Lead for the singer and use the other labeled roles for friends. Select quality and format before checkout. The result is AI-generated, not a real performance or a guarantee of exact likeness.",
    publishedAt: "2026-10-30",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    related: [
      "how-to-make-the-outstanding-meme",
      "outstanding-meme-ai",
      "tiny-desk-ai-video-guide"
    ]
  },
  {
    "slug": "multiple-photos-tiny-desk-concert-video",
    "title": "Which photo goes in each Tiny Desk AI band role?",
    "description": "Lead, Keys, Sax and the two backing performers explained with dog-reference frames. Start with one face and add friends optionally.",
    "answer": "In Tiny Desk AI Videos, choose Lead for the singer’s close-up. Keys is the front performer in the opening group, not the Lead. Back left and Back right are supporting positions; Sax is a separate role. Lead is displayed first, but the fixed submission order remains Back left, Back right, Keys, Lead, Sax.",
    "date": "November 4, 2026",
    "publishedAt": "2026-10-30",
    "updatedAt": "2026-11-05",
    "category": "Making & saving",
    "minutes": "5 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "One photo is enough: start with the person you want to feature",
        "paragraphs": [
          "You do not need five people to begin. Pick one clear adult portrait, choose the Lead circle for the singer role, and leave other roles empty if you prefer. The dog pictures are role references, not the subjects you must upload.",
          "Adding friends does not change the listed resolution price. If a role is empty, no identity photo is supplied for it; do not expect that position to preserve a specific dog, person or celebrity from a reference."
        ]
      },
      {
        "heading": "The five fixed roles",
        "paragraphs": [
          "Use the labels rather than assuming the first visible card is provider slot one. We highlight Lead in the interface while retaining the original role mapping used by the generation template."
        ],
        "table": {
          "caption": "Role mapping — display priority does not change the submitted identity order",
          "headers": [
            "Fixed slot",
            "Label",
            "Reference position / intended role"
          ],
          "rows": [
            [
              "1",
              "Back left",
              "One supporting performer in the opening group"
            ],
            [
              "2",
              "Back right",
              "The other supporting performer in the opening group"
            ],
            [
              "3",
              "Keys",
              "Front performer in the opening group; distinct from Lead"
            ],
            [
              "4",
              "Lead",
              "Main singer, illustrated by the close-up dog reference"
            ],
            [
              "5",
              "Sax",
              "Saxophone performer, a separate identity"
            ]
          ]
        },
        "image": {
          "src": "/tiny-band/guides/steps/reference-band.webp",
          "alt": "Dog-band opening reference showing three performers",
          "caption": "Reference opening frame. It shows the group positions, not five guaranteed faces in every shot.",
          "width": 960,
          "height": 1706
        }
      },
      {
        "heading": "Lead is not the front performer in the opening frame",
        "paragraphs": [
          "If you want your face to be the singer, upload into Lead, not Keys. The Lead reference shows a closer framing than the opening group. A larger portrait view explains the role, but is not a promise that every generated cut will be identical.",
          "Facial features, gaze, expressions, hands and background people can vary. Choose well-lit portraits with visible eyes. We request the reference-guided performance, but cannot guarantee that another person will never appear in the background or that every sung word matches the mouth."
        ],
        "image": {
          "src": "/tiny-band/guides/steps/reference-lead.webp",
          "alt": "Close-up dog reference for Lead",
          "caption": "Reference sample at 6.5 seconds. This frame identifies the intended Lead role.",
          "width": 960,
          "height": 1706
        }
      },
      {
        "heading": "Review your lineup before checkout",
        "paragraphs": [
          "Open the optional friends section to check any extra uploads. Each role should have one separate portrait, not a group photo. Replace a mistaken upload in its own circle and wait for the photo check to finish.",
          "Choose 480p or 720p and a vertical or horizontal frame, then confirm consent. The same labeled roles are submitted regardless of display order. A completed MP4 includes the fixed soundtrack; download in the original browser within 30 days."
        ],
        "steps": [
          "Add the main portrait to Lead, or choose another role intentionally.",
          "Optionally add up to four friends to the other labeled slots.",
          "Check the previews and finish each photo check.",
          "Select quality and format, review consent and the one-time price."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Choose your band"
          },
          {
            "href": "/blog/tiny-desk-ai-photo-tips",
            "label": "Prepare clear portraits"
          }
        ]
      }
    ],
    "related": [
      "tiny-desk-ai-video-guide",
      "how-to-create-tiny-desk-ai-concert-from-one-photo",
      "tiny-desk-outstanding"
    ],
    "faqs": [
      {
        "question": "Does moving Lead to the top change generation order?",
        "answer": "No. Lead remains the fourth fixed identity slot. The display prioritizes the main character without remapping the provider roles."
      },
      {
        "question": "Do I have to upload all five photos?",
        "answer": "No. Choose one to five roles, at the same listed price for the selected resolution."
      }
    ]
  },
  {
    slug: "free-tiny-desk-ai-video-generator",
    title: "Is there a free Tiny Desk AI video generator?",
    description: "Tiny Desk AI Videos offers a free demo, not free personalized renders. One 15-second video costs $5.99 at 480p or $8.99 at 720p, with no subscription.",
    date: "October 30, 2026",
    minutes: "3 min read",
    image: "/tiny-band/guides/guide-03.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Four stills from an NFL-style Tiny Desk sample video",
    sections: [
      {
        heading: "What is free on this site",
        paragraphs: [
          "You can browse the studio, watch the reference sample video and check pricing without paying. The sample is a fixed reference, not a generated result. Rendering a personal 15-second video requires a paid order because generation and composition use paid infrastructure."
        ]
      },
      {
        heading: "Why generation is paid",
        paragraphs: [
          "A single video costs $5.99 at 480p or $8.99 at 720p, charged once through Stripe. There are no credits, subscription renewals or hidden top-ups. If generation fails definitively, the order can be retried without paying again."
        ]
      },
      {
        heading: "Watch for “free” tools",
        paragraphs: [
          "When evaluating a free offer, check whether it limits clip length, adds a watermark, requires an account or restricts downloads. Read the privacy and photo-use terms before uploading. This guide does not audit or rank other services."
        ]
      },
      {
        heading: "When paying once makes sense",
        paragraphs: [
          "If you want a clean 15-second Tiny Desk AI video with your own portraits, one-time pricing is simpler than managing credits. Compare the delivered file, not just the landing page. Here, videos are stored privately on the server and accessible for up to 30 days from completion. The original browser cookie restores the order history; it is not a backup of the MP4. Download promptly."
        ]
      }
    ],
    answer: "Tiny Desk AI Videos does not offer a free personalized render. The guides and example video are free to view. Generating one 15-second video costs $5.99 for 480p or $8.99 for 720p. No account, subscription or credit bundle is required. Check the final price before paying.",
    publishedAt: "2026-10-30",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    related: [
      "tiny-desk-ai-video-guide",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    slug: "easiest-tiny-desk-ai-meme-website",
    title: "What's the easiest website to make a Tiny Desk AI meme?",
    description: "Use Tiny Desk AI Videos in a browser: upload 1–5 adult portraits, choose a format and pay once. A fixed-template walkthrough, not an independent ranking.",
    date: "October 30, 2026",
    minutes: "3 min read",
    image: "/tiny-band/guides/guide-06.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Three stills from an NFL-style Tiny Desk sample video",
    sections: [
      {
        heading: "What makes a Tiny Desk AI meme site easy",
        paragraphs: [
          "Easy means no app install, no account and no prompt engineering. You should see the band roles, the price and the output format before you pay. A fixed-template site removes editing choices, but it cannot offer the same customization as an editor."
        ]
      },
      {
        heading: "Three steps in this studio",
        paragraphs: [
          "Upload one to five adult portraits into the labeled band spots. Choose 480p at $5.99 or 720p at $8.99 and pick 9:16 or 16:9. Pay once through Stripe, then wait for the 15-second video to appear in this browser."
        ]
      },
      {
        heading: "Works on phone and desktop",
        paragraphs: [
          "The mobile studio uses labeled hotspots over the dog reference panels; tap a role to open the photo picker. Review the confirmation dialog before checkout. Keep the same browser and cookies if you want to see the result later; switching devices can remove access to the order."
        ]
      },
      {
        heading: "Try it with one portrait first",
        paragraphs: [
          "If you are unsure about likeness or framing, start with one portrait and the lowest price. Review the result before ordering a larger lineup. The studio is an independent, unofficial take on the trend and cannot guarantee a perfect likeness or real concert footage."
        ]
      }
    ],
    answer: "For an Outstanding-style video without prompt editing, Tiny Desk AI Videos offers a fixed-template browser workflow. Upload 1–5 portraits of consenting adults, choose quality and format, then pay once. No app installation is needed. This workflow suits the preset scene, not custom songs or shot lists. Exact likeness and lip sync are not guaranteed.",
    publishedAt: "2026-10-30",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    related: [
      "tiny-desk-ai-video-guide",
      "tiny-desk-ai-video-formats"
    ]
  },
  {
    "slug": "tiny-desk-outstanding",
    "title": "Tiny Desk Outstanding: the song, the original and your AI version",
    "description": "Find the Outstanding performance, understand the meme and choose the right role for a personalized Tiny Desk AI video.",
    "answer": "Outstanding is a song by The Gap Band, associated with lead singer Charlie Wilson. His NPR Music Tiny Desk performance is the original concert reference to look for. The AI meme reimagines the performers; this studio lets you create a separate 15-second version from one to five adult portraits.",
    "date": "November 4, 2026",
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-11-04",
    "category": "Questions & answers",
    "minutes": "5 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "What song is the Outstanding Tiny Desk meme using?",
        "paragraphs": [
          "The title to search is “Outstanding” by The Gap Band. Charlie Wilson, the band’s lead singer, also performs it live, including in his Tiny Desk concert. A live performance and a studio recording are different versions of the same song; a social edit may use only an excerpt or change its speed.",
          "If you are trying to identify a particular repost, compare its audio with the original performance rather than assuming every Outstanding video uses an identical recording. We link to the performance below instead of reproducing lyrics or redistributing the full concert."
        ],
        "links": [
          {
            "href": "/blog/what-song-is-in-the-tiny-desk-ai-meme",
            "label": "Song, recording and soundtrack questions"
          }
        ]
      },
      {
        "heading": "Where is the original video?",
        "paragraphs": [
          "Look for “Charlie Wilson: Tiny Desk Concert” on NPR Music’s official YouTube channel. The original is a live concert, not a video of your friends, a dog band or a group of football coaches. Those are different remakes and edits.",
          "Watch the official source to understand the music and performance, then use a tool’s own demo to evaluate its AI template. A similar backdrop or the same song title does not establish that an AI output is official or endorsed."
        ],
        "links": [
          {
            "href": "/blog/outstanding-tiny-desk-original-video",
            "label": "Original performance versus AI versions"
          }
        ]
      },
      {
        "heading": "Which face should I upload first?",
        "paragraphs": [
          "For the singer’s close-up, choose Lead. The studio highlights that dog reference first. The other four positions are optional: back left, back right, keys and sax. Each supplied image should show one adult who has agreed to be included.",
          "Do not put the intended singer into Keys just because that performer appears at the front of the opening group. The role labels, not the visual position of an upload card, determine the identity reference sent with your order."
        ],
        "image": {
          "src": "/tiny-band/guides/steps/reference-lead.webp",
          "alt": "Dog reference for the Lead singer",
          "caption": "Reference Lead close-up. Upload your portrait into the Lead role; the dog is a positional guide.",
          "width": 960,
          "height": 1706
        }
      },
      {
        "heading": "What do I get here, and how much does it cost?",
        "paragraphs": [
          "You receive a generated 15-second MP4 with the fixed soundtrack. Choose 480p at $5.99 or 720p at $8.99 and either 9:16 or 16:9. One portrait and five portraits have the same listed price. No account, credit bundle or custom prompt is needed.",
          "Preview the example with sound before ordering. This is not a custom song service or voice clone. Singing movement is requested, but exact mouth-to-word alignment and identical cuts are not guaranteed. Download in the original browser within 30 days; buying a render does not grant blanket rights to third-party music."
        ],
        "steps": [
          "Choose Lead for the main singer, then add any consenting friends.",
          "Pick resolution and frame shape; check the one-time total.",
          "Complete checkout and return to this browser to follow progress.",
          "Play the result with sound and download your MP4."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Outstanding-inspired video"
          },
          {
            "href": "/blog/tiny-desk-ai-music-lip-sync",
            "label": "What music and lip sync mean for your result"
          }
        ]
      }
    ],
    "related": [
      "how-to-make-the-outstanding-meme",
      "tiny-desk-ai-trend-explained",
      "what-song-is-in-the-tiny-desk-ai-meme",
      "multiple-photos-tiny-desk-concert-video"
    ],
    "sources": [
      {
        "label": "NPR Music — Charlie Wilson: Tiny Desk Concert",
        "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
        "note": "Original performance reference, not an endorsement of this studio."
      }
    ],
    "faqs": [
      {
        "question": "Can I use just one portrait?",
        "answer": "Yes. Choose Lead if you want that person in the singer role. Adding up to four friends is optional and does not change the listed price."
      },
      {
        "question": "Does buying a video include a new Charlie Wilson recording?",
        "answer": "No. The result uses a fixed soundtrack, not a new performance by the artist, voice cloning or an official endorsement."
      }
    ]
  }
];

export const tinyWorkflowGuides: TinyGuide[] = [
  {
    slug: "how-to-make-tiny-desk-ai-video-on-phone",
    title: "How to make a Tiny Desk AI video on your phone",
    description: "A mobile walkthrough: upload a portrait, choose the band role, review checkout, return to the studio and save the MP4.",
    answer: "Open tinydeskaivideos.com in your phone browser to use Tiny Desk AI Videos without installing an app. Upload 1–5 portraits of consenting adults and choose the band roles. Select quality and aspect ratio before checkout. Keep the same browser and its cookies to watch and download the 15-second result. Download access lasts up to 30 days from completion.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/steps/reference-band.webp",
    imageClass: "",
    imageBadge: "REFERENCE GUIDE",
    imageAlt: "Illustrative frame from the public dog-band reference video",
    sections: [
      {
        heading: "Start in a browser you can return to",
        paragraphs: [
          "Use a regular browser tab whose cookies you intend to keep. If you arrived through an in-app browser, consider opening the site in your usual browser before uploading or paying. Orders are associated with the original browser; changing browsers after payment can hide that history.",
          "This is a website, not an app-store download or social-camera filter. Do not install another application or pay another service simply to follow these steps."
        ]
      },
      {
        heading: "Choose the person and the band role",
        paragraphs: [
          "Tap the intended role in the studio. Your phone opens its photo or file picker; system labels depend on the device. Choose one clear adult portrait and wait for its photo check. Select Lead at the top for the singer.",
          "Repeat for other roles if wanted. A group picture cannot automatically fill the band. JPG, PNG and WebP are accepted, up to 10 MB each. If a phone photo uses another format, export a supported copy first."
        ],
        links: [
          {
            href: "/blog/multiple-photos-tiny-desk-concert-video",
            label: "View all five upload roles"
          },
          {
            href: "/blog/tiny-desk-ai-photo-tips",
            label: "Choose a suitable portrait"
          }
        ]
      },
      {
        heading: "Review the options before checkout",
        image: {
          src: "/tiny-band/guides/steps/studio-mobile.webp",
          alt: "Mobile studio showing five labeled upload roles, quality, format and the permission checkbox",
          caption: "Actual studio interface, captured November 4, 2026 with no portraits uploaded. Dog images are role references, not completed customer videos.",
          width: 344,
          height: 1308
        },
        paragraphs: [
          "Vertical 9:16 gives a tall frame; horizontal 16:9 gives a wide frame. These are generation choices, not a switch you apply to a completed order. Standard is listed at $5.99 and HD at $8.99; verify the final amount at checkout."
        ],
        steps: [
          "Check portrait previews, resolution and aspect ratio.",
          "Confirm permission to use the portraits.",
          "Open the confirmation dialog and optionally enter an email when offered for the finished link.",
          "Continue to checkout, review the amount and pay.",
          "Return to the same browser; do not submit another paid order while the first is running."
        ]
      },
      {
        heading: "Watch and save the result",
        paragraphs: [
          "When the completed video appears, tap to play and enable sound if muted. Use Download to save the MP4. Save/share controls and file locations depend on your phone; check browser downloads rather than assuming the video is already in your photo library.",
          "Open the saved file once to verify playback. Private browsing, cleared cookies or another browser can lose access to your order history. Server download access lasts up to 30 days from completion."
        ],
        links: [
          {
            href: "/blog/download-tiny-desk-ai-video",
            label: "Download and recovery troubleshooting"
          }
        ]
      },
      {
        heading: "What the example frame means",
        paragraphs: [
          "This still comes from the public reference video, not from your phone or a video made with your portrait. It illustrates the band look only; framing, faces and timing can vary in generated output."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-band.webp",
          alt: "Opening dog-band composition from the public reference sample",
          caption: "Reference example at 0.8 seconds, not a customer result or a mobile-interface screenshot.",
          width: 960,
          height: 1706
        }
      }
    ],
    related: [
      "tiny-desk-ai-video-guide",
      "multiple-photos-tiny-desk-concert-video"
    ]
  },
  {
    slug: "download-tiny-desk-ai-video",
    title: "How to download and find your Tiny Desk AI video after payment",
    description: "Download your Tiny Desk AI Videos MP4 in the checkout browser with its cookies intact. Access lasts up to 30 days from completion; save a local copy.",
    answer: "Open Tiny Desk AI Videos in the same browser used at checkout, with its order cookies intact. Select your completed video in the generated-video history and choose Download. Files are stored privately on the server, not as a permanent browser backup. Download access lasts up to 30 days from completion. Save the MP4 to keep your own copy.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/steps/reference-lead.webp",
    imageClass: "",
    imageBadge: "REFERENCE GUIDE",
    imageAlt: "Illustrative frame from the public dog-band reference video",
    sections: [
      {
        heading: "Where is my video after payment?",
        paragraphs: [
          "Payment starts preparation and generation; it does not mean the finished file already exists. The progress indicator estimates activity while footage is generated and combined with a fixed soundtrack. It does not measure every processing step live.",
          "Revisit the studio in the browser used for checkout. The generated-video list is associated with its order cookie. A blank history on another device does not prove payment or generation failed."
        ]
      },
      {
        heading: "How to download the finished MP4",
        paragraphs: [
          "In the Tiny Desk AI Videos generated-video list, select your completed clip and choose Download. Check that the player shows your result, not the reference example. Download access lasts up to 30 days from completion; save the MP4 to your device before access expires."
        ],
        steps: [
          "Return to the studio in the original browser and find the completed order.",
          "Select the finished video to play it.",
          "Enable audio if needed, then use Download.",
          "Find the MP4 in your device downloads and verify picture and sound.",
          "Keep a backup before the 30-day server access period ends."
        ]
      },
      {
        heading: "What if I closed the page or cleared cookies?",
        paragraphs: [
          "Closing or refreshing a normal tab is different from clearing site cookies. With the order cookie intact, returning in the same browser can restore access. Clearing cookies, ending a private session or switching devices can remove that browser association.",
          "The browser does not keep a permanent local copy. Download the actual MP4. If access is lost, contact support with your order reference and checkout details; do not publish private links or pay again just to recover an existing order."
        ],
        links: [
          {
            href: "/contact",
            label: "Contact support"
          },
          {
            href: "/privacy",
            label: "Privacy and retention"
          }
        ]
      },
      {
        heading: "Will the video also arrive by email?",
        paragraphs: [
          "When enabled, email delivery is optional in the pre-checkout confirmation dialog. If offered and supplied, the service attempts to send a private link after the finished video is ready. A payment receipt is not necessarily a video-delivery message.",
          "Check the address and spam folder if the expected message is missing. Browser delivery is the first place to check; an absent email alone does not mean no video was generated. Keep delivery links private and do not assume they extend retention."
        ]
      },
      {
        heading: "What if progress stops or the player has no sound?",
        paragraphs: [
          "An estimated progress bar may pause while processing continues. Check status in the original browser rather than placing another order. If the page reports failure or a completed file cannot play, contact support and describe the problem.",
          "The preview can start muted. Enable sound or try the downloaded file before reporting missing audio. Expired or deleted files are not guaranteed recoverable."
        ],
        links: [
          {
            href: "/blog/tiny-desk-ai-music-lip-sync",
            label: "Audio and lip-sync explanations"
          },
          {
            href: "/refund-policy",
            label: "Failure and delivery policy"
          }
        ]
      }
    ],
    related: [
      "tiny-desk-ai-video-guide",
      "multiple-photos-tiny-desk-concert-video"
    ]
  },
  {
    slug: "tiny-desk-ai-video-formats",
    title: "Tiny Desk AI video formats: 9:16 vs 16:9",
    description: "Choose vertical or horizontal framing and 480p or 720p before checkout. Understand what changes and what is not guaranteed.",
    answer: "Tiny Desk AI Videos offers 9:16 for a tall frame or 16:9 for a wide frame. Choose one before checkout; one payment does not include both formats. Each render is 15 seconds with a fixed soundtrack. Aspect ratio controls frame shape, while 480p or 720p controls resolution. Neither setting guarantees better likeness or lip sync.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/steps/reference-sax.webp",
    imageClass: "",
    imageBadge: "REFERENCE GUIDE",
    imageAlt: "Illustrative frame from the public dog-band reference video",
    sections: [
      {
        heading: "What is the difference between 9:16 and 16:9?",
        paragraphs: [
          "Aspect ratio describes frame shape, not performer count or duration. A tall frame emphasizes height while a wide frame provides horizontal room. The model still arranges the shot; selecting wide does not guarantee all five people remain visible."
        ],
        table: {
          caption: "Choose the frame shape for your presentation",
          headers: [
            "Choice",
            "Shape",
            "Consideration"
          ],
          rows: [
            [
              "9:16",
              "Vertical / tall",
              "Portrait-shaped presentation"
            ],
            [
              "16:9",
              "Horizontal / wide",
              "Landscape-shaped presentation"
            ],
            [
              "Both",
              "15-second MP4",
              "Select before checkout; framing may vary"
            ]
          ]
        }
      },
      {
        heading: "Does changing the format simply crop the demo?",
        paragraphs: [
          "No. Aspect ratio is sent as a generation option. The service does not promise two crops of an identical master video. Requesting another format means a separate generation and can produce different motion, expression and composition.",
          "The frame below illustrates the reference’s tall composition, not a verified horizontal output. We do not show an invented before-and-after comparison or claim that cropping predicts the model’s result."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-sax.webp",
          alt: "Late frame from the vertical dog-band reference",
          caption: "Reference example at 12 seconds. This is not a 16:9 result or a guarantee of generated composition.",
          width: 960,
          height: 1706
        }
      },
      {
        heading: "Should I choose 480p or 720p?",
        paragraphs: [
          "Standard 480p is listed at $5.99 per video; HD 720p is $8.99. Higher resolution gives a larger output, not another song, longer duration or a guarantee of facial accuracy. Verify availability and final price before paying.",
          "If the source face is blurred or covered, choose a better portrait rather than relying on HD to reconstruct it perfectly. Lip-sync timing and identity errors are separate from resolution."
        ],
        links: [
          {
            href: "/blog/tiny-desk-ai-photo-tips",
            label: "Prepare clear portraits"
          },
          {
            href: "/blog/tiny-desk-ai-filter-pricing",
            label: "Compare prices"
          }
        ]
      },
      {
        heading: "Can I change the format after payment?",
        paragraphs: [
          "Treat resolution and aspect ratio as part of the paid order. There is no post-purchase format switch that regenerates it for free. Review both fields in the confirmation dialog.",
          "Cropping a finished file in another editor is a separate workflow. It can cut off performers and cannot reveal image content that was never present in the original frame."
        ]
      },
      {
        heading: "Before posting or sharing",
        paragraphs: [
          "Download and watch the full MP4 with sound. Check for unexpected facial or hand details. Identify it as AI-created where viewers might otherwise mistake it for a real concert appearance.",
          "Check the destination’s current upload requirements and your rights to the audio and likenesses. This guide does not promise platform acceptance, reach or commercial-use permission."
        ],
        links: [
          {
            href: "/blog/download-tiny-desk-ai-video",
            label: "Save and verify the MP4"
          },
          {
            href: "/blog/tiny-desk-ai-music-lip-sync",
            label: "Understand the soundtrack"
          }
        ]
      }
    ],
    related: [
      "tiny-desk-ai-video-guide",
      "how-to-make-tiny-desk-ai-video-for-instagram-and-youtube",
      "multiple-photos-tiny-desk-concert-video"
    ]
  }
];

// Search-intent companions to the broader Outstanding/friends guides. Keep these separate:
// one is an actionable recipe, the other explains what the AI template actually does.
export const outstandingMemeGuides: TinyGuide[] = [
  {
    slug: "how-to-make-the-outstanding-meme",
    title: "How to Make the Outstanding Meme with AI: Step-by-Step",
    description: "How to make the Outstanding meme: pick consenting adult portraits, assign the singer, choose quality and format, then download a 15-second AI band video.",
    answer: "To make an Outstanding-inspired meme with Tiny Desk AI Videos, upload 1–5 separate portraits of consenting adults. Put the singer in the Lead slot at the top. Choose 9:16 or 16:9 and 480p or 720p, then review the one-time price before checkout. Download the completed 15-second MP4. This is an unofficial AI interpretation, not an edit of the original performance.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/guide-04.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Dog-band example frames illustrating the Outstanding-inspired AI concert meme",
    sections: [
      {
        heading: "What do I need to make this meme?",
        paragraphs: [
          "Prepare one to five separate, well-lit JPG, PNG or WebP portraits, up to 10 MB each. Use images only of adults who agreed to appear. A group photo cannot fill five upload positions, and the dogs in the example are role markers, not recommended upload subjects.",
          "This walkthrough is for making an original 15-second AI band clip with our preset scene and soundtrack. It does not show you how to edit or repost someone else's concert recording."
        ],
        links: [{ href: "/blog/tiny-desk-ai-photo-tips", label: "Choose photos that work in the generator" }]
      },
      {
        heading: "How to make the Outstanding meme, step by step",
        paragraphs: ["Open the studio on this site and follow the labeled upload positions. The controls shown below are the actual mobile studio; the reference dogs only explain who occupies each slot."],
        image: {
          src: "/tiny-band/guides/steps/studio-mobile.webp",
          alt: "Tiny Desk AI studio showing upload slots and video quality and aspect-ratio controls",
          caption: "Actual mobile studio interface, November 4, 2026. Dog portraits mark roles, not finished customer videos.",
          width: 344, height: 1308
        },
        steps: [
          "Choose the first labeled role and upload a consenting adult's individual portrait; wait for its photo check.",
          "Add other portraits if wanted, up to five. Put the intended main singer in the Lead upload at the top; verify the previews before paying.",
          "Select vertical 9:16 for a phone-style clip or horizontal 16:9 for a wider video.",
          "Choose Standard 480p ($5.99) or HD 720p ($8.99). These are one-time prices per generated video, not a free render.",
          "Confirm consent, review the checkout dialog and optionally enter a delivery email when offered; pay only after checking the final amount.",
          "Return to the same browser to see generation status. When the 15-second MP4 is ready, play it with sound and download your copy."
        ],
        links: [{ href: "/#studio", label: "Try the Outstanding-inspired studio" }]
      },
      {
        heading: "Which friend should be the singer?",
        paragraphs: [
          "Lead is displayed first for the singer. The other four positions fill supporting band roles; you can start with just one person, but a fuller lineup needs separately uploaded portraits. The model uses portraits as guidance rather than pasting each face into every frame.",
          "Watch the demo before you order if the framing matters to you. Even a close-up in the reference does not guarantee the exact same shot, facial expression or word-by-word mouth movement in your render."
        ],
        links: [{ href: "/blog/multiple-photos-tiny-desk-concert-video", label: "See the full role order" }]
      },
      {
        heading: "What if my upload or finished video looks wrong?",
        paragraphs: [
          "If a photo is rejected, try a clearer, front-facing adult portrait in a supported format. Avoid cropped faces, several people in one picture, and unapproved likenesses. Check that you have not accidentally placed the singer in a backing slot before checkout.",
          "The fixed audio is added to AI-generated footage; you cannot submit lyrics, select a different song, or force exact lip sync. AI can alter eyes, hands or facial details. Review the result before sharing, and do not present it as a real performance."
        ],
        links: [{ href: "/blog/tiny-desk-ai-music-lip-sync", label: "Learn what lip sync can and cannot do" }]
      },
      {
        heading: "Can I make it free, and how long can I get my file?",
        paragraphs: [
          "Watching the example is free, but generating a personalized video costs $5.99 for 480p or $8.99 for 720p. You receive a 15-second MP4, not an editable template or GIF.",
          "Finished videos are stored privately and are available for up to 30 days. Use the same browser to retrieve your order; clearing its cookies or switching devices may make it harder to find. Download the file promptly instead of treating browser history as a backup."
        ],
        links: [{ href: "/blog/download-tiny-desk-ai-video", label: "Download and keep your MP4" }]
      },
      {
        heading: "Is this an official Outstanding or Tiny Desk release?",
        paragraphs: [
          "No. This is an independent AI-created concert-style video, not an NPR/Tiny Desk production, a custom recording by an artist, or proof of music rights. Obtain the appropriate permissions for photos and audio before public or commercial distribution."
        ],
        links: [{ href: "/blog/outstanding-meme-ai", label: "What does Outstanding meme AI mean?" }, { href: "/blog/outstanding-meme-with-friends", label: "Make one with your friends" }]
      }
    ],
    related: ["outstanding-meme-ai", "outstanding-meme-with-friends", "tiny-desk-ai-video-guide",
      "how-to-make-outstanding-meme-with-template"]
  },
  {
    slug: "outstanding-meme-ai",
    title: "Outstanding Meme AI: What It Is and What You Can Make",
    description: "What is an Outstanding meme AI video? Learn how the Tiny Desk-inspired portrait template works, its price, soundtrack, limitations and safe sharing tips.",
    answer: "Outstanding meme AI describes an AI-generated band performance inspired by the concert meme. Tiny Desk AI Videos turns 1–5 portraits of consenting adults into a 15-second MP4 with a preset scene and fixed soundtrack. The output is an unofficial AI interpretation, not original concert footage. Custom songs and frame-perfect lip sync are not offered.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    minutes: "3 min read",
    image: "/tiny-band/guides/guide-04.webp",
    imageClass: "",
    imageBadge: "REFERENCE GUIDE",
    imageAlt: "Illustrative dog band frames used as the AI video's reference, not real concert footage",
    sections: [
      {
        heading: "What does Outstanding meme AI mean here?",
        paragraphs: [
          "People searching this phrase may want either to watch an existing meme or to make a version with their own people. This page explains the second option: an AI-generated, short band scene guided by uploaded portraits. It is not a historical account of where the meme began, and it does not reproduce an official concert clip.",
          "The public dog-band example helps show the scene and character positions. Your own result is newly generated footage; it is not a face swap pasted onto that example."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-band.webp",
          alt: "Opening band composition from the public dog reference video",
          caption: "Reference sample frame, not a customer render or a guarantee of matching shots.",
          width: 960, height: 1706
        }
      },
      {
        heading: "What does the AI do with my photos and the music?",
        paragraphs: [
          "You choose between one and five adult portraits and assign upload roles; Lead is shown first. The generator uses those portraits and a preset reference to make silent footage, then combines it with the fixed soundtrack. It does not let you write a custom prompt, change the track or clone a friend's voice.",
          "Since faces and movements are synthesized, a person can look different from their photo; not every uploaded role will appear in each shot. A reference close-up is guidance, not a promise of exact camera angles or word-by-word mouth alignment."
        ],
        links: [{ href: "/blog/tiny-desk-ai-music-lip-sync", label: "Why lip sync may vary" }]
      },
      {
        heading: "What can I actually download, and what does it cost?",
        paragraphs: [
          "The output is one 15-second MP4. Select 9:16 for a vertical video or 16:9 for a horizontal one; Standard 480p costs $5.99 and HD 720p costs $8.99 per video. Check the amount at checkout. Browsing the example is free, but there is no free personalized render on this site.",
          "Your completed video is stored privately for up to 30 days. Return in the same browser to watch and download it; an optional email may help with delivery, but neither the browser nor the email is a permanent backup."
        ],
        links: [{ href: "/blog/download-tiny-desk-ai-video", label: "How to keep the finished MP4" }]
      },
      {
        heading: "Is this the original song, an official show or a license?",
        paragraphs: [
          "No. This is an unofficial, AI-created interpretation and is not affiliated with NPR, Tiny Desk Concerts, Charlie Wilson or The Gap Band. A fixed soundtrack in a generated video does not give you a blanket license to use an original song or concert recording elsewhere.",
          "Only upload portraits of adults who consent. If you intend to post or monetize a result, check the applicable music, likeness and platform rules first; buying a render is not a substitute for those permissions."
        ],
        links: [{ href: "/blog/tiny-desk-outstanding", label: "More on the Outstanding theme and original recording" }]
      },
      {
        heading: "How do I make an Outstanding-style AI meme with friends?",
        paragraphs: [
          "Pick a clear individual photo for each consenting friend. Use the studio's labeled band positions to put the singer in Lead, choose quality and orientation, confirm consent, then complete the one-time checkout. Once processing finishes, watch and download the MP4 before the 30-day window ends.",
          "If you are looking for full editing control, selectable music, guaranteed exact lip sync or an official concert recording, this fixed template is not that tool. If a fast, short concert-inspired clip fits your goal, open the studio and preview the example first."
        ],
        links: [{ href: "/blog/how-to-make-the-outstanding-meme", label: "Follow the illustrated step-by-step tutorial" }, { href: "/#studio", label: "Preview and make your own video" }]
      }
    ],
    related: ["how-to-make-the-outstanding-meme", "outstanding-meme-with-friends", "tiny-desk-outstanding"]
  }
];

// Distinct how-to questions surfaced by English autocomplete. Do not turn unsupported
// features (free renders, custom lyrics, selectable audio) into product promises.
export const howToIntentGuides: TinyGuide[] = [
  {
    slug: "how-to-make-tiny-desk-ai-video-with-music",
    title: "How to Make a Tiny Desk AI Video with Music and Sound",
    description: "Make a 15-second Tiny Desk-style AI band video with sound: upload adult portraits, choose quality and format, and download the MP4 with its fixed soundtrack.",
    answer: "To make a video with music in Tiny Desk AI Videos, upload 1–5 portraits of consenting adults. Choose band roles, aspect ratio and resolution, then pay once. The service generates silent footage and adds its fixed soundtrack before delivery. Download the finished 15-second MP4 and play it with sound on. You cannot supply a different song or custom lyrics.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/guide-05.webp",
    imageClass: "",
    imageBadge: "REFERENCE FRAMES",
    imageAlt: "Illustrative band frames showing the video scene, not a claim of exact audio synchronization",
    sections: [
      {
        heading: "Does this generator include music, or do I add it myself?",
        paragraphs: [
          "The delivered MP4 includes the studio's fixed soundtrack. You do not need to upload an MP3, edit a timeline or record vocals. The video request itself asks for silent footage; after generation the site combines it with the preset audio. That is why the finished file has sound even though the underlying AI render is silent.",
          "The demo player can begin muted, so click its sound control before deciding there is no audio. If you are testing an order, check both the in-browser player and your downloaded MP4."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-lead.webp",
          alt: "Close-up of the lead performer in the public dog-band reference",
          caption: "Reference sample close-up, not a customer result; matching the exact mouth movement is not guaranteed.",
          width: 960, height: 1706
        },
        links: [{ href: "/blog/tiny-desk-ai-music-lip-sync", label: "Read how the soundtrack and mouth movements work" }]
      },
      {
        heading: "How to make the video with sound, step by step",
        paragraphs: ["The soundtrack is preselected, so your real choices are which consenting adults appear, their labeled roles, the frame shape and the output resolution."],
        steps: [
          "Open the studio and watch the public sample with sound enabled to judge its style before ordering.",
          "Upload one to five individual adult portraits with permission. Select Lead, the singer role, if you want to guide the singer's appearance.",
          "Choose 9:16 vertical or 16:9 horizontal, then 480p for $5.99 or 720p for $8.99. Confirm the amount at checkout.",
          "Confirm photo consent, optionally enter a delivery email when offered, complete payment and return to the same browser to follow generation.",
          "Play the completed 15-second MP4 with sound, check its ending and download it before the 30-day access period ends."
        ],
        links: [{ href: "/#studio", label: "Preview the audio and make your video" }]
      },
      {
        heading: "Can I make it sing my lyrics or choose another song?",
        paragraphs: [
          "No. There is no song selector, voice recording, custom lyrics field or voice-cloning option. Phrases such as 'with lyrics' or 'with my voice' describe a different workflow; this site does not offer those controls. Do not pay expecting the singer to perform new words.",
          "Music is attached to video, not phoneme-aligned to each mouth shape. A lead close-up can look expressive without matching every syllable; 720p increases resolution, not lip-sync accuracy."
        ],
        links: [{ href: "/blog/tiny-desk-ai-prompt-ideas", label: "What you can and cannot customize" }]
      },
      {
        heading: "Why is my preview silent or out of sync?",
        paragraphs: [
          "First unmute the player and check your device volume. If the downloaded file has sound but the preview does not, the player may simply be muted. If both are silent or playback fails, use the contact page with your order details; do not publish a private video link.",
          "If you hear music but the lead's mouth does not align perfectly, that is a generation limitation rather than a missing audio track. Watch the result before sharing it as an AI-created scene."
        ],
        links: [{ href: "/blog/download-tiny-desk-ai-video", label: "Find and verify your downloaded video" }]
      },
      {
        heading: "Can I post the soundtrack anywhere?",
        paragraphs: [
          "A paid render is not a blanket license for the original song, another recording or a public commercial use. Obtain rights to the portraits and verify music and platform permissions for your planned use. This independent studio is not affiliated with NPR or Tiny Desk Concerts.",
          "If the fixed soundtrack and these limits suit you, start by listening to the sample in the studio; otherwise use a workflow that explicitly supports your own licensed track."
        ],
        links: [{ href: "/#studio", label: "Listen to the sample in the studio" }, { href: "/terms", label: "Check the terms before sharing" }]
      }
    ],
    related: ["tiny-desk-ai-music-lip-sync", "tiny-desk-ai-video-guide", "how-to-make-tiny-desk-ai-video-for-instagram-and-youtube"]
  },
  {
    slug: "how-to-create-tiny-desk-ai-concert-from-one-photo",
    title: "How to Create a Tiny Desk AI Concert from One Photo Online",
    description: "Can one photo make a Tiny Desk-style AI concert? Yes: upload one consenting adult portrait to Lead, choose format and quality, then download your paid 15-second MP4.",
    answer: "One portrait is enough to start a video with Tiny Desk AI Videos. Upload a clear photo of a consenting adult to Lead at the top for the singer. Choose 9:16 or 16:9 and 480p ($5.99) or 720p ($8.99) before checkout. The result is a 15-second MP4 with preset audio. Unfilled roles have no supplied identity reference, and exact likeness is not guaranteed.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/guide-01.webp",
    imageClass: "",
    imageBadge: "SAMPLE FRAMES",
    imageAlt: "Public band reference frames showing the concert-style setting, not a one-photo customer result",
    sections: [
      {
        heading: "Can one portrait fill a whole band?",
        paragraphs: [
          "One photo is enough to submit an order, but it guides only the role you select. It does not automatically turn you into all five musicians or make five identical copies of your face. Unfilled positions do not have supplied identities and their appearance can vary in the AI-generated scene.",
          "For an intentional five-person cast, use a separate authorized adult portrait for each slot. For a solo-first clip, place your one photo in Lead at the top, rather than Back left."
        ],
        links: [{ href: "/blog/multiple-photos-tiny-desk-concert-video", label: "Compare one-photo and five-photo role setups" }]
      },
      {
        heading: "How to create a concert video from one photo",
        paragraphs: ["You can use the browser-based studio; you do not need to install an app or find a separate editing template. The screenshot shows the actual upload labels and checkout options."],
        image: {
          src: "/tiny-band/guides/steps/studio-mobile.webp",
          alt: "Actual mobile studio with five labeled portrait roles and video settings",
          caption: "Actual studio interface on a phone, November 4, 2026; dogs mark roles rather than example customer uploads.",
          width: 344, height: 1308
        },
        steps: [
          "Choose a clear, front-facing JPG, PNG or WebP portrait of one adult who has consented; keep it under 10 MB.",
          "Open the studio and tap Lead at the top. Upload the individual portrait and wait for its photo check to finish.",
          "Choose vertical 9:16 or horizontal 16:9, then Standard 480p ($5.99) or HD 720p ($8.99).",
          "Confirm consent, review the final one-time charge, optionally supply a delivery email when offered and complete checkout.",
          "Return to the same browser to see progress, then play and download the finished 15-second MP4 before the 30-day access limit."
        ],
        links: [{ href: "/#studio", label: "Make a video with my one photo" }]
      },
      {
        heading: "Which photo works, and what if the upload is rejected?",
        paragraphs: [
          "Choose an individual portrait with visible eyes, enough space around the face and even lighting. A crowded group photo, a tiny screenshot, a covered face or the wrong file type can fail the check or give the model poor guidance. Do not upload a minor's face or a friend who has not agreed.",
          "Try another clear, supported photo before checkout if the first is rejected. A passed photo check does not promise an exact face match, fixed eye expression or a particular lead close-up in the finished video."
        ],
        links: [{ href: "/blog/tiny-desk-ai-photo-tips", label: "Photo preparation and upload checks" }]
      },
      {
        heading: "Is this free or available as a phone app?",
        paragraphs: [
          "Watching the sample costs nothing; generating a personalized MP4 is not a free service. The one-time charge is $5.99 for 480p or $8.99 for 720p. Check your final amount before paying. There is no free personalized preview generation or subscription plan promised here.",
          "This is a website you can use in a browser, including on a phone. You do not need a special app. If you open it inside another app's built-in browser, keep using that same browser after checkout so you can retrieve the order."
        ],
        links: [{ href: "/blog/free-tiny-desk-ai-video-generator", label: "What is free versus paid?" }, { href: "/blog/how-to-make-tiny-desk-ai-video-on-phone", label: "Phone-specific walkthrough" }]
      },
      {
        heading: "What will my one-photo order actually deliver?",
        paragraphs: [
          "You get a 15-second AI-created MP4 with the fixed soundtrack, not a real NPR concert, a face-swap of the demo video, a GIF, or an editable song project. Your photo guides a role; it cannot guarantee that every shot shows your face or that the mouth matches each syllable.",
          "Completed files are private and accessible for up to 30 days. Download a copy promptly; a browser cookie helps recover your order but is not a backup of the video."
        ],
        links: [{ href: "/#studio", label: "Preview the sample and start" }, { href: "/blog/download-tiny-desk-ai-video", label: "Save your finished video" }]
      }
    ],
    related: ["tiny-desk-ai-photo-tips", "free-tiny-desk-ai-video-generator", "tiny-desk-ai-video-guide"]
  },
  {
    slug: "how-to-make-outstanding-meme-with-template",
    title: "How to Make the Outstanding Meme with an AI Template",
    description: "Use a fixed Outstanding-inspired band scene without finding a separate template: assign adult portraits, choose video options, and download a 15-second MP4.",
    answer: "Tiny Desk AI Videos provides a fixed browser template for an Outstanding-inspired meme. Upload 1–5 portraits of consenting adults, placing the singer in Lead. Choose format and resolution, then review the one-time price before checkout. The scene and soundtrack are preset. Download the completed 15-second MP4. This is not a downloadable CapCut template or an official Tiny Desk video.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Questions & answers",
    minutes: "4 min read",
    image: "/tiny-band/guides/guide-04.webp",
    imageClass: "",
    imageBadge: "REFERENCE GUIDE",
    imageAlt: "Illustrative dog band sample frames for the fixed Outstanding-inspired video scene",
    sections: [
      {
        heading: "Is there a downloadable Outstanding meme template?",
        paragraphs: [
          "Not on this site. 'Template' here means a fixed in-browser generation workflow, not a downloadable CapCut project, original concert clip, image overlay, GIF maker or editable audio timeline. We do not provide a third-party template link or the source footage for editing elsewhere.",
          "The public dog-band reference explains the scene and the five labeled performer positions. Your uploaded adult portraits guide a newly generated clip; the AI is not simply replacing faces in the public sample frame by frame."
        ],
        image: {
          src: "/tiny-band/guides/steps/reference-band.webp",
          alt: "Public dog-band reference showing the opening concert composition",
          caption: "Reference illustration, not an editable template or a guaranteed frame-for-frame output.",
          width: 960, height: 1706
        }
      },
      {
        heading: "How to use the Outstanding-inspired template online",
        paragraphs: ["The scene and track are preset. You choose the consenting adults, their roles, output orientation and resolution; there is no prompt field or song picker."],
        steps: [
          "Open the studio and view the sample so you know what sort of short band scene you are buying.",
          "Upload 1–5 separate portraits of consenting adults; select each intended band position and put the singer in Lead at the top.",
          "Choose 9:16 for a tall result or 16:9 for a wide result, plus 480p ($5.99) or 720p ($8.99).",
          "Review the consent and payment dialog, optionally enter an email when offered and complete the one-time checkout.",
          "Come back to the same browser, watch the 15-second MP4 with its fixed sound and download a copy within 30 days."
        ],
        links: [{ href: "/#studio", label: "Try the Outstanding-inspired studio" }]
      },
      {
        heading: "How do I cast myself and my friends?",
        paragraphs: [
          "Each upload position accepts one individual portrait, not one group photo for all five people. Lead is displayed first; the other four roles are optional. If you add only one portrait, the other positions have no identities you selected and may vary. Never upload other people's images without permission.",
          "The sample can suggest a singer close-up, but framing, facial appearance and mouth motion are generated and not guaranteed to match the sample shot by shot."
        ],
        links: [{ href: "/blog/outstanding-meme-with-friends", label: "Plan an Outstanding clip with friends" }, { href: "/blog/how-to-make-the-outstanding-meme", label: "Detailed Outstanding making tutorial" }]
      },
      {
        heading: "Can I replace the sound or use my own lyrics?",
        paragraphs: [
          "No. The delivered video includes the fixed soundtrack added to the silent render. This studio has no upload-your-own-song option, lyric input, voice clone or exact-word lip-sync control. A template elsewhere may work differently; do not pay here expecting those features.",
          "Playback may start muted. Turn on the player sound, and check the downloaded MP4 before assuming your video has no audio."
        ],
        links: [{ href: "/blog/how-to-make-tiny-desk-ai-video-with-music", label: "How the included music works" }]
      },
      {
        heading: "Is it official, free, or safe to repost?",
        paragraphs: [
          "This independent AI template is not affiliated with NPR or Tiny Desk Concerts and is not the original artist's recording. The demo is free to watch; a personal render costs $5.99 for 480p or $8.99 for 720p. A purchase does not grant blanket music or likeness rights for reposting or commercial use.",
          "Check the permissions for every portrait and soundtrack use, and label the result AI-created when viewers could mistake it for a real performance. If a fixed-template MP4 fits your goal, preview the example first."
        ],
        links: [{ href: "/#studio", label: "Watch the example before making yours" }, { href: "/terms", label: "Read the usage terms" }]
      }
    ],
    related: ["how-to-make-the-outstanding-meme", "outstanding-meme-ai", "how-to-make-tiny-desk-ai-video-with-music"]
  },
  {
    slug: "how-to-make-tiny-desk-ai-video-for-instagram-and-youtube",
    title: "How to Make a Tiny Desk AI Video for Instagram or YouTube",
    description: "Choose 9:16 or 16:9, make and download a 15-second Tiny Desk-style AI MP4, then check platform upload and music permissions before sharing.",
    answer: "To prepare a video with Tiny Desk AI Videos, choose 9:16 for a tall composition or 16:9 for a wide one before checkout. Upload portraits of consenting adults, then generate and download the 15-second MP4 with its fixed soundtrack. Uploading to Instagram or YouTube is a separate step. Check the destination’s current requirements and your music and likeness rights before posting.",
    date: "November 4, 2026",
    publishedAt: "2026-11-04",
    updatedAt: "2026-11-05",
    category: "Making & saving",
    minutes: "4 min read",
    image: "/tiny-band/guides/steps/reference-sax.webp",
    imageClass: "",
    imageBadge: "REFERENCE FRAME",
    imageAlt: "Public illustrative band performer frame for discussing vertical and horizontal output choices",
    sections: [
      {
        heading: "Which video format should I choose before checkout?",
        paragraphs: [
          "Select 9:16 when you want a tall, phone-first composition; select 16:9 when you want a wider composition. They are two generation options, not two exports of the same paid render. Decide where you plan to post before checkout; this site does not promise an aspect-ratio converter afterward.",
          "For either shape you can choose 480p at $5.99 or 720p at $8.99 per video. The higher setting changes resolution, not duration, framing guarantees or music rights. Check the final payment amount."
        ],
        image: {
          src: "/tiny-band/guides/steps/studio-mobile.webp",
          alt: "Actual mobile studio controls for 9:16 and 16:9 aspect ratios and 480p or 720p",
          caption: "Actual studio options, November 4, 2026; choose the frame before you order.",
          width: 344, height: 1308
        },
        links: [{ href: "/blog/tiny-desk-ai-video-formats", label: "Understand the two aspect ratios" }]
      },
      {
        heading: "How to make a share-ready AI band video",
        paragraphs: ["Make the MP4 on this website first. Posting is a separate step on your chosen platform; this tool does not log into Instagram or YouTube for you."],
        steps: [
          "Select individual portraits of 1–5 consenting adults, each in its intended role; choose the Lead slot shown first for your singer.",
          "In the studio, choose 9:16 or 16:9 and then 480p ($5.99) or 720p ($8.99). Preview the sample before paying.",
          "Review consent and the one-time checkout, optionally enter a delivery email when offered and return to the same browser for generation status.",
          "Play the finished 15-second MP4 with sound, inspect faces and the singer close-up, then download it within the 30-day access period.",
          "On the destination platform, check its current upload specifications, audio rules and your permissions before you publish."
        ],
        links: [{ href: "/#studio", label: "Choose my format and create a video" }]
      },
      {
        heading: "Does the downloaded MP4 already have sound?",
        paragraphs: [
          "Yes: the studio adds its fixed soundtrack to silent AI footage before delivery. The on-page sample or finished player may start muted; enable the sound control and check the downloaded file. Do not assume you must add music a second time in a social app.",
          "You cannot pick another song, submit lyrics or request precise word-by-word lip sync in this template. If you choose to edit the audio elsewhere, arrange any rights you need first."
        ],
        links: [{ href: "/blog/how-to-make-tiny-desk-ai-video-with-music", label: "Soundtrack and audio walkthrough" }]
      },
      {
        heading: "Will Instagram or YouTube accept this video and music?",
        paragraphs: [
          "Acceptance and reach are not guaranteed. Upload specifications and music policies may change, and the same file can be treated differently depending on account, location and intended use. Verify the destination's current rules instead of treating this guide as approval to publish.",
          "Only use portraits with the adults' permission. A paid AI video does not grant blanket rights to another artist's song, a real concert or anyone's likeness; get the permissions you need for your planned distribution. Identify the performance as AI-created where confusion is possible."
        ],
        links: [{ href: "/terms", label: "Read the terms and rights notes" }]
      },
      {
        heading: "How can I keep the file for later posting?",
        paragraphs: [
          "Download the MP4 promptly, then confirm that it plays on your device with sound before copying it to the app where you intend to post. A browser's order history is not a local video backup.",
          "Completed videos are stored privately for up to 30 days; use the same browser to find your order. If your clip needs an edit or another orientation later, the current order does not include a second format export."
        ],
        links: [{ href: "/#studio", label: "Make a 15-second video" }, { href: "/blog/download-tiny-desk-ai-video", label: "Download and find your MP4" }]
      }
    ],
    related: ["tiny-desk-ai-video-formats", "download-tiny-desk-ai-video", "how-to-make-tiny-desk-ai-video-with-music"]
  }
];

export const tinyDiscoveryGuides: TinyGuide[] = [
  {
    "slug": "outstanding-tiny-desk-original-video",
    "title": "Where can I watch the original Outstanding Tiny Desk video?",
    "description": "Find the original Charlie Wilson Tiny Desk performance and distinguish it from AI band memes.",
    "answer": "The concert reference is Charlie Wilson: Tiny Desk Concert on NPR Music. It includes Outstanding by The Gap Band. Dog-band and personalized AI versions are remakes, not the original concert.",
    "date": "November 4, 2026",
    "publishedAt": "2026-11-04",
    "updatedAt": "2026-11-04",
    "category": "The meme & music",
    "minutes": "5 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "Start with the official performance",
        "paragraphs": [
          "Look for Charlie Wilson: Tiny Desk Concert on the NPR Music channel. The official Charlie Wilson website also links to the concert and identifies Outstanding among the songs performed. These are better starting points than a short repost with an unfamiliar account name.",
          "You do not need to buy an AI video to watch the original. This studio is an independent tool for creating a personalized band clip, not the concert publisher."
        ],
        "links": [
          {
            "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
            "label": "Watch Charlie Wilson on NPR Music"
          }
        ]
      },
      {
        "heading": "Why your social clip may look different",
        "paragraphs": [
          "A search for the original can lead to dog-band references, coaches edits or clips with new faces. Those versions can share a musical idea without sharing the same footage, duration or timing. An AI edit is not evidence that the pictured person actually performed the song.",
          "Listen to the arrangement and watch the credited performer before comparing clips. A short, sped-up edit is not a reliable timing reference for a different 15-second output."
        ]
      },
      {
        "heading": "Understand the roles before uploading a face",
        "paragraphs": [
          "In this studio, Lead selects the intended singer and Keys selects the front performer in the opening group. The two backing positions and Sax are optional additional roles. Lead appears first so you can start with the person you want to feature.",
          "The dog images remain role guides. They are not photos you need to imitate, and an empty slot does not promise that a specific reference character will remain unchanged."
        ],
        "image": {
          "src": "/tiny-band/guides/steps/reference-lead.webp",
          "alt": "Dog Lead shown in a reference close-up",
          "caption": "The studio Lead reference; not a frame from the original concert.",
          "width": 960,
          "height": 1706
        },
        "links": [
          {
            "href": "/blog/multiple-photos-tiny-desk-concert-video",
            "label": "See the complete role map"
          }
        ]
      },
      {
        "heading": "Make a personal version rather than a misleading repost",
        "paragraphs": [
          "Use your own portrait or an image of a consenting adult. Choose a format and quality, review the demo and pay only if this template fits your goal. The output is a 15-second MP4 with a fixed soundtrack; custom music and exact lip synchronization are not promised.",
          "Download in the same browser within 30 days. Describe a shared remake as AI-generated rather than a real performance. Check permissions for the images and music wherever you plan to publish it."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make a personal band video"
          }
        ]
      }
    ],
    "related": [
      "tiny-desk-outstanding",
      "what-song-is-in-the-tiny-desk-ai-meme",
      "multiple-photos-tiny-desk-concert-video"
    ],
    "sources": [
      {
        "label": "NPR Music — Charlie Wilson: Tiny Desk Concert",
        "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
        "note": "Original performance reference, not an endorsement of this studio."
      },
      {
        "label": "Charlie Wilson - official concert announcement",
        "href": "https://www.charliewilsonmusic.com/charlie-wilson-kicks-off-nprs-black-music-month-with-tiny-desk-concert/",
        "note": "Identifies Outstanding in the concert set and links to the official performance."
      }
    ],
    "faqs": [
      {
        "question": "Is the dog-band video the original NPR concert?",
        "answer": "No. It is a reference remake. The concert reference features Charlie Wilson and his musicians."
      },
      {
        "question": "Do I need to pay this website to see the original?",
        "answer": "No. Use the official performance link. Payment here is for creating your own AI video."
      }
    ]
  },
  {
    "slug": "what-song-is-in-the-tiny-desk-ai-meme",
    "title": "What song is in the Outstanding Tiny Desk AI meme?",
    "description": "Identify Outstanding by The Gap Band and understand the difference between the concert, a studio recording and an AI edit.",
    "answer": "The Outstanding version of the Tiny Desk AI meme refers to Outstanding by The Gap Band, associated with the Charlie Wilson NPR Tiny Desk performance. Not every clip labeled Tiny Desk AI uses the same recording or edit.",
    "date": "November 4, 2026",
    "publishedAt": "2026-11-04",
    "updatedAt": "2026-11-04",
    "category": "The meme & music",
    "minutes": "5 min read",
    "image": "/tiny-band/guides/guide-04.webp",
    "imageClass": "",
    "imageBadge": "REFERENCE FRAMES",
    "imageAlt": "Dog-band reference frames showing the Tiny Desk concert setting",
    "sections": [
      {
        "heading": "The song title and the concert are different answers",
        "paragraphs": [
          "Outstanding is the song name. Charlie Wilson: Tiny Desk Concert is the live performance to look for when you want the concert context. The official Charlie Wilson concert announcement names Outstanding in the set.",
          "If a search gives you an unrelated Tiny Desk clip, check the song and credited performer rather than relying only on the meme label. This studio is not affiliated with the artist, The Gap Band or NPR."
        ],
        "links": [
          {
            "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
            "label": "Find the original live performance"
          }
        ]
      },
      {
        "heading": "Why two versions can sound different",
        "paragraphs": [
          "A studio recording, a live arrangement and an edited social clip can have different introductions, phrasing and durations. A repost may also be trimmed or sped up. Matching the song title alone does not establish that two videos use identical timing.",
          "Listen to the actual studio demo before ordering. The generator uses a fixed soundtrack; it does not let you choose a streaming track, upload a different song or request a new vocal performance."
        ]
      },
      {
        "heading": "Does my uploaded face sing in my own voice?",
        "paragraphs": [
          "No voice recording is required, and the current studio does not clone your voice. Your portrait is used as a visual reference for a band role. The generated footage is combined with the preset audio track.",
          "Mouth movement is generated visually; attaching audio is not the same as aligning every syllable. A recognizable face, a higher resolution and an accurate mouth shape are separate qualities, so exact word-for-word lip sync is not guaranteed."
        ],
        "links": [
          {
            "href": "/blog/tiny-desk-ai-music-lip-sync",
            "label": "Understand music and lip-sync limits"
          }
        ]
      },
      {
        "heading": "Make and save your own version",
        "paragraphs": [
          "Start with one clear portrait and choose Lead if you want the singer role. Add friends only if you want to personalize more of the band. Select 9:16 or 16:9, then choose the listed $5.99 480p or $8.99 720p option and review checkout.",
          "The output is a 15-second MP4 with the fixed soundtrack. Return in the original browser to play and download it, and save a copy within 30 days. Generating a video does not by itself settle permission to publish a particular recording on another platform."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Try the band template"
          },
          {
            "href": "/terms",
            "label": "Read the usage terms"
          }
        ]
      }
    ],
    "related": [
      "outstanding-tiny-desk-original-video",
      "tiny-desk-ai-music-lip-sync",
      "how-to-make-tiny-desk-ai-video-with-music"
    ],
    "sources": [
      {
        "label": "NPR Music — Charlie Wilson: Tiny Desk Concert",
        "href": "https://www.youtube.com/watch?v=J3jUEB7qmt8",
        "note": "Original performance reference, not an endorsement of this studio."
      },
      {
        "label": "Charlie Wilson - official concert announcement",
        "href": "https://www.charliewilsonmusic.com/charlie-wilson-kicks-off-nprs-black-music-month-with-tiny-desk-concert/",
        "note": "Identifies Outstanding in the concert set and links to the official performance."
      }
    ],
    "faqs": [
      {
        "question": "Is All-Loss the song title?",
        "answer": "No. The song discussed here is Outstanding. All-Loss refers to a meme variant, not a separate track."
      },
      {
        "question": "Can I select a custom song or clone my voice here?",
        "answer": "No. The current template has a fixed soundtrack and no custom song or voice upload."
      }
    ]
  }
];

export const allTinyGuides: TinyGuide[] = [...tinyGuides, ...tinyLandingPages, ...tinyWorkflowGuides, ...outstandingMemeGuides, ...howToIntentGuides, ...tinyDiscoveryGuides];

export const featuredTinyGuides: TinyGuide[] = [
  "tiny-desk-outstanding",
  "tiny-desk-ai-video-guide",
  "multiple-photos-tiny-desk-concert-video",
  "what-song-is-in-the-tiny-desk-ai-meme",
  "outstanding-tiny-desk-original-video",
  "best-tiny-desk-ai-video-generator",
].map(slug => allTinyGuides.find(guide => guide.slug === slug)!);
