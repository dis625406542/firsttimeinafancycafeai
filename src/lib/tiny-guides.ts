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
    "description": "Make the Fancy Cafe trend with your own picture, without manual editing. Follow the upload, payment and download steps for a 20-second video with original music.",
    "answer": "To make your own Your First Time in a Fancy Cafe AI video, upload a protagonist portrait to the studio, optionally add the cafe regular, choose a resolution and aspect ratio, then confirm payment. The studio generates a 20-second scene and adds the original music from the reference video before delivering your MP4.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Getting started",
    "minutes": "5 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What should I prepare first?",
        "paragraphs": [
          "Prepare one clear portrait of yourself or another consenting adult for the protagonist. A second portrait is needed only if you want to replace the cafe regular; you do not need to upload a video, provide music or write a custom prompt.",
          "Choose a well-lit image with one unobstructed face. Avoid group photos, sunglasses and heavy filters. The protagonist is the person who mistakenly sits on the small table; the regular is the woman who sits on the bench and makes the mistake apparent."
        ],
        "image": {
          "src": "/fancy-cafe-ai/before-upload.webp",
          "alt": "Studio upload example showing separate protagonist and optional cafe regular portraits",
          "caption": "Studio upload example: the protagonist portrait is required; the cafe regular portrait is optional.",
          "width": 561,
          "height": 796
        },
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-photo-tips",
            "label": "Check your portrait before uploading"
          }
        ]
      },
      {
        "heading": "How do I make the fancy cafe trend with my own picture?",
        "paragraphs": [
          "Upload your own clear adult portrait to the protagonist slot in the Fancy Cafe AI studio, choose your resolution and aspect ratio, then review and pay for the order. The studio generates a personalized 20-second version of the wrong-seat meme with the original reference music included.",
          "Your picture identifies the person who sits on the small table and later moves to the bench. One portrait is enough to start; upload a second only if you also want to personalize the cafe regular. You do not need to record yourself acting out the joke."
        ],
        "steps": [
          "Open the studio and click the protagonist image to upload your portrait. Wait for the photo check to finish.",
          "Optionally click the cafe regular image and upload a second portrait. Leave it empty to use a reference-style regular.",
          "Choose 480p or 720p and either 9:16 vertical or 16:9 horizontal. Confirm that you have permission to use the portraits.",
          "Review the characters, 20-second duration, resolution, aspect ratio and price in the confirmation dialog, then continue to secure checkout.",
          "Confirm payment and return in the same browser to follow the order. Keep the browser cookies and your order reference.",
          "When the result is ready, play it with sound and download the finished MP4 within 30 days."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          },
          {
            "href": "/blog/fancy-cafe-ai-two-people",
            "label": "Choose one photo or personalize both people"
          },
          {
            "href": "/blog/how-to-create-fancy-cafe-ai-video-on-phone",
            "label": "Follow the mobile walkthrough"
          }
        ]
      },
      {
        "heading": "Which resolution and aspect ratio should I choose?",
        "paragraphs": [
          "Choose 480p for $6.99 or 720p for $9.99 per 20-second video. Both choices include the original reference music; the resolution determines output size, not a different storyline or a guarantee of better facial likeness.",
          "Choose 9:16 when you want a vertical video, or 16:9 when you want a horizontal video. Your order produces the selected format, not both. Review the final checkout summary so the paid order matches the option you intended."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-price-and-free-options",
            "label": "Understand per-video pricing"
          }
        ]
      },
      {
        "heading": "Can I make this without editing anything?",
        "paragraphs": [
          "Yes. Fancy Cafe AI delivers a complete 20-second MP4 with the original music from the cafe reference video already included. You do not need to film the scene, write a prompt, build an editing timeline or manually combine the video and soundtrack.",
          "Choose the portraits and settings, confirm payment, and review the result when processing finishes. The studio handles the reference-guided visuals and soundtrack assembly. Extra captions, trimming or other personal edits are optional, not required to receive a video with sound.",
          "The soundtrack uses the reference recording rather than an AI imitation. Including it in the download does not grant unrestricted commercial music rights."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "Read about the included music and optional captions"
          },
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the portrait-to-video example with sound"
          }
        ]
      },
      {
        "heading": "How long does it take to generate the video?",
        "paragraphs": [
          "There is no fixed completion time: the wait depends on the processing queue, video generation and soundtrack assembly. The finished clip is 20 seconds in duration; that is not a promise that generation finishes in 20 seconds.",
          "After payment, return in the same browser to follow the existing order. A progress indicator shows that the workflow is in progress, not an exact countdown or a guaranteed finish time. Submitted jobs continue on the server, so keeping the tab open is not what makes the video generate.",
          "If the order still shows processing, do not pay again just to restart it. Keep your browser cookies and order reference. If a failure appears or you cannot recover the paid order, contact support with that reference so the order can be checked."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Find an existing paid order"
          },
          {
            "href": "/contact",
            "label": "Get help with your order"
          }
        ]
      },
      {
        "heading": "What should I check in the finished video?",
        "paragraphs": [
          "Play the result with sound and check the face, wrong-seat reveal and final reaction. The intended sequence is the protagonist on the table, the regular on the bench, the realization and the move to the correct seat.",
          "Compare your result with the three AI-generated examples on the homepage. The tool creates new reference-guided frames rather than editing each original frame; faces, hands and timing can vary. If an order is still processing, check its status instead of paying again just to find the result."
        ],
        "image": {
          "src": "/fancy-cafe-ai/generated-with-caption-poster.webp",
          "alt": "Still from the studio-generated Fancy Cafe example with a POV caption",
          "caption": "Actual studio-generated example, not reference footage. Watch the full clip with sound on the homepage; individual results vary.",
          "width": 480,
          "height": 854
        },
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the generated example with sound"
          },
          {
            "href": "/blog/fix-fancy-cafe-ai-face-and-seat-errors",
            "label": "Review face and seat issues"
          }
        ]
      },
      {
        "heading": "How do I save and share my video?",
        "paragraphs": [
          "Download the completed MP4 within 30 days of completion and keep your own copy. The browser can help you return to the order, but browser history is not a permanent backup of the video file.",
          "The download contains the video and soundtrack together. Share it yourself on the platform you choose, with permission for the people and media involved; the studio does not publish to your social accounts. If you are still deciding which workflow to use, the tool guide answers the main questions before you start."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Find and download your completed order"
          },
          {
            "href": "/blog/fancy-cafe-ai-video-generator",
            "label": "Fancy Cafe AI video generator: eight questions answered"
          },
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          }
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-video-generator",
      "fancy-cafe-ai-photo-tips",
      "fancy-cafe-ai-two-people",
      "fix-fancy-cafe-ai-face-and-seat-errors",
      "how-to-create-fancy-cafe-ai-video-on-phone"
    ]
  },
  {
    "slug": "fancy-cafe-ai-two-people",
    "title": "Can I Make the Fancy Cafe Meme with One or Two Photos?",
    "description": "One portrait is enough for the Fancy Cafe meme. Learn how to upload two separate portraits, personalize both roles, or make a video with your boyfriend or girlfriend.",
    "answer": "Yes. One photo personalizes the protagonist in the Fancy Cafe meme; two separate portraits let you personalize both the protagonist and the cafe regular. The second photo is optional. Assign each consenting adult to the labeled role, then create a 20-second video with the original reference music included.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Getting started",
    "minutes": "6 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Can I use just one photo to make the video?",
        "paragraphs": [
          "Yes. One clear portrait of a consenting adult is enough to make the Fancy Cafe video. Upload it to the protagonist slot and leave the cafe regular slot empty; your portrait guides the person who takes the wrong seat.",
          "One-photo mode still tells a two-character story. The other character is a reference-style cafe regular, not a second copy of your uploaded face. Her appearance may vary; leaving the optional slot empty does not guarantee the exact identity of the woman in the reference.",
          "The result is still a 20-second video with the original reference music included. Choose two photos only when you want a specific second person in that supporting role."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          }
        ]
      },
      {
        "heading": "Can I use two photos for the fancy cafe meme?",
        "paragraphs": [
          "Yes. Upload two separate portraits, one for each role: the protagonist who sits on the small table and the cafe regular who uses the bench. Each image should show one clear face, and both people must be consenting adults.",
          "Use separate individual photos rather than one couple or group photo. Two photos personalize the two characters in one video; they do not create two separate videos. Check the role thumbnails before checkout so the intended person appears in each slot."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-photo-tips",
            "label": "Prepare clear portraits for both roles"
          }
        ]
      },
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
        "heading": "How do I replace both people in the video?",
        "paragraphs": [
          "Upload the first person to Protagonist and the second person to Cafe regular, then check both previews before paying. The two labeled slots determine which face guides each role, not the order of pictures in your photo library.",
          "This creates a new reference-guided performance using both portraits. It does not paste faces into every frame of the original clip, so likeness, expressions and movements can vary. The homepage shows a generated example beside its input portraits to illustrate the workflow."
        ],
        "steps": [
          "Click the protagonist picture and upload the person you want to take the wrong seat. Wait for the photo check.",
          "Click the optional cafe regular picture and upload the other person. This role sits on the bench and reveals the mistake.",
          "Review both thumbnails. If a portrait is in the wrong slot, replace that upload before continuing.",
          "Choose the resolution and aspect ratio, confirm consent and review the order details before payment."
        ],
        "image": {
          "src": "/fancy-cafe-ai/before-upload.webp",
          "alt": "Studio example showing separate portrait uploads for the protagonist and optional cafe regular",
          "caption": "Studio upload example: use the two labeled slots to assign each portrait to its role.",
          "width": 561,
          "height": 796
        },
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the portrait-to-video example with sound"
          }
        ]
      },
      {
        "heading": "Can I make this video with my boyfriend or girlfriend?",
        "paragraphs": [
          "Yes. You can make the Fancy Cafe meme with your boyfriend or girlfriend using one separate portrait of each of you, provided you are both consenting adults. Decide who takes the wrong seat and who plays the cafe regular, then upload each person to that role.",
          "The scene remains the cafe joke rather than becoming a different romantic storyline. Roles describe actions, not gender: choose who carries the awkward realization and who reveals the correct seat. Get your partner's permission before uploading their photo or sharing the finished clip.",
          "You can also start with just your own portrait and leave the regular slot empty. Uploading your partner is optional, not a requirement for making the meme."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          }
        ]
      },
      {
        "heading": "Can either role be played by a woman or a man?",
        "paragraphs": [
          "Yes. The two roles describe actions, not gender. Choose clear adult photos and keep the role labels consistent. Do not ask the model to infer who belongs on the table from appearance.",
          "Avoid uploading the same face to both slots unless you intend two similar-looking characters; even then, AI may blend identities. Distinct individual photos make the role assignment easier to review."
        ]
      },
      {
        "heading": "What do I receive after choosing the characters?",
        "paragraphs": [
          "Fancy Cafe AI turns your selected portraits into one 20-second MP4 with the original reference music included. One-photo and two-photo orders use the same resolution-based pricing: $6.99 for 480p or $9.99 for 720p.",
          "Choose 9:16 vertical or 16:9 horizontal and review the final price before checkout. After processing, preview the video with sound and download it within 30 days of completion. No manual soundtrack assembly is needed."
        ],
        "links": [
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "Follow the complete photo-to-video steps"
          },
          {
            "href": "/blog/fancy-cafe-ai-video-generator",
            "label": "Learn what the Fancy Cafe AI video maker does"
          },
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          }
        ]
      },
      {
        "heading": "Can I put myself and my friend in the fancy cafe meme using two photos?",
        "paragraphs": [
          "Yes. Upload one separate portrait of yourself and one of your friend, provided you are both adults and each person agrees to the use of their image. Put the person who takes the wrong seat in Protagonist; put the person who reveals the correct seat in Cafe regular.",
          "Review both labeled previews before checkout. Two photos personalize the existing two roles, not a group scene, and the optional second portrait does not add a fee to the selected resolution. Leaving the regular slot empty keeps a reference-style second character."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-photo-tips",
            "label": "Choose clear individual portraits"
          }
        ]
      },
      {
        "heading": "Can I make a funny version with my friends?",
        "paragraphs": [
          "Yes, with one friend in each two-person video: the humor comes from choosing who makes the seating mistake and who calmly uses the bench. This template has two roles, not a group cast, so it cannot place a whole circle of friends into one scene.",
          "Choose a consenting adult friend who enjoys being part of the joke, agree on the roles, and share the result as an AI remake rather than a recording of something they really did. Making several different pairings means separate video orders; it is not an unlimited group package."
        ]
      },
      {
        "heading": "Can I make my girlfriend the person walking in?",
        "paragraphs": [
          "Yes. With her permission, upload a separate adult portrait of your girlfriend to Cafe regular, the optional second slot. That is the role intended to enter and sit on the bench while the protagonist notices the seating mistake; Protagonist is the wrong-seat visitor.",
          "The roles describe actions rather than gender, so the same assignment works for a boyfriend or another consenting adult. The reference guides the entrance and reveal, but exact walking motion, facial expression and timing can vary in a newly generated video."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Assign your two character photos"
          }
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "how-to-create-fancy-cafe-ai-video-on-phone",
      "fancy-cafe-ai-video-generator",
      "fancy-cafe-ai-photo-tips",
      "fix-fancy-cafe-ai-face-and-seat-errors",
      "fancy-cafe-ai-photo-privacy"
    ]
  },
  {
    "slug": "fancy-cafe-ai-photo-tips",
    "title": "What photos work best for a Fancy Cafe AI video?",
    "description": "Choose clear adult portraits for a Fancy Cafe AI video. Check face visibility, lighting, image format, consent and common upload mistakes.",
    "answer": "Use a sharp, well-lit photo containing one consenting adult, with a visible face and no heavy obstruction. Fancy Cafe AI accepts JPG, PNG and WebP files up to 10 MB. A separate portrait is needed for each personalized role; a group selfie is not recommended.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Getting started",
    "minutes": "4 min read",
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
      },
      {
        "heading": "Can I use my own selfie?",
        "paragraphs": [
          "Yes. Use a sharp selfie of yourself as a consenting adult, with your face visible and evenly lit. Upload it to Protagonist to play the visitor who takes the wrong seat. JPG, PNG and WebP files up to 10 MB are accepted by the upload interface.",
          "Prefer a photo taken at eye level without sunglasses, a strong beauty filter or another face beside yours. For two personalized characters, use a separate portrait in each slot rather than one group selfie. The studio optimizes the uploaded image for processing; good input helps identity but does not guarantee an exact likeness."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-photo-privacy",
            "label": "Understand how uploaded portraits are stored"
          }
        ]
      },
      {
        "heading": "Can I put my dog in the fancy cafe meme?",
        "paragraphs": [
          "No. Pets are not supported by this Fancy Cafe template. It is designed for one or two consenting adult human portraits and a two-person seating scene, so a dog photo is not an appropriate input for either character slot.",
          "Do not buy a video expecting this workflow to turn an animal into the cafe visitor. To personalize the joke here, use your own adult portrait, optionally add another consenting adult as the regular, and keep the pet out of the upload."
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-two-people",
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fix-fancy-cafe-ai-face-and-seat-errors",
      "fancy-cafe-ai-photo-privacy"
    ]
  },
  {
    "slug": "fancy-cafe-ai-vs-capcut-template",
    "title": "Fancy Cafe AI generator vs. CapCut template: which do you need?",
    "description": "Choose a Fancy Cafe AI video maker for a 20-second portrait-based meme with original music, or an editor for cuts and captions on footage you already have.",
    "answer": "Choose Fancy Cafe AI when you want a portrait turned into the wrong-seat cafe meme: the studio delivers a 20-second MP4 with the original reference music already included. Choose an editing workflow when you already have footage and want to control cuts, captions or timing yourself. The right choice depends on whether you need new footage or edits to an existing clip.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Questions & answers",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "What is the difference between editing and generation?",
        "paragraphs": [
          "The key distinction is new footage versus existing footage. Fancy Cafe AI generates a new reference-guided cafe performance from portraits; an editing workflow arranges or changes footage you already have.",
          "A template name alone does not tell you whether it includes AI generation or character personalization. Check the specific template rather than treating every CapCut template as the same product."
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
        "heading": "Why choose Fancy Cafe AI for this particular meme?",
        "paragraphs": [
          "Choose this first time in a fancy cafe AI video maker when your goal is a finished, personalized version of the wrong-seat joke without filming it or building an editing timeline. One portrait is enough; replacing the cafe regular is optional.",
          "The studio delivers a 20-second MP4 with the original music from the reference video already included. You do not need to find the soundtrack, write the scene prompt or manually combine audio and video. It is a focused workflow for this meme, rather than a general editor."
        ],
        "bullets": [
          "480p costs $6.99 and 720p costs $9.99 per video; no subscription or credit bundle.",
          "Select 9:16 vertical or 16:9 horizontal output before checkout.",
          "Personalize the protagonist alone or both characters.",
          "Download the finished video with its soundtrack within 30 days of completion."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-video-generator",
            "label": "Fancy Cafe AI video generator: eight questions answered"
          }
        ]
      },
      {
        "heading": "What does an actual generated result look and sound like?",
        "paragraphs": [
          "The homepage includes three labeled AI-generated cafe examples, including one beside the portraits used to make it. Play the examples with sound to evaluate the scene, reaction and included music together.",
          "The example is a concrete way to decide whether this style fits your idea. It is not a promise of identical faces, expressions or timing on a new order. This guide is written by the studio team and recommends the tool for its specific workflow, not as an independent ranking of competing services."
        ],
        "image": {
          "src": "/fancy-cafe-ai/generated-with-caption-poster.webp",
          "alt": "Still from the studio-generated Fancy Cafe example with a POV caption",
          "caption": "Actual studio-generated example, not reference footage. Watch the full clip with sound on the homepage; individual results vary.",
          "width": 480,
          "height": 854
        },
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the generated example with sound"
          }
        ]
      },
      {
        "heading": "When is an editing workflow the better fit?",
        "paragraphs": [
          "Use an editor if your main task is changing captions, trimming footage or controlling the timing of an existing clip. Those are different needs from generating a new cafe performance around a portrait.",
          "Our generator does not provide a frame-by-frame editing timeline or an official CapCut template. If you already like your footage, recreating it with AI introduces changes you may not need. If you need a new personalized cafe scene, start with the studio and make any optional edits afterward."
        ],
        "links": [
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "Create a cafe scene from your photo"
          },
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          }
        ]
      },
      {
        "heading": "Does the AI video look like the original meme?",
        "paragraphs": [
          "The intended resemblance is the story: a visitor sits on the small table, a regular sits on the bench, and the visitor notices the mistake and moves. Fancy Cafe AI generates new reference-guided footage with your portrait, rather than replacing a face inside every frame of the original clip.",
          "Your finished video includes the original reference music, but the face, clothing, furniture, camera framing and timing may differ. Our homepage labels all three AI-generated examples so you can judge actual results; they are not the source footage."
        ],
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the studio-generated example"
          }
        ]
      },
      {
        "heading": "Is there a fancy cafe CapCut template?",
        "paragraphs": [
          "This website is a Fancy Cafe AI generator, not a CapCut template or an official CapCut service. We do not maintain a verified live template link for this meme, so we cannot promise that a particular template is available in your app or region.",
          "If you find a template, preview what it actually changes: a caption or photo montage is not the same as generating a new wrong-seat performance with your face. Use an editing template for footage you already have; use this studio when you want to create the cafe scene from portraits. Check any template price and export conditions before importing personal photos."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-video-generator",
            "label": "See what this portrait-based generator creates"
          }
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-video-generator",
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
    "description": "Original reference music is included in your Fancy Cafe AI video. Learn about captions, personal non-commercial sharing and why commercial-use rights are not included.",
    "answer": "Your completed 20-second video includes the original music from the Fancy Cafe reference video; you do not need to add it yourself. Download the MP4 and add a short POV caption in your editor if desired. Music supports the joke, but the seating reveal must work visually. Made for personal entertainment and non-commercial social sharing. No commercial-use license is included. Music rights and platform rules still apply.",
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
        "heading": "Can I use my Fancy Cafe AI video commercially?",
        "paragraphs": [
          "Made for personal entertainment and non-commercial social sharing. No commercial-use license is included. Fancy Cafe AI is a playful way to put yourself into the wrong-seat meme and share a funny moment with friends, not a commercial-content licensing service.",
          "Your order does not authorize advertising, sponsored posts, client projects, resale or other commercial use. The included reference music does not come with a separate music license. Personal sharing must still respect music and portrait rights and the destination platform's rules; non-commercial use is not automatic permission to use copyrighted material."
        ],
        "links": [
          {
            "href": "/terms",
            "label": "Read the personal-use terms"
          },
          {
            "href": "/acceptable-use",
            "label": "Review portrait consent and sharing rules"
          }
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
      },
      {
        "heading": "How do I add the original sound to my video?",
        "paragraphs": [
          "You do not need to add it manually to a video made here. Fancy Cafe AI delivers a 20-second MP4 with the original music from our reference recording already included: the generated visuals are combined with that soundtrack before the final download is offered.",
          "If the homepage preview is silent, turn its sound on or play your downloaded file with the device volume enabled before assuming the track is missing. When sharing or editing, keep the existing audio if you want this version of the music; adding another copy can create an echo. The included recording does not grant a separate commercial music licence."
        ],
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Hear the soundtrack in a generated example"
          },
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Download the finished video with audio"
          }
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
    "title": "Fancy Cafe AI Pricing: Free Options, Watermarks and HD Downloads",
    "description": "What is free, what a 20-second Fancy Cafe AI video costs, and what 480p or 720p includes. Compare prices, music, watermark handling and download access.",
    "answer": "Fancy Cafe AI guides are free to browse. Personalized generation is priced at $6.99 for 480p or $9.99 for 720p, per 20-second video. Confirm the final price and availability at checkout; there is no free render or subscription offer.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Questions & answers",
    "minutes": "5 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "Is there a free fancy cafe AI video generator?",
        "paragraphs": [
          "Personalized generation on firsttimeinafancycafeai.org is paid, not a free trial. Reading the guides and watching the examples is free; making your own 20-second video costs $6.99 at 480p or $9.99 at 720p.",
          "Other tools may offer free credits or template previews, but a free preview is not necessarily a downloadable custom video. Check whether the offer includes portrait replacement, the full duration, sound and export before comparing it with a finished MP4."
        ]
      },
      {
        "heading": "Can I make the fancy cafe meme for free?",
        "paragraphs": [
          "You can recreate the wrong-seat joke without paying this studio by filming your own performance and editing it with tools you already have. This is a different workflow from generating new cafe footage from a selfie; this site does not offer free personalized generation.",
          "For a filmed version, establish the table and bench, show the visitor taking the wrong seat, have the regular sit correctly, then capture the realization and move. Use consenting performers and audio you are allowed to share. Watching our AI-generated examples can help you understand the sequence before deciding whether to film or generate."
        ]
      },
      {
        "heading": "How much does a fancy cafe AI video cost?",
        "paragraphs": [
          "One Fancy Cafe AI video costs $6.99 for 480p or $9.99 for 720p. Both tiers deliver one 20-second MP4 with the original reference music included. The optional second portrait costs no extra; there is no subscription or credit package.",
          "Choose one aspect ratio per order: 9:16 vertical or 16:9 horizontal. The purchase does not include both versions. Confirm the final checkout amount, and download the completed file within 30 days rather than treating browser history as a permanent backup."
        ],
        "table": {
          "caption": "What each one-time Fancy Cafe AI order includes",
          "headers": [
            "Included",
            "480p Standard",
            "720p HD"
          ],
          "rows": [
            [
              "Price (USD)",
              "$6.99",
              "$9.99"
            ],
            [
              "Finished duration",
              "20 seconds",
              "20 seconds"
            ],
            [
              "Original reference music",
              "Included",
              "Included"
            ],
            [
              "Portraits",
              "1 required + 1 optional",
              "1 required + 1 optional"
            ],
            [
              "Aspect ratio",
              "Choose 9:16 or 16:9",
              "Choose 9:16 or 16:9"
            ],
            [
              "Download access",
              "Within 30 days",
              "Within 30 days"
            ]
          ]
        },
        "links": [
          {
            "href": "/#studio",
            "label": "Choose your video settings"
          },
          {
            "href": "/refund-policy",
            "label": "Read delivery and refund terms"
          }
        ]
      },
      {
        "heading": "Does it add a watermark?",
        "paragraphs": [
          "The studio does not add its own branding watermark during final audio/video assembly. That step combines the generated footage and reference soundtrack, then sizes the video for your chosen format; it does not stamp our logo over the scene.",
          "This is not a guarantee that an upstream AI result can never contain a mark or unwanted generated text. The POV caption on our demonstration is a sample caption, not a studio branding watermark or a promise that every order receives that caption. Review the actual generated example before paying."
        ],
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Inspect the actual generated example"
          }
        ]
      },
      {
        "heading": "Can I download the video in HD?",
        "paragraphs": [
          "Yes. Choose the $9.99 720p option before checkout to receive an HD MP4: 720 × 1280 for vertical 9:16, or 1280 × 720 for horizontal 16:9. The $6.99 option is 480p; neither tier is advertised as 1080p or 4K.",
          "The selected resolution applies to the delivered file. Choosing HD does not guarantee a more accurate face or funnier reaction, and downloading a 480p order again does not upgrade it to 720p. Save the finished MP4 from Generated videos within 30 days."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Download and save your finished MP4"
          }
        ]
      },
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
          "Watch a verified cafe example, read the photo instructions and understand the output limitations. Our three AI-generated examples show the intended story, not a guarantee of identical results.",
          "Keep your order reference and return in the same browser after checkout. If payment succeeds but delivery fails, use the existing order and contact support under the refund policy rather than paying again."
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-vs-capcut-template",
      "download-fancy-cafe-ai-video",
      "fancy-cafe-ai-photo-privacy"
    ]
  },
  {
    "slug": "how-to-create-fancy-cafe-ai-video-on-phone",
    "title": "How to create a Fancy Cafe AI video on your phone",
    "description": "Make the Fancy Cafe video on your phone: upload one or two portraits, choose settings, pay and save a 20-second MP4 with original music. No app required.",
    "answer": "To make the Fancy Cafe video on your phone, open the studio in your mobile browser, tap the protagonist picture and upload a portrait. Optionally add the cafe regular, choose resolution and aspect ratio, then confirm payment. Return in the same browser to download your 20-second MP4 with original music; no app installation or manual editing is required.",
    "date": "November 5, 2026",
    "publishedAt": "2026-11-05",
    "updatedAt": "2026-11-06",
    "category": "Making & saving",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-3.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Frame from a Fancy Cafe reference video, not a generated customer result",
    "sections": [
      {
        "heading": "How do I make the fancy cafe video on my phone?",
        "paragraphs": [
          "Open firsttimeinafancycafeai.org in your phone browser, tap the protagonist image and choose a clear adult portrait from your photo library. Add the optional regular if you want to personalize both characters, then choose your settings and review checkout.",
          "The studio runs in the browser, so you do not need to install an app or assemble the soundtrack in a mobile editor. The completed video is a 20-second MP4 with the original music from the cafe reference video. Generation takes processing time; 20 seconds describes the clip length, not the wait."
        ],
        "steps": [
          "Open the studio and tap the protagonist picture. Pick your portrait from the phone photo library and wait for validation.",
          "Optionally tap the cafe regular picture and choose a separate portrait of the second consenting adult.",
          "Choose 480p ($6.99) or 720p ($9.99), and 9:16 vertical or 16:9 horizontal. Check the previews and consent selection.",
          "Review the order summary and final price, then confirm payment on the checkout page.",
          "Return in the same browser to follow the existing order. Keep its cookies and order reference; do not pay again while the order is processing.",
          "When ready, play the result with sound and use the download button to save the MP4 within 30 days of completion."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          },
          {
            "href": "/blog/fancy-cafe-ai-two-people",
            "label": "Choose one or two photos for your mobile upload"
          }
        ]
      },
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
      },
      {
        "heading": "How do I save the finished MP4 on my phone?",
        "paragraphs": [
          "Use the completed order's download button to save the MP4 to your phone, then open the saved file to check it plays with sound. Download it within 30 days of completion rather than relying on the browser's order history as permanent storage.",
          "Depending on your phone and browser, the file may appear in Downloads or a Files app rather than directly in your photo library. If the browser opens a video preview, use its download or save option. You can then share the saved file yourself; the studio does not post to social accounts."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Download and recover your existing order"
          },
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "Review the complete generation walkthrough"
          },
          {
            "href": "/blog/fancy-cafe-ai-video-generator",
            "label": "Explore the Fancy Cafe AI video maker"
          }
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-photo-tips",
      "download-fancy-cafe-ai-video",
      "fancy-cafe-ai-two-people",
      "fancy-cafe-ai-video-generator"
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
    "minutes": "6 min read",
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
      },
      {
        "heading": "How do I make this TikTok trend?",
        "paragraphs": [
          "To make the Your First Time in a Fancy Cafe TikTok trend with your own face, upload an adult portrait to Fancy Cafe AI, choose a vertical 9:16 video, confirm the one-time price and generate. The delivered 20-second MP4 includes the original reference music, so you do not need to rebuild the scene or mix the soundtrack.",
          "Add a second portrait only if you want to personalize the cafe regular. After payment, follow the existing order in the same browser, then preview and download the result. The website creates the file; you decide whether and where to post it."
        ],
        "steps": [
          "Upload one consenting-adult portrait to Protagonist; optionally add Cafe regular.",
          "Choose 9:16 and 480p or 720p; confirm the price before payment.",
          "Wait for the existing order to finish, then watch the complete video with sound.",
          "Download the MP4 within 30 days and use your social app to share it."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your vertical cafe video"
          }
        ]
      },
      {
        "heading": "How do I post the fancy cafe AI video on TikTok?",
        "paragraphs": [
          "Download your completed MP4 to your device, then use TikTok to upload that saved video and publish it yourself. Fancy Cafe AI does not connect to your TikTok account or automatically post on your behalf; generating a video and publishing it are separate steps.",
          "Preview the crop, caption and sound before posting. The downloaded MP4 already has the original reference music, so do not accidentally layer a second copy of the same song over it. Identify the scene as AI-generated, review the platform rules for your intended use, and check audience settings before publishing."
        ],
        "steps": [
          "In the TikTok app, tap Add post (+), then Upload and select the saved MP4.",
          "Preview the full clip; add a description or caption without covering faces or the seating reveal.",
          "Review sound, AI-content disclosure and privacy settings, then choose Post or save a draft."
        ],
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Find your downloaded video"
          },
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "Understand the included soundtrack"
          }
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
    ],
    "sources": [
      {
        "label": "TikTok Help Center: Making a post",
        "href": "https://support.tiktok.com/en/using-tiktok/creating-videos/making-a-post",
        "note": "Official instructions for uploading a saved video, editing and publishing manually. App labels may vary by language and version; this is not a Fancy Cafe integration."
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
  },
  {
    "slug": "fancy-cafe-ai-video-generator",
    "title": "Fancy Cafe AI Video Generator: Make the Meme from Your Photo",
    "description": "Looking for a first time in a fancy cafe AI video maker? Get a 20-second MP4 with original reference music, one portrait and an optional second character.",
    "answer": "Fancy Cafe AI at firsttimeinafancycafeai.org turns a portrait into a personalized 20-second Your First Time in a Fancy Cafe video with the original reference music included. Upload one adult protagonist photo, optionally replace the cafe regular, choose your format and resolution, and confirm payment. The studio generates the scene and delivers a downloadable MP4.",
    "date": "November 6, 2026",
    "publishedAt": "2026-11-06",
    "updatedAt": "2026-11-06",
    "category": "Getting started",
    "minutes": "5 min read",
    "image": "/fancy-cafe-ai/guides/demo-2.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Fancy Cafe reference scene illustrating the wrong-seat meme recreated by the generator",
    "sections": [
      {
        "heading": "How can I make my own first time in a fancy cafe video?",
        "paragraphs": [
          "Use the Fancy Cafe AI studio to upload a protagonist portrait, choose a video format and generate your own version of the wrong-seat scene. The finished video is 20 seconds long and includes the original music from our cafe reference video.",
          "You do not need to film yourself in a cafe or write a custom prompt. The scene follows the familiar joke: the protagonist sits on a small table, notices the regular using the bench, and corrects the mistake. Add a second portrait only if you want to personalize the regular too."
        ],
        "links": [
          {
            "href": "/blog/how-to-make-first-time-in-a-fancy-cafe-ai-video",
            "label": "Follow the photo-to-video walkthrough"
          }
        ]
      },
      {
        "heading": "What AI tool can make the fancy cafe meme?",
        "paragraphs": [
          "Fancy Cafe AI at firsttimeinafancycafeai.org is a dedicated tool for creating this meme from portraits. It combines the prepared cafe scene, character roles, video generation and soundtrack assembly in one workflow.",
          "That makes it useful when you want a finished version of this specific joke rather than an open-ended video project. A general-purpose editor is a different choice: use one when you already have footage and mainly want to adjust captions, cuts or framing."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-vs-capcut-template",
            "label": "Compare a cafe generator with an editing workflow"
          }
        ]
      },
      {
        "heading": "Is there an AI fancy cafe video generator?",
        "paragraphs": [
          "Yes. This fancy cafe AI video generator creates new reference-guided video frames using your uploaded portraits. It delivers a 20-second MP4 in your selected resolution and aspect ratio, with the original reference music already added.",
          "Choose 480p for $6.99 or 720p for $9.99, and choose 9:16 vertical or 16:9 horizontal. These are one-time prices per video, not a subscription or credit bundle; review the final order details before paying. It recreates the scene rather than replacing a face in every original frame."
        ]
      },
      {
        "heading": "How do I put my face in the fancy cafe trend?",
        "paragraphs": [
          "Click the protagonist image in the studio and upload a clear photo of yourself. That portrait is assigned to the person who takes the wrong seat; the separate optional slot is for the cafe regular, the woman seated on the bench.",
          "Use one unobstructed face per photo and images of consenting adults only. If you leave the regular slot empty, the video uses a reference-style regular. A clean portrait helps guide identity, while expressions and movements are newly generated rather than copied exactly."
        ],
        "links": [
          {
            "href": "/blog/fancy-cafe-ai-photo-tips",
            "label": "Choose a useful portrait"
          },
          {
            "href": "/blog/fancy-cafe-ai-two-people",
            "label": "Understand the two character slots"
          }
        ]
      },
      {
        "heading": "Can I turn my photo into the fancy cafe meme?",
        "paragraphs": [
          "Yes. One protagonist photo is enough to start; a second photo is optional. The generator animates a reference-guided cafe performance around your portrait instead of requiring a recording of you acting out the scene.",
          "The homepage shows an actual generated example beside the portraits used to make it. Watch the full clip and enable sound to judge the face, reaction, wrong-seat reveal and finished soundtrack together. This is a useful demonstration of the output, not a promise that every order produces identical details."
        ],
        "image": {
          "src": "/fancy-cafe-ai/generated-with-caption-poster.webp",
          "alt": "Still from the studio-generated Fancy Cafe example with a POV caption",
          "caption": "Actual studio-generated example, not reference footage. Watch the full clip with sound on the homepage; individual results vary.",
          "width": 480,
          "height": 854
        },
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the generated example with sound"
          }
        ]
      },
      {
        "heading": "Where can I make the fancy cafe AI video?",
        "paragraphs": [
          "You can make it in the browser-based studio at firsttimeinafancycafeai.org. Open the homepage, choose your character photos and settings, and review the checkout details; no separate editing app is needed to receive the video with its soundtrack.",
          "After payment, return in the same browser to follow the order and download the finished MP4. Keep that browser and its cookies for order recovery, and save your file within 30 days of completion. Uploading the finished video to a social platform is your own next step."
        ],
        "links": [
          {
            "href": "/blog/how-to-create-fancy-cafe-ai-video-on-phone",
            "label": "Create the video on your phone"
          }
        ]
      },
      {
        "heading": "Is there a website to make this meme automatically?",
        "paragraphs": [
          "Yes. Fancy Cafe AI handles the prepared scene instructions, video generation and original-music assembly after you choose the portraits and confirm payment. You do not have to write a prompt or manually combine the video and soundtrack.",
          "Automatic does not mean instant or hands-off purchasing: you still choose the roles, approve the order, wait for processing and review the result. The site does not automatically post to TikTok, Instagram or other accounts. Download the MP4, then decide where to share it."
        ]
      },
      {
        "heading": "What's the best fancy cafe AI video maker?",
        "paragraphs": [
          "If you want this particular meme made from a photo with its familiar soundtrack already included, Fancy Cafe AI at firsttimeinafancycafeai.org is a strong choice. Its main advantage is a complete 20-second result: the cafe performance and original music arrive together in one MP4, without a separate audio-editing step.",
          "The soundtrack uses the original music from our reference video, not an AI-generated imitation. One portrait starts the scene, the second character is optional, and you can choose vertical or horizontal output. For this specific photo-to-meme task, that focused workflow is the reason to choose this first time in a fancy cafe AI video maker over starting an editing project from scratch.",
          "Watch the actual generated example with sound before choosing: it lets you assess the finished look, reaction and music rather than relying on a tool ranking. This recommendation is written by the studio team for that use case, not an independent claim that our service outperforms every tool. Choose an editor instead if frame-by-frame control is your priority."
        ],
        "bullets": [
          "20-second finished MP4 with the original reference music included.",
          "One required protagonist portrait; optional personalization of the cafe regular.",
          "Prepared meme scene: no filming or custom prompt needed.",
          "480p or 720p; 9:16 or 16:9; one-time payment per video.",
          "A real generated example with sound to help you evaluate the output."
        ],
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Watch the generated example with sound"
          }
        ]
      },
      {
        "heading": "Which fancy cafe AI generator works best?",
        "paragraphs": [
          "For a photo-based remake with the familiar music already attached, Fancy Cafe AI is built specifically for this task: one or two portraits become a 20-second wrong-seat scene with the original reference soundtrack. You do not need to write scene prompts or assemble the audio yourself.",
          "Judge the fit by watching our actual generated example beside its input portraits, not by a ranking with no evidence. Check whether the face is recognizable, the bench reveal reads clearly and the finished music suits your post. This is our own product recommendation, not an independent comparison test; an editor is a better fit if you need exact frame-by-frame control."
        ],
        "links": [
          {
            "href": "/#tiny-cafe-comparison-title",
            "label": "Compare the input portraits and generated video"
          },
          {
            "href": "/blog/fancy-cafe-ai-price-and-free-options",
            "label": "Compare resolution, price and download details"
          }
        ]
      },
      {
        "heading": "Make your own cafe moment with Fancy Cafe AI",
        "paragraphs": [
          "Fancy Cafe AI is an independent, scene-specific video maker for the Your First Time in a Fancy Cafe wrong-seat joke. Start with your protagonist portrait, add the regular only if you want to, and let the studio prepare a 20-second video with the original reference music.",
          "Review your format, resolution and final price before checkout. Made for personal entertainment and non-commercial social sharing. No commercial-use license is included. Included music is not separately licensed to you; personal sharing must respect rights and platform rules."
        ],
        "links": [
          {
            "href": "/#studio",
            "label": "Make your Fancy Cafe video"
          },
          {
            "href": "/blog/fancy-cafe-ai-music-and-captions",
            "label": "Read about music and captions"
          }
        ]
      }
    ],
    "related": [
      "how-to-make-first-time-in-a-fancy-cafe-ai-video",
      "fancy-cafe-ai-vs-capcut-template",
      "fancy-cafe-ai-photo-tips",
      "your-first-time-in-a-fancy-cafe-meme-explained"
    ]
  },
  {
    "slug": "fancy-cafe-ai-photo-privacy",
    "title": "Is My Uploaded Photo Stored or Deleted? Fancy Cafe AI Privacy",
    "description": "How Fancy Cafe AI handles uploaded portraits, cleanup after generation, the normal three-day input window, browser previews and 30-day video downloads.",
    "answer": "Uploaded portraits are temporarily stored privately for checkout and paid-generation retries. They become eligible for cleanup when generation finishes or their input window expires, normally 3 days after order creation. Deletion depends on the cleanup worker running; completed videos have a separate 30-day download window.",
    "date": "November 6, 2026",
    "publishedAt": "2026-11-06",
    "updatedAt": "2026-11-06",
    "category": "Questions & answers",
    "minutes": "4 min read",
    "image": "/fancy-cafe-ai/guides/demo-1.webp",
    "imageClass": "",
    "imageBadge": "CAFE REFERENCE",
    "imageAlt": "Illustrative frame from the Fancy Cafe reference video, not a private customer upload",
    "sections": [
      {
        "heading": "Is my uploaded photo stored or deleted?",
        "paragraphs": [
          "Your uploaded portrait is temporarily stored in private object storage so checkout and paid-generation retries can use it. It is not a public gallery submission. Input photos become eligible for cleanup once generation finishes, or when the input window expires, normally 3 days after order creation.",
          "Eligible does not mean instantly deleted: the cleanup worker must run to remove the stored inputs and clear their order references. That timing describes our input storage, not an immediate deletion promise for every third-party system. Upload only consenting adult portraits that you have permission to use."
        ],
        "links": [
          {
            "href": "/privacy",
            "label": "Read the full privacy policy"
          }
        ]
      },
      {
        "heading": "Why is a portrait kept during checkout and retries?",
        "paragraphs": [
          "A paid order needs its selected photos after you return from checkout, and a retry needs the same inputs if a technical problem interrupts processing. Temporary private storage supports that workflow instead of requiring you to upload the portraits again after every step.",
          "Photos are processed for the requested service. Optimized portraits may go to a safety service when selected, and are sent to the generation provider after verified payment with the scene reference. Those third-party services may retain data under their own policies; local cleanup does not establish their retention or training practices."
        ]
      },
      {
        "heading": "Are uploaded photos and finished videos kept for the same time?",
        "paragraphs": [
          "No. Source portraits and completed MP4s have different purposes and retention windows. Input cleanup becomes eligible after completion or input expiry; finished videos are available to download within 30 days of completion. Download the finished file if you want to keep it.",
          "Payment and order records may be retained longer for operational and recordkeeping purposes. A video disappearing from the browser list does not prove every server record was deleted, and deleting source portraits does not remove a video you have already saved to your own device."
        ],
        "table": {
          "caption": "Different data, different retention",
          "headers": [
            "Data",
            "What to expect"
          ],
          "rows": [
            [
              "Uploaded portraits",
              "Private temporary storage; cleanup eligible after generation finishes or input expiry (normally 3 days from order creation)."
            ],
            [
              "Finished MP4",
              "Separate 30-day download window after completion."
            ],
            [
              "Browser previews and order history",
              "Local browser state, separate from server storage."
            ],
            [
              "Provider and payment records",
              "Separate provider policies and recordkeeping periods apply."
            ]
          ]
        },
        "links": [
          {
            "href": "/blog/download-fancy-cafe-ai-video",
            "label": "Save your video before access expires"
          }
        ]
      },
      {
        "heading": "Does clearing my browser delete my uploaded photo?",
        "paragraphs": [
          "No. Clearing browser data removes local state such as previews or saved order references; it does not send a deletion request to our storage or to a generation provider. It can also make it harder to recover an order in that browser.",
          "Keep your order reference privately and download a completed video before clearing local data. If you want server-side deletion reviewed, contact support rather than relying on removing a preview or closing the tab."
        ]
      },
      {
        "heading": "How can I request deletion or ask about my photos?",
        "paragraphs": [
          "Use Contact & support for a privacy request and include enough information to locate your order without attaching portraits or payment card details. Support may need to verify your identity before reviewing access, correction or deletion requests.",
          "This guide explains the workflow in plain language; the privacy policy contains the full disclosures. Before making your own Your First Time in a Fancy Cafe AI video, choose a clear adult portrait, obtain permission for the optional second person, and review the examples and price."
        ],
        "links": [
          {
            "href": "/contact",
            "label": "Contact support about a privacy request"
          },
          {
            "href": "/privacy",
            "label": "Read the privacy policy"
          },
          {
            "href": "/#studio",
            "label": "Choose your cafe characters"
          }
        ]
      }
    ],
    "related": [
      "fancy-cafe-ai-photo-tips",
      "fancy-cafe-ai-two-people",
      "download-fancy-cafe-ai-video",
      "fancy-cafe-ai-price-and-free-options"
    ]
  }
];
export const tinyGuides = allTinyGuides;
const featuredGuideSlugs = [
  "your-first-time-in-a-fancy-cafe-meme-explained",
  "fancy-cafe-ai-video-generator",
  "how-to-make-first-time-in-a-fancy-cafe-ai-video",
  "fancy-cafe-ai-photo-tips",
  "fancy-cafe-ai-vs-capcut-template",
  "how-to-make-pov-first-time-in-a-fancy-cafe-ai-video-for-reels",
];
export const featuredTinyGuides = featuredGuideSlugs.map(slug => allTinyGuides.find(guide => guide.slug === slug)!);
