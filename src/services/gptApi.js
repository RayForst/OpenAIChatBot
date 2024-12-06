import configGpt from "../../config.gpt";

export async function sendToGPT(messages, prompt) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const systemMessage = configGpt.join(" ");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemMessage },
          ...messages.map((m) => ({
            role: m.author === "user" ? "user" : "assistant",
            content: m.text
          })),
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "JSON parsing failed" }));
      const errorMessage =
        errorData.error || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.choices && data.choices[0]
      ? data.choices[0].message.content
      : "Нет ответа";
  } catch (error) {
    console.error("Error sending to GPT:", error);
    return "Ошибка: " + error.message;
  }
}
