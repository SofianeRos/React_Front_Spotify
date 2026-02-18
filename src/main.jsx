import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Contexte d'authentification - fournit les informations de l'utilisateur connecté */}
    <AuthContextProvider>
      {/* store redux gere letat global */}
      <Provider store={store}>
        {/* Router - gere la navigation entre les pages */}
        <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
);
