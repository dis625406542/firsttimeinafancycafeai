export type GuideImage = { src: string; alt: string; caption: string; width: number; height: number };
export type GuideSection = { heading: string; paragraphs: string[]; steps?: string[]; bullets?: string[]; table?: { caption: string; headers: string[]; rows: string[][] }; image?: GuideImage; links?: { href: string; label: string }[] };
export type TinyGuide = { slug: string; title: string; description: string; answer: string; date: string; publishedAt: string; updatedAt: string; category: string; minutes: string; image: string; imageClass: string; imageBadge: string; imageAlt: string; sections: GuideSection[]; related: string[]; sources?: { label: string; href: string; note?: string }[]; faqs?: { question: string; answer: string }[] };

export const allTinyGuides: TinyGuide[] = [
  {
    "slug": "your-first-time-in-a-fancy-cafe-meme-explained",
    "title": "What is the first time in a fancy cafe meme?",
    "description": "The Fancy Cafe meme explained: the wrong-seat joke, POV meaning, origin, creator, song and AI versions, with answers to eight common questions.",
    "answer": "The First Time in a Fancy Cafe meme is a wrong-seat comedy scene: a visitor mistakes a small table for a stool, watches a cafe regular sit on the bench, then quietly moves. AI remakes put different people into the same awkward reveal. The joke is about unfamiliar furniture, not ordering coffee.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "The meme & music",
    "minutes": "6 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What is the first time in a fancy cafe meme?",
        "paragraphs": [
          "The First Time in a Fancy Cafe meme is a short visual joke about mistaking a small cafe table for a seat. A visitor sits on the tabletop, sees another customer sit on the actual bench, realizes the mistake and moves while trying to look casual.",
          "The caption “your first time in a fancy cafe” frames the visitor as someone unfamiliar with the furniture. The reveal works without an explanation of coffee or cafe etiquette. AI remakes change the characters while retaining the same seating mistake."
        ],
        "bullets": [
          "Setup: the visitor sits on the small table beside the bench.",
          "Contrast: the cafe regular sits on the bench and uses the table normally.",
          "Realization: the visitor notices the different seating arrangement.",
          "Payoff: the visitor moves to the bench as though that was the plan."
        ]
      },
      {
        "heading": "What does POV your first time in a fancy cafe mean?",
        "paragraphs": [
          "POV means “point of view”. In this meme, “POV your first time in a fancy cafe” asks the viewer to imagine being the embarrassed first-time visitor. The caption describes a situation; the camera does not have to show a literal view through the visitor’s eyes.",
          "A wide shot can show the person, tabletop and bench together. That framing lets the audience spot the mistake and understand the correction. A POV caption alone does not turn an unrelated coffee video into this particular meme."
        ],
        "links": [
          {
            "href": "/blog/how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels",
            "label": "Make a POV version for TikTok or Reels"
          }
        ]
      },
      {
        "heading": "Why is everyone posting the fancy cafe video?",
        "paragraphs": [
          "The Fancy Cafe video is easy to remix because the joke stays recognizable when the characters change. The visual setup, embarrassing realization and quiet correction also make the scene understandable without much dialogue. Those are reasons the format can appeal to viewers, not measured proof of why a feed recommends it.",
          "Know Your Meme documents character-replacement versions of the cafe scene. Seeing many versions in your own feed does not establish that everyone is posting it or that a new upload will get the same attention. A personalized version can still be fun without chasing a view count."
        ]
      },
      {
        "heading": "Where did the fancy cafe meme come from?",
        "paragraphs": [
          "Know Your Meme traces the Fancy Cafe meme to a TikTok post by @leehoustonx that it dates to November 1, 2026. Its entry describes an AI-generated wrong-seat skit followed by character-replacement versions on TikTok and Instagram.",
          "The entry remains under evaluation, and we have not independently verified the earliest upload or its exact publication date. Treat that account as a documented source lead rather than proof that no earlier version exists. A later AI template page is not the same thing as the original post."
        ],
        "links": [
          {
            "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
            "label": "Read Know Your Meme’s origin account"
          },
          {
            "href": "/blog/first-time-in-a-fancy-cafe-meme-origin",
            "label": "Origin, creator credit and what is verified"
          }
        ]
      },
      {
        "heading": "Who started the first time in a fancy cafe trend?",
        "paragraphs": [
          "Know Your Meme credits @leehoustonx with the originating TikTok post. The linked TikTok page does identify @leehoustonx, but seeing an uploader name does not independently establish who invented the joke or made the earliest version.",
          "The creator of a source clip, a popular remixer and the developer of an AI generator can be different people. We distinguish those roles instead of crediting the trend to whichever repost has the most visibility. Our November 6, 2026 check found the encyclopedia entry still under review."
        ],
        "links": [
          {
            "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
            "label": "View the linked @leehoustonx post"
          }
        ]
      },
      {
        "heading": "Why is the guy sitting on the table?",
        "paragraphs": [
          "The guy sits on the small table because, in the skit, he mistakes it for a stool. The cafe regular sits on the bench instead, showing both the protagonist and the viewer how the furniture is meant to be used.",
          "The funny moment is the attempt to correct an obvious mistake discreetly. The table and bench need to remain visible for that reveal to work. If an AI remake hides the furniture or moves the protagonist before the regular sits down, the same caption will not rescue the joke."
        ]
      },
      {
        "heading": "What's the song in the fancy cafe meme?",
        "paragraphs": [
          "Know Your Meme identifies the track in the @leehoustonx clip as “Oh Yeah?” by Steve Lacy. That is a secondary-source attribution: the TikTok page we checked displays “original sound - leehoustonx”, which does not independently confirm a recording title.",
          "Reposts can change or speed up audio, so check the sound attached to the specific video you mean. Our completed videos include the original music from the Fancy Cafe reference video; you do not need to add it yourself. We have not independently matched our audio asset to a named commercial recording."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "Reference soundtrack, song attribution and captions"
          }
        ]
      },
      {
        "heading": "Is the fancy cafe video AI-generated?",
        "paragraphs": [
          "The @leehoustonx version is described as AI-generated by Know Your Meme, and videos created with this website are AI-generated recreations. The caption “first time in a fancy cafe” alone cannot prove whether a different clip is generated, filmed or edited.",
          "For a particular repost, check the uploader’s disclosure and trace the source. Odd hands or changing furniture can raise questions, but one visual artifact is not conclusive evidence. A natural-looking result is not proof of real footage either."
        ],
        "links": [
          {
            "href": "/blog/is-first-time-in-a-fancy-cafe-video-ai-generated",
            "label": "How to check a Fancy Cafe clip’s provenance"
          }
        ]
      },
      {
        "heading": "How can I make my own Fancy Cafe meme video?",
        "paragraphs": [
          "Fancy Cafe AI at firsttimeinafancycafeai.org lets you turn a portrait into a 20-second version of the wrong-seat joke. Upload one consenting adult portrait for the protagonist. Add an optional second portrait to replace the cafe regular; otherwise, keep the reference-style regular.",
          "Choose 480p for $6.99 or 720p for $9.99, and 9:16 vertical or 16:9 landscape. The completed MP4 includes the original music from the Fancy Cafe reference video. This is a reference-guided AI recreation, not an exact edit of every original frame, so faces and comic timing can vary.",
          "The studio is a convenient way to try a funny personalized version without filming the cafe scene yourself. Review the result, download it within 30 days and share it through your chosen app. Fancy Cafe AI is independent of the original creators, TikTok and CapCut."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your own Fancy Cafe AI video"
          },
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "See the photo-to-video steps"
          }
        ]
      }
    ],
    "related": [
      "first-time-in-a-fancy-cafe-meme-origin",
      "is-first-time-in-a-fancy-cafe-video-ai-generated",
      "fancy-cafe-ai-music-and-captions",
      "how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video"
    ],
    "sources": [
      {
        "label": "Know Your Meme — Your First Time In a Fancy Cafe",
        "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
        "note": "Read November 6, 2026. A submission still under evaluation; creator, date, AI and song attributions below are its reporting, not our independent proof of the earliest upload."
      },
      {
        "label": "TikTok — @leehoustonx cafe post",
        "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
        "note": "Checked November 6, 2026. The visible post identifies @leehoustonx and “original sound - leehoustonx”. That sound label does not name the underlying recording."
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
    "updatedAt": "2026-11-06",
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
          "For a verified technical failure or inaccessible delivery, contact support with your order reference. We review the issue and may offer redelivery or a discretionary refund to the original payment method. After successful generation and delivery, subjective dissatisfaction alone does not guarantee a refund. Do not pay again while an existing order is pending. Describe any concrete technical issue, such as an unplayable or missing file, without sending card details. AI likeness, motion and timing can vary."
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
    "title": "What song is in the Fancy Cafe meme? Music and caption guide",
    "description": "Song attribution for the Fancy Cafe meme, the original reference music included in your generated MP4, and where to place a POV caption.",
    "answer": "Your completed 20-second video includes the original music from the Fancy Cafe reference video; you do not need to add it yourself. Download the MP4 and add a short POV caption in your editor if desired. Music supports the joke, but the seating reveal must work visually. Inclusion does not grant a separate commercial music license.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "The meme & music",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What's the song in the fancy cafe meme?",
        "paragraphs": [
          "Know Your Meme names “Oh Yeah?” by Steve Lacy as the track in the @leehoustonx Fancy Cafe clip. The TikTok page we checked instead shows “original sound - leehoustonx”. We can report the encyclopedia’s attribution, but that generic platform label does not independently verify the song.",
          "Different reposts can use different edits or sounds. To identify the music in a specific version, open that post’s sound page and compare its artist and title credits with the actual recording. We have not independently identified our reference audio as a named commercial recording."
        ],
        "links": [
          {
            "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
            "label": "Read the reported song attribution"
          },
          {
            "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
            "label": "Check the linked post’s sound label"
          }
        ]
      },
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
          "The studio generates silent footage first, then merges the original music from the Fancy Cafe reference video into the final 20-second MP4. Silent generation is an intermediate step, not the finished product. The model is not asked to recreate the song or clone a voice.",
          "The original reference soundtrack is included, but exact synchronization of every movement is not guaranteed. This service does not grant a separate license to reuse the music commercially or redistribute it. Check the rights and platform conditions for your intended use."
        ]
      },
      {
        "heading": "Where should the caption go?",
        "paragraphs": [
          "Keep text out of the lower seating area and away from faces. The viewer needs to see the tabletop, bench and protagonist movement. Add the caption in an editor after generation rather than asking the video model to render readable text."
        ],
        "steps": [
          "Preview the completed video with its included soundtrack.",
          "Add one short opening caption in a safe upper area.",
          "Keep the included music, or replace it in your editor with audio you are permitted to use.",
          "Watch the final export to check that text and audio do not obscure the reveal."
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "first-time-in-a-fancy-cafe-meme-origin",
      "how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels",
      "download-fancy-cafe-ai-video"
    ],
    "sources": [
      {
        "label": "Know Your Meme — Your First Time In a Fancy Cafe",
        "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
        "note": "Read November 6, 2026. A submission still under evaluation; creator, date, AI and song attributions below are its reporting, not our independent proof of the earliest upload."
      },
      {
        "label": "TikTok — @leehoustonx cafe post",
        "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
        "note": "Checked November 6, 2026. The visible post identifies @leehoustonx and “original sound - leehoustonx”. That sound label does not name the underlying recording."
      }
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
  },
  {
    "slug": "how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels",
    "title": "How to make a POV Your First Time in a Fancy Cafe AI video for TikTok and Reels",
    "description": "Make a POV wrong-seat cafe video from one adult portrait, choose a vertical frame, review the result and add a caption before sharing it on TikTok or Reels.",
    "answer": "To make a POV Your First Time in a Fancy Cafe AI video for a portrait feed, upload one consenting adult portrait, optionally add the cafe regular, select 9:16, and review the one-time price before checkout. After generation, download the MP4 in the same browser, check the wrong-seat reveal, and add your POV caption in your publishing editor. This studio does not post to social accounts.",
    "date": "November 6, 2026",
    "publishedAt": "2026-11-06",
    "updatedAt": "2026-11-06",
    "category": "Making & saving",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Cafe reference frame showing the wrong-seat setting, not a guaranteed generated output",
    "sections": [
      {
        "heading": "What does “POV: Your First Time in a Fancy Cafe” mean?",
        "paragraphs": [
          "POV means “point of view”: the caption asks viewers to imagine the first-time visitor who mistakes a small cafe table for a seat. It does not require a literal first-person camera shot; showing the person and the bench together makes the joke readable.",
          "The sequence matters more than the caption: the visitor sits on the table, the regular uses the bench, the visitor realizes the error, and then moves. This is a visual comedy scene, not advice on cafe etiquette."
        ],
        "links": [
          {
            "href": "/blog/your-first-time-in-a-fancy-cafe-meme-explained",
            "label": "See the four beats of the wrong-seat meme"
          },
          {
            "href": "/blog/is-first-time-in-a-fancy-cafe-video-ai-generated",
            "label": "Is the scene AI-generated or filmed?"
          }
        ]
      },
      {
        "heading": "How do I make a vertical POV cafe video from my photo?",
        "paragraphs": [
          "Start with one clear, consenting adult portrait for the first-time visitor. The second portrait is optional and replaces the cafe regular who sits on the bench. In this studio, choose 9:16 for a tall frame and review the 20-second result, resolution and one-time checkout price before paying.",
          "You do not need to upload or edit the original meme clip. This tool creates new reference-guided frames from your photo; exact facial likeness, furniture and comic timing can vary. A 16:9 wide frame is also available if that better suits your destination."
        ],
        "steps": [
          "Upload a JPG, PNG or WebP portrait with one visible adult face to Protagonist.",
          "Optional: upload a separate portrait to replace the cafe regular.",
          "Choose 9:16 and either 480p or 720p. Confirm the displayed price before checkout.",
          "After payment, monitor your existing order in the same browser; do not pay again while it processes."
        ],
        "links": [
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "Full photo-to-video studio walkthrough"
          },
          {
            "href": "/blog/fancy-cafe-ai-photo-tips",
            "label": "Pick a photo that shows the face clearly"
          }
        ]
      },
      {
        "heading": "What should I check before adding a POV caption?",
        "paragraphs": [
          "Watch the completed MP4 before sharing: the table and bench should both be visible, the second person should sit on the bench, and the protagonist should move only after noticing the mistake. Download the file from Generated videos within 30 days; the website does not preserve it indefinitely.",
          "Add a short caption such as “POV: your first time in a fancy cafe” in your own editor after downloading. Keep the text away from faces and the table-versus-bench reveal. If the shot does not read clearly without text, a caption alone will not repair the seating story."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Find and download your finished MP4"
          },
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "Caption placement and music rights"
          }
        ]
      },
      {
        "heading": "Can I post it directly to TikTok or Instagram Reels?",
        "paragraphs": [
          "No. This studio generates and lets you download an MP4; it does not connect to TikTok or Instagram or publish on your behalf. Upload the saved file through the platform or editor you choose, and preview the final crop and caption there.",
          "Only upload portraits of consenting adults. A sample video or a trending track is not proof that you have rights to reuse someone else’s audio or footage; check the rights for the sound you choose. Sharing does not guarantee views or a result identical to the reference."
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-music-and-captions",
      "download-fancy-cafe-ai-video"
    ],
    "faqs": [
      {
        "question": "Do I need the original Fancy Cafe video to make a POV version?",
        "answer": "No. Upload your own consenting adult portrait to the studio. It uses a scene reference to generate new frames; it does not edit the original clip."
      },
      {
        "question": "Does Fancy Cafe AI upload the finished video to TikTok or Reels?",
        "answer": "No. Download the completed MP4 in the same browser, then upload it yourself through your chosen platform. You can add a short POV caption in your editor."
      }
    ]
  },
  {
    "slug": "first-time-in-a-fancy-cafe-meme-origin",
    "title": "Where did the First Time in a Fancy Cafe meme come from?",
    "description": "Who started the Fancy Cafe trend? Follow the reported @leehoustonx source, separate creator credit from remixes, and understand the limits of the evidence.",
    "answer": "Know Your Meme traces the Fancy Cafe meme to @leehoustonx on TikTok and dates the post to November 1, 2026. We verified the linked account and sound label, not that it was the earliest upload. The encyclopedia entry is still under evaluation, so its creator credit should be attributed rather than treated as settled history.",
    "date": "November 6, 2026",
    "publishedAt": "2026-11-06",
    "updatedAt": "2026-11-06",
    "category": "The meme & music",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Fancy Cafe reference scene illustrating the wrong-seat joke, not evidence of the earliest upload",
    "sections": [
      {
        "heading": "Who is credited with the original Fancy Cafe video?",
        "paragraphs": [
          "Know Your Meme credits TikTok user @leehoustonx with the source video for the First Time in a Fancy Cafe trend. Its origin account describes the visitor mistaking a table for a chair, then correcting the mistake after a woman sits on the bench.",
          "This is a useful lead, but the encyclopedia labels the entry as a submission under evaluation. We have not independently established the earliest upload. Calling someone the uploader of the linked clip is narrower and more defensible than claiming that person invented every version of the joke."
        ],
        "links": [
          {
            "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
            "label": "Read the attributed origin report"
          }
        ]
      },
      {
        "heading": "What could we verify on the source post?",
        "paragraphs": [
          "The TikTok post checked on November 6, 2026 displayed the account @leehoustonx, a 21-second player and the label “original sound - leehoustonx”. Those details identify the linked post; they do not independently establish the recording title or the exact upload date.",
          "The date November 1, 2026 comes from Know Your Meme. TikTok showed a relative date during our check, so we do not present an exact timestamp as independently confirmed. Our generator’s 20-second output is a product setting, not a claim about the length of every source or remix."
        ],
        "table": {
          "caption": "Source evidence and its limits",
          "headers": [
            "Evidence",
            "What it supports",
            "What it does not establish"
          ],
          "rows": [
            [
              "TikTok account and post",
              "A specific @leehoustonx upload",
              "Earliest authorship or ownership of every element"
            ],
            [
              "Know Your Meme origin section",
              "An attributed creator and date account",
              "An independently verified complete upload history"
            ],
            [
              "TikTok original-sound label",
              "The sound page attached to that post",
              "A named song or a reuse licence"
            ],
            [
              "Matching caption on another upload",
              "Use of the same meme phrase",
              "Same creator, same footage or same soundtrack"
            ]
          ]
        },
        "links": [
          {
            "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
            "label": "Open the linked TikTok post"
          }
        ]
      },
      {
        "heading": "Why do several accounts appear in searches for the original?",
        "paragraphs": [
          "Searches can return source clips, character remixes, reposts and generator tutorials together. All can use the same Fancy Cafe caption. Their titles do not tell you which account filmed or generated the source, which remixed it, or which merely reposted it.",
          "A useful credit distinguishes the roles: source post, remake creator, and tool used. Fancy Cafe AI is an independent generation tool, not the original uploader. A visible watermark is a clue to trace, not automatic proof that the watermarked account originated the scene."
        ]
      },
      {
        "heading": "How can I check a claim about the original creator?",
        "paragraphs": [
          "Start with a direct post link rather than a cropped screenshot or a search snippet. Compare the account, visible publication information, caption and source credit. If the post is unavailable or login-gated, say what you could verify instead of inventing a missing date.",
          "Two different uploads can reuse the same joke without being the same file. A changed face, shortened ending or new sound may indicate a remix, but those differences alone do not prove the direction of copying."
        ],
        "steps": [
          "Save the direct URL of the clip you want to identify.",
          "Read the uploader’s caption and any source credit.",
          "Follow the credited source and compare the actual scenes.",
          "Keep uploader identity separate from claims about earliest authorship."
        ]
      },
      {
        "heading": "How can I make a personal version of the cafe joke?",
        "paragraphs": [
          "Use Fancy Cafe AI to create a new reference-guided version from your own consenting adult portrait instead of presenting another creator’s upload as yours. The protagonist replaces the visitor on the table; the optional second portrait replaces the cafe regular.",
          "The studio makes a 20-second MP4 with the original music from the Fancy Cafe reference video. Choose 480p or 720p and vertical or landscape framing before checkout. This is a way to try the same funny setup with a new cast, not proof of affiliation with the source creator."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Try the Fancy Cafe video generator"
          },
          {
            "href": "/blog/your-first-time-in-a-fancy-cafe-meme-explained",
            "label": "Read all eight meme questions and answers"
          }
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "is-first-time-in-a-fancy-cafe-video-ai-generated",
      "fancy-cafe-ai-music-and-captions",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video"
    ],
    "sources": [
      {
        "label": "Know Your Meme — Your First Time In a Fancy Cafe",
        "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
        "note": "Read November 6, 2026. A submission still under evaluation; creator, date, AI and song attributions below are its reporting, not our independent proof of the earliest upload."
      },
      {
        "label": "TikTok — @leehoustonx cafe post",
        "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
        "note": "Checked November 6, 2026. The visible post identifies @leehoustonx and “original sound - leehoustonx”. That sound label does not name the underlying recording."
      }
    ]
  },
  {
    "slug": "is-first-time-in-a-fancy-cafe-video-ai-generated",
    "title": "Is the First Time in a Fancy Cafe video AI-generated?",
    "description": "Understand which Fancy Cafe videos are described as AI, how to check a repost, and how photo-guided generation differs from editing the original clip.",
    "answer": "Fancy Cafe AI generates new videos, and Know Your Meme describes the linked @leehoustonx source as AI-generated. That does not classify every video with the same caption. Check the particular uploader and source; visual glitches alone cannot prove that a clip is AI.",
    "date": "November 6, 2026",
    "publishedAt": "2026-11-06",
    "updatedAt": "2026-11-06",
    "category": "The meme & music",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Fancy Cafe reference scene illustrating the wrong-seat joke, not evidence of the earliest upload",
    "sections": [
      {
        "heading": "Is the original Fancy Cafe clip AI or real footage?",
        "paragraphs": [
          "Know Your Meme describes the @leehoustonx Fancy Cafe source clip as AI-generated. That is an attributed description, not a forensic conclusion we reached from the video file. Its entry is still under evaluation.",
          "The wrong-seat scene could also be staged by people in a real cafe. A caption naming the meme does not resolve how a specific repost was made. Separate the story shown in the clip from the process used to produce it."
        ],
        "links": [
          {
            "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
            "label": "Read the source’s AI classification"
          },
          {
            "href": "/blog/first-time-in-a-fancy-cafe-meme-origin",
            "label": "See the creator-attribution limits"
          }
        ]
      },
      {
        "heading": "How can I tell whether a particular Fancy Cafe repost uses AI?",
        "paragraphs": [
          "Check the uploader’s generation disclosure, credited tool or linked source before judging the pixels. Direct information about how a clip was made is more useful than assuming that every video using the Fancy Cafe caption has the same production history.",
          "Changing furniture, inconsistent hands or shifting faces can be reasons to inspect a clip more closely. They are not proof on their own: compression, edits and motion blur can also produce odd frames. Equally, an absence of visible glitches does not prove that a scene was filmed."
        ],
        "steps": [
          "Find the direct post and read the caption or production notes.",
          "Follow source credits rather than relying on a repost’s title.",
          "Watch the table, bench, faces and contact with furniture across the sequence.",
          "If the origin remains unclear, describe it as unverified rather than assigning certainty."
        ]
      },
      {
        "heading": "Does this website swap faces into the exact original frames?",
        "paragraphs": [
          "No. Fancy Cafe AI uses portraits and a scene reference to generate new frames around the wrong-seat sequence. The finished MP4 is an AI recreation, not a literal frame-by-frame face edit of the source video.",
          "One portrait identifies the protagonist. A second portrait is optional and identifies the cafe regular. The model can vary faces, furniture and timing, so a reference is guidance rather than a guarantee of exact staging or likeness."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-two-people",
            "label": "Understand the two photo roles"
          },
          {
            "href": "/blog/fix-fancy-cafe-ai-face-and-seat-errors",
            "label": "Check face and seating problems"
          }
        ]
      },
      {
        "heading": "Does real music mean the video itself is real?",
        "paragraphs": [
          "No. A video can combine generated pictures with an existing soundtrack. Fancy Cafe AI first creates silent AI footage, then merges the original music from the Fancy Cafe reference video into the delivered 20-second MP4.",
          "The soundtrack does not establish that the people were filmed in a cafe or that the AI model generated the music. Users do not need to add the reference soundtrack manually. Music inclusion also does not grant a separate commercial reuse licence."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "How the included soundtrack works"
          }
        ]
      },
      {
        "heading": "How should I describe my generated version when sharing?",
        "paragraphs": [
          "Describe a result made here as an AI recreation of the Fancy Cafe meme, not footage of a real event. Use consenting adult portraits, and do not suggest that someone actually visited the cafe or endorsed the video.",
          "A simple description such as “My AI version of the fancy cafe seating joke” explains both the format and the creation method. Watch the full result before posting so the faces, seating reveal and caption communicate what you intended."
        ]
      },
      {
        "heading": "How can I try making a Fancy Cafe AI video?",
        "paragraphs": [
          "Open the Fancy Cafe AI studio to turn a portrait into your own 20-second wrong-seat scene. Upload the protagonist, optionally replace the cafe regular, then choose 9:16 or 16:9 and 480p ($6.99) or 720p ($9.99).",
          "The finished MP4 includes the reference soundtrack and can be downloaded for sharing. It is a simple way to try the joke without filming it yourself. Review and save your result within 30 days; the studio does not publish to social accounts for you."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Create your Fancy Cafe AI version"
          },
          {
            "href": "/blog/your-first-time-in-a-fancy-cafe-meme-explained",
            "label": "All eight Fancy Cafe meme questions answered"
          }
        ]
      }
    ],
    "related": [
      "your-first-time-in-a-fancy-cafe-meme-explained",
      "first-time-in-a-fancy-cafe-meme-origin",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fix-fancy-cafe-ai-face-and-seat-errors"
    ],
    "sources": [
      {
        "label": "Know Your Meme — Your First Time In a Fancy Cafe",
        "href": "https://knowyourmeme.com/memes/your-first-time-in-a-fancy-cafe",
        "note": "Read November 6, 2026. A submission still under evaluation; creator, date, AI and song attributions below are its reporting, not our independent proof of the earliest upload."
      },
      {
        "label": "TikTok — @leehoustonx cafe post",
        "href": "https://www.tiktok.com/@leehoustonx/video/7703227788160961806",
        "note": "Checked November 6, 2026. The visible post identifies @leehoustonx and “original sound - leehoustonx”. That sound label does not name the underlying recording."
      }
    ]
  }
];
export const tinyGuides = allTinyGuides;
export const featuredTinyGuides = [...allTinyGuides.slice(0, 5), allTinyGuides[10]];
