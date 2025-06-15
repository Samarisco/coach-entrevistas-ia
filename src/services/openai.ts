import axios from "axios";

// Obtenemos la clave desde .env
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function askOpenAI(prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || "⚠️ Sin respuesta.";
  } catch (error: any) {
    // Si excede el límite o falta de crédito
    if (error.response?.status === 429) {
      return (
        "☀️ Nuestro coach virtual se fue de vacaciones por *falta de presupuesto*. 🏖️💸\n\n" +
        "Agrega tu propia API Key de OpenAI en el archivo `.env` para que vuelva al trabajo. 😅"
      );
    }

    // Otro error
    console.error("❌ Error general con OpenAI:", error);
    return "❌ Ocurrió un error inesperado al contactar a la IA.";
  }
}
