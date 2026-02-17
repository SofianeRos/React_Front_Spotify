// ============================
// contexte d'authentification
// ============================
//Ce contexte gere l'authentification globale de l'application
// Il permet de partager l'etat de connexion entre tous les composants
// avantage : Evite le prop drilling (passage de props de composant en composant) et facilite la gestion de la session utilisateur

import { createContext, use, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

// =====================
// Creation du contexte
// =====================
// on definit la structure du contexte avec des valeurs par defauts

const AuthContext = createContext({
  userId: "", // id de l'utilisateur connecté
  email: "", // email de l'utilisateur connecté
  nickname: "", // pseudo de l'utilisateur connecté
  setUserId: () => {}, // fonction pour mettre a jour l'id de l'utilisateur
  setEmail: () => {}, // fonction pour mettre a jour l'email de l'utilisateur
  setNickname: () => {}, // fonction pour mettre a jour le pseudo de l'utilisateur
  signIn: async () => {}, // fonction pour connecter un utilisateur
  signOut: async () => {}, // fonction pour deconnecter un utilisateur
});

// =========================
// Provider du contexte
// =========================
// le provider encapsule l'application et fournit les valeurs du contexte a tous les composants enfants

const AuthContextProvider = ({ children }) => {
  // Etats locaux pour stocker les infos utilisateur
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // =========================
  // Methodes de connexion
  // =========================
  /**
   * connecte un utilisateur et sauvegardes ses infos
   * @param {Objet} user- objet qui contient userId, email et nickname de l'utilisateur
   * exemple attendu de l'objet
   * {
   * userId: 1,
   * email: "toto@tuto.com",
   * nickname: "Toto"
   * }
   */
  const signIn = async (user) => {
    try {
      // mise a jour des etats locaux avec les infos de l'utilisateur
      setUserId(user.userId);
      setEmail(user.email);
      setNickname(user.nickname);

      // sauvegarde des infos de l'utilisateur dans le localStorage pour persister la session
      localStorage.setItem(USER_INFOS, JSON.stringify(user));
    } catch (error) {
      throw new Error(`Erreur lors de la connexion : ${error}`);
    }
  };

  //==========================
  // Methode de deconnexion
  //==========================
  /**
   * deconnecte l'utilisateur en reinitialisant les etats locaux et en supprimant les infos du localStorage
   */
  const signOut = async () => {
    try {
      setUserId("");
      setEmail("");
      setNickname("");

      // suppression des infos de l'utilisateur du localStorage pour terminer la session
      localStorage.removeItem(USER_INFOS);
    } catch (error) {
      throw new Error(`Erreur lors de la deconnexion : ${error}`);
    }
  };

  // ============================
  // Valeurs du contexte
  // ============================
  // objet contenant toutes les valeurs et fonctions a partager
  const value = {
    userId,
    email,
    nickname,
    setUserId,
    setEmail,
    setNickname,
    signIn,
    signOut,
  }

  // rendu du provider avec les valeurs du contexte et les enfants composants
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ==================
// Hook personalise
// ==================
// ce hook permet d'utiliser le contexte plus facilement dans les composants
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };
