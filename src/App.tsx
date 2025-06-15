import * as React from "react";
import ChatComponent from "./components/ChatComponent";

const App: React.FunctionComponent = () => {
  return (
    <div className="max-w-lg mt-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
        <ChatComponent />
      </div>
    </div>
  );
};

export default App;


/**
 * Componente: ChatComponent
 * Simulador de entrevistas con IA usando Gemini
 * Autor: Samael Amaral – Dev en Desarrollo
 * Año: 2025
 */
