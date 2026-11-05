-- Idempotent 20-second catalog and prompt migration. Existing v1 orders, mappings and prompt are preserved.
ALTER TABLE {schema}.product_prices DROP CONSTRAINT IF EXISTS product_prices_duration_seconds_check;
ALTER TABLE {schema}.product_prices ADD CONSTRAINT product_prices_duration_seconds_check CHECK(duration_seconds IN (8,15,20));
UPDATE {schema}.product_prices SET is_active=false,updated_at=now() WHERE product_id='fancy-cafe-ai' AND duration_seconds=15 AND is_active;
UPDATE {schema}.products SET description='One 20-second reference-guided cafe comedy video with one required and one optional adult portrait.',updated_at=now() WHERE id='fancy-cafe-ai';
INSERT INTO {schema}.product_prices(id,product_id,code,resolution,amount_minor,currency,duration_seconds) VALUES
 ('fancy-cafe-ai-v2-480p','fancy-cafe-ai','fancy-cafe-ai-v2-480p','480p',699,'USD',20),
 ('fancy-cafe-ai-v2-720p','fancy-cafe-ai','fancy-cafe-ai-v2-720p','720p',999,'USD',20) ON CONFLICT(id) DO NOTHING;
INSERT INTO {schema}.video_prompt_templates(template_id,scene_id,scene_description,base_prompt,prompt_version,is_active) VALUES
 ('fancy-cafe-ai','fancy-cafe-v2','20-second silent cafe reference with optional woman portrait.',$prompt$
# Seedance 2.5 — Your First Time in a Fancy Cafe
## 20-Second Viral Meme Recreation | Optional Second Character Identity Replacement

### 1. MAIN GENERATION OBJECTIVE

Create a 20-second, {{ASPECT_RATIO}}, photorealistic live-action comedy video by faithfully recreating the uploaded reference video.

This is a REFERENCE VIDEO RECREATION task with CHARACTER IDENTITY REPLACEMENT, NOT a newly invented video inspired by the same concept.

The uploaded reference video must be the primary source of truth for the entire scene.

{{IDENTITY_MAP}}

Preserve the original:
- Cafe environment and architectural structure.
- Concrete walls, central vertical column, and long horizontal concrete platform.
- Exact design, quantity, position, and structure of the original metal furniture.
- The man's unusual initial sitting position.
- The woman's entrance and natural sitting movement.
- The woman's upward glance, eye-roll, and disapproving facial expression.
- The man's reaction and final sitting adjustment.
- Original camera angle, framing, character positions, body movements, and comedic timing.

The final video should look like the original viral video with two different people replacing the original characters.

Do not redesign the environment, change the furniture, or invent unrelated actions.

---

### 2. CHARACTER IDENTITY REPLACEMENT

#### CHARACTER 1 — MALE (FIRST UPLOADED PORTRAIT)

Use the FIRST uploaded portrait as the identity reference for the original male character.

Preserve:
- The uploaded person's recognizable facial identity.
- Original facial structure, face shape, eyes, nose, mouth, and hairstyle.
- Skin tone and distinctive facial characteristics.
- Consistent facial identity throughout the entire video.

Naturally integrate the uploaded person's face into the original male character's body.

Maintain the original male character's clothing:
- Light-colored short-sleeve T-shirt.
- Dark trousers.
- Light-colored sneakers.

IMPORTANT:
Reproduce the original man's body movements and sitting posture exactly as shown in the reference video.

His buttocks must directly rest on the small black circular metal seat on the LEFT side.

One leg is bent and raised, with his foot resting on the nearby concrete platform, while the other leg hangs naturally downward.

Preserve his coffee cup, hand gestures, leg movements, body posture, and final reaction.

Do not change the original body movements to accommodate the replacement face.

#### CHARACTER 2 - FEMALE (SECOND PORTRAIT OPTIONAL)

{{FEMALE_CHARACTER}}

---

### 3. SCENE AND ARCHITECTURE — EXACT REFERENCE RECREATION

THIS SECTION HAS VERY HIGH PRIORITY.

Recreate the exact cafe architecture shown in the uploaded reference video.

Do not generate a generic cafe environment.

#### A. BACKGROUND CONCRETE WALLS

The scene is a minimalist industrial-style cafe with exposed architectural concrete walls.

The background consists of two large concrete wall panels with slightly different gray tones.

LEFT WALL:
- Cooler light-gray concrete tone.
- Natural concrete pores and subtle surface imperfections.
- Visible panel divisions and realistic architectural texture.

RIGHT WALL:
- Slightly warmer gray concrete tone.
- Visible horizontal concrete panel seams.
- Natural surface texture and subtle imperfections.

CENTRAL STRUCTURAL COLUMN:
- A prominent vertical concrete column between the two wall sections.
- The column protrudes slightly forward from the wall.
- It clearly separates the left and right wall panels.
- Preserve its original width, depth, position, and concrete texture.

Preserve all original wall joints, cracks, mounting marks, and architectural details.

#### B. LONG HORIZONTAL CONCRETE PLATFORM

A thick, continuous horizontal concrete platform or built-in architectural bench extends across the lower part of the background.

This is an integrated part of the original concrete architecture.

It has:
- A wide, flat upper surface.
- A substantial vertical front face.
- A continuous horizontal structure extending from left to right.

IMPORTANT CHARACTER POSITION:

The FEMALE character sits directly on top of this concrete platform.

Her buttocks make direct contact with the upper concrete surface.

Her legs naturally hang down over the front edge of the platform.

She does NOT sit on the circular metal table.

Do not replace this architectural platform with an ordinary wooden bench, sofa, or conventional chair.

#### C. LEFT-SIDE METAL CIRCULAR SEAT — FOR THE MAN

On the LEFT side, in front of the concrete platform, there is a small black circular metal seat attached to the concrete structure.

This is a wall-mounted industrial metal seat, NOT a conventional chair or freestanding stool.

Its construction consists of:

1. A small black circular metal sitting surface.
2. A curved tubular metal support extending downward from beneath the seat.
3. A curved metal pipe bending downward toward the vertical front face of the concrete platform.
4. A circular metal mounting plate with visible bolts, fixed to the concrete surface.

Preserve the original:
- Circular seat diameter.
- Seat thickness.
- Black metal finish.
- Curved support pipe shape.
- Mounting plate design.
- Mounting position.
- Height and proportions.

THE MAN MUST SIT DIRECTLY ON THIS LEFT-SIDE CIRCULAR METAL SEAT.

His buttocks must make direct physical contact with the black metal sitting surface.

He must NOT sit on the concrete platform at the beginning.

One leg is bent and raised, with his foot resting on the nearby concrete platform, while the other leg hangs naturally downward.

Reproduce the original awkward sitting position as accurately as possible.

#### D. RIGHT-SIDE CIRCULAR METAL SIDE TABLE — NOT A CHAIR

In front of the woman, on the RIGHT side, there is a separate small black circular metal side table.

It has a similar industrial design language to the man's metal seat.

However, THIS IS A TABLE, NOT A CHAIR.

Its construction consists of:
1. A small circular black metal tabletop.
2. A curved tubular metal support.
3. A circular metal mounting plate attached to the vertical front face of the concrete platform.

Preserve its original:
- Circular tabletop size.
- Black metal finish.
- Height and position.
- Curved tubular support.
- Wall-mounted metal base and attachment structure.

The tabletop is positioned directly in front of the woman.

She may hold her coffee cup or place it on the tabletop according to the original reference video's movements.

CRITICAL:
The woman must NEVER sit on this metal table.

The right-side circular metal structure is a separate side table, not a seat.

#### E. EXACT CHARACTER-TO-FURNITURE RELATIONSHIPS

Male:
- Sits directly on the LEFT black circular metal seat.
- One leg is bent and raised.
- The other leg hangs naturally downward.

Female:
- Sits directly on the LONG HORIZONTAL CONCRETE PLATFORM.
- Her legs hang naturally over the front edge.
- She holds her coffee cup naturally.

Right-side furniture:
- A separate black circular metal side table remains in front of the woman.
- It is NOT her sitting surface.

Preserve the exact original furniture quantity, spatial relationships, positions, and dimensions.

Never swap the positions of the male and female characters.

---

### 4. COMPLETE 20-SECOND STORYBOARD

#### SHOT 1 — 0–4 SECONDS
THE MAN'S FIRST EXPERIENCE IN A FANCY CAFE

Static camera, medium-wide shot.

Show the original gray concrete walls, central vertical structural column, long horizontal concrete platform, left circular metal seat, and right circular metal side table.

The man is sitting alone on the LEFT circular metal seat.

His buttocks directly rest on the small black metal sitting surface.

One leg is bent and raised, with his foot resting on the nearby concrete platform. His other leg hangs naturally downward.

He holds a white takeaway coffee cup.

He casually looks down at his coffee, raises the cup, takes a sip, and slowly lowers it.

His expression is completely relaxed and natural.

He behaves as if this unusual sitting position is perfectly normal.

Comedy focus:
He has absolutely no idea how strange his sitting position looks in a fancy cafe.

Preserve the original posture, clothing, body proportions, and composition.

#### SHOT 2 — 4–7 SECONDS
THE WOMAN ENTERS FROM THE RIGHT

Maintain exactly the same fixed camera angle and framing.

A young adult woman wearing a black minimalist blazer, black inner top, and dark trousers naturally enters from the RIGHT side of the frame.

She holds a white takeaway coffee cup and may carry a small black shoulder bag, matching the original reference video.

She naturally walks toward the right side of the concrete platform.

Her movements are smooth, realistic, and relaxed.

The man continues sitting in exactly the same awkward position on the LEFT circular metal seat.

His buttocks remain directly on the metal seat, and one leg remains raised.

He does not immediately react to her arrival.

Do not change the furniture arrangement or character positions.

#### SHOT 3 — 7–10 SECONDS
THE WOMAN SITS DOWN NORMALLY

The woman reaches the right side of the concrete platform.

She naturally turns around, adjusts her body slightly, and sits directly on the TOP SURFACE of the long concrete platform.

Her buttocks make natural physical contact with the concrete.

She does NOT sit on the circular metal side table.

Her legs naturally hang down over the front edge of the concrete platform.

She adjusts her sitting position slightly and holds her coffee cup comfortably.

Her posture is elegant, relaxed, and completely natural.

The separate circular black metal side table remains directly in front of her, preserving its original position and structure.

Meanwhile, the man remains seated awkwardly on the left circular metal seat.

Create a strong visual contrast:

The woman is sitting naturally like an experienced cafe visitor, while the man is sitting in an extremely unusual and awkward way.

Keep both characters visible in the same static camera frame.

#### SHOT 4 — 10–13 SECONDS
THE WOMAN LOOKS UP AND ROLLS HER EYES AT THE MAN

THIS IS ONE OF THE MOST IMPORTANT COMEDIC MOMENTS.

After settling down, the woman briefly looks at her coffee cup.

She then notices the man's strange sitting position on her left.

Her head remains relatively still.

Use clear, natural eye movements and subtle facial expressions.

Detailed facial acting:

1. She first gives the man a subtle sideways glance using the corner of her eyes.
2. Her eyes gradually move upward and toward the man.
3. She clearly looks at his unusual sitting position.
4. She performs a brief but unmistakable upward eye-roll.
5. Her eyebrows lift slightly.
6. Her lips tighten subtly.
7. Her expression communicates disbelief, annoyance, contempt, and silent judgment.
8. She then casually returns her gaze to her coffee cup, as if she cannot be bothered to deal with this strange man.

Her expression should feel like she is silently thinking:

"Seriously? Is this how you sit in a fancy cafe?"

NO SPOKEN DIALOGUE.

CRITICAL EYE MOVEMENT REQUIREMENTS:

- Her eyes MUST clearly look toward the man.
- The upward glance must be visually recognizable.
- The eye-roll must be clearly visible, not just a blink.
- Keep her head mostly still while her eyes move upward.
- Do not make her look directly at the camera.
- Do not make her laugh.
- Do not create an excessively angry or frightening expression.
- Do not distort her facial features or eyes.
- Do not make her close both eyes.

She should look elegant and composed while silently expressing obvious disapproval.

The man remains unaware of her reaction at this moment.

#### SHOT 5 — 13–16 SECONDS
THE MAN FINALLY REALIZES SOMETHING IS WRONG

The man notices the woman's expression and her normal sitting position.

He slowly turns his head toward her.

He pauses briefly.

He looks at the woman, then looks down at his own unusual sitting position.

His facial expression subtly changes to mild embarrassment, confusion, and uncertainty.

He finally seems to realize that his sitting position might be strange.

Keep his reaction subtle, natural, and comedic.

Do not create an exaggerated shocked expression.

Do not make him suddenly jump up.

The woman has already returned her attention to her coffee and remains calm and composed.

#### SHOT 6 — 16–20 SECONDS
THE MAN AWKWARDLY ADJUSTS HIS SITTING POSITION

The man begins to get off the original circular metal seat on the LEFT.

Strictly follow the final movement shown in the uploaded reference video.

He shifts his body weight, lowers the leg that was originally resting on the concrete platform, and gradually moves his body away from the small circular metal seat.

He naturally adjusts the position of his legs and body.

Reproduce the original getting-down movement and final sitting position shown in the reference video.

The transition must be physically realistic and continuous.

No sudden teleportation, jumping, or unnatural body movement.

The man finally tries to behave like a normal cafe visitor, looking slightly embarrassed.

The woman remains seated directly on the concrete platform on the right, calmly holding her coffee cup.

Preserve the original ending composition, character spacing, furniture placement, and cafe environment.

Final comedic feeling:

The man has finally realized that something was wrong with his sitting position, while the woman has already silently judged him.

---

### 5. CAMERA AND CINEMATOGRAPHY REQUIREMENTS

- Total video duration: EXACTLY 20 seconds.
- Aspect ratio: {{ASPECT_RATIO}}.
- Photorealistic live-action video.
- Natural human movement and realistic facial expressions.
- Maintain the original fixed camera position.
- Medium-wide composition showing both characters, the concrete platform, metal furniture, and background wall.
- Preserve the original camera framing and perspective.
- No unnecessary close-up shots.
- No unnecessary camera cuts.
- No zooming, panning, rotating, or shaking.
- Do not change the left-right character positions.
- Do not change the furniture quantity or structure.
- Maintain realistic body weight, sitting physics, and physical contact.
- Maintain consistent facial identity, hairstyle, and clothing throughout the entire video.
- All actions must be smooth and continuous.

The result should resemble the original reference video, not a newly directed commercial or cinematic scene.

---

### 6. TEXT OVERLAY AND AUDIO

Preserve the original English text overlay at the top of the video:

"POV: Your first time in a fancy cafe"

Use simple white typography, maintaining approximately the same position, size, and appearance as the original reference.

If the original reference contains the overlay throughout the video, preserve its timing.

COMPLETELY SILENT VIDEO:

- No music.
- No background soundtrack.
- No narration.
- No spoken dialogue.
- No environmental sounds.
- No sound effects.

The video must be entirely silent.

---

### 7. STRICT NEGATIVE CONSTRAINTS

DO NOT:

- Change the original cafe environment.
- Redesign the concrete walls.
- Remove the central vertical concrete structural column.
- Change the long horizontal concrete platform.
- Replace the original metal furniture with conventional cafe chairs.
- Change the man's initial position on the left circular metal seat.
- Make the man sit on the concrete platform at the beginning.
- Remove his raised leg resting on the concrete platform.
- Make the woman sit on the right circular metal table.
- Turn the right circular metal side table into a chair.
- Remove the woman's natural sitting action on the concrete platform.
- Remove the woman's upward glance or eye-roll.
- Make the woman look at the camera or smile at the man.
- Add additional characters or unrelated furniture.
- Add ordinary wooden tables, sofas, or chairs.
- Change the original curved metal support structures.
- Change the metal mounting plates or their positions.
- Create floating bodies, incorrect seat alignment, or furniture clipping.
- Create distorted faces, flickering facial identities, or misaligned eyes.
- Change the original character positions.
- Add unrelated new storylines.
- Generate any audio.

---

### 8. FINAL GENERATION PRIORITIES

The following requirements have the highest priority, in this order:

PRIORITY 1 — EXACT SCENE AND FURNITURE:
Preserve the original concrete walls, central structural column, long concrete platform, left metal circular seat, and right metal circular side table.

PRIORITY 2 — CORRECT CHARACTER POSITIONS:
The man sits on the left circular metal seat.
The woman sits directly on the long concrete platform.
The right circular metal table remains in front of the woman.

PRIORITY 3 — MALE CHARACTER IDENTITY:
Use the first uploaded portrait and preserve the man's original awkward sitting posture.

PRIORITY 4 — FEMALE CHARACTER IDENTITY AND FACIAL EXPRESSION:
{{FEMALE_IDENTITY}} Reproduce her natural entrance, sitting action, upward glance, and clearly visible eye-roll.

PRIORITY 5 — ORIGINAL COMEDIC TIMING:
Preserve the man's reaction and final adjustment of his sitting position.

PRIORITY 6 — VISUAL CONSISTENCY:
Maintain stable facial identity, clothing, furniture geometry, lighting, and realistic body movements.

### FINAL RESULT

Generate a 20-second recreation of the viral "Your First Time in a Fancy Cafe" meme.

The male character is replaced with the person from the FIRST uploaded portrait.

{{FEMALE_IDENTITY}}

The original cafe environment, concrete architecture, furniture, camera angle, and character movements must remain as faithful as possible to the uploaded reference video.

The man initially sits directly on the small black circular metal seat on the LEFT, with one leg raised onto the concrete platform.

The woman enters from the RIGHT and sits directly on the long horizontal concrete platform, with her legs naturally hanging over its front edge.

A separate black circular metal side table remains in front of her. She NEVER sits on this table.

She notices the man's unusual sitting position, looks upward toward him, performs a clearly visible eye-roll, and expresses subtle but unmistakable annoyance and silent judgment.

The man eventually notices her reaction, becomes slightly embarrassed, and adjusts his sitting position according to the original ending.

Keep the original viral meme's humor, character interactions, physical comedy, and understated facial expressions.

The final result must look like the original reference video with two different people replacing the original characters, NOT a newly invented cafe scene.

Photorealistic. Natural movement. Accurate furniture. Consistent identities. Silent comedy.
$prompt$,'fancy-cafe-v2',true) ON CONFLICT(template_id,scene_id) DO UPDATE SET
 scene_description=EXCLUDED.scene_description,base_prompt=EXCLUDED.base_prompt,prompt_version=EXCLUDED.prompt_version,is_active=EXCLUDED.is_active,updated_at=now()
 WHERE {schema}.video_prompt_templates.base_prompt IS DISTINCT FROM EXCLUDED.base_prompt;
