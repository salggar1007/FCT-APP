import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { business, briefcase, navigate, logOut, person } from "ionicons/icons";

import BusinessList from "./pages/BusinessList";
import AgreementList from "./pages/AgreementList";
import Profile from "./pages/Profile";
import VisitList from "./pages/VisitList";
import { IonReactRouter } from "@ionic/react-router";
import BusinessForm from "./pages/BusinessForm";
import AgreementForm from "./pages/AgreementForm";
import VisitForm from "./pages/VisitForm";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";

const Tabs: React.FC = () => {
  const { firebase } = useContext(AuthContext);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/business" component={BusinessList} />
            <Route exact path="/agreements" component={AgreementList} />
            <Route exact path="/visit" component={VisitList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addBusiness" component={BusinessForm} />
            <Route exact path="/addAgreement" component={AgreementForm} />
            <Route exact path="/addVisit" component={VisitForm} />
            <Route exact path="/">
              <Redirect to="/business" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/business">
              <IonIcon icon={business} />
              <IonLabel>Empresas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/agreements">
              <IonIcon icon={briefcase} />
              <IonLabel>Acuerdos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/visit">
              <IonIcon icon={navigate} />
              <IonLabel>Visitas</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/profile">
              <IonIcon icon={person} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" onClick={firebase.logOut}>
              <IonIcon icon={logOut} />
              <IonLabel>Salir</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default Tabs;
