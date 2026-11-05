export type GuideImage = { src: string; alt: string; caption: string; width: number; height: number };
export type GuideSection = { heading: string; paragraphs: string[]; steps?: string[]; bullets?: string[]; table?: { caption: string; headers: string[]; rows: string[][] }; image?: GuideImage; links?: { href: string; label: string }[] };
export type TinyGuide = { slug: string; title: string; description: string; answer: string; date: string; publishedAt: string; updatedAt: string; category: string; minutes: string; image: string; imageClass: string; imageBadge: string; imageAlt: string; sections: GuideSection[]; related: string[]; sources?: { label: string; href: string; note?: string }[]; faqs?: { question: string; answer: string }[] };

export const allTinyGuides: TinyGuide[] = [
  {
    "slug": "your-first-time-in-a-fancy-cafe-meme-explained",
    "title": "What is the Your First Time in a Fancy Cafe meme?",
    "description": "An explanation of the wrong-seat cafe meme: the round table, the bench, the awkward realization, and what AI photo replacement changes.",
    "answer": "The Your First Time in a Fancy Cafe meme is a visual wrong-seat joke: a visitor sits on a small round table, sees another customer use the bench correctly, and quietly fixes the mistake. AI versions replace the characters while keeping the reveal.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "The meme & music",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Why is the person sitting on the table?",
        "paragraphs": [
          "The cafe furniture is the setup. Small round tables are mounted near a low bench, and the first visitor treats a tabletop as a stool. The visitor looks comfortable until a second customer shows the intended arrangement.",
          "The joke needs the viewer to see the furniture clearly. A close-up that hides the bench removes the evidence that the visitor chose the wrong seat. The final correction works because the visitor tries to act as though nothing happened."
        ]
      },
      {
        "heading": "What changes in the AI version?",
        "paragraphs": [
          "An AI recreation can assign an uploaded portrait to the mistaken visitor and another portrait to the regular customer. The plot remains the same: mistaken seat, demonstration, realization, correction. A different face alone does not make the staging correct.",
          "This is a cafe comedy format, not a coffee-ordering tutorial or a music performance. Search results about espresso, cafe etiquette or cafe interior design answer a different question."
        ]
      },
      {
        "heading": "Is there one official template or original audio?",
        "paragraphs": [
          "Different editors and AI tools publish their own versions. A matching caption is not proof that a clip is the earliest source or that its soundtrack is licensed for reuse. Check the uploader and audio attribution on the platform where you found a clip.",
          "Fancy Cafe AI is an independent tool, not an official TikTok or CapCut product. The example gallery labels one AI-generated result and two reference videos. They illustrate the format, not a guarantee of your result."
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-two-people",
      "fancy-cafe-ai-vs-capcut-template"
    ],
    "sources": [
      {
        "label": "Media.io — First Time in a Fancy Cafe AI",
        "href": "https://www.media.io/ai/br/explore/zone/first-time-in-a-fancy-cafe-ai",
        "note": "Example of how another tool describes the wrong-seat setup and photo roles. Its capabilities and offers are not ours."
      }
    ]
  },
  {
    "slug": "how-to-make-first-time-in-a-fancy-cafe-ai-video",
    "title": "How to make a Your First Time in a Fancy Cafe AI video",
    "description": "Learn how to prepare a protagonist photo, add an optional cafe regular, and create a 20-second wrong-seat video in the studio.",
    "answer": "To make the Fancy Cafe AI meme, assign one adult portrait to the visitor who sits on the table, optionally add a second portrait for the cafe regular, and use a reference that preserves the reveal. The studio lets you choose the roles, resolution and aspect ratio before you check out.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Getting started",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What should I prepare first?",
        "paragraphs": [
          "Choose a clear photo of yourself or another consenting adult. Keep the face unobstructed and select a second individual photo only if you want to personalize the regular customer. A group photo does not reliably identify both roles.",
          "Review the intended joke before choosing a tool: the first person is on a table, the second person demonstrates the bench, and the first person corrects the mistake. The reference video should make all three actions visible."
        ]
      },
      {
        "heading": "How does the studio workflow work?",
        "paragraphs": [
          "The site is designed for one 20-second result in a selected resolution and aspect ratio. Confirm the current price and order availability in the studio before paying."
        ],
        "steps": [
          "Open the studio and add a portrait to Protagonist. Wait for the photo check.",
          "The second slot is already open. Optionally upload a portrait to replace the woman in the cafe reference.",
          "Choose 480p or 720p, then 9:16 vertical or 16:9 horizontal. Confirm consent.",
          "Review the final price and delivery details before continuing to checkout.",
          "Return in the same browser to monitor the existing order, preview the result and download the MP4."
        ]
      },
      {
        "heading": "What should I check in the finished video?",
        "paragraphs": [
          "Watch once for the joke and once for identity. Both adults should keep their own faces. The table must not turn into a chair, the supporting character must sit on the bench, and the protagonist should notice before moving.",
          "A reference guides generation but does not guarantee exact timing, hands or facial likeness. Do not purchase a second render simply because the first order is still processing; check its status first."
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-photo-tips",
      "fancy-cafe-ai-two-people",
      "fix-fancy-cafe-ai-face-and-seat-errors"
    ]
  },
  {
    "slug": "fancy-cafe-ai-two-people",
    "title": "How to make the Fancy Cafe AI meme with two people",
    "description": "Use one photo for the protagonist or two for both cafe characters. Learn which role gets each face and how to avoid swapped identities.",
    "answer": "Use Photo 1 for the protagonist who sits on the table and Photo 2 for the regular who sits correctly on the bench. In Fancy Cafe AI, the protagonist is required and the second portrait is optional. Roles depend on the labeled slots, not gender.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Getting started",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Which photo belongs in each role?",
        "paragraphs": [
          "The protagonist carries the joke: a relaxed sip, a glance at the regular, an embarrassed realization and a careful move onto the bench. Place the person you want to feature in that slot.",
          "The cafe regular is the supporting role. The regular enters, sits correctly and places a cup on a table. That action reveals the mistake without a speech or exaggerated reaction."
        ],
        "table": {
          "caption": "Photo-to-role mapping",
          "headers": [
            "Slot",
            "Required?",
            "Action"
          ],
          "rows": [
            [
              "Protagonist",
              "Yes",
              "Sits on the table, then corrects the mistake"
            ],
            [
              "Cafe regular",
              "No",
              "Sits on the bench and reveals the mistake"
            ]
          ]
        }
      },
      {
        "heading": "What if I only upload one photo?",
        "paragraphs": [
          "The one-photo mode uses the uploaded identity for the protagonist; the reference guides the woman in the cafe. The model may generate a similar-looking woman rather than preserving the exact person. Leaving her slot empty does not request a duplicate protagonist.",
          "If you want to replace the woman with someone recognizable, upload that person’s separate portrait with permission. A reference alone cannot guarantee the same face."
        ]
      },
      {
        "heading": "Can either role be played by a woman or a man?",
        "paragraphs": [
          "Yes. The two roles describe actions, not gender. Choose clear adult photos and keep the role labels consistent. Do not ask the model to infer who belongs on the table from appearance.",
          "Avoid uploading the same face to both slots unless you intend two similar-looking characters; even then, AI may blend identities. Distinct individual photos make the role assignment easier to review."
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-photo-tips",
      "fix-fancy-cafe-ai-face-and-seat-errors"
    ]
  },
  {
    "slug": "fancy-cafe-ai-photo-tips",
    "title": "What photos work best for a Fancy Cafe AI video?",
    "description": "Choose clear adult portraits for a Fancy Cafe AI video. Check face visibility, lighting, image format, consent and common upload mistakes.",
    "answer": "Use a sharp, well-lit photo containing one consenting adult, with a visible face and no heavy obstruction. Fancy Cafe AI accepts JPG, PNG and WebP files up to 10 MB. A separate portrait is needed for each personalized role; a group selfie is not recommended.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Getting started",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Should I use a selfie or a full-body photo?",
        "paragraphs": [
          "A clear face is the first priority for identity. A head-and-shoulders or waist-up image with visible eyes is a practical starting point. A full-body image can provide more clothing context, but a tiny face in a distant shot is less useful.",
          "The generated scene includes sitting and standing. A portrait cannot guarantee accurate legs, hands or unseen clothing. If the source photo does not show an outfit clearly, the model must infer some details."
        ]
      },
      {
        "heading": "What should I avoid?",
        "paragraphs": [
          "Choose an original image rather than an enlarged, blurry screenshot. Avoid sunglasses, masks, faces cut off at the edge, dramatic colored lighting and beauty filters that substantially change facial features."
        ],
        "bullets": [
          "One person per upload, not a crowded group photo.",
          "No celebrity impersonation, minors or nonconsensual likeness use.",
          "Do not upload a pet to this adult-portrait template; the sample portraits show the two cafe roles and are not uploaded by default.",
          "Re-saving a small image at a larger size does not restore missing facial detail."
        ]
      },
      {
        "heading": "What happens when a photo is rejected?",
        "paragraphs": [
          "Check the file format and size first. Then choose a clearer photo with one adult face and wait for the new check to finish. Automated screening can make mistakes; repeatedly submitting the same rejected file is unlikely to help.",
          "Only upload images you have permission to use. Photo checks do not prove ownership or consent, and approval is not a guarantee that a generated face will be an exact match."
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-two-people",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fix-fancy-cafe-ai-face-and-seat-errors"
    ]
  },
  {
    "slug": "fancy-cafe-ai-vs-capcut-template",
    "title": "Fancy Cafe AI generator vs. CapCut template: which do you need?",
    "description": "Compare AI-generated cafe scenes with CapCut editing templates. Choose based on whether you need new footage or want to edit an existing clip.",
    "answer": "Choose a video-editing template when you already have footage and mainly need cuts, captions or music. Choose an AI recreation when you want a photo identity to perform the cafe scene. A CapCut template link does not automatically provide reliable AI character replacement.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Questions & answers",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What is the difference between editing and generation?",
        "paragraphs": [
          "Editing rearranges or decorates existing footage. AI generation synthesizes new frames, which can place a supplied face into a new performance but can also change anatomy, furniture or expressions."
        ],
        "table": {
          "caption": "Choose by the job you need done",
          "headers": [
            "Your goal",
            "Approach",
            "Main check"
          ],
          "rows": [
            [
              "Caption existing footage",
              "Video editor",
              "Timing, readability and permission"
            ],
            [
              "Create a performance from a photo",
              "AI video generator",
              "Identity and coherent motion"
            ],
            [
              "Keep every original frame unchanged",
              "Authorized original footage with editing",
              "AI regeneration is not frame-exact"
            ]
          ]
        }
      },
      {
        "heading": "How should I assess a template link?",
        "paragraphs": [
          "Preview the actual template before uploading photos or paying. Check whether it is an editing preset, a face-replacement tool or a new-video generator. Look for the required inputs, duration, export format and final price.",
          "Do not assume that a creator calling something a free template means every AI render or export is free. The same applies to our site: reading guides are free, but personalized video generation is priced per render."
        ]
      },
      {
        "heading": "Where does Fancy Cafe AI fit?",
        "paragraphs": [
          "Fancy Cafe AI is a focused two-character video generator, with fixed scene instructions rather than a general video editor. It does not provide a custom timeline or an official CapCut template.",
          "Our current media examples come from an older template and are labeled accordingly. Wait for a validated cafe demo if exact staging is important to your purchase decision."
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-price-and-free-options"
    ]
  },
  {
    "slug": "fix-fancy-cafe-ai-face-and-seat-errors",
    "title": "How to fix face changes and wrong seats in a Fancy Cafe AI video",
    "description": "Fix common cafe-video mistakes: merged faces, wrong seating, hidden benches and missed reactions. Check the scene before changing your photos.",
    "answer": "If a Fancy Cafe AI video changes faces or gets the seating wrong, check the photo-to-role assignment and whether the reference clearly shows both tables and the bench. Better images and clearer scene instructions can help, but no prompt guarantees perfect identity or motion.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Questions & answers",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Why does the wrong person get replaced?",
        "paragraphs": [
          "Two similar or ambiguous photos can make identity binding harder. Use separate clear portraits and assign the protagonist first. The optional regular must remain a distinct person throughout the scene.",
          "Review whether the mistake happens in every frame or only during a turn. A face that changes during movement may be a temporal consistency issue, not a swapped upload. Adding more keywords about realism does not reliably fix that."
        ]
      },
      {
        "heading": "Why does the joke disappear?",
        "paragraphs": [
          "The model may interpret the small table as an ordinary seat, skip the pause of realization, or move the protagonist before the regular demonstrates the bench. All three mistakes remove the visual explanation.",
          "A readable sequence is more important than dramatic camera movement: establish the wrong seat, show the correct one, hold the realization, then perform the correction. Keep the furniture visible and avoid unrelated close-ups."
        ]
      },
      {
        "heading": "Should I keep paying for retries?",
        "paragraphs": [
          "Not while an order is pending or failed. Check the original order and keep its reference. Contact support about a failed delivery rather than creating another payment for the same attempt.",
          "For an unsatisfactory completed result, review the refund policy and describe the concrete issue: identity change, furniture distortion or missing action. Do not send sensitive payment details. Automated output varies; a rerender may still have defects."
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-photo-tips",
      "fancy-cafe-ai-two-people",
      "download-fancy-cafe-ai-video"
    ]
  },
  {
    "slug": "fancy-cafe-ai-music-and-captions",
    "title": "How to add music and captions to a Fancy Cafe meme video",
    "description": "Learn how to choose permitted music and add captions to a cafe meme. No original-song license or exact audio synchronization is promised.",
    "answer": "Add music only when you have permission to use it, or select an eligible sound through the platform where you will publish. Use a short opening caption such as “POV: your first time in a fancy cafe.” Music supports the joke, but the seating reveal must work visually.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "The meme & music",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Does the meme require one specific song?",
        "paragraphs": [
          "The joke is understandable without speech or a named track. Reposts can use different sounds and edits, so a title alone does not identify a universally required recording.",
          "A song being available in one platform sound library does not automatically grant permission to download it and embed it in an exported commercial video. Check the applicable license and account restrictions."
        ]
      },
      {
        "heading": "How will this studio handle audio?",
        "paragraphs": [
          "The configured pipeline requests silent footage first. A separate authorized audio asset can then be merged into the result. This does not ask the video model to reproduce a copyrighted song or clone a voice.",
          "Audio is used only with permission; reference video audio does not automatically grant reuse rights. Confirm the audio in your finished video and your rights to use it."
        ]
      },
      {
        "heading": "Where should the caption go?",
        "paragraphs": [
          "Keep text out of the lower seating area and away from faces. The viewer needs to see the tabletop, bench and protagonist movement. Add the caption in an editor after generation rather than asking the video model to render readable text."
        ],
        "steps": [
          "Preview the complete silent joke first.",
          "Add one short opening caption in a safe upper area.",
          "Choose an authorized track and keep it at a comfortable level.",
          "Watch the final export to check that text and audio do not obscure the reveal."
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "download-fancy-cafe-ai-video"
    ]
  },
  {
    "slug": "fancy-cafe-ai-price-and-free-options",
    "title": "Is the Fancy Cafe AI video free? Video pricing explained",
    "description": "Fancy Cafe AI pricing: $6.99 for 480p or $9.99 for 720p. Understand paid renders and what free editing options can do.",
    "answer": "Fancy Cafe AI guides are free to browse. Personalized generation is priced at $6.99 for 480p or $9.99 for 720p, per 20-second video. Confirm the final price and availability at checkout; there is no free render or subscription offer.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-05",
    "category": "Questions & answers",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What does one payment cover?",
        "paragraphs": [
          "The listed price covers one generated video at the chosen resolution and aspect ratio. A 9:16 order does not also include a separate 16:9 render. Adding the optional second portrait does not change the listed tier price.",
          "Confirm availability and amount before checkout. Never pay through a separate message or an unrelated payment link."
        ]
      },
      {
        "heading": "Does HD improve the face or comic timing?",
        "paragraphs": [
          "720p requests more output pixels than 480p. It does not promise a better likeness, a more accurate seating sequence or perfect hands. Both options use the same scene and 20-second target.",
          "For a phone feed, a vertical format is often practical; choose horizontal when the intended placement needs a wide frame. Resolution and aspect ratio are separate choices."
        ]
      },
      {
        "heading": "What should I check before buying?",
        "paragraphs": [
          "Watch a verified cafe example, read the photo instructions and understand the output limitations. The cafe reference videos show the intended story rather than guaranteed generated output.",
          "Keep your order reference and return in the same browser after checkout. If payment succeeds but delivery fails, use the existing order and contact support under the refund policy rather than paying again."
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-vs-capcut-template",
      "download-fancy-cafe-ai-video"
    ]
  },
  {
    "slug": "how-to-create-fancy-cafe-ai-video-on-phone",
    "title": "How to create a Fancy Cafe AI video on your phone",
    "description": "Prepare a Fancy Cafe AI video on your phone without installing an app. Choose portraits and format, and keep the same browser for delivery.",
    "answer": "You can prepare a Fancy Cafe AI video in a mobile browser: select a protagonist portrait, optionally replace the woman in the cafe, and choose your format. No app installation is required for the studio. Confirm availability and the final price before paying.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Making & saving",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "How do I prepare photos on mobile?",
        "paragraphs": [
          "Use the original photo from your camera roll when possible. If your image is HEIC, export a JPG or PNG before uploading because this studio accepts JPG, PNG and WebP. Check that only one adult is visible.",
          "Tap the protagonist portrait to upload your photo first. The optional cafe regular (the woman in the meme) is visible below the protagonist; tap her portrait to replace her. Review the selected thumbnails before continuing; the order in your camera roll does not define the roles."
        ]
      },
      {
        "heading": "Which format should I select?",
        "paragraphs": [
          "9:16 creates a tall frame suitable for a portrait feed. 16:9 creates a wide frame. In either format, the composition needs enough room for both adults and the furniture that explains the joke.",
          "Rotating your phone after choosing a format does not change the requested video. Select the intended aspect ratio in the studio before checkout."
        ]
      },
      {
        "heading": "Can I close the browser after payment?",
        "paragraphs": [
          "Submitted jobs continue processing on the server. To recover your order, keep the same browser cookies and order reference. An optional delivery email is shown only when email delivery is configured.",
          "Do not clear site data or switch to private browsing while relying on browser recovery. On return, check the existing order before starting another. Download the finished MP4 instead of treating a browser history card as permanent storage."
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-photo-tips",
      "download-fancy-cafe-ai-video"
    ]
  },
  {
    "slug": "download-fancy-cafe-ai-video",
    "title": "How to download and find your Fancy Cafe AI video",
    "description": "Learn where completed cafe videos will appear, how to download an MP4, and why you should save a copy within 30 days of completion.",
    "answer": "After a completed order, open the same browser, select the video in Generated videos and use Download MP4. Video access is available for up to 30 days from completion. Browser history stores access information, not a permanent copy of the video file.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Making & saving",
    "minutes": "3 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Where will the finished video appear?",
        "paragraphs": [
          "The studio shows estimated generation progress until the video is ready. Completed items appear in Generated videos; select one to play it in the main player, or use its Download button to save the MP4.",
          "The Example tab plays sample footage, not your purchased result. Your finished video appears under My videos in the same browser."
        ]
      },
      {
        "heading": "What if I cannot find a paid order?",
        "paragraphs": [
          "Use the device and browser that completed checkout, retain cookies, and keep the order code. If an optional email was supplied and delivery was configured, check that inbox and its spam folder as well.",
          "If the order is still running, do not submit another payment. If delivery has failed or the order cannot be found, contact support with the order reference and approximate payment time. Never share card numbers or security codes."
        ]
      },
      {
        "heading": "How do I keep the video permanently?",
        "paragraphs": [
          "Save the MP4 to a device or your own storage before the access window ends. Test that the saved file plays outside the website. A bookmarked player page or copied temporary URL is not a backup.",
          "The storage window is a maximum access period, not a promise that a browser cookie will last forever. Private browsing, cleared cookies or an expired link can interrupt access. Review the privacy and refund policies before ordering."
        ]
      }
    ],
    "related": [
      "how-to-create-fancy-cafe-ai-video-on-phone",
      "fancy-cafe-ai-price-and-free-options",
      "fix-fancy-cafe-ai-face-and-seat-errors"
    ]
  }
];
export const tinyGuides = allTinyGuides;
export const featuredTinyGuides = allTinyGuides.slice(0, 6);
