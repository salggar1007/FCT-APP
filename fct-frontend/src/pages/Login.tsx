import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { logoGoogle } from "ionicons/icons";

import { RouteComponentProps } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../components/AuthProvider";


const Login = ({ history }: RouteComponentProps) => {
  const {firebase} = useContext(AuthContext);
  const [user, loading, error] = useAuthState(firebase.auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) history.replace('/business');
  }, [user, loading]);

  const doLogin = async () => {
    firebase.signInWithCapacitor();
  };

  const logout = () => {
    firebase.logOut();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard color="light">
          <IonCardHeader>
            <IonCardTitle>iFCT</IonCardTitle>
            <IonCardSubtitle>IES Virgen del Carmen</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid fixed={true}>
              <IonRow class="ion-justify-content-center">
                <IonCol className="ion-text-center">
                  <img
                    src="assets/escudo1.png"
                    alt="IES Virgen del Carmen"
                  ></img>
                </IonCol>
              </IonRow>
              <IonRow class="ion-justify-content-center">
                <IonCol className="ion-text-center">
                  <p>
                    Pulse el siguiente botón para iniciar sesión con una cuenta
                    de Google
                  </p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-center">
                  {!user && (
                    <IonButton color="danger" onClick={doLogin}>
                      <IonIcon slot="start" icon={logoGoogle} />
                      Iniciar sesión con Google
                    </IonButton>
                  )}
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {user && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle className="ion-text-center">
                <b>{user.displayName}</b>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonImg src={user.photoURL} style={{ borderRadius: "1px" }} />
              <IonItem>
                <IonLabel>email:</IonLabel>
                <span>{user.email}</span>
              </IonItem>
              <IonButton expand="block" color="danger" onClick={logout}>
                Cerrar sesión
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
