import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { RouteComponentProps, useLocation } from "react-router";
import { Business } from "../models/business";
import "./BusinessMap.css";
import { getDistance, LOCATION_IES } from "../geo/gcloudapi";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import { useRef } from "react";
import { Distance } from "../models/distance";

const BusinessMap = ({ history }: RouteComponentProps) => {
  const [business] = useState<Business>(history.location.state as Business);
  const location = useLocation();
  const [markers, setMarkers] = useState<string[]>([]);
  const [distance, setDistance] = useState<Distance>(null);
  const mapRef = useRef<HTMLElement>();

  const loadMapData = async () => {
    try {
      const gdistance = await getDistance(business.name, business.address);
      setDistance(gdistance as any);
    } catch (err) {
      console.log(err);
    }
  };

  const loadData = async () => {
    await loadMapData();
    await createMap();
  };

  useEffect(() => {
    loadData();
    return () => {
      //newMap.removeMarkers(markers);
    };
  }, [location.key]);

  async function createMap() {
    const map = await GoogleMap.create({
      id: "map",
      element: mapRef.current,
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
      config: {
        center: LOCATION_IES,
        zoom: 11,
      },
    });

    const markers: Marker[] = [];

    if (business.location) {
      markers.push({
        coordinate: business.location,
        title: business.name,
        snippet: business.address,
        tintColor: { r: 255, g: 0, b: 0, a: 255 },
      });
    }
    markers.push({
      coordinate: LOCATION_IES,
      title: "IES Virgen del Carmen",
      snippet: "Paseo de la Estación, 44",
      tintColor: { r: 0, g: 0, b: 255, a: 255 },
    });
    const result = await map.addMarkers(markers);
    setMarkers(result);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="content-map" fullscreen>
        <div className="map">
          <capacitor-google-map ref={mapRef}></capacitor-google-map>
        </div>
        <IonCard>
          <IonCardHeader>Datos empresa</IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>{business.name}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>{business.address}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>{business.phone}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>{`Distancia recorrido en vehículo: ${distance?.distance.text}`}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>{`Duración recorrido en vehículo: ${distance?.duration.text}`}</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default BusinessMap;
