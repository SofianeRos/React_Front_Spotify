// =============================
// Router principal de l'application
// =============================
// Ce router determine quel router afficher selon l'etat de connexion
// utilisateur connecté -> OnlineRouter
// utilisateur non connecté -> OfflineRouter

import React, { createContext, useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import OfflineRouter from "./OfflineRouter";
import { useAuthContext } from "../context/AuthContext";
import { USER_INFOS } from "../constants/appConstant";
import PageLoader from "../components/Loader/PageLoader";
import OnlineRouter from "./OnlineRouter";

// ==================================
// contexte de session utilisateur
// ==================================
// mini contexte pour parager l'etat de connexion de l'utilisateur et ses infos basiques (email, pseudo, id)
const SessionContext = createContext({ inSession: false });

// hook personnalise pour utiliser le contexte de session plus facilement dans les composants
export const useSessionContext = () => useContext(SessionContext);

const AppRouter = () => {
  // state pour gerer l'etat de connexion
  // null = chargement , true = utilisateur connecté , false = utilisateur non connecté
  const [inSession, setInSession] = useState(null);

  // recuperer les fonctions du contexte d'authentification pour verifier la session de l'utilisateur
  const { userId, setUserId, setEmail, setNickname } = useAuthContext();

  // recuperation des donnees utilisateur du localStorage
  const userInfos = JSON.parse(localStorage.getItem(USER_INFOS));
  //=============================
  // Verification de session au montage
  //=============================
  useEffect(() => {
    const checkUserSession = async () => {
      if (userInfos) {
        // si j'ai des infos utilisateur dans le localStorage alors je considere que l'utilisateur est en session
        setUserId(userInfos.userId);
        setEmail(userInfos.email);
        setNickname(userInfos.nickname);
        setInSession(true);
      } else {
        // aucune session utilisateur n'est detectee
        setInSession(false);
      }
    };

    checkUserSession();
  }, [userId]);

  // =====================================================
  // Affichage du loader pendant la verification de session
  // =====================================================
  if (inSession === null) {
    return <PageLoader />;
  }

  return (
    <SessionContext.Provider value={{ inSession }}>
      <RouterProvider router={inSession ? OnlineRouter : OfflineRouter} />
    </SessionContext.Provider>
  );
};

export default AppRouter;
