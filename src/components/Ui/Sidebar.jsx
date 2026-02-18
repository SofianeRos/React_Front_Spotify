import React, { useState } from "react";
import {
  dataAlbumNav,
  dataUserNav,
  IMG_LOGO,
  styleIcon,
} from "../../constants/appConstant";
import Navlinks from "./Navlinks";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

// mini composant pour la deconnexion
const Logout = () => {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  // on cree la methode de deconnexion
  const handleLogout = () => {
    signOut(); // on deconnecte l'utilisateur en appelant la methode du contexte d'authentification
    navigate("/"); // on redirige l'utilisateur vers la page de connexion apres la deconnexion
  };
  return (
    <button
      onClick={() => {
        const confirmLogout = window.confirm(
          "Voulez vous vraiment vous deconnecter ?",
        );
        if (confirmLogout) handleLogout();
      }}
      className="link-sidebar"
    >
      <FiLogOut className="mr-2" style={styleIcon} />
      Deconnexion
    </button>
  );
};

const Sidebar = () => {
  // on cree nos states
  const [mobileMenu, setMobileMenu] = useState(false);
  // on recupere l'id de l'utilisateur connecte grace au contexte d' authentification

  const { userId } = useAuthContext();

  return (
    <>
      {/* Side bar pour la vue au dessus de 768px */}
      <div className="hidden flex-col md:flex w-60 py-10 px-4 bg-black justify-between">
        <div>
          <img
            className="w-full h-14 object-contain"
            src={IMG_LOGO}
            alt="Logo Spotify"
          />
          <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
          <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />
          <h2 className="text-lg text-white font-semibold mt-10">
            Utilisateur
          </h2>
          <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />
        </div>
        {/* ajout du bouton de deconnexion */}
        <div className="mt-5">
          <Logout />
        </div>
      </div>
      {/* gestion des icones pour ouvrir/fermer le menu petit ecran */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenu ? (
          <RiCloseLine
            style={styleIcon}
            className="text-white mr-2"
            onClick={() => setMobileMenu(false)}
          />
        ) : (
          <HiOutlineMenu
            style={styleIcon}
            className="text-white mr-2"
            onClick={() => setMobileMenu(true)}
          />
        )}
      </div>
            {/* Side bar pour la vue au dessus de 768px */}
      <div className={`z-20 absolute top-0 h-screen w-2/3 bg-linear-to-tl from-white_01 to-black backdrop-blur-lg md:hidden smooth-transition duration-500 ${mobileMenu ? 'left-0' : '-left-full'} flex flex-col justify-beetween p-6`}>
        <div>
          <img
            className="w-full h-14 object-contain"
            src={IMG_LOGO}
            alt="Logo Spotify"
          />
          <h2 className="text-lg text-white font-semibold mt-10">Albums</h2>
          <Navlinks data={dataAlbumNav} marginTop={"mt-4"} />
          <h2 className="text-lg text-white font-semibold mt-10">
            Utilisateur
          </h2>
          <Navlinks data={dataUserNav} marginTop={"mt-4"} userId={userId} />
        </div>
        {/* ajout du bouton de deconnexion */}
        <div className="mt-5">
          <Logout />
        </div>
      </div>

    </>
  );
};

export default Sidebar;
