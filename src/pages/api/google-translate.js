// pages/api/google-translate.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  const endpoint = `https://translation.googleapis.com/language/translate/v2`;

  try {
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: "en", // Translating to Arabic
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res
        .status(200)
        .json({ translation: data.data.translations[0].translatedText });
    } else {
      console.error("Google Translate API error:", data);
      res.status(500).json({ error: data.error.message || "Unknown error" });
    }
  } catch (error) {
    console.error("Error with Google Translate API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
