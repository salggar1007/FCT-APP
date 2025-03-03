import { Route } from "react-router-dom";
import {
  IonApp,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";


/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "./App.css";
import Login from "./pages/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import Tabs from "./Tabs";
import AuthProvider, { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";

setupIonicReact();

const App: React.FC = () => {
  const {firebase} = useContext(AuthContext);
  const [user] = useAuthState(firebase.auth);
  return (
    <IonApp>
      <IonReactRouter>
        <Route path="/" component={user ? Tabs : Login} />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
