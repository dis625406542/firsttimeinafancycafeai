// GA4 measurement IDs are public, not secrets. Never put GTM container IDs here.
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;
const CAFE_GA_ID = "G-RW2PLTLMLG";

export function gaMeasurementId() {
  // Keep local development quiet unless explicitly enabled. Production works
  // without adding a Vercel variable; "off" explicitly disables analytics.
  const configured = process.env.NEXT_PUBLIC_GA_ID?.trim().toUpperCase();
  const id = configured || (process.env.NODE_ENV === "production" ? CAFE_GA_ID : "");
  return id && GA_ID_PATTERN.test(id) ? id : null;
}
