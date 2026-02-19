// ===========================
// CONTEXTE D'AUTHENTIFICATION
// ===========================
// Ce contexte gère l'authentification globale de l'application
// il permet de partager l'etat de connexion entre tous les composants
// Avantage: Evite le prop drilling (passage de props a travers niveau de composant)

import { createContext, useContext, useState } from "react";
import { USER_INFOS } from "../constants/appConstant";

// ===========================
// CREATION DU CONTEXTE
// ===========================
// on définit la structure du contexte avec des valeurs par defaut
const AuthContext = createContext({
  userId: "", //ID de l'utilisateur connecté
  email: "", //Email de l'utilisateur
  nickname: "", // Pseudo de l'utilisateur
  setUserId: () => {}, // fonction pour modifier userId
  setEmail: () => {}, // fonction pour modifier email
  setNickname: () => {}, // fonction pour modifier nickname
  signIn: async () => {}, // fonction de connexion
  signOut: async () => {}, // fonction de déconnexion
});

// ===========================
// PROVIDER DU CONTEXTE
// ===========================
// Le Provider encapsule toute l'application et rend les données accessibles
const AuthContextProvider = ({ children }) => {
  // Etats locaux pour stocker les infos utilisateur
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  // ===========================
  // METHODE DE CONNEXION
  // ===========================
  /**
   * Connecte un utilisateur et sauvegarde ses infos
   * @param {Objet} user - Objet qui contient userId, email et nickname
   * exemple attendu de l'Objet:
   * {
   *  userId: 1,
   *  email: "toto@toto.com",
   *  nickname: "toto"
   * }
   */
  const signIn = async (user) => {
    try {
      // Mise à jour des états avec les données utilisateur
      setUserId(user.userId);
      setEmail(user.email);
      setNickname(user.nickname);

      // Sauvegarde dans le localStorage de l'utilisateur
      localStorage.setItem(USER_INFOS, JSON.stringify(user));
    } catch (error) {
      throw new Error(`Erreur lors de la connexion: ${error}`);
    }
  };

  // ===========================
  // METHODE DE DECONNEXION
  // ===========================
  /**
   * Deconnecte l'utilisateur et nettoie les données
   */
  const signOut = async () => {
    try {
      setUserId("");
      setEmail("");
      setNickname("");

      //suppression du localStorage
      localStorage.removeItem(USER_INFOS);
    } catch (error) {
      throw new Error(`Erreur lors de la déconnexion: ${error}`);
    }
  };

  // ===========================
  // VALEUR DU CONTEXTE
  // ===========================
  // Objet contenant toutes les valeurs et fonction à partager
  const value = {
    userId,
    email,
    nickname,
    setUserId,
    setEmail,
    setNickname,
    signIn,
    signOut,
  };

  // Rendu du Provider avec les valeurs
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ===========================
// HOOK PERSONNALISE
// ===========================
//Hook pour faciliter l'accès au contexte dans les composants
// Usage : const {userId, signIn} = useAuthContext()
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };
