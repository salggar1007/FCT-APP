import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Agreement } from "../models/agreement";
import { useAuthState } from "react-firebase-hooks/auth";
import { Conveyance, Visit, VisitType } from "../models/visit";
import { Vehicle } from "../models/vehicle";
import { parseISO } from "date-fns";
import { AuthContext } from "../components/AuthProvider";

const getNextHour = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() + 60);
  return d;
};

const VisitForm = ({ history }: RouteComponentProps) => {
  const {firebase, updated, setUpdated} = useContext(AuthContext);
  const [user] = useAuthState(firebase.auth);
  const [agreement] = useState<Agreement>(history.location.state as Agreement);
  // console.log(agreement);
  const [visit, setVisit] = useState<Visit>({
    agreement,
    type: VisitType.Primera,
    last: false,
    request_help: false,
    transport: Conveyance["Vehículo propio"],
    vehicle: { model: "", registrationNumber: "" },
    publicTransportIncome: 0,
    beginDate: new Date(),
    endDate: getNextHour(),
    creationDate: new Date(),
    observations: "",
    authorized: false,
    authorizedDate: new Date() //cambiar
  });

  useEffect(() => {
    const getVehicle = async () => {
      const response = await firebase.getUser();
      if (!response.error) {
        const vehicle: Vehicle = {
          model: response.data.model ?? "",
          registrationNumber: response.data.registrationNumber ?? "",
        };
        setVisit({ ...visit, vehicle });
      }
    };
    getVehicle();
  }, [history.location]);

  const onAddVisit = async () => {
    const newVisit = {...visit, userId: user.uid};
    // console.log(newVisit);
    const response = await firebase.addVisit(newVisit);
    // console.log(response);
    if (!response.error) {
      history.push('/visit');
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
          <IonTitle>Nueva Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonSelect
              value={visit.type}
              placeholder="Tipo de visita"
              onIonChange={(e) => {
                setVisit({ ...visit, type: e.target.value });
              }}
            >
              <IonSelectOption value={VisitType.Primera}>
                Primera visita (presentación del alumno)
              </IonSelectOption>
              <IonSelectOption value={VisitType.Segunda}>
                Segunda visita (seguimiento)
              </IonSelectOption>
              <IonSelectOption value={VisitType.Tercera}>
                Tercera visita (documentación y evaluación)
              </IonSelectOption>
              <IonSelectOption value={VisitType.Cuarta}>
                Cuarta o ulterior visita (excepcional)
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {(visit.type === VisitType.Tercera ||
            visit.type === VisitType.Cuarta) && (
            <IonItem>
              <IonLabel>¿Última visita?</IonLabel>
              <IonToggle
                checked={visit.last}
                slot="end"
                onIonChange={(e) => {
                  setVisit({ ...visit, last: e.target.checked });
                }}
              ></IonToggle>
            </IonItem>
          )}
          <IonItem>
            <IonLabel>¿Solicita ayuda desplazamiento?</IonLabel>
            <IonToggle
              checked={visit.request_help}
              slot="end"
              onIonChange={(e) => {
                setVisit({ ...visit, request_help: e.target.checked });
              }}
            ></IonToggle>
          </IonItem>
          <IonItem>
            <IonSelect
              value={visit.transport}
              placeholder="Medio de transporte"
              onIonChange={(e) => {
                setVisit({ ...visit, transport: e.target.value });
              }}
            >
              <IonSelectOption value={Conveyance["Vehículo propio"]}>
                Vehículo Propio
              </IonSelectOption>
              <IonSelectOption value={Conveyance.Taxi}>Taxi</IonSelectOption>
              <IonSelectOption value={Conveyance["Bus/Tren"]}>
                Bus/Tren
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {visit.transport === Conveyance["Vehículo propio"] && (
            <>
              <IonItem>
                <IonLabel>Modelo</IonLabel>
                <IonInput
                  value={visit.vehicle?.model}
                  onIonChange={(e) => {
                    setVisit({
                      ...visit,
                      vehicle: {
                        ...visit.vehicle,
                        model: e.target.value as string,
                      },
                    });
                  }}
                  placeholder=""
                />
              </IonItem>
              <IonItem>
                <IonLabel>Matrícula</IonLabel>
                <IonInput
                  value={visit.vehicle?.registrationNumber}
                  onIonChange={(e) => {
                    setVisit({
                      ...visit,
                      vehicle: {
                        ...visit.vehicle,
                        registrationNumber: e.target.value as string,
                      },
                    });
                  }}
                  placeholder=""
                />
              </IonItem>
            </>
          )}
          {(visit.transport === Conveyance["Bus/Tren"] ||
            visit.transport === Conveyance.Taxi) && (
            <IonItem>
              <IonLabel>Importe Gasto</IonLabel>
              <IonInput
                value={visit.publicTransportIncome}
                onIonChange={(e) => {
                  setVisit({
                    ...visit,
                    publicTransportIncome: e.target.value as number
                  });
                }}
                type="number"
                placeholder="En caso de usar transporte público es necesario entregar factura o ticket por el importe del gasto (Importe a anotar cuando se disponga de la factura)"
              />
            </IonItem>
          )}
          <IonItem>
            <IonLabel>Fecha y Hora de salida</IonLabel>
            <>
              <IonDatetimeButton datetime="datetimeVisitBegin"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  value={visit.beginDate.toISOString()}
                  onIonChange={(event) => {
                    setVisit({
                      ...visit,
                      beginDate: parseISO(event.target.value as string),
                    });
                  }}                  
                  presentation="date-time"
                  locale="es-ES"
                  id="datetimeVisitBegin"
                ></IonDatetime>
              </IonModal>
            </>
          </IonItem>
          <IonItem>
            <IonLabel>Fecha y Hora de regreso</IonLabel>
            <>
              <IonDatetimeButton datetime="datetimeVisitEnd"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  value={visit.endDate.toISOString()}
                  onIonChange={(event) => {
                    setVisit({
                      ...visit,
                      endDate: parseISO(event.target.value as string),
                    });
                  }}                  
                  presentation="date-time"
                  locale="es-ES"
                  id="datetimeVisitEnd"
                ></IonDatetime>
              </IonModal>
            </>
          </IonItem>
          <IonItem>
            <IonLabel>Observaciones</IonLabel>
            <IonInput
              value={visit.observations}
              onIonChange={(e) => {
                setVisit({ ...visit, observations: e.target.value as string });
              }}
              placeholder="Indica si vas a visitar a varias empresas situadas en localidades diferentes indica el itinerario"
            />
          </IonItem>
        </IonList>
        <IonButton onClick={onAddVisit} expand="block">
          Añadir
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default VisitForm;
