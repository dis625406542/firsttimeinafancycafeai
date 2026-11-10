// GA4 measurement IDs are public, not secrets. Never put GTM container IDs here.
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export function gaMeasurementId() {
  // This site has no inherited analytics property; analytics stays off until its own ID is set.
  const configured = process.env.NEXT_PUBLIC_GA_ID?.trim().toUpperCase();
  return configured && GA_ID_PATTERN.test(configured) ? configured : null;
}
