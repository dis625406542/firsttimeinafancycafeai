// NEXT_PUBLIC_GA_ID is public by design; only a real GA4 measurement ID is accepted.
const GA_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

export function gaMeasurementId() {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim().toUpperCase();
  return id && GA_ID_PATTERN.test(id) ? id : null;
}
