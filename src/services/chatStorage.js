export function loadMessages() {
  const saved = sessionStorage.getItem("chatHistory");
  return saved ? JSON.parse(saved) : [];
}

export function saveMessages(messages) {
  sessionStorage.setItem("chatHistory", JSON.stringify(messages));
}
