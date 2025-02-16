import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useContext, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import { AuthContext } from "../components/AuthProvider";
import { findPlaceByName, getCoordinates, getDistance, LOCATION_IES } from "../geo/gcloudapi";
import { Business } from "../models/business";
import "./BusinessForm.css";

interface Props extends RouteComponentProps<{}> {}

const initialBusiness: Business = {
  name: "",
  address: "",
  postal_code: "",
  city: "",
  province: "",
  phone: "",
  photoUrl: "",
  placeId: "",
};

const BusinessForm = ({ history }: Props) => {
  const {firebase, setUpdated} = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [newBusiness, setNewBusiness] = useState(initialBusiness);
  const [photos, setPhotos] = useState([]);

  const refName = useRef<HTMLIonInputElement>();
  const refAddress = useRef<HTMLIonInputElement>();
  const refPostalCode = useRef<HTMLIonInputElement>();
  const refCity = useRef<HTMLIonInputElement>();
  const refProvince = useRef<HTMLIonInputElement>();
  const refPhone = useRef<HTMLIonInputElement>();

  const addBusiness = () => {
    const business = {
      placeId: newBusiness?.placeId,
      name: refName.current?.value as string,
      address: refAddress.current?.value as string,
      postal_code: refPostalCode.current?.value as string,
      city: refCity.current?.value as string,
      province: refProvince.current?.value as string,
      phone: refPhone.current?.value as string,
      photoUrl: photos.length > 0 ? (photos[0] as any).getUrl() : "",
      location: newBusiness.location,
      distance: newBusiness.distance
    };
    firebase.addBusiness(business);
    history.go(-1);
  };

  const findAddr = (addr: any, field: any) => {
    const node = addr.find((addr: any) => {
      return addr.types.includes(field);
    });
    if (node) {
      return node.long_name;
    }
    return "";
  };

  const searchBusiness = async (e: Event) => {
    const target = e.target as HTMLIonSearchbarElement;
    const business = target.value!;
    let photoUrl = "";
    if (business.length > 3) {
      findPlaceByName(business)
        .then(async (result) => {
          if ("photos" in result) {
            setPhotos(result.photos);
          }
          if (result.address_components) {
            const address_components = result.address_components;
            const country = findAddr(address_components, "country");
            const postal_code = findAddr(address_components, "postal_code");
            const comunity = findAddr(
              address_components,
              "administrative_area_level_1"
            );
            const province = findAddr(
              address_components,
              "administrative_area_level_2"
            );
            let location;
            try {
              location = await getCoordinates(business, result.formatted_address);
            } catch (err) {
              console.log(err);
              location = LOCATION_IES;
            }
            let distance;
            try {
              distance = await getDistance(business, result.formatted_address);
            } catch(e) {
              distance = null
            }
            console.log(distance);

            const city = findAddr(address_components, "locality");
            setNewBusiness((newBusiness) => ({
              ...newBusiness,
              address: result.formatted_address,
              name: result.name,
              phone: result.formatted_phone_number,
              website: result.website,
              photo: photoUrl,
              placeId: result.place_id,
              location,
              distance,
              postal_code,
              city,
              province,
              comunity,
              country,
            }));
          }
        })
        .catch((err) => {});
    }
    setSearch(business);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Nueva empresa</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            debounce={1000}
            onIonChange={(e) => searchBusiness(e)}
            animated={true}
            placeholder="Busca la empresa en Google Places"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Nueva empresa</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {photos.slice(0, 5).map((photo: any) => (
              <IonCol key={photo.getUrl()}>
                <IonImg src={photo.getUrl()} alt="Portada Empresa"></IonImg>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonList>
          <IonItem>
            <IonLabel>Nombre</IonLabel>
            <IonInput
              value={newBusiness.name}
              ref={refName as any}
              placeholder="Nombre empresa"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Dirección</IonLabel>
            <IonInput
              value={newBusiness.address}
              ref={refAddress as any}
              placeholder="Dirección"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Código Postal</IonLabel>
            <IonInput
              value={newBusiness.postal_code}
              ref={refPostalCode as any}
              placeholder="Código Postal"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Ciudad</IonLabel>
            <IonInput
              value={newBusiness.city}
              ref={refCity as any}
              placeholder="Ciudad"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Provincia</IonLabel>
            <IonInput
              value={newBusiness.province}
              ref={refProvince as any}
              placeholder="Provincia"
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Teléfono</IonLabel>
            <IonInput
              value={newBusiness.phone}
              ref={refPhone as any}
              placeholder="Teléfono"
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="full" onClick={addBusiness}>
          <IonIcon slot="start" icon={add}></IonIcon>Añadir
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default BusinessForm;
