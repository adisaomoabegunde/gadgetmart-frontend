// fetchHelpers.js
export async function safeParseResponse(response) {
  if (!response) return null;

  // read text first
  const text = await response.text().catch(() => "");
  if (!text) {
    // nothing to parse
    return null;
  }
  // try parse JSON
  try {
    return JSON.parse(text);
  } catch {
    // return text in message field so you still get info
    return { message: text };
  }
}