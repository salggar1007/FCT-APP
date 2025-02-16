import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { initializeApp } from "firebase/app";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { collection, getDocs, addDoc, setDoc } from "firebase/firestore";
import { Agreement } from "../models/agreement";
import { Business } from "../models/business";
import { FirebaseResponse } from "../models/response";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { Vehicle } from "../models/vehicle";
import { Visit } from "../models/visit";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "../models/user";
import { bus } from "ionicons/icons";

export const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const BUSINESS_COLLECTION = "business";
const AGREEMENT_COLLECTION = "agreements";
const VISIT_COLLECTION = "visits";
const USERS_COLLECTION = "users";
const URL = "http://localhost:8081/fctapp";

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [user] = useAuthState(auth);
  const [fullUser, setFullUser] = useState<User>();
  const [updated, setUpdated] = useState(false);

  useEffect(
    () => {
      const loadUser = async () => {
        const response = await getUser();
        console.log("Respuesta getUser", response);
        if (!response.error){
          setFullUser(response.data);
        }
      }
      loadUser();
    },
    [user]
  )

  const signInWithCapacitor = async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    const credential = GoogleAuthProvider.credential(result.credential?.idToken);
    const res = await signInWithCredential(auth, credential);

    const col = collection(db, USERS_COLLECTION);
    const q = query(col, where("uid", "==", res.user.uid));
    const snapshot = await getDocs(q);
    if (snapshot.size === 0) {
      await setDoc(doc(col, res.user.uid), {
        uid: res.user.uid,
        name: res.user.displayName,
        authProvider: "google",
        email: res.user.email,
        admin: false
      });
      addUser(res.user);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  const addUser = async (user) => { //CON BACKEND
    try {
      const response = await axios.post(URL + '/user', {
        name: user.displayName,
        uid: user.uid,
        email: user.email,
        admin: false
      })
    } catch (error) {
      console.error(error);
    }
  }

  const getBusiness = async () => { //CON BACKEND
    try {
      const response = await axios.get(URL + '/business');
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getBusinessById = async (id) => { //CON BACKEND
    try {
      const response = await axios.get(URL + '/business/' + id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAgreementById = async (id) => { //CON BACKEND
    try {
      const response = await axios.get(URL + '/agreement/' + id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getAgreementsByUser = async () => { //CON BACKEND
    await getUser();
    try {
      let url = URL + '/agreement?userId=' + user.uid;
      if (fullUser?.admin) {
        url = URL + '/agreement';
      }
      const response = await axios.get(url);
      return {
        data: response.data,
        error: false,
      }
    } catch (error) {
      return {
        data: error,
        error: true,
      }
    }
  };

  const getVisitsById = async (id) => { //CON BACKEND
    try {
      const response = await axios.get(URL + '/visit/' + id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getVisitsByUser = async () => { //CON BACKEND
    await getUser();
    try {
      let url = URL + '/visit?userId=' + user.uid;
      if (fullUser?.admin) {
        url = URL + '/visit';
      }
      const response = await axios.get(url);
      return {
        data: response.data,
        error: false,
      }
    } catch (error) {
      return {
        data: error,
        error: true,
      }
    }
  };

  const addBusiness = async (business) => { //CON BACKEND
    try {
      const diResponse = await axios.post(URL + '/text_value', {
        text: business.distance.distance?.text,
        value: business.distance.distance?.value
      });
      const duResponse = await axios.post(URL + '/text_value', {
        text: business.distance.duration?.text,
        value: business.distance.duration?.value
      });
      const distance = await axios.post(URL + '/distance', {
        distance: diResponse.data,
        duration: duResponse.data,
        status: business.distance.status
      });
      const location = await axios.post(URL + '/location', {
        lat: business.location.lat,
        lng: business.location.lng
      });
      const response = await axios.post(URL + '/business', {
        name: business.name,
        address: business.address,
        postal_code: business.postal_code,
        city: business.city,
        province: business.province,
        phone: business.phone,
        photoUrl: business.photoUrl,
        placeId: business.placeId,
        location: location.data,
        distance: distance.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addAgreement = async (agreement) => { //CON BACKEND
    try {
      const business = await getBusinessById(agreement.businessId);
      const response = await axios.post(URL + '/agreement', {
        name: agreement.name,
        students: agreement.students,
        beginDate: agreement.beginDate,
        endDate: agreement.endDate,
        creationDate: agreement.creationDate,
        userId: agreement.userId,
        businessId: agreement.businessId,
        agreementBusiness: business.data
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const addVisit = async (visit) => { //CON BACKEND (cambiar authorizedDate)
    try {
      const vehicle = await axios.post(URL + '/vehicle', {
        model: visit.vehicle.model,
        registrationNumber: visit.vehicle.registrationNumber
      })
      const response = await axios.post(URL + '/visit', {
        userId: visit?.userId,
        agreement: visit?.agreement,
        type: visit.type,
        last: visit.last,
        request_help: visit.request_help,
        transport: visit.transport,
        vehicle: vehicle.data,
        publicTransportIncome: visit.publicTransportIncome,
        beginDate: visit.beginDate,
        endDate: visit.endDate,
        creationDate: visit.creationDate,
        observations: visit.observations,
        authorized: visit.authorized,
        authorizedDate: visit.authorizedDate
      })
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const authorizeVisit = async (visit) => { //CON BACKEND
    try {
      visit.authorized = true;
      visit.authorizedDate = new Date();
      const response = await axios.put(URL + '/visit/' + visit.id, visit);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => { //CON BACKEND
    try {
      const response = await axios.get(URL + '/user/' + user.uid);
      return {
        data: response.data,
        error: false,
      }
    } catch (error) {
      return {
        data: null,
        error: true,
      };
    }
  };

  const updateVehicle = async (vehicle) => { //CON BACKEND
    try {
      const vResponse = await axios.post(URL + '/vehicle', {
        model: vehicle.model,
        registrationNumber: vehicle.registrationNumber
      });
      const rUser = await getUser();
      rUser.data.vehicle = vResponse.data;
      const response = await axios.put(URL + '/user/' + user.uid, rUser.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBusiness = async (id) => { //CON BACKEND
    try {
      const response = await axios.delete(URL + '/business/' + id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAgreement = async (agreement) => { //CON BACKEND
    try {
      const response = await axios.delete(URL + '/agreement/' + agreement.id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVisit = async (visit) => { //CON BACKEND
    try {
      const response = await axios.delete(URL + '/visit/' + visit.id);
    } catch (error) {
      console.error(error);
    }
  };

  const firebase = {
    auth,
    getUser,
    signInWithCapacitor,
    logOut,
    getBusiness,
    getBusinessById,
    addBusiness,
    addAgreement,
    addVisit,
    getAgreementsByUser,
    getAgreementById,
    getVisitsByUser,
    updateVehicle,
    deleteBusiness,
    deleteAgreement,
    deleteVisit,
    authorizeVisit
  }

  return (
    <AuthContext.Provider value={{
      user,
      fullUser,
      setFullUser,
      firebase,
      updated,
      setUpdated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
