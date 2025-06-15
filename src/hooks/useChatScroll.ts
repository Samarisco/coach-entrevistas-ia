import React from "react";

function useChatScroll<T>(dep: T): React.RefObject<HTMLDivElement | null> {
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default useChatScroll;

/**
 * Componente: ChatComponent
 * Simulador de entrevistas con IA usando Gemini
 * Autor: Samael Amaral – Dev en Desarrollo
 * Año: 2025
 */
