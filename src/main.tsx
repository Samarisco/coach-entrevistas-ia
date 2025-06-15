import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/**
 * Componente: ChatComponent
 * Simulador de entrevistas con IA usando Gemini
 * Autor: Samael Amaral – Dev en Desarrollo
 * Año: 2025
 */
