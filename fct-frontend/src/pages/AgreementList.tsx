import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useContext, useEffect, useRef, useState } from "react";
import { navigate, trash } from "ionicons/icons";
import { useLocation } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Agreement } from "../models/agreement";
import { AuthContext } from "../components/AuthProvider";

const AgreementList = ({ history }) => {
  const {firebase, updated, setUpdated} = useContext(AuthContext);
  const [user] = useAuthState(firebase.auth);
  const [agreements, setAgreements] = useState<Agreement[]>([]);
  const [presentAlert] = useIonAlert();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const itemSlidingRef = useRef<HTMLIonItemSlidingElement>();

  const getAgreements = async () => {
    const response = await firebase.getAgreementsByUser(user.uid);
    console.log("Agreements", response);
    if (!response.error) {
      setAgreements(response.data);
    }
  };

  useEffect(() => {
    getAgreements();
  },);

  const onVisit = async (agreement: Agreement) => {
    await itemSlidingRef?.current?.closeOpened();
    history.push("/addVisit", agreement);
  }

  const onDelete = (agreement: Agreement) => {
    presentAlert({
      header: "Eliminar Acuerdo",
      subHeader: "¿Realmente desea eliminar el Acuerdo?",
      message: "Se eliminaran las visitas asociadas",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { },
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            firebase.deleteAgreement(agreement);
            getAgreements();
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Acuerdos de la empresa </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            onIonChange={(e) => {
              setSearch(e.target.value?.toLocaleLowerCase() as string);
            }}
            placeholder="Filtro"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>

          {agreements.length > 0 && agreements
            .filter((agreement: Agreement) =>
              agreement.name.toLocaleLowerCase().includes(search)
            )
            .map((agreement: Agreement) => (
              <IonItemSliding key={agreement.id} ref={itemSlidingRef}>
                <IonItem>
                  <IonThumbnail slot="start">
                    <img
                      alt="Portada empresa"
                      src={agreement?.agreementBusiness?.photoUrl}
                    />
                  </IonThumbnail>

                  <IonLabel>
                    <h1>{agreement.name}</h1>
                    <p>{agreement.students}</p>
                    <p>
                      Inicio:
                      {`${new Date(agreement.beginDate).toLocaleDateString(
                        "es-ES"
                      )} Fin: ${new Date(agreement.endDate).toLocaleDateString("es-ES")}`}
                    </p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    expandable
                    onClick={(e) => onVisit(agreement)}>
                    <IonIcon
                      slot="icon-only"
                      icon={navigate}></IonIcon>
                  </IonItemOption>
                  <IonItemOption
                    onClick={() => {
                      onDelete(agreement);
                    }}
                    color="danger"
                    expandable
                  >
                    <IonIcon slot="icon-only" icon={trash}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          {!agreements && (<p>No has creado acuerdos</p>)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AgreementList;
