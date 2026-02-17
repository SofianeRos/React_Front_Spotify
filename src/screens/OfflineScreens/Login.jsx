import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/Ui/CustomInput";
import ErrorMessage from "../../components/Ui/ErrorMessage";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import { useAuthContext } from "../../context/AuthContext";
import axios, { Axios } from "axios";
import { API_ROOT } from "../../constants/apiConstant";

const Login = () => {
  // on declare nos state pour les valeurs du formulaire de login

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // on recupere le hookk de navigation

  const navigate = useNavigate();
  // on recupere la methode signin 
  const { signIn } = useAuthContext();

  useEffect(() => {
    // si j'ai un utilisateur en session alors on le redirige sur"/" du router online

    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  //methoe qui receptionne les donnees du formulaire

  const handleSubmit = async (event) => {
    event.preventDefault(); // on empeche le conmportement naturel du formulaire
    setIsLoading(true); // on affiche le loader
    setErrorMessage(""); // on reinitialise le message d'erreur


    // on verifie que les champs sont bien remplis

  try {
    if(email == "" || password == "") {
      setErrorMessage("Veuillez remplir tous les champs du formulaire.");
      return;
    }
  


   
      // on execute la requete sur l'Api

      const response = await axios.post(`${API_ROOT}/login`, {email, password});

      if(response.data.success === false) {
        setErrorMessage(response.data.message);
      } else {
        // on reconstruit un objet user
        const loggedInUser = {
          userId: response.data.id,
          email: response.data.email,
          nickname: response.data.nickname
        }
        // on appelle la methode signin de authcontext
        await signIn(loggedInUser);
        setUser(loggedInUser);

      }


    } catch (error) {
      console.log(`Erreur lors de la connexion : ${error}`);
      setErrorMessage("email ou mot de passe incorrect");
    } finally {
      setIsLoading(false); // on masque le loader
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 sm:px-6 py-8">
      <div className="w-full max-w-md animate-slideup2">
        <div className="text-center mb-8">
          <h1 className="title-h1">Connectez vous</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Accedez a votre bibliothèque musicale
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 p-8 sm:p-10 shadow-2xl shadow-black_05"
        >
          <div className="space-y-1">
            <CustomInput
              label={"Saisir votre email"}
              type={"email"}
              placeholder="votre@email.com" // propriete optionnelle
              state={email}
              callable={(event) => setEmail(event.target.value)}
            />
            <CustomInput
              label={"Saisir votre mot de passe"}
              type={"password"}
              placeholder="*********" // propriete optionnelle
              state={password}
              callable={(event) => setPassword(event.target.value)}
            />
          </div>

          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className="mt-8">
            {isLoading ? (
              <div className="flex justify-center py-2">
                <ButtonLoader />
              </div>
            ) : (
              <button className="main-button" type="submit">
                Se connecter
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-gray-300 text-sm ">
            Pas de compte ?{" "}
            <Link to={"/register"} className="text-green font-semibold hover:text-green_top underline underline-offset-2 transition-colors">
            Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
