import fetch from "node-fetch";

export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const apiKey = process.env.DEEPL_API_KEY;
  const endpoint = `https://api-free.deepl.com/v2/translate`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${apiKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        text: text,
        target_lang: "EN", // Translate to English
        source_lang: "AR", // Source language is Arabic
      }),
    });

    const data = await response.json();

    if (data.translations && data.translations.length > 0) {
      res.status(200).json({ translation: data.translations[0].text.trim() });
    } else {
      res.status(500).json({ error: "No translation returned from DeepL API" });
    }
  } catch (error) {
    console.error("Error with DeepL API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
