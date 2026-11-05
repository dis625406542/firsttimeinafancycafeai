"use client";

// Footer trigger for the consent banner; the analytics component listens for this event.
export function CookieSettingsButton() {
  return <button type="button" className="tiny-cookie-settings" onClick={() => window.dispatchEvent(new Event("tiny-desk-cookie-settings"))}>Cookie settings</button>;
}
