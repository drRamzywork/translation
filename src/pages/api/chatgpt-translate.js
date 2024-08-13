import fetch from "node-fetch";

export default async function handler(req, res) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const endpoint = `https://api.openai.com/v1/chat/completions`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a translator." },
          {
            role: "user",
            content: `Translate the following text to English: ${text}`,
          },
        ],
        max_tokens: 60,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      res
        .status(200)
        .json({ translation: data.choices[0].message.content.trim() });
    } else if (data.error) {
      // If there's an error in the response, log it and send it back
      console.error("OpenAI API error:", data.error);
      res.status(500).json({
        error: data.error.message || "An error occurred with the OpenAI API",
      });
    } else {
      res
        .status(500)
        .json({ error: "No translation choices returned from API" });
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
