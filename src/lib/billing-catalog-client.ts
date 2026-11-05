// The price catalog is a read-only check. Retry only transient failures; checkout creation never retries here.
export async function fetchCheckoutCatalog<T extends { error?: string }>(
  url: string,
  options: {
    fetcher?: (url: string, init: RequestInit) => Promise<Response>;
    wait?: (ms: number) => Promise<void>;
  } = {},
): Promise<T> {
  const fetcher = options.fetcher ?? fetch;
  const wait = options.wait ?? (ms => new Promise<void>(resolve => setTimeout(resolve, ms)));
  for (let attempt = 0; attempt < 3; attempt++) {
    let retryable = true;
    try {
      const response = await fetcher(url, { cache: "no-store", signal: AbortSignal.timeout(attempt === 0 ? 10000 : 5000) });
      retryable = response.status === 429 || response.status >= 500;
      const data = await response.json() as T;
      if (!response.ok) throw new Error(data?.error || "Payment information is temporarily unavailable.");
      return data;
    } catch (error) {
      if (!retryable || attempt === 2) throw error;
      await wait(400 * 2 ** attempt);
    }
  }
  throw new Error("Payment information is temporarily unavailable.");
}
