import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { save } from "ionicons/icons";
import { useContext, useEffect, useRef } from "react";

import { RouteComponentProps } from "react-router";
import { AuthContext } from "../components/AuthProvider";
import { User } from "../models/user";
import { Vehicle } from "../models/vehicle";

const Profile = ({ history }: RouteComponentProps) => {
  const { firebase } = useContext(AuthContext);
  const refModel = useRef<HTMLIonInputElement>();
  const refRegistration = useRef<HTMLIonInputElement>();

  useEffect(() => {
    const loadUser = async () => {
      const response = await firebase.getUser();
      if (!response.error) {
        const user: User = response.data;
        refModel.current.value = user.model
        refRegistration.current.value = user.registrationNumber;
      }
    }
    loadUser();
  }, []);

  const onSave = async () => {
    const vehicle: Vehicle = {
      model: refModel.current.value as string,
      registrationNumber: refRegistration.current.value as string
    }
    await firebase.updateVehicle(vehicle);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Pérfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel>Vehículo Propio</IonLabel>
            <IonInput ref={refModel} placeholder="Módelo vehículo"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Matrícula Vehículo Propio</IonLabel>
            <IonInput ref={refRegistration} placeholder="Matrícula"></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={onSave}>
          <IonIcon slot="start" icon={save}></IonIcon>Guardar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
