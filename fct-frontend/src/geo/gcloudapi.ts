import { Business } from "./../models/business";
import { Distance } from "../models/distance";
import { Location } from "../models/location";

const URL_BASE = "https://maps.googleapis.com/maps/api/";

export const LOCATION_IES = {
  lat: 37.7767,
  lng: -3.7886,
}

declare const google: any;

const getCoordinates = async (
  name,
  address): Promise<Location> => {
  let query = `${name} ${address}`;
  query = query.replace("/ /", "%20");
  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: query }, function (results, status) {
      if (status === "OK") {
        const { lat, lng } = results[0].geometry.location;
        resolve({ lat: parseFloat(lat()), lng: parseFloat(lng()) });
      } else {
        reject(new Error("No se ha encontrado"));
      }
    });
  });
};

const getDistance = async (name: string, address: string): Promise<Distance> => {
  let query = `${name}, ${address}`;
  query = query.replace("/ /", "%20");

  var service = new google.maps.DistanceMatrixService();

  return new Promise((resolve: any, reject: any) => {
    service.getDistanceMatrix(
      {
        origins: ["IES%20Virgen%20del%20Carmen%20Jaén"],
        destinations: [query],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(response.rows[0].elements[0]);
        } else {
          reject(new Error("No encontrado"));
        }
      }
    );
  });
};

const findPlaceByName = async (name: string): Promise<any> => {
  const query = name.replace("/ /", "%20");
  const requestPlaceId = {
    query,
    fields: ["place_id"],
  };
  const service = new google.maps.places.PlacesService(
    document.createElement("div")
  );
  const placeId = await new Promise<string>((resolve, reject) => {
    service.findPlaceFromQuery(requestPlaceId, (results: any, status: any) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results.length > 0
      ) {
        resolve(results[0].place_id);
      } else {
        reject(new Error("No results"));
      }
    });
  });
  const request = {
    placeId,
    fields: [
      "place_id",
      "address_components",
      "name",
      "formatted_phone_number",
      "formatted_address",
      "geometry",
      "photos",
    ],
  };
  const placeData = await new Promise((resolve, reject) => {
    service.getDetails(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error("No results"));
      }
    });
  });
  return placeData;
};

export { getCoordinates, getDistance, findPlaceByName };
