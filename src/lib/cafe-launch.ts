// Explicit launch approval prevents copied Tiny Desk environment flags from accepting payments.
type LaunchEnv = Record<string, string | undefined>;
export function cafeLaunchReady(env: LaunchEnv = process.env): boolean {
  const safe = (key: string | undefined) => !!key && /^fancy-cafe-ai\/v1\/[a-zA-Z0-9._-]+$/.test(key);
  return env.FANCY_CAFE_CHECKOUT_ENABLED === "true" && env.FANCY_CAFE_ASSETS_APPROVED === "true"
    && safe(env.FANCY_CAFE_REFERENCE_KEY) && safe(env.FANCY_CAFE_AUDIO_KEY);
}
