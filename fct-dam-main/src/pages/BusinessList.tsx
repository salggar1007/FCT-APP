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
import { RouteComponentProps, useLocation } from "react-router";
import { Business } from "../models/business";
import { FirebaseResponse } from "../models/response";
import {
  add,
  businessSharp,
  map,
  trashSharp,
} from "ionicons/icons";
import "./BusinessList.css";
import { AuthContext } from "../components/AuthProvider";

const BusinessList = ({ history }: RouteComponentProps) => {
  const {firebase, updated, setUpdated} = useContext(AuthContext);
  const [presentAlert] = useIonAlert();
  const [business, setBusiness] = useState([]);
  const location = useLocation();
  const [search, setSearch] = useState("");
  const itemSlidingRef = useRef<HTMLIonItemSlidingElement>();

  const getBusiness = async () => {
    const response = await firebase.getBusiness();
    console.log("Business", response);
    if (!response.error) {
      setBusiness(response.data);
    }
  };

  useEffect(() => {
    getBusiness();
  },);

  const onDelete = (id: string) => {
    presentAlert({
      header: "Eliminar Empresa",
      subHeader: "¿Realmente desea eliminar la empresa?",
      message: "Se eliminaran los acuerdos y visitas asociadas",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            firebase.deleteBusiness(id);
            getBusiness();
          },
        },
      ],
    });
  };

  const onAddAgreement = async (business: Business) => {
    await itemSlidingRef?.current?.closeOpened();
    history.push("/addAgreement", business);
  };

  const onMap = async (business: Business) => {
    await await itemSlidingRef?.current?.closeOpened();
    history.push("/map", business);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Empresas</IonTitle>
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
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/addBusiness">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonList>
          {business
            .filter((business: Business) =>
              business.name.toLocaleLowerCase().includes(search)
            )
            .map((business: Business) => (
              <IonItemSliding key={business.id} ref={itemSlidingRef}>
                <IonItem>
                  <IonThumbnail slot="start">
                    <img alt="Portada empresa" src={business.photoUrl} />
                  </IonThumbnail>
                  <IonLabel>
                    <h1>{business.name}</h1>
                    <p>{business.address}</p>
                    <p>{business.phone}</p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    onClick={() => {
                      onAddAgreement(business);
                    }}
                    expandable
                  >
                    <IonIcon slot="icon-only" icon={businessSharp}></IonIcon>
                  </IonItemOption>
                  <IonItemOption
                    onClick={() => {
                      onMap(business);
                    }}
                    color="secondary"
                    expandable
                  >
                    <IonIcon slot="icon-only" icon={map}></IonIcon>
                  </IonItemOption>
                  <IonItemOption
                    onClick={() => {
                      onDelete(business.id);
                    }}
                    color="danger"
                    expandable
                  >
                    <IonIcon slot="icon-only" icon={trashSharp}></IonIcon>
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default BusinessList;
