// ===========================
// ROUTER PRINCIPALE DE L'APPLICATION
// ===========================
// ce router determine quel router afficher selon l'état de connexion
// utilisateur connecté-> OnlineRouter (application complète)
// utilisateur pas connecté -> OfflineRouter (login/register)

import React, { createContext, useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import OfflineRouter from "./OfflineRouter";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import PageLoader from "../components/Loader/PageLoader";
import OnlineRouter from "./OnlineRouter";

// ===========================
// CONTEXTE DE SESSION
// ===========================
// Mini contexte pour partager l'état de connexion dans l'app
const SessionContext = createContext({ inSession: false });

// Hook personnalisé pour accéder au contexte de session
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
  // state pour gérer l'état de connexion
  // null = chargement, true = connecté, false = déconnecté
  const [inSession, setInSession] = useState(null);

  // récupérer les fonctions du contexte d'authentification
  const { userId, setUserId, setEmail, setNickname } = useAuthContext();

  // recupération des données utilisateur du localStorage
  const userInfos = JSON.parse(localStorage.getItem(USER_INFOS));

  // ===========================
  // VERIFICATION DE SESSION AU MONTAGE
  // ===========================
  useEffect(() => {
    const checkUserSession = async () => {
      if (userInfos) {
        // si des infos utilisateur existent, on les charge dans le contexte
        setUserId(userInfos.userId);
        setEmail(userInfos.email);
        setNickname(userInfos.nickname);
        setInSession(true);
      } else {
        // aucune session utilisateur trouvé
        setInSession(false);
      }
    };

    checkUserSession();
  }, [userId]);

  // ===========================
  // AFFICHAGE DU LOADER PENDANT LA VERIF
  // ===========================
  if (inSession === null) {
    return <PageLoader />;
  }

  return (
    <SessionContext.Provider value={{inSession }}>
      <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
    </SessionContext.Provider>
  );
};

export default AppRouter;
