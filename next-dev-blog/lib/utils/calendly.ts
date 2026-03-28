const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/nazar3bio/15min";

function buildCalendlyUrl(url?: string): string {
  const baseUrl = url || CALENDLY_URL;

  if (!baseUrl.includes("/15min")) {
    const urlWithoutParams = baseUrl.split("?")[0];
    const params = baseUrl.includes("?") ? baseUrl.split("?")[1] : "";

    const match = urlWithoutParams.match(/calendly\.com\/([^/]+)/);
    if (match) {
      const username = match[1];
      const newUrl = `https://calendly.com/${username}/15min`;
      return params ? `${newUrl}?${params}` : newUrl;
    }
  }

  return baseUrl;
}

export function openCalendlyPopup(url?: string): void {
  const calendlyUrl = buildCalendlyUrl(url);
  window.open(calendlyUrl, "_blank", "noopener,noreferrer");
}
