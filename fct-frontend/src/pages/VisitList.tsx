import {
  IonButtons,
  IonContent,
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
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { thumbsUp, trash } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../components/AuthProvider";
import { Conveyance, Visit, VisitType } from "../models/visit";

const AUTHORIZED_FILTER_ALL = 0;
const AUTHORIZED_FILTER_TRUE = 1;
const AUTHORIZED_FILTER_FALSE = 2;


const VisitList = ({ history }) => {
  const { firebase, updated, setUpdated } = useContext(AuthContext);
  const { fullUser } = useContext(AuthContext);
  const [visits, setVisits] = useState<Visit[]>([]);
  const location = useLocation();
  const [presentAlert] = useIonAlert();
  const itemSlidingRef = useRef<HTMLIonItemSlidingElement>();
  const [search, setSearch] = useState("");
  const [authorizedFilter, setAuthorizedFilter] = useState(AUTHORIZED_FILTER_ALL);

  const getVisits = async () => {
    const response = await firebase.getVisitsByUser();
    console.log("Visits", response);
    if (!response.error) {
      setVisits(response.data);
    }
  };

  useEffect(() => {
    getVisits();
  },);

  const onDelete = (visit: Visit) => {
    presentAlert({
      header: "Eliminar Visita",
      subHeader: "¿Realmente desea eliminar la Visita?",
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
            firebase.deleteVisit(visit);
            getVisits();
          },
        },
      ],
    });
  };

  const onAuthorize = (visit: Visit) => {
    presentAlert({
      header: "Autorizar Visita",
      subHeader: "¿Realmente desea autorizar la visita?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => { },
        },
        {
          text: "OK",
          role: "confirm",
          handler: async () => {
            await firebase.authorizeVisit(visit, true);
            await itemSlidingRef?.current?.closeOpened();
            getVisits();
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
          <IonTitle>Visitas</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonList lines="none">
            <IonItem>
              <IonSelect
                value={authorizedFilter}
                placeholder="Tipo de visita:"
                onIonChange={(e) => {
                  setAuthorizedFilter(e.target.value);
                }}
              >
                <IonSelectOption value={AUTHORIZED_FILTER_ALL}>
                  Todas
                </IonSelectOption>
                <IonSelectOption value={AUTHORIZED_FILTER_FALSE}>
                  No Autorizadas
                </IonSelectOption>
                <IonSelectOption value={AUTHORIZED_FILTER_TRUE}>
                  Autorizadas
                </IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonSearchbar
                onIonChange={(e) => {
                  setSearch(e.target.value?.toLocaleLowerCase() as string);
                }}
                placeholder="Filtro"
              ></IonSearchbar>
            </IonItem>
          </IonList>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {visits.length > 0 &&
            visits
              .filter((visit: Visit) =>
                visit.agreement?.name.toLocaleLowerCase().includes(search)
              )
              .filter((visit: Visit) => {
                switch (authorizedFilter) {
                  case AUTHORIZED_FILTER_ALL:
                    return true;
                  case AUTHORIZED_FILTER_FALSE:
                    return visit.authorized === false
                  case AUTHORIZED_FILTER_TRUE:
                    return visit.authorized
                  default:
                    return false
                }
              })
              .map((visit: Visit) => (
                <IonItemSliding key={visit.id} ref={itemSlidingRef}>
                  <IonItem>
                    <IonThumbnail slot="start">
                      <img
                        alt="Portada empresa"
                        src={visit?.agreement?.agreementBusiness?.photoUrl}
                      />
                    </IonThumbnail>
                    <IonLabel>
                      <h1>{visit.agreement?.name}</h1>
                      <h1>Visita {visit.authorized ? "Autorizada " + visit.authorizedDate.toLocaleDateString("es-ES") + " " + visit.authorizedDate.toLocaleTimeString("es-ES") : "No autorizada"}</h1>
                      <p>Visita: {VisitType[visit.type]}</p>
                      <p>Medio: {Conveyance[visit.transport]}</p>
                      <p>Distancia: {visit.agreement?.agreementBusiness?.distance?.distance.text}, {visit.agreement?.agreementBusiness?.distance?.duration.text}</p>
                      <p>Alumnos: {visit.agreement?.students}</p>
                      <p>
                        Inicio:
                        {`${new Date(visit.beginDate).toLocaleDateString(
                          "es-ES"
                        )} Fin: ${new Date(visit.endDate).toLocaleDateString(
                          "es-ES"
                        )}`}
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    {
                      fullUser?.admin ? (
                        <IonItemOption
                          onClick={() => {
                            onAuthorize(visit);
                          }}
                          color="success"
                          expandable
                        >
                          <IonIcon slot="icon-only" icon={thumbsUp}></IonIcon>
                        </IonItemOption>
                      ) : ""
                    }
                    <IonItemOption
                      onClick={() => {
                        onDelete(visit);
                      }}
                      color="danger"
                      expandable
                    >
                      <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
          {!visits && <p>No has creado acuerdos</p>}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default VisitList;