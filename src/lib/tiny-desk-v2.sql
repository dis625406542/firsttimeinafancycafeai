-- Versioned prompts are immutable: never change a paid order's v1 snapshot.
CREATE TABLE IF NOT EXISTS {schema}.video_prompt_templates (
 template_id text NOT NULL, scene_id text NOT NULL, scene_description text NOT NULL,
 base_prompt text NOT NULL CHECK(length(btrim(base_prompt))>0),
 prompt_version text NOT NULL DEFAULT 'tiny-desk-v1', is_active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(template_id,scene_id)
);
INSERT INTO {schema}.video_prompt_templates
(template_id,scene_id,scene_description,base_prompt,prompt_version,is_active) VALUES
('tiny-desk-ai','tiny-desk-v2','Five fixed identities; original first 15 seconds, no speed changes.',$prompt$
Create a 15-second photorealistic miniature office concert video in {{ASPECT_RATIO}}. Use the supplied reference video ONLY as the guide for staging, costumes, instruments, expressions, gestures, camera positions and edit timing. Recreate its first 15 seconds at normal speed. Do not compress the full 17.7-second performance. Do not include the later closing wide shot.
IDENTITY MAP: The five reference images are identity portraits, NOT wardrobe or background references. Image 1 = back-left backing performer; Image 2 = back-right backing performer; Image 3 = front-left keyboardist (keys); Image 4 = front-center lead singer (lead); Image 5 = front-right saxophonist (sax). Bind each identity permanently to that role. Keep all five distinct and recognizable across cuts. Never swap faces, clone people or transfer identities between instruments. If portraits are humans, make five adult human performers, not dogs. Preserve each portrait's facial features, hair and skin tone while borrowing stage wardrobe and body blocking from the video.
SET: Match the reference's warm, intimate, slightly humorous office-band performance, cozy shelves, desk, practical warm lights and densely dressed background. Reuse the reference's role-specific outfit silhouettes and accessories, not the portrait clothes. Natural believable anatomy, hands and instrument contact. No captions, logos, subtitles or watermark text.
SHOT 1, 0.000-5.333s: steady front-facing ensemble wide shot. The two backing performers remain back-left/back-right, gently bobbing and performing backing mouth movements. Front-left keyboardist plays with both hands, front-center lead sings expressively into the microphone with rhythmic head and shoulder motion, front-right saxophonist holds/plays the saxophone. Match the reference's timing and gestures. All five stay on their assigned marks.
SHOT 2, 5.333-11.625s: cut to a lead-singer close/medium shot, matching the reference framing. Sustain the same lead identity and wardrobe. Follow the reference's sequence of mouth openings, lip shapes, eyebrow motion, nods and expressive singing gestures, with natural transitions rather than frozen/open mouths. Preserve microphone contact and background continuity. Other performers must not become the lead.
SHOT 3, 11.625-15.000s: cut to the front-right saxophonist close/medium shot. Preserve that identity, saxophone, fingering and reference cheek/head/body motion. Match the instrumental performance timing. End at 15 seconds during this shot, with no invented outro, closing wide shot or fade.
MOTION: Follow the visual reference's performance rhythm and visible mouth articulation as closely as the model permits. Avoid random talking, extra cuts, face morphs, flicker, floating instruments, extra fingers, duplicated characters and camera drift. This is visual performance matching, not guaranteed frame-exact lip synchronization.
AUDIO: No generated music, speech or sound effects are requested. An authorized fixed soundtrack is added separately after generation; native model audio, if unavoidable, will be removed in full.
$prompt$,'tiny-desk-v2',true) ON CONFLICT(template_id,scene_id) DO NOTHING;
UPDATE {schema}.products SET description='One 15-second, five-performer Tiny Desk AI video with a fixed soundtrack; one-time purchase, no subscription.' WHERE id='tiny-desk-ai';
UPDATE {schema}.product_prices SET duration_seconds=15 WHERE product_id='tiny-desk-ai' AND resolution IN ('480p','720p');
