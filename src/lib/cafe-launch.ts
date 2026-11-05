// This bypass is for real Stripe TEST checkout and placeholder video delivery on a
// local machine only. Production requires separately reviewed and approved media.
type LaunchEnv = Record<string, string | undefined>;
function testSchemaUrl(value: string | undefined) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return ["postgres:", "postgresql:"].includes(url.protocol) &&
      url.searchParams.get("schema") === "firsttimeinafancycafeai_test";
  } catch { return false; }
}
export function localCafeStripeTestMode(env: LaunchEnv = process.env): boolean {
  return env.FANCY_CAFE_STRIPE_TEST_MODE === "true" &&
    env.NODE_ENV === "development" && !env.VERCEL && !env.CI &&
    env.VIDEO_GENERATION_ENABLED === "false" &&
    env.DATABASE_PRO_NAME === "firsttimeinafancycafeai_test" &&
    testSchemaUrl(env.DATABASE_PRO_URL || env.DIRECT_PRO_URL) &&
    (!env.DIRECT_PRO_URL || testSchemaUrl(env.DIRECT_PRO_URL)) &&
    env.STRIPE_ENABLED === "true" &&
    /^(?:sk|rk)_test_[A-Za-z0-9]{24,}$/.test(env.STRIPE_SECRET_KEY?.trim() || "") &&
    /^whsec_[A-Za-z0-9]{24,}$/.test(env.STRIPE_WEBHOOK_SECRET?.trim() || "");
}

export function cafeLaunchReady(env: LaunchEnv = process.env): boolean {
  if (localCafeStripeTestMode(env)) return true;
  const safe = (key: string | undefined, name: string) => key === `fancy-cafe-ai/v2/${name}`;
  return env.FANCY_CAFE_CHECKOUT_ENABLED === "true" && env.FANCY_CAFE_ASSETS_APPROVED === "true"
    && safe(env.FANCY_CAFE_REFERENCE_KEY, "reference-first20-silent.mp4") && safe(env.FANCY_CAFE_AUDIO_KEY, "soundtrack-first20.mp3");
}
