// Shared by the public availability endpoint and the checkout submission route.
export function tinyCheckoutEnabled(value: string | undefined): boolean {
  return value === "true";
}

export function checkoutReturnUrl(origin: string, mode: "success" | "cancel", code: string): string {
  const url = new URL("/", origin);
  url.searchParams.set("checkout", mode);
  url.searchParams.set("code", code);
  url.hash = "studio";
  return url.toString();
}
