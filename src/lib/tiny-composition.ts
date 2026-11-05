import "server-only";
import { createHash } from "node:crypto";
import { pool } from "./db";
import { checkTinyAssets, compositionOutput, stageComposition, compositionUrls } from "./r2";
import { fetchProviderVideo } from "./provider-video";
import type { VideoJob } from "./video-jobs";
import type { PromptContext } from "./video-templates";
// Runs inside the same Node application; no separately deployed composer.
import { assertLocalCompositionReady, composeFromUrls, withLocalComposition } from "../../services/video-composer/local.mjs";
export async function loadTinyPrompt(context:PromptContext) {
  const result=await pool().query<{base_prompt:string}>("SELECT base_prompt FROM {schema}.video_prompt_templates WHERE template_id=$1 AND scene_id=$2 AND prompt_version=$2 AND is_active=true",[context.templateId,context.promptVersion]);
  if(!result.rows[0]?.base_prompt.trim())throw new Error("The versioned cafe database prompt is unavailable.");
  return {...context,databasePrompt:result.rows[0].base_prompt};
}
export async function assertTinyReady(context:PromptContext) {
  if(process.env.VIDEO_PROVIDER?.trim().toLowerCase()!=="yir")throw new Error("Cafe video generation requires VIDEO_PROVIDER=yir.");
  await Promise.all([loadTinyPrompt(context),checkTinyAssets(context.promptVersion),assertLocalCompositionReady()]);
}
export function compositionId(row:VideoJob) {
 if(!row.task_id)throw new Error("Missing model task.");
 return `${row.code}-${createHash("sha256").update(row.task_id).digest("hex").slice(0,16)}`;
}
export async function composeTiny(row:VideoJob) {
  const id=compositionId(row);
  // Recover an upload committed before a previous invocation lost its DB lease.
  const ready=await compositionOutput(id);
  if(ready){console.info("media.compose.reused",{job:row.code.slice(0,8)});return ready;}
  return withLocalComposition(async()=>{
    const started=Date.now();
    console.info("media.compose.start",{job:row.code.slice(0,8),resolution:row.resolution,aspect:row.aspect_ratio});
    // Bound staging + downloads + encoding + upload together, not each in isolation.
    const signal=AbortSignal.timeout(220000);
    if(!row.video_url)throw new Error("Missing model output.");
    await stageComposition(id,()=>fetchProviderVideo(row.video_url!,signal),signal);
    console.info("media.compose.staged",{job:row.code.slice(0,8),elapsedMs:Date.now()-started});
    await composeFromUrls({id,resolution:row.resolution,aspect:row.aspect_ratio,...await compositionUrls(id,row.prompt_version)},{signal});
    const key=await compositionOutput(id,signal);
    if(!key)throw new Error("Composed output upload could not be verified.");
    console.info("media.compose.finished",{job:row.code.slice(0,8),elapsedMs:Date.now()-started});
    return key;
  });
}
