import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/Ui/CustomInput";
import ErrorMessage from "../../components/Ui/ErrorMessage";
import ButtonLoader from "../../components/Loader/ButtonLoader";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_ROOT } from "../../constants/apiConstant";

const Register = () => {
  // on déclare nos state pour les valeurs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // on recupère le hook de navigation
  const navigate = useNavigate();

  //on recupère la méthode signIn du contexte
  const { signIn } = useAuthContext();

  useEffect(() => {
    //si j'ai un utilisateur en session alors on le redirige sur "/" du router online
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  //méthode qui receptionne les données du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // on empeche le comportement naturel du formulaire
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!email || !nickname || !password || !confirmPassword) {
        setErrorMessage("Tous les champs sont obligatoires");
        return;
      } else if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe doivent être identiques");
        return;
      } else if (password.length < 4) {
        setErrorMessage("Le mot de passe doit contenir au moins 4 caractères");
        return;
      }else{
        const response = await axios.post(`${API_ROOT}/register`, {
          email,
          password,
          nickname
        })
console.log("RESPONSE",response.data)
        if(response.data?.success === false){
          setErrorMessage(response.data.message);
          
        }else{
          const loggedInUser = {
            userId: response.data.user.id,
            email: response.data.user.email,
            nickname: response.data.user.nickname
          }

          await signIn(loggedInUser);
          setUser(loggedInUser);

          //on force la redirection vers la plateforme
          navigate("/");
        }
      }




    } catch (error) {
      console.log(`Erreur de requete lors de la création du compte: ${error}`);
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4 sm:px-6 py-8">
      <div className="w-full max-w-md animate-slideup2">
        <div className="text-center mb-8">
          <h1 className="title-h1">Créez un compte</h1>
          <p className="text-gray-300 mt-2 text-sm">
            Rejoignez la plateforme en quelques secondes
          </p>
        </div>

        {/* formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-2xl shadow-black_05"
        >
          <div className="space-y-1">
            <CustomInput
              label={"Saisir votre pseudo"}
              type={"text"}
              placeholder="le-BG-du-66" // propriété optionnelle
              state={nickname}
              callable={(event) => setNickname(event.target.value)}
            />
            <CustomInput
              label={"Saisir votre email"}
              type={"email"}
              placeholder="votre@email.com" // propriété optionnelle
              state={email}
              callable={(event) => setEmail(event.target.value)}
            />
            <CustomInput
              label={"Saisir votre mot de passe"}
              type={"password"}
              placeholder="********" // propriété optionnelle
              state={password}
              callable={(event) => setPassword(event.target.value)}
            />
            <CustomInput
              label={"Confirmer votre mot de passe"}
              type={"password"}
              placeholder="********" // propriété optionnelle
              state={confirmPassword}
              callable={(event) => setConfirmPassword(event.target.value)}
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
                Créer un compte
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-gray-300 text-sm">
            Vous avez déjà un compte ?{" "}
            <Link
              to={"/"}
              className="text-green font-semibold hover:text-green_top underline underline-offset-2 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
