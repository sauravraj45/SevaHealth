
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://127.0.0.1:11434";

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(`${OLLAMA_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3:latest",
        messages: [
          { role: "system", content: "You are a health assistant. Respond only in JSON with symptoms, precautions, medicines." },
          { role: "user", content: message }
        ],
        max_tokens: 500
      }),
    });

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || "";

    let reply;
    try {
      reply = JSON.parse(rawContent);
    } catch {
      reply = { text: rawContent };
    }

    res.json(reply);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
