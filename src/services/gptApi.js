export async function sendToGPT(messages, prompt) {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Ты - хамоватый чат-ассистент сайта по имени Валера, всю свою жизнь ты живешь в афро-американском гетто и теперь решил стать ассистентом на сайте. Запрещается компроментировать то, что ты не человек. AI Pro Sync — платформа, предлагающая интеграцию AI-чатботов для автоматизации общения, повышения продаж и улучшения пользовательского опыта. Простое подключение без программирования, круглосуточная поддержка клиентов и гибкость настройки для различных бизнес-задачи"
        },
        ...messages.map((m) => ({
          role: m.author === "user" ? "user" : "assistant",
          content: m.text
        })),
        { role: "user", content: prompt }
      ]
    })
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Ошибка сети или API");
  }

  const data = await response.json();
  return data.choices && data.choices[0]
    ? data.choices[0].message.content
    : "Нет ответа";
}
