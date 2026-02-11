export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return fallbackCopy(text);
  }
}

function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta);
  return ok;
}
