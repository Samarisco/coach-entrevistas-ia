import * as React from "react";
import { LuBot, LuSendHorizontal, LuRefreshCw, LuBriefcase } from "react-icons/lu";
import Markdown from "react-markdown";
import useChatScroll from "../hooks/useChatScroll";
import { askOpenAI } from "../services/openai"; 

const ChatComponent: React.FunctionComponent = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState("");
  const [mode, setMode] = React.useState<"inputRole" | "answering">("inputRole");
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [ttsEnabled, setTtsEnabled] = React.useState(false);

  const ref = useChatScroll(messages);

  const speak = (text: string) => {
    if (!ttsEnabled) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-MX";
    speechSynthesis.speak(utterance);
  };

  const sendMessage = (text: string, sender: "user" | "bot" = "bot") => {
    setMessages((prev) => [...prev, { text, sender }]);
    if (sender === "bot") speak(text);
  };

  React.useEffect(() => {
    const bienvenida = "👋 ¡Hola! Soy tu coach virtual de entrevistas 🧠💼\n\nTe ayudaré a prepararte con preguntas realistas❓ y retroalimentación profesional 📝 para que triunfes en tu próxima entrevista 🚀💪\n\n✍️ *Escribe el puesto al que deseas postularte y comencemos.*";
    sendMessage(bienvenida, "bot");
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();
    setInput("");
    sendMessage(userInput, "user");

    if (mode === "inputRole") {
      try {
        const prompt = `Eres un reclutador experto. Genera una pregunta de entrevista realista y útil para el puesto de: ${userInput}`;
        const result = await askOpenAI(prompt);
        sendMessage(result, "bot");
        setCurrentQuestion(result);
        setMode("answering");
      } catch (error) {
        console.error("Error generando pregunta:", error);
        sendMessage("❌ Error al generar la pregunta.", "bot");
      }
    } else if (mode === "answering") {
      try {
        const prompt = `Eres un experto en entrevistas de trabajo. Evalúa esta respuesta:\n\nPregunta: ${currentQuestion}\n\nRespuesta: ${userInput}\n\nProporciona retroalimentación útil, clara y profesional.`;
        const result = await askOpenAI(prompt);
        sendMessage(result, "bot");
        setMode("inputRole");
      } catch (error) {
        console.error("Error evaluando respuesta:", error);
        sendMessage("❌ Error al evaluar la respuesta.", "bot");
      }
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white">
      <h2 className="p-4 font-semibold text-lg text-center bg-black flex text-white justify-center items-center gap-2">
        Simulador de Entrevistas con IA <LuBriefcase size={25} />
      </h2>

      <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "bg-black text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            <Markdown>{msg.text}</Markdown>
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            mode === "inputRole"
              ? "Escribe el puesto (ej. Diseñador UX)"
              : "Escribe tu respuesta a la pregunta..."
          }
        />
        <button
          onClick={handleSend}
          className="p-2 bg-green-600 text-white rounded-r"
        >
          <LuSendHorizontal size={25} />
        </button>

        {messages.length > 1 && (
          <button
            onClick={() => {
              setMessages([]);
              setInput("");
              setCurrentQuestion("");
              setMode("inputRole");
              setTimeout(() => {
                sendMessage(
                  "👋 ¡Hola! Soy tu coach virtual de entrevistas 🧠💼\n\nTe ayudaré a prepararte con preguntas realistas ❓ y retroalimentación profesional 📝 para que triunfes en tu próxima entrevista 🚀💪\n\n✍️ *Escribe el puesto al que deseas postularte y comencemos.*",
                  "bot"
                );
              }, 100);
            }}
            className="p-2 bg-blue-600 text-white rounded"
            title="Nueva entrevista"
          >
            <LuRefreshCw size={25} />
          </button>
        )}

        <button
          onClick={() => setTtsEnabled(!ttsEnabled)}
          className={`p-2 text-white rounded ${
            ttsEnabled ? "bg-red-500" : "bg-gray-600"
          }`}
          title="Activar/desactivar voz"
        >
          🔊
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;

/**
 * Componente: ChatComponent
 * Simulador de entrevistas con IA usando OpenAI
 * Autor: Samael Amaral – Dev en Desarrollo
 * Año: 2025
 */
