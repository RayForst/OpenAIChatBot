# Chat Application

This is a simple chat application built with Vue 3, using the Composition API and Anime.js for animations. It integrates with OpenAI's GPT-4 API to handle user interactions and provides error handling with visual feedback.

---

## Requirements

Before running the application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

---

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file by copying the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your OpenAI API key and other necessary configurations:

   ```
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_APP_CHAT_TITLE=Chat Assistant
   ```

   Replace `your_openai_api_key` with your OpenAI API key.

---

## Running the Application

To start the development server:

```bash
npm run dev
```

This will launch the application at `http://localhost:5173`.

---

---

## License

This project is licensed under the [MIT License](LICENSE).
