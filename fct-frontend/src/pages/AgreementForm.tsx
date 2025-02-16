import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Agreement } from "../models/agreement";
import { Business } from "../models/business";
import { parseISO } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../components/AuthProvider";

const AgreementForm = ({ history }: RouteComponentProps) => {
  const {firebase, updated, setUpdated} = useContext(AuthContext);
  const [user] = useAuthState(firebase.auth);
  const [business] = useState<Business>(history.location.state as Business);
  const [agreement, setAgreement] = useState<Agreement>({
    name: `${business.name} (${new Date().toLocaleDateString("es-es", {
      year: "numeric",
      month: "short",
    })})`,
    students: "",
    beginDate: new Date(),
    endDate: new Date(),
    creationDate: new Date(),
    userId: user.uid,
    businessId: business.id
  });

  const onAddAgreement = async () => {
    const response = await firebase.addAgreement(agreement);
    if (!response.error) {
      history.push("/agreements");
    }
    setUpdated(prev => !prev);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nuevo Acuerdo con {business.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonImg src={business?.photoUrl} alt="Portada Empresa"></IonImg>
        <IonList>
          <IonItem>
            <IonLabel>Nombre</IonLabel>
            <IonInput
              value={agreement.name}
              onIonChange={(event) => {
                setAgreement({
                  ...agreement,
                  name: event.target.value as string,
                });
              }}
              placeholder="Nombre empresa"
            />
          </IonItem>
          <IonItem>
            <IonLabel>Alumnos</IonLabel>
            <IonTextarea
              value={agreement.students}
              onIonChange={(event) => {
                setAgreement({
                  ...agreement,
                  students: event.target.value as string,
                });
              }}
              placeholder=""
            />
          </IonItem>
          <IonItem>
            <IonLabel>Fecha Inicio</IonLabel>
            <>
              <IonDatetimeButton datetime="datetimeBegin"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  onIonChange={(event) => {
                    setAgreement({
                      ...agreement,
                      beginDate: parseISO(event.target.value as string),
                    });
                  }}
                  presentation="date"
                  locale="es-ES"
                  id="datetimeBegin"
                ></IonDatetime>
              </IonModal>
            </>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha Fin</IonLabel>
            <>
              <IonDatetimeButton datetime="datetimeEnd"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  onIonChange={(event) => {
                    setAgreement({
                      ...agreement,
                      endDate: parseISO(event.target.value as string),
                    });
                  }}
                  presentation="date"
                  locale="es-ES"
                  id="datetimeEnd"
                ></IonDatetime>
              </IonModal>
            </>
          </IonItem>
        </IonList>
        <IonButton onClick={onAddAgreement} expand="block">
          Añadir
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AgreementForm;
