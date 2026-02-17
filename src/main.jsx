import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     {/* Contexte d'authentification - fournit les informations de l'utilisateur connecté */}
    <AuthContextProvider>
      {/* Router - gere la navigation entre les pages */}
      <AppRouter />
    </AuthContextProvider>
  </StrictMode>,
)
