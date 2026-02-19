import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";

const OfflineRouter = createBrowserRouter([
  {
    element: <HomeOffline />, // élément qui sera retourné sur toutes les vue
    errorElement: <ErrorPage />, // élément retourné en cas d'erreur
    children: [
      {
        path: "/", // chemin de la vue
        element: <Login />, // élément retourné
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default OfflineRouter;
